import { MessageSquare, Smile, BookOpen, FlaskConical, ChevronRight } from "lucide-react";

const turmasData = {
  anosIniciais: [
    { nome: "2º ao 5º Ano", link: "https://chat.whatsapp.com/FyKxKQLc0ulH2zWNDBifjx" }
  ],
  fundamentalII: [
    { nome: "Turma 61", link: "https://chat.whatsapp.com/HoinMwf1QHtHuDYIxq3I2j" },
    { nome: "Turma 62", link: "https://chat.whatsapp.com/HSrKHFgiP5C3JsTdMHE93Y" },
    { nome: "Turma 63", link: "https://chat.whatsapp.com/F8wPDn4WddJDmXsQzqr3pb" },
    { nome: "Turma 64", link: "https://chat.whatsapp.com/Lxf3GaoqnkoBOfmbigkoJ2" },
    { nome: "Turma 71", link: "https://chat.whatsapp.com/JwVk5xO0PqgJZal7OxlGvo" },
    { nome: "Turma 72", link: "https://chat.whatsapp.com/CiumYb9ByLRAGEgn3ZFgQG" },
    { nome: "Turma 73", link: "https://chat.whatsapp.com/LolbrdIMCvCFLXpdBLfgwc" },
    { nome: "Turma 74", link: "https://chat.whatsapp.com/KByYaG8c4ggBqNZ1RoLa03" },
    { nome: "Turma 81", link: "https://chat.whatsapp.com/I5Zs07Dg7H2KKHtQ27tM0E" },
    { nome: "Turma 82", link: "https://chat.whatsapp.com/EkiZ9HoL2VD79E1lITS7df" },
    { nome: "Turma 83", link: "https://chat.whatsapp.com/BvOA8Ybi0ei3xdlIjhW1JI" },
    { nome: "Turma 91", link: "https://chat.whatsapp.com/DuRON2A5XWfC7JvDBnGXJN" },
    { nome: "Turma 92", link: "https://chat.whatsapp.com/IvFS3I3prrE70i7ZlKob4Y" },
    { nome: "Turma 93", link: "https://chat.whatsapp.com/ECMTjYyfVn2313vn8KMwpk" }
  ],
  ensinoMedio: [
    { nome: "Turma 100", link: "https://chat.whatsapp.com/HWMuegcCLVFI9ee8VGJYHz" },
    { nome: "Turma 101", link: "https://chat.whatsapp.com/EC0I3OXLbXy3GeEbo5caBC" },
    { nome: "Turma 102", link: "https://chat.whatsapp.com/CtWM4a5gMAmDJNPJs2YQMI" },
    { nome: "Turma 103", link: "https://chat.whatsapp.com/LrQn6rDjzyI0nHhNlCpdEf" },
    { nome: "Turma 104", link: "https://chat.whatsapp.com/IMk6CRW3cOZBsvw6rrbdIw" },
    { nome: "Turma 105", link: "https://chat.whatsapp.com/HBAFExjkUDgFQxpRUT6J1a" },
    { nome: "Turma 106", link: "https://chat.whatsapp.com/FohjfgJ9GGK7tcBedeItde" },
    { nome: "Turma 107", link: "https://chat.whatsapp.com/DwF2v6ZCbSuFZ3i3gOeGgI" },
    { nome: "Turma 108", link: "https://chat.whatsapp.com/LuspAjYnWc6ILRg4kNpvev" },
    { nome: "Turma 200", link: "https://chat.whatsapp.com/BckqrDmIcJIEgupP3stRmk" },
    { nome: "Turma 201", link: "https://chat.whatsapp.com/CS602vEmhcJ9U4MadJMIGp" },
    { nome: "Turma 202", link: "https://chat.whatsapp.com/EbqC8uSDuwL4Xs6TOesPkt" },
    { nome: "Turma 203", link: "https://chat.whatsapp.com/La0dcWgq2uSFMjK4Mqw7WB" },
    { nome: "Turma 204", link: "https://chat.whatsapp.com/H8ewMYJFWga013QM1oJGGb" },
    { nome: "Turma 205", link: "https://chat.whatsapp.com/ITPXAkuMT6u9Yj1zNikd6e" },
    { nome: "Turma 300", link: "https://chat.whatsapp.com/Iw4hTCa1ExU9fL0rjtleZj" },
    { nome: "Turma 301", link: "https://chat.whatsapp.com/LG0P3tWVCJoKmrg4SPFFtU" },
    { nome: "Turma 302", link: "https://chat.whatsapp.com/JBkQmQVX2PT6XQlZtzz7Ha" }
  ]
};

export default function TurmasGrid() {
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
              {turmasData.anosIniciais.map((turma) => (
                <a
                  key={turma.nome}
                  href={turma.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pure-white border border-soft-border rounded-lg p-4 shadow-subtle flex items-center justify-between hover:border-secondary transition-colors cursor-pointer group outline-none"
                >
                  <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">
                    {turma.nome}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400 group-hover:text-secondary transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </a>
              ))}
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
              {turmasData.fundamentalII.map((turma) => (
                <a
                  key={turma.nome}
                  href={turma.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pure-white border border-soft-border rounded-lg p-4 shadow-subtle flex items-center justify-between hover:border-secondary transition-colors cursor-pointer group outline-none"
                >
                  <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">
                    {turma.nome}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400 group-hover:text-secondary transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </a>
              ))}
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
              {turmasData.ensinoMedio.map((turma) => (
                <a
                  key={turma.nome}
                  href={turma.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pure-white border border-soft-border rounded-lg p-4 shadow-subtle flex items-center justify-between hover:border-secondary transition-colors cursor-pointer group outline-none"
                >
                  <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">
                    {turma.nome}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400 group-hover:text-secondary transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
