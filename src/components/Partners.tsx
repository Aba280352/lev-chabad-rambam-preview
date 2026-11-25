import { ChevronLeft, Heart, RefreshCcw, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * "שותפים לעשייה": רצועה כהה עם 3 דרכים להצטרף. חודשית בולטת (זהב), השתיים האחרות בבורדו.
 * טקסטים וסכומים מתוך עמוד התרומה הרשמי ב־PEACH (peach-in.com/cmp/lev-chabad-rambam), שמקושר מהאינסטגרם של הלקוח.
 * מסלול התנדבות עדיין פתוח.
 */

const DONATE = "https://www.peach-in.com/cmp/lev-chabad-rambam";

type Tone = "lead" | "brand" | "light";
type Way = { title: string; text: string; cta: string; href: string; icon: LucideIcon; tone: Tone };

const TONE: Record<Tone, { card: string; icon: string; text: string; btn: string }> = {
  lead: { card: "bg-accent text-accent-foreground", icon: "bg-brand-deep/[0.08] text-primary", text: "", btn: "bg-brand-deep text-white hover:bg-primary" },
  brand: {
    card: "bg-primary text-primary-foreground",
    icon: "bg-white/[0.18] text-accent",
    text: "text-white/85",
    btn: "bg-transparent text-white shadow-[inset_0_0_0_1px_white] hover:bg-white hover:text-brand-deep hover:shadow-none",
  },
  light: {
    card: "bg-background text-foreground",
    icon: "bg-muted text-primary",
    text: "",
    btn: "bg-transparent text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary))] hover:bg-primary hover:text-primary-foreground hover:shadow-none",
  },
};

const WAYS: Way[] = [
  {
    title: "תרומה חד פעמית",
    text: "סעודת שבת למאושפז ומלווה ב־180 ₪, יום למשפחה במלונית ב־270 ₪, או יום בקפיטריית החסד ב־72 ₪.",
    cta: "לתרומה",
    href: DONATE,
    icon: Heart,
    tone: "brand",
  },
  {
    title: "מניית החסד",
    text: "שותפות חודשית של 100 ₪ שמחזיקה את הבית פתוח כל השנה: אירוח למשפחות, סעודות שבת וליווי מסביב לשעון.",
    cta: "להוראת קבע",
    href: DONATE,
    icon: RefreshCcw,
    tone: "lead",
  },
  {
    title: "התנדבות",
    text: 'ביקורים במחלקות, עזרה בסעודות ושמחה לילדים. בואו להיות חלק מהצוות של לב חב"ד ברמב"ם.',
    cta: "להצטרפות לצוות",
    href: "/donate/#volunteer",
    icon: Users,
    tone: "brand",
  },
];

const HEART_VB = "428.45 222.45 130.15 120.86";
const HEART = [
  "M 437.75 268.94 C 432.61 268.94 428.45 264.77 428.45 259.64 C 428.45 239.13 445.13 222.46 465.64 222.46 C 469.79 222.46 473.88 223.13 477.78 224.48 C 482.63 226.16 485.21 231.45 483.53 236.30 C 481.84 241.16 476.54 243.72 471.71 242.06 C 469.77 241.39 467.73 241.05 465.64 241.05 C 455.38 241.05 447.04 249.39 447.04 259.64 C 447.04 264.77 442.89 268.94 437.75 268.94",
  "M 493.54 268.94 C 493.05 268.94 492.56 268.90 492.07 268.82 C 487 268.02 483.54 263.25 484.35 258.18 C 487.74 236.81 502.64 222.46 521.41 222.46 C 541.92 222.46 558.60 239.13 558.60 259.64 C 558.60 264.77 554.44 268.94 549.30 268.94 C 544.16 268.94 540.00 264.77 540.00 259.64 C 540.00 249.39 531.66 241.05 521.41 241.05 C 509.97 241.05 504.24 251.40 502.70 261.10 C 501.98 265.67 498.02 268.94 493.54 268.94",
  "M 493.52 343.30 C 491.51 343.30 489.48 342.64 487.81 341.33 C 481.73 336.59 428.45 294.02 428.45 259.64 C 428.45 254.51 432.61 250.34 437.75 250.34 C 442.89 250.34 447.05 254.51 447.05 259.64 C 447.05 277.07 473.55 305.23 493.52 322.04 C 513.50 305.21 540.00 277.03 540.00 259.64 C 540.00 254.51 544.16 250.34 549.30 250.34 C 554.44 250.34 558.60 254.51 558.60 259.64 C 558.60 294.02 505.32 336.59 499.24 341.33 C 497.57 342.64 495.54 343.30 493.52 343.30",
];

const btn =
  "group mt-auto inline-flex min-h-14 items-center justify-center gap-2.5 self-stretch rounded-xl px-7 py-3.5 text-lg font-medium leading-tight transition-[background-color,color,box-shadow] duration-300 ease-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent desktop:self-start";

export default function Partners() {
  return (
    <section
      id="partners"
      aria-labelledby="partners-title"
      className="relative isolate overflow-hidden bg-brand-deep px-5 py-20 text-white desktop:px-[5vw] desktop:py-[8vw]"
    >
      <svg
        viewBox={HEART_VB}
        fill="currentColor"
        aria-hidden="true"
        className="absolute -bottom-20 -right-[140px] -z-10 h-auto w-[360px] text-white/[0.06] desktop:-bottom-[120px] desktop:-right-40 desktop:w-[560px]"
      >
        {HEART.map((d) => (
          <path key={d.slice(0, 12)} d={d} />
        ))}
      </svg>

      <header className="mx-auto flex max-w-[820px] flex-col items-center gap-[15px] text-center desktop:gap-5">
        <p className="inline-block rounded-sm bg-white px-3.5 py-1.5 text-sm font-bold leading-snug text-brand-deep desktop:px-[18px] desktop:py-2 desktop:text-base">
          לתמיכה ולתרומה
        </p>
        <h2 id="partners-title" className="text-4xl font-bold leading-[1.05] [text-wrap:balance] desktop:text-[72px]">
          שותפים לעשייה
        </h2>
        <p className="text-lg font-medium leading-normal text-white [text-wrap:pretty] desktop:text-xl">
          תרומתכם מאפשרת לנו להמשיך ולהיות שם עבור כל מי שזקוק לנו.{" "}
          <strong className="font-bold">100% מהתרומה מגיעים למטרה, בלי עמלה.</strong>
        </p>
      </header>

      <ul className="mx-auto mt-10 grid max-w-[1300px] grid-cols-1 gap-[15px] desktop:mt-16 desktop:grid-cols-3">
        {WAYS.map(({ title, text, cta, href, icon: Icon, tone }) => (
          <li
            key={title}
            className={cn(
              "flex flex-col gap-3.5 rounded-xl p-6 transition-[translate] duration-300 ease-brand hover:[translate:0_-4px] desktop:p-8",
              TONE[tone].card,
            )}
          >
            <span
              aria-hidden="true"
              className={cn("grid size-14 place-items-center rounded-full", TONE[tone].icon)}
            >
              <Icon strokeWidth={1.5} className="size-7" />
            </span>
            <h3 className="text-2xl font-bold leading-tight">{title}</h3>
            <p className={cn("text-lg font-medium leading-[1.45] [text-wrap:pretty]", TONE[tone].text)}>{text}</p>
            <a
              href={href}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
              className={cn(btn, TONE[tone].btn)}
            >
              <span>{cta}</span>
              <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-6 transition-transform duration-300 ease-brand group-hover:-translate-x-1" />
            </a>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-6 max-w-[1300px] text-center text-sm font-medium text-white/85">
        התרומות מוכרות לצורכי מס לפי סעיף 46 לפקודה. התשלום מאובטח במערכת PEACH.
      </p>
    </section>
  );
}
