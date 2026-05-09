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

const FAQ_ITEMS: FAQItem[] = [
  { q: "6 פרקים — זה מספיק?", a: "כל פרק נותן כלי אמיתי. יחד הם יוצרים שינוי תפיסתי מיידי — וזו כאמור רק ההתחלה 😊" },
  { q: "זה מתאים גם למתחילות?", a: "כן. הכל מוסבר בצורה פשוטה וברורה." },
  { q: "תוך כמה זמן רואים שינוי?", a: "כבר תוך כדי צפייה." },
  { q: "זה מתאים גם למעצבות?", a: "מאוד. במיוחד למי שמרגישה חוסר ביטחון בהלבשה." },
  { q: "מה קורה עם החלקים הבאים?", a: "Decorra Pro מתפתח כמו מערכת — עוד חלקים בדרך. מי שנכנסת עכשיו תקבל גישה לחלקים הבאים במחיר מועדף." },
  { q: "איך ניגשים לתוכן אחרי הרכישה?", a: "גישה מיידית מיד אחרי ביצוע התשלום. צפי בקצב שלך, מכל מכשיר, בכל שעה." },
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
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <a href="#form" className="bg-[#6B1A47] text-white text-base font-semibold px-5 py-2 rounded-lg hover:bg-[#4E1235] transition-colors">
          הצטרפות →
        </a>
        <img src="/images/Full_Logo.svg" alt="Decorra Pro" className="h-9" />
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
          <div className="mb-10">
            <img src="/images/BG-NEW.jpg" alt="עיצוב פנים מקצועי" className="w-full rounded-xl object-cover max-h-96" />
          </div>
          <p className="text-[#5A3F50] text-lg mb-8">המדריך הדיגיטלי שילמד אותך לחשוב, לבחור ולעצב כמו מקצוענית</p>
          <CTAButton text="אני רוצה שיטה ברורה →" />
        </Fade>
      </div>
    </section>
  );
}

// ─── Video ────────────────────────────────────────────────── bg: dark ─────────

function VideoSection() {
  const youtubeId = "VIDEO_ID_HERE";
  return (
    <section className="relative bg-[#1A1218] py-14 md:py-20 px-4 md:px-8">
      <img src="/images/BG-NEW.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <Fade>
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingTop: "56.25%" }}>
            {youtubeId === "VIDEO_ID_HERE" ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-3 bg-white/5">
                <p className="text-5xl">🎬</p>
                <p className="text-[#F9D0CF] text-xl font-semibold">וידאו בוריס סולטנוב</p>
                <p className="text-white/40 text-base">יתווסף בקרוב</p>
              </div>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="Decorra Pro"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
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
        <Fade className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl text-[#1A1218] font-bold">מי עומד מאחורי השיטה?</h2>
        </Fade>
        <StaggerFade className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Boris */}
          <motion.div variants={fadeUp} className="bg-white rounded-2xl overflow-hidden shadow-md">
            <div className="h-72 overflow-hidden">
              <img src="/images/BORIS.jpg" alt="בוריס סולטנוב" className="w-full h-full object-cover object-top" />
            </div>
            <div className="bg-[#6B1A47] px-5 py-4">
              <p className="text-white font-bold text-xl">בוריס סולטנוב</p>
              <p className="text-[#F9D0CF] text-base">מרצה בכיר | סטודיו ברברה ברזין</p>
            </div>
            <div className="px-5 py-5 space-y-3">
              <p className="text-[#5A3F50] text-lg leading-relaxed">מייסד מחלקת הום סטיילינג והמחלקה הבינלאומית. 20+ שנות ניסיון בעיצוב פנים ובהוראה.</p>
              <p className="text-[#1A1218] font-semibold text-lg">מלמד אותך לראות את החלל — לא רק להסתכל עליו.</p>
            </div>
          </motion.div>
          {/* Barbara */}
          <motion.div variants={fadeUp} className="bg-white rounded-2xl overflow-hidden shadow-md">
            <div className="h-72 overflow-hidden">
              <img src="/images/barbara.jpg" alt="ברברה ברזין" className="w-full h-full object-cover object-top" />
            </div>
            <div className="bg-[#6B1A47] px-5 py-4">
              <p className="text-white font-bold text-xl">ברברה ברזין</p>
              <p className="text-[#F9D0CF] text-base">מייסדת הסטודיו | אוטוריטה מובילה בעיצוב פנים</p>
            </div>
            <div className="px-5 py-5 space-y-3">
              <p className="text-[#5A3F50] text-lg leading-relaxed">45+ שנה בתחום עיצוב הפנים בישראל. מנטורית של אלפי מעצבים ובוגרים ברחבי הארץ.</p>
              <p className="text-[#1A1218] font-semibold text-lg">בנתה שיטה — לא סתם תוכן. זו המתודולוגיה שמאחורי Decorra Pro.</p>
            </div>
          </motion.div>
        </StaggerFade>
        <Fade className="text-center">
          <p className="text-[#5A3F50] text-lg">
            Decorra Pro נבנתה מתוך ניסיון אמיתי בשטח —{" "}
            <span className="font-bold text-[#6B1A47]">לא תאוריה. לא ניחושים.</span>
          </p>
        </Fade>
      </div>
    </section>
  );
}

// ─── Marketing Video ──────────────────────────────────────── bg: dark ─────────

function MarketingVideoSection() {
  const youtubeId = "MARKETING_VIDEO_ID_HERE";
  return (
    <section className="relative bg-[#1A1218] py-14 md:py-20 px-4 md:px-8">
      <img src="/images/BG-NEW.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <Fade>
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingTop: "56.25%" }}>
            {youtubeId === "MARKETING_VIDEO_ID_HERE" ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-3 bg-white/5">
                <p className="text-5xl">🎬</p>
                <p className="text-[#F9D0CF] text-xl font-semibold">סרטון שיווקי</p>
                <p className="text-white/40 text-base">יתווסף בקרוב</p>
              </div>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="Decorra Pro - Marketing"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
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
              <motion.div key={ch.number} variants={fadeUp} className="bg-white rounded-xl overflow-hidden border border-[#E8DDD0]">
                <div className="bg-[#6B1A47] py-3 px-5 flex items-center gap-3">
                  <span className="text-white font-bold text-xl flex-shrink-0">{ch.number}</span>
                  <span className="text-[#F9D0CF] text-lg font-semibold leading-snug">{ch.name}</span>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-[#5A3F50] text-lg leading-relaxed">{ch.description}</p>
                  <p className="text-[#6B1A47] font-semibold text-base">✅ {ch.transformation}</p>
                </div>
              </motion.div>
            ))}
          </StaggerFade>

          <div className="bg-white rounded-2xl p-6 border border-[#E8DDD0]">
            <div className="text-center mb-5">
              <p className="text-[#6B1A47] font-bold text-base mb-1">✦ עוד פרקים בדרך ✦</p>
              <p className="text-[#5A3F50] text-base">המדריך מתפתח — הנה טעימה ממה שמגיע</p>
            </div>
            <StaggerFade className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { num: 7, name: "עיצוב עם תקציב" },
                { num: 8, name: "תאורה ואווירה" },
                { num: 9, name: "טקסטיל ורכות" },
                { num: 10, name: "שילוב סגנונות" },
              ].map((ch) => (
                <motion.div key={ch.num} variants={fadeUp} className="rounded-xl overflow-hidden border border-[#E8DDD0]">
                  <div className="bg-[#1A1218] relative" style={{ paddingTop: "62%" }}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5 translate-x-0.5">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="bg-[#F9D0CF] text-[#6B1A47] text-sm font-bold px-2 py-0.5 rounded-full">בקרוב</span>
                    </div>
                    <div className="absolute top-2 right-2 text-white/25 text-sm font-bold">{ch.num}</div>
                  </div>
                  <div className="bg-white px-3 py-2 text-center">
                    <p className="text-[#1A1218] font-semibold text-sm">{ch.name}</p>
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
    <section className="bg-white py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Fade className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl text-[#1A1218] font-bold">מה מחכה לך בפנים?</h2>
        </Fade>
        <StaggerFade className="space-y-0">
          {CHAPTERS.map((ch, i) => (
            <motion.div
              key={ch.number}
              variants={fadeUp}
              className={`flex gap-5 py-6 ${i < CHAPTERS.length - 1 ? "border-b border-[#E8DDD0]" : ""}`}
            >
              <span className="text-3xl font-bold text-[#6B1A47] flex-shrink-0 w-8 text-right leading-tight mt-0.5">
                {ch.number}
              </span>
              <div className="flex-1">
                <p className="font-bold text-[#1A1218] text-lg mb-1">{ch.name}</p>
                <p className="text-[#5A3F50] text-lg leading-relaxed mb-2">{ch.description}</p>
                <p className="text-[#6B1A47] text-base font-semibold">✅ {ch.transformation}</p>
              </div>
            </motion.div>
          ))}
        </StaggerFade>
        <Fade className="mt-8 text-center">
          <p className="text-[#5A3F50] text-base">
            את לא נכנסת לקורס סגור.{" "}
            <Highlight>את נכנסת למערכת שמתפתחת איתך.</Highlight>
          </p>
        </Fade>
      </div>
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
      <VideoSection />
      <AuthoritySection />
      <MarketingVideoSection />
      <TruthSection />
      <NotACourseSection />
      <WhatYouGetSection />
      <ChaptersDetailSection />
      <WhoIsItForSection />
      <BenefitsSection />
      <PricingSection />
      <FAQSection />
      <UrgencySection />
      <Footer />
    </main>
  );
}
