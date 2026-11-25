import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Clock, Heart, House, ShieldCheck, Utensils } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * פתיחת דף הבית של לב חב"ד רמב"ם.
 * דסקטופ (מ־1025px): תמונות אמיתיות שמתחלפות כל 6 שניות עם זום עדין.
 * מובייל (עד 1024px): סרטון רץ, ערוך מסעודת השבת ומפעילות הילדים. נטען רק במובייל.
 * כל הצבעים מגיעים מהטוקנים ב־index.css. נכסים ב־public/hero.
 */

const SLIDES = ["/hero/hero-1.jpg", "/hero/hero-2.jpg", "/hero/hero-3.jpg", "/hero/hero-4.jpg", "/hero/hero-5.jpg"];
const VIDEO_SRC = "/hero/hero-mobile.mp4";
const VIDEO_POSTER = "/hero/hero-mobile-poster.jpg";
const SLIDE_MS = 6000;

type TrustItem = { title: string; sub: string; icon: LucideIcon };

/* לאישור הלקוח: הנתונים מגיעים מטופס האירוח ומהכתבות */
const TRUST: TrustItem[] = [
  { title: "8 יחידות אירוח", sub: 'חצי דקה מהכניסה לרמב"ם', icon: House },
  { title: "סעודות שבת וחג", sub: "מהדרין, פתוחות לכל המשפחות", icon: Utensils },
  { title: "זמינים בכל שעה", sub: "ליווי מאושפזים ובני משפחה", icon: Clock },
  { title: 'חלק מרשת לב חב"ד', sub: "פעילים בבתי החולים בכל הארץ", icon: ShieldCheck },
];

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

const btnBase =
  "inline-flex min-h-14 items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-lg font-medium leading-tight transition-[background-color,color,box-shadow] duration-300 ease-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent motion-reduce:transition-none";

export default function HomeHero() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [active, setActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isMobile || reduceMotion) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [isMobile, reduceMotion]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isMobile && !reduceMotion) v.play().catch(() => undefined);
    else v.pause();
  }, [isMobile, reduceMotion]);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100dvh-var(--header-h))] flex-col overflow-hidden bg-brand-deep text-white"
    >
      {/* רקע: תמונות בדסקטופ, סרטון במובייל */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {!isMobile &&
          SLIDES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              width={1600}
              height={1200}
              loading={i === 0 ? "eager" : "lazy"}
              className={cn(
                "absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[1400ms] ease-brand motion-reduce:transition-none",
                i === active && "opacity-100 motion-safe:animate-kenburns",
              )}
            />
          ))}
        {isMobile && (
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            muted
            loop
            playsInline
            autoPlay={!reduceMotion}
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>

      {/* הצללה בגוון בורדו כהה, חזקה יותר למטה */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_48%,hsl(var(--brand-deep)/0.35),transparent_70%),linear-gradient(180deg,hsl(var(--brand-deep)/0.6)_0%,hsl(var(--brand-deep)/0.55)_45%,hsl(var(--brand-deep)/0.9)_100%)] max-[1024px]:bg-[linear-gradient(180deg,hsl(var(--brand-deep)/0.25)_0%,hsl(var(--brand-deep)/0.35)_35%,hsl(var(--brand-deep)/0.92)_72%,hsl(var(--brand-deep)/0.97)_100%)]"
      />

      <div className="mx-auto flex w-full max-w-[1300px] flex-1 flex-col items-center justify-end gap-[15px] px-5 pb-6 pt-[120px] text-center min-[1025px]:justify-center min-[1025px]:gap-5 min-[1025px]:px-[5vw] min-[1025px]:pb-12 min-[1025px]:pt-16">

        <p className="text-[17px] font-medium text-white desktop:text-xl">
          לב חב"ד בקריה הרפואית רמב"ם
        </p>

        <h1
          id="hero-title"
          className="text-[clamp(42px,8vw,120px)] font-bold leading-[1.02] tracking-[-0.01em] [text-wrap:balance]"
        >
          בשבילכם <span className="text-accent">מכל הלב</span>
        </h1>

        {/* לאישור הלקוח */}
        <p className="max-w-[640px] text-lg font-medium leading-normal text-white/85 [text-wrap:pretty] min-[1025px]:text-xl">
          לב חב"ד, בית חב"ד של הקריה הרפואית רמב"ם. אירוח למשפחות, סעודות שבת וחג וליווי למאושפזים ולבני המשפחה, בכל יום ובכל שעה.
        </p>

        <div className="mt-2 flex w-full flex-col gap-[15px] min-[1025px]:mt-3 min-[1025px]:w-auto min-[1025px]:flex-row min-[1025px]:justify-center">
          <a href="#help" className={cn(btnBase, "group bg-accent text-accent-foreground hover:bg-accent-hover")}>
            <span>צריכים עזרה?</span>
            <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-6 transition-transform duration-300 ease-brand group-hover:-translate-x-1" />
          </a>
          <a
            href="/donate/"
            className={cn(btnBase, "bg-transparent text-white shadow-[inset_0_0_0_1px_white] hover:bg-white hover:text-brand-deep hover:shadow-none")}
          >
            <span>לתמיכה ולתרומה</span>
            <Heart aria-hidden="true" strokeWidth={1.5} className="size-6" />
          </a>
        </div>
      </div>

      {/* גורמי אמון */}
      <ul
        aria-label="למה לסמוך עלינו"
        className="mx-5 mb-7 grid grid-cols-2 border-t border-white/20 min-[1025px]:mx-auto min-[1025px]:mb-0 min-[1025px]:w-[calc(100%-10vw)] min-[1025px]:max-w-[1300px] min-[1025px]:grid-cols-4"
      >
        {TRUST.map(({ title, sub, icon: Icon }, i) => (
          <li
            key={title}
            className={cn(
              "flex items-center justify-start gap-2.5 py-3 text-right",
              i % 2 === 1 && "pr-3 shadow-[inset_-1px_0_0_rgb(255_255_255/0.18)]",
              i >= 2 && "border-t border-white/20",
              "min-[1025px]:justify-center min-[1025px]:gap-3.5 min-[1025px]:border-t-0 min-[1025px]:px-4 min-[1025px]:pb-8 min-[1025px]:pt-6",
              i > 0 ? "min-[1025px]:shadow-[inset_-1px_0_0_rgb(255_255_255/0.18)]" : "min-[1025px]:shadow-none",
            )}
          >
            {/* RTL: הטקסט קודם, האייקון אחריו (משמאל) */}
            <span>
              <span className="block text-[15px] font-bold leading-tight min-[1025px]:text-lg">{title}</span>
              <span className="hidden text-sm font-medium leading-snug text-white/85 min-[1025px]:block">{sub}</span>
            </span>
            <Icon aria-hidden="true" strokeWidth={1.5} className="size-6 shrink-0 text-accent min-[1025px]:size-8" />
          </li>
        ))}
      </ul>
    </section>
  );
}
