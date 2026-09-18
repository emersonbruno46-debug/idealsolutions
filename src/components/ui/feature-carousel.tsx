"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Smartphone,
  Globe,
  Award,
  ShieldCheck,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  id: string;
  label: string;
  icon: LucideIcon;
  image: string;
  description: string;
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    id: "gestao-estrategia",
    label: "Gestão & Estratégia",
    icon: Layers,
    image: "/solucoes/solucao-1-portrait.png",
    description: "Planejamento de comunicação, calendário editorial estruturado e acompanhamento contínuo de indicadores.",
  },
  {
    id: "conteudo-instagram",
    label: "Conteúdo para Instagram",
    icon: Smartphone,
    image: "/solucoes/solucao-2-portrait.png",
    description: "Design autoral de posts e carrosséis, roteiros estratégicos e orientação para Reels alinhados à sua marca.",
  },
  {
    id: "landing-pages",
    label: "Landing Pages & Integrações",
    icon: Globe,
    image: "/solucoes/solucao-3-portrait.png",
    description: "Páginas de alta conversão focadas em clareza, velocidade e captação direta no WhatsApp da sua clínica.",
  },
  {
    id: "posicionamento",
    label: "Posicionamento Odontológico",
    icon: Award,
    image: "/solucoes/solucao-1-landscape.png",
    description: "Comunicação visual e narrativa desenhadas para atrair pacientes para tratamentos particulares de alto valor.",
  },
  {
    id: "captacao-qualificada",
    label: "Captação Qualificada",
    icon: ShieldCheck,
    image: "/solucoes/solucao-2-landscape.png",
    description: "Funil estruturado para transformar a visibilidade digital em novas oportunidades reais de agendamento.",
  },
  {
    id: "acompanhamento-metricas",
    label: "Acompanhamento de Métricas",
    icon: CheckCircle2,
    image: "/solucoes/solucao-3-landscape.png",
    description: "Relatórios de performance e lapidação contínua dos canais digitais com suporte próximo da nossa equipe.",
  },
];

const AUTO_PLAY_INTERVAL = 3500;
const ITEM_HEIGHT = 60;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel({
  features = DEFAULT_FEATURES,
  className = "",
}: {
  features?: FeatureItem[];
  className?: string;
}) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % features.length) + features.length) % features.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + features.length) % features.length;
    if (diff > 0) setStep((s) => s + diff);
    else if (diff < 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = features.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className={cn("w-full max-w-7xl mx-auto md:p-4", className)}>
      <div className="relative overflow-hidden rounded-[2rem] lg:rounded-[3rem] flex flex-col lg:flex-row min-h-[580px] lg:h-[620px] border border-slate-800 bg-[#0F172A] shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
        
        {/* Left Chips Vertical Menu in Dark Navy Theme */}
        <div className="w-full lg:w-[42%] min-h-[320px] md:min-h-[400px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-6 md:px-12 lg:pl-12 bg-[#0F172A] border-b lg:border-b-0 lg:border-r border-slate-800">
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0F172A] via-[#0F172A]/90 to-transparent z-40 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/90 to-transparent z-40 pointer-events-none" />
          
          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {features.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(features.length / 2),
                features.length / 2,
                distance
              );
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.3,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    type="button"
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-3.5 px-5 md:px-7 lg:px-6 py-3 rounded-full transition-all duration-500 text-left group border text-sm font-extrabold tracking-tight whitespace-nowrap",
                      isActive
                        ? "bg-[#FFD400] text-[#0F172A] border-[#FFD400] shadow-[0_4px_20px_rgba(255,212,0,0.3)] z-10 scale-105"
                        : "bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-300",
                        isActive ? "text-[#0F172A]" : "text-slate-400 group-hover:text-[#FFD400]"
                      )}
                    >
                      <Icon className="w-4 h-4 stroke-[2.5]" />
                    </div>

                    <span className="uppercase text-[12.5px] font-extrabold tracking-wider">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right 3D Card Stack Preview */}
        <div className="flex-1 min-h-[480px] md:min-h-[540px] lg:h-full relative bg-slate-950/80 flex items-center justify-center py-12 md:py-16 lg:py-12 px-6 md:px-12 lg:px-10 overflow-hidden">
          <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {features.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -110 : isNext ? 110 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.35 : 0,
                    rotate: isPrev ? -4 : isNext ? 4 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-[2rem] md:rounded-[2.4rem] overflow-hidden border-4 md:border-6 border-slate-800 bg-slate-900 origin-center shadow-2xl"
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive
                        ? "grayscale-0 blur-0"
                        : "grayscale blur-[2px] brightness-75"
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-6 md:p-8 pt-24 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent flex flex-col justify-end pointer-events-none"
                      >
                        <div className="bg-[#FFD400] text-[#0F172A] px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-[0.15em] w-fit shadow-md mb-2">
                          0{index + 1} • {feature.label}
                        </div>
                        <p className="text-white font-extrabold text-base md:text-lg leading-snug drop-shadow-md tracking-tight">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      "absolute top-6 left-6 flex items-center gap-2.5 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFD400] shadow-[0_0_10px_#FFD400]" />
                    <span className="text-white/90 text-[10px] font-extrabold uppercase tracking-[0.25em] font-mono bg-slate-900/80 px-2.5 py-0.5 rounded-md border border-white/10">
                      Ideal Solutions
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default FeatureCarousel;
