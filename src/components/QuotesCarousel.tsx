import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * קרוסלת פוקוס לביקורות: הפעילה במרכז בזהב, השכנות מוקטנות, מטושטשות ושקופות.
 * RTL: הביקורת הבאה מגיעה משמאל. ניגון אוטומטי כל 7 שניות, נעצר בריחוף. החלקה במגע.
 * מקור: ביקורות בעמוד הפייסבוק של הלקוח. לפני עלייה לאוויר: אישור מכל כותב לפרסום ולשם.
 */

type Quote = { quote: string; name: string; role?: string };

const QUOTES: Quote[] = [
  {
    quote:
      "בהתראה קצרה, ממש יומיים לפני חג, דאגתם לי ולילדה שלי ללינה ואוכל חם אחרי 4 ימים במסדרונות בית החולים. והכל בחיוך ובנתינה אין סופית. לימדתם אותי שבכל מקום נתינה היא דבר חשוב.",
    name: "שני נ.",
    role: "אמא שהתארחה עם בתה",
  },
  { quote: "פנינת חסד חמה בתוך טירוף של דאגות.", name: "אברהם ב." },
  {
    quote: "הרב ואשתו מדהימים. מגיעים כל יום שישי וכל חג למחלקה שבה אני עובדת, ומשמחים את היולדת, את המשפחות ואותנו הצוות.",
    name: "דיאנה ק.",
    role: "אחות במחלקת יולדות",
  },
  {
    quote: 'היום היינו בביקורת אחרי ניתוח מורכב שעברה הבת שלנו ברמב"ם, ונהנינו מאוד מהפעילות, מהכיבוד ומההופעה. המון תודה, אין עליכם!',
    name: "סיון ק.",
    role: "אמא של מטופלת",
  },
  { quote: 'הרב שמואל וחנה, שני מלאכים שעושים עבודה נפלאה בקרב המאושפזים ברמב"ם.', name: "ישי ודינה ק." },
  {
    quote:
      "הרב שמואל וחנה היקרים, מלאכים בדמות אדם, תמיד בשביל כולם! נהניתי להיות חלק מהמתנדבים אצלם במשך השנים ולראות מקרוב את הפעילות הברוכה שלהם.",
    name: "מושקא א.",
    role: "מתנדבת",
  },
  { quote: "נותנים מכל הלב לכולם באהבה!", name: "בנצי ב." },
  { quote: "הייתה סעודת חג נחמדה מאוד בראש השנה.", name: "רועי ג." },
];

const AUTOPLAY_MS = 7000;

export default function QuotesCarousel() {
  const N = QUOTES.length;
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const x0 = useRef<number | null>(null);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const go = useCallback((i: number) => setCur(((i % N) + N) % N), [N]);

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setTimeout(() => go(cur + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [cur, paused, reduce, go]);

  return (
    <div
      aria-roledescription="קרוסלה"
      aria-label="מה אומרים עלינו"
      className="relative mx-auto mt-10 max-w-[1300px] desktop:mt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={(e) => (x0.current = e.clientX)}
      onPointerUp={(e) => {
        if (x0.current === null) return;
        const dx = e.clientX - x0.current;
        x0.current = null;
        if (Math.abs(dx) > 40) go(cur + (dx > 0 ? 1 : -1));
      }}
    >
      <div className="grid touch-pan-y select-none items-center">
        {QUOTES.map((q, i) => {
          let d = (i - cur + N) % N;
          if (d > N / 2) d -= N;
          const active = d === 0;
          const far = Math.abs(d) > 1;
          return (
            <figure
              key={q.name}
              aria-hidden={!active}
              onClick={() => !active && go(i)}
              style={{ ["--d" as string]: d, zIndex: 5 - Math.abs(d) }}
              className={cn(
                "col-start-1 row-start-1 m-0 flex min-h-[280px] w-[84vw] flex-col gap-3.5 justify-self-center rounded-xl p-6 desktop:min-h-[300px] desktop:w-[min(640px,80vw)] desktop:px-10 desktop:py-9",
                "transition-[transform,filter,opacity,background-color,color] duration-1000 ease-brand motion-reduce:transition-none",
                active
                  ? "bg-accent text-accent-foreground"
                  : "cursor-pointer bg-primary text-primary-foreground opacity-50 blur-[3px] [transform:translateX(calc(var(--d)*-92%))_scale(.85)] desktop:[transform:translateX(calc(var(--d)*-86%))_scale(.8)]",
                far && "pointer-events-none opacity-0",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-11 text-8xl font-bold leading-[0.75] transition-colors duration-1000",
                  active ? "text-primary" : "text-accent",
                )}
              >
                "
              </span>
              <blockquote className="text-[19px] font-medium leading-normal [text-wrap:pretty] desktop:text-2xl">{q.quote}</blockquote>
              <figcaption className="mt-auto pt-2 text-base font-bold">
                {q.name}
                {q.role && <span className="block font-medium">{q.role}</span>}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="mt-7 flex items-center justify-center gap-5">
        {/* RTL: חץ ימינה = הקודמת, חץ שמאלה = הבאה */}
        <button
          type="button"
          aria-label="הביקורת הקודמת"
          onClick={() => go(cur - 1)}
          className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground transition-[background-color,scale] duration-300 ease-brand hover:bg-accent-hover hover:[scale:1.1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent desktop:size-14"
        >
          <ChevronRight aria-hidden="true" strokeWidth={1.5} className="size-6" />
        </button>
        <div className="flex gap-2">
          {QUOTES.map((q, i) => (
            <button
              key={q.name}
              type="button"
              aria-label={`ביקורת ${i + 1}`}
              aria-current={i === cur}
              onClick={() => go(i)}
              className={cn(
                "h-2 rounded-full transition-[background-color,width] duration-300 ease-brand",
                i === cur ? "w-6 bg-accent" : "w-2 bg-white/20",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="הביקורת הבאה"
          onClick={() => go(cur + 1)}
          className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground transition-[background-color,scale] duration-300 ease-brand hover:bg-accent-hover hover:[scale:1.1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent desktop:size-14"
        >
          <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-6" />
        </button>
      </div>
      <p className="mx-5 mt-3 text-center text-sm font-medium text-white/85 desktop:mt-4">
        מתוך ביקורות בעמוד הפייסבוק של לב חב"ד רמב"ם
      </p>
    </div>
  );
}
