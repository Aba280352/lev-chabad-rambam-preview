import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Heart, Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * כותרת האתר: דביקה, לבנה. דסקטופ (מ־1025px): לוגו, 4 פריטי תפריט וכפתור "צריכים עזרה?".
 * מובייל: לוגו וכפתור תפריט שפותח תפריט במסך מלא מימין (בורדו כהה), עם הקישורים, כפתור עזרה וטלפון.
 * נגישות: aria-expanded, Escape סוגר, נעילת גלילה, פוקוס עובר לכפתור הסגירה וחוזר לכפתור הפתיחה.
 */

const MENU = [
  { label: "הסיפור שלנו", href: "/about/" },
  { label: "הפעילות שלנו", href: "/activity/" },
  { label: "סיוע למטופלים ולמשפחות", href: "/help/" },
  { label: "לתמיכה ולתרומה", href: "/donate/" },
];

const HEART_VB = "428.45 222.45 130.15 120.86";
const HEART = [
  "M 437.75 268.94 C 432.61 268.94 428.45 264.77 428.45 259.64 C 428.45 239.13 445.13 222.46 465.64 222.46 C 469.79 222.46 473.88 223.13 477.78 224.48 C 482.63 226.16 485.21 231.45 483.53 236.30 C 481.84 241.16 476.54 243.72 471.71 242.06 C 469.77 241.39 467.73 241.05 465.64 241.05 C 455.38 241.05 447.04 249.39 447.04 259.64 C 447.04 264.77 442.89 268.94 437.75 268.94",
  "M 493.54 268.94 C 493.05 268.94 492.56 268.90 492.07 268.82 C 487 268.02 483.54 263.25 484.35 258.18 C 487.74 236.81 502.64 222.46 521.41 222.46 C 541.92 222.46 558.60 239.13 558.60 259.64 C 558.60 264.77 554.44 268.94 549.30 268.94 C 544.16 268.94 540.00 264.77 540.00 259.64 C 540.00 249.39 531.66 241.05 521.41 241.05 C 509.97 241.05 504.24 251.40 502.70 261.10 C 501.98 265.67 498.02 268.94 493.54 268.94",
  "M 493.52 343.30 C 491.51 343.30 489.48 342.64 487.81 341.33 C 481.73 336.59 428.45 294.02 428.45 259.64 C 428.45 254.51 432.61 250.34 437.75 250.34 C 442.89 250.34 447.05 254.51 447.05 259.64 C 447.05 277.07 473.55 305.23 493.52 322.04 C 513.50 305.21 540.00 277.03 540.00 259.64 C 540.00 254.51 544.16 250.34 549.30 250.34 C 554.44 250.34 558.60 254.51 558.60 259.64 C 558.60 294.02 505.32 336.59 499.24 341.33 C 497.57 342.64 495.54 343.30 493.52 343.30",
];

export default function SiteHeader({ current }: { current?: string }) {
  const [open, setOpen] = useState(false);
  const openBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1025px)");
    const onMq = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    openBtn.current?.focus();
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex h-[var(--header-h)] items-center justify-between gap-6 bg-background px-5 shadow-[0_1px_0_hsl(var(--border))] desktop:px-[5vw]">
        <a href="/" aria-label='לב חב"ד רמב"ם, לדף הבית' className="block flex-none">
          <img src="/logo.svg" alt='לב חב"ד בקריה הרפואית רמב"ם' width={199} height={64} className="block h-12 w-auto desktop:h-16" />
        </a>

        <nav aria-label="תפריט ראשי" className="hidden desktop:block">
          <ul className="flex gap-8">
            {MENU.map((m) => (
              <li key={m.href}>
                <a
                  href={m.href}
                  aria-current={current === m.href ? "page" : undefined}
                  className="font-medium transition-colors duration-300 ease-brand hover:text-primary aria-[current=page]:text-primary"
                >
                  {m.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#help"
          className="hidden min-h-14 items-center gap-2.5 rounded-xl bg-accent px-7 py-3.5 text-lg font-medium text-accent-foreground transition-colors duration-300 ease-brand hover:bg-accent-hover desktop:inline-flex"
        >
          <span>צריכים עזרה?</span>
          <Heart aria-hidden="true" strokeWidth={1.5} className="size-6" />
        </a>

        <button
          ref={openBtn}
          type="button"
          aria-label="פתיחת תפריט"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
          className="grid size-12 place-items-center rounded-xl text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-primary desktop:hidden"
        >
          <Menu aria-hidden="true" strokeWidth={1.5} className="size-7" />
        </button>
      </header>

      {/* תפריט מובייל במסך מלא */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="תפריט ראשי"
        className={cn(
          "fixed inset-0 z-[60] flex flex-col gap-6 overflow-y-auto bg-brand-deep px-5 pb-8 pt-3 text-white transition-[transform,visibility] duration-[450ms] ease-brand motion-reduce:transition-none desktop:hidden",
          open ? "visible translate-x-0" : "invisible translate-x-full",
        )}
      >
        <div className="flex min-h-12 items-center justify-between">
          <a href="/" onClick={close} className="flex items-center gap-2.5 text-[22px] font-bold text-white">
            <svg viewBox={HEART_VB} fill="currentColor" aria-hidden="true" className="h-auto w-9">
              {HEART.map((d) => (
                <path key={d.slice(0, 12)} d={d} />
              ))}
            </svg>
            <span>לב חב"ד רמב"ם</span>
          </a>
          <button
            ref={closeBtn}
            type="button"
            aria-label="סגירת תפריט"
            onClick={close}
            className="grid size-12 place-items-center rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
          >
            <X aria-hidden="true" strokeWidth={1.5} className="size-7" />
          </button>
        </div>

        <ul className="mt-2 divide-y divide-white/20">
          {MENU.map((m) => (
            <li key={m.href}>
              <a href={m.href} onClick={close} className="flex items-center justify-between gap-3 py-[18px] text-[26px] font-bold text-white">
                {m.label}
                <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-6 text-accent" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3">
          <a
            href="#help"
            onClick={close}
            className="inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-accent px-7 py-3.5 text-lg font-medium text-accent-foreground"
          >
            <span>צריכים עזרה?</span>
            <Heart aria-hidden="true" strokeWidth={1.5} className="size-6" />
          </a>
          <a href="tel:046808992" dir="ltr" className="flex items-center justify-center gap-2.5 text-xl font-bold text-accent">
            <Phone aria-hidden="true" strokeWidth={1.5} className="size-[22px]" />
            <span>04-680-8992</span>
          </a>
        </div>
      </div>
    </>
  );
}
