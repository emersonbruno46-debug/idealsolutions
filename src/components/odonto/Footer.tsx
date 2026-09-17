import { useState } from "react";
import { X } from "lucide-react";

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
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
    <>
      <footer className="py-12 bg-[#FFFFFF] border-t border-[#E9E9E5]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-[#E9E9E5]">
            
            {/* Logo oficial */}
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400] rounded-lg"
            >
              <img
                src="/ideal-logo.png"
                alt="Ideal Solutions"
                className="h-8 w-auto object-contain"
              />
            </button>

            {/* Links Centrais */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[14px] font-medium text-[#646464]">
              <a
                href="https://instagram.com/idealsolutions.co"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#111111] transition-colors"
              >
                Instagram (@idealsolutions.co)
              </a>

              <a
                href="#diagnostico"
                onClick={scrollToForm}
                className="hover:text-[#111111] transition-colors"
              >
                Contato
              </a>

              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="hover:text-[#111111] transition-colors focus:outline-none underline-offset-4 hover:underline"
              >
                Política de Privacidade
              </button>
            </div>

          </div>

          {/* Linha inferior de Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[#646464]">
            <p>
              © {new Date().getFullYear()} Ideal Solutions. Todos os direitos reservados.
            </p>
            <p className="text-[12px] text-[#646464]">
              Soluções especializadas em presença digital para odontologia em todo o Brasil.
            </p>
          </div>

        </div>
      </footer>

      {/* Modal de Política de Privacidade */}
      {privacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm anim-fade-in">
          <div className="bg-[#FFFFFF] border border-[#E9E9E5] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E9E5]">
              <h4 className="text-[18px] font-bold text-[#111111]">Política de Privacidade</h4>
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                className="p-1.5 rounded-lg text-[#646464] hover:bg-black/5"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-[13px] text-[#646464] leading-relaxed space-y-3">
              <p>
                A <strong>Ideal Solutions</strong> valoriza a sua privacidade e atua em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
              </p>
              <p>
                As informações coletadas em nossos formulários de diagnóstico (como nome, contato, WhatsApp e informações da clínica) têm como finalidade exclusiva a análise prévia do seu negócio, qualificação comercial e apresentação de propostas personalizadas para a sua presença digital.
              </p>
              <p>
                Seus dados não são vendidos, alugados ou compartilhados com terceiros não autorizados. Mantemos medidas técnicas adequadas para garantir a segurança das informações fornecidas.
              </p>
              <p>
                Você pode a qualquer momento solicitar a atualização, retificação ou exclusão de seus dados entrando em contato direto com a nossa equipe.
              </p>
            </div>

            <div className="pt-3 border-t border-[#E9E9E5] text-right">
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                className="px-5 py-2 rounded-full bg-[#111111] text-white text-[13px] font-bold hover:bg-[#252525]"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
