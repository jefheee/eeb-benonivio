import { Users, HeartHandshake, ShieldCheck, Download, FileText } from "lucide-react";

interface DocumentoItem {
  title: string;
  link: string;
}

const DOCUMENTOS_PUBLICOS: DocumentoItem[] = [
  { title: "Estatuto da APP", link: "#" },
  { title: "Solicitação de Recurso para Assistência ao Estudante (Materiais e Deslocamento)", link: "#" },
  { title: "Formulário de Orçamento para Pesquisa de Preço", link: "#" },
  { title: "Revista Okaza (Publicação de Relatos de Experiências Docentes)", link: "#" },
];

export default function APPPage() {
  return (
    <div className="py-12 space-y-16">
      
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
          A Associação de Pais e Professores gere os recursos e auxilia na manutenção da escola, promovendo a integração entre a família e o ambiente escolar.
        </p>
      </div>

      {/* Colegiado Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Pillar 1 */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 text-center space-y-3">
          <div className="p-3 bg-[#1B2F78]/10 text-primary w-fit mx-auto rounded-xl">
            <Users className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-primary">Colegiado</h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Representação coletiva e democrática dos pais, professores e funcionários nas decisões e planejamentos institucionais.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 text-center space-y-3">
          <div className="p-3 bg-secondary/10 text-secondary w-fit mx-auto rounded-xl">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-primary">Parcerias</h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Apoio a projetos internos, eventos beneficentes e melhorias contínuas na infraestrutura física e digital da escola.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 text-center space-y-3">
          <div className="p-3 bg-[#1B2F78]/10 text-primary w-fit mx-auto rounded-xl">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-primary">Transparência</h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Prestação de contas periódica e participação comunitária no direcionamento ético de recursos da APP.
          </p>
        </div>

      </div>

      {/* Documentos Públicos Grid Section */}
      <div className="space-y-6 bg-white border border-slate-200 shadow-sm rounded-xl p-6">
        <div className="flex items-center space-x-3 text-primary border-b pb-4">
          <FileText className="h-6 w-6 text-secondary" />
          <h2 className="text-2xl font-bold">Documentos Públicos</h2>
        </div>
        
        <p className="text-sm text-slate-600 font-medium max-w-2xl leading-relaxed">
          Consulte e realize o download dos documentos, formulários e publicações da APP.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DOCUMENTOS_PUBLICOS.map((doc) => (
            <a
              key={doc.title}
              href={doc.link}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-primary/20 hover:bg-slate-50 transition-all font-semibold text-slate-700 text-sm group outline-none"
            >
              <span className="max-w-[80%] leading-relaxed">{doc.title}</span>
              <div className="p-2 bg-slate-50 group-hover:bg-primary/10 group-hover:text-primary rounded-lg text-slate-400 transition-colors">
                <Download className="h-4 w-4 shrink-0" />
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
