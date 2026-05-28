import { SCHOOL_INFO } from "@/lib/constants";
import { FolderOpen, Image as ImageIcon } from "lucide-react";

export default function AcervoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h1 className="text-4xl font-extrabold text-[#1B2F78] dark:text-white font-display">
          Acervo Histórico e Galerias
        </h1>
        <div className="h-1 w-20 bg-[#F90000] mx-auto rounded-full" />
        <p className="text-slate-600 dark:text-slate-300 font-medium">
          Explore o histórico de fotos, projetos pedagógicos e conquistas da {SCHOOL_INFO.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Google Photos Redirection Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm space-y-4">
          <div className="p-3 bg-[#1B2F78]/10 text-[#1B2F78] w-fit rounded-xl">
            <ImageIcon className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#1B2F78] dark:text-white">Galerias de Fotos</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">
            Nossos álbuns de eventos, feiras de ciências e formaturas estão organizados diretamente no Google Photos para acesso público.
          </p>
          <a
            href="https://photos.google.com" // Update link when available
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-[#1B2F78] hover:bg-[#1B2F78]/90 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors"
          >
            Acessar Álbuns de Fotos
          </a>
        </div>

        {/* Historical Projects Card (SSG) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm space-y-4">
          <div className="p-3 bg-[#F90000]/10 text-[#F90000] w-fit rounded-xl">
            <FolderOpen className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#1B2F78] dark:text-white">Projetos Históricos</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">
            Consulte a documentação e histórico dos principais projetos pedagógicos e feiras culturais realizados desde 2020.
          </p>
          <button className="inline-flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            Visualizar Projetos (SSG)
          </button>
        </div>
      </div>
    </div>
  );
}
