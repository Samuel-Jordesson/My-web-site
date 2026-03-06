import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Code, Layers, Globe, Palette, Terminal as TerminalIcon, FileCode } from 'lucide-react';
import LightRays from '../components/LightRays';
import SplitText from '../components/SplitText';
import { api } from '../services/api';
import { Project } from '../types';
import { Link } from 'react-router-dom';

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.projects.getAll().then(data => setFeaturedProjects(data.slice(0, 2)));
  }, []);

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <div className="bg-black text-white overflow-hidden">
      <Helmet>
        <title>Samuel Jordesson | Software Developer & Creative Technologist</title>
        <meta name="description" content="Portfólio de Samuel Jordesson (efflar), desenvolvedor de software especializado em React, Node.js e soluções digitais de alta performance." />
        <link rel="canonical" href={window.location.origin} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin} />
        <meta property="og:title" content="Samuel Jordesson | Software Developer" />
        <meta property="og:description" content="Desenvolvedor de software focado em experiências digitais funcionais e design elegante." />
        <meta property="og:image" content="https://picsum.photos/seed/portfolio/1200/630" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.origin} />
        <meta property="twitter:title" content="Samuel Jordesson | Software Developer" />
        <meta property="twitter:description" content="Desenvolvedor de software focado em experiências digitais funcionais e design elegante." />
        <meta property="twitter:image" content="https://picsum.photos/seed/portfolio/1200/630" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-20 md:pt-48 md:pb-32 px-4 text-center min-h-[80vh]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-full relative opacity-40">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={1}
              lightSpread={1}
              rayLength={2}
              pulsating={false}
              fadeDistance={1}
              saturation={1}
              followMouse
              mouseInfluence={0.1}
              noiseAmount={0}
              distortion={0}
            />
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl space-y-8"
        >
          <div className="flex flex-col items-center">
            <SplitText
              text="efflar"
              className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
              showCallback
            />
            <div className="flex items-center justify-center gap-4 mt-8 md:mt-12">
              <div className="h-[1px] w-12 bg-white"></div>
              <h2 className="text-lg md:text-xl font-light uppercase tracking-[0.4em] text-slate-400">
                Software Developer
              </h2>
              <div className="h-[1px] w-12 bg-white"></div>
            </div>
          </div>
          <div className="pt-8">
            <Link to="/projects" className="group relative inline-flex items-center justify-center gap-2 border border-white px-10 py-4 text-sm font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-white hover:text-black">
              <span>Ver Trabalho</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-20 lg:px-40 pb-32" id="about">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-slate-800 pt-16">
          <div className="md:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-[0.5em] text-slate-500">
              Sobre Mim
            </h4>
          </div>
          <div className="md:col-span-8 space-y-6">
            <p className="text-xl md:text-2xl font-light leading-relaxed">
              Olá, sou <span className="text-white font-medium">efflar</span>, estudante de Ciência da Computação movido pela intersecção entre criatividade e lógica. Especializo-me em construir experiências digitais altamente funcionais, incluindo painéis administrativos personalizados para necessidades específicas de negócios.
            </p>
            <p className="text-slate-400 text-base leading-relaxed">
              Minha jornada inclui experiências valiosas como freelancer e em agências como <span className="text-white font-medium">Murucupi</span> e <span className="text-white font-medium">Fundo Hydro</span>, onde desenvolvi soluções escaláveis e refinei minhas habilidades de arquitetura técnica. Acredito que cada linha de código é uma oportunidade para resolver problemas complexos com design elegante.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-20 lg:px-40 pb-32">
        <div className="border-t border-slate-800 pt-16">
          <h4 className="text-xs font-black uppercase tracking-[0.5em] text-slate-500 mb-12">
            Especialidades
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
            {[
              { icon: FileCode, name: 'Node.js' },
              { icon: Code, name: 'JavaScript' },
              { icon: Layers, name: 'React' },
              { icon: Globe, name: 'Next.js' },
              { icon: Code, name: 'HTML5' },
              { icon: Palette, name: 'CSS3' },
              { icon: Palette, name: 'Tailwind' },
              { icon: TerminalIcon, name: 'Python' },
            ].map((skill, i) => (
              <div key={i} className="group flex flex-col items-start gap-3">
                <skill.icon className="w-8 h-8 font-light" />
                <p className="text-sm font-bold uppercase tracking-widest">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-6xl mx-auto px-4 md:px-20 lg:px-40 pb-32" id="projects">
        <div className="border-t border-slate-800 pt-16">
          <h4 className="text-xs font-black uppercase tracking-[0.5em] text-slate-500 mb-12">
            Projeto em Destaque
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {featuredProjects.map((project, i) => (
              <Link 
                key={project.id} 
                to={`/projects/${project.slug}`}
                className={`${i === 0 ? 'md:col-span-8' : 'md:col-span-4'} group cursor-pointer`}
              >
                <div className={`aspect-video md:aspect-${i === 0 ? 'video' : 'square'} bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden mb-6`}>
                  <img 
                    src={project.image_url} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tight">{project.title}</h3>
                  <p className="text-sm text-slate-500 uppercase tracking-widest">
                    {project.technologies.join(' / ')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center md:justify-start">
            <Link to="/projects" className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-white pb-1 hover:text-slate-400 hover:border-slate-400 transition-all">
              Ver Todos os Projetos
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-20 lg:px-40 pb-32" id="contact">
        <div className="border-t border-slate-800 pt-32 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
            Pronto para começar um projeto?
          </h2>
          <a href="mailto:samueljordessonjogo@gmail.com" className="group flex items-center gap-4 text-xl md:text-2xl font-light hover:gap-6 transition-all duration-300">
            <span>Entre em Contato</span>
            <ArrowRight className="w-8 h-8" />
          </a>
          <div className="mt-12 h-20 w-[1px] bg-white"></div>
        </div>
      </section>
    </div>
  );
}
