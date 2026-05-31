import { getAcervoPublic } from '@/lib/data/acervo';
import AcervoHub from './components/acervo-hub';

export const dynamic = 'force-dynamic';

export default async function PublicAcervoPage() {
  const acervo = await getAcervoPublic();

  // Extract sorted unique years
  const years = Array.from(new Set(acervo.map(item => item.ano))).sort((a, b) => b.localeCompare(a));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-block bg-[#00185f]/5 text-[#00185f] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase border border-[#00185f]/15 mb-1">
          Histórico & Memória
        </div>
        <h1 className="text-4xl font-extrabold text-[#00185f] font-display">
          Acervo Histórico da Escola
        </h1>
        <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
        <p className="text-slate-600 font-medium">
          Explore nossa memória viva. Veja registros e fotos de feiras de ciências, eventos da comunidade, olimpíadas e celebrações históricas de cada ano letivo.
        </p>
      </div>

      {/* Interactive Tabs Hub */}
      {years.length > 0 ? (
        <AcervoHub initialAcervo={acervo} initialYears={years} />
      ) : (
        <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
          <Folder className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-450">Nenhum registro histórico publicado no momento.</p>
        </div>
      )}
    </div>
  );
}

import { Folder } from 'lucide-react';
