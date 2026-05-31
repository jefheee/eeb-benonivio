import { unstable_cache } from 'next/cache';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabasePublic = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface EscolaAcervoItemPublic {
  id: string;
  ano: string;
  categoria: string;
  titulo: string;
  descricao: string | null;
  imagens: string[] | null;
  data_publicacao: string;
  created_at: string;
}

export const getAcervoPublic = unstable_cache(
  async () => {
    const nowStr = new Date().toISOString();
    const { data, error } = await supabasePublic
      .from('escola_acervo')
      .select('id, ano, categoria, titulo, descricao, imagens, data_publicacao, created_at')
      .eq('status', 'ativo')
      .lte('data_publicacao', nowStr)
      .order('ano', { ascending: false })
      .order('data_publicacao', { ascending: false });

    if (error) {
      console.error('Erro ao buscar acervo público:', error);
      return [];
    }

    return (data || []) as EscolaAcervoItemPublic[];
  },
  ['acervo-publico'],
  {
    tags: ['acervo'],
    revalidate: 60
  }
);
