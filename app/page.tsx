"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Chapter {
  number: number;
  name: string;
  description: string;
  transformation: string;
}
interface FAQItem {
  q: string;
  a: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CHAPTERS: Chapter[] = [
  {
    number: 1,
    name: "שיח עומק: עיצוב עם כוונה",
    description: 'ברברה ברזין ובוריס סולטנוב ילמדו אותך להתחיל מהתמונה הגדולה: איך נראים "חיים טובים" ואיך זה מתבטא בבית שלך.',
    transformation: 'תפסיקי לעצב "יפה" — ותתחילי לעצב עם כוונה.',
  },
  {
    number: 2,
    name: "סידור מדף: שינוי מיידי בעיניים",
    description: "שיטה פשוטה לקומפוזיציה שעובדת תוך דקות — על כל משטח, בכל חדר.",
    transformation: "תסתכלי אחרת על כל משטח בבית.",
  },
  {
    number: 3,
    name: "צבע: להפסיק לפחד מטעויות",
    description: "איך לבחור צבע נכון — גם בלי להיות מומחית, גם בלי תואר.",
    transformation: "תדעי לקבל החלטות צבע בלי להתחרט.",
  },
  {
    number: 4,
    name: "שרטוטים: להבין תכנית העמדה בלי להיות טכנית",
    description: "איך לקרוא תוכנית ולהשתמש בה לבחירות מדויקות — בלי ניחוש.",
    transformation: 'תפסיקי "לנחש גדלים".',
  },
  {
    number: 5,
    name: "שיטת הבצל: להבין מה לא עובד",
    description: "איך לזהות בעיות בחלל ואיפה מתחילים לתקן — שכבה אחרי שכבה.",
    transformation: "תלמדי דרך לחשוב — לא רק להרגיש.",
  },
  {
    number: 6,
    name: "סיור באולם תצוגה: לבחור כמו מקצוענית",
    description: "איך להפסיק לקנות פריטים בודדים שלא מתחברים — ולצאת עם תמונה שלמה.",
    transformation: "תראי את התמונה השלמה — לא רק פריט.",
  },
];

interface ChapterDetail {
  number: number;
  name: string;
  deep: string;
  takeaway: string;
}

const CHAPTER_DETAILS: ChapterDetail[] = [
  {
    number: 1,
    name: "שיח עומק: עיצוב עם כוונה",
    deep: "לפני שבוחרים כיסא אחד, צריך לדעת מה את רוצה לחוות בבית. הפרק הזה מלמד אותך לשאול את השאלות הנכונות — ולענות עליהן בצורה שתנחה כל בחירה שתבואי אחריה.",
    takeaway: "יוצאת עם תמונה ברורה של הבית שאת רוצה — לא רק יפה, אלא נכון לך.",
  },
  {
    number: 2,
    name: "סידור מדף: שינוי מיידי בעיניים",
    deep: "קומפוזיציה היא לא כישרון — היא חוק. הפרק הזה מלמד אותך 3 עקרונות שעובדים על כל מדף, מזנון, שולחן עבודה, ואפילו אדן חלון.",
    takeaway: "תוכלי לסדר כל משטח בבית — ולדעת למה זה עובד.",
  },
  {
    number: 3,
    name: "צבע: להפסיק לפחד מטעויות",
    deep: "70% מהשגיאות בעיצוב מגיעות מבחירת צבע לא נכונה. הפרק הזה נותן לך מתודה ברורה לבחירת צבע שמתאים לחלל — לא לפי תחושה, לפי כללים.",
    takeaway: "לא תצטרכי 'לנסות ולראות' — תדעי מה נכון לפני שצובעים.",
  },
  {
    number: 4,
    name: "שרטוטים: להבין תכנית העמדה",
    deep: "מעצבת מסתכלת על תכנית ורואה את החדר הגמור. הפרק הזה מלמד אותך לקרוא תכנית העמדה, לדמיין גדלים בפועל, ולהשתמש בה לקבלת החלטות מדויקות.",
    takeaway: "תגיעי לפגישה עם הקבלן מוכנה — ולא תאמיני כמה זה ישנה הכל.",
  },
  {
    number: 5,
    name: "שיטת הבצל: להבין מה לא עובד",
    deep: "כשמשהו בחלל לא עובד — בדרך כלל שמים אצבע על הדבר הלא נכון. הפרק הזה מלמד אותך לפרק את החלל לשכבות ולזהות בדיוק מה צריך לשנות.",
    takeaway: "לא תבזבזי כסף על 'פתרונות' שלא פותרים את הבעיה האמיתית.",
  },
  {
    number: 6,
    name: "סיור באולם תצוגה: לבחור כמו מקצוענית",
    deep: "מגיעים לאולם תצוגה בלי שיטה — יוצאים עם המון פריטים שלא מתחברים. הפרק הזה נותן לך כלי עבודה ורשימת ביקורת ברורה לבחירת פריטים שיחיו ביחד.",
    takeaway: "הקנייה הבאה שלך תרגיש שונה לגמרי — מכוונת, ברורה, ומחוברת לתמונה השלמה.",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "6 פרקים — זה מספיק?",
    a: "הפרקים האלה נבחרו בקפידה כנקודות הפתיחה הכי משפיעות. כל פרק נותן כלי שאפשר להשתמש בו כבר היום — על הבית שלך, על הפינה שמציקה לך, על הרכישה הבאה שלך. לא מדובר ב'חומר' שגומרים — מדובר בתפיסה שתתחיל לעבוד בשבילך מהרגע הראשון. ויש עוד הרבה בדרך 😊",
  },
  {
    q: "זה מתאים גם למתחילות?",
    a: "בהחלט. Decorra Pro נבנה עבור מי שמרגישה שיש לה עין — אבל חסרה לה שיטה. אין צורך בידע מוקדם, אין מונחים טכניים מסובכים. הכל מוסבר בצורה פשוטה וברורה, עם דוגמאות מהחיים האמיתיים.",
  },
  {
    q: "תוך כמה זמן רואים שינוי?",
    a: "כבר תוך כדי הצפייה. הפרקים בנויים כך שכל אחד נותן לך זווית חדשה שאפשר להפעיל מיד. מי שצפתה בפרק על סידור מדף — יצאה ועשתה את זה עוד באותו ערב.",
  },
  {
    q: "זה מתאים גם למעצבות?",
    a: "מאוד. במיוחד למי שמרגישה חוסר ביטחון בהלבשה ובקומפוזיציה, או למי שמחפשת שפה ברורה להסביר ללקוחות למה הבחירות שלה נכונות. הכלים כאן מחדדים את החשיבה המקצועית.",
  },
  {
    q: "מה קורה עם החלקים הבאים?",
    a: "Decorra Pro בנוי כמערכת שמתפתחת — כל חלק מוסיף שכבה עמוקה יותר. מי שנכנסת עכשיו תקבל גישה לחלקים הבאים במחיר מועדף לפני עליית מחיר, עדכון אוטומטי בכל פרק חדש, וליווי בקבוצת וואטסאפ לאורך כל הדרך.",
  },
  {
    q: "איך ניגשים לתוכן אחרי הרכישה?",
    a: "מיד אחרי ביצוע התשלום תקבלי לינק גישה ישירות למייל. הצפייה מכל מכשיר — טלפון, טאבלט, מחשב — בכל שעה שנוחה לך. אין תוכנה להוריד, אין חשבון מורכב ליצור.",
  },
];

// ─── Animation helpers ─────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function Fade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

function StaggerFade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Shared UI ─────────────────────────────────────────────────────────────────

function CTAButton({ text = "הצטרפי עכשיו →" }: { text?: string }) {
  return (
    <a
      href="#form"
      className="inline-block bg-[#6B1A47] hover:bg-[#4E1235] active:scale-95 text-white text-lg font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-center w-full md:w-auto cursor-pointer select-none"
    >
      {text}
    </a>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-[#F9D0CF] text-[#1A1218] px-1 rounded not-italic">{children}</mark>
  );
}

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E8DDD0] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 flex justify-between items-center text-right gap-4"
        aria-expanded={open}
      >
        <span className="font-semibold text-[#1A1218] text-lg leading-snug">{item.q}</span>
        <span className="text-[#6B1A47] text-2xl flex-shrink-0 font-light w-6 text-center">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="pb-5 text-[#5A3F50] text-lg leading-relaxed"
        >
          {item.a}
        </motion.p>
      )}
    </div>
  );
}

// ─── NavBar ────────────────────────────────────────────────────────────────────

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8DDD0] py-3 px-4 md:px-8">
      <div className="max-w-5xl mx-auto relative flex items-center justify-center">
        <img src="/images/logo_BB SHORT.png" alt="Decorra Pro" className="h-5 md:h-6" />
        <a href="#form" className="absolute left-0 bg-[#6B1A47] text-white text-base font-semibold px-5 py-2 rounded-lg hover:bg-[#4E1235] transition-colors">
          הצטרפות →
        </a>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────── bg: white ────────

function HeroSection() {
  return (
    <section className="bg-white py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <Fade>
          <p className="text-[#6B1A47] font-semibold text-sm uppercase tracking-widest mb-4">
            מבלבול וחוסר ביטחון לשיטה ברורה שעובדת
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#1A1218] leading-tight mb-5 font-bold">
            את לא מתבלבלת כי אין לך טעם.
            <br /><span className="text-[#6B1A47]">את מתבלבלת כי אין לך שיטה.</span>
          </h1>
          <p className="text-[#5A3F50] text-xl mb-2">יש לך עין טובה. יש לך השראה. יש לך רצון.</p>
          <p className="font-semibold text-[#1A1218] text-xl mb-6">אבל כשצריך לבחור באמת? משהו נתקע.</p>
          <p className="text-[#5A3F50] text-lg mb-10">
            את מתלבטת. קונה פריטים שלא מתחברים. מסדרת שוב ושוב — וזה עדיין &ldquo;כמעט&rdquo;.
          </p>
          <p className="text-[#5A3F50] text-lg mb-6">המדריך הדיגיטלי שילמד אותך לחשוב, לבחור ולעצב כמו מקצוענית</p>
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-[#E8DDD0]">
            <video
              src="/images/video1.mp4"
              controls
              playsInline
              className="w-full block"
            />
          </div>
          <CTAButton text="אני רוצה שיטה ברורה →" />
        </Fade>
      </div>
    </section>
  );
}

// ─── Authority ────────────────────────────────────────────── bg: pink ─────────

function AuthoritySection() {
  return (
    <section className="bg-[#F9D0CF] py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <Fade className="text-center mb-10">
          <p className="text-[#6B1A47] text-sm font-semibold uppercase tracking-widest mb-2">מי מלמד אותך?</p>
          <h2 className="text-2xl md:text-3xl text-[#1A1218] font-bold">המרצה המוביל. הידע של האגדה.</h2>
        </Fade>

        {/* Boris card — premium editorial */}
        <Fade>
          <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
            {/* Photo with dramatic name overlay */}
            <div className="relative h-80 md:h-[26rem] overflow-hidden">
              <img
                src="/images/boris1234.jpg"
                alt="בוריס סולטנוב"
                className="w-full h-full object-cover object-top"
                style={{ filter: "brightness(1.12) contrast(0.97)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3a0d26]/90 via-[#6B1A47]/20 to-transparent" />
              <div className="absolute bottom-0 right-0 left-0 px-7 pb-7">
                <p className="text-[#F9D0CF] text-xs font-semibold uppercase tracking-[0.2em] mb-1">המרצה המוביל | סטודיו ברברה ברזין</p>
                <p className="text-white font-bold text-4xl md:text-5xl leading-tight">בוריס סולטנוב</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 border-b border-[#E8DDD0]">
              {[
                { num: "20+", label: "שנות ניסיון" },
                { num: "15+", label: "שנות הוראה בסטודיו" },
                { num: "100+", label: "פרויקטים מורכבים" },
              ].map((s, i) => (
                <div key={i} className={`py-5 text-center ${i < 2 ? "border-l border-[#E8DDD0]" : ""}`}>
                  <p className="text-[#6B1A47] font-bold text-2xl md:text-3xl">{s.num}</p>
                  <p className="text-[#5A3F50] text-sm mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Bio paragraph */}
            <div className="px-6 md:px-8 py-6">
              <p className="text-[#5A3F50] text-base md:text-lg leading-loose">
                בוריס סולטנוב הוא אחד המרצים המובילים והמבוקשים בתחום עיצוב הפנים בישראל. עם למעלה מ-20 שנות ניסיון בהוראה ובשטח, הוא מייסד המחלקה הבינלאומית של סטודיו ברברה ברזין — שם הוא בונה תוכניות הדרכה ומוביל משלחות לימוד למרכזי עיצוב וארכיטקטורה מהחשובים בעולם. לבוריס הסמכה בינלאומית בפילוסופיה סינית ובתורת הפנג שואי, הוא מטפל NLP מוסמך, ובעלים של סטודיו עצמאי מצליח המתמחה בפרויקטים מורכבים במגזרי הפרטי, המסחרי והחינוך.{" "}
                <span className="font-semibold text-[#1A1218]">מה שמייחד אותו הוא היכולת לקחת ידע עמוק ומורכב — ולהפוך אותו לכלי עבודה ברורים ומעשיים שאפשר ליישם מיד.</span>
              </p>
            </div>

            {/* Quote */}
            <div className="mx-6 md:mx-8 mb-7 rounded-2xl bg-[#6B1A47] px-6 py-6">
              <p className="text-[#F9D0CF]/60 text-xs mb-3 text-center">משפט לדוגמא</p>
              <p className="text-white text-lg md:text-xl leading-relaxed font-medium text-center">
                &ldquo;רוב האנשים קונים פריטים. מעצבים בונים חוויה. ההבדל ביניהם הוא לא תקציב ולא טעם — הוא שיטת חשיבה. וזה בדיוק מה שאפשר ללמוד.&rdquo;
              </p>
            </div>
          </div>
        </Fade>

        {/* DNA block */}
        <Fade>
          <div className="rounded-2xl overflow-hidden mb-2">

            {/* Header */}
            <div className="bg-[#1A1218] px-6 md:px-10 py-6 text-center">
              <p className="text-[#F9D0CF] text-xs font-semibold uppercase tracking-[0.2em] mb-2">ה-DNA של Decorra Pro</p>
              <p className="text-white text-xl md:text-2xl font-semibold leading-snug">
                את מקבלת 45 שנות חוכמה דרך אחד המרצים החדים ביותר בתחום.
              </p>
            </div>

            {/* Proof bar */}
            <div className="bg-[#F9D0CF] grid grid-cols-4 divide-x divide-[#6B1A47]/20">
              {[
                { num: "45+", label: "שנות ניסיון" },
                { num: "20+", label: "שנות הוראה" },
                { num: "6", label: "כלי עבודה" },
                { num: "0", label: "קורסים דומים" },
              ].map((s, i) => (
                <div key={i} className="py-4 text-center">
                  <p className="text-[#6B1A47] font-bold text-2xl md:text-3xl leading-none">{s.num}</p>
                  <p className="text-[#5A3F50] text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#6B1A47] px-6 md:px-10 py-8">

              {/* Barbara + Boris cards */}
              <div className="grid md:grid-cols-2 gap-5 mb-7">
                {[
                  { name: "ברברה ברזין", sub: "45+ שנות ניסיון", desc: "המייסדת. השיטה שלה עיצבה דורות של מעצבים ומעצבות בישראל. עשרות שנים של עשייה אמיתית בשטח — מזוקקת לתוך שיטה אחת ברורה." },
                  { name: "בוריס סולטנוב", sub: "המרצה המוביל", desc: "לוקח את הידע של ברברה ומגיש אותו בצורה ברורה, מעשית ומדויקת. מעשרות שנות הוראה — הוא יודע בדיוק איפה את נתקעת ואיך לפתוח את זה." },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 rounded-xl px-6 py-6">
                    <p className="text-white font-bold text-xl mb-0.5">{item.name}</p>
                    <p className="text-[#F9D0CF] text-xs uppercase tracking-widest mb-3">{item.sub}</p>
                    <p className="text-white/85 text-base leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* "Not anywhere else" block */}
              <div className="bg-white/10 rounded-xl px-6 py-5 mb-7">
                <p className="text-[#F9D0CF] text-xs font-semibold uppercase tracking-widest mb-4 text-center">מה שלא תמצאי בשום מקום אחר</p>
                <div className="space-y-3">
                  {[
                    "לא תאוריה כללית — כל פרק הוא כלי עבודה שאפשר ליישם מיד",
                    "לא קורס שנגמר — שיטה שמתפתחת ומלווה אותך הלאה",
                    "לא ידע מפוזר — חומר מרוכז, מדויק ובנוי לפי סדר הגיוני",
                    "לא נלמד בשום מקום בצורה כל כך מרוכזת ומעשית",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-[#F9D0CF] font-bold mt-0.5 flex-shrink-0">✗</span>
                      <p className="text-white/85 text-base">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Big quote */}
              <div className="text-center border-t border-white/20 pt-7">
                <p className="text-white text-xl md:text-2xl font-bold leading-relaxed max-w-2xl mx-auto">
                  מה שמעצבי פנים למדו ב-3 שנות לימודים —
                </p>
                <p className="text-[#F9D0CF] text-xl md:text-2xl font-bold leading-relaxed max-w-2xl mx-auto">
                  את לומדת ב-6 פרקים.
                </p>
              </div>

            </div>
          </div>
        </Fade>

      </div>
    </section>
  );
}

// ─── Truth ────────────────────────────────────────────────── bg: white ────────

function TruthSection() {
  return (
    <section className="bg-white py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <Fade className="space-y-6">
          <h2 className="text-2xl md:text-3xl text-[#1A1218] font-bold">האמת הפשוטה</h2>
          <div className="space-y-1 text-[#5A3F50] text-xl leading-loose">
            <p>עיצוב טוב הוא לא כישרון.</p>
            <p>הוא לא אינטואיציה.</p>
            <p className="font-bold text-[#1A1218] text-2xl"><Highlight>הוא שיטה.</Highlight></p>
          </div>
          <div className="text-right space-y-3 pt-2">
            <p className="text-[#6B1A47] font-semibold text-center mb-1 text-lg">שיטה שאומרת לך:</p>
            {["מאיפה מתחילים", "מה עושים קודם", "איך בוחרים נכון", "ואיך הכל מתחבר לתוצאה אחת שלמה"].map((item, i) => (
              <p key={i} className="text-[#1A1218] flex items-center gap-2 text-lg">
                <span className="text-[#6B1A47] flex-shrink-0">✦</span> {item}
              </p>
            ))}
          </div>
          <p className="text-[#1A1218] font-bold text-lg pt-2">בלי ניחושים. בלי בלבול. בלי טעויות יקרות.</p>
          <p className="text-[#5A3F50] text-lg">
            אם גם את מרגישה שאת &ldquo;כמעט שם&rdquo; — אבל משהו לא מתחבר —
            <br /><span className="font-bold text-[#6B1A47]">פה Decorra Pro משנה את המשחק.</span>
          </p>
        </Fade>
      </div>
    </section>
  );
}

// ─── Not A Course ─────────────────────────────────────────── bg: plum ─────────

function NotACourseSection() {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
        </svg>
      ),
      title: "כלי עבודה אמיתי",
      sub: "כל פרק = יישום מיידי",
      label: "01",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "שינוי בתפיסה",
      sub: "כל חלק = זווית חדשה",
      label: "02",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
      title: "התקדמות מיידית",
      sub: "כל צפייה = צעד קדימה",
      label: "03",
    },
  ];

  return (
    <section className="relative bg-[#6B1A47] py-16 md:py-24 px-4 md:px-8">
      <img src="/images/BG-NEW.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <Fade className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl text-white font-bold mb-4">חשוב להבין: זה לא קורס רגיל</h2>
          <div className="space-y-1 text-white/70 text-lg md:text-xl mb-12">
            <p>זה לא מדריך שמתחיל באל״ף ומסתיים בתי״ו.</p>
            <p>זה לא ידע שצריך ״לסיים״ כדי להשתמש בו.</p>
          </div>
        </Fade>
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {features.map((item, i) => (
            <Fade key={i}>
              <div className="group relative bg-[#FAF6F0] rounded-2xl overflow-hidden border border-[#6B1A47]/20 hover:border-[#1A1218]/20 transition-all duration-300 shadow-lg">
                <div className="absolute top-4 left-4 text-[#6B1A47]/10 font-bold text-4xl select-none">{item.label}</div>
                <div className="p-8 flex flex-col items-center text-center gap-5">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#6B1A47] to-[#A0285C] flex items-center justify-center text-white shadow-xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[#1A1218] font-bold text-xl mb-2">{item.title}</p>
                    <p className="text-[#5A3F50] text-lg">{item.sub}</p>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
        <Fade>
          <div className="border-t border-white/20 pt-6 text-center space-y-2">
            <p className="text-white font-bold text-xl">גם פרק אחד נותן לך יתרון.</p>
            <p className="text-[#F9D0CF] text-lg">וכשמחברים עוד חלקים? פתאום הכל מתחיל להסתדר.</p>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ─── What You Get ─────────────────────────────────────────── bg: cream ────────

function WhatYouGetSection() {
  return (
    <section className="bg-[#FAF6F0] py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Fade className="text-center mb-10">
          <p className="text-[#6B1A47] font-semibold text-sm uppercase tracking-widest mb-3">אז מה את מקבלת עכשיו?</p>
          <h2 className="text-2xl md:text-3xl text-[#1A1218] font-bold mb-1">DECORRA PRO</h2>
          <p className="text-[#5A3F50] text-lg mb-4">מבית סטודיו ברברה ברזין</p>
          <p className="text-[#1A1218] font-bold text-lg mb-1">סנונית ראשונה מתוך המדריך המלא</p>
          <p className="text-[#5A3F50] text-lg">6 פרקים. 6 זוויות שונות. <Highlight>6 קפיצות מדרגה בהבנה שלך.</Highlight></p>
        </Fade>

        <div className="mb-4">
          <p className="text-[#6B1A47] font-semibold text-lg text-center mb-5">6 הפרקים הזמינים עכשיו:</p>
          <StaggerFade className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {CHAPTERS.map((ch) => (
              <motion.div key={ch.number} variants={fadeUp} className="group bg-white rounded-2xl overflow-hidden border border-[#E8DDD0] hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                <div className="relative bg-[#6B1A47] py-5 px-5 overflow-hidden">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[5.5rem] font-black text-white/[0.07] leading-none select-none pointer-events-none">{ch.number}</span>
                  <span className="relative z-10 text-[#F9D0CF] text-lg font-bold leading-snug block">{ch.name}</span>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-[#5A3F50] text-lg leading-relaxed">{ch.description}</p>
                  <span className="inline-flex items-center gap-2 bg-[#F9D0CF] rounded-full px-3 py-1.5 text-base font-semibold text-[#6B1A47]">
                    ✅ {ch.transformation}
                  </span>
                </div>
              </motion.div>
            ))}
          </StaggerFade>

          <div className="bg-white rounded-2xl border border-[#E8DDD0] overflow-hidden shadow-sm">
            <div className="px-6 py-4 text-center border-b border-[#E8DDD0]">
              <p className="text-[#6B1A47] font-bold text-base mb-0.5">✦ עוד פרקים בדרך ✦</p>
              <p className="text-[#5A3F50] text-base">המדריך מתפתח — הנה טעימה ממה שמגיע</p>
            </div>
            <StaggerFade className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
              {[
                { num: 7, name: "עיצוב עם תקציב" },
                { num: 8, name: "תאורה ואווירה" },
                { num: 9, name: "טקסטיל ורכות" },
                { num: 10, name: "שילוב סגנונות" },
              ].map((ch) => (
                <motion.div key={ch.num} variants={fadeUp} className="rounded-2xl overflow-hidden border border-[#E8DDD0] shadow-sm">
                  <div className="relative bg-[#6B1A47] overflow-hidden" style={{ paddingTop: "80%" }}>
                    <span className="absolute left-2 bottom-0 text-[5rem] font-black text-white/[0.07] leading-none select-none pointer-events-none">{ch.num}</span>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 translate-x-0.5">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="bg-[#F9D0CF] text-[#6B1A47] text-sm font-bold px-3 py-1 rounded-full">בקרוב</span>
                    </div>
                  </div>
                  <div className="bg-white px-3 py-3 text-center">
                    <p className="text-[#1A1218] font-semibold text-base">{ch.name}</p>
                  </div>
                </motion.div>
              ))}
            </StaggerFade>
          </div>
        </div>

        <Fade className="text-center mt-8">
          <CTAButton text="אני רוצה להתחיל →" />
        </Fade>
      </div>
    </section>
  );
}

// ─── Chapters Detail ──────────────────────────────────────── bg: white ────────

function ChaptersDetailSection() {
  return (
    <section className="bg-[#F5F2E9] py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 md:px-8 mb-10">
        <Fade className="text-center">
          <p className="text-[#6B1A47] font-semibold text-sm uppercase tracking-widest mb-5">אז מה את מקבלת עכשיו?</p>
          <div className="inline-block mb-4">
            <p className="tracking-[0.22em] text-[#1A1218] text-2xl md:text-3xl font-bold leading-none" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}>
              DECORRA PRO
            </p>
            <p className="text-[#6B1A47] text-xs md:text-sm tracking-widest mt-1 font-medium">
              מבית סטודיו ברברה ברזין
            </p>
          </div>
          <p className="text-[#1A1218] font-bold text-lg mb-2">סנונית ראשונה מתוך המדריך הומסטיילינג המלא</p>
          <p className="text-[#5A3F50] text-lg mb-6">6 פרקים. 6 זוויות שונות. <mark className="bg-[#F9D0CF] text-[#1A1218] px-1 rounded not-italic">6 קפיצות מדרגה בהבנה שלך.</mark></p>
          <div className="w-16 h-0.5 bg-[#6B1A47] mx-auto mb-6 opacity-30" />
          <p className="text-[#5A3F50] text-base">מה מחכה לך בכל פרק?</p>
        </Fade>
      </div>

      <StaggerFade className="max-w-3xl mx-auto px-4 md:px-8 space-y-4">
        {CHAPTER_DETAILS.map((ch, i) => (
          <motion.div
            key={ch.number}
            variants={fadeUp}
            className={`relative overflow-hidden rounded-2xl px-7 py-7 ${i % 2 === 0 ? "bg-[#6B1A47]" : "bg-[#FAF6F0]"}`}
          >
            <span
              className="absolute left-3 bottom-0 text-[9rem] font-black leading-none select-none pointer-events-none"
              style={{ opacity: 0.07, color: i % 2 === 0 ? "#fff" : "#6B1A47" }}
            >
              {ch.number}
            </span>
            <div className="relative z-10">
              <p className={`font-bold text-xl mb-2 ${i % 2 === 0 ? "text-white" : "text-[#1A1218]"}`}>{ch.name}</p>
              <p className={`text-lg leading-relaxed mb-4 ${i % 2 === 0 ? "text-white/80" : "text-[#5A3F50]"}`}>{ch.deep}</p>
              <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-base font-semibold ${i % 2 === 0 ? "bg-[#F9D0CF] text-[#6B1A47]" : "bg-[#6B1A47] text-white"}`}>
                ✅ {ch.takeaway}
              </span>
            </div>
          </motion.div>
        ))}
      </StaggerFade>

      <Fade className="max-w-3xl mx-auto px-4 md:px-8 mt-10">
        <div className="bg-[#6B1A47] rounded-2xl px-8 py-7 text-center">
          <p className="text-white text-xl md:text-2xl font-bold leading-relaxed">
            את לא נכנסת לקורס סגור.
          </p>
          <p className="text-[#F9D0CF] text-xl md:text-2xl font-bold leading-relaxed mt-1">
            את נכנסת למערכת שמתפתחת איתך.
          </p>
        </div>
      </Fade>
    </section>
  );
}

// ─── Who Is It For ────────────────────────────────────────── bg: pink ─────────

function WhoIsItForSection() {
  return (
    <section className="bg-[#F9D0CF] py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <Fade className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl text-[#6B1A47] font-bold">למי זה מתאים?</h2>
        </Fade>
        <Fade>
          <ul className="space-y-4 mb-8">
            {[
              "מרגישה שיש לך טעם — אבל חסר לך ביטחון בבחירות",
              "מתבלבלת בין אפשרויות ולא יודעת מה לבחור",
              "קונה ולא מרוצה עד הסוף",
              "רוצה בית שנראה מקצועי באמת",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[#1A1218] text-lg bg-white/60 rounded-xl px-4 py-4">
                <span className="text-[#6B1A47] flex-shrink-0 mt-0.5 font-bold">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="text-center space-y-2 pt-2">
            <p className="text-[#1A1218] font-bold text-lg">את לא צריכה לדעת הכל.</p>
            <p className="text-[#1A1218] font-bold text-lg">את רק צריכה להתחיל נכון.</p>
            <p className="text-[#5A3F50] text-lg mt-1">
              וששת הפרקים האלה — <span className="font-bold text-[#6B1A47]">הם בדיוק ההתחלה שאת צריכה.</span>
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ─── Benefits ─────────────────────────────────────────────── bg: plum ─────────

function BenefitsSection() {
  return (
    <section className="bg-[#6B1A47] py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Fade className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl text-white font-bold">כשיש שיטה — הכל משתנה</h2>
        </Fade>
        <div className="grid grid-cols-2 gap-3 mb-10">
          <img src="/images/room-2.png" alt="עיצוב פנים" className="w-full rounded-xl object-cover aspect-[4/3]" />
          <img src="/images/room-1.jpg" alt="עיצוב פנים" className="w-full rounded-xl object-cover aspect-[4/3]" />
        </div>
        <Fade>
          <ul className="grid md:grid-cols-2 gap-3">
            {[
              "הבחירות נהיות ברורות",
              "הבית נראה מחובר ומדויק",
              "את מפסיקה לנחש",
              "את חוסכת כסף",
              "ואת מרגישה שליטה",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white text-lg bg-white/10 rounded-xl px-4 py-3">
                <span className="text-[#F9D0CF] font-bold flex-shrink-0">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Fade>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────── bg: white ────────

function PricingSection() {
  return (
    <section id="form" className="bg-white py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-lg mx-auto">
        <Fade className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl text-[#1A1218] font-bold mb-2">מה תקבלי מיד אחרי ההצטרפות?</h2>
        </Fade>
        <Fade>
          <div className="border border-[#E8DDD0] rounded-2xl overflow-hidden">
            <div className="bg-[#6B1A47] py-8 px-6 text-center">
              <p className="text-[#F9D0CF] text-sm mb-2 uppercase tracking-widest">מחיר השקה בלבד</p>
              <p className="text-white text-5xl font-bold">₪450</p>
              <p className="text-[#F9D0CF] text-sm mt-2">יעלה עם השקת החלקים הבאים</p>
            </div>
            <div className="p-6 md:p-8">
              <ul className="space-y-3 mb-8">
                {[
                  "גישה מיידית ל־6 הפרקים",
                  "צפייה בקצב שלך מכל מכשיר",
                  "ליווי בקבוצת וואטסאפ",
                  "גישה להמשך התפתחות המדריך",
                  "מחיר מועדף על חלקי הקורס הבאים",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-lg border-b border-[#E8DDD0] pb-3 last:border-0">
                    <span className="text-[#6B1A47] font-bold flex-shrink-0">✔</span>
                    <span className="text-[#1A1218]">{item}</span>
                  </li>
                ))}
              </ul>
              <form
                className="space-y-3"
                onSubmit={(e) => { e.preventDefault(); alert("תודה! נחזור אלייך בקרוב."); }}
              >
                <input type="text" placeholder="שם מלא *" required dir="rtl"
                  className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3.5 text-[#1A1218] bg-[#FAF6F0] focus:outline-none focus:border-[#6B1A47] text-right text-lg transition-colors" />
                <input type="email" placeholder="כתובת מייל *" required dir="rtl"
                  className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3.5 text-[#1A1218] bg-[#FAF6F0] focus:outline-none focus:border-[#6B1A47] text-right text-lg transition-colors" />
                <input type="tel" placeholder="טלפון נייד *" required dir="ltr" style={{ textAlign: "right" }}
                  className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3.5 text-[#1A1218] bg-[#FAF6F0] focus:outline-none focus:border-[#6B1A47] text-lg transition-colors" />
                <button type="submit"
                  className="w-full bg-[#6B1A47] hover:bg-[#4E1235] active:scale-[0.99] text-white text-xl font-bold py-4 rounded-xl transition-all duration-300">
                  הצטרפי עכשיו →
                </button>
              </form>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────── bg: pink ─────────

function FAQSection() {
  return (
    <section className="bg-[#F9D0CF] py-14 md:py-16 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <Fade className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl text-[#1A1218] font-bold">שאלות נפוצות</h2>
        </Fade>
        <div className="bg-white rounded-2xl px-6 md:px-8 py-2 shadow-md">
          {FAQ_ITEMS.map((item, i) => (
            <FAQAccordionItem key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Urgency ──────────────────────────────────────────────── bg: dark ─────────

function UrgencySection() {
  return (
    <section className="relative bg-[#1A1218] py-20 md:py-28 px-4 md:px-8">
      <img src="/images/BG-NEW.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" />
      <div className="relative z-10 max-w-xl mx-auto text-center">
        <Fade className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold text-white">אם לא תעשי שינוי עכשיו…</h2>
          <p className="text-white/60 text-xl leading-loose">
            סביר שתמשיכי להתלבט,
            לבזבז כסף,
            ולהישאר עם בית &ldquo;כמעט&rdquo;.
          </p>
          <div className="border-t border-white/10 pt-5 space-y-2">
            <p className="text-white font-bold text-lg">אבל אם את רוצה ביטחון, דיוק ושקט בראש —</p>
            <p className="text-[#F9D0CF] text-lg">Decorra Pro היא השיטה שתלמד אותך לעצב נכון מהצעד הראשון.</p>
          </div>
          <div className="pt-2 flex justify-center">
            <CTAButton text="הצטרפי עכשיו →" />
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────── bg: plum ─────────

function Footer() {
  return (
    <footer className="bg-[#6B1A47] text-white py-8 px-4 text-center">
      <p className="text-[#F9D0CF] text-base leading-relaxed">
        © {new Date().getFullYear()} סטודיו ברברה ברזין | Decorra Pro
        <br />כל הזכויות שמורות
        <br />
        <span className="text-white/50 text-sm mt-2 block">
          * Decorra Pro הוא מדריך דיגיטלי מבית סטודיו ברברה ברזין — ולא קורס אישי של ברברה ברזין.
        </span>
      </p>
    </footer>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function DecoraProPage() {
  return (
    <main dir="rtl" className="text-[#1A1218] overflow-x-hidden">
      <div className="bg-[#6B1A47] text-white text-center py-3 px-4 text-base font-medium">
        🎉 מחיר השקה | Decorra Pro חלק 1 | ₪450 בלבד — לזמן מוגבל
      </div>
      <NavBar />
      <HeroSection />
      <ChaptersDetailSection />
      <AuthoritySection />
      <TruthSection />
      <NotACourseSection />
      <WhatYouGetSection />
      <WhoIsItForSection />
      <BenefitsSection />
      <PricingSection />
      <FAQSection />
      <UrgencySection />
      <Footer />
    </main>
  );
}
