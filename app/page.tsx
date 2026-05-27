import Link from "next/link";
import { ArrowRight, MessageSquare, MapPin, GraduationCap, Calendar, Users, Award } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { SCHOOL_INFO } from "@/lib/constants";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-6rem)] flex flex-col justify-between bg-grid-pattern dark:bg-grid-pattern-dark">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-sky-500/10 dark:bg-sky-500/5 blur-[150px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase animate-fade-in">
              <GraduationCap className="h-4 w-4" />
              <span>Portal Oficial da Escola</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-[1.1] sm:leading-none">
              Formando hoje os cidadãos de{" "}
              <span className="text-gradient-primary">amanhã</span>.
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-medium max-w-2xl mx-auto lg:mx-0">
              Seja bem-vindo ao espaço digital da <span className="font-semibold text-slate-800 dark:text-slate-200">{SCHOOL_INFO.name}</span>. Acompanhe comunicados oficiais, eventos, fotos de atividades pedagógicas e canais de contato.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href={SCHOOL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Falar no WhatsApp</span>
              </a>
              <Link
                href="/sobre"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-border text-foreground font-semibold px-8 py-4 rounded-2xl transition-all duration-300"
              >
                <span>Conhecer Escola</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Quick Contacts */}
            <div className="pt-6 border-t border-border/80 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-3 text-xs text-muted-foreground font-medium">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-emerald-500" />
                <span>Palhoça, SC</span>
              </div>
              <div className="flex items-center space-x-2">
                <InstagramIcon className="h-4 w-4 text-sky-500" />
                <a href={SCHOOL_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {SCHOOL_INFO.instagramHandle}
                </a>
              </div>
            </div>
          </div>

          {/* Hero Right Visuals */}
          <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none">
            <div className="relative z-10 glassmorphism-dark p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/10 space-y-6">
              
              {/* Highlight cards */}
              <div className="flex items-start space-x-4 border-b border-white/10 pb-4">
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Ano Letivo 2026</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Acompanhe o cronograma de avaliações, feriados e reuniões pedagógicas.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 border-b border-white/10 pb-4">
                <div className="p-3 rounded-xl bg-sky-500/20 text-sky-400">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Espaço do Estudante</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Informações sobre uniformes, merenda, horários de aulas e transporte escolar.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Avisos no Instagram</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Fique por dentro das últimas fotos, eventos e comunicados oficiais no feed.
                  </p>
                </div>
              </div>

            </div>

            {/* Visual background circle decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-indigo-500/10 blur-[60px] pointer-events-none -z-10" />
          </div>

        </div>
      </section>
    </div>
  );
}
