import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

/**
 * "נשארים בקשר": כותרת במרכז, שתי רשתות (פייסבוק, אינסטגרם), וקרוסלה כפולה ברוחב מלא:
 * שתי שורות תמונות שנעות כל הזמן לכיוונים הפוכים, ותג עגול במרכז עם הלב וטקסט שמסתובב סביבו.
 * התמונות דקורטיביות ולא מקשרות לשום מקום. אין טיקטוק פעיל.
 * צריך ב־tailwind.config: keyframes strip-a, strip-b, spin-slow (ראו בסוף הקובץ).
 */

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const NETS: { id: string; name: string; href: string; icon: ReactNode }[] = [
  {
    id: "facebook",
    name: "פייסבוק",
    href: "https://www.facebook.com/chabadrambam/",
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    id: "instagram",
    name: "אינסטגרם",
    href: "https://www.instagram.com/chabadrambam/",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
  },
];
const HANDLE = "@chabadrambam";

const ROW_A = [1, 2, 3, 4, 5, 6].map((n) => `/social/strip-${n}.jpg`);
const ROW_B = [7, 8, 9, 10, 11, 12].map((n) => `/social/strip-${n}.jpg`);

const HEART_VB = "428.45 222.45 130.15 120.86";
const HEART_TOP = [
  "M 437.75 268.94 C 432.61 268.94 428.45 264.77 428.45 259.64 C 428.45 239.13 445.13 222.46 465.64 222.46 C 469.79 222.46 473.88 223.13 477.78 224.48 C 482.63 226.16 485.21 231.45 483.53 236.30 C 481.84 241.16 476.54 243.72 471.71 242.06 C 469.77 241.39 467.73 241.05 465.64 241.05 C 455.38 241.05 447.04 249.39 447.04 259.64 C 447.04 264.77 442.89 268.94 437.75 268.94",
  "M 493.54 268.94 C 493.05 268.94 492.56 268.90 492.07 268.82 C 487 268.02 483.54 263.25 484.35 258.18 C 487.74 236.81 502.64 222.46 521.41 222.46 C 541.92 222.46 558.60 239.13 558.60 259.64 C 558.60 264.77 554.44 268.94 549.30 268.94 C 544.16 268.94 540.00 264.77 540.00 259.64 C 540.00 249.39 531.66 241.05 521.41 241.05 C 509.97 241.05 504.24 251.40 502.70 261.10 C 501.98 265.67 498.02 268.94 493.54 268.94",
];
const HEART_V =
  "M 493.52 343.30 C 491.51 343.30 489.48 342.64 487.81 341.33 C 481.73 336.59 428.45 294.02 428.45 259.64 C 428.45 254.51 432.61 250.34 437.75 250.34 C 442.89 250.34 447.05 254.51 447.05 259.64 C 447.05 277.07 473.55 305.23 493.52 322.04 C 513.50 305.21 540.00 277.03 540.00 259.64 C 540.00 254.51 544.16 250.34 549.30 250.34 C 554.44 250.34 558.60 254.51 558.60 259.64 C 558.60 294.02 505.32 336.59 499.24 341.33 C 497.57 342.64 495.54 343.30 493.52 343.30";

function Strip({ images, reverse }: { images: string[]; reverse?: boolean }) {
  /* הסט מוכפל כדי שהלולאה תהיה רציפה: הזזה של 50% מחזירה לאותה נקודה */
  const all = [...images, ...images];
  return (
    <div
      className={
        "flex w-max gap-2.5 motion-reduce:animate-none desktop:gap-3 " +
        (reverse ? "animate-strip-b" : "animate-strip-a")
      }
    >
      {all.map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={src}
          alt=""
          width={720}
          height={496}
          decoding="async"
          className="block h-[152px] w-[220px] flex-none rounded-xl object-cover desktop:h-[234px] desktop:w-[340px]"
        />
      ))}
    </div>
  );
}

export default function StayInTouch() {
  return (
    <section id="social" aria-labelledby="social-title" className="overflow-hidden bg-background py-20 desktop:py-[8vw]">
      <header className="mx-auto flex max-w-[820px] flex-col items-center gap-[15px] px-5 text-center desktop:gap-5 desktop:px-[5vw]">
        <p className="inline-block rounded-sm bg-primary px-3.5 py-1.5 text-sm font-bold leading-snug text-primary-foreground desktop:px-[18px] desktop:py-2 desktop:text-base">
          הרשתות שלנו
        </p>
        <h2 id="social-title" className="text-4xl font-bold leading-[1.05] [text-wrap:balance] desktop:text-[72px]">
          נשארים <span className="text-primary">בקשר</span>
        </h2>
        <p className="text-lg font-medium leading-normal [text-wrap:pretty] desktop:text-xl">
          רגעים מהיום יום ברמב"ם, עדכונים על חגים וסעודות, וסיפורים מהמחלקות. עקבו אחרינו.
        </p>
      </header>

      <ul className="mx-auto mt-8 grid max-w-[760px] grid-cols-1 gap-[15px] px-5 desktop:mt-10 desktop:grid-cols-2 desktop:px-0">
        {NETS.map((n) => (
          <li key={n.id}>
            <a
              href={n.href}
              target="_blank"
              rel="noopener"
              className="group flex min-h-[72px] items-center justify-between gap-4 rounded-xl bg-muted px-5 py-3.5 transition-colors duration-300 ease-brand hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-primary"
            >
              {/* RTL: הטקסט קודם, האייקון אחריו (משמאל) */}
              <span className="flex items-center gap-3.5">
                <span>
                  <span className="block text-xl font-bold leading-tight">{n.name}</span>
                  <span dir="ltr" className="block text-right text-[15px] font-medium text-muted-foreground transition-colors duration-300 group-hover:text-white/85">
                    {HANDLE}
                  </span>
                </span>
                <span aria-hidden="true" className="grid size-12 place-items-center rounded-full bg-background text-primary">
                  <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}>
                    {n.icon}
                  </svg>
                </span>
              </span>
              <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-6 transition-transform duration-300 ease-brand group-hover:-translate-x-1" />
            </a>
          </li>
        ))}
      </ul>

      {/* קרוסלה כפולה: dir=ltr כדי שחשבון ההזזה יהיה פשוט; התוכן דקורטיבי בלבד */}
      <div dir="ltr" aria-hidden="true" className="group/strips relative mt-10 flex flex-col gap-2.5 desktop:mt-16 desktop:gap-3">
        <Strip images={ROW_A} />
        <Strip images={ROW_B} reverse />

        <div className="absolute left-1/2 top-1/2 z-10 grid size-[140px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background desktop:size-[200px]">
          <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow text-primary motion-reduce:animate-none">
            <defs>
              <path id="social-ring" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
            </defs>
            <text className="fill-current font-bold" fontSize={16}>
              <textPath href="#social-ring" textLength={455} lengthAdjust="spacing">לב חב"ד בקריה הרפואית רמב"ם • בשבילכם מכל הלב • </textPath>
            </text>
          </svg>
          <svg viewBox={HEART_VB} className="h-auto w-[58px] desktop:w-[84px]">
            {HEART_TOP.map((d) => (
              <path key={d.slice(0, 12)} d={d} className="fill-logo-orange" />
            ))}
            <path d={HEART_V} className="fill-logo-bordeaux" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/*
 * להוסיף ל־tailwind.config (theme.extend):
 * keyframes: {
 *   "strip-a": { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
 *   "strip-b": { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
 *   "spin-slow": { to: { transform: "rotate(360deg)" } },
 * },
 * animation: {
 *   "strip-a": "strip-a 60s linear infinite",
 *   "strip-b": "strip-b 60s linear infinite",
 *   "spin-slow": "spin-slow 24s linear infinite",
 * },
 */
