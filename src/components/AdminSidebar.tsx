import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Tags, Mail, Settings, LogOut, Menu, X } from 'lucide-react';

import { supabase } from '../services/supabase';

export const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const links = [
    { name: 'Dashboard', href: '/areadetrabalho', icon: LayoutDashboard },
    { name: 'Projetos', href: '/areadetrabalho/projects', icon: FolderKanban },
    { name: 'Categorias', href: '/areadetrabalho/categories', icon: Tags },
    { name: 'Mensagens', href: '/areadetrabalho/messages', icon: Mail },
    { name: 'Configurações', href: '/areadetrabalho/settings', icon: Settings },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-3 bg-slate-900 border border-slate-800 rounded-full text-white"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`w-64 border-r border-slate-800 flex flex-col fixed h-full bg-black z-40 transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
            <img 
              src="https://raw.githubusercontent.com/Samuel-Jordesson/Estoque/refs/heads/master/Group%20156.png" 
              alt="Logo" 
              className="h-8 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <h2 className="text-lg font-bold tracking-tighter uppercase leading-none">EFFLAR ADMIN</h2>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                  isActive 
                    ? 'text-white bg-slate-900 border border-slate-800' 
                    : 'text-slate-500 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-8 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair do Admin
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
