import { SCHOOL_INFO } from "@/lib/constants";
import { GraduationCap, Phone, Mail, MapPin, Award, BookOpen, Clock } from "lucide-react";

export default function SobrePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-[#1B2F78] dark:text-white font-display">
          Sobre a Escola
        </h1>
        <div className="h-1 w-20 bg-[#F90000] mx-auto rounded-full" />
        <p className="text-slate-600 dark:text-slate-300 font-medium">
          Conheça nossa estrutura, equipe pedagógica e a história da instituição.
        </p>
      </div>

      {/* Main Info Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column - Details */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-[#1B2F78] dark:text-white border-b pb-4">
            Dados do Censo Escolar
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Award className="h-5 w-5 text-[#F90000] shrink-0" />
              <div>
                <span className="text-xs text-slate-400 font-semibold block uppercase">Código MEC</span>
                <span className="text-sm text-slate-800 dark:text-slate-200 font-bold">{SCHOOL_INFO.inep}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <BookOpen className="h-5 w-5 text-[#F90000] shrink-0" />
              <div>
                <span className="text-xs text-slate-400 font-semibold block uppercase">Níveis de Ensino</span>
                <span className="text-sm text-slate-800 dark:text-slate-200 font-bold">Fundamental & Médio</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-[#F90000] shrink-0" />
              <div>
                <span className="text-xs text-slate-400 font-semibold block uppercase">Turnos</span>
                <span className="text-sm text-slate-800 dark:text-slate-200 font-bold">Matutino / Vespertino</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <GraduationCap className="h-5 w-5 text-[#F90000] shrink-0" />
              <div>
                <span className="text-xs text-slate-400 font-semibold block uppercase">Dependência</span>
                <span className="text-sm text-slate-800 dark:text-slate-200 font-bold">Estadual (SED/SC)</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 space-y-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-[#1B2F78] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-800 dark:text-slate-200 font-bold block">Endereço Oficial</span>
                <span>{SCHOOL_INFO.address.full}</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-[#1B2F78] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-800 dark:text-slate-200 font-bold block">Telefone</span>
                <span>{SCHOOL_INFO.phone}</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-[#1B2F78] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-800 dark:text-slate-200 font-bold block">E-mail Institucional</span>
                <span>{SCHOOL_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Patron */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-[#1B2F78] dark:text-white border-b pb-4">
            Histórico do Patrono
          </h2>
          <div className="space-y-4">
            <div className="bg-[#1B2F78]/5 dark:bg-[#1B2F78]/10 p-4 rounded-xl border-l-4 border-l-[#1B2F78]">
              <span className="text-xs text-[#1B2F78] dark:text-slate-300 font-bold uppercase block">Nome Homenageado</span>
              <span className="text-lg text-slate-800 dark:text-slate-200 font-extrabold block">Benonívio João Martins</span>
              <span className="text-xs text-slate-500 font-bold block mt-0.5">(1933 - 1978)</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              O patrono da nossa unidade escolar, Benonívio João Martins, foi um líder comunitário destacado na região da Palhoça. Com dedicação incansável ao bem comum e ao progresso local, sua memória é preservada e homenageada através da denominação da escola, servindo de inspiração para que nossos estudantes se tornem agentes transformadores em nossa sociedade.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Fundada para suprir a demanda educacional do bairro Brejaru, a instituição carrega no nome e no dia a dia os valores de solidariedade, persistência e busca pelo saber.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
