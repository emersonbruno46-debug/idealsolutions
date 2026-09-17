export default function AboutSection() {
  const indicators = [
    { number: "2024", label: "Fundação" },
    { number: "100+", label: "Clientes atendidos" },
    { number: "Brasil", label: "Atendimento nacional" },
  ];

  return (
    <section id="sobre" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E9E9E5]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Coluna Esquerda: Texto Institucional (7 colunas) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F7F3] border border-[#E9E9E5] text-[12px] font-semibold tracking-wider text-[#111111] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
              IDEAL SOLUTIONS
            </div>

            {/* Headline */}
            <h2 className="text-[32px] sm:text-[42px] font-bold text-[#111111] leading-[1.15] tracking-[-0.03em]">
              Estratégia, design e presença digital trabalhando como uma só estrutura.
            </h2>

            {/* Textos Oficiais */}
            <div className="space-y-4 text-[16px] sm:text-[17px] text-[#646464] leading-[1.7]">
              <p>
                A Ideal Solutions nasceu em 2024 para ajudar negócios a construírem uma presença digital compatível com a qualidade do que entregam fora da internet.
              </p>
              <p>
                Mais de 100 clientes já passaram pela Ideal em projetos envolvendo comunicação, posicionamento, conteúdo e experiências digitais.
              </p>
              <p className="text-[#111111] font-medium">
                Agora, essa experiência passa a ser aplicada de forma direcionada ao mercado odontológico.
              </p>
            </div>

          </div>

          {/* Coluna Direita: Indicadores Editoriais (5 colunas) */}
          <div className="lg:col-span-5">
            <div className="bg-[#F7F7F3] border border-[#E9E9E5] rounded-3xl p-8 sm:p-10 space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              
              <p className="text-[12px] font-bold uppercase tracking-wider text-[#646464] pb-2 border-b border-[#E9E9E5]">
                Solidez & Presença
              </p>

              <div className="divide-y divide-[#E9E9E5]">
                {indicators.map((item, idx) => (
                  <div key={idx} className="py-5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[36px] sm:text-[44px] font-bold text-[#111111] leading-none tracking-tight block">
                        {item.number}
                      </span>
                      <span className="text-[14px] text-[#646464] font-medium mt-1 block">
                        {item.label}
                      </span>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFD400]" />
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E9E9E5] text-[13px] text-[#646464] leading-relaxed">
                Estrutura de ponta a ponta focada em gerar credibilidade, consideração e resultados sustentáveis.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
