import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * משפט מרגש לפני "נעים להכיר": תמונה במסך מלא, והמילים נדלקות אחת אחת לפי הגלילה (GSAP ScrollTrigger, scrub).
 * הסקשן בגובה 220vh והתוכן דביק (sticky), כך שהמשפט נשאר במקום בזמן שהמילים נדלקות. התמונה זזה לאט (פרלקסה).
 * הטקסט לאישור הלקוח. "אתם לא לבד" הוא סלוגן קיים.
 */
gsap.registerPlugin(ScrollTrigger, useGSAP);

const TEXT = "ברגעים הכי קשים, במסדרונות של בית החולים, יש מי שמחכה לכם עם ארוחה חמה, מיטה נקייה ולב פתוח.";
const HIGHLIGHT = "אתם לא לבד.";

export default function EmotionalStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const section = sectionRef.current;
        if (!section) return;
        gsap.fromTo(
          section.querySelectorAll("[data-word]"),
          { opacity: 0.18 },
          { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: true } },
        );
        gsap.fromTo(
          section.querySelector("[data-bg]"),
          { yPercent: -4 },
          { yPercent: 4, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    },
    { scope: sectionRef },
  );

  const words = (s: string) =>
    s.split(" ").map((w, i, arr) => (
      <span key={`${w}-${i}`}>
        <span data-word>{w}</span>
        {i < arr.length - 1 ? " " : ""}
      </span>
    ));

  return (
    <section ref={sectionRef} aria-label="אתם לא לבד" className="relative h-[220vh] bg-brand-deep motion-reduce:h-auto">
      <div className="sticky top-0 isolate grid h-[100dvh] place-items-center overflow-hidden motion-reduce:relative motion-reduce:min-h-[100dvh]">
        <img
          data-bg
          src="/about/statement.jpg"
          alt=""
          aria-hidden="true"
          width={1600}
          height={1200}
          loading="lazy"
          className="absolute inset-x-0 -top-[8%] -z-20 h-[116%] w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,hsl(var(--brand-deep)/0.66),hsl(var(--brand-deep)/0.88))]"
        />
        <p className="max-w-[1040px] px-5 text-center text-[clamp(34px,5vw,72px)] font-bold leading-[1.2] text-white [text-wrap:balance] desktop:px-[5vw]">
          {words(TEXT)} <span className="text-accent">{words(HIGHLIGHT)}</span>
        </p>
      </div>
    </section>
  );
}
