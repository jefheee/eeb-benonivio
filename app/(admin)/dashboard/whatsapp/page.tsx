import { getTurmasAdmin } from './actions';
import WhatsappManager from './components/whatsapp-manager';

export const dynamic = 'force-dynamic';

export default async function WhatsappDashboardPage() {
  const groups = await getTurmasAdmin();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-[#00185f] font-display">
          Gerenciar Links de WhatsApp
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Adicione, edite ou remova os canais de avisos de cada turma para sincronização automática com o site público.
        </p>
      </div>

      <WhatsappManager initialGroups={groups} />
    </div>
  );
}
