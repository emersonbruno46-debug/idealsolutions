import { useState } from "react";
import { ArrowRight, Plus, Minus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Vocês atendem todo o Brasil?",
    answer:
      "Sim. Nosso atendimento e gestão são realizados de forma remota para consultórios e clínicas em qualquer cidade ou estado do Brasil, com alinhamento próximo, calendário organizado e suporte direto.",
  },
  {
    question: "Vocês atendem dentistas individuais e clínicas?",
    answer:
      "Sim. Atendemos tanto profissionais autônomos que desejam consolidar sua autoridade e atrair pacientes particulares quanto clínicas com múltiplos consultórios e especialidades odontológicas.",
  },
  {
    question: "Preciso contratar todos os serviços?",
    answer:
      "Não. Cada clínica tem uma prioridade. Você pode contratar apenas a landing page de conversão, a gestão editorial do Instagram, ou a presença digital completa com gestão integrada.",
  },
  {
    question: "Por que não há preços ou pacotes na página?",
    answer:
      "Porque não acreditamos em pacotes prontos genéricos (Bronze, Silver ou Gold). A proposta é construída sob medida para a realidade, a estrutura e a meta da sua clínica após o diagnóstico inicial.",
  },
  {
    question: "Como funcionam fotos e vídeos?",
    answer:
      "A clínica fornece a matéria-prima audiovisual. A Ideal orienta a equipe sobre o que produzir e como produzir — enviamos orientações de roteiro, enquadramento e iluminação para que o material tenha o padrão visual necessário.",
  },
  {
    question: "Existe fidelidade mínima?",
    answer:
      "Serviços recorrentes normalmente trabalham com período mínimo de três meses, podendo variar conforme a proposta. Projetos pontuais possuem formatos próprios.",
  },
  {
    question: "Quanto tempo leva para começar?",
    answer:
      "Após a conversa inicial e a aprovação do plano, iniciamos a etapa de Imersão imediatamente. O cronograma de implementação do calendário e das entregas é validado junto à sua equipe nos primeiros dias.",
  },
  {
    question: "O que acontece depois que envio o formulário?",
    answer:
      "Nossa equipe analisa o diagnóstico da sua clínica, entra em contato em até 1 dia útil, conduz uma call comercial para entender seus objetivos em detalhes e apresenta uma proposta personalizada.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
    <section id="duvidas" className="py-20 md:py-28 bg-[#F7F7F3] border-b border-[#E9E9E5]">
      <div className="max-w-[1040px] mx-auto px-5 sm:px-8">
        
        {/* Cabeçalho do FAQ */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E9E9E5] text-[12px] font-semibold tracking-wider text-[#111111] uppercase mb-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
            DÚVIDAS FREQUENTES
          </div>
          <h2 className="text-[32px] sm:text-[42px] font-bold text-[#111111] leading-[1.15] tracking-[-0.03em] mb-4">
            Perguntas comuns antes de começar.
          </h2>
          <p className="text-[16px] text-[#646464] leading-relaxed">
            Transparência e clareza sobre como estruturamos a presença digital da sua clínica odontológica.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 max-w-3xl mx-auto mb-20">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#FFFFFF] border border-[#E9E9E5] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400]"
                  aria-expanded={isOpen}
                >
                  <span className="text-[16px] font-bold text-[#111111] leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen ? "bg-[#FFD400] text-[#111111]" : "bg-[#F7F7F3] text-[#646464]"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-[15px] text-[#646464] leading-relaxed border-t border-[#E9E9E5]/40 anim-fade-up">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA FINAL (Bloco de Fechamento) */}
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#E9E9E5] p-8 sm:p-14 text-center max-w-3xl mx-auto shadow-[0_16px_50px_-20px_rgba(0,0,0,0.06)]">
          <h3 className="text-[28px] sm:text-[38px] font-bold text-[#111111] leading-[1.2] tracking-[-0.03em] mb-6 max-w-xl mx-auto">
            Sua clínica já entrega um bom trabalho. Agora sua presença digital precisa acompanhar.
          </h3>

          <div className="mb-6">
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-3 h-[54px] px-9 rounded-full bg-[#FFD400] text-[#111111] text-[15px] font-bold hover:brightness-95 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(255,212,0,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
            >
              Quero um plano para minha clínica
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[13px] font-medium text-[#646464]">
            Atendimento nacional · Planos personalizados · Retorno em até 1 dia útil
          </p>
        </div>

      </div>
    </section>
  );
}
