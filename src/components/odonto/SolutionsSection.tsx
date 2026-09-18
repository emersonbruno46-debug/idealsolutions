"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

const desktopImages = [
  { src: "/solucoes/solucao-desktop-1.webp", alt: "Gestão & Estratégia Odontológica - Desktop" },
  { src: "/solucoes/solucao-desktop-2.webp", alt: "Conteúdo para Instagram - Desktop" },
  { src: "/solucoes/solucao-desktop-3.webp", alt: "Landing Pages & Integrações - Desktop" },
  { src: "/solucoes/solucao-desktop-4.webp", alt: "Posicionamento Odontológico - Desktop" },
  { src: "/solucoes/solucao-desktop-5.webp", alt: "Captação Qualificada - Desktop" },
];

const mobileImages = [
  { src: "/solucoes/solucao-mobile-1.webp", alt: "Gestão & Estratégia Odontológica - Mobile" },
  { src: "/solucoes/solucao-mobile-2.webp", alt: "Conteúdo para Instagram - Mobile" },
  { src: "/solucoes/solucao-mobile-3.webp", alt: "Landing Pages & Integrações - Mobile" },
  { src: "/solucoes/solucao-mobile-4.webp", alt: "Posicionamento Odontológico - Mobile" },
  { src: "/solucoes/solucao-mobile-5.webp", alt: "Captação Qualificada - Mobile" },
];

interface SolutionsSectionProps {
  onCtaClick?: () => void;
}

export default function SolutionsSection({ onCtaClick }: SolutionsSectionProps) {
  const scrollToForm = () => {
    if (onCtaClick) {
      onCtaClick();
      return;
    }
    const el = document.querySelector("#formulario");
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
    <section id="solucoes" className="py-16 sm:py-24 bg-white text-[#0F172A] border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-[#0F172A] font-extrabold text-[12px] uppercase tracking-widest bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200 inline-block shadow-sm">
            Nossas Soluções
          </span>
          <h2 className="text-[28px] sm:text-[38px] font-black leading-[1.18] text-[#0F172A] tracking-tight">
            As soluções que estruturam a presença digital da sua clínica.
          </h2>
        </div>

        {/* Layout Grid: Esquerda = Carrossel de Cartas | Direita = Texto Resumido */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Coluna da Esquerda: Carrossel 3D (Skiper / Swiper Cards) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center w-full min-h-[340px] sm:min-h-[400px]">
            
            {/* Versão DESKTOP: Imagens Horizontais 1672x941 (Proporção Exata 1.7768:1 -> 550px x 309px) */}
            <div className="hidden md:block w-full">
              <style>{`
                .SwiperCardsDesktop {
                  width: 550px !important;
                  height: 309px !important;
                }
                .SwiperCardsDesktop .swiper-slide {
                  border-radius: 1.25rem;
                  overflow: hidden;
                  box-shadow: 0 15px 35px rgba(0,0,0,0.12);
                  border: 1px solid rgba(0,0,0,0.08);
                  background: transparent;
                }
              `}</style>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative w-full flex items-center justify-center py-2"
              >
                <Swiper
                  effect="cards"
                  grabCursor={true}
                  loop={true}
                  autoplay={{
                    delay: 2800,
                    disableOnInteraction: false,
                  }}
                  className="SwiperCardsDesktop"
                  modules={[EffectCards, Autoplay, Pagination, Navigation]}
                >
                  {desktopImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        className="w-full h-full object-fill block select-none rounded-2xl"
                        src={image.src}
                        alt={image.alt}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            </div>

            {/* Versão MOBILE: Imagens Verticais 1122x1402 (Proporção Exata 0.8:1 -> 280px x 350px) */}
            <div className="block md:hidden w-full">
              <style>{`
                .SwiperCardsMobile {
                  width: 280px !important;
                  height: 350px !important;
                }
                .SwiperCardsMobile .swiper-slide {
                  border-radius: 1.25rem;
                  overflow: hidden;
                  box-shadow: 0 15px 35px rgba(0,0,0,0.12);
                  border: 1px solid rgba(0,0,0,0.08);
                  background: transparent;
                }
              `}</style>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative w-full flex items-center justify-center py-2"
              >
                <Swiper
                  effect="cards"
                  grabCursor={true}
                  loop={true}
                  autoplay={{
                    delay: 2800,
                    disableOnInteraction: false,
                  }}
                  className="SwiperCardsMobile"
                  modules={[EffectCards, Autoplay, Pagination, Navigation]}
                >
                  {mobileImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        className="w-full h-full object-fill block select-none rounded-2xl"
                        src={image.src}
                        alt={image.alt}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            </div>

            <p className="text-[12px] text-slate-500 mt-4 text-center tracking-wide uppercase font-semibold">
              Arraste os cards para explorar os modelos
            </p>
          </div>

          {/* Coluna da Direita: Texto Resumido */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="space-y-3">
              <h3 className="text-[22px] sm:text-[26px] font-black text-[#0F172A] tracking-tight leading-snug">
                Estrutura sob medida para sua clínica.
              </h3>
              <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed font-medium">
                Desenvolvemos estratégias personalizadas para atrair pacientes particulares, fortalecendo sua autoridade no mercado odontológico.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-[50px] px-8 rounded-full bg-[#0F172A] text-white text-[14.5px] font-extrabold hover:bg-slate-800 active:scale-[0.98] transition-all shadow-md"
              >
                Quero atrair mais pacientes
                <ArrowRight className="w-4 h-4 text-[#FFD400]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
