import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Soluções", href: "#solucoes" },
    { label: "Método", href: "#metodo" },
    { label: "Cases", href: "#cases" },
    { label: "Dúvidas", href: "#duvidas" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-250 ${
        scrolled
          ? "bg-[#F7F7F3]/90 backdrop-blur-md border-b border-[#E9E9E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        {/* Esquerda: Logo oficial da Ideal Solutions */}
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, "#inicio")}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400] rounded-lg"
        >
          <img
            src="/ideal-logo.png"
            alt="Ideal Solutions"
            className="h-8 md:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </a>

        {/* Centro: Links de Navegação */}
        <nav className="hidden md:flex items-center gap-9" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[14px] font-medium text-[#646464] hover:text-[#111111] transition-colors duration-150 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FFD400] hover:after:w-full after:transition-all after:duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Direita: CTA "Quero conversar" */}
        <div className="hidden sm:flex items-center">
          <a
            href="#diagnostico"
            onClick={(e) => handleNavClick(e, "#diagnostico")}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#111111] text-white text-[14px] font-semibold hover:bg-[#252525] active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FFD400]"
          >
            Quero conversar
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#111111] hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400]"
          aria-expanded={mobileMenuOpen}
          aria-label="Abrir menu de navegação"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-b border-[#E9E9E5] px-6 py-5 shadow-lg anim-fade-up">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[16px] font-medium text-[#111111] py-2 border-b border-[#E9E9E5]/50 hover:text-[#FFD400]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#diagnostico"
              onClick={(e) => handleNavClick(e, "#diagnostico")}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-[#111111] text-white text-[15px] font-semibold"
            >
              Quero conversar
              <ArrowRight className="w-4 h-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
