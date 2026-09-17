import DynamicForm from "./DynamicForm";

export default function FormSection() {
  return (
    <section id="diagnostico" className="py-20 md:py-28 bg-[#FFFFFF] border-y border-[#E9E9E5]">
      <div className="max-w-[840px] mx-auto px-5 sm:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F7F3] border border-[#E9E9E5] text-[12px] font-semibold tracking-wider text-[#111111] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
            DIAGNÓSTICO PERSONALIZADO
          </div>
          <h2 className="text-[30px] sm:text-[40px] font-bold text-[#111111] leading-[1.15] tracking-[-0.03em] mb-4">
            Descubra qual estrutura faz sentido para sua clínica.
          </h2>
          <p className="text-[16px] text-[#646464] leading-relaxed">
            Leva menos de 1 minuto. Suas respostas ajudam nossa equipe a entender o momento da clínica antes do contato.
          </p>
        </div>

        {/* Card do Formulário */}
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#E9E9E5] p-6 sm:p-10 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.05)]">
          <DynamicForm />
        </div>

      </div>
    </section>
  );
}
