import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { HeartHandshake, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * "איך נוכל לעזור?" (id="help"): כל כפתורי "צריכים עזרה?" באתר מובילים לכאן.
 * לשוניות שמחליפות טופס PEACH בתוך iframe (אירוח / סעודות), וכרטיס קשר כהה עם טלפון, מוקד ארצי ומייל.
 * כל פנייה מגיעה ל־PEACH. הוואטסאפ (בוט) יתווסף רק כשהבוט יופעל.
 */

type Form = { id: string; label: string; title: string; src: string; note: string };
const FORMS: Form[] = [
  {
    id: "hospitality",
    label: "בקשת אירוח במקום בלב",
    title: "בקשת אירוח במקום בלב",
    src: "https://app.levchabad.org.il/register/hospitality/rambam",
    note: "החדר לא מובטח עד שהצוות מאשר. לכל בקשה אחרת, כמו ליווי, תפילין או השאלת מזרון למלווה, התקשרו אלינו.",
  },
  {
    id: "shabbat",
    label: "הרשמה לסעודת שבת וחג",
    title: "הרשמה לסעודות שבת וחג",
    src: "https://app.levchabad.org.il/register/shabbat-meals/rambam",
    note: "ההרשמה מראש. בטופס יש אפשרות לתרום, והיא לא חובה. לכל בקשה אחרת, התקשרו אלינו.",
  },
];

const CONTACTS = [
  { label: 'לב חב"ד רמב"ם', value: "04-680-8992", href: "tel:046808992", icon: Phone },
  { label: 'המוקד הארצי של לב חב"ד', value: "*5732", href: "tel:*5732", icon: HeartHandshake },
  { label: "מייל", value: "office@chabadrambam.co.il", href: "mailto:office@chabadrambam.co.il", icon: Mail },
];

export default function HowCanWeHelp() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const form = FORMS[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    /* RTL: חץ שמאלה = הלשונית הבאה */
    const j = (i + (e.key === "ArrowLeft" ? 1 : -1) + FORMS.length) % FORMS.length;
    setActive(j);
    tabsRef.current[j]?.focus();
  };

  return (
    <section id="help" aria-labelledby="help-title" className="bg-muted px-5 py-20 desktop:px-[5vw] desktop:py-[8vw]">
      <header className="mx-auto flex max-w-[820px] flex-col items-center gap-[15px] text-center desktop:gap-5">
        <p className="inline-block rounded-sm bg-primary px-3.5 py-1.5 text-sm font-bold leading-snug text-primary-foreground desktop:px-[18px] desktop:py-2 desktop:text-base">
          סיוע למטופלים ולמשפחות
        </p>
        <h2 id="help-title" className="text-4xl font-bold leading-[1.05] [text-wrap:balance] desktop:text-[72px]">
          איך נוכל <span className="text-primary">לעזור?</span>
        </h2>
        <p className="text-lg font-medium leading-normal [text-wrap:pretty] desktop:text-xl">
          בחרו את סוג הבקשה ומלאו טופס קצר. הפנייה מגיעה ישר לצוות לב חב"ד ברמב"ם, ואנחנו חוזרים אליכם.
        </p>
      </header>

      <div className="mx-auto mt-10 grid max-w-[1300px] grid-cols-1 items-start gap-5 desktop:mt-16 desktop:grid-cols-[8fr_4fr]">
        <div className="rounded-xl bg-background p-3 desktop:p-6">
          <div role="tablist" aria-label="סוג הבקשה" className="mb-5 flex flex-wrap gap-2.5">
            {FORMS.map((f, i) => (
              <button
                key={f.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="help-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "min-h-14 flex-[1_1_100%] rounded-xl px-6 py-3.5 text-lg font-medium transition-colors duration-300 ease-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-primary desktop:flex-none",
                  i === active
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary))] hover:bg-primary/5",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div id="help-panel" role="tabpanel" aria-label={form.title}>
            <iframe
              key={form.id}
              src={form.src}
              title={form.title}
              loading="lazy"
              className="block h-[1100px] w-full rounded-xl border-0 bg-muted desktop:h-[900px]"
            />
          </div>
          <p className="mt-4 text-sm font-medium text-muted-foreground">{form.note}</p>
        </div>

        <aside
          aria-labelledby="contact-title"
          className="flex flex-col gap-4 rounded-xl bg-brand-deep p-6 text-white desktop:sticky desktop:top-[calc(var(--header-h)+24px)] desktop:p-8"
        >
          <h3 id="contact-title" className="text-2xl font-bold leading-tight">
            מעדיפים לדבר?
          </h3>
          <p className="font-medium text-white/85">הצוות זמין בכל יום ובכל שעה.</p>
          <ul className="my-1 flex flex-col divide-y divide-white/20">
            {CONTACTS.map(({ label, value, href, icon: Icon }) => (
              <li key={href}>
                {/* RTL: הטקסט קודם, האייקון אחריו (משמאל) */}
                <a href={href} className="flex items-center justify-between gap-3 py-3.5">
                  <span>
                    <span className="block text-sm font-medium text-white/85">{label}</span>
                    <span dir="ltr" className="block text-right text-xl font-bold">
                      {value}
                    </span>
                  </span>
                  <Icon aria-hidden="true" strokeWidth={1.5} className="size-7 shrink-0 text-accent" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="tel:046808992"
            className="inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-accent px-7 py-3.5 text-lg font-medium text-accent-foreground transition-colors duration-300 ease-brand hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
          >
            <span>להתקשרות עכשיו</span>
            <Phone aria-hidden="true" strokeWidth={1.5} className="size-6" />
          </a>
        </aside>
      </div>
    </section>
  );
}
