import Image from "next/image";
import { MapPin, Award, BookOpen, Clock, Users } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/constants";

export default function SobrePage() {
  return (
    <div className="py-12 space-y-16">
      
      {/* Hero / Apresentação */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-primary font-display">
          Nossa Escola
        </h1>
        <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
        <p className="text-slate-600 font-semibold text-lg">
          Código MEC: 000042004047 | 1.897 alunos ativos em 2026
        </p>
        <p className="text-slate-600 font-medium">
          A {SCHOOL_INFO.name} é um pilar da educação pública estadual na Palhoça, focada no desenvolvimento integral de crianças, jovens e adultos.
        </p>
      </div>

      {/* Main Info Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column - Details & Localização (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Censo Escolar Details Card */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-6">
            <h2 className="text-2xl font-bold text-primary border-b pb-4">
              Dados Gerais & Estrutura
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-secondary shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 font-bold block uppercase">Registro INEP</span>
                  <span className="text-sm text-slate-900 font-bold">{SCHOOL_INFO.inep}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-secondary shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 font-bold block uppercase">Níveis de Ensino</span>
                  <span className="text-sm text-slate-900 font-bold">Fundamental I, II & Médio</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-secondary shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 font-bold block uppercase">Turnos de Funcionamento</span>
                  <span className="text-sm text-slate-900 font-bold">Matutino / Vespertino / Noturno</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-secondary shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 font-bold block uppercase">Corpo Discente</span>
                  <span className="text-sm text-slate-900 font-bold">1.897 Alunos Matriculados</span>
                </div>
              </div>
            </div>
          </div>

          {/* Localização (Google Maps Card) */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-4">
            <div className="flex items-center space-x-3 text-primary">
              <MapPin className="h-6 w-6 text-secondary" />
              <h2 className="text-2xl font-bold">Localização</h2>
            </div>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Endereço: {SCHOOL_INFO.address.street}, {SCHOOL_INFO.address.number} - {SCHOOL_INFO.address.neighborhood}, {SCHOOL_INFO.address.city}/{SCHOOL_INFO.address.state} (CEP: {SCHOOL_INFO.address.zipCode})
            </p>
            
            {/* Responsivo Iframe Maps */}
            <div className="w-full rounded-xl overflow-hidden shadow-sm border border-slate-200 mt-6">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1767.54989144233!2d-48.667191048476354!3d-27.621426117409058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9527358fbaaaaaab%3A0xa4a4e87166b392b7!2sEeb%20Prof%20Benonivio%20Joao%20Martins!5e0!3m2!1spt-BR!2sbr!4v1779936658693!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Right Column - Patron Details (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-6">
          <h2 className="text-2xl font-bold text-primary border-b pb-4">
            Histórico do Patrono
          </h2>
          
          {/* Homenageado Image */}
          <div className="flex justify-center w-full">
            <Image 
              src="/assets/images/professor-benonivio-joao-martins.jpeg" 
              alt="Professor Benonívio João Martins" 
              width={300} 
              height={400} 
              className="rounded-xl object-cover shadow-sm w-full h-auto max-w-[300px]" 
            />
          </div>

          <div className="space-y-4">
            <div className="bg-[#1B2F78]/5 p-4 rounded-xl border-l-4 border-l-[#1B2F78]">
              <span className="text-xs text-primary font-bold uppercase block">Nome Homenageado</span>
              <span className="text-lg text-slate-900 font-extrabold block">Professor Benonívio João Martins</span>
              <span className="text-xs text-slate-500 font-bold block mt-0.5">(1933 - 1978)</span>
            </div>
            
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              O professor Benonívio João Martins foi um profissional exemplar da educação catarinense e uma importante figura de liderança comunitária. Nascido em 1933 e falecido precocemente em 1978, deixou um legado inestimável focado no bem-estar comunitário, cidadania ativa e incentivo à leitura.
            </p>
            
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Sua memória é honrada através desta escola, inspirando gerações de alunos a trilharem o caminho da responsabilidade e do aprendizado no Brejaru.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
