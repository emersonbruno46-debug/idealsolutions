import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

interface Step {
  letter: string;
  name: string;
  description: string;
}

const STEPS: Step[] = [
  {
    letter: "I",
    name: "Imersão no seu negócio",
    description: "Entendemos sua clínica, seus serviços, seu público e sua presença digital.",
  },
  {
    letter: "D",
    name: "Direção estratégica",
    description: "Definimos prioridades, comunicação e soluções adequadas aos seus objetivos.",
  },
  {
    letter: "E",
    name: "Execução das soluções",
    description: "Criamos os materiais e implementamos as entregas contratadas. Sua equipe recebe orientação para fornecer fotos e vídeos.",
  },
  {
    letter: "A",
    name: "Acompanhamento próximo",
    description: "Organizamos aprovações e acompanhamos entregas e indicadores relacionados ao projeto.",
  },
  {
    letter: "L",
    name: "Lapidação contínua",
    description: "Ajustamos a comunicação e as ações com base nos dados disponíveis e no retorno da sua equipe.",
  },
];

export default function MethodSection() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.45;
      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY && rect.bottom >= triggerY) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <section id="metodo" className="py-20 md:py-28 bg-[#F7F7F3] border-b border-[#E9E9E5]">
      <div className="max-w-[1040px] mx-auto px-5 sm:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E9E9E5] text-[12px] font-semibold tracking-wider text-[#111111] uppercase mb-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
            MÉTODO IDEAL
          </div>
          <h2 className="text-[32px] sm:text-[42px] font-bold text-[#111111] leading-[1.15] tracking-[-0.03em] mb-4">
            Um processo claro. Um plano feito para sua clínica.
          </h2>
          <p className="text-[16px] text-[#646464] leading-relaxed">
            O Método IDEAL organiza o trabalho do primeiro diagnóstico aos ajustes, respeitando o momento e as necessidades do seu negócio.
          </p>
        </div>

        {/* Sequência Vertical das 5 Etapas */}
        <div className="space-y-4 max-w-3xl mx-auto relative">
          
          {/* Linha vertical sutil conectando as etapas */}
          <div className="absolute left-[39px] sm:left-[47px] top-8 bottom-8 w-px bg-[#E9E9E5] -z-0" />

          {STEPS.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <div
                key={step.letter}
                ref={(el) => (stepRefs.current[index] = el)}
                onClick={() => setActiveStep(index)}
                className={`relative z-10 cursor-pointer rounded-2xl p-6 sm:p-7 border transition-all duration-200 flex items-start gap-5 sm:gap-6 ${
                  isActive
                    ? "bg-[#FFFFFF] border-[#111111] shadow-[0_8px_30px_rgba(0,0,0,0.06)] scale-[1.01]"
                    : "bg-[#FFFFFF]/70 border-[#E9E9E5] hover:bg-[#FFFFFF] hover:border-[#111111]/30 opacity-80"
                }`}
              >
                {/* Letra / Círculo de Destaque */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-[20px] sm:text-[22px] transition-all duration-200 ${
                    isActive
                      ? "bg-[#FFD400] text-[#111111] shadow-[0_4px_12px_rgba(255,212,0,0.35)]"
                      : "bg-[#F7F7F3] text-[#646464] border border-[#E9E9E5]"
                  }`}
                >
                  {step.letter}
                </div>

                {/* Conteúdo da Etapa */}
                <div className="space-y-1.5 flex-1 pt-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111111]">
                      {step.letter} — {step.name}
                    </h3>
                    {isActive && (
                      <span className="hidden sm:inline-flex items-center text-[11px] font-bold uppercase tracking-wider text-[#111111] bg-[#FFD400] px-2.5 py-0.5 rounded">
                        Etapa Ativa
                      </span>
                    )}
                  </div>
                  <p className="text-[14px] sm:text-[15px] text-[#646464] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Observação Contratual */}
        <div className="max-w-3xl mx-auto mt-10 p-5 rounded-2xl bg-[#FFFFFF] border border-[#E9E9E5] text-[13px] text-[#646464] leading-relaxed">
          <strong className="text-[#111111] font-semibold">Observação:</strong> O acompanhamento respeita o escopo e o período contratados. Projetos pontuais e serviços recorrentes têm formatos próprios.
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center justify-center gap-3 h-[52px] px-8 rounded-full bg-[#111111] text-[#FFFFFF] text-[15px] font-bold hover:bg-[#252525] active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
          >
            Quero um plano para minha clínica
            <ArrowRight className="w-4 h-4 text-[#FFD400]" />
          </button>
        </div>

      </div>
    </section>
  );
}
