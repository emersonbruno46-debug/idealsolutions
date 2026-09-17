import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Menu, X, ChevronDown, Plus, Minus,
  CheckCircle2, Loader2, AlertCircle, Play, ChevronLeft, ChevronRight,
  Instagram, Smartphone, Globe, Layers
} from "lucide-react";

/* ─── Helpers ─── */
function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ─── Phone formatter ─── */
function fmtPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/* ─── CTA BUTTON ─── */
function CTA({ children, onClick, dark = false, full = false, className = "" }: {
  children: React.ReactNode; onClick?: () => void; dark?: boolean; full?: boolean; className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-3 h-[52px] px-8 text-[15px] font-bold rounded-full transition-all duration-150 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FFD400] ${
        dark
          ? "bg-[#111111] text-[#FFD400] hover:bg-[#1e1e1e] focus-visible:ring-offset-[#111111]"
          : "bg-[#FFD400] text-[#111111] hover:brightness-95 shadow-[0_4px_20px_rgba(255,212,0,0.3)]"
      } ${full ? "w-full sm:w-auto" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

/* ─── REVENUE TIERS (sem preço exibido) ─── */
const REVENUE_TIERS = [
  { label: "Até R$ 10 mil/mês", value: "ate-10k" },
  { label: "R$ 10k a R$ 30 mil/mês", value: "10k-30k" },
  { label: "R$ 30k a R$ 60 mil/mês", value: "30k-60k" },
  { label: "R$ 60k a R$ 100 mil/mês", value: "60k-100k" },
  { label: "Acima de R$ 100 mil/mês", value: "acima-100k" },
];

const INTEREST_OPTIONS = [
  "Gestão de Instagram",
  "Conteúdo",
  "Landing Page",
  "Presença digital completa",
  "Ainda não sei",
];

const STATES = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

/* ─── FAQ DATA ─── */
const FAQ = [
  { q: "Vocês atendem todo o Brasil?", a: "Sim. Nosso atendimento é remoto para consultórios e clínicas em qualquer cidade ou estado do Brasil." },
  { q: "Vocês atendem dentistas individuais e clínicas?", a: "Sim. Atendemos profissionais autônomos que querem consolidar autoridade e atrair pacientes particulares, e também clínicas com múltiplos consultórios." },
  { q: "Preciso contratar todos os serviços?", a: "Não. Cada clínica tem uma prioridade. Você pode contratar apenas a landing page, a gestão do Instagram ou a estrutura integrada completa." },
  { q: "Por que não há preços na página?", a: "Porque não acreditamos em pacotes genéricos. A proposta é construída sob medida para a realidade e o momento da sua clínica, apresentada após o diagnóstico inicial." },
  { q: "Como funcionam fotos e vídeos?", a: "A clínica fornece a matéria-prima audiovisual. A Ideal orienta o que produzir e como produzir — roteiro, enquadramento e padrão visual." },
  { q: "O que acontece depois que envio o formulário?", a: "Nossa equipe analisa o seu diagnóstico, entra em contato em até 1 dia útil, conduz uma call comercial e apresenta uma proposta personalizada." },
  { q: "Existe fidelidade mínima?", a: "Serviços recorrentes normalmente têm período mínimo de 3 meses. Projetos pontuais têm formatos próprios." },
];

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export default function DentistLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTesti, setActiveTesti] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [utms, setUtms] = useState<Record<string, string>>({});

  // Form state
  const [form, setForm] = useState({
    nome: "", clinica: "", whatsapp: "", cidade: "", estado: "",
    instagram: "", interesse: "", faturamento: "", lgpd: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitErr, setSubmitErr] = useState("");

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

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => setActiveTesti(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
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
    if (!form.nome.trim()) e.nome = "Informe seu nome.";
    if (!form.clinica.trim()) e.clinica = "Informe o nome da clínica.";
    if (form.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "WhatsApp inválido.";
    if (!form.cidade.trim()) e.cidade = "Informe sua cidade.";
    if (!form.estado) e.estado = "Selecione o estado.";
    if (!form.interesse) e.interesse = "Selecione o que procura.";
    if (!form.faturamento) e.faturamento = "Selecione o faturamento.";
    if (!form.lgpd) e.lgpd = "Aceite os termos para prosseguir.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitErr("");
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      const first = document.getElementById(Object.keys(errs)[0]);
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form, ...utms, timestamp: new Date().toISOString() };
      console.log("[Lead Ideal Solutions]:", payload);
      await new Promise(r => setTimeout(r, 1400));
      setSuccess(true);
    } catch {
      setSubmitErr("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  /* ─── NAV LINKS ─── */
  const navLinks = [
    { label: "Soluções", href: "#solucoes" },
    { label: "Quem somos", href: "#sobre" },
    { label: "Método", href: "#metodo" },
    { label: "Dúvidas", href: "#faq" },
  ];

  /* ─── RENDER ─── */
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FFD400]/30 font-[Plus_Jakarta_Sans,sans-serif] overflow-x-hidden">

      {/* ═══════════════════════════════════════
          HEADER / NAV
      ═══════════════════════════════════════ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/10" : "bg-transparent"
      }`}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
          <a
            href="#inicio"
            onClick={e => { e.preventDefault(); scrollTo("#inicio"); }}
            className="flex items-center gap-3"
          >
            <img src="/ideal-logo.png" alt="Ideal Solutions" className="h-8 w-auto object-contain"
              onError={e => {
                const t = e.currentTarget;
                t.style.display = "none";
                const sib = t.nextSibling as HTMLElement;
                if (sib) sib.style.display = "block";
              }}
            />
            <span className="hidden text-[17px] font-bold tracking-tight">Ideal Solutions</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href}
                onClick={e => { e.preventDefault(); scrollTo(l.href); }}
                className="text-[14px] font-medium text-white/60 hover:text-white transition-colors"
              >{l.label}</a>
            ))}
          </nav>

          <div className="hidden md:block">
            <CTA dark onClick={() => scrollTo("#diagnostico")}>
              Quero mais informações
              <ArrowRight className="w-4 h-4" />
            </CTA>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0A]/98 flex flex-col justify-center px-8">
          <nav className="flex flex-col gap-6">
            {navLinks.map(l => (
              <a key={l.href} href={l.href}
                onClick={e => { e.preventDefault(); scrollTo(l.href); setMenuOpen(false); }}
                className="text-[28px] font-bold text-white/80 hover:text-[#FFD400] transition-colors"
              >{l.label}</a>
            ))}
            <div className="pt-4">
              <CTA onClick={() => { scrollTo("#diagnostico"); setMenuOpen(false); }} className="w-full">
                Quero mais informações
                <ArrowRight className="w-4 h-4" />
              </CTA>
            </div>
          </nav>
        </div>
      )}

      <main>

        {/* ═══════════════════════════════════════
            01. HERO — HEAD / HEADLINE
        ═══════════════════════════════════════ */}
        <section id="inicio" className="relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#FFD400]/6 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FFD400]/3 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 relative z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFD400]/30 bg-[#FFD400]/10 text-[#FFD400] text-[12px] font-bold uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
              Presença digital para odontologia
            </div>

            {/* H1 */}
            <h1 className="text-[36px] sm:text-[52px] lg:text-[68px] font-black leading-[1.05] tracking-[-0.03em] max-w-[900px] mb-8">
              Sua clínica tem valor.{" "}
              <span className="text-[#FFD400] drop-shadow-[0_0_40px_rgba(255,212,0,0.25)]">
                Agora ela precisa de uma presença digital à altura.
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-[18px] sm:text-[21px] text-white/60 font-medium leading-[1.55] max-w-[680px] mb-12">
              Estratégia, conteúdo e páginas de conversão para dentistas e clínicas que não aceitam ser invisíveis online.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14">
              <CTA onClick={() => scrollTo("#diagnostico")}>
                Quero mais informações
                <ArrowRight className="w-4 h-4" />
              </CTA>
              <button
                type="button"
                onClick={() => scrollTo("#metodo")}
                className="inline-flex items-center gap-2 h-[52px] px-6 rounded-full border border-white/20 text-white/70 text-[15px] font-semibold hover:border-white/40 hover:text-white transition-all"
              >
                Ver o Método IDEAL
              </button>
            </div>

            {/* Provas */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-8 border-t border-white/10 text-[13px] text-white/40 font-medium">
              <span><strong className="text-white font-bold">+100</strong> clientes atendidos</span>
              <span className="hidden sm:block w-px h-4 bg-white/15" />
              <span>Atendimento em todo o <strong className="text-white font-bold">Brasil</strong></span>
              <span className="hidden sm:block w-px h-4 bg-white/15" />
              <span>Planos <strong className="text-white font-bold">personalizados</strong>, sem pacotes genéricos</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            02. FORMULÁRIO
        ═══════════════════════════════════════ */}
        <section id="diagnostico" className="py-20 md:py-28 bg-[#111111] border-t border-b border-white/10">
          <div className="max-w-[900px] mx-auto px-5 sm:px-8">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFD400]/30 bg-[#FFD400]/10 text-[#FFD400] text-[12px] font-bold uppercase tracking-widest mb-6">
                Fale com um especialista
              </div>
              <h2 className="text-[30px] sm:text-[44px] font-black leading-[1.1] tracking-[-0.03em] mb-4">
                Diagnóstico gratuito para sua clínica
              </h2>
              <p className="text-[16px] text-white/50 max-w-xl mx-auto">
                Preencha os campos abaixo. Nossa equipe entra em contato em até <strong className="text-white">1 dia útil</strong>.
              </p>
            </div>

            {success ? (
              <div className="text-center py-16 space-y-5">
                <div className="w-20 h-20 rounded-full bg-[#FFD400]/20 border border-[#FFD400]/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9 text-[#FFD400]" />
                </div>
                <h3 className="text-[26px] font-black">Diagnóstico enviado!</h3>
                <p className="text-white/50 max-w-md mx-auto text-[16px] leading-relaxed">
                  Recebemos os dados da sua clínica. Nossa equipe analisa e entra em contato em até <strong className="text-white">1 dia útil</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => { setSuccess(false); setForm({ nome:"",clinica:"",whatsapp:"",cidade:"",estado:"",instagram:"",interesse:"",faturamento:"",lgpd:false }); }}
                  className="text-[13px] text-white/40 hover:text-white underline underline-offset-4 mt-4 block mx-auto"
                >
                  Enviar outro diagnóstico
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Row 1: Nome + Clínica */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField id="nome" label="Seu Nome" required error={errors.nome}>
                    <input id="nome" type="text" placeholder="Dr. Roberto Mendes"
                      value={form.nome} onChange={e => setField("nome", e.target.value)}
                      className={fieldClass(!!errors.nome)} />
                  </FormField>
                  <FormField id="clinica" label="Clínica ou consultório" required error={errors.clinica}>
                    <input id="clinica" type="text" placeholder="Mendes Odontologia"
                      value={form.clinica} onChange={e => setField("clinica", e.target.value)}
                      className={fieldClass(!!errors.clinica)} />
                  </FormField>
                </div>

                {/* Row 2: WhatsApp + Instagram */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField id="whatsapp" label="WhatsApp (com DDD)" required error={errors.whatsapp}>
                    <input id="whatsapp" type="tel" placeholder="(11) 98765-4321"
                      value={form.whatsapp} onChange={e => setField("whatsapp", fmtPhone(e.target.value))}
                      className={fieldClass(!!errors.whatsapp)} />
                  </FormField>
                  <FormField id="instagram" label="Instagram ou site">
                    <input id="instagram" type="text" placeholder="@suaclinica ou www.site.com.br"
                      value={form.instagram} onChange={e => setField("instagram", e.target.value)}
                      className={fieldClass(false)} />
                  </FormField>
                </div>

                {/* Row 3: Cidade + Estado */}
                <div className="grid sm:grid-cols-3 gap-5">
                  <div className="sm:col-span-2">
                    <FormField id="cidade" label="Cidade" required error={errors.cidade}>
                      <input id="cidade" type="text" placeholder="São Paulo"
                        value={form.cidade} onChange={e => setField("cidade", e.target.value)}
                        className={fieldClass(!!errors.cidade)} />
                    </FormField>
                  </div>
                  <FormField id="estado" label="Estado" required error={errors.estado}>
                    <select id="estado" value={form.estado} onChange={e => setField("estado", e.target.value)}
                      className={fieldClass(!!errors.estado) + " cursor-pointer"}>
                      <option value="">UF</option>
                      {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </FormField>
                </div>

                {/* O que procura */}
                <div className="space-y-3">
                  <label className="block text-[13px] font-semibold text-white/80">
                    O que você procura? <span className="text-[#FFD400]">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {INTEREST_OPTIONS.map(opt => (
                      <button key={opt} type="button" onClick={() => setField("interesse", opt)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-[13px] font-medium text-left transition-all ${
                          form.interesse === opt
                            ? "border-[#FFD400] bg-[#FFD400]/10 text-[#FFD400]"
                            : "border-white/10 bg-white/5 text-white/60 hover:border-white/25"
                        }`}>
                        <span className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${
                          form.interesse === opt ? "border-[#FFD400]" : "border-white/30"
                        }`}>
                          {form.interesse === opt && <span className="w-2 h-2 rounded-full bg-[#FFD400]" />}
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.interesse && <p className="text-[12px] text-red-400">{errors.interesse}</p>}
                </div>

                {/* Faturamento — campo filtro */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <label className="block text-[13px] font-semibold text-white/80">
                    Faixa de faturamento mensal da clínica <span className="text-[#FFD400]">*</span>
                  </label>
                  <p className="text-[12px] text-white/40">Essa informação ajuda a construir uma proposta adequada ao seu momento.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {REVENUE_TIERS.map(t => (
                      <button key={t.value} type="button" onClick={() => setField("faturamento", t.value)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-[13px] font-medium text-left transition-all ${
                          form.faturamento === t.value
                            ? "border-[#FFD400] bg-[#FFD400]/10 text-[#FFD400]"
                            : "border-white/10 bg-white/5 text-white/60 hover:border-white/25"
                        }`}>
                        <span className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${
                          form.faturamento === t.value ? "border-[#FFD400]" : "border-white/30"
                        }`}>
                          {form.faturamento === t.value && <span className="w-2 h-2 rounded-full bg-[#FFD400]" />}
                        </span>
                        {t.label}
                      </button>
                    ))}
                  </div>
                  {errors.faturamento && <p className="text-[12px] text-red-400">{errors.faturamento}</p>}
                </div>

                {/* LGPD */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" checked={form.lgpd}
                      onChange={e => setField("lgpd", e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded accent-[#FFD400] cursor-pointer" />
                    <span className="text-[12px] text-white/40 leading-relaxed group-hover:text-white/60 transition-colors select-none">
                      Concordo em fornecer meus dados para que a Ideal Solutions entre em contato comercial, em conformidade com a LGPD.
                    </span>
                  </label>
                  {errors.lgpd && <p className="text-[12px] text-red-400 mt-1.5">{errors.lgpd}</p>}
                </div>

                {/* Submit error */}
                {submitErr && (
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-[13px]">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {submitErr}
                  </div>
                )}

                {/* CTA */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-3 h-[54px] px-10 rounded-full bg-[#FFD400] text-[#111111] text-[15px] font-black hover:brightness-95 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_24px_rgba(255,212,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />Enviando...</>
                    ) : (
                      <>Quero mais informações<ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                  <p className="text-[13px] text-white/30">
                    Retorno em até <strong className="text-white/50">1 dia útil</strong>.
                  </p>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════
            03. DEPOIMENTOS
        ═══════════════════════════════════════ */}
        <section id="depoimentos" className="py-20 md:py-28 bg-[#0A0A0A] border-b border-white/10">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFD400]/30 bg-[#FFD400]/10 text-[#FFD400] text-[12px] font-bold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
                Prova social
              </div>
              <h2 className="text-[30px] sm:text-[44px] font-black leading-[1.1] tracking-[-0.03em]">
                O que dizem os nossos clientes.
              </h2>
            </div>

            {/* Carrossel */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t, i) => (
                  <div
                    key={i}
                    className={`p-1.5 rounded-3xl transition-all duration-500 ${
                      activeTesti === i
                        ? "bg-gradient-to-br from-[#FFD400]/30 to-[#FFD400]/5"
                        : "bg-white/5"
                    }`}
                  >
                    <div className="h-full rounded-[calc(1.5rem-6px)] bg-[#111111] p-7 flex flex-col justify-between min-h-[260px]">
                      {/* Player placeholder */}
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/10 flex items-center justify-center group mb-5">
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />
                        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:18px_18px]" />
                        <div className="relative z-10 w-12 h-12 rounded-full bg-[#FFD400] flex items-center justify-center shadow-[0_4px_16px_rgba(255,212,0,0.4)]">
                          <Play className="w-5 h-5 fill-[#111111] ml-0.5" />
                        </div>
                        <div className="absolute bottom-3 left-3 text-[11px] text-white/60 font-medium bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                          Depoimento em vídeo
                        </div>
                      </div>
                      <div>
                        <p className="text-[14px] text-white/70 leading-relaxed italic mb-4">"{t.text}"</p>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#FFD400]/20 border border-[#FFD400]/30 flex items-center justify-center text-[#FFD400] font-black text-[13px]">
                            {t.name[0]}
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-white">{t.name}</p>
                            <p className="text-[11px] text-white/40">{t.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots */}
              <div className="flex gap-2 justify-center mt-8">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} type="button" onClick={() => setActiveTesti(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      activeTesti === i ? "w-8 bg-[#FFD400]" : "w-2 bg-white/20"
                    }`}
                    aria-label={`Depoimento ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-14 text-center">
              <CTA dark onClick={() => scrollTo("#diagnostico")}>
                Quero mais informações
                <ArrowRight className="w-4 h-4" />
              </CTA>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            04. QUEM SOMOS
        ═══════════════════════════════════════ */}
        <section id="sobre" className="py-20 md:py-28 bg-[#111111] border-b border-white/10">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              {/* Texto */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFD400]/30 bg-[#FFD400]/10 text-[#FFD400] text-[12px] font-bold uppercase tracking-widest mb-8">
                  Ideal Solutions
                </div>
                <h2 className="text-[30px] sm:text-[44px] font-black leading-[1.1] tracking-[-0.03em] mb-6">
                  Estratégia, design e presença digital trabalhando como{" "}
                  <span className="text-[#FFD400]">uma só estrutura.</span>
                </h2>
                <div className="space-y-4 text-[16px] text-white/60 leading-[1.7]">
                  <p>
                    A Ideal Solutions nasceu em 2024 para ajudar negócios a construírem uma presença digital compatível com a qualidade do que entregam fora da internet.
                  </p>
                  <p>
                    Mais de 100 clientes já passaram pela Ideal em projetos de comunicação, posicionamento, conteúdo e experiências digitais.
                  </p>
                  <p className="text-white/80 font-medium">
                    Agora, essa experiência é aplicada de forma direcionada ao mercado odontológico.
                  </p>
                </div>
              </div>

              {/* Indicadores */}
              <div className="grid grid-cols-1 divide-y divide-white/10 border border-white/10 rounded-3xl overflow-hidden">
                {[
                  { n: "2024", l: "Fundação da Ideal" },
                  { n: "+100", l: "Clientes atendidos" },
                  { n: "Brasil", l: "Atendimento nacional" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-8 py-7">
                    <div>
                      <span className="text-[44px] sm:text-[52px] font-black text-white leading-none tracking-tight block">
                        {item.n}
                      </span>
                      <span className="text-[14px] text-white/40 font-medium mt-1 block">{item.l}</span>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-[#FFD400]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            05. MÉTODO
        ═══════════════════════════════════════ */}
        <section id="metodo" className="py-20 md:py-28 bg-[#0A0A0A] border-b border-white/10">
          <div className="max-w-[1040px] mx-auto px-5 sm:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFD400]/30 bg-[#FFD400]/10 text-[#FFD400] text-[12px] font-bold uppercase tracking-widest mb-6">
                Método IDEAL
              </div>
              <h2 className="text-[30px] sm:text-[44px] font-black leading-[1.1] tracking-[-0.03em] mb-4">
                Um processo claro.<br />Um plano feito para sua clínica.
              </h2>
              <p className="text-[16px] text-white/50 max-w-xl mx-auto">
                O Método IDEAL organiza o trabalho do primeiro diagnóstico aos ajustes contínuos.
              </p>
            </div>

            <div className="space-y-3 relative">
              {/* Linha vertical */}
              <div className="absolute left-6 top-8 bottom-8 w-px bg-white/10 hidden sm:block" />

              {METHOD_STEPS.map((step, i) => (
                <MethodStep key={i} step={step} />
              ))}
            </div>

            <div className="mt-14 text-center">
              <CTA onClick={() => scrollTo("#diagnostico")}>
                Quero mais informações
                <ArrowRight className="w-4 h-4" />
              </CTA>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            06. ENTREGÁVEIS / SOLUÇÕES
        ═══════════════════════════════════════ */}
        <section id="solucoes" className="py-20 md:py-28 bg-[#111111] border-b border-white/10">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="mb-16 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFD400]/30 bg-[#FFD400]/10 text-[#FFD400] text-[12px] font-bold uppercase tracking-widest mb-6">
                Soluções integradas
              </div>
              <h2 className="text-[30px] sm:text-[44px] font-black leading-[1.1] tracking-[-0.03em] mb-4">
                Sua clínica não precisa de um pacote pronto.{" "}
                <span className="text-[#FFD400]">Precisa da estrutura certa.</span>
              </h2>
              <p className="text-[17px] text-white/50 leading-relaxed">
                As propostas da Ideal são personalizadas. Uma clínica pode precisar de uma solução específica; outra, de uma estrutura integrada.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {PILLARS.map((p, i) => (
                <div key={i} className="border border-white/10 rounded-3xl p-8 hover:border-[#FFD400]/30 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-[#FFD400]/10 group-hover:border-[#FFD400]/30 transition-all">
                    <p.icon className="w-5 h-5 text-white/60 group-hover:text-[#FFD400] transition-colors" />
                  </div>
                  <h3 className="text-[18px] font-black text-white tracking-tight mb-2">{p.title}</h3>
                  <p className="text-[13px] text-white/40 leading-relaxed mb-6">{p.desc}</p>
                  <div className="space-y-2.5 pt-5 border-t border-white/10">
                    {p.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-2.5 text-[13px] text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400] flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Nota */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/3 mb-14">
              <p className="text-[14px] text-white/60 leading-relaxed max-w-xl">
                <strong className="text-white">A clínica fornece a matéria-prima audiovisual.</strong> A Ideal orienta a equipe sobre o que e como produzir.
              </p>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-[13px] font-semibold text-white/60 whitespace-nowrap">
                ✦ Sem Bronze, Silver ou Gold
              </span>
            </div>

            <div className="text-center">
              <CTA onClick={() => scrollTo("#diagnostico")}>
                Quero mais informações
                <ArrowRight className="w-4 h-4" />
              </CTA>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            07. FAQ
        ═══════════════════════════════════════ */}
        <section id="faq" className="py-20 md:py-28 bg-[#0A0A0A]">
          <div className="max-w-[900px] mx-auto px-5 sm:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFD400]/30 bg-[#FFD400]/10 text-[#FFD400] text-[12px] font-bold uppercase tracking-widest mb-6">
                Dúvidas frequentes
              </div>
              <h2 className="text-[30px] sm:text-[44px] font-black leading-[1.1] tracking-[-0.03em] mb-4">
                Perguntas comuns antes de começar.
              </h2>
              <p className="text-[16px] text-white/50">
                Transparência e clareza sobre como estruturamos a presença digital da sua clínica.
              </p>
            </div>

            <div className="space-y-2 mb-20">
              {FAQ.map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/10 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400] hover:bg-white/3 transition-colors"
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-[15px] font-bold text-white leading-snug">{item.q}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      openFaq === i ? "bg-[#FFD400] text-[#111111]" : "bg-white/10 text-white/60"
                    }`}>
                      {openFaq === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 text-[14px] text-white/50 leading-relaxed border-t border-white/10 pt-4">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Final */}
            <div className="border border-white/10 rounded-3xl p-10 sm:p-16 text-center bg-[#111111] relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FFD400]/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-[26px] sm:text-[38px] font-black leading-[1.15] tracking-[-0.03em] mb-4 max-w-xl mx-auto">
                  Sua clínica já entrega um bom trabalho.{" "}
                  <span className="text-[#FFD400]">Agora sua presença digital precisa acompanhar.</span>
                </h3>
                <p className="text-[15px] text-white/40 mb-10">
                  Atendimento nacional · Planos personalizados · Retorno em até 1 dia útil
                </p>
                <CTA onClick={() => scrollTo("#diagnostico")}>
                  Quero mais informações
                  <ArrowRight className="w-4 h-4" />
                </CTA>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="py-10 border-t border-white/10 bg-[#0A0A0A]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <img src="/ideal-logo.png" alt="Ideal Solutions" className="h-7 w-auto object-contain opacity-70"
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
          <p className="text-[12px] text-white/20 font-medium uppercase tracking-widest">
            © {new Date().getFullYear()} Ideal Solutions. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* ─── MOBILE STICKY CTA ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-[#0A0A0A]/90 backdrop-blur-md border-t border-white/10">
        <CTA onClick={() => scrollTo("#diagnostico")} className="w-full h-[52px] rounded-2xl">
          Quero mais informações
          <ArrowRight className="w-4 h-4" />
        </CTA>
      </div>

    </div>
  );
}

/* ─── HELPERS ─── */
function fieldClass(hasError: boolean) {
  return `w-full h-12 px-4 rounded-xl border text-[14px] text-white bg-white/5 transition-all outline-none focus:ring-2 focus:ring-[#FFD400] focus:border-[#FFD400] placeholder:text-white/20 ${
    hasError ? "border-red-500/50 bg-red-500/5" : "border-white/10 hover:border-white/20"
  }`;
}

function FormField({ id, label, required, error, children }: {
  id: string; label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[13px] font-semibold text-white/80">
        {label} {required && <span className="text-[#FFD400]">*</span>}
      </label>
      {children}
      {error && <p className="text-[12px] text-red-400">{error}</p>}
    </div>
  );
}

function MethodStep({ step }: { step: typeof METHOD_STEPS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`relative z-10 rounded-2xl border transition-all duration-200 cursor-pointer ${
        open ? "border-[#FFD400]/40 bg-[#FFD400]/5" : "border-white/10 bg-white/3 hover:border-white/20"
      }`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center gap-5 p-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-[20px] transition-all ${
          open ? "bg-[#FFD400] text-[#111111]" : "bg-white/10 text-white/50"
        }`}>
          {step.letter}
        </div>
        <div className="flex-1">
          <h3 className="text-[17px] font-bold text-white">
            {step.letter} — {step.name}
          </h3>
          {open && (
            <p className="text-[14px] text-white/50 leading-relaxed mt-2">{step.desc}</p>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-white/40 transition-transform flex-shrink-0 ${open ? "rotate-180 text-[#FFD400]" : ""}`} />
      </div>
    </div>
  );
}

/* ─── DATA ─── */
const TESTIMONIALS = [
  {
    name: "Dra. Gisele Viana",
    role: "Cirurgiã-Dentista · Consultório & Reabilitação",
    text: "A reformulação da nossa comunicação e landing page permitiu que pacientes de alto valor entendessem a tecnologia que entregamos no consultório antes mesmo da primeira consulta.",
  },
  {
    name: "Dr. Lucas Ferreira",
    role: "Implantodontista",
    text: "Antes dependia quase 100% de indicação. Depois da Ideal, pacientes chegam já entendendo meu trabalho e minha especialidade. A qualidade dos leads mudou completamente.",
  },
  {
    name: "Dra. Renata Souza",
    role: "Ortodontista",
    text: "Profissionais que sabem falar a língua da odontologia são raros. A Ideal entendeu o que eu queria transmitir e transformou isso numa presença digital que me representa de verdade.",
  },
];

const METHOD_STEPS = [
  { letter: "I", name: "Imersão no seu negócio", desc: "Entendemos sua clínica, seus serviços, seu público e sua presença digital atual." },
  { letter: "D", name: "Direção estratégica", desc: "Definimos prioridades, comunicação e soluções adequadas aos seus objetivos e momento." },
  { letter: "E", name: "Execução das soluções", desc: "Criamos os materiais e implementamos as entregas. Sua equipe recebe orientação para fotos e vídeos." },
  { letter: "A", name: "Acompanhamento próximo", desc: "Organizamos aprovações e acompanhamos entregas e indicadores do projeto de perto." },
  { letter: "L", name: "Lapidação contínua", desc: "Ajustamos a comunicação com base nos dados e no retorno da sua equipe." },
];

const PILLARS = [
  {
    icon: Layers,
    title: "GESTÃO DIGITAL",
    desc: "Organização, estratégia e acompanhamento contínuo da sua presença digital.",
    items: ["Planejamento", "Direção da comunicação", "Calendário editorial", "Gestão das entregas", "Relatórios"],
  },
  {
    icon: Instagram,
    title: "INSTAGRAM & CONTEÚDO",
    desc: "Posicionamento visual e autoridade técnica para transformar seguidores em pacientes.",
    items: ["Posts e carrosséis", "Peças gráficas", "Direção visual", "Planejamento editorial", "Orientação audiovisual"],
  },
  {
    icon: Globe,
    title: "LANDING PAGES",
    desc: "Páginas de alta conversão estruturadas para campanhas e captação de pacientes.",
    items: ["Estratégia e copy", "UX/UI", "Desenvolvimento", "Formulários", "Preparação para integrações"],
  },
];
