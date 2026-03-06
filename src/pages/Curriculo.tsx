import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Download, Mail, MapPin, Instagram, Linkedin, Github, Calendar, Briefcase, GraduationCap, Code2, Rocket } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Curriculo = () => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!resumeRef.current) return;

    const element = resumeRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#000000',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Samuel_Jordesson_Curriculo.pdf');
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter uppercase italic"
          >
            Currículo
          </motion.h1>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={downloadPDF}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-white text-black px-6 py-3 font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors"
          >
            <Download size={20} />
            Download PDF
          </motion.button>
        </div>

        {/* Resume Content */}
        <div 
          ref={resumeRef}
          className="bg-black border border-slate-800 p-6 md:p-16 shadow-2xl relative overflow-hidden"
        >
          {/* Background Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-900/20 blur-3xl -z-10 rounded-full" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter uppercase mb-2">Samuel Jordesson</h2>
                <p className="text-slate-400 font-medium uppercase tracking-widest text-sm">Programador Web & Designer</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800 pb-2">Contato</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3 text-slate-300">
                    <Calendar size={16} className="text-slate-500" />
                    <span>22 anos</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <MapPin size={16} className="text-slate-500" />
                    <span>Barcarena - PA</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <Rocket size={16} className="text-slate-500" />
                    <span>Disponível para viagens ou Remoto</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800 pb-2">Social</h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="https://instagram.com/samuel_jordesson" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                      <Instagram size={16} className="text-slate-500" />
                      <span>@samuel_jordesson</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://linkedin.com/in/samuel-jordesson" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                      <Linkedin size={16} className="text-slate-500" />
                      <span>Samuel Jordesson</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/Samuel-Jordesson" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                      <Github size={16} className="text-slate-500" />
                      <span>github.com/Samuel-Jordesson</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800 pb-2">Skills Técnicas</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'Node.js', 'JavaScript', 'CSS', 'DevOps', 'SQL', 'Prisma', 'Git', 'WordPress'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-slate-900 text-slate-300 text-[10px] font-bold uppercase tracking-widest border border-slate-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Resumo */}
              <section className="space-y-4">
                <div className="flex items-center gap-4">
                  <Briefcase size={20} className="text-slate-500" />
                  <h3 className="text-xl font-bold uppercase tracking-tighter">Resumo Profissional</h3>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Programador Web e Web Designer, com experiência no desenvolvimento, manutenção e otimização de sistemas e websites. Atuei por 2 anos como Social Media, o que fortaleceu minha visão de design, comunicação e experiência do usuário.
                </p>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Atualmente trabalho na Murucupi Agência como único programador, sendo responsável pela criação, gestão e correção de mais de 20 sites, aplicando boas práticas, corrigindo falhas críticas e reduzindo custos operacionais. Estou em constante aprendizado, com foco em DevOps, e possuo formação em Ciência da Computação.
                </p>
              </section>

              {/* Acadêmico */}
              <section className="space-y-6">
                <div className="flex items-center gap-4">
                  <GraduationCap size={20} className="text-slate-500" />
                  <h3 className="text-xl font-bold uppercase tracking-tighter">Formação Acadêmica</h3>
                </div>
                <div className="space-y-4">
                  <div className="border-l-2 border-slate-800 pl-6 py-1">
                    <h4 className="font-bold text-sm uppercase">Ciência da Computação</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Cursando 4º Semestre</p>
                  </div>
                  <div className="border-l-2 border-slate-800 pl-6 py-1">
                    <h4 className="font-bold text-sm uppercase">Web Design</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Visual Cursos • Finalizado em 2022</p>
                  </div>
                  <div className="border-l-2 border-slate-800 pl-6 py-1">
                    <h4 className="font-bold text-sm uppercase">Java para Fullstack</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Udemy • Em andamento</p>
                  </div>
                </div>
              </section>

              {/* Projetos */}
              <section className="space-y-6">
                <div className="flex items-center gap-4">
                  <Code2 size={20} className="text-slate-500" />
                  <h3 className="text-xl font-bold uppercase tracking-tighter">Projetos em Destaque</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm uppercase">Bot para WhatsApp</h4>
                      <a href="https://github.com/efflar/bot-zap" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white"><Github size={14} /></a>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Sistema automatizado com agendamentos, lembretes e integração com ChatGPT para respostas inteligentes.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm uppercase">BookBeauty</h4>
                      <a href="https://github.com/efflar/BookBeauty" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white"><Github size={14} /></a>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Plataforma de agendamento online para beleza com links personalizados e integração Stripe.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm uppercase">Criando com IA</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Implementação de IA para acelerar o desenvolvimento, reduzindo prazos de meses para semanas.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm uppercase">Lumio</h4>
                      <a href="https://github.com/efflar/Lumio" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white"><Github size={14} /></a>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Rede social focada em performance e design moderno, com funcionalidades completas de interação.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm uppercase">YTD (YouTube Downloader)</h4>
                      <a href="https://github.com/efflar/YTD" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white"><Github size={14} /></a>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Sistema para download de vídeos e playlists do YouTube, totalmente gratuito e sem anúncios.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curriculo;
