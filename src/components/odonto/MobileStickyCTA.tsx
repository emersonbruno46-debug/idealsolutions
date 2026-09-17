import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export default function MobileStickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Exibe somente depois que o visitante passar da primeira dobra (Hero)
      setShow(window.scrollY > 550);
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

  if (!show) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E9E9E5] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] anim-fade-up">
      <button
        type="button"
        onClick={scrollToForm}
        className="w-full inline-flex items-center justify-center gap-2.5 h-12 rounded-full bg-[#FFD400] text-[#111111] text-[14px] font-bold shadow-sm active:scale-[0.98] transition-all"
      >
        <span>Quero um plano para minha clínica</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
