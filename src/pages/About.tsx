import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Palette, ArrowRight, Zap, Target, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-20 lg:px-40 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h4 className="text-xs font-black uppercase tracking-[0.5em] text-slate-500">
            Sobre a Efflar
          </h4>
          <h1 className="text-2xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Ideias, Experimentos <br />& Tecnologia.
          </h1>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 md:px-20 lg:px-40 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-slate-800 pt-16">
          <div className="md:col-span-8 space-y-8">
            <p className="text-xl md:text-2xl font-light leading-relaxed">
              A <strong className="text-white font-bold">Efflar</strong> é um projeto criado para reunir ideias, experimentos e projetos ligados ao mundo da tecnologia. Ela funciona como um espaço onde são publicados trabalhos relacionados a <strong className="text-white font-bold">programação, desenvolvimento de software, DevOps e ferramentas para desenvolvedores</strong>.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              Atualmente, a Efflar é mantida por <strong className="text-white font-medium">Samuel Jordesson</strong>, que já desenvolveu <strong className="text-white font-medium">mais de 12 projetos</strong> dentro desse ecossistema. Muitos desses projetos foram pensados para <strong className="text-white font-medium">ajudar outros desenvolvedores</strong>, facilitar processos ou até servir como base para novas ideias e iniciativas na área de tecnologia.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              Se você é desenvolvedor ou está começando no mundo da programação, os projetos publicados podem servir como <strong className="text-white font-medium">referência, inspiração ou até solução para algum problema</strong>.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col gap-8">
            <div className="p-8 border border-slate-800 bg-slate-900/50 rounded-2xl">
              <Zap className="w-8 h-8 mb-4 text-white" />
              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">+12 Projetos</h3>
              <p className="text-sm text-slate-500 uppercase tracking-widest">Desenvolvidos e mantidos no ecossistema Efflar.</p>
            </div>
            <div className="p-8 border border-slate-800 bg-slate-900/50 rounded-2xl">
              <Target className="w-8 h-8 mb-4 text-white" />
              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Foco Técnico</h3>
              <p className="text-sm text-slate-500 uppercase tracking-widest">DevOps, Software & Ferramentas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* A Ideia Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-20 lg:px-40 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-slate-800 pt-16">
          <div className="md:col-span-4">
            <div className="flex items-center gap-4 mb-8 md:mb-0">
              <div className="w-16 h-16 rounded-full border border-white flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter">A Ideia</h2>
            </div>
          </div>
          <div className="md:col-span-8 space-y-8">
            <p className="text-slate-400 text-lg leading-relaxed">
              A ideia da Efflar surgiu da necessidade de <strong className="text-white font-medium">separar o lado pessoal do lado profissional</strong>. Em vez de misturar tudo em um único perfil, foi criado um espaço dedicado exclusivamente a <strong className="text-white font-medium">tecnologia e desenvolvimento</strong>.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              Assim, a Efflar se tornou uma forma de <strong className="text-white font-medium">organizar e apresentar projetos</strong>, compartilhar conhecimento e também mostrar publicamente as coisas que estão sendo construídas.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              Além disso, o projeto também serve como uma <strong className="text-white font-medium">vitrine de trabalhos</strong>, permitindo que pessoas que estejam procurando alguém para desenvolver um site, sistema ou projeto tecnológico possam conhecer o trabalho realizado.
            </p>
          </div>
        </div>
      </section>

      {/* O Design Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-20 lg:px-40 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-slate-800 pt-16">
          <div className="md:col-span-8 space-y-8 order-2 md:order-1">
            <div className="flex items-center gap-4 mb-8">
              <Palette className="w-8 h-8 text-white" />
              <h2 className="text-3xl font-black uppercase tracking-tighter">O Design</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed">
              O design da Efflar segue uma linha <strong className="text-white font-medium">minimalista</strong>, com foco em um visual <strong className="text-white font-medium">simples, moderno e robusto</strong>. A proposta é manter uma identidade limpa, sem excesso de elementos, valorizando organização e clareza.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              Uma das características mais marcantes da identidade visual é o uso de <strong className="text-white font-medium">personagens de desenhos animados em preto e branco</strong>, que trazem personalidade à marca sem perder a estética minimalista.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              Esse estilo foi pensado para criar uma identidade <strong className="text-white font-medium">diferente e fácil de reconhecer</strong>, mantendo ao mesmo tempo um visual profissional e ligado ao universo da tecnologia.
            </p>
          </div>
          <div className="md:col-span-4 order-1 md:order-2 flex flex-col items-center justify-center">
            <motion.img 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              src="https://raw.githubusercontent.com/Samuel-Jordesson/Estoque/refs/heads/master/Group%20156.png" 
              alt="Efflar Logo" 
              className="w-full max-w-[280px] h-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-6xl mx-auto px-4 md:px-20 lg:px-40 pb-32">
        <div className="border-t border-slate-800 pt-32 flex flex-col items-center text-center">
          <p className="text-xl md:text-2xl font-light mb-12 max-w-2xl">
            Você também pode conhecer os projetos desenvolvidos acessando a página de projetos.
          </p>
          <Link to="/projects" className="group flex items-center gap-4 text-xl md:text-4xl font-black uppercase tracking-tighter hover:gap-8 transition-all duration-300">
            <span>Ver Projetos</span>
            <ArrowRight className="w-10 h-10" />
          </Link>
          <div className="mt-20 h-20 w-[1px] bg-white"></div>
        </div>
      </section>
    </div>
  );
}
