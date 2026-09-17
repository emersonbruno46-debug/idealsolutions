import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

const REVENUE_TIERS = [
  { label: "Até R$ 10 mil", value: "ate-10k", investment: "R$ 2.500/mês" },
  { label: "R$ 10 mil a R$ 30 mil", value: "10k-30k", investment: "R$ 3.000/mês" },
  { label: "R$ 30 mil a R$ 60 mil", value: "30k-60k", investment: "R$ 4.000/mês" },
  { label: "R$ 60 mil a R$ 100 mil", value: "60k-100k", investment: "R$ 5.000/mês" },
  { label: "Acima de R$ 100 mil", value: "acima-100k", investment: "R$ 7.500/mês" },
];

const INTEREST_OPTIONS = [
  "Gestão de Instagram",
  "Conteúdo",
  "Landing Page",
  "Presença digital completa",
  "Ainda não sei",
];

const BRAZILIAN_STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

function formatCNPJ(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
}

export default function DynamicForm() {
  const [formData, setFormData] = useState({
    nome: "",
    clinica: "",
    whatsapp: "",
    cidade: "",
    estado: "",
    instagramSite: "",
    interesse: "",
    faturamento: "",
    disposicaoInvestimento: "",
    cnpj: "",
    lgpdConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [utms, setUtms] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setUtms({
        utm_source: params.get("utm_source") || "",
        utm_medium: params.get("utm_medium") || "",
        utm_campaign: params.get("utm_campaign") || "",
        utm_content: params.get("utm_content") || "",
        utm_term: params.get("utm_term") || "",
        page_url: window.location.href,
      });
    }
  }, []);

  const selectedTier = REVENUE_TIERS.find((t) => t.value === formData.faturamento);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    handleChange("whatsapp", formatted);
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    handleChange("cnpj", formatted);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome.trim()) newErrors.nome = "Informe o seu nome.";
    if (!formData.clinica.trim()) newErrors.clinica = "Informe o nome da clínica ou consultório.";
    
    const phoneDigits = formData.whatsapp.replace(/\D/g, "");
    if (phoneDigits.length < 10) newErrors.whatsapp = "Informe um WhatsApp válido com DDD.";

    if (!formData.cidade.trim()) newErrors.cidade = "Informe sua cidade.";
    if (!formData.estado) newErrors.estado = "Selecione o estado.";
    if (!formData.interesse) newErrors.interesse = "Selecione o que procura.";
    if (!formData.faturamento) newErrors.faturamento = "Selecione a faixa aproximada de faturamento.";

    if (formData.faturamento && !formData.disposicaoInvestimento) {
      newErrors.disposicaoInvestimento = "Por favor, responda se estaria disposto a investir este valor.";
    }

    if (!formData.lgpdConsent) {
      newErrors.lgpdConsent = "É necessário aceitar os termos de contato.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Rolar até o primeiro erro se necessário
      const firstErrorKey = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      valorInvestimentoMostrado: selectedTier?.investment || "",
      ...utms,
      timestamp: new Date().toISOString(),
    };

    console.log("[Ideal Solutions CRM Lead]:", payload);

    try {
      // Simulação com camada preparada para webhook/API real
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Se existir webhook configurado no ambiente:
      // await fetch(webhookUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setSubmitError("Houve um problema ao enviar o diagnóstico. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="py-12 px-4 text-center space-y-5 anim-fade-up">
        <div className="w-16 h-16 rounded-full bg-[#FFD400]/20 border border-[#FFD400] flex items-center justify-center mx-auto text-[#111111]">
          <CheckCircle2 className="w-8 h-8 text-[#111111]" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h3 className="text-[24px] font-bold text-[#111111]">
            Diagnóstico enviado com sucesso!
          </h3>
          <p className="text-[15px] text-[#646464] leading-relaxed">
            Recebemos as informações da sua clínica. Nossa equipe analisará seus dados e entrará em contato em até <strong className="text-[#111111] font-semibold">1 dia útil</strong> para agendar nossa conversa.
          </p>
        </div>
        <div className="pt-4">
          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setFormData({
                nome: "",
                clinica: "",
                whatsapp: "",
                cidade: "",
                estado: "",
                instagramSite: "",
                interesse: "",
                faturamento: "",
                disposicaoInvestimento: "",
                cnpj: "",
                lgpdConsent: false,
              });
            }}
            className="text-[13px] font-semibold text-[#646464] hover:text-[#111111] underline underline-offset-4"
          >
            Enviar outro diagnóstico
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      
      {/* Linha 1: Nome e Clínica */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="nome" className="block text-[13px] font-semibold text-[#111111]">
            Seu Nome <span className="text-[#FFD400]">*</span>
          </label>
          <input
            id="nome"
            type="text"
            required
            placeholder="Ex: Dr. Roberto Mendes"
            value={formData.nome}
            onChange={(e) => handleChange("nome", e.target.value)}
            className={`w-full h-12 px-4 rounded-xl border text-[14px] text-[#111111] bg-[#FFFFFF] transition-all outline-none focus:ring-2 focus:ring-[#FFD400] focus:border-[#FFD400] placeholder:text-[#646464]/40 ${
              errors.nome ? "border-red-400 bg-red-50/20" : "border-[#E9E9E5]"
            }`}
          />
          {errors.nome && <p className="text-[12px] text-red-500 font-medium">{errors.nome}</p>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="clinica" className="block text-[13px] font-semibold text-[#111111]">
            Nome da clínica ou consultório <span className="text-[#FFD400]">*</span>
          </label>
          <input
            id="clinica"
            type="text"
            required
            placeholder="Ex: Mendes Odontologia Integrada"
            value={formData.clinica}
            onChange={(e) => handleChange("clinica", e.target.value)}
            className={`w-full h-12 px-4 rounded-xl border text-[14px] text-[#111111] bg-[#FFFFFF] transition-all outline-none focus:ring-2 focus:ring-[#FFD400] focus:border-[#FFD400] placeholder:text-[#646464]/40 ${
              errors.clinica ? "border-red-400 bg-red-50/20" : "border-[#E9E9E5]"
            }`}
          />
          {errors.clinica && <p className="text-[12px] text-red-500 font-medium">{errors.clinica}</p>}
        </div>
      </div>

      {/* Linha 2: WhatsApp e Instagram/Site */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="whatsapp" className="block text-[13px] font-semibold text-[#111111]">
            WhatsApp (com DDD) <span className="text-[#FFD400]">*</span>
          </label>
          <input
            id="whatsapp"
            type="tel"
            required
            placeholder="(11) 98765-4321"
            value={formData.whatsapp}
            onChange={handlePhoneChange}
            className={`w-full h-12 px-4 rounded-xl border text-[14px] text-[#111111] bg-[#FFFFFF] transition-all outline-none focus:ring-2 focus:ring-[#FFD400] focus:border-[#FFD400] placeholder:text-[#646464]/40 ${
              errors.whatsapp ? "border-red-400 bg-red-50/20" : "border-[#E9E9E5]"
            }`}
          />
          {errors.whatsapp && <p className="text-[12px] text-red-500 font-medium">{errors.whatsapp}</p>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="instagramSite" className="block text-[13px] font-semibold text-[#111111]">
            Instagram ou site
          </label>
          <input
            id="instagramSite"
            type="text"
            placeholder="@suaclinica ou www.suaclinica.com.br"
            value={formData.instagramSite}
            onChange={(e) => handleChange("instagramSite", e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-[#E9E9E5] text-[14px] text-[#111111] bg-[#FFFFFF] transition-all outline-none focus:ring-2 focus:ring-[#FFD400] focus:border-[#FFD400] placeholder:text-[#646464]/40"
          />
        </div>
      </div>

      {/* Linha 3: Cidade e Estado */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="sm:col-span-2 space-y-1.5">
          <label htmlFor="cidade" className="block text-[13px] font-semibold text-[#111111]">
            Cidade <span className="text-[#FFD400]">*</span>
          </label>
          <input
            id="cidade"
            type="text"
            required
            placeholder="Ex: São Paulo"
            value={formData.cidade}
            onChange={(e) => handleChange("cidade", e.target.value)}
            className={`w-full h-12 px-4 rounded-xl border text-[14px] text-[#111111] bg-[#FFFFFF] transition-all outline-none focus:ring-2 focus:ring-[#FFD400] focus:border-[#FFD400] placeholder:text-[#646464]/40 ${
              errors.cidade ? "border-red-400 bg-red-50/20" : "border-[#E9E9E5]"
            }`}
          />
          {errors.cidade && <p className="text-[12px] text-red-500 font-medium">{errors.cidade}</p>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="estado" className="block text-[13px] font-semibold text-[#111111]">
            Estado <span className="text-[#FFD400]">*</span>
          </label>
          <select
            id="estado"
            required
            value={formData.estado}
            onChange={(e) => handleChange("estado", e.target.value)}
            className={`w-full h-12 px-3 rounded-xl border text-[14px] text-[#111111] bg-[#FFFFFF] transition-all outline-none focus:ring-2 focus:ring-[#FFD400] focus:border-[#FFD400] cursor-pointer ${
              errors.estado ? "border-red-400 bg-red-50/20" : "border-[#E9E9E5]"
            }`}
          >
            <option value="">UF</option>
            {BRAZILIAN_STATES.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
          {errors.estado && <p className="text-[12px] text-red-500 font-medium">{errors.estado}</p>}
        </div>
      </div>

      {/* Linha 4: O que você procura? */}
      <div className="space-y-2">
        <label htmlFor="interesse" className="block text-[13px] font-semibold text-[#111111]">
          O que você procura? <span className="text-[#FFD400]">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {INTEREST_OPTIONS.map((opt) => {
            const isSelected = formData.interesse === opt;
            return (
              <button
                type="button"
                key={opt}
                onClick={() => handleChange("interesse", opt)}
                className={`flex items-center text-left px-4 py-3 rounded-xl border text-[13px] font-medium transition-all duration-150 ${
                  isSelected
                    ? "border-[#111111] bg-[#F7F7F3] text-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                    : "border-[#E9E9E5] bg-[#FFFFFF] text-[#646464] hover:border-[#111111]/40"
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full border mr-2.5 flex-shrink-0 flex items-center justify-center ${
                    isSelected ? "border-[#111111]" : "border-[#E9E9E5]"
                  }`}
                >
                  {isSelected && <span className="w-2 h-2 rounded-full bg-[#FFD400]" />}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
        {errors.interesse && <p className="text-[12px] text-red-500 font-medium">{errors.interesse}</p>}
      </div>

      {/* Linha 5: Faixa aproximada de faturamento mensal */}
      <div className="space-y-2 pt-2 border-t border-[#E9E9E5]/60">
        <label htmlFor="faturamento" className="block text-[13px] font-semibold text-[#111111]">
          Faixa aproximada de faturamento mensal <span className="text-[#FFD400]">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {REVENUE_TIERS.map((tier) => {
            const isSelected = formData.faturamento === tier.value;
            return (
              <button
                type="button"
                key={tier.value}
                onClick={() => {
                  handleChange("faturamento", tier.value);
                  // Reseta disposição ao trocar faixa para garantir atenção
                  handleChange("disposicaoInvestimento", "");
                }}
                className={`flex items-center text-left px-4 py-3 rounded-xl border text-[13px] font-medium transition-all duration-150 ${
                  isSelected
                    ? "border-[#111111] bg-[#F7F7F3] text-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                    : "border-[#E9E9E5] bg-[#FFFFFF] text-[#646464] hover:border-[#111111]/40"
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full border mr-2.5 flex-shrink-0 flex items-center justify-center ${
                    isSelected ? "border-[#111111]" : "border-[#E9E9E5]"
                  }`}
                >
                  {isSelected && <span className="w-2 h-2 rounded-full bg-[#FFD400]" />}
                </span>
                {tier.label}
              </button>
            );
          })}
        </div>
        {errors.faturamento && <p className="text-[12px] text-red-500 font-medium">{errors.faturamento}</p>}
      </div>

      {/* ========================================================= */}
      {/* LÓGICA CONDICIONAL: Revelada ao selecionar faturamento */}
      {/* ========================================================= */}
      {selectedTier && (
        <div className="pt-6 border-t border-[#E9E9E5] space-y-6 anim-fade-up bg-[#FAFAF8] -mx-6 -mb-6 p-6 sm:p-8 rounded-b-3xl mt-4">
          
          {/* Campo 1 Condicional (Obrigatório): Pergunta Dinâmica de Investimento */}
          <div className="space-y-3">
            <label className="block text-[14px] font-bold text-[#111111] leading-snug">
              Considerando o momento atual da sua clínica, você estaria disposto a investir a partir de{" "}
              <span className="inline-block px-2 py-0.5 rounded bg-[#FFD400] text-[#111111]">
                {selectedTier.investment}
              </span>{" "}
              para fortalecer sua presença digital e gerar mais oportunidades? <span className="text-red-500">*</span>
            </label>

            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <button
                type="button"
                onClick={() => handleChange("disposicaoInvestimento", "SIM")}
                className={`flex items-center justify-center gap-2 h-12 rounded-xl border text-[14px] font-bold transition-all ${
                  formData.disposicaoInvestimento === "SIM"
                    ? "border-[#111111] bg-[#111111] text-[#FFFFFF]"
                    : "border-[#E9E9E5] bg-[#FFFFFF] text-[#111111] hover:border-[#111111]"
                }`}
              >
                SIM
              </button>

              <button
                type="button"
                onClick={() => handleChange("disposicaoInvestimento", "NÃO")}
                className={`flex items-center justify-center gap-2 h-12 rounded-xl border text-[14px] font-bold transition-all ${
                  formData.disposicaoInvestimento === "NÃO"
                    ? "border-[#111111] bg-[#111111] text-[#FFFFFF]"
                    : "border-[#E9E9E5] bg-[#FFFFFF] text-[#111111] hover:border-[#111111]"
                }`}
              >
                NÃO
              </button>
            </div>

            {errors.disposicaoInvestimento && (
              <p className="text-[12px] text-red-500 font-medium">{errors.disposicaoInvestimento}</p>
            )}

            <p className="text-[12px] text-[#646464]">
              * Responder &ldquo;NÃO&rdquo; não impede o envio do formulário. A resposta é utilizada para qualificação do atendimento.
            </p>
          </div>

          {/* Campo 2 Condicional (Opcional): CNPJ com máscara */}
          <div className="space-y-1.5 max-w-sm">
            <div className="flex items-center justify-between">
              <label htmlFor="cnpj" className="block text-[13px] font-semibold text-[#111111]">
                CNPJ da clínica ou consultório
              </label>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#646464] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#E9E9E5]">
                Opcional
              </span>
            </div>
            <input
              id="cnpj"
              type="text"
              placeholder="00.000.000/0000-00"
              value={formData.cnpj}
              onChange={handleCNPJChange}
              className="w-full h-12 px-4 rounded-xl border border-[#E9E9E5] text-[14px] text-[#111111] bg-[#FFFFFF] transition-all outline-none focus:ring-2 focus:ring-[#FFD400] focus:border-[#FFD400] placeholder:text-[#646464]/40"
            />
          </div>

        </div>
      )}

      {/* Consentimento LGPD */}
      <div className="space-y-1.5 pt-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.lgpdConsent}
            onChange={(e) => handleChange("lgpdConsent", e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-[#E9E9E5] text-[#111111] focus:ring-[#FFD400]"
          />
          <span className="text-[12px] text-[#646464] leading-relaxed select-none">
            Concordo em fornecer meus dados para que a Ideal Solutions entre em contato comercial e apresente uma proposta personalizada para a minha clínica, em conformidade com a LGPD.
          </span>
        </label>
        {errors.lgpdConsent && <p className="text-[12px] text-red-500 font-medium">{errors.lgpdConsent}</p>}
      </div>

      {/* Submit Error feedback se houver */}
      {submitError && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* CTA Final do Formulário */}
      <div className="pt-2 text-center sm:text-left space-y-3">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 h-[54px] px-9 rounded-full bg-[#111111] text-[#FFFFFF] text-[15px] font-bold hover:bg-[#252525] active:scale-[0.98] transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(0,0,0,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FFD400]"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#FFD400]" />
              Enviando diagnóstico...
            </>
          ) : (
            <>
              Quero conversar com a Ideal
              <ArrowRight className="w-4 h-4 text-[#FFD400]" />
            </>
          )}
        </button>

        <p className="text-[13px] text-[#646464]">
          Nossa equipe entra em contato em até <strong className="text-[#111111] font-semibold">1 dia útil</strong>.
        </p>
      </div>

    </form>
  );
}
