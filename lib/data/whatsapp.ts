import { unstable_cache } from 'next/cache';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabasePublic = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface WhatsAppGrupoPublic {
  id: string;
  serie: string;
  turma: string;
  turno: string;
  link: string;
}

export const getTurmasPublic = unstable_cache(
  async () => {
    const { data, error } = await supabasePublic
      .from('escola_whatsapp_grupos')
      .select('id, serie, turma, turno, link')
      .order('serie', { ascending: true })
      .order('turma', { ascending: true });

    if (error) {
      console.error('Erro ao carregar turmas públicas:', error);
      return [];
    }

    return (data || []) as WhatsAppGrupoPublic[];
  },
  ['whatsapp-grupos'],
  {
    tags: ['whatsapp-grupos'],
  }
);
