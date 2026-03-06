import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ExternalLink, Code, Grid, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { Project } from '../types';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      api.projects.getOne(slug).then(data => {
        setProject(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Carregando...</div>;
  if (!project) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Projeto não encontrado</div>;

  const canonicalUrl = `${window.location.origin}/projects/${project.slug}`;
  const publishDate = new Date(project.created_at).toISOString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": project.title,
    "image": [project.image_url],
    "datePublished": publishDate,
    "dateModified": publishDate,
    "author": [{
      "@type": "Person",
      "name": "Samuel Jordesson",
      "url": window.location.origin
    }],
    "description": project.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  return (
    <article className="bg-black text-white min-h-screen">
      <Helmet>
        <title>{`${project.title} | Samuel Jordesson`}</title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.image_url} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={project.title} />
        <meta property="twitter:description" content={project.description} />
        <meta property="twitter:image" content={project.image_url} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <section className="max-w-7xl mx-auto px-4 md:px-20 lg:px-40 pt-20 pb-16">
        <Link to="/projects" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Projetos
        </Link>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-4"
        >
          {project.title.split(' ').map((word, i) => (
            <React.Fragment key={i}>
              {word}<br />
            </React.Fragment>
          ))}
        </motion.h1>
        <div className="flex items-center gap-4 mt-8">
          <time dateTime={publishDate} className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Publicado em: {new Date(project.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </time>
          <span className="text-slate-800">|</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Autor: Samuel Jordesson
          </span>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-20 lg:px-40 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <div className="aspect-video bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden relative">
              <img 
                src={project.image_url} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
          <div className="lg:col-span-1 space-y-10">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Tecnologias</h4>
              <div className="flex flex-col gap-3">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="text-sm font-bold uppercase tracking-widest">{tech}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Links</h4>
              <div className="flex flex-col gap-3">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:line-through">
                    Projeto ao Vivo <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:line-through">
                    Repositório GitHub <Code className="w-4 h-4" />
                  </a>
                )}
                {project.external_link && (
                  <a href={project.external_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:line-through">
                    Link Externo <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Ano</h4>
              <span className="text-sm font-bold uppercase tracking-widest">{project.year}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-20 lg:px-40 pb-32">
        <div className="max-w-3xl">
          <div className="space-y-24">
            <div className="markdown-body">
              <ReactMarkdown>{project.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-20 lg:px-40 pb-32">
        <div className="border-y border-slate-800 py-16 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Anterior</p>
            <Link to="#" className="text-2xl font-black uppercase tracking-tighter hover:line-through transition-all">API Gateway</Link>
          </div>
          <Link to="/projects" className="w-16 h-16 border border-slate-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
            <Grid className="w-6 h-6" />
          </Link>
          <div className="text-center md:text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Próximo Projeto</p>
            <Link to="#" className="text-2xl font-black uppercase tracking-tighter hover:line-through transition-all">Fundo Hydro Site</Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-20 lg:px-40 pb-32">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
            Interessado em resultados?
          </h2>
          <a href="mailto:samueljordessonjogo@gmail.com" className="group flex items-center gap-4 text-xl md:text-2xl font-light hover:gap-6 transition-all duration-300">
            <span>Trabalhe comigo</span>
            <ArrowRight className="w-8 h-8" />
          </a>
        </div>
      </section>
    </article>
  );
}
