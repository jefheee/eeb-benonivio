import Image from "next/image";
import { MapPin, Award, BookOpen, Users, Zap, Globe, Milestone, GraduationCap, Medal, CheckCircle } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/constants";

export const dynamic = 'force-dynamic';

export default async function SobrePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-block bg-[#00185f]/5 text-[#00185f] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase border border-[#00185f]/15 mb-1 tracking-wider">
          Quem Somos
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#00185f] font-display leading-tight">
          Nossa Escola, Nossa História
        </h1>
        <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
        <p className="text-slate-500 font-semibold text-lg max-w-2xl mx-auto leading-relaxed">
          Conheça o compromisso social, a trajetória comunitária e a excelência pedagógica da E.E.B. Professor Benonívio João Martins.
        </p>
      </div>

      {/* Intro section */}
      <div className="bg-gradient-to-br from-[#00185f] to-[#0B1B42] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-4 md:w-2/3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider text-amber-400">
            <GraduationCap className="h-4 w-4" />
            <span>Polo Educacional</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display leading-tight">
            EEB Professor Benonívio João Martins
          </h2>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
            MEC / INEP: <span className="font-extrabold text-white">42004047</span>. A instituição atua como um vital polo comunitário no bairro <span className="font-extrabold text-white">Brejaru I</span>, Palhoça/SC, atendendo cerca de <span className="font-extrabold text-white">1.300 alunos</span> nos turnos matutino, vespertino e noturno.
          </p>
        </div>
        <div className="md:w-1/3 w-full grid grid-cols-2 gap-3 text-center shrink-0">
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
            <span className="block text-2xl font-extrabold text-white font-display">1.300+</span>
            <span className="text-[10px] text-slate-300 font-bold uppercase block mt-1">Alunos Ativos</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
            <span className="block text-2xl font-extrabold text-white font-display">3</span>
            <span className="text-[10px] text-slate-300 font-bold uppercase block mt-1">Turnos letivos</span>
          </div>
        </div>
      </div>

      {/* Dossier Structured Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left/Middle: Editorial Content (Span 2) */}
        <div className="lg:col-span-2 space-y-12 text-left">
          
          {/* Section 1: História & Território */}
          <section className="space-y-4">
            <h3 className="font-display font-extrabold text-2xl text-[#00185f] pb-3 border-b border-slate-100 flex items-center gap-2">
              <Milestone className="h-6 w-6 text-secondary shrink-0" />
              <span>Nossa História (O Brejaru)</span>
            </h3>
            <p className="text-slate-655 font-medium leading-relaxed text-sm sm:text-base">
              Fundada gradativamente nos anos 80 e formalizada pela <span className="font-bold text-[#00185f]">Portaria Nº 47 de 1984</span>, a escola cresceu lado a lado com a urbanização e estruturação da comunidade Frei Damião e arredores. 
            </p>
            <p className="text-slate-655 font-medium leading-relaxed text-sm sm:text-base">
              Como a primeira grande presença do Estado na região do Brejaru, a E.E.B. Professor Benonívio João Martins atuou historicamente não apenas como local de ensino, mas como um verdadeiro vetor de mobilidade social, proteção coletiva e centro de cidadania. A escola orgulha-se de ter caminhado ao lado de lutas históricas da comunidade, simbolizadas em marcos como a Carta do Brejaru.
            </p>
          </section>

          {/* Section 2: Patrono Bio */}
          <section className="space-y-5 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
            <h3 className="font-display font-extrabold text-2xl text-[#00185f] pb-3 border-b border-slate-200 flex items-center gap-2">
              <Award className="h-6 w-6 text-secondary shrink-0" />
              <span>Quem foi o Patrono?</span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="flex-shrink-0 w-36 h-48 border border-slate-200 rounded-2xl overflow-hidden shadow-sm relative bg-slate-200">
                <Image
                  src="/assets/images/professor-benonivio-joao-martins.jpeg"
                  alt="Professor Benonívio João Martins"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3 flex-grow text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                <div className="bg-[#00185f]/5 border-l-4 border-l-[#00185f] p-3 rounded-r-xl">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Patrono da Instituição</span>
                  <span className="block text-base font-extrabold text-[#00185f]">Professor Benonívio João Martins</span>
                  <span className="block text-[10px] text-slate-500 font-bold">(1933 — 1978)</span>
                </div>
                <p>
                  Nascido em Palhoça, formou-se no tradicional <span className="font-semibold text-slate-800">Normal Regional Duarte Schutel</span> e posteriormente graduou-se em Administração pela <span className="font-semibold text-slate-800">UDESC</span>.
                </p>
                <p>
                  Dedicou sua carreira inteiramente à instrução pública catarinense, dirigindo escolas na região da Grande Florianópolis e liderando projetos voltados ao engajamento de jovens e incentivo à leitura, antes de seu precoce falecimento aos 45 anos.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Pedagogia & Indicadores */}
          <section className="space-y-4">
            <h3 className="font-display font-extrabold text-2xl text-[#00185f] pb-3 border-b border-slate-100 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-secondary shrink-0" />
              <span>Excelência Pedagógica e Indicadores</span>
            </h3>
            <p className="text-slate-655 font-medium leading-relaxed text-sm sm:text-base">
              A equipe pedagógica trabalha sob fortes pilares de inclusão, combate à evasão escolar e desenvolvimento do pensamento científico. O resultado desse comprometimento é refletido nos avanços das avaliações do <span className="font-bold text-slate-800">SAEB</span> e <span className="font-bold text-slate-800">IDEB</span>, com a instituição atingindo marcas superiores a <span className="font-bold text-[#00185f]">95% de aprovação</span> nos anos iniciais e finais letivos.
            </p>
            
            {/* Projetos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
              <div className="border border-slate-200 rounded-2xl p-5 space-y-2 bg-white shadow-subtle hover:border-[#00185f]/30 transition-colors">
                <span className="text-[10px] font-extrabold text-[#bc0100] uppercase block">Destaque Científico</span>
                <h4 className="font-bold text-slate-900 text-sm">Feira Catarinense de Matemática</h4>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Premiação estadual e reconhecimento institucional pelo projeto &quot;Videoaulas de Matemática&quot;, produzido de forma inovadora pelos docentes durante o período pandêmico.
                </p>
              </div>

              <div className="border border-slate-200 rounded-2xl p-5 space-y-2 bg-white shadow-subtle hover:border-[#00185f]/30 transition-colors">
                <span className="text-[10px] font-extrabold text-[#bc0100] uppercase block">Incentivo à Escrita</span>
                <h4 className="font-bold text-slate-900 text-sm">Revista Okaza</h4>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Periódico institucional criado e mantido pela escola que serve como vitrine para a escrita dos alunos, focado inteiramente na democratização do saber e protagonismo literário.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Esportes, Cultura & Parcerias */}
          <section className="space-y-4">
            <h3 className="font-display font-extrabold text-2xl text-[#00185f] pb-3 border-b border-slate-100 flex items-center gap-2">
              <Medal className="h-6 w-6 text-secondary shrink-0" />
              <span>Esporte, Cultura & Parcerias</span>
            </h3>
            <p className="text-slate-655 font-medium leading-relaxed text-sm sm:text-base">
              O desporto escolar é uma das principais bandeiras de integração. A escola detém uma sólida tradição de medalhas nos Jogos Escolares de Santa Catarina (<span className="font-semibold text-slate-800">JESC</span>), com destaque histórico para as categorias de atletismo e o protagonismo do futsal feminino.
            </p>
            <p className="text-slate-655 font-medium leading-relaxed text-sm sm:text-base">
              No campo acadêmico, a instituição atua como parceira e campo de estágio para licenciandos do programa <span className="font-bold text-[#00185f]">PIBID / UFSC</span>, além de promover visitas de imersão de alunos dos anos finais aos campus científicos da <span className="font-bold text-[#00185f]">UDESC</span>.
            </p>
          </section>

        </div>

        {/* Right Panel: Stats & Infrastructure info (Span 1) */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Card 1: Infraestrutura */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 text-left">
            <h4 className="font-display font-extrabold text-lg text-[#00185f] border-b pb-3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-secondary shrink-0" />
              <span>Estrutura & Gestão</span>
            </h4>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Reformulada estruturalmente em 2007 (com investimento de mais de R$ 1 milhão), a escola possui quadras poliesportivas, pátios pavimentados e laboratórios de suporte.
            </p>
            <ul className="space-y-3.5 text-xs text-slate-600 font-semibold">
              <li className="flex items-start gap-2.5">
                <div className="p-1 bg-emerald-50 text-emerald-600 rounded-md shrink-0 mt-0.5">
                  <CheckCircle className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="text-slate-800 font-bold block">Gestão Compartilhada</span>
                  <span>Transparência na aplicação de verbas em conjunto com a Associação de Pais e Professores (APP).</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="p-1 bg-sky-50 text-sky-600 rounded-md shrink-0 mt-0.5">
                  <Globe className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="text-slate-800 font-bold block">Conexão Estável</span>
                  <span>Internet de alta velocidade distribuída por rede interna para suporte pedagógico.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="p-1 bg-amber-50 text-amber-600 rounded-md shrink-0 mt-0.5">
                  <Users className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="text-slate-800 font-bold block">Participação Ativa</span>
                  <span>Assembleias periódicas do Colegiado para planejamento orçamentário participativo.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Card 2: Localização */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-left">
            <h4 className="font-display font-extrabold text-lg text-[#00185f] border-b pb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-secondary shrink-0" />
              <span>Localização</span>
            </h4>
            <div className="space-y-1">
              <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Endereço da Secretaria</span>
              <p className="text-xs text-slate-600 font-bold leading-relaxed">
                {SCHOOL_INFO.address.street}, {SCHOOL_INFO.address.number} - {SCHOOL_INFO.address.neighborhood}<br />
                {SCHOOL_INFO.address.city}/{SCHOOL_INFO.address.state} (CEP: {SCHOOL_INFO.address.zipCode})
              </p>
            </div>
            
            {/* Embed Map */}
            <div className="w-full h-44 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1767.54989144233!2d-48.667191048476354!3d-27.621426117409058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9527358fbaaaaaab%3A0xa4a4e87166b392b7!2sEeb%20Prof%20Benonivio%20Joao%20Martins!5e0!3m2!1spt-BR!2sbr!4v1779936658693!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
