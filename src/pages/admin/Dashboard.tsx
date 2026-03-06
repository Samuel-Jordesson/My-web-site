import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { api } from '../../services/api';
import { Stats } from '../../types';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.stats.get().then(setStats);
  }, []);

  if (!stats) return <div className="text-white">Carregando...</div>;

  return (
    <div className="flex flex-col max-w-6xl mx-auto w-full">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
            <span>Área de Trabalho</span>
            <span>/</span>
            <span className="text-slate-300">Visão Geral</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Dashboard</h1>
        </div>
        <Link to="/areadetrabalho/projects/new" className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-200 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Criar Novo Projeto
        </Link>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="border border-slate-800 p-8 flex flex-col gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Total de Visualizações</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">
              {stats.totalViews >= 1000 
                ? `${(stats.totalViews / 1000).toFixed(1)}K` 
                : stats.totalViews.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] font-bold text-green-500">+12%</span>
          </div>
        </div>
        <div className="border border-slate-800 p-8 flex flex-col gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Projetos Publicados</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">{stats.projectsPublished}</span>
            <span className="text-[10px] font-bold text-slate-500">Ativos</span>
          </div>
        </div>
        <div className="border border-slate-800 p-8 flex flex-col gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Mensagens Recentes</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">{stats.recentInquiries.toString().padStart(2, '0')}</span>
            <span className="text-[10px] font-bold text-white bg-slate-800 px-2">Novas</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">Tendências de Visitantes (30 Dias)</h3>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              {stats.chartData.length > 0 ? `${new Date(stats.chartData[0].date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} — ${new Date(stats.chartData[stats.chartData.length - 1].date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}` : '-'}
            </span>
          </div>
          <div className="border border-slate-800 p-8 h-[300px] flex items-end gap-2">
            {(() => {
              const maxCount = Math.max(...stats.chartData.map(d => d.count), 1);
              return stats.chartData.map((d, i) => {
                const height = (d.count / maxCount) * 100;
                return (
                  <div 
                    key={i} 
                    title={`${d.date}: ${d.count} views`}
                    className={`flex-1 transition-all duration-500 ${height >= 90 ? 'bg-white' : 'bg-slate-900'} hover:bg-slate-700`} 
                    style={{ height: `${Math.max(height, 2)}%` }}
                  ></div>
                );
              });
            })()}
          </div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">Atividade Recente</h3>
          <div className="space-y-4">
            {stats.recentActivity.map((activity, i) => (
              <div key={i} className="border-b border-slate-900 pb-4">
                <p className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-widest">{activity.time}</p>
                <p className="text-xs text-white leading-relaxed uppercase tracking-tight">{activity.text}</p>
              </div>
            ))}
            <button className="w-full py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors border border-dashed border-slate-800 hover:border-slate-700">
              Ver Histórico Completo
            </button>
          </div>
        </div>
      </section>

      <footer className="mt-20 border-t border-slate-800 pt-12 flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
          Logado como efflar
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white">Central de Ajuda</a>
          <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white">Status do Sistema</a>
        </div>
      </footer>
    </div>
  );
}
