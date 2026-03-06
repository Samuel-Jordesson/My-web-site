import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <h1 className="text-[12rem] md:text-[18rem] font-bold leading-none tracking-tighter text-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none z-0">
          404
        </h1>
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.img
            src="https://raw.githubusercontent.com/Samuel-Jordesson/Estoque/refs/heads/master/Group%20157.png"
            alt="Página não encontrada"
            className="w-64 md:w-80 h-auto mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            referrerPolicy="no-referrer"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Oops! Página perdida no espaço.
          </h2>
          
          <p className="text-zinc-400 text-lg mb-12 max-w-md mx-auto">
            Parece que o caminho que você tentou seguir não existe ou foi removido.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <Link
              to="/"
              className="group relative px-10 py-4 border border-white text-white font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-white hover:text-black flex items-center justify-center gap-2"
            >
              <Home size={18} />
              <span>Início</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="px-10 py-4 border border-white/30 text-white font-bold uppercase tracking-widest hover:border-white transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              <span>Voltar</span>
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-white/5 rounded-full blur-[150px]" />
      </div>
    </div>
  );
};

export default NotFound;
