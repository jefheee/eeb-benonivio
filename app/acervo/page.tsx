import { ImageIcon, Radio, ExternalLink } from "lucide-react";

interface GaleriaItem {
  title: string;
  year: "2019" | "2018";
  link: string;
}

const GALERIAS_FOTOS: GaleriaItem[] = [
  // 2019
  { title: "Homenagem aos Professores", year: "2019", link: "https://photos.google.com" },
  { title: "Bingo Beneficente AMBIAL", year: "2019", link: "https://photos.google.com" },
  { title: "Setembro Amarelo", year: "2019", link: "https://photos.google.com" },
  { title: "1ª Mostra Científica (MCC)", year: "2019", link: "https://photos.google.com" },
  { title: "Dia da Família", year: "2019", link: "https://photos.google.com" },
  // 2018
  { title: "Gincana de Halloween", year: "2018", link: "https://photos.google.com" },
  { title: "Feiras de Matemática", year: "2018", link: "https://photos.google.com" },
  { title: "Um Pé de Quê?", year: "2018", link: "https://photos.google.com" },
];

export default function AcervoPage() {
  const galleries2019 = GALERIAS_FOTOS.filter((g) => g.year === "2019");
  const galleries2018 = GALERIAS_FOTOS.filter((g) => g.year === "2018");

  return (
    <div className="py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-primary font-display">
          Acervo Histórico & Galerias
        </h1>
        <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
        <p className="text-slate-600 font-medium">
          Acompanhe os momentos marcantes, eventos da nossa comunidade escolar e projetos realizados.
        </p>
      </div>

      {/* Seção Galerias - Aconteceu no Benô */}
      <div className="space-y-8">
        <div className="flex items-center space-x-3 text-primary border-b pb-4">
          <ImageIcon className="h-6 w-6 text-secondary" />
          <h2 className="text-2xl font-bold">Galerias &quot;Aconteceu no Benô&quot;</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Galerias 2019 Card */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-primary">Edição 2019</h3>
            <div className="space-y-3">
              {galleries2019.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-slate-50 transition-all font-semibold text-slate-700 text-sm outline-none"
                >
                  <span>{item.title}</span>
                  <div className="flex items-center space-x-1.5 text-secondary text-xs">
                    <span>Acessar Álbum</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Galerias 2018 Card */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-primary">Edição 2018</h3>
            <div className="space-y-3">
              {galleries2018.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-slate-50 transition-all font-semibold text-slate-700 text-sm outline-none"
                >
                  <span>{item.title}</span>
                  <div className="flex items-center space-x-1.5 text-secondary text-xs">
                    <span>Acessar Álbum</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Seção Grupo de Estudos (Podcast) */}
      <div className="space-y-6 bg-white border border-slate-200 shadow-sm rounded-xl p-6">
        <div className="flex items-center space-x-3 text-primary border-b pb-4">
          <Radio className="h-6 w-6 text-secondary" />
          <h2 className="text-2xl font-bold">Grupo de Estudos (ENEM)</h2>
        </div>
        
        <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-3xl">
          Como resposta aos desafios da Pandemia em 2020, criamos um projeto colaborativo de preparação para o Exame Nacional do Ensino Médio (ENEM). Os episódios de podcasts auxiliam estudantes em revisões focadas de conteúdos das principais áreas.
        </p>

        {/* Podcast Spotify Embed */}
        <div className="w-full max-w-2xl mt-4 rounded-xl overflow-hidden shadow-sm border border-slate-200">
          <iframe 
            src="https://open.spotify.com/embed/show/COLOQUE_O_ID_DO_PODCAST_AQUI?utm_source=generator&theme=0" 
            width="100%" 
            height="352" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy" 
            title="Podcast Grupo de Estudos"
            className="border-none"
          ></iframe>
        </div>
      </div>

    </div>
  );
}
