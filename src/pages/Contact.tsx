import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.messages.create(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4"
          >
            <span>Contato</span>
            <span>/</span>
            <span className="text-white">Vamos Conversar</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]"
          >
            Diga <br /> <span className="text-slate-500">Olá.</span>
          </motion.h1>
        </header>

        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-md">
              Tem um projeto em mente ou apenas quer bater um papo? Sinta-se à vontade para entrar em contato. Estou sempre aberto a novas oportunidades e colaborações criativas.
            </p>

            <div className="space-y-8">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Email</h4>
                <a href="mailto:samueljordessonjogo@gmail.com" className="text-2xl font-light hover:text-slate-400 transition-colors">
                  samueljordessonjogo@gmail.com
                </a>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Localização</h4>
                <p className="text-2xl font-light">Barcarena, Pará — Brasil</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Social</h4>
                <div className="flex gap-6">
                  <a href="https://www.linkedin.com/in/samuel-jordesson/" target="_blank" rel="noreferrer" className="text-sm font-bold uppercase tracking-widest hover:text-slate-400 transition-colors">
                    LinkedIn
                  </a>
                  <a href="https://github.com/Samuel-Jordesson" target="_blank" rel="noreferrer" className="text-sm font-bold uppercase tracking-widest hover:text-slate-400 transition-colors">
                    GitHub
                  </a>
                  <a href="https://www.instagram.com/samuel_jordesson" target="_blank" rel="noreferrer" className="text-sm font-bold uppercase tracking-widest hover:text-slate-400 transition-colors">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 border border-slate-800 bg-slate-900/20">
                <CheckCircle className="w-16 h-16 text-white mb-6" />
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Mensagem Enviada!</h3>
                <p className="text-slate-400 mb-8">Obrigado pelo contato. Responderei o mais breve possível.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="px-10 py-4 border border-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
                >
                  Enviar Outra
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Nome Completo</label>
                    <input 
                      required
                      className="w-full bg-black border border-slate-800 p-4 text-sm font-bold uppercase tracking-widest focus:border-white transition-colors outline-none"
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Endereço de Email</label>
                    <input 
                      required
                      className="w-full bg-black border border-slate-800 p-4 text-sm font-bold uppercase tracking-widest focus:border-white transition-colors outline-none"
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Telefone (Opcional)</label>
                  <input 
                    className="w-full bg-black border border-slate-800 p-4 text-sm font-bold uppercase tracking-widest focus:border-white transition-colors outline-none"
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Sua Mensagem</label>
                  <textarea 
                    required
                    rows={6}
                    className="w-full bg-black border border-slate-800 p-4 text-sm font-bold uppercase tracking-widest focus:border-white transition-colors outline-none resize-none"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <button 
                  disabled={status === 'sending'}
                  className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-200 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}
                  <Send className="w-4 h-4" />
                </button>
                {status === 'error' && (
                  <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">Ocorreu um erro ao enviar. Tente novamente.</p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
