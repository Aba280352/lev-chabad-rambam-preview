import { ChevronLeft, HeartHandshake, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

/**
 * יצירת קשר ופוטר: רצועת "יש שאלה? אנחנו כאן." עם הטלפון בגדול, ואז 4 עמודות (מותג, ניווט, קשר, רשתות ותרומה)
 * ושורה תחתונה משפטית. רקע bordeaux-deep עם לב ענק שקוף.
 * חסר: מספר עמותה. דפי הצהרת נגישות ומדיניות פרטיות צריך לבנות.
 */

const DONATE = "https://www.peach-in.com/cmp/lev-chabad-rambam";

const HEART_VB = "428.45 222.45 130.15 120.86";
const HEART = [
  "M 437.75 268.94 C 432.61 268.94 428.45 264.77 428.45 259.64 C 428.45 239.13 445.13 222.46 465.64 222.46 C 469.79 222.46 473.88 223.13 477.78 224.48 C 482.63 226.16 485.21 231.45 483.53 236.30 C 481.84 241.16 476.54 243.72 471.71 242.06 C 469.77 241.39 467.73 241.05 465.64 241.05 C 455.38 241.05 447.04 249.39 447.04 259.64 C 447.04 264.77 442.89 268.94 437.75 268.94",
  "M 493.54 268.94 C 493.05 268.94 492.56 268.90 492.07 268.82 C 487 268.02 483.54 263.25 484.35 258.18 C 487.74 236.81 502.64 222.46 521.41 222.46 C 541.92 222.46 558.60 239.13 558.60 259.64 C 558.60 264.77 554.44 268.94 549.30 268.94 C 544.16 268.94 540.00 264.77 540.00 259.64 C 540.00 249.39 531.66 241.05 521.41 241.05 C 509.97 241.05 504.24 251.40 502.70 261.10 C 501.98 265.67 498.02 268.94 493.54 268.94",
  "M 493.52 343.30 C 491.51 343.30 489.48 342.64 487.81 341.33 C 481.73 336.59 428.45 294.02 428.45 259.64 C 428.45 254.51 432.61 250.34 437.75 250.34 C 442.89 250.34 447.05 254.51 447.05 259.64 C 447.05 277.07 473.55 305.23 493.52 322.04 C 513.50 305.21 540.00 277.03 540.00 259.64 C 540.00 254.51 544.16 250.34 549.30 250.34 C 554.44 250.34 558.60 254.51 558.60 259.64 C 558.60 294.02 505.32 336.59 499.24 341.33 C 497.57 342.64 495.54 343.30 493.52 343.30",
];
function HeartMono({ className }: { className?: string }) {
  return (
    <svg viewBox={HEART_VB} fill="currentColor" aria-hidden="true" className={className}>
      {HEART.map((d) => (
        <path key={d.slice(0, 12)} d={d} />
      ))}
    </svg>
  );
}

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const SOCIAL: { label: string; href: string; icon: ReactNode }[] = [
  { label: "פייסבוק", href: "https://www.facebook.com/chabadrambam/", icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> },
  {
    label: "אינסטגרם",
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

const NAV = [
  { label: "הסיפור שלנו", href: "/about/" },
  { label: "הפעילות שלנו", href: "/activity/" },
  { label: "סיוע למטופלים ולמשפחות", href: "/help/" },
  { label: "לתמיכה ולתרומה", href: "/donate/" },
  { label: "שקיפות", href: "/transparency/" },
];

const colTitle = "mb-4 text-lg font-bold text-accent";
const link = "font-medium text-white/85 transition-colors duration-300 ease-brand hover:text-white";

export default function SiteFooter() {
  return (
    <footer aria-labelledby="footer-title" className="relative isolate overflow-hidden bg-brand-deep px-5 text-white desktop:px-[5vw]">
      <HeartMono className="absolute -left-[120px] -top-10 -z-10 h-auto w-[340px] text-white/[0.05] desktop:-top-[60px] desktop:w-[520px]" />

      {/* רצועת קשר */}
      <div className="mx-auto flex max-w-[1300px] flex-col items-start gap-5 border-b border-white/20 pb-12 pt-16 desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-8 desktop:py-[6vw]">
        <div className="flex flex-col gap-2.5">
          <h2 id="footer-title" className="text-[32px] font-bold leading-[1.05] [text-wrap:balance] desktop:text-6xl">
            יש שאלה? <span className="text-accent">אנחנו כאן.</span>
          </h2>
          <p className="text-lg font-medium text-white/85 desktop:text-xl">בכל יום ובכל שעה, למאושפזים ולבני המשפחה.</p>
        </div>
        <a
          href="tel:046808992"
          dir="ltr"
          aria-label='להתקשר ללב חב"ד רמב"ם: 04-680-8992'
          className="inline-flex items-center gap-3.5 whitespace-nowrap text-4xl font-bold text-accent transition-colors duration-300 ease-brand hover:text-white desktop:text-[56px]"
        >
          <Phone aria-hidden="true" strokeWidth={1.5} className="size-9 desktop:size-11" />
          <span>04-680-8992</span>
        </a>
      </div>

      {/* עמודות */}
      <div className="mx-auto grid max-w-[1300px] grid-cols-2 gap-x-5 gap-y-8 py-12 desktop:grid-cols-[1.4fr_1fr_1.2fr_1fr] desktop:gap-10 desktop:py-16">
        <div className="col-span-2 flex flex-col gap-4 desktop:col-span-1">
          <a href="/" aria-label='לב חב"ד רמב"ם, לדף הבית' className="flex items-center gap-3 text-white">
            <HeartMono className="h-auto w-14" />
            <span>
              <span className="block text-[30px] font-bold leading-none">לב חב"ד</span>
              <span className="mt-1 block text-sm font-medium text-white/85">בקריה הרפואית רמב"ם</span>
            </span>
          </a>
          <p className="max-w-[340px] font-medium leading-normal text-white/85 [text-wrap:pretty]">
            חום, חסד ותמיכה למאושפזים ולבני משפחותיהם, בכל שעה, ללא תנאים וללא תמורה.
          </p>
        </div>

        <nav aria-label="ניווט בפוטר">
          <h3 className={colTitle}>ניווט</h3>
          <ul className="flex flex-col gap-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={link}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="order-last col-span-2 desktop:order-none desktop:col-span-1">
          <h3 className={colTitle}>יצירת קשר</h3>
          {/* RTL: הטקסט קודם, האייקון אחריו (משמאל) */}
          <ul className="flex flex-col gap-3">
            <li>
              <a href="tel:046808992" className={`${link} flex items-center gap-2.5`}>
                <span dir="ltr">04-680-8992</span>
                <Phone aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0 text-accent" />
              </a>
            </li>
            <li>
              <a href="tel:*5732" className={`${link} flex items-center gap-2.5`}>
                <span>
                  המוקד הארצי <span dir="ltr">*5732</span>
                </span>
                <HeartHandshake aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0 text-accent" />
              </a>
            </li>
            <li>
              <a href="mailto:office@chabadrambam.co.il" className={`${link} flex items-center gap-2.5`}>
                <span dir="ltr">office@chabadrambam.co.il</span>
                <Mail aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0 text-accent" />
              </a>
            </li>
            <li className="flex items-center gap-2.5 font-medium text-white/85">
              <span>מקום בלב: העלייה השנייה 9, חיפה</span>
              <MapPin aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0 text-accent" />
            </li>
          </ul>
        </div>

        <div>
          <h3 className={colTitle}>עקבו אחרינו</h3>
          <div className="mb-5 flex gap-2.5">
            {SOCIAL.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener"
                aria-label={s.label}
                className="grid size-12 place-items-center rounded-full bg-white/[0.18] text-white transition-colors duration-300 ease-brand hover:bg-accent hover:text-accent-foreground"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
          <a
            href={DONATE}
            target="_blank"
            rel="noopener"
            className="group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-xl bg-accent px-7 py-3.5 text-lg font-medium text-accent-foreground transition-colors duration-300 ease-brand hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
          >
            <span>לתרומה</span>
            <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-6 transition-transform duration-300 ease-brand group-hover:-translate-x-1" />
          </a>
        </div>
      </div>

      {/* שורה משפטית */}
      <div className="mx-auto flex max-w-[1300px] flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/20 pb-8 pt-6 text-sm font-medium text-white/85">
        <span>© 2026 לב חב"ד, חסד ומרפא והפצת המעיינות (ע"ר). התרומות מוכרות לצורכי מס לפי סעיף 46.</span>
        <nav aria-label="מידע משפטי" className="flex flex-wrap gap-5">
          <a href="/accessibility/" className="transition-colors duration-300 hover:text-white">
            הצהרת נגישות
          </a>
          <a href="/privacy/" className="transition-colors duration-300 hover:text-white">
            מדיניות פרטיות
          </a>
        </nav>
      </div>
    </footer>
  );
}
