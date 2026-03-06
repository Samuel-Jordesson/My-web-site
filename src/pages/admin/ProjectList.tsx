import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { api } from '../../services/api';
import { Project } from '../../types';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal';

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);

  useEffect(() => {
    api.projects.getAll().then(setProjects);
  }, []);

  const handleDeleteClick = (id: number) => {
    setProjectToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (projectToDelete) {
      try {
        await api.projects.delete(projectToDelete);
        setProjects(projects.filter(p => p.id !== projectToDelete));
        setProjectToDelete(null);
      } catch (error) {
        console.error('Erro ao deletar projeto:', error);
      }
    }
  };

  return (
    <div className="flex flex-col max-w-6xl mx-auto w-full">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
            <span>Área de Trabalho</span>
            <span>/</span>
            <span className="text-slate-300">Gerenciamento</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Projetos</h1>
        </div>
        <Link to="/areadetrabalho/projects/new" className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-200 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Criar Novo Projeto
        </Link>
      </header>

      <section className="flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="pb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Título</th>
                <th className="pb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Status</th>
                <th className="pb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Data</th>
                <th className="pb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-6">
                    <span className="text-sm font-bold uppercase tracking-tight text-white">{project.title}</span>
                  </td>
                  <td className="py-6">
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 ${
                      project.status === 'published' ? 'bg-white text-black' : 'border border-slate-700 text-slate-400'
                    }`}>
                      {project.status === 'published' ? 'publicado' : 'rascunho'}
                    </span>
                  </td>
                  <td className="py-6">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      {new Date(project.created_at).toLocaleDateString('pt-BR', { month: 'short', day: '2-digit', year: 'numeric' })}
                    </span>
                  </td>
                  <td className="py-6 text-right">
                    <div className="flex justify-end gap-4">
                      <Link to={`/areadetrabalho/projects/edit/${project.id}`} className="text-slate-400 hover:text-white transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <Link to={`/projects/${project.slug}`} className="text-slate-400 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDeleteClick(project.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-12 flex justify-center">
          <button className="px-12 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors border border-dashed border-slate-800 hover:border-slate-600 w-full">
            Carregar Mais Projetos
          </button>
        </div>
      </section>

      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Projeto"
        message="Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita."
      />

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
