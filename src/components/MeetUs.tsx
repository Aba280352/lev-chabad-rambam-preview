import { Anchor, ChevronLeft, Clock, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * "נעים להכיר": הרב שמואל וחנה טורקוב. רקע לבן, תמונה עם סימן הלב המלא, טקסט, 3 עובדות וכפתור.
 * טקסט מתוך כתבות מ־2024 (AFORAM, מקור ראשון). לאישור הלקוח, וכן לאמת שהתמונה היא של הרב טורקוב.
 * חסרה תמונה של הרב וחנה יחד: כשתגיע, להחליף את /about/turkov.jpg.
 */

type Fact = { title: string; sub: string; icon: LucideIcon };
const FACTS: Fact[] = [
  { title: "יוצא חיל הים", sub: 'ומשם לשליחות ברמב"ם', icon: Anchor },
  { title: "מסביב לשעון", sub: "ליווי ושיחות גם בלילה", icon: Clock },
  { title: "קצין רב במילואים", sub: "לצד פצועים ומשפחות", icon: ShieldCheck },
];

/* הלב מהלוגו בצבעים המקוריים. הסימן המלא מופיע פעם אחת במסך */
const HEART_VB = "428.45 222.45 130.15 120.86";
const HEART_TOP = [
  "M 437.75 268.94 C 432.61 268.94 428.45 264.77 428.45 259.64 C 428.45 239.13 445.13 222.46 465.64 222.46 C 469.79 222.46 473.88 223.13 477.78 224.48 C 482.63 226.16 485.21 231.45 483.53 236.30 C 481.84 241.16 476.54 243.72 471.71 242.06 C 469.77 241.39 467.73 241.05 465.64 241.05 C 455.38 241.05 447.04 249.39 447.04 259.64 C 447.04 264.77 442.89 268.94 437.75 268.94",
  "M 493.54 268.94 C 493.05 268.94 492.56 268.90 492.07 268.82 C 487 268.02 483.54 263.25 484.35 258.18 C 487.74 236.81 502.64 222.46 521.41 222.46 C 541.92 222.46 558.60 239.13 558.60 259.64 C 558.60 264.77 554.44 268.94 549.30 268.94 C 544.16 268.94 540.00 264.77 540.00 259.64 C 540.00 249.39 531.66 241.05 521.41 241.05 C 509.97 241.05 504.24 251.40 502.70 261.10 C 501.98 265.67 498.02 268.94 493.54 268.94",
];
const HEART_V =
  "M 493.52 343.30 C 491.51 343.30 489.48 342.64 487.81 341.33 C 481.73 336.59 428.45 294.02 428.45 259.64 C 428.45 254.51 432.61 250.34 437.75 250.34 C 442.89 250.34 447.05 254.51 447.05 259.64 C 447.05 277.07 473.55 305.23 493.52 322.04 C 513.50 305.21 540.00 277.03 540.00 259.64 C 540.00 254.51 544.16 250.34 549.30 250.34 C 554.44 250.34 558.60 254.51 558.60 259.64 C 558.60 294.02 505.32 336.59 499.24 341.33 C 497.57 342.64 495.54 343.30 493.52 343.30";

export default function MeetUs() {
  return (
    <section id="meet" aria-labelledby="meet-title" className="bg-background px-5 py-20 desktop:px-[5vw] desktop:py-[8vw]">
      <div className="mx-auto grid max-w-[1300px] grid-cols-1 items-center gap-10 desktop:grid-cols-[5fr_6fr] desktop:gap-[6vw]">
        <figure className="relative mx-auto w-full max-w-[420px] desktop:max-w-none">
          <img
            src="/about/turkov.jpg"
            alt='הרב שמואל טורקוב בקריה הרפואית רמב"ם'
            width={900}
            height={1200}
            loading="lazy"
            className="block aspect-[3/4] h-auto w-full rounded-xl object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute -left-2 bottom-6 grid size-[84px] place-items-center rounded-xl bg-muted desktop:-left-6 desktop:bottom-10 desktop:size-28"
          >
            <svg viewBox={HEART_VB} className="h-auto w-[54px] desktop:w-[72px]">
              {HEART_TOP.map((d) => (
                <path key={d.slice(0, 12)} d={d} className="fill-logo-orange" />
              ))}
              <path d={HEART_V} className="fill-logo-bordeaux" />
            </svg>
          </span>
        </figure>

        <div className="flex flex-col gap-[15px] desktop:gap-5">
          <p className="self-start inline-block rounded-sm px-3.5 py-1.5 text-sm font-bold leading-snug bg-primary text-primary-foreground desktop:px-[18px] desktop:py-2 desktop:text-base">
            נעים להכיר
          </p>
          <h2 id="meet-title" className="text-4xl font-bold leading-[1.05] [text-wrap:balance] desktop:text-[72px]">
            הרב שמואל וחנה <span className="text-primary">טורקוב</span>
          </h2>
          {/* לאישור הלקוח */}
          <p className="text-lg font-medium leading-normal [text-wrap:pretty] desktop:text-xl">
            השלוחים של לב חב"ד בקריה הרפואית רמב"ם. כבר יותר מעשור הם כאן בשביל המאושפזים ובני המשפחות, בכל שעה ובכל מצב.
          </p>
          <p className="text-lg font-light leading-[1.6] [text-wrap:pretty]">
            הכל התחיל מליל סדר למאושפזים. משם זה גדל לליווי רוחני מסביב לשעון, לסעודות שבת שפתוחות לכולם ולבית חם למשפחות. הרב
            שמואל שירת בחיל הים, ובמלחמה מונה לקצין רב במילואים וליווה פצועים ומשפחות.
          </p>

          <ul className="mb-2 mt-3 grid grid-cols-1 gap-[15px] desktop:grid-cols-3">
            {FACTS.map(({ title, sub, icon: Icon }) => (
              <li key={title} className="flex items-center justify-start gap-3 rounded-xl bg-muted px-4 py-[18px]">
                {/* RTL: הטקסט קודם, האייקון אחריו (משמאל) */}
                <span>
                  <span className="block text-[17px] font-bold leading-tight">{title}</span>
                  <span className="block text-sm font-medium leading-snug text-muted-foreground">{sub}</span>
                </span>
                <Icon aria-hidden="true" strokeWidth={1.5} className="size-8 shrink-0 text-primary" />
              </li>
            ))}
          </ul>

          <a
            href="/about/"
            className="group inline-flex min-h-14 items-center justify-center gap-2.5 self-stretch rounded-xl bg-accent px-7 py-3.5 text-lg font-medium leading-tight text-accent-foreground transition-colors duration-300 ease-brand hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-primary desktop:self-start"
          >
            <span>לסיפור שלנו</span>
            <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-6 transition-transform duration-300 ease-brand group-hover:-translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
