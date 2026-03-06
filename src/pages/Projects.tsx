import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { api } from '../services/api';
import { Project } from '../types';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.projects.getAll().then(setProjects);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Helmet>
        <title>Projetos | Samuel Jordesson</title>
        <meta name="description" content="Explore a galeria de projetos de Samuel Jordesson. Soluções em desenvolvimento web, dashboards e arquitetura de software." />
        <link rel="canonical" href={`${window.location.origin}/projects`} />
      </Helmet>

      <section className="max-w-7xl mx-auto px-4 md:px-20 lg:px-40 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-4">
            PROJETOS
          </h1>
          <div className="h-1 w-24 bg-white"></div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-20 lg:px-40 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/projects/${project.slug}`} className="group flex flex-col cursor-pointer">
                <div className="aspect-video bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden mb-6 relative">
                  <img 
                    src={project.image_url} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black uppercase tracking-tight">{project.title}</h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tech, j) => (
                      <span key={j} className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 border border-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-20 lg:px-40 pb-32" id="contact">
        <div className="border-t border-slate-800 pt-32 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
            Começar um projeto?
          </h2>
          <a href="mailto:samueljordessonjogo@gmail.com" className="group flex items-center gap-4 text-xl md:text-2xl font-light hover:gap-6 transition-all duration-300">
            <span>Fale Comigo</span>
            <ArrowRight className="w-8 h-8" />
          </a>
          <div className="mt-12 h-20 w-[1px] bg-white"></div>
        </div>
      </section>
    </div>
  );
}
