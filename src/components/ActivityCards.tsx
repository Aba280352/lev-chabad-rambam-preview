import { useRef } from "react";
import { ChevronLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

/**
 * "הפעילות שלנו": 6 כרטיסים עם תמונות שמתחילים כערימה מסובבת במרכז
 * ונפתחים למקום שלהם בגלילה (GSAP ScrollTrigger, scrub).
 * דסקטופ (מ־1025px): 3 על 2. מובייל: עמודה, בכל כרטיס התמונה למעלה ומתחתיה כותרת, תיאור וקישור. הערימה מתחילה בראש העמודה.
 * תלויות: gsap, @gsap/react.
 */
gsap.registerPlugin(ScrollTrigger, useGSAP);

type Tone = "brand" | "light" | "deep" | "gold";
type Activity = { title: string; text: string; img: string; alt: string; link: string; href: string; tone: Tone; external?: boolean };

/* טקסטים לאישור הלקוח */
const DONATE = "https://www.peach-in.com/cmp/lev-chabad-rambam";

/* טקסטים מעמוד התרומה הרשמי ב־PEACH, חוץ מ"ליווי מאושפזים". לאישור הלקוח */
const ACTIVITIES: Activity[] = [
  {
    title: "מקום בלב",
    text: 'דירות אירוח חצי דקה מהכניסה לרמב"ם, כדי שהמשפחה תוכל להישאר קרוב ליקיריה.',
    img: "/activity/makom-balev.jpg",
    alt: "חדר אירוח במקום בלב",
    link: "לבקשת אירוח",
    href: "https://app.levchabad.org.il/register/hospitality/rambam",
    tone: "brand",
    external: true,
  },
  {
    title: "סעודות שבת וחג",
    text: "ארוחות חמות ומכובדות למאושפזים, לבני המשפחות ולצוותים, כך שאיש לא יישאר לבד בשבת ובחג.",
    img: "/activity/shabbat.jpg",
    alt: "שולחנות ערוכים לסעודת שבת",
    link: "להרשמה לסעודת שבת",
    href: "https://app.levchabad.org.il/register/shabbat-meals/rambam",
    tone: "light",
    external: true,
  },
  {
    title: "ליווי מאושפזים ומשפחות",
    text: "אנחנו כאן בכל יום ובכל שעה: ביקורים, הנחת תפילין, חגים ליד המיטה וליווי ברגעים הקשים.",
    img: "/activity/escort.jpg",
    alt: 'מתנדבת של לב חב"ד ליד מיטת מאושפז',
    link: "צריכים עזרה?",
    href: "#help",
    tone: "deep",
  },
  {
    title: 'ליווי חיילים ופצועי צה"ל',
    text: "ביקורים, חיזוק ומענה לצרכים של החיילים המאושפזים ושל בני משפחותיהם.",
    img: "/activity/soldiers.jpg",
    alt: "חיילים מסדרים פרחים לסעודת שבת",
    link: "לפרטים",
    href: "/activity/",
    tone: "light",
  },
  {
    title: "קפיטריית החסד",
    text: "פינה חמה עם שתייה וכיבוד לבני משפחות שנמצאים שעות ארוכות בבית החולים.",
    img: "/activity/cafeteria.jpg",
    alt: 'עמדת הכיבוד של לב חב"ד בבית החולים',
    link: "להקדשת יום בקפיטריה",
    href: DONATE,
    tone: "gold",
    external: true,
  },
  {
    title: "פעילות במחלקת ילדים",
    text: "הפעלות, מתנות ושמחה לילדים המאושפזים ולהוריהם.",
    img: "/activity/kids.jpg",
    alt: "פעילות יצירה עם ילדה במחלקת הילדים",
    link: "לפעילות הילדים",
    href: "/activity/",
    tone: "brand",
  },
];

/* פיזור קבוע לערימה, כדי שתיראה אותו דבר בכל טעינה */
const ROT = [-9, 6, -4, 11, -7, 5];
const JX = [-24, 18, 6, -14, 30, -8];
const JY = [10, -22, 26, -8, 14, -16];

const TONE: Record<Tone, { card: string; text: string; link: string }> = {
  brand: { card: "bg-primary text-primary-foreground", text: "text-white/85", link: "text-accent" },
  light: { card: "bg-background text-foreground", text: "", link: "text-primary" },
  deep: { card: "bg-brand-deep text-white", text: "text-white/85", link: "text-accent" },
  gold: { card: "bg-accent text-accent-foreground", text: "", link: "text-accent-foreground" },
};

export default function ActivityCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]", stage);
        const pileY = () =>
          window.innerWidth <= 1024 ? cards[0].offsetHeight / 2 + 24 : stage.clientHeight / 2;

        cards.forEach((card, i) => {
          gsap.from(card, {
            x: () => stage.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2) + JX[i],
            y: () => pileY() - (card.offsetTop + card.offsetHeight / 2) + JY[i],
            rotation: ROT[i],
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 50%", end: "top 0%", scrub: 1, invalidateOnRefresh: true },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="activity"
      aria-labelledby="activity-title"
      className="relative overflow-hidden bg-muted px-5 py-20 desktop:px-[5vw] desktop:py-[8vw]"
    >
      <header className="mx-auto flex max-w-[820px] flex-col items-center gap-[15px] text-center desktop:gap-5">
        <p className="inline-block rounded-sm px-3.5 py-1.5 text-sm font-bold leading-snug bg-primary text-primary-foreground desktop:px-[18px] desktop:py-2 desktop:text-base">
          הפעילות שלנו
        </p>
        <h2 id="activity-title" className="text-4xl font-bold leading-[1.05] [text-wrap:balance] desktop:text-[72px]">
          עם כל הלב, <span className="text-primary">לכל אחד</span>
        </h2>
        <p className="text-lg font-medium leading-normal [text-wrap:pretty] desktop:text-xl">
          אירוח, סעודות, ליווי ושמחה. כל מה שאנחנו עושים בקריה הרפואית רמב"ם, בשבילכם.
        </p>
      </header>

      <div ref={stageRef} className="relative mx-auto mt-10 grid max-w-[1300px] grid-cols-1 gap-[15px] desktop:mt-16 desktop:grid-cols-3">
        {ACTIVITIES.map((a, i) => {
          const t = TONE[a.tone];
          return (
            <article
              key={a.title}
              data-card
              style={{ zIndex: ACTIVITIES.length - i }}
              className={cn(
                "relative flex flex-col rounded-xl p-2.5 will-change-transform",
                "transition-[translate] duration-300 ease-brand hover:[translate:0_-4px] motion-reduce:transition-none",
                "desktop:p-3",
                t.card,
              )}
            >
              
              <img
                src={a.img}
                alt={a.alt}
                width={800}
                height={600}
                loading="lazy"
                className="block aspect-[4/3] h-auto w-full rounded-lg object-cover"
              />
              <div className="flex flex-1 flex-col gap-2 px-1.5 pb-1.5 pt-3.5 desktop:pt-4">
                <h3 className="text-xl font-bold leading-tight [text-wrap:balance] desktop:text-[22px]">{a.title}</h3>
                <p className={cn("text-[15px] font-medium leading-[1.45] [text-wrap:pretty] desktop:text-base", t.text)}>{a.text}</p>
                <a
                  href={a.href}
                  {...(a.external ? { target: "_blank", rel: "noopener" } : {})}
                  className={cn("group mt-auto inline-flex items-center gap-1.5 pt-1 text-[15px] font-bold desktop:pt-2 desktop:text-base", t.link)}
                >
                  {a.link}
                  <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-5 transition-transform duration-300 ease-brand group-hover:-translate-x-1" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
