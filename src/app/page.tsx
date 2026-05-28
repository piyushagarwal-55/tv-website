"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  BadgePercent,
  CheckCircle2,
  ChevronDown,
  Contrast,
  Cpu,
  Gamepad2,
  Headphones,
  LayoutGrid,
  Maximize2,
  Menu,
  MonitorPlay,
  Palette,
  Play,
  Search,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  Truck,
  User,
  Volume2,
  X,
  Zap,
} from "lucide-react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";

const heroSlides = [
  {
    eyebrow: "New 2026 flagship",
    title: "Micro RGB",
    copy: "Color, contrast, and motion tuned for rooms that deserve a cinema-grade screen.",
    image: "/theme-image-1751531018630.avif",
    accent: "#4df1ff",
  },
  {
    eyebrow: "Mini LED brilliance",
    title: "Maximum wow.",
    copy: "Tiny lights, precise control, and a refined profile for bright everyday viewing.",
    image: "/HE_HD01_MiniLed_KV_DT.avif",
    accent: "#ffe06b",
  },
  {
    eyebrow: "8K AI upscaling",
    title: "Neo QLED 8K",
    copy: "Edge-to-edge detail with a neural processor that makes every source feel intentional.",
    image: "/2025_tvs_pcd_f04_neo_qled_8k_pc.avif",
    accent: "#a8c7ff",
  },
];

const categories = [
  { label: "Micro RGB", image: "/theme-image-1721990032113.avif" },
  { label: "Mini LED", image: "/HE_HD01_MiniLed_KV_DT.avif" },
  { label: "Neo QLED 8K", image: "/2025_tvs_pcd_f04_neo_qled_8k_pc.avif" },
  { label: "OLED", image: "/2025_tvs_pcd_f05_oled_pc.avif" },
  { label: "Neo QLED", image: "/2025_tvs_pcd_f06_neo_qled_pc.avif" },
  { label: "Lifestyle TVs", image: "/2025_tvs_pcd_f09_the_frame_pc.jpg" },
];

const finderCards = [
  {
    title: "Neo QLED 8K TV",
    copy: "Deep contrast and sharp 8K detail for the most cinematic room.",
    image: "/PCP_TV_NC_rightype_QNED_3July2025_ss2xke.webp",
  },
  {
    title: "OLED TV",
    copy: "Pure blacks, rich highlights, and fast motion in a slim profile.",
    image: "/PCP_TV_NC_rightype_OLEDTV_15may2023_o2ioff.webp",
  },
  {
    title: "Neo QLED TV",
    copy: "Mini LED brightness that keeps glare under control.",
    image: "/PCP_TV_NC_rightype_QLED_15may2023_yzotzq.webp",
  },
  {
    title: "QLED TV",
    copy: "Long-lasting color for sports, streaming, and gaming.",
    image: "/PCP_TV_NC_rightype_QNED_3July2025_ss2xke.webp",
  },
  {
    title: "Crystal UHD TV",
    copy: "Crisp everyday 4K in a clean, minimal design.",
    image: "/PCP_TV_NC_rightype_LED_15may2023_bqpmmo.webp",
  },
  {
    title: "Lifestyle TVs",
    copy: "More than a TV. A screen designed to belong in the room.",
    image: "/2025_tvs_pcd_f09_the_frame_pc.jpg",
  },
];

const flagshipPanels = [
  {
    kicker: "Neo QLED 8K",
    title: "Cutting-edge TV for edge-of-your-seat viewing",
    copy: "Our NQ8 AI processor enhances every scene with breathtaking sharpness, dimensional contrast, and room-aware brightness.",
    image: "/2025_tvs_pcd_f04_neo_qled_8k_pc.avif",
    tone: "dark",
    specs: ["8K AI Processor", "100% Color Volume", "Anti-Reflection", "Endless Free Content"],
  },
  {
    kicker: "OLED",
    title: "Infinite blacks with self-lit display",
    copy: "Self-lit pixels deliver high contrast, vivid detail, and cinematic depth from every seat.",
    image: "/2025_tvs_pcd_f05_oled_pc.avif",
    tone: "light",
    specs: ["OLED HDR", "Glare Free", "AI Upscaling", "Motion Xcelerator"],
  },
  {
    kicker: "Neo QLED",
    title: "No more watching in the dark",
    copy: "Quantum Mini LEDs and AI tone mapping keep the picture crisp at noon or midnight.",
    image: "/2025_tvs_pcd_f06_neo_qled_pc.avif",
    tone: "warm",
    specs: ["NQ4 AI Processor", "4K AI Upscaling", "Glare Free", "Neo Quantum HDR"],
  },
  {
    kicker: "QLED",
    title: "Brilliant, long-lasting color",
    copy: "Quantum dots preserve rich color and brightness for the shows, matches, and games you keep coming back to.",
    image: "/2025_tvs_pcd_f07_qled_pc.avif",
    tone: "dark",
    specs: ["Quantum Dot", "Real Depth Enhancer", "Gaming Hub", "SolarCell Remote"],
  },
  {
    kicker: "The Frame",
    title: "A gallery wall that turns into movie night",
    copy: "Matte display, custom bezels, and a slim wall mount make entertainment feel built in.",
    image: "/2025_tvs_pcd_f09_the_frame_pc.jpg",
    tone: "light",
    specs: ["Art Mode", "Matte Display", "Customizable Frame", "Slim-Fit Wall Mount"],
  },
];

const shopGroups = {
  budget: {
    label: "Budget",
    cards: [
      { title: "Under Rs.30,000", image: "/PCP_TV_NC_budget_A30_000_15may2023_c7p7n4.webp" },
      { title: "Rs.30,001 to Rs.50,000", image: "/PCP_TV_NC_budget_30K50K_15may2023_uk217z.webp" },
      { title: "Rs.50,001 to Rs.70,000", image: "/PCP_TV_NC_budget_50-70_16July25_UEXKDxx8ky.png" },
      { title: "Rs.70,001 to Rs.1L", image: "/PCP_TV_NC_budget_70-1L_16July25_8aOoIqeHmr.png" },
    ],
  },
  resolution: {
    label: "Resolution",
    cards: [
      { title: "8K Ultra Premium", image: "/PCP_TV_NC_resolution_8K_15may2023_hjfao2.webp" },
      { title: "4K Ultra HD", image: "/PCP_TV_NC_resolution_4K_15may2023_ergxmc.webp" },
      { title: "Full HD", image: "/PCP_TV_NC_resolution_FHD_15may2023_tarlsi.webp" },
      { title: "HD Ready", image: "/PCP_TV_NC_resolution_HDReady_25Oct2023_ph52zv.webp" },
    ],
  },
  platform: {
    label: "Smart OS",
    cards: [
      { title: "Tizen TV", image: "/PCP_TV_NC_OS_tizenTV_15may2023_wsbfab.webp" },
      { title: "Google TV", image: "/PCP_TV_NC_OS_Google_Android_3July2025_ciza4l.webp" },
      { title: "webOS", image: "/PCP_TV_NC_OS_webos_15may2023_sqy31a.webp" },
      { title: "Fire TV", image: "/PCP_TV_NC_OS_firetv_15may2023_rjdkui.webp" },
    ],
  },
};

const productCards = [
  {
    name: "Samsung Neo Vision 75",
    label: "Best for cinema rooms",
    price: "From Rs.1,49,990",
    image: "/section13_slider1.png",
  },
  {
    name: "Samsung OLED Aura",
    label: "Self-lit contrast",
    price: "From Rs.1,24,990",
    image: "/d7f9f40f5d8c2ff7efad2091074f8da7.webp",
  },
  {
    name: "Samsung Sports Pro",
    label: "Smooth motion and glare control",
    price: "From Rs.74,990",
    image: "/7be4b70170ee98eb5321860f53915511.webp",
  },
  {
    name: "Samsung Mini LED Max",
    label: "Bright-room favorite",
    price: "From Rs.89,990",
    image: "/section13_slider3.png",
  },
];

const serviceItems = [
  { icon: ShieldCheck, title: "Samsung Care+", copy: "Extended support, priority repair, and accidental damage options." },
  { icon: Truck, title: "Free delivery", copy: "Scheduled doorstep delivery with premium installation guidance." },
  { icon: Headphones, title: "Expert setup", copy: "Get help choosing the right size, mount, soundbar, and room layout." },
];

const featureIcons = [
  { icon: Cpu, label: "AI processor" },
  { icon: Contrast, label: "Deep contrast" },
  { icon: Volume2, label: "Adaptive sound" },
  { icon: Gamepad2, label: "Gaming hub" },
  { icon: Sun, label: "Glare control" },
];

type ShopKey = keyof typeof shopGroups;

function SamsungLogo({ className = "text-black" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center text-[20px] font-extrabold tracking-[0.18em] ${className}`}>
      SAMSUNG
    </span>
  );
}

function IconButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full text-black transition hover:bg-black/[0.06]"
      type="button"
    >
      {children}
    </button>
  );
}

export default function TvStorefront() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeHero, setActiveHero] = useState(0);
  const [showRegion, setShowRegion] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopKey, setShopKey] = useState<ShopKey>("budget");
  const activeSlide = heroSlides[activeHero];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setActiveHero((index) => (index + 1) % heroSlides.length);
    }, 8000);

    return () => window.clearInterval(timer);
  }, []);

  useGSAP(
    () => {
      const root = mainRef.current;
      if (!root) return;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(
          ".nav-shell, .hero-copy > *, .category-chip, .reveal, .finder-card, .compare-card, .shop-card, .service-item, .flagship-copy > *",
          { opacity: 1, y: 0, scale: 1 },
        );
        return;
      }

      gsap.fromTo(
        ".nav-shell",
        { y: -22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
      );

      gsap.fromTo(
        ".hero-copy > *",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: "power3.out", delay: 0.18 },
      );

      gsap.fromTo(
        ".category-chip",
        { y: 28, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.06, ease: "back.out(1.4)", delay: 0.35 },
      );

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });

      ScrollTrigger.batch(".finder-card, .compare-card, .shop-card, .service-item", {
        start: "top 86%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 34, opacity: 0, scale: 0.98 },
            { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.06, ease: "power2.out" },
          );
        },
        once: true,
      });

      gsap.utils.toArray<HTMLElement>(".flagship-panel").forEach((panel) => {
        const copy = panel.querySelectorAll(".flagship-copy > *");

        gsap.fromTo(
          copy,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: panel, start: "top 72%" },
          },
        );
      });

      const mediaMotion = gsap.matchMedia();

      mediaMotion.add("(min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>(".flagship-panel").forEach((panel) => {
          const image = panel.querySelector(".flagship-image");
          if (!image) return;
          gsap.fromTo(
            image,
            { yPercent: -3, scale: 1.035 },
            {
              yPercent: 3,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.35,
              },
            },
          );
        });

        gsap.to(".cinema-screen", {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: "#cinema",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.45,
          },
        });

        gsap.to(".marquee-strip", {
          xPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: "#shop",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });

      return () => mediaMotion.revert();
    },
    { scope: mainRef },
  );

  return (
    <div ref={mainRef} className="min-h-screen bg-[#f5f5f2] text-black">
      <header className="nav-shell fixed inset-x-0 top-0 z-50 border-b border-black/8 bg-white/92 backdrop-blur-2xl">
        {showRegion && (
          <div className="hidden items-center justify-between gap-4 border-b border-black/8 px-5 py-2 text-[12px] text-black/70 md:flex">
            <div className="flex items-center gap-3">
              <span>Choose your location and language.</span>
              <button className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 font-semibold text-black transition hover:border-black/30" type="button">
                USA <ChevronDown size={14} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-full bg-black px-4 py-1.5 text-[11px] font-bold text-white transition hover:bg-neutral-800" type="button">
                Continue
              </button>
              <IconButton label="Dismiss location bar" onClick={() => setShowRegion(false)}>
                <X size={16} />
              </IconButton>
            </div>
          </div>
        )}

        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-8">
          <a aria-label="Samsung home" className="shrink-0" href="#top">
            <SamsungLogo />
          </a>

          <nav className="hidden items-center gap-8 text-[14px] font-bold text-black/75 lg:flex">
            <a className="transition hover:text-black" href="#finder">TVs</a>
            <a className="transition hover:text-black" href="#flagships">Featured</a>
            <a className="transition hover:text-black" href="#shop">Shop</a>
            <a className="transition hover:text-black" href="#care">Support</a>
          </nav>

          <div className="flex items-center gap-1">
            <IconButton label="Search">
              <Search size={20} />
            </IconButton>
            <IconButton label="Cart">
              <ShoppingCart size={20} />
            </IconButton>
            <IconButton label="Account">
              <User size={20} />
            </IconButton>
            <IconButton label="Open menu" onClick={() => setMenuOpen(true)}>
              <Menu size={22} />
            </IconButton>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute inset-x-0 top-full border-t border-black/8 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.12)] lg:hidden">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm font-semibold">Explore Samsung Vision</span>
              <IconButton label="Close menu" onClick={() => setMenuOpen(false)}>
                <X size={18} />
              </IconButton>
            </div>
            <div className="grid gap-2 text-[15px] font-bold">
              {["TVs", "Featured", "Shop", "Support"].map((item) => (
                <a
                  className="rounded-lg border border-black/8 px-4 py-3 transition hover:border-black/20 hover:bg-black/[0.03]"
                  href={`#${item === "TVs" ? "finder" : item === "Featured" ? "flagships" : item === "Support" ? "care" : item.toLowerCase()}`}
                  key={item}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main id="top" className="pt-16 md:pt-[104px]">
        <section className="border-b border-black/8 bg-white">
          <div className="tv-scrollbar mx-auto flex max-w-[1440px] gap-3 overflow-x-auto px-4 py-4 md:px-8">
            {categories.map((category) => (
              <a
                className="category-chip group grid min-w-[132px] gap-3 rounded-lg bg-[#f4f4f4] p-3 text-center transition hover:bg-black hover:text-white md:min-w-[156px]"
                href="#flagships"
                key={category.label}
              >
                <span className="relative mx-auto h-16 w-full overflow-hidden rounded-md bg-white">
                  <Image
                    alt=""
                    className="object-cover transition duration-500 group-hover:scale-110"
                    fill
                    sizes="160px"
                    src={category.image}
                  />
                </span>
                <span className="text-[12px] font-semibold md:text-[13px]">{category.label}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="hero-panel relative isolate min-h-[720px] overflow-hidden bg-black text-white md:min-h-[calc(100svh-104px)]">
          <Image
            alt=""
            className="hero-image-active absolute inset-0 object-cover"
            fill
            key={activeSlide.title}
            priority={activeHero === 0}
            quality={82}
            sizes="100vw"
            src={activeSlide.image}
          />
          <div className="noise-layer" />
          <div className="relative z-10 mx-auto flex min-h-[720px] max-w-[1440px] flex-col justify-end px-5 pb-8 pt-20 md:min-h-[calc(100svh-104px)] md:px-10 md:pb-12">
            <div className="hero-copy max-w-[680px] pb-10 md:pb-16">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/8 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
                <Sparkles size={15} style={{ color: activeSlide.accent }} />
                {activeSlide.eyebrow}
              </p>
              <h1 className="text-balance text-[54px] font-extrabold leading-[0.92] tracking-[-0.025em] sm:text-[76px] lg:text-[112px]">
                {activeSlide.title}
              </h1>
              <p className="mt-6 max-w-xl text-[17px] font-medium leading-8 text-white/74 md:text-[20px]">
                {activeSlide.copy}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a className="rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-black transition hover:bg-white/88" href="#shop">
                  Shop now
                </a>
                <a className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-white/10" href="#cinema">
                  Watch film <Play size={16} fill="currentColor" />
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between gap-5 border-t border-white/15 pt-5">
              <div className="flex gap-2">
                {heroSlides.map((slide, index) => (
                  <button
                    aria-label={`Show ${slide.title}`}
                    className={`h-2 rounded-full transition-all ${index === activeHero ? "w-10 bg-white" : "w-2 bg-white/35 hover:bg-white/70"}`}
                    key={slide.title}
                    onClick={() => setActiveHero(index)}
                    type="button"
                  />
                ))}
              </div>
              <div className="hidden items-center gap-3 text-[12px] font-bold uppercase tracking-[0.22em] text-white/55 md:flex">
                <span>AI picture</span>
                <span className="h-1 w-1 rounded-full bg-white/40" />
                <span>Quantum color</span>
                <span className="h-1 w-1 rounded-full bg-white/40" />
                <span>Premium audio</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24" id="finder">
          <div className="mx-auto max-w-[1240px] px-5 md:px-8">
            <div className="reveal mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.24em] text-[#0b5cff]">Guided discovery</p>
              <h2 className="text-balance text-[38px] font-bold leading-[1.03] tracking-[-0.02em] md:text-[64px]">
                Discover the Samsung TV that&apos;s right for you
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {finderCards.map((card) => (
                <article className="finder-card magnetic-card rounded-lg border border-black/8 bg-[#f8f8f8] p-3 text-center" key={card.title}>
                  <div className="relative mb-4 aspect-[1.18] overflow-hidden rounded-md bg-white">
                    <Image alt="" className="object-contain p-2" fill sizes="220px" src={card.image} />
                  </div>
                  <h3 className="text-[14px] font-semibold leading-tight md:text-[16px]">{card.title}</h3>
                  <p className="mx-auto mt-2 max-w-[160px] text-[11px] font-medium leading-5 text-black/62 md:text-[12px]">
                    {card.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#efefeb] py-10 md:py-16" id="flagships">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <div className="reveal mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.24em] text-black/45">Featured screens</p>
                <h2 className="text-balance text-[42px] font-bold leading-[1] tracking-[-0.02em] md:text-[76px]">
                  Big moments, made clean.
                </h2>
              </div>
              <p className="max-w-sm text-[15px] font-semibold leading-7 text-black/58">
                A curated lineup for cinematic rooms, bright apartments, art walls, gaming corners, and everyday streaming.
              </p>
            </div>

            <div className="grid gap-5 md:gap-7">
              {flagshipPanels.map((panel) => (
                <article
                  className={`flagship-panel relative isolate min-h-[680px] overflow-hidden rounded-[28px] ${
                    panel.tone === "dark" ? "bg-black text-white" : panel.tone === "warm" ? "bg-[#e6dcca] text-black" : "bg-white text-black"
                  }`}
                  key={panel.title}
                >
                  <Image
                    alt=""
                    className={`flagship-image object-cover ${panel.tone === "dark" ? "opacity-[0.82]" : "opacity-[0.96]"}`}
                    fill
                    quality={84}
                    sizes="100vw"
                    src={panel.image}
                  />
                  <div
                    className={`absolute inset-0 ${
                      panel.tone === "dark"
                        ? "bg-gradient-to-b from-black/72 via-black/20 to-black/78"
                        : "bg-gradient-to-b from-white/82 via-white/22 to-white/78"
                    }`}
                  />
                  <div className="flagship-copy relative z-10 mx-auto flex min-h-[680px] max-w-5xl flex-col items-center justify-between px-5 py-10 text-center md:py-14">
                    <div>
                      <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.24em] opacity-70">{panel.kicker}</p>
                      <h3 className="text-balance text-[36px] font-bold leading-[1.02] tracking-[-0.02em] md:text-[62px]">
                        {panel.title}
                      </h3>
                      <p className={`mx-auto mt-5 max-w-2xl text-[15px] font-semibold leading-7 ${panel.tone === "dark" ? "text-white/72" : "text-black/62"}`}>
                        {panel.copy}
                      </p>
                      <div className="mt-7 flex justify-center gap-3">
                        <a className={`${panel.tone === "dark" ? "bg-white text-black hover:bg-white/88" : "bg-black text-white hover:bg-neutral-800"} rounded-full px-5 py-2.5 text-[13px] font-semibold transition`} href="#shop">
                          Shop now
                        </a>
                        <a className={`${panel.tone === "dark" ? "border-white/25 text-white hover:bg-white/10" : "border-black/12 text-black hover:bg-black/5"} rounded-full border px-5 py-2.5 text-[13px] font-semibold transition`} href="#compare">
                          Learn more
                        </a>
                      </div>
                    </div>

                    <div className={`grid w-full grid-cols-2 gap-2 rounded-lg ${panel.tone === "dark" ? "bg-black/35 text-white" : "bg-white/68 text-black"} p-2 backdrop-blur md:grid-cols-4`}>
                      {panel.specs.map((spec) => (
                        <div className="flex min-h-16 flex-col items-center justify-center gap-2 rounded-md border border-current/10 px-3 py-3" key={spec}>
                          <CheckCircle2 size={18} />
                          <span className="text-center text-[11px] font-medium leading-4">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-black py-20 text-white md:py-28" id="cinema">
          <div className="mx-auto grid max-w-[1320px] gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="reveal">
              <p className="mb-4 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.24em] text-white/48">
                <MonitorPlay size={18} /> Motion experience
              </p>
              <h2 className="text-balance text-[44px] font-bold leading-[1] tracking-[-0.02em] md:text-[72px]">
                A picture that feels alive before you press play.
              </h2>
              <p className="mt-6 max-w-md text-[16px] font-medium leading-8 text-white/62">
                Auto low-latency mode, AI sound, and controlled highlights make sports, movies, and games feel less flat and more present.
              </p>
              <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
                {featureIcons.map(({ icon: Icon, label }) => (
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4" key={label}>
                    <Icon className="mb-4 text-white/80" size={22} />
                    <p className="text-[13px] font-semibold">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="cinema-screen reveal relative">
              <div className="relative overflow-hidden rounded-lg border-[10px] border-neutral-900 bg-neutral-950 shadow-[0_40px_140px_rgba(69,104,255,0.28)]">
                <video
                  aria-label="Premium TV picture demo"
                  autoPlay
                  className="aspect-video h-full w-full object-cover"
                  loop
                  muted
                  playsInline
                  src="/mi-tv-4x-65-video.mp4"
                />
              </div>
              <div className="mx-auto h-5 w-56 rounded-b-full bg-neutral-900" />
              <div className="soft-pulse absolute -bottom-8 left-1/2 h-10 w-[72%] -translate-x-1/2 rounded-full bg-[#316bff]/35 blur-3xl" />
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24" id="compare">
          <div className="mx-auto max-w-[1260px] px-5 md:px-8">
            <div className="reveal mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.24em] text-[#0b5cff]">Shop by fit</p>
                <h2 className="text-balance text-[42px] font-bold leading-[1] tracking-[-0.02em] md:text-[70px]">
                  Pick by room, budget, or ecosystem.
                </h2>
              </div>
              <div className="flex rounded-full bg-black/[0.04] p-1">
                {(Object.keys(shopGroups) as ShopKey[]).map((key) => (
                  <button
                    className={`rounded-full px-4 py-2 text-[13px] font-semibold transition md:px-5 ${
                      shopKey === key ? "bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)]" : "text-black/56 hover:text-black"
                    }`}
                    key={key}
                    onClick={() => setShopKey(key)}
                    type="button"
                  >
                    {shopGroups[key].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {shopGroups[shopKey].cards.map((card) => (
                <article className="compare-card magnetic-card rounded-lg border border-black/8 bg-[#f6f6f3] p-4" key={card.title}>
                  <div className="image-sheen relative mb-5 aspect-[1.45] overflow-hidden rounded-md bg-white">
                    <Image alt="" className="object-cover" fill sizes="320px" src={card.image} />
                  </div>
                  <h3 className="text-[18px] font-semibold">{card.title}</h3>
                  <div className="mt-5 flex items-center justify-between border-t border-black/8 pt-4">
                    <span className="text-[12px] font-bold text-black/50">Explore models</span>
                    <ArrowRight size={18} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#efefeb] py-20 md:py-28" id="shop">
          <div className="mx-auto max-w-[1440px] px-5 md:px-8">
            <div className="reveal mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.24em] text-black/45">Featured deals</p>
                <h2 className="text-balance text-[44px] font-bold leading-[1] tracking-[-0.02em] md:text-[82px]">
                  Premium screens. Store-ready flow.
                </h2>
              </div>
              <a className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-neutral-800" href="#care">
                Compare benefits <ArrowRight size={17} />
              </a>
            </div>

            <div className="marquee-strip">
              <div className="grid min-w-[1080px] grid-cols-4 gap-5 lg:min-w-0">
                {productCards.map((product) => (
                  <article className="shop-card rounded-lg border border-black/8 bg-white p-4" key={product.name}>
                    <div className="image-sheen relative mb-5 aspect-[1.3] overflow-hidden rounded-md bg-[#f5f5f2]">
                      <Image alt="" className="object-cover transition duration-700 hover:scale-105" fill sizes="360px" src={product.image} />
                    </div>
                    <div className="flex items-center gap-1 text-[#f59e0b]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star fill="currentColor" key={index} size={14} />
                      ))}
                    </div>
                    <h3 className="mt-4 text-[22px] font-bold tracking-[-0.01em]">{product.name}</h3>
                    <p className="mt-1 text-[13px] font-semibold text-black/52">{product.label}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-black/8 pt-4">
                      <p className="text-[14px] font-semibold">{product.price}</p>
                      <button className="rounded-full bg-black px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-neutral-800" type="button">
                        Add
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-[1320px] px-5 md:px-8">
            <div className="grid gap-5 lg:grid-cols-2">
              <article className="reveal relative min-h-[520px] overflow-hidden rounded-[28px] bg-black text-white">
                <Image alt="" className="object-cover opacity-85" fill sizes="50vw" src="/section13_slider3.png" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/62 via-transparent to-black/72" />
                <div className="relative z-10 flex min-h-[520px] flex-col justify-between p-6 md:p-10">
                  <div>
                    <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.24em] text-white/55">Living room ready</p>
                    <h2 className="max-w-lg text-[42px] font-bold leading-[1] tracking-[-0.02em] md:text-[64px]">
                      Designed to become part of the room.
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["Slim profile", "Cable clean", "Wall mount", "Room calibrated"].map((item) => (
                      <div className="rounded-lg border border-white/12 bg-white/8 p-4 backdrop-blur" key={item}>
                        <p className="text-[13px] font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              <article className="reveal relative min-h-[520px] overflow-hidden rounded-[28px] bg-[#f1eee6] text-black">
                <Image alt="" className="object-cover" fill sizes="50vw" src="/2025_tvs_pcd_f09_the_frame_pc.jpg" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/72 via-white/18 to-white/86" />
                <div className="relative z-10 flex min-h-[520px] flex-col justify-between p-6 md:p-10">
                  <div>
                    <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.24em] text-black/45">Art Mode</p>
                    <h2 className="max-w-lg text-[42px] font-bold leading-[1] tracking-[-0.02em] md:text-[64px]">
                      Switch from gallery to game night instantly.
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[Palette, LayoutGrid, Maximize2, SlidersHorizontal].map((Icon, index) => (
                      <div className="grid h-14 w-14 place-items-center rounded-lg border border-black/10 bg-white/72 backdrop-blur" key={index}>
                        <Icon size={22} />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f5f2] py-20 md:py-28" id="care">
          <div className="mx-auto max-w-[1260px] px-5 md:px-8">
            <div className="reveal mb-10 text-center">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.24em] text-[#0b5cff]">Care and delivery</p>
              <h2 className="text-balance text-[42px] font-bold leading-[1] tracking-[-0.02em] md:text-[72px]">
                Premium after the checkout, too.
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="reveal relative min-h-[420px] overflow-hidden rounded-[28px] bg-white">
                <Image alt="" className="object-cover" fill sizes="60vw" src="/SamsungCare_PCD_DT.avif" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/88 via-white/50 to-transparent" />
                <div className="relative z-10 flex min-h-[420px] max-w-lg flex-col justify-center p-7 md:p-10">
                  <BadgePercent className="mb-5 text-[#0b5cff]" size={34} />
                  <h3 className="text-[36px] font-bold leading-[1] tracking-[-0.02em] md:text-[56px]">Bundle comfort with confidence.</h3>
                  <p className="mt-5 text-[15px] font-semibold leading-7 text-black/58">
                    Add Samsung Care+, installation support, and expert recommendations for a calmer premium purchase.
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {serviceItems.map(({ icon: Icon, title, copy }) => (
                  <article className="service-item rounded-lg border border-black/8 bg-white p-5" key={title}>
                    <Icon className="mb-5 text-[#0b5cff]" size={28} />
                    <h3 className="text-[22px] font-bold tracking-[-0.01em]">{title}</h3>
                    <p className="mt-2 text-[14px] font-semibold leading-6 text-black/55">{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-black py-16 text-white md:py-20">
          <div className="absolute inset-y-0 right-0 w-1/2 opacity-45">
            <Image alt="" className="object-cover" fill sizes="50vw" src="/60f5093538cde257d0121e39ccb68bd1.webp" />
          </div>
          <div className="relative z-10 mx-auto flex max-w-[1260px] flex-col justify-between gap-8 px-5 md:flex-row md:items-center md:px-8">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.24em] text-white/50">
                <Zap size={17} /> Samsung Vision Store
              </p>
              <h2 className="max-w-2xl text-balance text-[40px] font-bold leading-[1] tracking-[-0.02em] md:text-[68px]">
                Make the whole wall feel cinematic.
              </h2>
            </div>
            <a className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-black transition hover:bg-white/88" href="#top">
              Back to top <ArrowRight size={17} />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#050505] px-5 py-10 text-white md:px-8">
        <div className="mx-auto flex max-w-[1260px] flex-col justify-between gap-8 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <div>
            <SamsungLogo className="text-white" />
            <p className="mt-3 max-w-md text-[13px] font-medium leading-6 text-white/45">
              Cinematic screens, expert care, and a calmer way to choose the TV that belongs in your space.
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-[13px] font-bold text-white/55">
            <a className="hover:text-white" href="#finder">TV Finder</a>
            <a className="hover:text-white" href="#flagships">Flagships</a>
            <a className="hover:text-white" href="#shop">Shop</a>
            <a className="hover:text-white" href="#care">Care</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
