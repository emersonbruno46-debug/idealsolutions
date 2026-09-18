"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Smartphone,
  LayoutTemplate,
  Target,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

const desktopImages = [
  { src: "/solucoes/solucao-desktop-1.png", alt: "Gestão & Estratégia Odontológica - Desktop" },
  { src: "/solucoes/solucao-desktop-2.png", alt: "Conteúdo para Instagram - Desktop" },
  { src: "/solucoes/solucao-desktop-3.png", alt: "Landing Pages & Integrações - Desktop" },
  { src: "/solucoes/solucao-desktop-4.png", alt: "Posicionamento Odontológico - Desktop" },
  { src: "/solucoes/solucao-desktop-5.png", alt: "Captação Qualificada - Desktop" },
];

const mobileImages = [
  { src: "/solucoes/solucao-mobile-1.png", alt: "Gestão & Estratégia Odontológica - Mobile" },
  { src: "/solucoes/solucao-mobile-2.png", alt: "Conteúdo para Instagram - Mobile" },
  { src: "/solucoes/solucao-mobile-3.png", alt: "Landing Pages & Integrações - Mobile" },
  { src: "/solucoes/solucao-mobile-4.png", alt: "Posicionamento Odontológico - Mobile" },
  { src: "/solucoes/solucao-mobile-5.png", alt: "Captação Qualificada - Mobile" },
];

const servicePillars = [
  {
    icon: Compass,
    title: "Gestão & Estratégia Digital",
    description: "Planejamento editorial, linha de comunicação alinhada à sua clínica e calendário mensal de entregas.",
  },
  {
    icon: Smartphone,
    title: "Conteúdo Autoral para Instagram",
    description: "Design de posts, carrosséis educativos, roteiros de Reels e orientações para captação de imagem.",
  },
  {
    icon: LayoutTemplate,
    title: "Landing Pages de Alta Conversão",
    description: "Páginas exclusivas, rápidas e otimizadas para levar visitantes direto ao WhatsApp da clínica.",
  },
  {
    icon: Target,
    title: "Posicionamento & Captação Qualificada",
    description: "Atraia pacientes buscando tratamentos particulares de alto valor ticket e diferenciação de marca.",
  },
  {
    icon: BarChart3,
    title: "Acompanhamento de Resultados",
    description: "Métricas transparentes e otimização contínua para maximizar o retorno dos seus investimentos.",
  },
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
    <section id="solucoes" className="py-16 sm:py-24 bg-[#0F172A] text-white border-b border-slate-800 overflow-hidden relative">
      {/* Glow ambient background */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#FFD400]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[12px] font-extrabold tracking-wider text-[#FFD400] uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            NOSSAS SOLUÇÕES
          </div>
          <h2 className="text-[28px] sm:text-[40px] lg:text-[44px] font-black text-white leading-[1.15] tracking-tight mb-4">
            Estrutura completa de marketing para sua clínica odontológica.
          </h2>
          <p className="text-[16px] sm:text-[18px] text-slate-300 leading-relaxed font-normal">
            Combinamos posicionamento visual de excelência, páginas de alta performance e estratégia contínua para atrair pacientes particulares.
          </p>
        </div>

        {/* Layout Grid: Esquerda = Carrossel de Cartas | Direita = Texto de Apoio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Coluna da Esquerda: Carrossel 3D (Skiper / Swiper Cards) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center w-full min-h-[400px]">
            
            {/* Versão DESKTOP: Imagens Horizontais (visível em telas md+) */}
            <div className="hidden md:block w-full">
              <style>{`
                .SwiperCardsDesktop .swiper-slide {
                  border-radius: 1.5rem;
                  overflow: hidden;
                  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
                  border: 1px solid rgba(255,255,255,0.1);
                }
              `}</style>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-[540px] mx-auto flex items-center justify-center py-4"
              >
                <Swiper
                  effect="cards"
                  grabCursor={true}
                  loop={true}
                  autoplay={{
                    delay: 2800,
                    disableOnInteraction: false,
                  }}
                  className="SwiperCardsDesktop h-[320px] w-[500px]"
                  modules={[EffectCards, Autoplay, Pagination, Navigation]}
                >
                  {desktopImages.map((image, index) => (
                    <SwiperSlide key={index} className="bg-slate-900">
                      <img
                        className="h-full w-full object-cover select-none"
                        src={image.src}
                        alt={image.alt}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            </div>

            {/* Versão MOBILE: Imagens Verticais (visível em telas < md) */}
            <div className="block md:hidden w-full">
              <style>{`
                .SwiperCardsMobile .swiper-slide {
                  border-radius: 1.5rem;
                  overflow: hidden;
                  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
                  border: 1px solid rgba(255,255,255,0.1);
                }
              `}</style>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-[300px] mx-auto flex items-center justify-center py-4"
              >
                <Swiper
                  effect="cards"
                  grabCursor={true}
                  loop={true}
                  autoplay={{
                    delay: 2800,
                    disableOnInteraction: false,
                  }}
                  className="SwiperCardsMobile h-[380px] w-[260px]"
                  modules={[EffectCards, Autoplay, Pagination, Navigation]}
                >
                  {mobileImages.map((image, index) => (
                    <SwiperSlide key={index} className="bg-slate-900">
                      <img
                        className="h-full w-full object-cover select-none"
                        src={image.src}
                        alt={image.alt}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            </div>

            <p className="text-[12px] text-slate-400 mt-4 text-center tracking-wide uppercase font-medium">
              Arraste os cards para explorar os modelos
            </p>
          </div>

          {/* Coluna da Direita: Texto de Apoio sobre os Serviços */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h3 className="text-[22px] sm:text-[28px] font-bold text-white tracking-tight leading-snug">
                Serviços planejados sob medida para o crescimento do seu consultório.
              </h3>
              <p className="text-[15px] text-slate-300 leading-relaxed">
                Não trabalhamos com pacotes engessados. Analisamos o momento atual da sua clínica e estruturamos exatamente os pilares que trarão maior retorno de pacientes e autoridade.
              </p>
            </div>

            {/* Lista de Pilares / Serviços */}
            <div className="space-y-3.5 pt-2">
              {servicePillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-4.5 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-[#FFD400]/50 transition-all duration-300 flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-[#FFD400] flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[15px] font-extrabold text-white group-hover:text-[#FFD400] transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-[13px] text-slate-300 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Botão de Ação */}
            <div className="pt-3">
              <button
                type="button"
                onClick={scrollToForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 h-[52px] px-8 rounded-full bg-[#FFD400] text-[#0F172A] text-[15px] font-extrabold hover:bg-[#FACC15] active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(255,212,0,0.3)]"
              >
                Quero um plano ideal para minha clínica
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
