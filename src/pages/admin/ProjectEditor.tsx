import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Bold, Italic, List, Link as LinkIcon, Image as ImageIcon, Code, X, Plus, Camera } from 'lucide-react';
import { api } from '../../services/api';
import { Project, Category } from '../../types';

export default function ProjectEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [project, setProject] = useState<Partial<Project>>({
    title: '',
    slug: '',
    description: '',
    content: '',
    category_id: 0,
    technologies: [],
    image_url: '',
    live_url: '',
    github_url: '',
    external_link: '',
    year: new Date().getFullYear().toString(),
    status: 'draft'
  });
  const [newTech, setNewTech] = useState('');

  useEffect(() => {
    api.categories.getAll().then(setCategories);
    if (id) {
      api.projects.getById(parseInt(id)).then(setProject);
    }
  }, [id]);

  const handleSave = async (statusOverride?: 'published' | 'draft') => {
    const data = { ...project, status: statusOverride || project.status };
    if (id) {
      await api.projects.update(parseInt(id), data);
    } else {
      await api.projects.create(data);
    }
    navigate('/areadetrabalho/projects');
  };

  const addTech = () => {
    if (newTech && !project.technologies?.includes(newTech)) {
      setProject({ ...project, technologies: [...(project.technologies || []), newTech] });
      setNewTech('');
    }
  };

  const removeTech = (tech: string) => {
    setProject({ ...project, technologies: project.technologies?.filter(t => t !== tech) });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const { imageUrl } = await api.projects.upload(file);
        setProject({ ...project, image_url: imageUrl });
      } catch (error) {
        console.error("Erro ao fazer upload:", error);
        alert("Falha ao carregar a imagem.");
      }
    }
  };

  return (
    <main className="flex-1 flex min-h-screen">
      <div className="flex-1 p-12 lg:p-20 flex flex-col max-w-4xl">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
            <Link className="hover:text-white transition-colors" to="/areadetrabalho/projects">Projetos</Link>
            <span>/</span>
            <span className="text-slate-300">Editor</span>
          </div>
          <input 
            className="w-full bg-transparent border-none p-0 text-5xl md:text-6xl font-black uppercase tracking-tighter placeholder:text-slate-800 focus:ring-0 focus:outline-none" 
            placeholder="TÍTULO DO PROJETO" 
            type="text" 
            value={project.title}
            onChange={e => setProject({ ...project, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
          />
        </header>

        <div className="flex flex-col gap-8">
          <div className="border border-slate-800">
            <div className="flex items-center gap-1 p-2 border-b border-slate-800 bg-black sticky top-0">
              <button className="p-2 text-slate-400 hover:text-white"><Bold className="w-5 h-5" /></button>
              <button className="p-2 text-slate-400 hover:text-white"><Italic className="w-5 h-5" /></button>
              <button className="p-2 text-slate-400 hover:text-white"><List className="w-5 h-5" /></button>
              <div className="w-px h-6 bg-slate-800 mx-1"></div>
              <button className="p-2 text-slate-400 hover:text-white"><LinkIcon className="w-5 h-5" /></button>
              <button className="p-2 text-slate-400 hover:text-white"><ImageIcon className="w-5 h-5" /></button>
              <button className="p-2 text-slate-400 hover:text-white"><Code className="w-5 h-5" /></button>
              <div className="ml-auto flex items-center gap-2 px-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Markdown Ativado</span>
              </div>
            </div>
            <div className="p-8">
              <textarea 
                className="w-full min-h-[600px] bg-transparent border-none p-0 text-lg leading-relaxed resize-none focus:ring-0 focus:outline-none placeholder:text-slate-800" 
                placeholder="Comece a escrever a visão geral do projeto, desafios e soluções..."
                value={project.content}
                onChange={e => setProject({ ...project, content: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      <aside className="w-80 border-l border-slate-800 bg-black/50 p-8 flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => handleSave('published')}
            className="w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-200 transition-colors"
          >
            Publicar Projeto
          </button>
          <button 
            onClick={() => handleSave('draft')}
            className="w-full py-4 border border-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-900 transition-colors"
          >
            Salvar Rascunho
          </button>
        </div>

        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Imagem de Destaque</h3>
          <div className="space-y-4">
            {project.image_url && (
              <div className="aspect-video bg-slate-900 border border-slate-800 overflow-hidden">
                <img src={project.image_url} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-800 hover:border-white transition-colors cursor-pointer bg-black/50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Camera className="w-8 h-8 text-slate-500 mb-2" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Clique para selecionar</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
            <input 
              className="w-full bg-black border border-slate-800 p-3 text-[11px] font-bold uppercase tracking-widest"
              placeholder="Ou cole a URL da imagem aqui..."
              value={project.image_url}
              onChange={e => setProject({ ...project, image_url: e.target.value })}
            />
          </div>
        </section>

        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Link Externo</h3>
          <input 
            className="w-full bg-black border border-slate-800 p-3 text-[11px] font-bold uppercase tracking-widest"
            placeholder="https://..."
            value={project.external_link}
            onChange={e => setProject({ ...project, external_link: e.target.value })}
          />
        </section>

        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Categoria</h3>
          <select 
            className="w-full text-[11px] font-bold uppercase tracking-widest py-3 px-4 border border-slate-800 bg-black"
            value={project.category_id}
            onChange={e => setProject({ ...project, category_id: parseInt(e.target.value) })}
          >
            <option value={0}>Selecionar Categoria</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </section>

        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Tecnologias</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies?.map((tech, i) => (
              <div key={i} className="flex items-center gap-2 bg-white text-black px-2 py-1 text-[9px] font-bold uppercase tracking-widest">
                {tech}
                <button onClick={() => removeTech(tech)} className="hover:opacity-60"><X className="w-3 h-3" /></button>
              </div>
            ))}
          </div>
          <div className="relative">
            <input 
              className="w-full text-[11px] font-bold uppercase tracking-widest py-3 px-4 border border-slate-800 pr-10 bg-black" 
              placeholder="Adicionar tech..." 
              type="text"
              value={newTech}
              onChange={e => setNewTech(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && addTech()}
            />
            <button onClick={addTech} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </section>

        <div className="mt-auto pt-8 border-t border-slate-900">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Status</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-white">{project.status === 'published' ? 'publicado' : 'rascunho'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Autor</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">efflar</span>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
