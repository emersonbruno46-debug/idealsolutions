import { useState, useEffect } from "react";
import {
  ArrowRight, Menu, X, ChevronDown, Plus, Minus,
  CheckCircle2, Check, Smartphone, Globe, Layers, ShieldCheck, Award, ChevronLeft, ChevronRight, Lock
} from "lucide-react";
import { ShaderBackground } from "@/components/ui/bue-drift";
import FeatureCarousel from "@/components/ui/feature-carousel";
import SolutionsSection from "@/components/odonto/SolutionsSection";

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

/* ─── CNPJ Formatter ─── */
function fmtCNPJ(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

/* ─── Revenue Tiers ─── */
const REVENUE_TIERS = [
  { label: "Até R$ 10 mil", value: "ate-10k" },
  { label: "R$ 10 mil a R$ 30 mil", value: "10k-30k" },
  { label: "R$ 30 mil a R$ 60 mil", value: "30k-60k" },
  { label: "R$ 60 mil a R$ 100 mil", value: "60k-100k" },
  { label: "Acima de R$ 100 mil", value: "acima-100k" },
];

/* ─── Segment Options (Ramificações da Odontologia) ─── */
const SEGMENTS = [
  "Clínica Odontológica Multi-especialidades",
  "Consultório Odontológico Individual",
  "Ortodontia & Alinhadores",
  "Implantodontia & Reabilitação",
  "Estética Dental & Lentes",
  "Harmonização Orofacial",
  "Outro segmento odontológico",
];

/* ─── FAQ Data ─── */
const FAQ_ITEMS = [
  {
    q: "Vocês atendem todo o Brasil?",
    a: "Sim. Nosso atendimento é 100% remoto e estruturado para consultórios e clínicas em qualquer cidade ou estado do Brasil."
  },
  {
    q: "Vocês atendem dentistas individuais e clínicas?",
    a: "Sim. Atendemos profissionais autônomos que querem consolidar autoridade e atrair pacientes particulares, e também clínicas com múltiplos consultórios."
  },
  {
    q: "Preciso contratar todos os serviços?",
    a: "Não. Cada clínica tem uma prioridade. Você pode contratar apenas a landing page, a gestão do Instagram ou a estrutura integrada completa."
  },
  {
    q: "Como é definido o investimento?",
    a: "A solução e o valor do investimento dependem do escopo e das necessidades específicas da sua clínica. Apresentamos uma proposta personalizada após analisar as informações iniciais."
  },
  {
    q: "Como funcionam fotos e vídeos?",
    a: "A clínica fornece a matéria-prima audiovisual. A Ideal orienta o que produzir e como produzir — fornecendo roteiros, enquadramentos e diretrizes visuais."
  },
  {
    q: "O que acontece depois que envio o formulário?",
    a: "Nossa equipe analisa as informações enviadas e entra em contato em até 1 dia útil para agendar uma reunião inicial e apresentar um plano adequado."
  },
  {
    q: "Existe fidelidade mínima?",
    a: "Serviços recorrentes de gestão normalmente possuem um período mínimo acordado em contrato. Projetos pontuais têm formatos próprios de entrega."
  }
];

/* ─── Testimonials Placeholders ─── */
const TESTIMONIALS = [
  {
    author: "Consultório Odontológico de Ortodontia",
    location: "São Paulo - SP",
    text: "Estruturação da presença digital focada na atração de pacientes para tratamentos alinhadores e consultas particulares.",
    type: "Projeto de Landing Page & Estratégia"
  },
  {
    author: "Clínica Integrada de Implantodontia",
    location: "Curitiba - PR",
    text: "Alinhamento da comunicação e materiais digitais para destacar os diferenciais do corpo clínico e facilitar contatos diretos.",
    type: "Gestão Digital & Conteúdo"
  },
  {
    author: "Consultório de Estética Dental",
    location: "Belo Horizonte - MG",
    text: "Padronização visual e criação de canal de captação de leads qualificados para procedimentos estéticos de maior complexidade.",
    type: "Presença Digital Completa"
  }
];

/* ─── Soluções Items ─── */
const SOLUCAO_ITEMS: GsapFlipCardItem[] = [
  {
    id: 1,
    title: "Gestão e Estratégia Digital",
    meta: "Estratégia & Acompanhamento",
    description: "Planejamento, acompanhamento e organização contínua da presença digital da sua clínica odontológica.",
    caption: "Estrutura estratégica completa: planejamento de comunicação, calendário editorial estruturado e acompanhamento próximo de indicadores.",
    image: "/solucoes/solucao-1-portrait.png",
    mobileImage: "/solucoes/solucao-1-landscape.png",
    alt: "Gestão e Estratégia Digital para Odontologia"
  },
  {
    id: 2,
    title: "Conteúdo para Instagram",
    meta: "Autoridade & Produção Visual",
    description: "Comunicação, planejamento de publicações e produção dos materiais visuais previstos no escopo contratado.",
    caption: "Design autoral de posts e carrosséis, roteiros estratégicos e orientação completa para gravação de Reels alinhados à sua marca.",
    image: "/solucoes/solucao-2-portrait.png",
    mobileImage: "/solucoes/solucao-2-landscape.png",
    alt: "Conteúdo para Instagram Odontológico"
  },
  {
    id: 3,
    title: "Landing Pages & Integrações",
    meta: "Alta Conversão & Captação",
    description: "Páginas pensadas para apresentar seus tratamentos, diferenciais clínicos e facilitar novos agendamentos diretos no WhatsApp.",
    caption: "Estrutura e redação focadas em clareza, design responsivo de carregamento ultra-rápido e conexão direta com WhatsApp e formulários.",
    image: "/solucoes/solucao-3-portrait.png",
    mobileImage: "/solucoes/solucao-3-landscape.png",
    alt: "Landing Pages e Integrações Odontológicas"
  }
];

export default function DentistLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeMetodo, setActiveMetodo] = useState<number | null>(0);
  const [formVisible, setFormVisible] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [utms, setUtms] = useState<Record<string, string>>({});

  // EXACT FORM STATE
  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    clinica: "",
    segmento: "",
    faturamento: "",
    cnpj: "",
    investimento: "",
    lgpd: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // IntersectionObserver for Mobile Sticky CTA visibility
  useEffect(() => {
    const formEl = document.getElementById("formulario");
    if (!formEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFormVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(formEl);
    return () => observer.disconnect();
  }, []);

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
    document.body.style.overflow = (menuOpen || privacyOpen) ? "hidden" : "";
  }, [menuOpen, privacyOpen]);

  const setField = (f: string, v: any) => {
    setForm(p => ({ ...p, [f]: v }));
    setErrors(p => { const c = { ...p }; delete c[f]; return c; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = "Informe seu nome";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "E-mail válido é obrigatório";
    if (form.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "Telefone / WhatsApp é obrigatório";
    if (!form.clinica.trim()) e.clinica = "Informe o nome da empresa / clínica";
    if (!form.segmento) e.segmento = "Selecione o segmento";
    if (!form.faturamento) e.faturamento = "Selecione o faturamento";
    if (!form.lgpd) e.lgpd = "Aceite os termos para prosseguir";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErrKey = Object.keys(errs)[0];
      const el = document.getElementById(`field-${firstErrKey}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        ...utms,
        timestamp: new Date().toISOString(),
      };
      console.log("[Lead Ideal Solutions]:", payload);
      await new Promise(r => setTimeout(r, 1000));
      setSuccess(true);
    } catch {
      alert("Houve um problema ao enviar. Por favor, tente novamente.");
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#FFD400] selection:text-black font-[Plus_Jakarta_Sans,sans-serif] overflow-x-hidden antialiased">

      {/* ════════════════════════════════════════════════════════════
          HEADER
      ════════════════════════════════════════════════════════════ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-250 ${
        scrolled
          ? "bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-800 shadow-xl py-3.5"
          : "bg-[#0F172A] py-4"
      }`}>
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 flex items-center justify-between">
          <a
            href="#hero"
            onClick={e => { e.preventDefault(); scrollTo("#hero"); }}
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400]"
          >
            <img
              src="/ideal-logo.png"
              alt="Ideal Solutions"
              className="h-8 sm:h-9 w-auto object-contain brightness-0 invert"
              onError={e => {
                const t = e.currentTarget;
                t.style.display = "none";
                const parent = t.parentElement;
                if (parent && !parent.querySelector(".logo-fallback")) {
                  const span = document.createElement("span");
                  span.className = "logo-fallback text-lg font-black tracking-tight text-white";
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
                className="text-[14px] font-semibold text-slate-300 hover:text-[#FFD400] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <button
              type="button"
              onClick={() => scrollTo("#formulario")}
              className="bg-[#FFD400] text-[#0F172A] hover:bg-[#FACC15] font-extrabold px-6 py-2.5 rounded-full text-[14px] transition-all shadow-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400]"
            >
              Quero atrair mais pacientes
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-slate-800 transition-colors"
            aria-label="Alternar Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0F172A]/98 flex flex-col justify-center px-8 pt-20">
          <nav className="flex flex-col gap-6">
            {navLinks.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={e => { e.preventDefault(); scrollTo(l.href); setMenuOpen(false); }}
                className="text-[24px] font-extrabold text-slate-100 hover:text-[#FFD400] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={() => { scrollTo("#formulario"); setMenuOpen(false); }}
                className="w-full bg-[#FFD400] text-[#0F172A] py-3.5 rounded-xl font-extrabold text-[15px]"
              >
                Quero atrair mais pacientes
              </button>
            </div>
          </nav>
        </div>
      )}

      <main>
        {/* ════════════════════════════════════════════════════════════
            01. HERO SECTION WITH SHADER DRIFT BACKGROUND & EQUAL HEIGHT FORM CARD (GLASSMORPHISM)
        ════════════════════════════════════════════════════════════ */}
        <section id="hero" className="relative bg-[#0F172A] text-white pt-28 pb-16 sm:pt-36 sm:pb-20 border-b border-slate-800 overflow-hidden">
          {/* Shader Drift WebGL Canvas Background */}
          <ShaderBackground className="absolute inset-0 opacity-40 pointer-events-none" />

          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start relative z-10">
              
              {/* Left Column: Headline, Subheadline & Value Props */}
              <div className="lg:col-span-6 space-y-6">
                <h1 className="text-[34px] sm:text-[48px] lg:text-[60px] font-black leading-[1.08] tracking-tight text-white">
                  Fazemos sua clínica atrair mais pacientes{" "}
                  <span className="text-[#FFD400] font-black underline decoration-[#FFD400]/40 underline-offset-4">
                    sem depender só de indicação.
                  </span>
                </h1>

                <p className="text-[16px] sm:text-[18px] lg:text-[19px] text-slate-300 font-medium leading-relaxed">
                  Estratégia, conteúdo e landing pages para transformar sua presença digital em mais autoridade, mais oportunidades e novos agendamentos.
                </p>

                {/* 3 Short Arguments */}
                <div className="space-y-3.5 pt-1">
                  <div className="flex items-center gap-3.5 text-[14.5px] sm:text-[15.5px] font-semibold text-slate-200">
                    <div className="w-6.5 h-6.5 rounded-full bg-[#FFD400]/20 border border-[#FFD400]/40 text-[#FFD400] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span>Foco em clínicas e consultórios odontológicos.</span>
                  </div>

                  <div className="flex items-center gap-3.5 text-[14.5px] sm:text-[15.5px] font-semibold text-slate-200">
                    <div className="w-6.5 h-6.5 rounded-full bg-[#FFD400]/20 border border-[#FFD400]/40 text-[#FFD400] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span>Estratégia, conteúdo e páginas de captação.</span>
                  </div>

                  <div className="flex items-center gap-3.5 text-[14.5px] sm:text-[15.5px] font-semibold text-slate-200">
                    <div className="w-6.5 h-6.5 rounded-full bg-[#FFD400]/20 border border-[#FFD400]/40 text-[#FFD400] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span>Atendimento em todo o Brasil.</span>
                  </div>
                </div>

                {/* Desktop Action Button */}
                <div className="pt-2 hidden lg:block">
                  <button
                    type="button"
                    onClick={() => scrollTo("#formulario")}
                    className="inline-flex items-center gap-2.5 bg-[#FFD400] text-[#0F172A] hover:bg-[#FACC15] font-extrabold px-8 py-3.5 rounded-xl text-[15px] transition-all shadow-lg active:scale-95 hover:shadow-[#FFD400]/20"
                  >
                    Quero atrair mais pacientes
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: FORM CARD (GLASSMORPHISM WITH NATURAL COMPACT SPACING) */}
              <div className="lg:col-span-6" id="formulario" style={{ scrollMarginTop: "100px" }}>
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/15 rounded-2xl p-6 sm:p-7 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FFD400]/10 rounded-full blur-2xl pointer-events-none" />

                  {success ? (
                    <div className="py-10 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/40 flex items-center justify-center mx-auto text-[#FFD400]">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-[22px] font-extrabold text-white">Informações Enviadas!</h3>
                      <p className="text-slate-300 text-[14px] max-w-sm mx-auto leading-relaxed">
                        Agradecemos o contato. Nossa equipe analisará os dados e entrará em contato em <strong className="text-white">até 1 dia útil</strong>.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSuccess(false);
                          setForm({ nome: "", email: "", whatsapp: "", clinica: "", segmento: "", faturamento: "", cnpj: "", investimento: "", lgpd: true });
                        }}
                        className="text-[13px] text-[#FFD400] underline font-bold pt-2 block mx-auto"
                      >
                        Preencher novamente
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                      <div className="border-b border-white/10 pb-3 mb-1">
                        <h3 className="text-[18px] font-extrabold text-white tracking-tight">
                          Conte um pouco sobre sua clínica.
                        </h3>
                        <p className="text-[13px] text-slate-300 mt-0.5">
                          Preencha as informações abaixo. Nossa equipe entrará em contato em <strong className="text-white">até 1 dia útil</strong>.
                        </p>
                      </div>

                      {/* 1. Nome */}
                      <div id="field-nome">
                        <label className="block text-[12px] font-bold text-slate-200 mb-1">
                          Seu nome <span className="text-[#FFD400]">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Seu nome completo"
                          value={form.nome}
                          onChange={e => setField("nome", e.target.value)}
                          className={`w-full h-11 bg-slate-950/80 backdrop-blur-md border text-white placeholder-slate-400 px-3.5 rounded-lg text-[13.5px] outline-none focus:border-[#FFD400] transition-colors ${
                            errors.nome ? "border-red-500" : "border-slate-700/80"
                          }`}
                        />
                        {errors.nome && <span className="text-[11px] text-red-400 mt-0.5 block">{errors.nome}</span>}
                      </div>

                      {/* 2. Seu melhor e-mail */}
                      <div id="field-email">
                        <label className="block text-[12px] font-bold text-slate-200 mb-1">
                          Seu melhor e-mail <span className="text-[#FFD400]">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="seu.email@exemplo.com.br"
                          value={form.email}
                          onChange={e => setField("email", e.target.value)}
                          className={`w-full h-11 bg-slate-950/80 backdrop-blur-md border text-white placeholder-slate-400 px-3.5 rounded-lg text-[13.5px] outline-none focus:border-[#FFD400] transition-colors ${
                            errors.email ? "border-red-500" : "border-slate-700/80"
                          }`}
                        />
                        {errors.email && <span className="text-[11px] text-red-400 mt-0.5 block">{errors.email}</span>}
                      </div>

                      {/* 3. Telefone */}
                      <div id="field-whatsapp">
                        <label className="block text-[12px] font-bold text-slate-200 mb-1">
                          Telefone / WhatsApp <span className="text-[#FFD400]">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="(11) 98765-4321"
                          value={form.whatsapp}
                          onChange={e => setField("whatsapp", fmtPhone(e.target.value))}
                          className={`w-full h-11 bg-slate-950/80 backdrop-blur-md border text-white placeholder-slate-400 px-3.5 rounded-lg text-[13.5px] outline-none focus:border-[#FFD400] transition-colors ${
                            errors.whatsapp ? "border-red-500" : "border-slate-700/80"
                          }`}
                        />
                        {errors.whatsapp && <span className="text-[11px] text-red-400 mt-0.5 block">{errors.whatsapp}</span>}
                      </div>

                      {/* 4. Nome da empresa */}
                      <div id="field-clinica">
                        <label className="block text-[12px] font-bold text-slate-200 mb-1">
                          Nome da empresa / clínica <span className="text-[#FFD400]">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Nome da sua clínica ou consultório"
                          value={form.clinica}
                          onChange={e => setField("clinica", e.target.value)}
                          className={`w-full h-11 bg-slate-950/80 backdrop-blur-md border text-white placeholder-slate-400 px-3.5 rounded-lg text-[13.5px] outline-none focus:border-[#FFD400] transition-colors ${
                            errors.clinica ? "border-red-500" : "border-slate-700/80"
                          }`}
                        />
                        {errors.clinica && <span className="text-[11px] text-red-400 mt-0.5 block">{errors.clinica}</span>}
                      </div>

                      {/* 5. Segmento */}
                      <div id="field-segmento">
                        <label className="block text-[12px] font-bold text-slate-200 mb-1">
                          Selecionar segmento <span className="text-[#FFD400]">*</span>
                        </label>
                        <select
                          value={form.segmento}
                          onChange={e => setField("segmento", e.target.value)}
                          className={`w-full h-11 bg-slate-950/80 backdrop-blur-md border text-white px-3.5 rounded-lg text-[13.5px] outline-none focus:border-[#FFD400] cursor-pointer ${
                            errors.segmento ? "border-red-500" : "border-slate-700/80"
                          }`}
                        >
                          <option value="" className="bg-slate-950">Selecione o segmento...</option>
                          {SEGMENTS.map(s => (
                            <option key={s} value={s} className="bg-slate-950">{s}</option>
                          ))}
                        </select>
                        {errors.segmento && <span className="text-[11px] text-red-400 mt-0.5 block">{errors.segmento}</span>}
                      </div>

                      {/* 6. Faturamento */}
                      <div id="field-faturamento">
                        <label className="block text-[12px] font-bold text-slate-200 mb-1">
                          Coloque seu faturamento atual <span className="text-[#FFD400]">*</span>
                        </label>
                        <select
                          value={form.faturamento}
                          onChange={e => setField("faturamento", e.target.value)}
                          className={`w-full h-11 bg-slate-950/80 backdrop-blur-md border text-white px-3.5 rounded-lg text-[13.5px] outline-none focus:border-[#FFD400] cursor-pointer ${
                            errors.faturamento ? "border-red-500" : "border-slate-700/80"
                          }`}
                        >
                          <option value="" className="bg-slate-950">Selecione...</option>
                          {REVENUE_TIERS.map(t => (
                            <option key={t.value} value={t.value} className="bg-slate-950">{t.label}</option>
                          ))}
                        </select>
                        {errors.faturamento && <span className="text-[11px] text-red-400 mt-0.5 block">{errors.faturamento}</span>}
                      </div>

                      {/* CAIXAS OPCIONAIS DE INVESTIMENTO E CNPJ (SOMENTE PARA FATURAMENTO ABAIXO DE 60K) */}
                      {form.faturamento && form.faturamento !== "60k-100k" && form.faturamento !== "acima-100k" && (
                        <div className="space-y-3.5 pt-3 border-t border-white/10 bg-slate-950/50 backdrop-blur-md p-3.5 rounded-lg animate-fadeIn">
                          <p className="text-[11px] font-bold text-[#FFD400] uppercase tracking-wider">
                            Informações Opcionais
                          </p>

                          {/* Investimento Opcional */}
                          <div>
                            <label className="block text-[12px] font-bold text-slate-200 mb-1">
                              Pretensão de investimento mensal <span className="text-slate-400 font-normal">(opcional)</span>
                            </label>
                            <select
                              value={form.investimento}
                              onChange={e => setField("investimento", e.target.value)}
                              className="w-full h-11 bg-slate-950/80 border border-slate-700/80 text-white px-3 rounded-lg text-[13.5px] outline-none focus:border-[#FFD400] cursor-pointer"
                            >
                              <option value="" className="bg-slate-950">Selecione a intenção de investimento...</option>
                              <option value="ate-1500" className="bg-slate-950">Até R$ 1.500 / mês</option>
                              <option value="1500-3000" className="bg-slate-950">De R$ 1.500 a R$ 3.000 / mês</option>
                              <option value="acima-3000" className="bg-slate-950">Acima de R$ 3.000 / mês</option>
                            </select>
                          </div>

                          {/* CNPJ Opcional */}
                          <div>
                            <label className="block text-[12px] font-bold text-slate-200 mb-1">
                              CNPJ <span className="text-slate-400 font-normal">(opcional)</span>
                            </label>
                            <input
                              type="text"
                              placeholder="00.000.000/0000-00"
                              value={form.cnpj}
                              onChange={e => setField("cnpj", fmtCNPJ(e.target.value))}
                              className="w-full h-11 bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-400 px-3.5 rounded-lg text-[13.5px] outline-none focus:border-[#FFD400] transition-colors"
                            />
                          </div>
                        </div>
                      )}

                      {/* Privacy & LGPD Checkbox */}
                      <div className="pt-1">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.lgpd}
                            onChange={e => setField("lgpd", e.target.checked)}
                            className="mt-0.5 w-4 h-4 accent-[#FFD400] rounded cursor-pointer flex-shrink-0"
                          />
                          <span className="text-[11px] text-slate-300 leading-tight">
                            Concordo em fornecer meus dados para que a Ideal Solutions entre em contato comercial, em conformidade com a LGPD.
                          </span>
                        </label>
                        {errors.lgpd && <span className="text-[11px] text-red-400 mt-0.5 block">{errors.lgpd}</span>}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-[#FFD400] hover:bg-[#FACC15] text-[#0F172A] font-extrabold text-[15px] rounded-lg transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
                      >
                        {loading ? "Enviando informações..." : "Quero atrair mais pacientes"}
                      </button>
                    </form>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            02. DEPOIMENTOS / PROVA SOCIAL
        ════════════════════════════════════════════════════════════ */}
        <section id="depoimentos" className="py-16 sm:py-24 bg-white text-[#0F172A] border-b border-slate-200">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-[#0F172A] font-extrabold text-[12px] uppercase tracking-widest bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200 inline-block">
                Projetos & Presença Digital
              </span>
              <h2 className="text-[26px] sm:text-[36px] font-black leading-[1.2] text-[#0F172A]">
                Estruturas desenvolvidas para clínicas odontológicas
              </h2>
              <p className="text-[15px] text-slate-600">
                Formatos personalizados de posicionamento digital e captação em diferentes regiões.
              </p>
            </div>

            {/* Testimonials Responsive Carousel */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 sm:p-10 shadow-sm min-h-[220px] flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 bg-slate-200/80 rounded text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    {TESTIMONIALS[activeTestimonial].type}
                  </div>
                  <p className="text-[16px] sm:text-[18px] text-slate-700 leading-relaxed font-medium">
                    "{TESTIMONIALS[activeTestimonial].text}"
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-200 mt-6 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-[15px] text-[#0F172A]">{TESTIMONIALS[activeTestimonial].author}</h4>
                    <p className="text-[12px] text-slate-500">{TESTIMONIALS[activeTestimonial].location}</p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTestimonial(p => (p === 0 ? TESTIMONIALS.length - 1 : p - 1))}
                      className="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                      aria-label="Anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex gap-1.5 px-2">
                      {TESTIMONIALS.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveTestimonial(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            activeTestimonial === idx ? "w-6 bg-[#0F172A]" : "bg-slate-300"
                          }`}
                          aria-label={`Ir para slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTestimonial(p => (p === TESTIMONIALS.length - 1 ? 0 : p + 1))}
                      className="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                      aria-label="Próximo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => scrollTo("#formulario")}
                className="bg-[#0F172A] text-white hover:bg-slate-800 font-extrabold px-6 py-3 rounded-full text-[14px] transition-all inline-flex items-center gap-2"
              >
                Quero atrair mais pacientes
                <ArrowRight className="w-4 h-4 text-[#FFD400]" />
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            03. QUEM SOMOS
        ════════════════════════════════════════════════════════════ */}
        <section id="sobre" className="py-16 sm:py-24 bg-[#F8FAFC] text-[#0F172A] border-b border-slate-200">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-5">
                <span className="text-[#0F172A] font-extrabold text-[12px] uppercase tracking-widest bg-[#FFD400] px-3.5 py-1 rounded-full inline-block">
                  Quem Somos
                </span>
                <h2 className="text-[28px] sm:text-[38px] font-black leading-[1.18] tracking-tight text-[#0F172A]">
                  Especialização em presença digital para odontologia.
                </h2>
                <p className="text-[15px] sm:text-[16px] text-slate-700 leading-relaxed">
                  A Ideal Solutions atua no mercado de marketing e presença digital desde 2024, desenvolvendo estratégias estruturadas para empresas e profissionais de saúde.
                </p>
                <p className="text-[15px] sm:text-[16px] text-slate-700 leading-relaxed">
                  Com o tempo, direcionamos parte importante de nossa atuação para o setor odontológico, combinando criação de landing pages de alta clareza, planejamento de conteúdo para Instagram e acompanhamento próximo de métricas.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => scrollTo("#formulario")}
                    className="bg-[#0F172A] text-white hover:bg-slate-800 font-extrabold px-6 py-3 rounded-full text-[14px] transition-all inline-flex items-center gap-2"
                  >
                    Quero atrair mais pacientes
                    <ArrowRight className="w-4 h-4 text-[#FFD400]" />
                  </button>
                </div>
              </div>

              {/* Image Quem Somos */}
              <div className="lg:col-span-6 flex items-center justify-center">
                <img
                  src="/quem-somos.png"
                  alt="Quem Somos - Ideal Solutions"
                  className="w-full h-auto object-contain select-none"
                />
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            04. MÉTODO IDEAL WITH FLOATING 3D LOGO & STACKED HOVER REVEAL
        ════════════════════════════════════════════════════════════ */}
        <section id="metodo" className="relative bg-[#0F172A] text-white py-16 sm:py-24 border-b border-slate-800 overflow-hidden">
          <ShaderBackground className="absolute inset-0 opacity-30 pointer-events-none" />

          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
            
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
              <span className="text-[#FFD400] font-extrabold text-[12px] uppercase tracking-widest bg-slate-800/90 px-3.5 py-1 rounded-full border border-slate-700 inline-block shadow-sm">
                O Método IDEAL
              </span>
              <h2 className="text-[28px] sm:text-[38px] font-black leading-[1.18] text-white tracking-tight">
                Como organizamos a evolução da sua presença digital
              </h2>
              <p className="text-[14.5px] sm:text-[16px] text-slate-300 font-medium">
                Passe o mouse sobre as etapas para revelar os detalhes do nosso processo.
              </p>
            </div>

            {/* Split Grid Layout: Left Floating 3D Logo | Right Stacked Hover Reveal */}
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Completely Free 3D Logo Floating & Swaying */}
              <div className="lg:col-span-5 flex items-center justify-center lg:justify-start py-4">
                <img
                  src="/metodo-3d-logo.png?v=5"
                  alt="Logo Ideal Solutions 3D"
                  className="w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] h-auto object-contain animate-float-sway filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)] pointer-events-none"
                />
              </div>

              {/* Right Column: Stacked Método Steps with Clean Titles & First Letter Highlight */}
              <div className="lg:col-span-7 space-y-4">
                {[
                  {
                    step: "01",
                    title: "Imersão",
                    short: "Entendemos sua clínica, seus serviços, seu público e sua presença digital.",
                    detail: "Analisamos seu posicionamento atual, concorrentes regionais, os diferenciais dos seus tratamentos e o perfil dos seus pacientes para alinhar a melhor estratégia de comunicação.",
                    highlight: "Diagnóstico completo & Mapeamento de Oportunidades"
                  },
                  {
                    step: "02",
                    title: "Direção Estratégica",
                    short: "Definimos prioridades, comunicação e soluções adequadas aos seus objetivos.",
                    detail: "Mapeamos a jornada do paciente ideal e estruturamos as mensagens-chave, canais e formatos certos para atrair mais agendamentos de alto valor.",
                    highlight: "Planejamento de Marca & Posicionamento Odontológico"
                  },
                  {
                    step: "03",
                    title: "Execução",
                    short: "Criamos os materiais e orientamos sua equipe para produção de fotos e vídeos.",
                    detail: "Desenvolvemos sua landing page de alta conversão com design autoral, configuramos rastreamento e fornecemos roteiros práticos para suas redes.",
                    highlight: "Landing Page Exclusiva + Roteiros de Conteúdo"
                  },
                  {
                    step: "04",
                    title: "Acompanhamento Próximo",
                    short: "Organizamos aprovações e acompanhamos entregas e indicadores.",
                    detail: "Monitoramos constantemente o desempenho dos canais, otimizamos o fluxo de conversão de leads e prestamos suporte contínuo para sua equipe.",
                    highlight: "Acompanhamento de Resultados & Alinhamentos"
                  },
                  {
                    step: "05",
                    title: "Lapidação Contínua",
                    short: "Ajustamos a comunicação com base em dados e no retorno da sua equipe.",
                    detail: "Refinamos continuamente anúncios, páginas e narrativas com base nos relatórios de performance e no feedback direto dos seus atendimentos.",
                    highlight: "Otimização Constante de Performance"
                  },
                ].map((m, index) => {
                  const isExpanded = activeMetodo === index;
                  const firstLetter = m.title[0];
                  const restOfWord = m.title.slice(1);

                  return (
                    <div
                      key={index}
                      onMouseEnter={() => setActiveMetodo(index)}
                      onClick={() => setActiveMetodo(index)}
                      className={`group relative rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer overflow-hidden ${
                        isExpanded
                          ? "bg-slate-900/90 border border-[#FFD400]/80 shadow-[0_10px_30px_rgba(255,212,0,0.12)] ring-1 ring-[#FFD400]/40"
                          : "bg-slate-900/60 border border-white/10 hover:border-slate-700 hover:bg-slate-900/80"
                      }`}
                    >
                      {/* Active Left Indicator Accent */}
                      {isExpanded && (
                        <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#FFD400] rounded-r-full shadow-[0_0_12px_#FFD400]" />
                      )}

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h3 className="font-extrabold text-[19px] sm:text-[21px] tracking-tight text-white flex items-baseline gap-0.5">
                            <span className="text-[#FFD400] font-black text-[25px] sm:text-[27px] leading-none">
                              {firstLetter}
                            </span>
                            <span>{restOfWord}</span>
                          </h3>
                          <span className={`text-[12.5px] font-extrabold ${isExpanded ? "text-[#FFD400]" : "text-slate-500"}`}>
                            {m.step}
                          </span>
                        </div>

                        <p className="text-[13.5px] sm:text-[14.5px] text-slate-300 font-medium leading-relaxed">
                          {m.short}
                        </p>

                        {/* Hover Reveal Block */}
                        <div className={`grid transition-all duration-300 ease-in-out ${
                          isExpanded ? "grid-rows-[1fr] opacity-100 mt-3.5 pt-3.5 border-t border-slate-800/90" : "grid-rows-[0fr] opacity-0"
                        }`}>
                          <div className="overflow-hidden space-y-2.5">
                            <p className="text-[13px] sm:text-[14px] text-slate-300 leading-relaxed">
                              {m.detail}
                            </p>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFD400]/10 border border-[#FFD400]/30 text-[#FFD400] text-[12px] sm:text-[12.5px] font-extrabold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{m.highlight}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-[12.5px] text-slate-400 text-center mt-10 italic">
              Observação: O acompanhamento respeita o escopo e o período contratados. Projetos pontuais e serviços recorrentes têm formatos próprios.
            </p>

            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => scrollTo("#formulario")}
                className="bg-[#FFD400] text-[#0F172A] hover:bg-[#FACC15] font-extrabold px-8 py-3.5 rounded-full text-[14.5px] transition-all shadow-lg active:scale-95 inline-flex items-center gap-2.5"
              >
                Quero atrair mais pacientes
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            05. SOLUÇÕES / ENTREGÁVEIS WITH CAROUSEL 3D
        ════════════════════════════════════════════════════════════ */}
        <SolutionsSection onCtaClick={() => scrollTo("#formulario")} />

        {/* ════════════════════════════════════════════════════════════
            06. FAQ & SEÇÃO FINAL WITH SHADER BACKGROUND
        ════════════════════════════════════════════════════════════ */}
        <section id="faq" className="relative bg-[#0F172A] text-white py-16 sm:py-24 border-t border-slate-800 overflow-hidden">
          <ShaderBackground className="absolute inset-0 opacity-35 pointer-events-none" />

          <div className="max-w-[860px] mx-auto px-5 sm:px-8 relative z-10">
            <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
              <span className="text-[#FFD400] font-extrabold text-[12px] uppercase tracking-widest bg-slate-800/90 px-3.5 py-1 rounded-full border border-slate-700 inline-block">
                Dúvidas Frequentes
              </span>
              <h2 className="text-[28px] sm:text-[38px] font-black leading-[1.18]">
                Perguntas comuns antes de começar
              </h2>
            </div>

            <div className="space-y-3 mb-16">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl overflow-hidden transition-all">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-4.5 sm:p-5 text-left font-bold text-[14.5px] text-white hover:text-[#FFD400] transition-colors"
                  >
                    <span>{item.q}</span>
                    {openFaq === i ? <Minus className="w-4 h-4 text-[#FFD400] flex-shrink-0" /> : <Plus className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-[13.5px] text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Final Call Banner */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-[24px] sm:text-[32px] font-black leading-[1.2] text-white max-w-lg mx-auto">
                Vamos entender o que sua clínica precisa?
              </h3>
              <p className="text-slate-300 text-[14.5px] max-w-md mx-auto leading-relaxed">
                Preencha o formulário. Nossa equipe entrará em contato em <strong className="text-white">até 1 dia útil</strong> para conversar sobre as soluções adequadas à sua clínica.
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => scrollTo("#formulario")}
                  className="bg-[#FFD400] text-[#0F172A] hover:bg-[#FACC15] font-extrabold px-8 py-3.5 rounded-full text-[15px] transition-all shadow-md inline-flex items-center gap-2"
                >
                  Quero atrair mais pacientes
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* ════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════ */}
      <footer className="py-10 bg-[#0A0F1D] border-t border-slate-800 text-slate-400 text-[13px]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/ideal-logo.png" alt="Ideal Solutions" className="h-7 w-auto object-contain brightness-0 invert opacity-90" onError={e => e.currentTarget.style.display = 'none'} />
            <span className="font-extrabold text-white text-[14px]">Ideal Solutions</span>
          </div>

          <div className="flex items-center gap-6 text-[12.5px]">
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-white transition-colors underline underline-offset-4"
            >
              Política de Privacidade
            </button>
            <span>•</span>
            <span>Contato: atendimento@idealsolutions.com.br</span>
          </div>

          <p>© {new Date().getFullYear()} Ideal Solutions. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* ════════════════════════════════════════════════════════════
          MOBILE STICKY CTA
      ════════════════════════════════════════════════════════════ */}
      {!formVisible && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-[#0F172A]/95 backdrop-blur-md border-t border-slate-800 z-40 transition-all duration-200">
          <button
            type="button"
            onClick={() => scrollTo("#formulario")}
            className="w-full bg-[#FFD400] text-[#0F172A] font-extrabold py-3.5 rounded-xl text-[14.5px] flex items-center justify-center gap-2 shadow-lg"
          >
            Quero atrair mais pacientes
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          PRIVACY POLICY MODAL
      ════════════════════════════════════════════════════════════ */}
      {privacyOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#FFD400]" />
                <h3 className="text-[18px] font-extrabold">Política de Privacidade — Ideal Solutions</h3>
              </div>
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-[13px] text-slate-300 leading-relaxed">
              <p>
                A <strong>Ideal Solutions</strong> valoriza a privacidade e a segurança das informações fornecidas por nossos usuários.
              </p>
              <h4 className="font-bold text-white text-[14px]">1. Coleta de Dados</h4>
              <p>
                Os dados coletados em nosso formulário (como nome, e-mail, telefone, nome da empresa, segmento e faturamento) são fornecidos voluntariamente pelo usuário para fins de contato comercial e elaboração de proposta personalizada.
              </p>
              <h4 className="font-bold text-white text-[14px]">2. Uso das Informações</h4>
              <p>
                As informações coletadas são utilizadas exclusivamente pela equipe da Ideal Solutions para realizar o atendimento comercial, entender o escopo do projeto e apresentar as soluções contratáveis. Não vendemos nem compartilhamos dados com terceiros.
              </p>
              <h4 className="font-bold text-white text-[14px]">3. Direitos do Titular (LGPD)</h4>
              <p>
                Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode solicitar a alteração, exclusão ou confirmação do tratamento dos seus dados a qualquer momento pelo e-mail <em>atendimento@idealsolutions.com.br</em>.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 text-right">
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                className="bg-[#FFD400] text-[#0F172A] font-extrabold px-5 py-2 rounded-lg text-[13px]"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
