import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import QuotesCarousel from "@/components/QuotesCarousel";

/**
 * "רגעים של אור": רצועה כהה עם 4 רילס אמיתיים וכרטיס סיפור משפחה.
 * דסקטופ: ריחוף מנגן בלי קול. לחיצה (בכל מסך) פותחת נגן במסך מלא עם קול ופקדים מקוריים, כולל הגדלה.
 * מובייל: גלילה אופקית עם snap. הנגן נסגר ב־X, בלחיצה על הרקע או ב־Escape.
 * נכסים ב־public/moments. הביקורות ב־QuotesCarousel.
 */

type Reel = { id: string; title: string };
const REELS: Reel[] = [
  { id: "shabbat-prep", title: "הכנות לסעודת שבת" },
  { id: "kids-day", title: "יום של שמחה במחלקת הילדים" },
  { id: "big-meal", title: "סעודה גדולה למשפחות המאושפזים" },
  { id: "patient-kit", title: "ערכה לכל מאושפז" },
];

/* הלב מהלוגו, חד צבעי. שתי קשתות ו־V */
const HEART_VB = "428.45 222.45 130.15 120.86";
const HEART = [
  "M 437.75 268.94 C 432.61 268.94 428.45 264.77 428.45 259.64 C 428.45 239.13 445.13 222.46 465.64 222.46 C 469.79 222.46 473.88 223.13 477.78 224.48 C 482.63 226.16 485.21 231.45 483.53 236.30 C 481.84 241.16 476.54 243.72 471.71 242.06 C 469.77 241.39 467.73 241.05 465.64 241.05 C 455.38 241.05 447.04 249.39 447.04 259.64 C 447.04 264.77 442.89 268.94 437.75 268.94",
  "M 493.54 268.94 C 493.05 268.94 492.56 268.90 492.07 268.82 C 487 268.02 483.54 263.25 484.35 258.18 C 487.74 236.81 502.64 222.46 521.41 222.46 C 541.92 222.46 558.60 239.13 558.60 259.64 C 558.60 264.77 554.44 268.94 549.30 268.94 C 544.16 268.94 540.00 264.77 540.00 259.64 C 540.00 249.39 531.66 241.05 521.41 241.05 C 509.97 241.05 504.24 251.40 502.70 261.10 C 501.98 265.67 498.02 268.94 493.54 268.94",
  "M 493.52 343.30 C 491.51 343.30 489.48 342.64 487.81 341.33 C 481.73 336.59 428.45 294.02 428.45 259.64 C 428.45 254.51 432.61 250.34 437.75 250.34 C 442.89 250.34 447.05 254.51 447.05 259.64 C 447.05 277.07 473.55 305.23 493.52 322.04 C 513.50 305.21 540.00 277.03 540.00 259.64 C 540.00 254.51 544.16 250.34 549.30 250.34 C 554.44 250.34 558.60 254.51 558.60 259.64 C 558.60 294.02 505.32 336.59 499.24 341.33 C 497.57 342.64 495.54 343.30 493.52 343.30",
];

export default function MomentsOfLight() {
  const [open, setOpen] = useState<Reel | null>(null);
  const [canHover, setCanHover] = useState(false);
  const videos = useRef<Record<string, HTMLVideoElement | null>>({});
  const lastReel = useRef<HTMLDivElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const hover = window.matchMedia("(hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanHover(hover && !reduce);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const openPlayer = (r: Reel, el: HTMLDivElement) => {
    videos.current[r.id]?.pause();
    lastReel.current = el;
    setOpen(r);
  };
  const close = () => {
    setOpen(null);
    lastReel.current?.focus();
  };

  return (
    <section
      id="moments"
      aria-labelledby="moments-title"
      className="relative isolate overflow-hidden bg-brand-deep py-20 text-white desktop:px-[5vw] desktop:py-[8vw]"
    >
      {/* לב ענק חתוך, רקע שקט */}
      <svg
        viewBox={HEART_VB}
        fill="currentColor"
        aria-hidden="true"
        className="absolute -left-40 top-[120px] -z-10 h-auto w-[420px] text-white/[0.06] desktop:-left-[140px] desktop:top-1/2 desktop:w-[620px] desktop:-translate-y-1/2"
      >
        {HEART.map((d) => (
          <path key={d.slice(0, 12)} d={d} />
        ))}
      </svg>

      <header className="mx-auto flex max-w-[820px] flex-col items-center gap-[15px] px-5 text-center desktop:gap-5 desktop:px-0">
        <p className="inline-block rounded-sm px-3.5 py-1.5 text-sm font-bold leading-snug bg-accent text-accent-foreground desktop:px-[18px] desktop:py-2 desktop:text-base">
          רגעים של אור
        </p>
        <h2 id="moments-title" className="text-4xl font-bold leading-[1.05] [text-wrap:balance] desktop:text-[72px]">
          אתם <span className="text-accent">לא לבד</span>
        </h2>
        <p className="text-lg font-medium leading-normal text-white/85 [text-wrap:pretty] desktop:text-xl">
          רגעים קטנים מהיום יום שלנו ברמב"ם. לחצו על סרטון כדי לצפות בו בגדול ועם קול.
        </p>
      </header>

      <ul className="mx-auto mt-10 flex max-w-[1300px] snap-x snap-mandatory gap-[15px] overflow-x-auto px-5 [scrollbar-width:none] desktop:mt-16 desktop:grid desktop:grid-cols-4 desktop:overflow-visible desktop:px-0">
        {REELS.map((r) => {
          return (
            <li key={r.id} className="w-[62vw] flex-none snap-center desktop:w-auto">
              <div
                role="button"
                tabIndex={0}
                aria-label={`צפייה בסרטון במסך מלא: ${r.title}`}
                onClick={(e) => openPlayer(r, e.currentTarget)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openPlayer(r, e.currentTarget);
                  }
                }}
                onMouseEnter={() => canHover && videos.current[r.id]?.play().catch(() => undefined)}
                onMouseLeave={() => canHover && videos.current[r.id]?.pause()}
                className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-xl bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
              >
                <video
                  ref={(el) => {
                    videos.current[r.id] = el;
                  }}
                  src={`/moments/${r.id}.mp4`}
                  poster={`/moments/${r.id}.jpg`}
                  muted
                  playsInline
                  loop
                  preload="none"
                  className="absolute inset-0 h-full w-full object-cover transition-[scale] duration-500 ease-brand group-hover:[scale:1.03] motion-reduce:transition-none"
                />
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,hsl(var(--brand-deep)/0.92)_100%)]" />
                <span className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                  <span className="text-[17px] font-bold leading-tight [text-wrap:balance] desktop:text-xl">{r.title}</span>
                  {/* כפתור ניגון: סמל מדיה, לא מתהפך ב־RTL */}
                  <span className="grid size-10 flex-none place-items-center rounded-full bg-accent text-accent-foreground desktop:size-12">
                    <Play aria-hidden="true" className="size-5 fill-current" strokeWidth={1.5} />
                  </span>
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <QuotesCarousel />

      {/* נגן במסך מלא: פקדים מקוריים של הדפדפן, כולל כפתור הגדלה */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`נגן סרטון: ${open.title}`}
          onClick={(e) => e.target === e.currentTarget && close()}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-3.5 bg-[rgb(20_0_7/0.94)] p-4"
        >
          <div className="flex w-[min(100%,calc((100dvh-120px)*9/16))] items-center justify-between gap-3">
            <p className="text-lg font-bold">{open.title}</p>
            <button
              ref={closeBtn}
              type="button"
              aria-label="סגירת הסרטון"
              onClick={close}
              className="grid size-12 flex-none place-items-center rounded-full bg-accent text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-white"
            >
              <X aria-hidden="true" strokeWidth={2} className="size-6" />
            </button>
          </div>
          <video
            key={open.id}
            src={`/moments/${open.id}.mp4`}
            poster={`/moments/${open.id}.jpg`}
            controls
            autoPlay
            playsInline
            className="block aspect-[9/16] max-h-[calc(100dvh-120px)] w-[min(100%,calc((100dvh-120px)*9/16))] rounded-xl bg-black object-contain"
          />
        </div>
      )}
    </section>
  );
}
