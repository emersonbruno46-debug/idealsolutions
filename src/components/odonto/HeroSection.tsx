import { ArrowRight, Lock, Sparkles } from "lucide-react";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
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
    <section
      id="inicio"
      className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden bg-[#F7F7F3]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-14">
          
          {/* Coluna Esquerda: Conteúdo (~55% no desktop) */}
          <div className="w-full lg:w-[55%] flex flex-col items-start text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E9E9E5] text-[12px] font-semibold tracking-wider text-[#111111] uppercase mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
              PRESENÇA DIGITAL PARA ODONTOLOGIA
            </div>

            {/* Headline Principal */}
            <h1 className="text-[34px] sm:text-[44px] lg:text-[52px] font-bold text-[#111111] leading-[1.1] tracking-[-0.03em] mb-6">
              Sua clínica não deveria depender apenas de indicação para ser escolhida.
            </h1>

            {/* Promessa */}
            <p className="text-[17px] sm:text-[19px] font-medium text-[#111111] leading-[1.5] mb-4">
              Estruturamos sua presença digital para que mais pessoas conheçam, entendam e considerem o seu trabalho.
            </p>

            {/* Texto Complementar */}
            <p className="text-[15px] sm:text-[16px] text-[#646464] leading-[1.65] max-w-xl mb-8">
              Gestão, conteúdo para Instagram e landing pages em um plano construído para o momento da sua clínica.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                type="button"
                onClick={() => scrollTo("#diagnostico")}
                className="inline-flex items-center justify-center gap-3 h-[52px] px-7 rounded-full bg-[#FFD400] text-[#111111] text-[15px] font-bold hover:brightness-95 active:scale-[0.98] transition-all duration-150 shadow-[0_4px_16px_rgba(255,212,0,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#111111]"
              >
                Quero um plano para minha clínica
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo("#metodo")}
                className="inline-flex items-center justify-center gap-2 h-[52px] px-6 rounded-full bg-[#FFFFFF] border border-[#E9E9E5] text-[#111111] text-[15px] font-semibold hover:border-[#111111] active:scale-[0.98] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400]"
              >
                Conhecer o Método IDEAL →
              </button>
            </div>

            {/* Provas de Autoridade */}
            <div className="w-full pt-8 border-t border-[#E9E9E5] flex flex-wrap items-center gap-y-3 gap-x-6 text-[13px] font-medium text-[#646464]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#111111]" />
                <strong className="text-[#111111] font-semibold">+100</strong> clientes atendidos
              </div>
              <span className="hidden sm:inline text-[#E9E9E5]">|</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FFD400]" />
                Desde <strong className="text-[#111111] font-semibold">2024</strong>
              </div>
              <span className="hidden sm:inline text-[#E9E9E5]">|</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#111111]" />
                Atendimento em todo o <strong className="text-[#111111] font-semibold">Brasil</strong>
              </div>
            </div>

          </div>

          {/* Coluna Direita: Composição Visual (~45% no desktop) */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end relative mt-6 lg:mt-0">
            <div className="relative w-full max-w-[500px]">
              
              {/* Badge discreto obrigatório */}
              <div className="absolute -top-4 left-4 sm:left-6 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E9E9E5] text-[11px] font-semibold text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <Sparkles className="w-3 h-3 text-[#FFD400]" />
                Gestão + Conteúdo + Landing Page
              </div>

              {/* Mockup 1: Navegador Desktop (Landing Page Odontológica Premium) */}
              <div className="w-full rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E9E9E5] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)]">
                {/* Browser top chrome */}
                <div className="h-10 px-4 bg-[#FAFAF8] border-b border-[#E9E9E5] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E9E9E5]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E9E9E5]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E9E9E5]" />
                  </div>
                  <div className="h-6 px-3 rounded-md bg-[#FFFFFF] border border-[#E9E9E5] flex items-center gap-1.5 text-[11px] text-[#646464] font-medium max-w-[210px] w-full justify-center">
                    <Lock className="w-2.5 h-2.5 text-[#111111]" />
                    <span className="truncate">clinicaodontologica.com.br</span>
                  </div>
                  <div className="w-8" />
                </div>

                {/* Browser LP Content Preview */}
                <div className="p-5 sm:p-6 bg-[#FFFFFF] space-y-4">
                  {/* Micro header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#F7F7F3]">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-[#111111] flex items-center justify-center text-[10px] text-white font-bold">
                        C
                      </div>
                      <span className="text-[12px] font-bold text-[#111111]">Clínica Odonto</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-[#646464] font-medium">
                      <span>Tratamentos</span>
                      <span>Corpo Clínico</span>
                      <span className="px-2 py-0.5 rounded bg-[#111111] text-white font-semibold">Agendar</span>
                    </div>
                  </div>

                  {/* Micro hero */}
                  <div className="py-2 space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#FFD400] bg-[#111111] px-2 py-0.5 rounded">
                      Odontologia Estética & Reabilitação
                    </span>
                    <h3 className="text-[17px] sm:text-[19px] font-bold text-[#111111] leading-[1.2]">
                      Precisão científica e excelência estética para o seu sorriso.
                    </h3>
                    <p className="text-[11px] text-[#646464] leading-relaxed max-w-[85%]">
                      Tecnologia de escaneamento intraoral, planejamento digital e atendimento humanizado.
                    </p>
                    <div className="pt-1 flex items-center gap-2">
                      <div className="h-6 px-3 rounded bg-[#FFD400] text-[10px] font-bold text-[#111111] inline-flex items-center">
                        Agendar consulta
                      </div>
                      <div className="h-6 px-2 rounded border border-[#E9E9E5] text-[10px] text-[#646464] inline-flex items-center">
                        Conhecer espaço
                      </div>
                    </div>
                  </div>

                  {/* Micro cards grid */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F7F7F3]">
                    <div className="p-2 rounded-lg bg-[#F7F7F3] border border-[#E9E9E5]/60">
                      <p className="text-[9px] font-bold text-[#111111]">Lentes & Facetas</p>
                      <p className="text-[8px] text-[#646464] leading-tight mt-0.5">Planejamento guiado</p>
                    </div>
                    <div className="p-2 rounded-lg bg-[#F7F7F3] border border-[#E9E9E5]/60">
                      <p className="text-[9px] font-bold text-[#111111]">Implantes Guiados</p>
                      <p className="text-[8px] text-[#646464] leading-tight mt-0.5">Máxima precisão</p>
                    </div>
                    <div className="p-2 rounded-lg bg-[#F7F7F3] border border-[#E9E9E5]/60">
                      <p className="text-[9px] font-bold text-[#111111]">Ortodontia Invisível</p>
                      <p className="text-[8px] text-[#646464] leading-tight mt-0.5">Alinhadores estéticos</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mockup 2: Smartphone Parcialmente Sobreposto (Instagram Odontológico Profissional) */}
              <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-4 w-[185px] sm:w-[205px] rounded-[2rem] p-2 bg-[#111111] shadow-[0_24px_50px_rgba(0,0,0,0.18)] border-2 border-[#111111]">
                <div className="w-full bg-[#FFFFFF] rounded-[1.6rem] overflow-hidden">
                  
                  {/* Dynamic Island */}
                  <div className="w-full h-4 bg-[#FFFFFF] flex items-center justify-center pt-1.5 pb-0.5">
                    <div className="w-12 h-2.5 rounded-full bg-[#111111]" />
                  </div>

                  {/* IG Profile Bar */}
                  <div className="px-2.5 py-1.5 border-b border-[#E9E9E5]/60 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-[#FFD400] flex items-center justify-center text-[9px] font-bold text-[#111111]">
                        CO
                      </div>
                      <span className="text-[9px] font-bold text-[#111111] truncate max-w-[90px]">@clinica.odonto</span>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
                  </div>

                  {/* Micro Highlights */}
                  <div className="flex items-center justify-around py-1.5 px-2 bg-[#FAFAF8] border-b border-[#E9E9E5]/50">
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-5 h-5 rounded-full border border-[#FFD400] p-[1px]">
                        <div className="w-full h-full rounded-full bg-[#FFFFFF]" />
                      </div>
                      <span className="text-[7px] text-[#646464] font-medium">Clínica</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-5 h-5 rounded-full border border-[#FFD400] p-[1px]">
                        <div className="w-full h-full rounded-full bg-[#FFFFFF]" />
                      </div>
                      <span className="text-[7px] text-[#646464] font-medium">Casos</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-5 h-5 rounded-full border border-[#FFD400] p-[1px]">
                        <div className="w-full h-full rounded-full bg-[#FFFFFF]" />
                      </div>
                      <span className="text-[7px] text-[#646464] font-medium">Equipe</span>
                    </div>
                  </div>

                  {/* Micro Instagram Editorial Posts Grid (3x2) */}
                  <div className="grid grid-cols-3 gap-0.5 p-1 bg-[#FFFFFF]">
                    <div className="aspect-square rounded-[3px] bg-[#111111] p-1 flex flex-col justify-between">
                      <span className="text-[5px] text-[#FFD400] font-bold">ESTÉTICA</span>
                      <span className="text-[5.5px] text-white font-medium leading-tight">Mitos do Clareamento</span>
                    </div>
                    <div className="aspect-square rounded-[3px] bg-[#F7F7F3] border border-[#E9E9E5] p-1 flex flex-col justify-between">
                      <span className="text-[5px] text-[#646464] font-bold">CASO</span>
                      <span className="text-[5.5px] text-[#111111] font-medium leading-tight">Lentes em Porcelana</span>
                    </div>
                    <div className="aspect-square rounded-[3px] bg-[#FFD400] p-1 flex flex-col justify-between">
                      <span className="text-[5px] text-[#111111] font-bold">ORIENTAÇÃO</span>
                      <span className="text-[5.5px] text-[#111111] font-bold leading-tight">Sensibilidade dental</span>
                    </div>
                    <div className="aspect-square rounded-[3px] bg-[#FAFAF8] border border-[#E9E9E5] p-1 flex flex-col justify-between">
                      <span className="text-[5px] text-[#646464] font-bold">TECNOLOGIA</span>
                      <span className="text-[5.5px] text-[#111111] font-medium leading-tight">Scanner 3D</span>
                    </div>
                    <div className="aspect-square rounded-[3px] bg-[#111111] p-1 flex flex-col justify-between">
                      <span className="text-[5px] text-[#FFD400] font-bold">EQUIPE</span>
                      <span className="text-[5.5px] text-white font-medium leading-tight">Bastidores clínicos</span>
                    </div>
                    <div className="aspect-square rounded-[3px] bg-[#F7F7F3] border border-[#E9E9E5] p-1 flex flex-col justify-between">
                      <span className="text-[5px] text-[#646464] font-bold">DÚVIDA</span>
                      <span className="text-[5.5px] text-[#111111] font-medium leading-tight">Implante é seguro?</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
