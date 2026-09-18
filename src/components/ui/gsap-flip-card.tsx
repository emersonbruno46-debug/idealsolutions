"use client";

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip, SplitText);
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    prefersReducedMotion,
    getServerReducedMotionSnapshot
  );
}

const CAPTION_FONT_VW = 1;
const CAPTION_LINE_RATIO = 1.3;
const CAPTION_LINE_VW = CAPTION_FONT_VW * CAPTION_LINE_RATIO;
const CAPTION_MOBILE_LINE_RATIO = 1.5;
const CAPTION_MOBILE_LINE = `${3 * CAPTION_MOBILE_LINE_RATIO}vw`;
const CAPTION_MOBILE_LINE_SM = `${3.5 * CAPTION_MOBILE_LINE_RATIO}vw`;

export interface GsapFlipCardItem {
  id?: string | number;
  /** Image URL. Any size works, but a ~4:5 portrait ratio matches the default layout best. */
  image: string;
  mobileImage?: string;
  alt?: string;
  /** Short line shown next to the opened hero image. */
  caption?: string;
  title?: string;
  meta?: string;
  description?: string;
}

export interface GsapFlipCardProps {
  items?: GsapFlipCardItem[];
  title?: string;
  meta?: string;
  description?: string;
  backgroundColor?: string;
  textColor?: string;
  mutedColor?: string;
  rounded?: number;
  thumbWidth?: number;
  thumbHeight?: number;
  thumbGap?: number;
  heroWidth?: number;
  heroHeight?: number;
  duration?: number;
  ease?: string;
  stackOffsetX?: number;
  stackOffsetY?: number;
  stackRotation?: number;
  showCounter?: boolean;
  captionLines?: number;
  captionFadeDuration?: number;
  captionRevealDuration?: number;
  captionLineStagger?: number;
  onClose?: () => void;
  className?: string;
}

export default function GsapFlipCard({
  items = [],
  title = "Nossas Soluções",
  meta = "Ideal Solutions / Odontologia",
  description = "Soluções estruturadas para transformar a presença digital da sua clínica.",
  backgroundColor = "#0F172A",
  textColor = "#FFFFFF",
  mutedColor = "#94A3B8",
  rounded = 20,
  thumbWidth = 120,
  thumbHeight = 140,
  thumbGap = 14,
  heroWidth = 530,
  heroHeight = 670,
  duration = 0.7,
  ease = "power3.inOut",
  stackOffsetX = 4,
  stackOffsetY = 10,
  stackRotation = 0,
  showCounter = true,
  captionLines = 3,
  captionFadeDuration = 0.25,
  captionRevealDuration = 0.55,
  captionLineStagger = 0.07,
  onClose,
  className = "",
}: GsapFlipCardProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i));
  const [opened, setOpened] = useState(true); // Default open gallery for immediate visual presentation
  const [stageWidth, setStageWidth] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const isAnimatingRef = useRef(false);
  const [shownCaption, setShownCaption] = useState<string | undefined>(
    () => items[0]?.caption
  );
  const captionRef = useRef<HTMLParagraphElement | null>(null);
  const captionTweenRef = useRef<gsap.core.Tween | null>(null);
  const captionSplitRef = useRef<SplitText | null>(null);

  const revertCaptionSplit = useCallback(() => {
    captionSplitRef.current?.revert();
    captionSplitRef.current = null;
  }, []);

  useEffect(() => {
    setOrder(items.map((_, i) => i));
  }, [items]);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => setStageWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const registerCard = useCallback((index: number, node: HTMLButtonElement | null) => {
    if (node) cardRefs.current.set(index, node);
    else cardRefs.current.delete(index);
  }, []);

  const orderedCards = useCallback(
    () => order.map((i) => cardRefs.current.get(i)).filter(Boolean) as HTMLButtonElement[],
    [order]
  );

  const isMobile = stageWidth > 0 && stageWidth < 768;
  const isNarrow = stageWidth > 0 && stageWidth < 900;
  const railCount = Math.max(items.length - 1, 0);
  const scale = isNarrow ? Math.min(1, stageWidth / 900) : 1;
  const tW = thumbWidth * scale;
  const tH = thumbHeight * scale;
  const gap = thumbGap * scale;
  const hW = Math.min(heroWidth * scale, stageWidth * 0.46);
  const hH = heroHeight * (hW / heroWidth || 1);
  const railX = Math.max(24, stageWidth * 0.045);
  const heroX = stageWidth - hW - railX;
  const stackWidth = Math.min(215 * scale, stageWidth * 0.42);
  const stackHeight = stackWidth * 1.5;

  const slotBox = useCallback(
    (slot: number) => {
      if (slot === 0) {
        return { x: heroX, y: 0, w: hW, h: hH, r: rounded * scale, z: items.length + 1 };
      }
      const railHeight = railCount * tH + (railCount - 1) * gap;
      const top = -railHeight / 2 + (slot - 1) * (tH + gap);
      return {
        x: railX,
        y: top + tH / 2,
        w: tW,
        h: tH,
        r: rounded * 0.6 * scale,
        z: items.length - slot,
      };
    },
    [heroX, hW, hH, railX, tW, tH, gap, railCount, rounded, scale, items.length]
  );

  const select = useCallback(
    (itemIndex: number) => {
      if (itemIndex === order[0] || isAnimatingRef.current) return;
      if (!isMobile) {
        flipStateRef.current = Flip.getState(orderedCards(), { props: "borderRadius" });
      }
      setOrder((prev) => {
        const next = [...prev];
        const from = next.indexOf(itemIndex);
        next[from] = next[0];
        next[0] = itemIndex;
        return next;
      });
    },
    [order, orderedCards, isMobile]
  );

  useLayoutEffect(() => {
    const state = flipStateRef.current;
    if (!state) return;
    flipStateRef.current = null;
    if (reducedMotion || isMobile) return;
    isAnimatingRef.current = true;
    Flip.from(state, {
      duration,
      ease,
      absolute: true,
      props: "borderRadius",
      onEnter: (els) => gsap.fromTo(els, { opacity: 0 }, { opacity: 1, duration }),
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
  }, [order, duration, ease, reducedMotion, isMobile]);

  const open = useCallback(() => {
    if (opened || isAnimatingRef.current || stageWidth === 0) return;
    if (reducedMotion) {
      setOpened(true);
      return;
    }
    const state = Flip.getState(orderedCards(), { props: "borderRadius" });
    setOpened(true);
    requestAnimationFrame(() => {
      isAnimatingRef.current = true;
      Flip.from(state, {
        duration: duration * 1.0,
        ease,
        absolute: true,
        props: "borderRadius",
        stagger: 0.04,
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    });
  }, [opened, stageWidth, reducedMotion, orderedCards, duration, ease]);

  const close = useCallback(() => {
    if (!opened || isAnimatingRef.current) return;
    if (reducedMotion) {
      setOpened(false);
      onClose?.();
      return;
    }
    const state = Flip.getState(orderedCards(), { props: "borderRadius" });
    setOpened(false);
    requestAnimationFrame(() => {
      isAnimatingRef.current = true;
      Flip.from(state, {
        duration: duration * 0.9,
        ease,
        absolute: true,
        props: "borderRadius",
        stagger: { each: 0.035, from: "end" },
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    });
    onClose?.();
  }, [opened, reducedMotion, orderedCards, duration, ease, onClose]);

  const heroItemIndex = order[0];
  const heroItem = items[heroItemIndex];
  const heroSlotLabel = heroItemIndex + 1;

  // Active item metadata
  const currentTitle = heroItem?.title ?? title;
  const currentMeta = heroItem?.meta ?? meta;
  const currentDesc = heroItem?.description ?? description;

  const nextCaption = heroItem?.caption;
  const activeCaption = reducedMotion ? nextCaption : shownCaption;

  useEffect(() => {
    if (reducedMotion || nextCaption === shownCaption) return;
    const el = captionRef.current;
    if (!el) {
      revertCaptionSplit();
      setShownCaption(nextCaption);
      return;
    }
    captionTweenRef.current?.kill();
    captionTweenRef.current = gsap.to(el, {
      opacity: 0,
      y: -8,
      duration: captionFadeDuration,
      ease: "power2.in",
      onComplete: () => {
        revertCaptionSplit();
        setShownCaption(nextCaption);
      },
    });
  }, [nextCaption, shownCaption, reducedMotion, captionFadeDuration, revertCaptionSplit]);

  useLayoutEffect(() => {
    const el = captionRef.current;
    if (!el || !activeCaption) return;
    if (reducedMotion) {
      revertCaptionSplit();
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    captionTweenRef.current?.kill();
    revertCaptionSplit();
    gsap.set(el, { opacity: 1, y: 0 });
    try {
      const split = SplitText.create(el, {
        type: "lines",
        linesClass: "hxs-caption-line",
        mask: "lines",
      });
      captionSplitRef.current = split;
      const lines = split.lines;
      if (!lines?.length) {
        revertCaptionSplit();
        return;
      }
      gsap.set(lines, { yPercent: 100 });
      captionTweenRef.current = gsap.to(lines, {
        yPercent: 0,
        duration: captionRevealDuration,
        stagger: captionLineStagger,
        ease: "power3.out",
      });
    } catch {
      revertCaptionSplit();
      gsap.set(el, { opacity: 1, y: 0 });
    }
    return () => {
      captionTweenRef.current?.kill();
      revertCaptionSplit();
    };
  }, [activeCaption, reducedMotion, captionRevealDuration, captionLineStagger, revertCaptionSplit]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (!opened || items.length < 2) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") select(order[1]);
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") select(order[order.length - 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [order, select, close, opened, items.length]);

  if (items.length === 0) return null;

  const cardStyle = (itemIndex: number): CSSProperties => {
    const slot = order.indexOf(itemIndex);
    if (!opened) {
      const w = stackWidth;
      const h = stackHeight;
      return {
        position: "absolute",
        left: stageWidth / 2 - w / 2,
        top: "50%",
        width: w,
        height: h,
        borderRadius: rounded * 0.75 * scale,
        transform: `translateY(-50%) translate(${slot * stackOffsetX}px, ${slot * stackOffsetY}px) rotate(${slot * stackRotation}deg)`,
        zIndex: items.length - slot,
      };
    }
    const box = slotBox(slot);
    return {
      position: "absolute",
      left: box.x,
      top: "50%",
      width: box.w,
      height: box.h,
      borderRadius: box.r,
      transform: `translateY(calc(-50% + ${box.y}px))`,
      zIndex: box.z,
    };
  };

  const chromeStyle: CSSProperties = {
    opacity: opened ? 1 : 0,
    transition: "opacity 0.5s ease 0.25s",
    pointerEvents: opened ? undefined : "none",
  };

  if (isMobile) {
    return (
      <div
        ref={rootRef}
        className={`hxs-gsap-flip-card relative w-full overflow-hidden ${className}`}
        style={{ background: backgroundColor, color: textColor }}
      >
        <div className="px-5 py-8 flex flex-col gap-6">
          {showCounter && (
            <div className="text-[13px] font-bold tracking-[0.05em] uppercase text-[#FFD400]">
              <span>Solução {String(heroSlotLabel).padStart(2, "0")}</span>
              <span style={{ color: mutedColor }}> / {String(items.length).padStart(2, "0")}</span>
            </div>
          )}

          {heroItem && (
            <div
              className="relative w-full aspect-[16/9] sm:aspect-[4/3] overflow-hidden bg-slate-900 border border-white/10 shadow-2xl"
              style={{ borderRadius: rounded }}
            >
              <img
                src={heroItem.mobileImage || heroItem.image}
                alt={heroItem.alt ?? ""}
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          )}

          <div>
            <h3 className="text-[26px] sm:text-[32px] font-black leading-[1.1] tracking-tight text-white m-0">
              {currentTitle}
            </h3>
            <p className="text-[13px] font-semibold mt-2 mb-3 text-[#FFD400]">
              {currentMeta}
            </p>
            <p className="text-[14.5px] leading-relaxed text-slate-300 m-0">
              {currentDesc}
            </p>
            <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <p ref={captionRef} className="text-[13px] text-slate-300 leading-relaxed font-medium m-0">
                {activeCaption}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {order.map((itemIndex) => {
              const item = items[itemIndex];
              if (!item) return null;
              const isSelected = itemIndex === heroItemIndex;
              return (
                <button
                  key={item.id ?? itemIndex}
                  type="button"
                  onClick={() => select(itemIndex)}
                  aria-label={item.alt ?? item.caption ?? `Solução ${itemIndex + 1}`}
                  className={`relative p-0 border-none overflow-hidden aspect-[4/3] w-full bg-slate-900 transition-all rounded-xl ${
                    isSelected ? "ring-2 ring-[#FFD400] scale-95 opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={item.mobileImage || item.image}
                    alt={item.alt ?? ""}
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                    <span className="text-[10px] font-extrabold text-white truncate">
                      {item.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`hxs-gsap-flip-card relative w-full h-[620px] sm:h-[680px] overflow-hidden ${className}`}
      style={{ background: backgroundColor, color: textColor }}
    >
      {showCounter && (
        <div
          className="absolute top-6 left-8 text-[13px] font-bold tracking-[0.05em] uppercase text-[#FFD400] z-40"
          style={chromeStyle}
        >
          <span>Solução {String(heroSlotLabel).padStart(2, "0")}</span>
          <span style={{ color: mutedColor }}> / {String(items.length).padStart(2, "0")}</span>
        </div>
      )}

      <div
        ref={stageRef}
        className="relative w-full h-full cursor-default"
      >
        {/* Info panel next to hero image */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 max-w-[340px] lg:max-w-[420px] z-30 pointer-events-none transition-all duration-300 ${
            isNarrow ? "hidden" : "block"
          }`}
          style={{ ...chromeStyle, left: railX + tW + Math.max(36, stageWidth * 0.05) }}
        >
          <span className="text-[#FFD400] font-extrabold text-[12px] uppercase tracking-widest bg-slate-800/90 px-3.5 py-1 rounded-full border border-slate-700 inline-block mb-4">
            {currentMeta}
          </span>
          <h3 className="text-[30px] lg:text-[38px] leading-[1.1] font-black tracking-tight text-white m-0">
            {currentTitle}
          </h3>
          <p className="text-[15px] leading-relaxed text-slate-300 mt-4 mb-6 m-0 font-medium">
            {currentDesc}
          </p>
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-lg">
            <p ref={captionRef} className="text-[13.5px] text-slate-200 leading-relaxed font-semibold m-0">
              {activeCaption}
            </p>
          </div>
        </div>

        {items.map((item, itemIndex) => {
          const isHero = itemIndex === heroItemIndex;
          return (
            <button
              key={item.id ?? itemIndex}
              type="button"
              ref={(n) => registerCard(itemIndex, n)}
              data-flip-id={`hxs-card-${item.id ?? itemIndex}`}
              onClick={() => (opened ? select(itemIndex) : open())}
              aria-label={
                opened ? item.alt ?? item.caption ?? `Solução ${itemIndex + 1}` : `Ver Solução ${itemIndex + 1}`
              }
              aria-current={(opened && isHero) || undefined}
              tabIndex={!opened ? (itemIndex === order[0] ? 0 : -1) : isHero ? -1 : 0}
              className={`p-0 border-none bg-slate-900 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 transition-all ${
                !opened || !isHero ? "cursor-pointer hover:border-[#FFD400]/60 hover:scale-[1.02]" : "cursor-default"
              }`}
              style={cardStyle(itemIndex)}
            >
              <img
                src={item.image}
                alt={item.alt ?? ""}
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover rounded-[inherit]"
              />
              {!isHero && (
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[11px] font-black text-white truncate drop-shadow">
                    {item.title}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
