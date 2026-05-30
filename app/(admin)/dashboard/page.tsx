import { MessageSquareCode, FileArchive, ArrowRight, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userEmail = user?.email || 'Administrador';

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00185f] font-display">
            Bem-vindo ao Painel de Controle da Escola Benonívio!
          </h1>
          <p className="text-slate-500 font-medium text-sm sm:text-base">
            Gerencie as informações públicas do site de forma simples, rápida e sem necessidade de mexer em código.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-3 self-start md:self-auto shrink-0">
          <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sessão Iniciada</span>
            <span className="text-xs font-bold text-slate-700 block">{userEmail}</span>
          </div>
        </div>
      </div>

      {/* Grid of Actionable cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card: WhatsApp */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="p-3 bg-[#00185f]/5 text-[#00185f] w-fit rounded-xl">
              <MessageSquareCode className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#00185f] font-display">
                Grupos de WhatsApp
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Atualize os links e os nomes das turmas que aparecem no site para garantir que pais, responsáveis e estudantes entrem nos grupos de comunicação corretos.
              </p>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Resumo: Links Ativos</span>
            <Link
              href="/dashboard/whatsapp"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#00185f] hover:underline"
            >
              <span>Gerenciar</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Card: Documentos */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="p-3 bg-[#00185f]/5 text-[#00185f] w-fit rounded-xl">
              <FileArchive className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#00185f] font-display">
                Documentos Públicos
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Adicione novos editais, atas da APP, orçamentos, regulamentos escolares ou remova publicações antigas para manter a transparência da instituição escolar.
              </p>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Resumo: Editais & Atas</span>
            <Link
              href="/dashboard/documentos"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#00185f] hover:underline"
            >
              <span>Gerenciar</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

      </div>

      {/* Helpful Info Alert */}
      <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-2xl p-5 flex flex-col sm:flex-row items-start gap-4">
        <div className="text-sm font-medium leading-relaxed space-y-1">
          <span className="font-extrabold block text-blue-950">Dica de Segurança e Uso</span>
          <p className="text-blue-900/90 text-xs sm:text-sm">
            Todas as alterações salvas neste painel aparecem instantaneamente no site público. Lembre-se de sempre revisar os links e arquivos PDF antes de salvar. Ao terminar de usar, clique no botão <strong>Sair do Sistema</strong> para manter o painel seguro.
          </p>
        </div>
      </div>
    </div>
  );
}
