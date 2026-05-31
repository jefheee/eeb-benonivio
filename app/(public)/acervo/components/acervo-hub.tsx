'use client';

import { useState } from 'react';
import { Folder, Calendar, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { EscolaAcervoItemPublic } from '@/lib/data/acervo';

interface AcervoHubProps {
  initialAcervo: EscolaAcervoItemPublic[];
  initialYears: string[];
}

export default function AcervoHub({ initialAcervo, initialYears }: AcervoHubProps) {
  const [selectedYear, setSelectedYear] = useState<string>(initialYears[0] || '');
  const [selectedItem, setSelectedItem] = useState<EscolaAcervoItemPublic | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);

  const handleOpenItem = (item: EscolaAcervoItemPublic) => {
    setSelectedItem(item);
    setActivePhotoIdx(0);
  };

  const handleNextPhoto = (e: React.MouseEvent, max: number) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % max);
  };

  const handlePrevPhoto = (e: React.MouseEvent, max: number) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + max) % max);
  };

  // Filter items of the selected year
  const yearItems = initialAcervo.filter(item => item.ano === selectedYear);

  // Group by category
  const categoriesMap: Record<string, EscolaAcervoItemPublic[]> = {};
  yearItems.forEach(item => {
    const cat = item.categoria || 'Geral';
    if (!categoriesMap[cat]) {
      categoriesMap[cat] = [];
    }
    categoriesMap[cat].push(item);
  });

  const categoryNames = Object.keys(categoriesMap).sort();

  return (
    <div className="space-y-10 text-left">
      {/* Year Pills Navigation */}
      <div className="flex flex-wrap gap-3 justify-center border-b border-slate-100 pb-6 shrink-0">
        {initialYears.map((y) => (
          <button
            key={y}
            onClick={() => setSelectedYear(y)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border outline-none shadow-sm ${
              selectedYear === y
                ? 'bg-[#00185f] text-white border-[#00185f] scale-105'
                : 'bg-white text-slate-655 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Categories Content List */}
      <div className="space-y-12">
        {categoryNames.length > 0 ? (
          categoryNames.map((category) => {
            const items = categoriesMap[category];

            return (
              <div key={category} className="space-y-6">
                {/* Category Header */}
                <h3 className="font-display font-extrabold text-xl text-[#00185f] border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Folder className="h-5.5 w-5.5 text-secondary shrink-0" />
                  <span>{category}</span>
                </h3>

                {/* Grid of Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => {
                    const firstImage = (item.imagens && item.imagens.length > 0) ? item.imagens[0] : null;
                    const photoCount = item.imagens?.length || 0;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleOpenItem(item)}
                        className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-subtle hover:shadow-md hover:border-[#00185f]/30 transition-all duration-300 flex flex-col justify-between cursor-pointer group h-[380px]"
                      >
                        {/* Image block */}
                        <div className="h-48 bg-slate-50 relative shrink-0 overflow-hidden flex items-center justify-center border-b border-slate-100">
                          {firstImage ? (
                            <>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={firstImage}
                                alt={item.titulo}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              {photoCount > 1 && (
                                <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[9px] font-extrabold px-2 py-1 rounded shadow-sm">
                                  +{photoCount - 1} fotos
                                </span>
                              )}
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-slate-400 gap-2 p-6">
                              <ImageIcon className="h-10 w-10 text-[#00185f]/15" />
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Galeria do Ano</span>
                            </div>
                          )}
                        </div>

                        {/* Text Content */}
                        <div className="p-5 flex-grow flex flex-col justify-between">
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-bold text-slate-400 block uppercase flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-slate-400" />
                              <span>
                                {new Date(item.data_publicacao || item.created_at).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                })}
                              </span>
                            </span>
                            <h4 className="font-display font-extrabold text-base text-[#00185f] group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                              {item.titulo}
                            </h4>
                            {item.descricao && (
                              <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 font-medium">
                                {item.descricao}
                              </p>
                            )}
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#00185f] group-hover:text-secondary transition-colors shrink-0">
                            <span>Ver álbum completo</span>
                            <span className="text-lg leading-none">+</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-slate-400 py-12 font-medium">Nenhum álbum registrado no ano de {selectedYear}.</p>
        )}
      </div>

      {/* Image Gallery Viewer Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[150] bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col text-left animate-scaleIn">
            
            {/* Modal Image Slider */}
            {selectedItem.imagens && selectedItem.imagens.length > 0 ? (
              <div className="h-72 sm:h-96 bg-black relative shrink-0 overflow-hidden flex items-center justify-center select-none group/slider">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedItem.imagens[activePhotoIdx]}
                  alt={`${selectedItem.titulo} - ${activePhotoIdx + 1}`}
                  className="max-w-full max-h-full object-contain"
                />

                {/* Left Arrow */}
                {selectedItem.imagens.length > 1 && (
                  <button
                    onClick={(e) => handlePrevPhoto(e, selectedItem.imagens!.length)}
                    className="absolute left-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 hover:scale-105 transition-all outline-none"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}

                {/* Right Arrow */}
                {selectedItem.imagens.length > 1 && (
                  <button
                    onClick={(e) => handleNextPhoto(e, selectedItem.imagens!.length)}
                    className="absolute right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 hover:scale-105 transition-all outline-none"
                    aria-label="Próxima"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}

                {/* Counter indicator */}
                <span className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded">
                  {activePhotoIdx + 1} de {selectedItem.imagens.length}
                </span>
              </div>
            ) : (
              <div className="h-48 bg-slate-900 flex flex-col items-center justify-center text-slate-500 gap-2 shrink-0">
                <ImageIcon className="h-10 w-10 text-slate-600" />
                <span className="text-xs font-bold uppercase">Sem Fotos</span>
              </div>
            )}

            {/* Modal Info Content */}
            <div className="p-6 overflow-y-auto space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Folder className="h-4.5 w-4.5 text-[#bc0100] shrink-0" />
                  <span className="text-xs font-extrabold text-[#00185f]/80 uppercase tracking-wider">{selectedItem.categoria}</span>
                </div>
                <span className="bg-[#00185f] text-white text-xs font-extrabold px-3 py-0.5 rounded-full">{selectedItem.ano}</span>
              </div>

              <h2 className="font-display font-extrabold text-2xl text-[#00185f] leading-snug">
                {selectedItem.titulo}
              </h2>

              {selectedItem.descricao && (
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap pt-2.5 border-t border-slate-100 font-medium">
                  {selectedItem.descricao}
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedItem(null)}
                className="bg-[#00185f] hover:bg-[#001144] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm transition-colors outline-none"
              >
                Fechar álbum
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
