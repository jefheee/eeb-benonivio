'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export interface EscolaNotificacao {
  id: string;
  titulo: string;
  mensagem: string;
  importancia: 'Alta' | 'Média' | 'Baixa';
  ativa: boolean;
  created_at: string;
}

export async function getNotificacoesAdmin() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('escola_notificacoes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Erro ao buscar notificações: ${error.message}`);
  }

  return (data || []) as EscolaNotificacao[];
}

export async function saveNotificacao(prevState: unknown, formData: FormData) {
  const id = formData.get('id') as string;
  const titulo = formData.get('titulo') as string;
  const mensagem = formData.get('mensagem') as string;
  const importancia = formData.get('importancia') as 'Alta' | 'Média' | 'Baixa';
  const ativa = formData.get('ativa') === 'true';

  if (!titulo || !mensagem || !importancia) {
    return { error: 'Título, mensagem e grau de importância são obrigatórios.' };
  }

  const supabase = createClient();

  if (id) {
    const { error } = await supabase
      .from('escola_notificacoes')
      .update({
        titulo,
        mensagem,
        importancia,
        ativa,
      })
      .eq('id', id);

    if (error) {
      return { error: `Erro ao atualizar notificação: ${error.message}` };
    }
  } else {
    const { error } = await supabase.from('escola_notificacoes').insert({
      titulo,
      mensagem,
      importancia,
      ativa,
    });

    if (error) {
      return { error: `Erro ao criar notificação: ${error.message}` };
    }
  }

  revalidateTag('notificacoes');
  revalidatePath('/'); // Layout uses it
  revalidatePath('/dashboard/notificacoes');

  return { success: true };
}

export async function toggleNotificacaoAtiva(id: string, ativa: boolean) {
  const supabase = createClient();
  const { error } = await supabase
    .from('escola_notificacoes')
    .update({ ativa })
    .eq('id', id);

  if (error) {
    return { error: `Erro ao alterar status: ${error.message}` };
  }

  revalidateTag('notificacoes');
  revalidatePath('/');
  revalidatePath('/dashboard/notificacoes');

  return { success: true };
}

export async function deleteNotificacao(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('escola_notificacoes').delete().eq('id', id);

  if (error) {
    return { error: `Erro ao excluir notificação: ${error.message}` };
  }

  revalidateTag('notificacoes');
  revalidatePath('/');
  revalidatePath('/dashboard/notificacoes');

  return { success: true };
}
