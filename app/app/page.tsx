import { Users, HeartHandshake, ShieldCheck, Download, BookOpen } from "lucide-react";

export default function APPPage() {
  return (
    <div className="py-6 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-primary font-display">
          APP - Associação de Pais e Professores
        </h1>
        <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
        <p className="text-slate-600 font-semibold text-lg">
          CNPJ: 78.639.903/0001-04
        </p>
        <p className="text-slate-600 font-medium">
          A Associação de Pais e Professores gere os recursos e auxilia ativamente na manutenção e nos projetos pedagógicos da escola.
        </p>
      </div>

      {/* Colegiado Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: Colegiado */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 text-center space-y-3">
          <div className="p-3 bg-[#1B2F78]/10 text-primary w-fit mx-auto rounded-xl">
            <Users className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-primary font-display">Colegiado</h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Representação democrática de pais, professores e comunidade no planejamento e tomadas de decisão.
          </p>
        </div>

        {/* Card 2: Parcerias */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 text-center space-y-3">
          <div className="p-3 bg-[#1B2F78]/10 text-primary w-fit mx-auto rounded-xl">
            <HeartHandshake className="h-6 w-6 text-secondary" />
          </div>
          <h2 className="text-xl font-bold text-primary font-display">Parcerias</h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Organização de feiras, eventos beneficentes e captação de recursos para melhorias no espaço escolar.
          </p>
        </div>

        {/* Card 3: Transparência */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 text-center space-y-3">
          <div className="p-3 bg-[#1B2F78]/10 text-primary w-fit mx-auto rounded-xl">
            <ShieldCheck className="h-6 w-6 animate-pulse" />
          </div>
          <h2 className="text-xl font-bold text-primary font-display">Transparência</h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Prestação de contas e divulgação periódica de relatórios financeiros e investimentos realizados.
          </p>
        </div>

      </div>

      {/* Double Column Section: Documentos & Revista Okaza */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Documentos Públicos Card */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-6">
          <h2 className="text-2xl font-bold text-primary border-b pb-4">
            Documentos Públicos
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Realize o download oficial dos formulários, atas e estatutos administrados pela APP.
          </p>
          
          <div className="space-y-4">
            {/* Doc 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 gap-4">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Ata e Estatuto da APP</span>
                <span className="text-xs text-slate-400 font-semibold">Documento PDF Oficial</span>
              </div>
              <a 
                href="/assets/docs/estatuto-app.pdf" 
                download 
                className="inline-flex items-center justify-center gap-2 bg-[#1B2F78] hover:bg-[#1B2F78]/95 text-white font-bold px-4 py-2.5 rounded-lg text-xs transition-all flex-shrink-0"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Baixar Estatuto</span>
              </a>
            </div>

            {/* Doc 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 gap-4">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Orçamento de Preços</span>
                <span className="text-xs text-slate-400 font-semibold">Modelo de Orçamento DOCX</span>
              </div>
              <a 
                href="/assets/docs/ORÇAMENTO.docx" 
                download 
                className="inline-flex items-center justify-center gap-2 bg-[#1B2F78] hover:bg-[#1B2F78]/95 text-white font-bold px-4 py-2.5 rounded-lg text-xs transition-all flex-shrink-0"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Baixar Modelo</span>
              </a>
            </div>

            {/* Doc 3 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 gap-4">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Solicitação de Recurso</span>
                <span className="text-xs text-slate-400 font-semibold">Formulário de Auxílio ao Estudante</span>
              </div>
              <a 
                href="/assets/docs/SOLICITAÇÃO DE RECURSO PARA ASSISTÊNCIA AO ESTUDANTE" 
                download 
                className="inline-flex items-center justify-center gap-2 bg-[#1B2F78] hover:bg-[#1B2F78]/95 text-white font-bold px-4 py-2.5 rounded-lg text-xs transition-all flex-shrink-0"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Baixar Formulário</span>
              </a>
            </div>
          </div>
        </div>

        {/* Revista Okaza Card */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-primary border-b pb-4 mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-secondary" />
              <span>Revista Okaza</span>
            </h2>
            <div className="space-y-4 text-sm text-slate-600 font-medium leading-relaxed">
              <p>
                A **Revista Okaza** é um projeto coordenado pela APP focado em relatos de experiências docentes e publicações interdisciplinares. A revista serve como um canal de registro científico e pedagógico dos trabalhos desenvolvidos em nossa escola.
              </p>
              <p>
                A publicação fomenta a troca de ideias, metodologias inovadoras e a valorização das conquistas intelectuais de nossos alunos e corpo docente, documentando a trajetória cultural e de ensino da instituição.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100">
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-2.5 rounded-xl text-xs transition-all cursor-not-allowed" disabled>
              Acessar Edições Online (Em breve)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
