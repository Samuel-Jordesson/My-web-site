import React, { useEffect, useState } from 'react';
import { Trash2, Mail, Phone, User, Calendar } from 'lucide-react';
import { api } from '../../services/api';
import { Message } from '../../types';
import ConfirmationModal from '../../components/ConfirmationModal';

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await api.messages.getAll();
      setMessages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setMessageToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (messageToDelete) {
      try {
        await api.messages.delete(messageToDelete);
        setMessages(messages.filter(m => m.id !== messageToDelete));
        setMessageToDelete(null);
      } catch (error) {
        console.error('Erro ao deletar mensagem:', error);
      }
    }
  };

  return (
    <div className="flex flex-col max-w-6xl mx-auto w-full">
      <header className="mb-12">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
          <span>Área de Trabalho</span>
          <span>/</span>
          <span className="text-slate-300">Comunicação</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Mensagens</h1>
      </header>

      {loading ? (
        <div className="py-20 text-center text-slate-500 animate-pulse uppercase tracking-widest text-xs">Carregando mensagens...</div>
      ) : messages.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-slate-800 rounded-lg">
          <Mail className="w-12 h-12 text-slate-800 mx-auto mb-4" />
          <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">Nenhuma mensagem recebida ainda.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {messages.map((msg) => (
            <div key={msg.id} className="group border border-slate-800 bg-slate-900/20 hover:border-slate-600 transition-all p-8 relative">
              <button 
                onClick={() => handleDeleteClick(msg.id)}
                className="absolute top-8 right-8 text-slate-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <User className="w-3 h-3" />
                    Nome
                  </div>
                  <p className="text-sm font-bold text-white uppercase tracking-tight">{msg.name}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <Mail className="w-3 h-3" />
                    Email
                  </div>
                  <a href={`mailto:${msg.email}`} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">{msg.email}</a>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <Phone className="w-3 h-3" />
                    Telefone
                  </div>
                  <p className="text-sm font-bold text-slate-300">{msg.phone || 'Não informado'}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Mensagem
                </div>
                <p className="text-slate-400 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                  <Calendar className="w-3 h-3" />
                  {new Date(msg.created_at).toLocaleString('pt-BR')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Mensagem"
        message="Tem certeza que deseja excluir esta mensagem? Esta ação não pode ser desfeita."
      />
    </div>
  );
}
