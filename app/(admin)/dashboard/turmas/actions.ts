'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export interface EscolaTurma {
  id: string;
  ano: string; // Ex: 6º Ano
  nome: string; // Ex: 61
  turno: string; // Matutino, Vespertino, Noturno
  whatsapp_link: string | null;
  outros_links: { titulo: string; url: string }[];
  created_at: string;
}

export interface EscolaTurmaPost {
  id: string;
  turma_id: string;
  titulo: string;
  conteudo: string | null;
  anexos: string[];
  imagem_url: string | null;
  imagens: string[] | null;
  link_referencia: string | null;
  data_publicacao: string;
  data_expiracao: string | null;
  status: string;
  created_at: string;
}

function getStoragePathFromUrl(url: string, bucketName: string = 'escola_midias'): string | null {
  if (!url) return null;
  const matchStr = `${bucketName}/`;
  const index = url.indexOf(matchStr);
  if (index !== -1) {
    return url.substring(index + matchStr.length);
  }
  return null;
}

// ---------------- TURMAS ACTIONS ----------------

export async function getTurmasAdmin() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('escola_turmas')
    .select('*')
    .order('ano', { ascending: true })
    .order('nome', { ascending: true });

  if (error) {
    throw new Error(`Erro ao buscar turmas: ${error.message}`);
  }

  return (data || []) as EscolaTurma[];
}

export async function saveTurma(prevState: unknown, formData: FormData) {
  const id = formData.get('id') as string;
  const ano = formData.get('ano') as string;
  const nome = formData.get('nome') as string;
  const turno = formData.get('turno') as string;
  const whatsapp_link = (formData.get('whatsapp_link') as string) || null;
  const outros_links_raw = formData.get('outros_links') as string;

  let outros_links = [];
  if (outros_links_raw) {
    try {
      outros_links = JSON.parse(outros_links_raw);
    } catch {
      return { error: 'Formato de links adicionais inválido.' };
    }
  }

  if (!ano || !nome || !turno) {
    return { error: 'Ano, Nome e Turno são obrigatórios.' };
  }

  if (whatsapp_link && !whatsapp_link.startsWith('https://chat.whatsapp.com/')) {
    return { error: 'O link deve ser um convite de WhatsApp válido (começando com https://chat.whatsapp.com/).' };
  }

  const supabase = createClient();

  if (id) {
    // Update
    const { error } = await supabase
      .from('escola_turmas')
      .update({
        ano,
        nome,
        turno,
        whatsapp_link,
        outros_links,
      })
      .eq('id', id);

    if (error) {
      return { error: `Erro ao atualizar turma: ${error.message}` };
    }
  } else {
    // Insert
    const { error } = await supabase.from('escola_turmas').insert({
      ano,
      nome,
      turno,
      whatsapp_link,
      outros_links,
    });

    if (error) {
      return { error: `Erro ao criar turma: ${error.message}` };
    }
  }

  revalidateTag('turmas');
  revalidatePath('/turmas');
  revalidatePath('/dashboard/turmas');

  return { success: true };
}

export async function deleteTurma(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('escola_turmas').delete().eq('id', id);

  if (error) {
    return { error: `Erro ao excluir turma: ${error.message}` };
  }

  revalidateTag('turmas');
  revalidatePath('/turmas');
  revalidatePath('/dashboard/turmas');

  return { success: true };
}

// ---------------- POSTS ACTIONS ----------------

export async function getPostsAdmin(turmaId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('escola_turmas_posts')
    .select('*')
    .eq('turma_id', turmaId)
    .order('data_publicacao', { ascending: false });

  if (error) {
    throw new Error(`Erro ao buscar posts da turma: ${error.message}`);
  }

  return (data || []) as EscolaTurmaPost[];
}

export async function savePost(prevState: unknown, formData: FormData) {
  const id = formData.get('id') as string;
  const turma_id = formData.get('turma_id') as string;
  const titulo = formData.get('titulo') as string;
  const conteudo = formData.get('conteudo') as string;
  const link_referencia = (formData.get('link_referencia') as string) || null;
  const imagensRaw = formData.get('imagens') as string;
  const data_publicacao = (formData.get('data_publicacao') as string) || new Date().toISOString();
  const data_expiracao = (formData.get('data_expiracao') as string) || null;
  const status = (formData.get('status') as string) || 'ativo';

  let imagens: string[] = [];
  if (imagensRaw) {
    try {
      imagens = JSON.parse(imagensRaw);
    } catch {
      return { error: 'Formato de imagens inválido.' };
    }
  }

  const imagem_url = imagens.length > 0 ? imagens[0] : null;

  if (!turma_id || !titulo) {
    return { error: 'Turma ID e Título são obrigatórios.' };
  }

  const supabase = createClient();
  const postData = {
    turma_id,
    titulo,
    conteudo,
    link_referencia,
    imagem_url,
    imagens,
    data_publicacao,
    data_expiracao,
    status,
  };

  if (id) {
    // Update
    const { error } = await supabase
      .from('escola_turmas_posts')
      .update(postData)
      .eq('id', id);

    if (error) {
      return { error: `Erro ao atualizar post: ${error.message}` };
    }
  } else {
    // Insert
    const { error } = await supabase.from('escola_turmas_posts').insert(postData);

    if (error) {
      return { error: `Erro ao criar post: ${error.message}` };
    }
  }

  revalidateTag(`turmas-posts-${turma_id}`);
  revalidateTag('turmas-posts');
  revalidatePath(`/turmas/${turma_id}`);
  revalidatePath('/dashboard/turmas');

  return { success: true };
}

export async function moveToTrashPost(id: string, turmaId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('escola_turmas_posts')
    .update({ status: 'lixeira' })
    .eq('id', id);

  if (error) {
    return { error: `Erro ao mover recado para a lixeira: ${error.message}` };
  }

  revalidateTag(`turmas-posts-${turmaId}`);
  revalidateTag('turmas-posts');
  revalidatePath(`/turmas/${turmaId}`);
  revalidatePath('/dashboard/turmas');

  return { success: true };
}

export async function restorePost(id: string, turmaId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('escola_turmas_posts')
    .update({ status: 'ativo' })
    .eq('id', id);

  if (error) {
    return { error: `Erro ao restaurar recado: ${error.message}` };
  }

  revalidateTag(`turmas-posts-${turmaId}`);
  revalidateTag('turmas-posts');
  revalidatePath(`/turmas/${turmaId}`);
  revalidatePath('/dashboard/turmas');

  return { success: true };
}

export async function deletePostPermanently(id: string, turmaId: string) {
  const supabase = createClient();

  // 1. Fetch images to delete from Storage
  const { data: post, error: fetchError } = await supabase
    .from('escola_turmas_posts')
    .select('imagens')
    .eq('id', id)
    .single();

  if (fetchError) {
    return { error: `Erro ao localizar imagens do recado: ${fetchError.message}` };
  }

  // 2. Delete row from DB
  const { error: deleteError } = await supabase
    .from('escola_turmas_posts')
    .delete()
    .eq('id', id);

  if (deleteError) {
    return { error: `Erro ao excluir recado do banco de dados: ${deleteError.message}` };
  }

  // 3. Delete files from Storage
  const imagens: string[] = (post?.imagens as string[]) || [];
  if (imagens && imagens.length > 0) {
    const storagePaths = imagens
      .map(url => getStoragePathFromUrl(url))
      .filter((path): path is string => !!path);

    if (storagePaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from('escola_midias')
        .remove(storagePaths);

      if (storageError) {
        console.error('Erro ao remover mídias órfãs do recado:', storageError);
      }
    }
  }

  revalidateTag(`turmas-posts-${turmaId}`);
  revalidateTag('turmas-posts');
  revalidatePath(`/turmas/${turmaId}`);
  revalidatePath('/dashboard/turmas');

  return { success: true };
}
