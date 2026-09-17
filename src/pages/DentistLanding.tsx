import { useState, useEffect } from "react";
import {
  ArrowRight, Menu, X, ChevronDown, Plus, Minus,
  CheckCircle2, Check, Smartphone, Globe, Layers, ShieldCheck, Award, Star, Sparkles, TrendingUp
} from "lucide-react";

/* ─── Smooth Scroll Helper ─── */
function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ─── Phone Formatter ─── */
function fmtPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/* ─── Revenue Tiers ─── */
const REVENUE_TIERS = [
  { label: "Até R$ 10 mil/mês", value: "ate-10k" },
  { label: "R$ 10k a R$ 30 mil/mês", value: "10k-30k" },
  { label: "R$ 30k a R$ 60 mil/mês", value: "30k-60k" },
  { label: "R$ 60k a R$ 100 mil/mês", value: "60k-100k" },
  { label: "Acima de R$ 100 mil/mês", value: "acima-100k" },
];

/* ─── Segment Options ─── */
const SEGMENTS = [
  "Clínica Odontológica Multi-especialidades",
  "Consultório Individual / Autônomo",
  "Ortodontia & Alinhadores",
  "Implantodontia & Reabilitação",
  "Estética Dental & Lentes",
  "Harmonização Orofacial",
  "Outro segmento odontológico",
];

/* ─── FAQ Data ─── */
const FAQ_ITEMS = [
  { q: "Vocês atendem todo o Brasil?", a: "Sim. Nosso atendimento é 100% remoto e estruturado para consultórios e clínicas em qualquer cidade ou estado do Brasil." },
  { q: "Vocês atendem dentistas individuais e clínicas?", a: "Sim. Atendemos profissionais autônomos que querem consolidar autoridade e atrair pacientes particulares, e também clínicas com múltiplos consultórios." },
  { q: "Preciso contratar todos os serviços?", a: "Não. Cada clínica tem uma prioridade. Você pode contratar apenas a landing page, a gestão do Instagram ou a estrutura integrada completa." },
  { q: "Por que não há preços na página?", a: "Porque não acreditamos em pacotes genéricos. A proposta é construída sob medida para a realidade e o momento da sua clínica, apresentada após o diagnóstico inicial." },
  { q: "Como funcionam fotos e vídeos?", a: "A clínica fornece a matéria-prima audiovisual. A Ideal orienta o que produzir e como produzir — roteiro, enquadramento e padrão visual." },
  { q: "O que acontece depois que envio o formulário?", a: "Nossa equipe analisa o seu diagnóstico, entra em contato em até 1 dia útil, conduz uma call comercial e apresenta uma proposta personalizada." },
  { q: "Existe fidelidade mínima?", a: "Serviços recorrentes normalmente têm período mínimo de 3 meses. Projetos pontuais têm formatos próprios." },
];

export default function DentistLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(0);
  const [utms, setUtms] = useState<Record<string, string>>({});

  // Form State - Single-column form with conditional logic
  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    clinica: "",
    segmento: "",
    faturamento: "",
    cnpj: "",
    investimento: "",
    lgpd: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Check if current revenue tier requires CNPJ & Investment questions (<= 30k)
  const showConditionalFields = form.faturamento === "ate-10k" || form.faturamento === "10k-30k";

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setUtms({
      utm_source: p.get("utm_source") || "",
      utm_medium: p.get("utm_medium") || "",
      utm_campaign: p.get("utm_campaign") || "",
      utm_content: p.get("utm_content") || "",
      page_url: window.location.href,
    });
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const setField = (f: string, v: any) => {
    setForm(p => ({ ...p, [f]: v }));
    setErrors(p => { const c = { ...p }; delete c[f]; return c; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = "Informe seu nome";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "E-mail válido necessário";
    if (form.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "WhatsApp válido necessário";
    if (!form.clinica.trim()) e.clinica = "Informe o nome da clínica";
    if (!form.segmento) e.segmento = "Selecione o segmento";
    if (!form.faturamento) e.faturamento = "Selecione o faturamento";
    if (showConditionalFields) {
      if (!form.cnpj) e.cnpj = "Informe se possui CNPJ";
      if (!form.investimento) e.investimento = "Selecione a intenção de investimento";
    }
    if (!form.lgpd) e.lgpd = "Aceite os termos para prosseguir";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form, ...utms, timestamp: new Date().toISOString() };
      console.log("[Lead Ideal Solutions]:", payload);
      await new Promise(r => setTimeout(r, 1200));
      setSuccess(true);
    } catch {
      alert("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { label: "Soluções", href: "#solucoes" },
    { label: "Quem Somos", href: "#sobre" },
    { label: "Método", href: "#metodo" },
    { label: "Dúvidas", href: "#faq" },
  ];

  return (
    <div className="min-h-screen bg-[#0E0E11] text-white selection:bg-[#FFD400] selection:text-black font-[Plus_Jakarta_Sans,sans-serif] overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════════
          HEADER / NAVBAR
      ════════════════════════════════════════════════════════════ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0E0E11]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5"
          : "bg-gradient-to-b from-[#FFD400] via-[#FFD400] to-[#FFD400] py-4"
      }`}>
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 flex items-center justify-between">
          <a href="#hero" onClick={e => { e.preventDefault(); scrollTo("#hero"); }} className="flex items-center gap-3 group">
            <img
              src="/ideal-logo.png"
              alt="Ideal Solutions"
              className={`h-9 sm:h-10 w-auto object-contain transition-all ${scrolled ? "brightness-100" : "brightness-0"}`}
              onError={e => {
                const t = e.currentTarget;
                t.style.display = "none";
                const parent = t.parentElement;
                if (parent && !parent.querySelector(".logo-fallback")) {
                  const span = document.createElement("span");
                  span.className = `logo-fallback text-xl font-black tracking-tighter ${scrolled ? "text-white" : "text-black"}`;
                  span.innerText = "IDEAL SOLUTIONS";
                  parent.appendChild(span);
                }
              }}
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={e => { e.preventDefault(); scrollTo(l.href); }}
                className={`text-[14px] font-bold transition-all duration-150 ${
                  scrolled
                    ? "text-white/70 hover:text-[#FFD400]"
                    : "text-black/80 hover:text-black"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <button
              type="button"
              onClick={() => scrollTo("#hero")}
              className={`px-6 py-3 rounded-full text-[14px] font-extrabold transition-all duration-200 shadow-md ${
                scrolled
                  ? "bg-[#FFD400] text-[#0E0E11] hover:brightness-105 hover:shadow-[0_0_20px_rgba(255,212,0,0.3)]"
                  : "bg-[#0E0E11] text-white hover:bg-[#1F1F24]"
              }`}
            >
              Quero mais informações
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg ${scrolled ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10"}`}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0E0E11]/98 flex flex-col justify-center px-8 pt-20">
          <nav className="flex flex-col gap-6">
            {navLinks.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={e => { e.preventDefault(); scrollTo(l.href); setMenuOpen(false); }}
                className="text-[26px] font-black text-white hover:text-[#FFD400]"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-6">
              <button
                type="button"
                onClick={() => { scrollTo("#hero"); setMenuOpen(false); }}
                className="w-full bg-[#FFD400] text-[#0E0E11] py-4 rounded-xl font-extrabold text-[16px]"
              >
                Quero mais informações
              </button>
            </div>
          </nav>
        </div>
      )}

      <main>
        {/* ════════════════════════════════════════════════════════════
            01. HERO SECTION — WARM GOLD CANVAS WITH EMBEDDED DARK FORM
        ════════════════════════════════════════════════════════════ */}
        <section id="hero" className="relative bg-gradient-to-b from-[#FFD400] via-[#FFD400] to-[#F5C200] text-[#0E0E11] pt-32 pb-16 sm:pt-36 sm:pb-24 border-b border-black/10 overflow-hidden">
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-start">
              
              {/* Left Column: Headlines & Pillars */}
              <div className="lg:col-span-7 space-y-6 lg:pr-4">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0E0E11] text-white text-[12px] font-extrabold tracking-wide uppercase shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD400]" />
                  <span>Presença Digital Odontológica</span>
                </div>

                <h1 className="text-[34px] sm:text-[48px] lg:text-[56px] font-black leading-[1.08] tracking-[-0.03em] uppercase text-[#0E0E11]">
                  FAZEMOS O SEU CONSULTÓRIO VENDER MAIS DE{" "}
                  <span className="bg-[#0E0E11] text-[#FFD400] px-3.5 py-1 inline-block rounded-lg shadow-xl">
                    PACIENTES PARTICULARES
                  </span>
                </h1>

                <p className="text-[17px] sm:text-[20px] font-medium text-[#0E0E11]/85 leading-[1.5] max-w-xl">
                  Agende um diagnóstico gratuito e descubra como transformamos o marketing da sua clínica em uma máquina contínua de atração de novos pacientes.
                </p>

                {/* Checkmark List */}
                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center gap-3.5 text-[15px] sm:text-[16px] font-extrabold text-[#0E0E11]">
                    <div className="w-7 h-7 rounded-lg bg-[#0E0E11] text-[#00FF38] flex items-center justify-center flex-shrink-0 shadow-md">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span>Marketing focado em CONSULTAS PARTICULARES</span>
                  </div>

                  <div className="flex items-center gap-3.5 text-[15px] sm:text-[16px] font-extrabold text-[#0E0E11]">
                    <div className="w-7 h-7 rounded-lg bg-[#0E0E11] text-[#00FF38] flex items-center justify-center flex-shrink-0 shadow-md">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span>Especialistas exclusivos no ramo da ODONTOLOGIA</span>
                  </div>

                  <div className="flex items-center gap-3.5 text-[15px] sm:text-[16px] font-extrabold text-[#0E0E11]">
                    <div className="w-7 h-7 rounded-lg bg-[#0E0E11] text-[#00FF38] flex items-center justify-center flex-shrink-0 shadow-md">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span>Atendimento personalizado para todo o BRASIL</span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4 hidden lg:block">
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById("form-nome");
                      if (input) input.focus();
                    }}
                    className="inline-flex items-center gap-3 bg-[#0E0E11] text-white hover:bg-[#1F1F24] font-black px-8 py-4.5 rounded-xl text-[16px] transition-all duration-200 shadow-2xl hover:translate-x-1"
                  >
                    Quero resultados como esse
                    <ArrowRight className="w-5 h-5 text-[#FFD400]" />
                  </button>
                </div>
              </div>

              {/* Right Column: FORM CARD */}
              <div className="lg:col-span-5">
                <div className="bg-[#121215] rounded-2xl p-6 sm:p-8 text-white shadow-2xl border border-white/10 relative overflow-hidden backdrop-blur-xl">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#FFD400]/10 rounded-full blur-3xl pointer-events-none" />

                  {success ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-[#00E676]/20 border border-[#00E676] flex items-center justify-center mx-auto text-[#00E676]">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-[24px] font-black text-white">Diagnóstico Solicitado!</h3>
                      <p className="text-white/70 text-[14px] leading-relaxed">
                        Recebemos os dados da sua clínica. Nossa equipe entrará em contato em até <strong className="text-white">1 dia útil</strong>.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSuccess(false);
                          setForm({ nome: "", email: "", whatsapp: "", clinica: "", segmento: "", faturamento: "", cnpj: "", investimento: "", lgpd: false });
                        }}
                        className="text-[13px] text-[#FFD400] underline font-bold pt-4 block mx-auto"
                      >
                        Enviar novo formulário
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="border-b border-white/10 pb-3 mb-2">
                        <h3 className="text-[18px] font-black text-white text-center lg:text-left tracking-tight">
                          Preencha para receber o diagnóstico
                        </h3>
                        <p className="text-[12px] text-white/50 text-center lg:text-left mt-0.5">
                          Atendimento consultivo rápido em até 24h.
                        </p>
                      </div>

                      {/* 1. Nome */}
                      <div>
                        <input
                          id="form-nome"
                          type="text"
                          placeholder="Seu nome *"
                          value={form.nome}
                          onChange={e => setField("nome", e.target.value)}
                          className={`w-full h-12 bg-[#1C1C22] border text-white placeholder-white/40 px-4 rounded-xl text-[14px] outline-none focus:border-[#FFD400] transition-colors ${
                            errors.nome ? "border-red-500 bg-red-500/10" : "border-white/10"
                          }`}
                        />
                        {errors.nome && <span className="text-[11px] text-red-400 mt-1 block">{errors.nome}</span>}
                      </div>

                      {/* 2. E-mail */}
                      <div>
                        <input
                          type="email"
                          placeholder="Seu melhor e-mail *"
                          value={form.email}
                          onChange={e => setField("email", e.target.value)}
                          className={`w-full h-12 bg-[#1C1C22] border text-white placeholder-white/40 px-4 rounded-xl text-[14px] outline-none focus:border-[#FFD400] transition-colors ${
                            errors.email ? "border-red-500 bg-red-500/10" : "border-white/10"
                          }`}
                        />
                        {errors.email && <span className="text-[11px] text-red-400 mt-1 block">{errors.email}</span>}
                      </div>

                      {/* 3. Telefone / WhatsApp */}
                      <div>
                        <input
                          type="tel"
                          placeholder="🇧🇷 Telefone / WhatsApp *"
                          value={form.whatsapp}
                          onChange={e => setField("whatsapp", fmtPhone(e.target.value))}
                          className={`w-full h-12 bg-[#1C1C22] border text-white placeholder-white/40 px-4 rounded-xl text-[14px] outline-none focus:border-[#FFD400] transition-colors ${
                            errors.whatsapp ? "border-red-500 bg-red-500/10" : "border-white/10"
                          }`}
                        />
                        {errors.whatsapp && <span className="text-[11px] text-red-400 mt-1 block">{errors.whatsapp}</span>}
                      </div>

                      {/* 4. Nome da clínica */}
                      <div>
                        <input
                          type="text"
                          placeholder="Nome da clínica ou consultório *"
                          value={form.clinica}
                          onChange={e => setField("clinica", e.target.value)}
                          className={`w-full h-12 bg-[#1C1C22] border text-white placeholder-white/40 px-4 rounded-xl text-[14px] outline-none focus:border-[#FFD400] transition-colors ${
                            errors.clinica ? "border-red-500 bg-red-500/10" : "border-white/10"
                          }`}
                        />
                        {errors.clinica && <span className="text-[11px] text-red-400 mt-1 block">{errors.clinica}</span>}
                      </div>

                      {/* 5. Selecionar segmento */}
                      <div>
                        <label className="block text-[12px] font-bold text-white/70 mb-1">Selecionar segmento *</label>
                        <select
                          value={form.segmento}
                          onChange={e => setField("segmento", e.target.value)}
                          className={`w-full h-12 bg-[#1C1C22] border text-white px-4 rounded-xl text-[14px] outline-none focus:border-[#FFD400] transition-colors cursor-pointer ${
                            errors.segmento ? "border-red-500 bg-red-500/10" : "border-white/10"
                          }`}
                        >
                          <option value="" className="bg-[#1C1C22]">Selecione o segmento...</option>
                          {SEGMENTS.map(s => (
                            <option key={s} value={s} className="bg-[#1C1C22]">{s}</option>
                          ))}
                        </select>
                        {errors.segmento && <span className="text-[11px] text-red-400 mt-1 block">{errors.segmento}</span>}
                      </div>

                      {/* 6. Coloque seu faturamento atual */}
                      <div>
                        <label className="block text-[12px] font-bold text-white/70 mb-1">Coloque seu faturamento atual *</label>
                        <select
                          value={form.faturamento}
                          onChange={e => setField("faturamento", e.target.value)}
                          className={`w-full h-12 bg-[#1C1C22] border text-white px-4 rounded-xl text-[14px] outline-none focus:border-[#FFD400] transition-colors cursor-pointer ${
                            errors.faturamento ? "border-red-500 bg-red-500/10" : "border-white/10"
                          }`}
                        >
                          <option value="" className="bg-[#1C1C22]">Selecione...</option>
                          {REVENUE_TIERS.map(t => (
                            <option key={t.value} value={t.value} className="bg-[#1C1C22]">{t.label}</option>
                          ))}
                        </select>
                        {errors.faturamento && <span className="text-[11px] text-red-400 mt-1 block">{errors.faturamento}</span>}
                      </div>

                      {/* 7. CONDITIONAL FIELDS: Only for "Até R$ 10k" and "R$ 10k a R$ 30k" */}
                      {showConditionalFields && (
                        <div className="space-y-3.5 pt-3 border-t border-white/10 bg-white/5 p-4 rounded-xl">
                          <p className="text-[11px] font-extrabold text-[#FFD400] uppercase tracking-wider flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
                            Perguntas Complementares
                          </p>

                          <div>
                            <label className="block text-[12px] font-bold text-white/80 mb-1">Possui CNPJ ativo? *</label>
                            <select
                              value={form.cnpj}
                              onChange={e => setField("cnpj", e.target.value)}
                              className={`w-full h-11 bg-[#1C1C22] border text-white px-3 rounded-lg text-[13px] outline-none focus:border-[#FFD400] ${
                                errors.cnpj ? "border-red-500" : "border-white/10"
                              }`}
                            >
                              <option value="">Selecione...</option>
                              <option value="sim">Sim, possuo CNPJ ativo</option>
                              <option value="nao">Não, atuo como Pessoa Física (CPF)</option>
                            </select>
                            {errors.cnpj && <span className="text-[11px] text-red-400 mt-1 block">{errors.cnpj}</span>}
                          </div>

                          <div>
                            <label className="block text-[12px] font-bold text-white/80 mb-1">Pretensão de investimento mensal no marketing *</label>
                            <select
                              value={form.investimento}
                              onChange={e => setField("investimento", e.target.value)}
                              className={`w-full h-11 bg-[#1C1C22] border text-white px-3 rounded-lg text-[13px] outline-none focus:border-[#FFD400] ${
                                errors.investimento ? "border-red-500" : "border-white/10"
                              }`}
                            >
                              <option value="">Selecione...</option>
                              <option value="ate-1500">Até R$ 1.500 / mês</option>
                              <option value="1500-3000">De R$ 1.500 a R$ 3.000 / mês</option>
                              <option value="acima-3000">Acima de R$ 3.000 / mês</option>
                            </select>
                            {errors.investimento && <span className="text-[11px] text-red-400 mt-1 block">{errors.investimento}</span>}
                          </div>
                        </div>
                      )}

                      {/* LGPD Checkbox */}
                      <div className="pt-2">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.lgpd}
                            onChange={e => setField("lgpd", e.target.checked)}
                            className="mt-1 w-4 h-4 accent-[#00E676] rounded cursor-pointer"
                          />
                          <span className="text-[11px] text-white/60 leading-tight">
                            Concordo em fornecer meus dados para que a Ideal Solutions entre em contato comercial.
                          </span>
                        </label>
                        {errors.lgpd && <span className="text-[11px] text-red-400 mt-1 block">{errors.lgpd}</span>}
                      </div>

                      {/* SUBMIT BUTTON */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-[#00E676] hover:bg-[#00C853] text-[#0E0E11] font-black text-[15px] sm:text-[16px] rounded-xl transition-all shadow-[0_10px_30px_rgba(0,230,118,0.3)] active:scale-[0.99] flex items-center justify-center gap-2 mt-4 uppercase tracking-tight"
                      >
                        {loading ? "Enviando diagnóstico..." : "Quero vender mais investindo menos"}
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            02. DEPOIMENTOS / CASE STUDIES — OBSIDIAN DARK (#0E0E11)
        ════════════════════════════════════════════════════════════ */}
        <section id="depoimentos" className="py-20 sm:py-28 bg-[#0E0E11] text-white border-b border-white/10 relative">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-[#FFD400] font-black text-[12px] uppercase tracking-widest bg-[#FFD400]/10 px-4 py-1.5 rounded-full border border-[#FFD400]/30 inline-block">
                Prova Social & Depoimentos
              </span>
              <h2 className="text-[28px] sm:text-[42px] font-black leading-[1.15] tracking-tight">
                Resultados reais para dentistas e clínicas em todo o país
              </h2>
              <p className="text-[16px] text-white/60">
                Veja o impacto de uma presença digital posicionada com inteligência e elegância.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  doc: "Dra. Gisele Viana",
                  spec: "Cirurgiã-Dentista · Consultório & Reabilitação",
                  cidade: "São Paulo - SP",
                  dep: "A reformulação da nossa comunicação e da landing page permitiu que pacientes de alto valor entendessem a tecnologia que entregamos antes mesmo da primeira consulta presencial.",
                  rating: 5
                },
                {
                  doc: "Dr. Lucas Ferreira",
                  spec: "Implantodontista & Estética",
                  cidade: "Curitiba - PR",
                  dep: "Antes dependia quase 100% de indicação boca a boca. Com a estrutura criada pela Ideal Solutions, atrai pacientes prontos para fechar tratamentos de maior valor.",
                  rating: 5
                },
                {
                  doc: "Dra. Renata Souza",
                  spec: "Ortodontista & Alinhadores",
                  cidade: "Belo Horizonte - MG",
                  dep: "Equipes de marketing comuns não entendem a rotina de um consultório odontológico. A Ideal trouxe clareza, alinhamento visual impecável e leads realmente qualificados.",
                  rating: 5
                },
              ].map((t, i) => (
                <div key={i} className="bg-[#16161D] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#FFD400]/40 transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <div className="space-y-4">
                    <div className="flex gap-1 text-[#FFD400]">
                      {[...Array(t.rating)].map((_, r) => (
                        <Star key={r} className="w-4 h-4 fill-[#FFD400]" />
                      ))}
                    </div>
                    <p className="text-[14px] text-white/80 leading-relaxed italic">
                      "{t.dep}"
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/10 mt-6">
                    <h4 className="font-extrabold text-[16px] text-white">{t.doc}</h4>
                    <p className="text-[12px] text-[#FFD400] font-semibold">{t.spec}</p>
                    <p className="text-[11px] text-white/40">{t.cidade}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 text-center">
              <button
                type="button"
                onClick={() => scrollTo("#hero")}
                className="bg-[#FFD400] text-[#0E0E11] hover:brightness-105 font-extrabold px-8 py-4 rounded-full text-[15px] transition-all shadow-lg inline-flex items-center gap-2"
              >
                Quero mais informações
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            03. QUEM SOMOS / POSICIONAMENTO — PURE WHITE (#FFFFFF)
        ════════════════════════════════════════════════════════════ */}
        <section id="sobre" className="py-20 sm:py-28 bg-white text-[#0E0E11]">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="text-[#0E0E11] font-black text-[12px] uppercase tracking-widest bg-[#FFD400] px-4 py-1.5 rounded-full inline-block shadow-sm">
                  Quem Somos
                </span>
                <h2 className="text-[30px] sm:text-[44px] font-black leading-[1.12] tracking-tight text-[#0E0E11]">
                  Especialistas em posicionar consultórios odontológicos com autoridade.
                </h2>
                <p className="text-[16px] text-slate-700 leading-relaxed">
                  A Ideal Solutions nasceu para resolver uma dor crônica da odontologia: agências genéricas que gastam verba com posts que não geram consultas de alto valor.
                </p>
                <p className="text-[16px] text-slate-800 font-semibold leading-relaxed">
                  Nós entendemos a regulamentação odontológica, os tratamentos de alta margem e a jornada de decisão do paciente particular.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => scrollTo("#hero")}
                    className="bg-[#0E0E11] text-[#FFD400] hover:bg-[#1F1F24] font-black px-8 py-4 rounded-full text-[15px] transition-all shadow-md inline-flex items-center gap-2"
                  >
                    Quero mais informações
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Pillars Cards on White BG */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm hover:border-[#FFD400] hover:shadow-md transition-all">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FFD400] flex items-center justify-center text-black font-black flex-shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[18px] text-black">Atendimento Nacional</h3>
                      <p className="text-[14px] text-slate-600 mt-1">
                        Acompanhamento remoto e contínuo para dentistas e clínicas em todos os estados do Brasil.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm hover:border-[#FFD400] hover:shadow-md transition-all">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FFD400] flex items-center justify-center text-black font-black flex-shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[18px] text-black">Planos 100% Personalizados</h3>
                      <p className="text-[14px] text-slate-600 mt-1">
                        Sem pacotes Bronze, Silver ou Gold engessados. Criamos a solução exata que a sua clínica precisa hoje.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm hover:border-[#FFD400] hover:shadow-md transition-all">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FFD400] flex items-center justify-center text-black font-black flex-shrink-0">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[18px] text-black">Orientação Audiovisual para a Equipe</h3>
                      <p className="text-[14px] text-slate-600 mt-1">
                        Orientamos o que e como gravar no consultório, garantindo padrão profissional de roteiro e imagem.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            04. MÉSTATIC IDEAL METHOD — OBSIDIAN DARK (#0E0E11)
        ════════════════════════════════════════════════════════════ */}
        <section id="metodo" className="py-20 sm:py-28 bg-[#0E0E11] text-white border-t border-b border-white/10">
          <div className="max-w-[1040px] mx-auto px-5 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-[#FFD400] font-black text-[12px] uppercase tracking-widest bg-[#FFD400]/10 px-4 py-1.5 rounded-full border border-[#FFD400]/30 inline-block">
                O Método IDEAL
              </span>
              <h2 className="text-[30px] sm:text-[44px] font-black leading-[1.12]">
                Estrutura em 5 etapas para o crescimento da sua clínica
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { letter: "I", title: "Imersão", desc: "Diagnóstico profundo da clínica, localização e público-alvo." },
                { letter: "D", title: "Direção", desc: "Definição da estratégia de posicionamento e oferta de consultas." },
                { letter: "E", title: "Execução", desc: "Criação de landing page, peças visuais e campanhas ativas." },
                { letter: "A", title: "Acompanhamento", desc: "Gestão diária, orientação audiovisual e otimização dos leads." },
                { letter: "L", title: "Lapidação", desc: "Escala contínua do faturamento e refinamento da presença digital." },
              ].map((m, i) => (
                <div
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`border p-6 rounded-2xl text-center space-y-3 transition-all cursor-pointer ${
                    activeStep === i
                      ? "bg-[#181820] border-[#FFD400] shadow-[0_0_20px_rgba(255,212,0,0.2)] scale-[1.02]"
                      : "bg-[#141419] border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl font-black text-[22px] flex items-center justify-center mx-auto transition-colors ${
                    activeStep === i ? "bg-[#FFD400] text-[#0E0E11]" : "bg-white/10 text-white/60"
                  }`}>
                    {m.letter}
                  </div>
                  <h3 className="font-extrabold text-[16px] text-white">{m.title}</h3>
                  <p className="text-[12px] text-white/60 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 text-center">
              <button
                type="button"
                onClick={() => scrollTo("#hero")}
                className="bg-[#FFD400] text-[#0E0E11] hover:brightness-105 font-extrabold px-8 py-4 rounded-full text-[15px] transition-all shadow-lg inline-flex items-center gap-2"
              >
                Quero mais informações
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            05. ENTREGÁVEIS & SOLUÇÕES — PURE WHITE (#FFFFFF)
        ════════════════════════════════════════════════════════════ */}
        <section id="solucoes" className="py-20 sm:py-28 bg-white text-[#0E0E11]">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-[#0E0E11] font-black text-[12px] uppercase tracking-widest bg-[#FFD400] px-4 py-1.5 rounded-full inline-block shadow-sm">
                Soluções Integradas
              </span>
              <h2 className="text-[30px] sm:text-[44px] font-black leading-[1.12] text-[#0E0E11]">
                Sua clínica não precisa de um pacote genérico. Precisa da estrutura certa.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:border-[#FFD400] hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#0E0E11] text-[#FFD400] flex items-center justify-center mb-6">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-black text-black mb-3">GESTÃO DIGITAL</h3>
                <p className="text-[14px] text-slate-600 mb-6 leading-relaxed">
                  Planejamento e estratégia contínua da sua marca no digital com acompanhamento de metas.
                </p>
                <ul className="space-y-2.5 text-[13px] text-slate-700 font-medium">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FFD400]" /> Planejamento de comunicação</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FFD400]" /> Calendário editorial mensal</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FFD400]" /> Relatórios de métricas e conversão</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:border-[#FFD400] hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#0E0E11] text-[#FFD400] flex items-center justify-center mb-6">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-black text-black mb-3">INSTAGRAM & CONTEÚDO</h3>
                <p className="text-[14px] text-slate-600 mb-6 leading-relaxed">
                  Posicionamento de alta autoridade para transformar seguidores em agendamentos particulares.
                </p>
                <ul className="space-y-2.5 text-[13px] text-slate-700 font-medium">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FFD400]" /> Design de carrosséis e posts</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FFD400]" /> Roteiros para Reels e Stories</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FFD400]" /> Direção de gravação para a equipe</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:border-[#FFD400] hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#0E0E11] text-[#FFD400] flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-black text-black mb-3">LANDING PAGES</h3>
                <p className="text-[14px] text-slate-600 mb-6 leading-relaxed">
                  Páginas de altíssima conversão projetadas para tráfego pago e prospecção direta.
                </p>
                <ul className="space-y-2.5 text-[13px] text-slate-700 font-medium">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FFD400]" /> Redação e Copywriting focado em vendas</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FFD400]" /> Design responsivo de alta velocidade</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FFD400]" /> Integração rápida com CRM e WhatsApp</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => scrollTo("#hero")}
                className="bg-[#0E0E11] text-[#FFD400] hover:bg-[#1F1F24] font-black px-8 py-4 rounded-full text-[15px] transition-all shadow-md inline-flex items-center gap-2"
              >
                Quero mais informações
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            06. FAQ & FINAL CALL — OBSIDIAN DARK (#0E0E11)
        ════════════════════════════════════════════════════════════ */}
        <section id="faq" className="py-20 sm:py-28 bg-[#0E0E11] text-white border-t border-white/10">
          <div className="max-w-[900px] mx-auto px-5 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-[#FFD400] font-black text-[12px] uppercase tracking-widest bg-[#FFD400]/10 px-4 py-1.5 rounded-full border border-[#FFD400]/30 inline-block">
                Perguntas Frequentes
              </span>
              <h2 className="text-[30px] sm:text-[44px] font-black leading-[1.12]">
                Tire todas as suas dúvidas
              </h2>
            </div>

            <div className="space-y-3 mb-16">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="bg-[#16161D] border border-white/10 rounded-xl overflow-hidden transition-all">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-[15px] text-white hover:text-[#FFD400] transition-colors"
                  >
                    <span>{item.q}</span>
                    {openFaq === i ? <Minus className="w-5 h-5 text-[#FFD400] flex-shrink-0" /> : <Plus className="w-5 h-5 text-white/50 flex-shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-[14px] text-white/70 leading-relaxed border-t border-white/5 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Final Banner Box */}
            <div className="bg-gradient-to-br from-[#1C1C24] via-[#16161D] to-[#0E0E11] border border-[#FFD400]/30 rounded-3xl p-8 sm:p-14 text-center space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#FFD400]/10 rounded-full blur-3xl pointer-events-none" />
              <h3 className="text-[26px] sm:text-[38px] font-black leading-[1.15] text-white max-w-xl mx-auto tracking-tight">
                Pronto para transformar o marketing da sua clínica?
              </h3>
              <p className="text-white/60 text-[15px] max-w-lg mx-auto">
                Preencha o diagnóstico inicial e receba um atendimento consultivo em até 1 dia útil.
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => scrollTo("#hero")}
                  className="bg-[#FFD400] text-[#0E0E11] hover:brightness-105 font-black px-9 py-4 rounded-full text-[16px] transition-all shadow-[0_10px_30px_rgba(255,212,0,0.3)] inline-flex items-center gap-2"
                >
                  Quero mais informações
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* ════════════════════════════════════════════════════════════
          FOOTER — DEEP CHARCOAL (#08080A)
      ════════════════════════════════════════════════════════════ */}
      <footer className="py-10 bg-[#08080A] border-t border-white/10 text-white/40 text-[13px]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/ideal-logo.png" alt="Ideal Solutions" className="h-8 w-auto object-contain opacity-90" onError={e => e.currentTarget.style.display = 'none'} />
            <span className="font-extrabold text-white text-[15px]">Ideal Solutions</span>
          </div>
          <p>© {new Date().getFullYear()} Ideal Solutions. Todos os direitos reservados. Presença Digital para Odontologia.</p>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-[#0E0E11]/95 backdrop-blur-md border-t border-white/10 z-40">
        <button
          type="button"
          onClick={() => scrollTo("#hero")}
          className="w-full bg-[#FFD400] text-[#0E0E11] font-black py-3.5 rounded-xl text-[15px] flex items-center justify-center gap-2 shadow-lg"
        >
          Quero mais informações
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
