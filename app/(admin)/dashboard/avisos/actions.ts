'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export interface EscolaAviso {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string | null;
  destaque_home: boolean;
  publicado: boolean;
  imagem_url: string | null;
  imagens: string[] | null;
  data_publicacao: string;
  data_expiracao: string | null;
  status: string;
  created_at: string;
  updated_at: string;
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

export async function getAvisosAdmin() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('escola_avisos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Erro ao buscar avisos: ${error.message}`);
  }

  return (data || []) as EscolaAviso[];
}

export async function saveAviso(prevState: unknown, formData: FormData) {
  const id = formData.get('id') as string;
  const titulo = formData.get('titulo') as string;
  const resumo = formData.get('resumo') as string;
  const conteudo = formData.get('conteudo') as string;
  const destaque_home = formData.get('destaque_home') === 'true';
  const publicado = formData.get('publicado') === 'true';
  const imagensRaw = formData.get('imagens') as string;
  const data_publicacao = (formData.get('data_publicacao') as string) || new Date().toISOString();
  const data_expiracao = (formData.get('data_expiracao') as string) || null;
  const status = (formData.get('status') as string) || 'ativo';

  if (!titulo || !resumo) {
    return { error: 'Título e resumo são obrigatórios.' };
  }

  let imagens: string[] = [];
  if (imagensRaw) {
    try {
      imagens = JSON.parse(imagensRaw);
    } catch {
      return { error: 'Formato de imagens inválido.' };
    }
  }

  const imagem_url = imagens.length > 0 ? imagens[0] : null;

  const supabase = createClient();
  const updateData = {
    titulo,
    resumo,
    conteudo,
    destaque_home,
    publicado,
    imagem_url,
    imagens,
    data_publicacao,
    data_expiracao,
    status,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase
      .from('escola_avisos')
      .update(updateData)
      .eq('id', id);

    if (error) {
      return { error: `Erro ao atualizar: ${error.message}` };
    }
  } else {
    const { error } = await supabase.from('escola_avisos').insert({
      titulo,
      resumo,
      conteudo,
      destaque_home,
      publicado,
      imagem_url,
      imagens,
      data_publicacao,
      data_expiracao,
      status,
    });

    if (error) {
      return { error: `Erro ao criar: ${error.message}` };
    }
  }

  revalidateTag('avisos');
  revalidatePath('/');
  revalidatePath('/avisos');
  revalidatePath('/dashboard/avisos');

  return { success: true };
}

export async function toggleAvisoDestaque(id: string, destaque: boolean) {
  const supabase = createClient();
  const { error } = await supabase
    .from('escola_avisos')
    .update({ destaque_home: destaque, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { error: `Erro ao alterar destaque: ${error.message}` };
  }

  revalidateTag('avisos');
  revalidatePath('/');
  revalidatePath('/avisos');
  revalidatePath('/dashboard/avisos');

  return { success: true };
}

export async function toggleAvisoPublicado(id: string, publicado: boolean) {
  const supabase = createClient();
  const { error } = await supabase
    .from('escola_avisos')
    .update({ publicado, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { error: `Erro ao alterar publicação: ${error.message}` };
  }

  revalidateTag('avisos');
  revalidatePath('/');
  revalidatePath('/avisos');
  revalidatePath('/dashboard/avisos');

  return { success: true };
}

export async function moveToTrashAviso(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('escola_avisos')
    .update({ status: 'lixeira', publicado: false, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { error: `Erro ao mover para a lixeira: ${error.message}` };
  }

  revalidateTag('avisos');
  revalidatePath('/');
  revalidatePath('/avisos');
  revalidatePath('/dashboard/avisos');

  return { success: true };
}

export async function restoreAviso(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('escola_avisos')
    .update({ status: 'ativo', publicado: true, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { error: `Erro ao restaurar aviso: ${error.message}` };
  }

  revalidateTag('avisos');
  revalidatePath('/');
  revalidatePath('/avisos');
  revalidatePath('/dashboard/avisos');

  return { success: true };
}

export async function deleteAvisoPermanently(id: string) {
  const supabase = createClient();

  const { data: aviso, error: fetchError } = await supabase
    .from('escola_avisos')
    .select('imagens')
    .eq('id', id)
    .single();

  if (fetchError) {
    return { error: `Erro ao buscar imagens para exclusão: ${fetchError.message}` };
  }

  const { error: deleteDbError } = await supabase
    .from('escola_avisos')
    .delete()
    .eq('id', id);

  if (deleteDbError) {
    return { error: `Erro ao excluir aviso do banco de dados: ${deleteDbError.message}` };
  }

  const imagens: string[] = (aviso?.imagens as string[]) || [];
  if (imagens && imagens.length > 0) {
    const storagePaths = imagens
      .map(url => getStoragePathFromUrl(url))
      .filter((path): path is string => !!path);

    if (storagePaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from('escola_midias')
        .remove(storagePaths);

      if (storageError) {
        console.error('Erro ao remover mídias órfãs do storage:', storageError);
      }
    }
  }

  revalidateTag('avisos');
  revalidatePath('/');
  revalidatePath('/avisos');
  revalidatePath('/dashboard/avisos');

  return { success: true };
}
