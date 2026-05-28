import { SCHOOL_INFO } from "@/lib/constants";
import { Users, HeartHandshake, ShieldCheck } from "lucide-react";

export default function APPPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h1 className="text-4xl font-extrabold text-[#1B2F78] dark:text-white font-display">
          APP - Associação de Pais e Professores
        </h1>
        <div className="h-1 w-20 bg-[#F90000] mx-auto rounded-full" />
        <p className="text-slate-600 dark:text-slate-300 font-medium">
          A união entre a família e a escola em prol do desenvolvimento dos nossos alunos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Core pillar 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-center space-y-3">
          <div className="p-3 bg-[#1B2F78]/10 text-[#1B2F78] w-fit mx-auto rounded-xl">
            <Users className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-[#1B2F78] dark:text-white">Colegiado</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Representação coletiva e democrática dos pais, professores e funcionários nas decisões institucionais.
          </p>
        </div>

        {/* Core pillar 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-center space-y-3">
          <div className="p-3 bg-[#F90000]/10 text-[#F90000] w-fit mx-auto rounded-xl">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-[#1B2F78] dark:text-white">Parcerias</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Apoio a projetos internos, eventos beneficentes e melhorias contínuas na infraestrutura física e digital.
          </p>
        </div>

        {/* Core pillar 3 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-center space-y-3">
          <div className="p-3 bg-[#1B2F78]/10 text-[#1B2F78] w-fit mx-auto rounded-xl">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-[#1B2F78] dark:text-white">Transparência</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Prestação de contas periódica e participação comunitária no direcionamento de recursos da APP.
          </p>
        </div>
      </div>

      <div className="mt-12 bg-slate-50 dark:bg-slate-900/40 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800 text-center space-y-4">
        <h3 className="text-lg font-bold text-[#1B2F78] dark:text-white">Como participar?</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Toda família é convidada a integrar a APP. Para reuniões e mais informações, entre em contato diretamente com a equipe diretiva através do nosso canal de comunicação.
        </p>
        <a
          href={SCHOOL_INFO.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-[#1B2F78] hover:bg-[#1B2F78]/90 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-[#1B2F78]/25"
        >
          <span>Falar no WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
