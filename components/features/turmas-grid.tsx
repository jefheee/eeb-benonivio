import { MessageSquare, Smile, BookOpen, FlaskConical, ChevronRight } from "lucide-react";
import { getTurmasPublic } from "@/lib/data/whatsapp";

export default async function TurmasGrid() {
  const allGroups = await getTurmasPublic();

  // Filter groups dynamically by their category
  const anosIniciais = allGroups.filter(g => g.serie === 'Anos Iniciais');
  const fundamentalII = allGroups.filter(g => g.serie === 'Ensino Fundamental II');
  const ensinoMedio = allGroups.filter(g => g.serie === 'Ensino Médio');

  return (
    <section id="turmas" className="max-w-[1200px] mx-auto py-16 w-full">
      
      {/* Header */}
      <div className="mb-12 border-b border-soft-border pb-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">
          Nossas Turmas & Grupos de Comunicação
        </h2>
        <p className="text-sm text-slate-500 font-semibold">
          Selecione sua turma para entrar no canal de avisos oficiais do WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Category 1: Anos Iniciais */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-display text-lg md:text-xl font-bold text-primary flex items-center gap-2 mb-4">
              <Smile className="h-5 w-5 text-secondary" />
              <span>Anos Iniciais</span>
            </h3>
            
            <div className="space-y-3">
              {anosIniciais.length > 0 ? (
                anosIniciais.map((turma) => {
                  const hasValidLink = turma.link && turma.link.startsWith('http');

                  if (hasValidLink) {
                    return (
                      <a
                        key={turma.id}
                        href={turma.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-pure-white border border-soft-border rounded-lg p-4 shadow-subtle flex items-center justify-between hover:border-secondary transition-colors cursor-pointer group outline-none"
                      >
                        <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">
                          {turma.turma}
                        </span>
                        <div className="flex items-center gap-2 text-slate-400 group-hover:text-secondary transition-colors">
                          <span className="text-[10px] font-bold text-slate-400">{turma.turno}</span>
                          <MessageSquare className="h-4 w-4 shrink-0" />
                          <ChevronRight className="h-4 w-4 shrink-0" />
                        </div>
                      </a>
                    );
                  } else {
                    return (
                      <div
                        key={turma.id}
                        className="bg-slate-50 border border-dashed border-slate-200 rounded-lg p-4 opacity-60 flex items-center justify-between cursor-not-allowed select-none"
                        title="Link indisponível no momento"
                      >
                        <span className="text-sm font-bold text-slate-400">
                          {turma.turma}
                        </span>
                        <div className="flex items-center gap-2 text-slate-300">
                          <span className="text-[10px] font-bold text-slate-350">{turma.turno}</span>
                          <MessageSquare className="h-4 w-4 shrink-0" />
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <p className="text-xs text-slate-400 font-medium py-4 text-center">Nenhuma turma registrada.</p>
              )}
            </div>
          </div>
        </div>

        {/* Category 2: Ensino Fundamental II */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-display text-lg md:text-xl font-bold text-primary flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-secondary" />
              <span>Ensino Fundamental II</span>
            </h3>

            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {fundamentalII.length > 0 ? (
                fundamentalII.map((turma) => {
                  const hasValidLink = turma.link && turma.link.startsWith('http');

                  if (hasValidLink) {
                    return (
                      <a
                        key={turma.id}
                        href={turma.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-pure-white border border-soft-border rounded-lg p-4 shadow-subtle flex items-center justify-between hover:border-secondary transition-colors cursor-pointer group outline-none"
                      >
                        <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">
                          {turma.turma}
                        </span>
                        <div className="flex items-center gap-2 text-slate-400 group-hover:text-secondary transition-colors">
                          <span className="text-[10px] font-bold text-slate-400">{turma.turno}</span>
                          <MessageSquare className="h-4 w-4 shrink-0" />
                          <ChevronRight className="h-4 w-4 shrink-0" />
                        </div>
                      </a>
                    );
                  } else {
                    return (
                      <div
                        key={turma.id}
                        className="bg-slate-50 border border-dashed border-slate-200 rounded-lg p-4 opacity-60 flex items-center justify-between cursor-not-allowed select-none"
                        title="Link indisponível no momento"
                      >
                        <span className="text-sm font-bold text-slate-400">
                          {turma.turma}
                        </span>
                        <div className="flex items-center gap-2 text-slate-300">
                          <span className="text-[10px] font-bold text-slate-350">{turma.turno}</span>
                          <MessageSquare className="h-4 w-4 shrink-0" />
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <p className="text-xs text-slate-400 font-medium py-4 text-center">Nenhuma turma registrada.</p>
              )}
            </div>
          </div>
        </div>

        {/* Category 3: Ensino Médio */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-display text-lg md:text-xl font-bold text-primary flex items-center gap-2 mb-4">
              <FlaskConical className="h-5 w-5 text-secondary" />
              <span>Ensino Médio</span>
            </h3>

            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {ensinoMedio.length > 0 ? (
                ensinoMedio.map((turma) => {
                  const hasValidLink = turma.link && turma.link.startsWith('http');

                  if (hasValidLink) {
                    return (
                      <a
                        key={turma.id}
                        href={turma.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-pure-white border border-soft-border rounded-lg p-4 shadow-subtle flex items-center justify-between hover:border-secondary transition-colors cursor-pointer group outline-none"
                      >
                        <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">
                          {turma.turma}
                        </span>
                        <div className="flex items-center gap-2 text-slate-400 group-hover:text-secondary transition-colors">
                          <span className="text-[10px] font-bold text-slate-400">{turma.turno}</span>
                          <MessageSquare className="h-4 w-4 shrink-0" />
                          <ChevronRight className="h-4 w-4 shrink-0" />
                        </div>
                      </a>
                    );
                  } else {
                    return (
                      <div
                        key={turma.id}
                        className="bg-slate-50 border border-dashed border-slate-200 rounded-lg p-4 opacity-60 flex items-center justify-between cursor-not-allowed select-none"
                        title="Link indisponível no momento"
                      >
                        <span className="text-sm font-bold text-slate-400">
                          {turma.turma}
                        </span>
                        <div className="flex items-center gap-2 text-slate-300">
                          <span className="text-[10px] font-bold text-slate-350">{turma.turno}</span>
                          <MessageSquare className="h-4 w-4 shrink-0" />
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <p className="text-xs text-slate-400 font-medium py-4 text-center">Nenhuma turma registrada.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
