'use client';

import { useState, useTransition } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Plus, Search, Edit2, Trash2, X, AlertCircle, CheckCircle2, MessageSquare, Megaphone, Link as LinkIcon, Trash } from 'lucide-react';
import { EscolaTurma, EscolaTurmaPost, saveTurma, deleteTurma, getPostsAdmin, savePost, deletePost } from '../actions';

interface ManagerProps {
  initialTurmas: EscolaTurma[];
}

const formInitialState = {
  error: null as string | null,
  success: false as boolean,
};

export default function TurmasManager({ initialTurmas }: ManagerProps) {
  const [turmas, setTurmas] = useState<EscolaTurma[]>(initialTurmas);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTurmaModalOpen, setIsTurmaModalOpen] = useState(false);
  const [editingTurma, setEditingTurma] = useState<EscolaTurma | null>(null);
  
  // Custom links state for the active form
  const [outrosLinks, setOutrosLinks] = useState<{ titulo: string; url: string }[]>([]);
  const [newLinkTitulo, setNewLinkTitulo] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  // Posts Feed state for a selected class
  const [selectedTurmaForPosts, setSelectedTurmaForPosts] = useState<EscolaTurma | null>(null);
  const [posts, setPosts] = useState<EscolaTurmaPost[]>([]);
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [newPostTitulo, setNewPostTitulo] = useState('');
  const [newPostConteudo, setNewPostConteudo] = useState('');

  const [, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Form State for Turma Save
  const [turmaFormState, turmaFormAction] = useFormState(async (state: unknown, formData: FormData) => {
    // Append the JSON serialized other links to formData
    formData.append('outros_links', JSON.stringify(outrosLinks));
    const res = await saveTurma(state, formData);
    if (res.success) {
      setIsTurmaModalOpen(false);
      setEditingTurma(null);
      showFeedback('success', 'Turma salva com sucesso!');
      window.location.reload();
      return { error: null, success: true };
    } else {
      return { error: res.error || 'Erro ao salvar turma.', success: false };
    }
  }, formInitialState);

  // Form State for Post Save
  const [postFormState, postFormAction] = useFormState(async (state: unknown, formData: FormData) => {
    if (!selectedTurmaForPosts) return { error: 'Turma não selecionada.', success: false };
    formData.append('turma_id', selectedTurmaForPosts.id);
    const res = await savePost(state, formData);
    if (res.success) {
      setIsPostFormOpen(false);
      setNewPostTitulo('');
      setNewPostConteudo('');
      showFeedback('success', 'Recado publicado com sucesso!');
      // Refresh posts list
      const freshPosts = await getPostsAdmin(selectedTurmaForPosts.id);
      setPosts(freshPosts);
      return { error: null, success: true };
    } else {
      return { error: res.error || 'Erro ao publicar recado.', success: false };
    }
  }, formInitialState);

  const handleOpenAddTurma = () => {
    setEditingTurma(null);
    setOutrosLinks([]);
    setNewLinkTitulo('');
    setNewLinkUrl('');
    setIsTurmaModalOpen(true);
  };

  const handleOpenEditTurma = (turma: EscolaTurma) => {
    setEditingTurma(turma);
    setOutrosLinks(turma.outros_links || []);
    setNewLinkTitulo('');
    setNewLinkUrl('');
    setIsTurmaModalOpen(true);
  };

  const handleAddLink = () => {
    if (!newLinkTitulo || !newLinkUrl) return;
    setOutrosLinks([...outrosLinks, { titulo: newLinkTitulo, url: newLinkUrl }]);
    setNewLinkTitulo('');
    setNewLinkUrl('');
  };

  const handleRemoveLink = (index: number) => {
    setOutrosLinks(outrosLinks.filter((_, i) => i !== index));
  };

  const handleDeleteTurma = (id: string) => {
    if (confirm('Deseja excluir esta turma? Todos os recados atrelados a ela serão deletados permanentemente.')) {
      startTransition(async () => {
        const res = await deleteTurma(id);
        if (res.success) {
          setTurmas(turmas.filter(t => t.id !== id));
          showFeedback('success', 'Turma excluída com sucesso!');
          window.location.reload();
        } else {
          showFeedback('error', res.error || 'Erro ao excluir.');
        }
      });
    }
  };

  // Open posts modal and fetch posts
  const handleOpenPosts = (turma: EscolaTurma) => {
    setSelectedTurmaForPosts(turma);
    setPosts([]);
    setIsPostFormOpen(false);
    startTransition(async () => {
      try {
        const data = await getPostsAdmin(turma.id);
        setPosts(data);
      } catch {
        showFeedback('error', 'Erro ao carregar recados.');
      }
    });
  };

  const handleDeletePost = (postId: string) => {
    if (!selectedTurmaForPosts) return;
    if (confirm('Tem certeza que deseja excluir este recado?')) {
      startTransition(async () => {
        const res = await deletePost(postId, selectedTurmaForPosts.id);
        if (res.success) {
          setPosts(posts.filter(p => p.id !== postId));
          showFeedback('success', 'Recado excluído com sucesso!');
        } else {
          showFeedback('error', res.error || 'Erro ao excluir.');
        }
      });
    }
  };

  const filteredTurmas = turmas.filter(t => 
    t.ano.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.turno.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Toast Feedback */}
      {feedback && (
        <div className={`fixed bottom-5 right-5 z-50 p-4 rounded-xl shadow-lg border flex items-center gap-3 max-w-sm animate-fadeIn ${
          feedback.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {feedback.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
          )}
          <span className="text-sm font-semibold">{feedback.message}</span>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Pesquisar por ano escolar, turma ou turno..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:border-[#00185f] focus:ring-1 focus:ring-[#00185f] outline-none transition-all shadow-sm"
          />
        </div>

        {/* Add Class Button */}
        <button
          onClick={handleOpenAddTurma}
          className="bg-[#00185f] hover:bg-[#001144] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 outline-none"
        >
          <Plus className="h-4 w-4" />
          <span>Cadastrar Turma</span>
        </button>
      </div>

      {/* Table grid card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ano / Série</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Identificador (Nome)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Turno</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Recursos Extras</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredTurmas.length > 0 ? (
                filteredTurmas.map((turma) => (
                  <tr key={turma.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Ano */}
                    <td className="px-6 py-4 font-semibold text-slate-900">{turma.ano}</td>
                    
                    {/* Nome */}
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-md">
                        {turma.nome}
                      </span>
                    </td>

                    {/* Turno */}
                    <td className="px-6 py-4">
                      <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        turma.turno === 'Matutino' 
                          ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                          : turma.turno === 'Vespertino'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : turma.turno === 'Noturno'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-slate-50 text-slate-700 border border-slate-200'
                      }`}>
                        {turma.turno}
                      </span>
                    </td>

                    {/* Extras summary */}
                    <td className="px-6 py-4 text-xs font-semibold text-slate-500 space-y-1">
                      {turma.whatsapp_link && (
                        <div className="flex items-center gap-1 text-emerald-600">
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Grupo WhatsApp</span>
                        </div>
                      )}
                      {turma.outros_links && turma.outros_links.length > 0 && (
                        <div className="flex items-center gap-1 text-slate-600">
                          <LinkIcon className="h-3.5 w-3.5" />
                          <span>{turma.outros_links.length} Link(s) Adicional(is)</span>
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Mural button */}
                        <button
                          onClick={() => handleOpenPosts(turma)}
                          title="Recados da Turma"
                          className="px-3 py-1.5 bg-[#00185f]/5 text-[#00185f] hover:bg-[#00185f]/10 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Megaphone className="h-3.5 w-3.5" />
                          <span>Recados</span>
                        </button>
                        
                        <button
                          onClick={() => handleOpenEditTurma(turma)}
                          title="Editar turma"
                          className="p-2 hover:bg-slate-100 text-slate-600 hover:text-slate-950 rounded-lg transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTurma(turma.id)}
                          title="Excluir turma"
                          className="p-2 hover:bg-red-50 text-slate-600 hover:text-red-650 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">
                    Nenhuma turma encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Turma Add/Edit Form */}
      {isTurmaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col animate-scaleIn">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
              <h3 className="font-display font-extrabold text-lg text-[#00185f]">
                {editingTurma ? 'Editar Turma' : 'Cadastrar Nova Turma'}
              </h3>
              <button 
                onClick={() => setIsTurmaModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form action={turmaFormAction} className="overflow-y-auto p-6 space-y-4 flex-grow">
              {editingTurma && <input type="hidden" name="id" value={editingTurma.id} />}

              {turmaFormState?.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3 text-sm font-medium">
                  <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <span>{turmaFormState.error}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {/* Ano */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase block">Ano Escolar / Série</label>
                  <input
                    name="ano"
                    type="text"
                    required
                    placeholder="Ex: 6º Ano, 3º Médio"
                    defaultValue={editingTurma?.ano || ''}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-805 placeholder-slate-400 focus:bg-white focus:border-[#00185f] focus:ring-1 focus:ring-[#00185f] outline-none"
                  />
                </div>

                {/* Nome */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase block">Identificador (Turma)</label>
                  <input
                    name="nome"
                    type="text"
                    required
                    placeholder="Ex: 61, 302"
                    defaultValue={editingTurma?.nome || ''}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-805 placeholder-slate-400 focus:bg-white focus:border-[#00185f] focus:ring-1 focus:ring-[#00185f] outline-none"
                  />
                </div>
              </div>

              {/* Turno Select */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase block">Turno</label>
                <select
                  name="turno"
                  defaultValue={editingTurma?.turno || 'Matutino'}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:border-[#00185f] focus:ring-1 focus:ring-[#00185f] outline-none"
                >
                  <option value="Matutino">Matutino</option>
                  <option value="Vespertino">Vespertino</option>
                  <option value="Noturno">Noturno</option>
                  <option value="Geral">Geral (Ambos)</option>
                </select>
              </div>

              {/* Link do WhatsApp */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase block">Link de Convite do WhatsApp (Opcional)</label>
                <input
                  name="whatsapp_link"
                  type="url"
                  placeholder="https://chat.whatsapp.com/..."
                  defaultValue={editingTurma?.whatsapp_link || ''}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-805 placeholder-slate-400 focus:bg-white focus:border-[#00185f] focus:ring-1 focus:ring-[#00185f] outline-none"
                />
              </div>

              {/* Outros Links (JSONB manager) */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 uppercase block">Links de Recursos Extras (Opcional)</label>
                
                {/* Addition controls */}
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Título (Ex: Roteiro de Estudos)"
                    value={newLinkTitulo}
                    onChange={(e) => setNewLinkTitulo(e.target.value)}
                    className="px-3.5 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="URL (https://...)"
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                      className="flex-1 px-3.5 py-2 border border-slate-200 rounded-lg text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddLink}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 rounded-lg text-xs"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>

                {/* List of links */}
                <div className="space-y-2 max-h-24 overflow-y-auto">
                  {outrosLinks.map((link, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-xs">
                      <div className="truncate pr-4">
                        <strong className="text-[#00185f]">{link.titulo}:</strong> <span className="text-slate-500">{link.url}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsTurmaModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-650 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <SubmitButton label="Salvar Turma" />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Recados / Turma Posts Feed Manager */}
      {selectedTurmaForPosts && (
        <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col animate-scaleIn">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-display font-extrabold text-lg text-[#00185f]">
                  Mural de Recados: {selectedTurmaForPosts.ano} - Turma {selectedTurmaForPosts.nome}
                </h3>
                <span className="text-xs text-slate-500 font-medium">Publique comunicados específicos para esta classe.</span>
              </div>
              <button 
                onClick={() => setSelectedTurmaForPosts(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-650 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Side: Create Announcement */}
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-5 space-y-4 h-fit">
                <h4 className="font-bold text-[#00185f] text-sm border-b border-slate-200 pb-2">
                  {isPostFormOpen ? 'Escrever Recado' : 'Publicar Recado'}
                </h4>
                
                <form action={postFormAction} className="space-y-4">
                  {postFormState?.error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs font-semibold">
                      {postFormState.error}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-650 uppercase block">Título do Recado</label>
                    <input
                      name="titulo"
                      type="text"
                      required
                      placeholder="Ex: Tarefa de História para 12/06"
                      value={newPostTitulo}
                      onChange={(e) => setNewPostTitulo(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-655 uppercase block">Conteúdo / Recado</label>
                    <textarea
                      name="conteudo"
                      required
                      rows={4}
                      placeholder="Escreva a mensagem completa..."
                      value={newPostConteudo}
                      onChange={(e) => setNewPostConteudo(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none resize-none"
                    />
                  </div>

                  <SubmitButton label="Publicar no Mural" />
                </form>
              </div>

              {/* Right Side: Timeline/Feed */}
              <div className="space-y-4 flex flex-col overflow-y-auto max-h-[50vh]">
                <h4 className="font-bold text-[#00185f] text-sm border-b border-slate-200 pb-2 shrink-0">
                  Histórico de Publicações ({posts.length})
                </h4>

                <div className="space-y-3 flex-grow overflow-y-auto pr-1">
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <div key={post.id} className="bg-white border border-slate-150 rounded-xl p-4 space-y-2 shadow-sm relative group hover:border-[#00185f] transition-all">
                        <div className="flex items-start justify-between">
                          <span className="text-[10px] font-bold text-slate-400">
                            {new Date(post.created_at).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Deletar recado"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <h5 className="font-bold text-[#00185f] text-sm leading-snug">{post.titulo}</h5>
                        <p className="text-slate-600 text-xs leading-relaxed whitespace-pre-wrap">{post.conteudo}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-slate-400 text-xs py-8">Nenhum recado publicado para esta turma.</p>
                  )}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedTurmaForPosts(null)}
                className="bg-[#00185f] hover:bg-[#001144] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function SubmitButton({ label = 'Salvar' }: { label?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-[#00185f] hover:bg-[#001144] disabled:opacity-50 text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow-sm transition-colors outline-none"
    >
      {pending ? 'Processando...' : label}
    </button>
  );
}
