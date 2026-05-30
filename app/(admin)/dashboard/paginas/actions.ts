'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export interface EscolaPaginaConteudo {
  slug: string;
  conteudo_html: string | null;
  updated_at: string;
}

export async function getPaginasAdmin() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('escola_conteudo_paginas')
    .select('*')
    .order('slug', { ascending: true });

  if (error) {
    throw new Error(`Erro ao buscar páginas: ${error.message}`);
  }

  return (data || []) as EscolaPaginaConteudo[];
}

export async function savePaginaConteudo(slug: string, conteudo_html: string) {
  if (!slug) {
    return { error: 'O slug da página é obrigatório.' };
  }

  const supabase = createClient();

  // Upsert using raw query or supabase client
  const { error } = await supabase
    .from('escola_conteudo_paginas')
    .upsert({
      slug,
      conteudo_html,
      updated_at: new Date().toISOString()
    }, { onConflict: 'slug' });

  if (error) {
    return { error: `Erro ao salvar conteúdo da página: ${error.message}` };
  }

  revalidateTag(`pagina-${slug}`);
  revalidateTag('paginas');
  revalidatePath('/');
  revalidatePath('/sobre');
  revalidatePath('/dashboard/paginas');

  return { success: true };
}
