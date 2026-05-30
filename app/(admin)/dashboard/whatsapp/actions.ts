'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export interface WhatsAppGrupo {
  id: string;
  serie: string;
  turma: string;
  turno: string;
  link: string;
  created_at: string;
  updated_at: string;
}

export async function getTurmasAdmin() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('escola_whatsapp_grupos')
    .select('*')
    .order('serie', { ascending: true })
    .order('turma', { ascending: true });

  if (error) {
    throw new Error(`Erro ao buscar turmas: ${error.message}`);
  }

  return (data || []) as WhatsAppGrupo[];
}

export async function saveTurma(prevState: unknown, formData: FormData) {
  const id = formData.get('id') as string;
  const serie = formData.get('serie') as string;
  const turma = formData.get('turma') as string;
  const turno = formData.get('turno') as string;
  const link = formData.get('link') as string;

  if (!serie || !turma || !turno || !link) {
    return { error: 'Todos os campos são obrigatórios.' };
  }

  if (!link.startsWith('https://chat.whatsapp.com/')) {
    return { error: 'O link deve ser um convite de WhatsApp válido (começando com https://chat.whatsapp.com/).' };
  }

  const supabase = createClient();

  if (id) {
    // Update existing record
    const { error } = await supabase
      .from('escola_whatsapp_grupos')
      .update({
        serie,
        turma,
        turno,
        link,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      return { error: `Erro ao atualizar: ${error.message}` };
    }
  } else {
    // Insert new record
    const { error } = await supabase.from('escola_whatsapp_grupos').insert({
      serie,
      turma,
      turno,
      link,
    });

    if (error) {
      return { error: `Erro ao criar: ${error.message}` };
    }
  }

  revalidateTag('whatsapp-grupos');
  revalidatePath('/dashboard/whatsapp');

  return { success: true };
}

export async function deleteTurma(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('escola_whatsapp_grupos')
    .delete()
    .eq('id', id);

  if (error) {
    return { error: `Erro ao excluir: ${error.message}` };
  }

  revalidateTag('whatsapp-grupos');
  revalidatePath('/dashboard/whatsapp');

  return { success: true };
}
