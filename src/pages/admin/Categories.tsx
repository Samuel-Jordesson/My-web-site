import React, { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { api } from '../../services/api';
import { Category } from '../../types';
import ConfirmationModal from '../../components/ConfirmationModal';

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  useEffect(() => {
    api.categories.getAll().then(setCategories);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const slug = newName.toLowerCase().replace(/ /g, '-');
    await api.categories.create({ name: newName, slug });
    setNewName('');
    api.categories.getAll().then(setCategories);
  };

  const handleDeleteClick = (id: number) => {
    setCategoryToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (categoryToDelete) {
      try {
        await api.categories.delete(categoryToDelete);
        setCategories(categories.filter(c => c.id !== categoryToDelete));
        setCategoryToDelete(null);
      } catch (error) {
        console.error('Erro ao deletar categoria:', error);
      }
    }
  };

  return (
    <div className="flex flex-col max-w-4xl mx-auto w-full">
      <header className="mb-12">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
          <span>Área de Trabalho</span>
          <span>/</span>
          <span className="text-slate-300">Taxonomia</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Categorias</h1>
      </header>

      <section className="mb-12">
        <form onSubmit={handleAdd} className="flex gap-4">
          <input 
            className="flex-1 bg-black border border-slate-800 p-4 text-sm font-bold uppercase tracking-widest placeholder:text-slate-700 focus:border-white transition-colors" 
            placeholder="NOME DA NOVA CATEGORIA" 
            type="text" 
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <button type="submit" className="px-10 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-200 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Categoria
          </button>
        </form>
      </section>

      <section className="border border-slate-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/30">
              <th className="p-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Nome</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Slug</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Projetos</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-slate-900/50 transition-colors">
                <td className="p-6">
                  <span className="text-sm font-bold uppercase tracking-tight text-white">{category.name}</span>
                </td>
                <td className="p-6">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">{category.slug}</span>
                </td>
                <td className="p-6">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{category.project_count}</span>
                </td>
                <td className="p-6 text-right">
                  <button 
                    onClick={() => handleDeleteClick(category.id)}
                    className="text-slate-600 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Categoria"
        message="Tem certeza que deseja excluir esta categoria? Isso pode afetar os projetos vinculados a ela."
      />
    </div>
  );
}
