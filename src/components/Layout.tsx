import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Sobre', href: '/about' },
    { name: 'Projetos', href: '/projects' },
    { name: 'Contato', href: '/contact' },
  ];

  return (
    <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4 py-6 md:px-20 lg:px-40 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <Link to="/" className="flex items-center group">
        <img 
          src="https://raw.githubusercontent.com/Samuel-Jordesson/Estoque/refs/heads/master/Group%20156.png" 
          alt="Logo" 
          className="h-10 w-auto object-contain"
          referrerPolicy="no-referrer"
        />
      </Link>

      <nav className="hidden md:flex flex-1 justify-end items-center gap-12">
        <div className="flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-medium hover:line-through transition-all ${
                location.pathname === link.href ? 'text-white border-b border-white' : 'text-slate-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <Link 
          to="/curriculo"
          className="flex min-w-[100px] items-center justify-center border border-slate-900 dark:border-slate-100 px-6 py-2 text-sm font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white dark:hover:bg-slate-100 dark:hover:text-black transition-colors"
        >
          Currículo
        </Link>
      </nav>

      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-slate-800 p-8 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold uppercase tracking-widest hover:line-through"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/curriculo"
              onClick={() => setIsOpen(false)}
              className="w-full border border-white py-4 font-bold uppercase tracking-widest text-center"
            >
              Currículo
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-10 border-t border-slate-200 dark:border-slate-800 px-4 py-16 md:px-20 lg:px-40 bg-black">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <a href="https://github.com/Samuel-Jordesson" target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-widest hover:text-slate-500 transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/samuel-jordesson/" target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-widest hover:text-slate-500 transition-colors">LinkedIn</a>
          <a href="https://www.instagram.com/samuel_jordesson/" target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-widest hover:text-slate-500 transition-colors">Instagram</a>
        </div>
        <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
          © {new Date().getFullYear()} Samuel Jordesson Portfólio de Desenvolvedor
        </p>
      </div>
    </footer>
  );
};
