import { ArrowRight, CheckCircle2, LayoutTemplate, Smartphone, Compass } from "lucide-react";

export default function SolutionsSection() {
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

  const pillars = [
    {
      icon: Compass,
      title: "GESTÃO DIGITAL",
      description: "Organização, estratégia e acompanhamento contínuo da sua presença digital.",
      items: [
        "Planejamento",
        "Direção da comunicação",
        "Calendário",
        "Organização de aprovações",
        "Acompanhamento",
        "Gestão das entregas contratadas",
      ],
    },
    {
      icon: Smartphone,
      title: "INSTAGRAM & CONTEÚDO",
      description: "Posicionamento visual e autoridade técnica para transformar seguidores em pacientes.",
      items: [
        "Posts",
        "Carrosséis",
        "Peças gráficas",
        "Direção visual",
        "Planejamento editorial",
        "Orientação para captação de fotos e vídeos",
      ],
    },
    {
      icon: LayoutTemplate,
      title: "LANDING PAGES",
      description: "Páginas de alta conversão estruturadas para campanhas e captação de pacientes.",
      items: [
        "Estratégia",
        "Copy",
        "UX/UI",
        "Desenvolvimento",
        "Formulários",
        "Campanhas",
        "Preparação para integrações",
      ],
    },
  ];

  return (
    <section id="solucoes" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E9E9E5]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        
        {/* Cabeçalho */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F7F3] border border-[#E9E9E5] text-[12px] font-semibold tracking-wider text-[#111111] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
            SOLUÇÕES INTEGRADAS
          </div>
          <h2 className="text-[32px] sm:text-[44px] font-bold text-[#111111] leading-[1.15] tracking-[-0.03em] mb-4">
            Sua clínica não precisa de um pacote pronto. Precisa da estrutura certa.
          </h2>
          <p className="text-[17px] text-[#646464] leading-relaxed">
            As propostas da Ideal são personalizadas. Uma clínica pode precisar de uma solução específica; outra, de uma estrutura integrada.
          </p>
        </div>

        {/* Os 3 Grandes Pilares */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-[#E9E9E5] bg-[#F7F7F3] p-7 sm:p-8 flex flex-col justify-between hover:border-[#111111]/30 transition-all duration-200 shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] border border-[#E9E9E5] flex items-center justify-center text-[#111111] mb-6 shadow-sm">
                    <Icon className="w-5 h-5 text-[#111111]" />
                  </div>

                  <h3 className="text-[20px] font-bold text-[#111111] tracking-tight mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-[13px] text-[#646464] leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-[#E9E9E5]">
                    {pillar.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center gap-2.5 text-[14px] text-[#111111]">
                        <CheckCircle2 className="w-4 h-4 text-[#FFD400] flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bloco de Informação Importante + Destaque */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 sm:p-8 rounded-3xl bg-[#FAFAF8] border border-[#E9E9E5] mb-12">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#646464]">
              Informação Importante
            </span>
            <p className="text-[14px] sm:text-[15px] text-[#111111] leading-relaxed">
              A clínica fornece a matéria-prima audiovisual. A Ideal orienta a equipe sobre o que produzir e como produzir.
            </p>
          </div>

          <div className="md:text-right">
            <span className="inline-block px-4 py-2 rounded-full bg-[#FFFFFF] border border-[#E9E9E5] text-[13px] font-bold text-[#111111] shadow-sm">
              ✨ Planos personalizados. Sem Bronze, Silver ou Gold.
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center justify-center gap-3 h-[52px] px-8 rounded-full bg-[#FFD400] text-[#111111] text-[15px] font-bold hover:brightness-95 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(255,212,0,0.25)]"
          >
            Descobrir o plano ideal para minha clínica
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
