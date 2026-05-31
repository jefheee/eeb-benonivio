'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export interface EscolaAcervoItem {
  id: string;
  ano: string;
  categoria: string;
  titulo: string;
  descricao: string | null;
  imagens: string[] | null;
  data_publicacao: string;
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

export async function getAcervoAdmin() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('escola_acervo')
    .select('*')
    .order('ano', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Erro ao buscar acervo: ${error.message}`);
  }

  return (data || []) as EscolaAcervoItem[];
}

export async function saveAcervo(prevState: unknown, formData: FormData) {
  const id = formData.get('id') as string;
  const ano = formData.get('ano') as string;
  const categoria = formData.get('categoria') as string;
  const titulo = formData.get('titulo') as string;
  const descricao = formData.get('descricao') as string;
  const status = (formData.get('status') as string) || 'ativo';
  const imagensRaw = formData.get('imagens') as string;
  const data_publicacao = (formData.get('data_publicacao') as string) || new Date().toISOString();

  if (!ano || !categoria || !titulo) {
    return { error: 'Ano, categoria e título são obrigatórios.' };
  }

  let imagens: string[] = [];
  if (imagensRaw) {
    try {
      imagens = JSON.parse(imagensRaw);
    } catch {
      return { error: 'Formato de imagens inválido.' };
    }
  }

  const supabase = createClient();
  const acervoData = {
    ano,
    categoria,
    titulo,
    descricao,
    imagens,
    status,
    data_publicacao,
  };

  if (id) {
    const { error } = await supabase
      .from('escola_acervo')
      .update(acervoData)
      .eq('id', id);

    if (error) {
      return { error: `Erro ao atualizar acervo: ${error.message}` };
    }
  } else {
    const { error } = await supabase
      .from('escola_acervo')
      .insert(acervoData);

    if (error) {
      return { error: `Erro ao criar acervo: ${error.message}` };
    }
  }

  revalidateTag('acervo');
  revalidatePath('/acervo');
  revalidatePath('/dashboard/acervo');

  return { success: true };
}

export async function archiveYear(ano: string) {
  if (!ano) return { error: 'Ano é obrigatório.' };

  const supabase = createClient();
  const { error } = await supabase
    .from('escola_acervo')
    .update({ status: 'arquivado' })
    .eq('ano', ano)
    .neq('status', 'lixeira'); // Don't archive items in the trash

  if (error) {
    return { error: `Erro ao arquivar ano: ${error.message}` };
  }

  revalidateTag('acervo');
  revalidatePath('/acervo');
  revalidatePath('/dashboard/acervo');

  return { success: true };
}

export async function moveToTrashAcervo(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('escola_acervo')
    .update({ status: 'lixeira' })
    .eq('id', id);

  if (error) {
    return { error: `Erro ao mover para a lixeira: ${error.message}` };
  }

  revalidateTag('acervo');
  revalidatePath('/acervo');
  revalidatePath('/dashboard/acervo');

  return { success: true };
}

export async function restoreAcervo(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('escola_acervo')
    .update({ status: 'ativo' })
    .eq('id', id);

  if (error) {
    return { error: `Erro ao restaurar: ${error.message}` };
  }

  revalidateTag('acervo');
  revalidatePath('/acervo');
  revalidatePath('/dashboard/acervo');

  return { success: true };
}

export async function deleteAcervoPermanently(id: string) {
  const supabase = createClient();

  // 1. Fetch images to delete from Storage
  const { data: item, error: fetchError } = await supabase
    .from('escola_acervo')
    .select('imagens')
    .eq('id', id)
    .single();

  if (fetchError) {
    return { error: `Erro ao localizar mídias do acervo: ${fetchError.message}` };
  }

  // 2. Delete row from DB
  const { error: deleteError } = await supabase
    .from('escola_acervo')
    .delete()
    .eq('id', id);

  if (deleteError) {
    return { error: `Erro ao excluir do banco de dados: ${deleteError.message}` };
  }

  // 3. Delete files from Storage
  const imagens: string[] = (item?.imagens as string[]) || [];
  if (imagens && imagens.length > 0) {
    const storagePaths = imagens
      .map(url => getStoragePathFromUrl(url))
      .filter((path): path is string => !!path);

    if (storagePaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from('escola_midias')
        .remove(storagePaths);

      if (storageError) {
        console.error('Erro ao remover mídias órfãs do acervo:', storageError);
      }
    }
  }

  revalidateTag('acervo');
  revalidatePath('/acervo');
  revalidatePath('/dashboard/acervo');

  return { success: true };
}
