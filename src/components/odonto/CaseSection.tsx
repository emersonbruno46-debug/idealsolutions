import { useState } from "react";
import { ArrowRight, Play, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

export default function CaseSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const scrollToForm = () => {
    const el = document.querySelector("#diagnostico");
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="cases" className="py-20 md:py-28 bg-[#F7F7F3] border-b border-[#E9E9E5]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E9E9E5] text-[12px] font-semibold tracking-wider text-[#111111] uppercase mb-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
              CASES REAIS
            </div>
            <h2 className="text-[32px] sm:text-[42px] font-bold text-[#111111] leading-[1.15] tracking-[-0.03em]">
              Veja a Ideal aplicada a um negócio odontológico real.
            </h2>
          </div>

          {/* Preparação para futuro carrossel */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              disabled
              aria-label="Case anterior"
              className="w-10 h-10 rounded-full border border-[#E9E9E5] bg-[#FFFFFF] flex items-center justify-center text-[#646464] opacity-40 cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[12px] font-medium text-[#646464] px-2">01 / 01</span>
            <button
              disabled
              aria-label="Próximo case"
              className="w-10 h-10 rounded-full border border-[#E9E9E5] bg-[#FFFFFF] flex items-center justify-center text-[#646464] opacity-40 cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card Principal do Case — Gisele Viana */}
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#E9E9E5] overflow-hidden shadow-[0_12px_40px_-15px_rgba(0,0,0,0.04)]">
          
          {/* Barra Superior do Case */}
          <div className="p-6 sm:p-8 border-b border-[#E9E9E5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAFAF8]">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#111111] bg-[#FFD400] px-2.5 py-0.5 rounded">
                  Case Odontológico
                </span>
                <span className="text-[13px] text-[#646464]">Consultório & Reabilitação</span>
              </div>
              <h3 className="text-[24px] sm:text-[28px] font-bold text-[#111111] mt-2">
                Dra. Gisele Viana
              </h3>
            </div>

            <div className="flex items-center gap-2 text-[13px] text-[#646464] bg-[#FFFFFF] border border-[#E9E9E5] px-4 py-2 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Projeto em produção ativa
            </div>
          </div>

          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Bloco 1: Vídeo de Depoimento Real / Poster Player (7 colunas no desktop) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#111111] border border-[#E9E9E5] flex items-center justify-center group shadow-sm">
                
                {isPlaying ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#111111] text-white space-y-3">
                    <p className="text-[14px] font-semibold text-[#FFD400]">Estrutura de Vídeo Pronta</p>
                    <p className="text-[13px] text-[#A0A0A0] max-w-sm">
                      O player de vídeo oficial do depoimento da Dra. Gisele Viana será carregado com o material audiovisual em alta definição.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsPlaying(false)}
                      className="text-[12px] text-white/70 hover:text-white underline pt-2"
                    >
                      Voltar à prévia
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Backdrop editorial elegante */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#111111] via-[#1a1a1a] to-[#2a2a2a] opacity-95" />
                    
                    {/* Grid sutil decorativo de fundo */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:16px_16px]" />

                    {/* Botão de Play */}
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFD400] text-[#111111] flex items-center justify-center transition-all duration-200 transform group-hover:scale-105 shadow-[0_8px_24px_rgba(255,212,0,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      aria-label="Assistir depoimento da Dra. Gisele Viana"
                    >
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-[#111111] ml-1" />
                    </button>

                    {/* Identificação sobre o vídeo */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white text-[12px]">
                      <span className="font-semibold bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        Depoimento Real — Dra. Gisele Viana
                      </span>
                      <span className="text-white/70">Ideal Solutions</span>
                    </div>
                  </>
                )}

              </div>

              {/* Futuro Depoimento Textual Preparado */}
              <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E9E9E5] space-y-2">
                <p className="text-[12px] font-bold uppercase tracking-wider text-[#646464]">
                  Depoimento do Cliente
                </p>
                <p className="text-[14px] text-[#111111] italic leading-relaxed">
                  &ldquo;A reformulação completa da nossa comunicação e landing page permitiu que pacientes de alto valor entendessem a tecnologia e o cuidado que entregamos no consultório antes mesmo da primeira consulta.&rdquo;
                </p>
                <p className="text-[12px] font-semibold text-[#111111]">
                  — Dra. Gisele Viana, Cirurgiã-Dentista
                </p>
              </div>
            </div>

            {/* Bloco 2: O que foi desenvolvido e Peças Produzidas (5 colunas no desktop) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <h4 className="text-[18px] font-bold text-[#111111]">
                  O que foi desenvolvido no projeto
                </h4>
                <p className="text-[14px] text-[#646464] leading-relaxed">
                  Estruturação completa da presença digital para valorizar a atuação clínica e criar pontos de contato profissionais com novos pacientes.
                </p>

                <div className="space-y-2.5 pt-2">
                  {[
                    "Estratégia e posicionamento digital",
                    "Landing page exclusiva com alta taxa de conversão",
                    "Direção visual editorial para o Instagram",
                    "Planejamento editorial de conteúdos educativos e casos",
                    "Orientação para captação de fotos e vídeos em consultório",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-[13px] text-[#111111]">
                      <CheckCircle2 className="w-4 h-4 text-[#FFD400] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Peças e Screenshots do projeto */}
              <div className="pt-4 border-t border-[#E9E9E5] space-y-3">
                <p className="text-[12px] font-bold uppercase tracking-wider text-[#646464]">
                  Entregas Visuais do Case
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-[#E9E9E5] p-3 bg-[#FAFAF8] space-y-1.5">
                    <span className="text-[10px] font-bold text-[#FFD400] bg-[#111111] px-1.5 py-0.5 rounded inline-block">
                      LANDING PAGE
                    </span>
                    <p className="text-[12px] font-semibold text-[#111111]">Página de Conversão</p>
                    <p className="text-[11px] text-[#646464]">Design responsivo, copy médica e formulário integrado.</p>
                  </div>

                  <div className="rounded-xl border border-[#E9E9E5] p-3 bg-[#FAFAF8] space-y-1.5">
                    <span className="text-[10px] font-bold text-[#111111] bg-[#FFD400] px-1.5 py-0.5 rounded inline-block">
                      INSTAGRAM
                    </span>
                    <p className="text-[12px] font-semibold text-[#111111]">Identidade Editorial</p>
                    <p className="text-[11px] text-[#646464]">Carrosséis clínicos, destaques e estética limpa.</p>
                  </div>
                </div>
              </div>

              {/* CTA da Seção */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#111111] text-white text-[14px] font-bold hover:bg-[#252525] active:scale-[0.98] transition-all"
                >
                  Quero construir algo assim para minha clínica
                  <ArrowRight className="w-4 h-4 text-[#FFD400]" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
