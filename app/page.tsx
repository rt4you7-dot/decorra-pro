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
    description:
      'ברברה ברזין ובוריס סולטנוב ילמדו אותך להתחיל מהתמונה הגדולה: איך נראים "חיים טובים" ואיך זה מתבטא בבית שלך.',
    transformation: 'אחרי הפרק הזה תפסיקי לעצב "יפה" — ותתחילי לעצב עם כוונה.',
  },
  {
    number: 2,
    name: "סידור מדף: שינוי מיידי בעיניים",
    description: "שיטה פשוטה לקומפוזיציה שעובדת תוך דקות — על כל משטח, בכל חדר.",
    transformation: "אחרי הפרק הזה תסתכלי אחרת על כל משטח בבית.",
  },
  {
    number: 3,
    name: "צבע: להפסיק לפחד מטעויות",
    description: "איך לבחור צבע נכון — גם בלי להיות מומחית, גם בלי תואר.",
    transformation: "אחרי הפרק הזה תדעי לקבל החלטות צבע בלי להתחרט.",
  },
  {
    number: 4,
    name: "שרטוטים: להבין תכנית העמדה בלי להיות טכנית",
    description: "איך לקרוא תוכנית ולהשתמש בה לבחירות מדויקות — בלי ניחוש.",
    transformation: 'אחרי הפרק הזה תפסיקי "לנחש גדלים".',
  },
  {
    number: 5,
    name: "שיטת הבצל: להבין מה לא עובד",
    description: "איך לזהות בעיות בחלל ואיפה מתחילים לתקן — שכבה אחרי שכבה.",
    transformation: "אחרי הפרק הזה תלמדי דרך לחשוב — לא רק להרגיש.",
  },
  {
    number: 6,
    name: "סיור באולם תצוגה: לבחור כמו מקצוענית",
    description: "איך להפסיק לקנות פריטים בודדים שלא מתחברים — ולצאת עם תמונה שלמה.",
    transformation: "אחרי הפרק הזה תראי את התמונה השלמה — לא רק פריט.",
  },
];

const LOCKED_CHAPTERS = [
  "עיצוב עם תקציב",
  "תאורה ואווירה",
  "טקסטיל ורכות",
  "שילוב סגנונות",
  "פתרונות אחסון",
  "עיצוב חדרי ילדים",
  "גינה ומרפסת",
  "חידוש ושדרוג",
];

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "6 פרקים — זה מספיק?",
    a: "כל פרק נותן כלי אמיתי. יחד הם יוצרים שינוי תפיסתי מיידי — וזו כאמור רק ההתחלה 😊",
  },
  {
    q: "זה מתאים גם למתחילות?",
    a: "כן. הכל מוסבר בצורה פשוטה וברורה.",
  },
  {
    q: "תוך כמה זמן רואים שינוי?",
    a: "כבר תוך כדי צפייה.",
  },
  {
    q: "זה מתאים גם למעצבות?",
    a: "מאוד. במיוחד למי שמרגישה חוסר ביטחון בהלבשה.",
  },
  {
    q: "מה קורה עם החלקים הבאים?",
    a: "Decorra Pro מתפתח כמו מערכת — עוד חלקים בדרך. מי שנכנסת עכשיו תקבל גישה לחלקים הבאים במחיר מועדף.",
  },
  {
    q: "איך ניגשים לתוכן אחרי הרכישה?",
    a: "גישה מיידית מיד אחרי ביצוע התשלום. צפי בקצב שלך, מכל מכשיר, בכל שעה.",
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
      className="inline-block bg-[#6B1A47] hover:bg-[#4E1235] active:scale-95 text-white text-xl font-bold py-5 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-0.5 text-center w-full md:w-auto cursor-pointer select-none"
    >
      {text}
    </a>
  );
}

function Divider() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8">
      <div className="h-px bg-gradient-to-l from-transparent via-[#E8DDD0] to-transparent" />
    </div>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-[#F9D0CF] text-[#1A1218] px-1 rounded not-italic">{children}</mark>
  );
}

function ChapterCard({ chapter }: { chapter: Chapter }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white rounded-xl p-6 border-r-4 border-[#6B1A47] shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl font-bold text-[#6B1A47] flex-shrink-0 leading-none mt-1">
          {chapter.number}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-[#1A1218] mb-2 leading-snug">
            {chapter.name}
          </h3>
          <p className="text-[#5A3F50] mb-3 leading-relaxed text-sm md:text-base">{chapter.description}</p>
          <p className="text-[#6B1A47] font-semibold text-sm">✅ {chapter.transformation}</p>
        </div>
      </div>
    </motion.div>
  );
}

function LockedChapterCard({ name, index }: { name: string; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white/60 rounded-xl p-5 border border-[#E8DDD0] relative overflow-hidden min-h-[90px]"
    >
      <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-1 z-10">
        <span className="text-xl">🔒</span>
        <p className="text-[#6B1A47] font-semibold text-xs">בקרוב</p>
      </div>
      <div className="opacity-20">
        <span className="text-lg font-bold text-[#6B1A47]">{index + 7}</span>
        <p className="text-[#1A1218] font-bold mt-1 text-xs">{name}</p>
      </div>
    </motion.div>
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
        <span className="font-semibold text-[#1A1218] text-base leading-snug text-right">{item.q}</span>
        <span className="text-[#6B1A47] text-2xl flex-shrink-0 font-light w-6 text-center">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="pb-5 text-[#5A3F50] leading-relaxed"
        >
          {item.a}
        </motion.p>
      )}
    </div>
  );
}

// ─── Image Placeholder ────────────────────────────────────────────────────────

function ImagePlaceholder({ label, aspect = "16/9", hint = "" }: { label: string; aspect?: string; hint?: string }) {
  return (
    <div
      className="w-full rounded-2xl bg-[#E8DDD0] flex flex-col items-center justify-center gap-2 text-[#5A3F50] py-10"
      style={{ aspectRatio: aspect }}
    >
      <p className="text-4xl">🖼️</p>
      <p className="font-semibold text-base">{label}</p>
      {hint && <p className="text-xs text-center px-6 opacity-60">{hint}</p>}
    </div>
  );
}

// ─── NavBar ────────────────────────────────────────────────────────────────────

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8DDD0] py-3 px-4 md:px-8">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <a href="#form" className="bg-[#6B1A47] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#4E1235] transition-colors">
          הצטרפות →
        </a>
        <div className="text-center">
          <p className="font-bold text-[#6B1A47] text-base">Decorra Pro</p>
          <p className="text-[#5A3F50] text-xs">סטודיו ברברה ברזין</p>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="py-16 md:py-28 px-4 md:px-8 max-w-3xl mx-auto text-center">
      <Fade>
        <p className="text-[#6B1A47] font-semibold text-sm uppercase tracking-widest mb-3">
          מבלבול וחוסר ביטחון לשיטה ברורה שעובדת
        </p>
        <p className="text-[#5A3F50] text-base mb-6">Decorra Pro מבית סטודיו ברברה ברזין</p>
        <h1 className="text-2xl md:text-3xl lg:text-5xl text-[#1A1218] leading-tight mb-6 font-bold">
          את לא מתבלבלת כי אין לך טעם.
          <br /><span className="text-[#6B1A47]">את מתבלבלת כי אין לך שיטה.</span>
        </h1>
        <div className="space-y-2 text-[#5A3F50] text-lg mb-6">
          <p>יש לך עין טובה. יש לך השראה. יש לך רצון.</p>
          <p className="font-semibold text-[#1A1218]">אבל כשצריך לבחור באמת? משהו נתקע.</p>
        </div>
        <div className="space-y-1 text-[#5A3F50] text-lg mb-6">
          <p>את מתלבטת. קונה פריטים שלא מתחברים.</p>
          <p>מסדרת שוב ושוב — וזה עדיין &ldquo;כמעט&rdquo;.</p>
        </div>
        <div className="bg-[#F9D0CF] rounded-2xl p-5 mb-8 max-w-md mx-auto">
          <p className="text-[#1A1218] font-semibold text-lg leading-relaxed">
            יפה… אבל לא מדויק.
            <br />נעים… אבל לא מקצועי.
          </p>
          <p className="text-[#5A3F50] mt-2 text-base">ובפנים את יודעת: משהו פה לא יושב עד הסוף.</p>
        </div>
        <p className="text-[#5A3F50] text-lg mb-8">המדריך הדיגיטלי שילמד אותך לחשוב, לבחור ולעצב כמו מקצוענית!</p>
        <div className="mb-10">
          <ImagePlaceholder
            label="תמונת אווירה — חדר מעוצב"
            aspect="16/9"
            hint="סלון / חדר שינה מעוצב ברמה מקצועית | WebP, 1200×675px"
          />
        </div>
      </Fade>
    </section>
  );
}

// ─── Video ─────────────────────────────────────────────────────────────────────

function VideoSection() {
  // ← החלפי את VIDEO_ID_HERE במזהה הסרטון שלך מ-YouTube
  const youtubeId = "VIDEO_ID_HERE";
  return (
    <section className="py-10 md:py-16 px-4 md:px-8 max-w-4xl mx-auto">
      <Fade>
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-[#1A1218]" style={{ paddingTop: "56.25%" }}>
          {youtubeId === "VIDEO_ID_HERE" ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-4">
              <p className="text-6xl">🎬</p>
              <p className="text-[#F9D0CF] text-xl font-semibold">וידאו בוריס סולטנוב</p>
              <p className="text-white/50 text-sm">יתווסף בקרוב</p>
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
      <Fade className="text-center mt-8">
        <CTAButton text="אני רוצה שיטה ברורה →" />
      </Fade>
    </section>
  );
}

// ─── Authority ─────────────────────────────────────────────────────────────────

function AuthoritySection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <Fade className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl text-[#1A1218] font-bold">
          מי עומד מאחורי השיטה?
        </h2>
      </Fade>
      <StaggerFade className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Boris Sultanov */}
        <motion.div variants={fadeUp} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8DDD0]">
          <div className="bg-[#6B1A47] py-5 px-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#4E1235] flex-shrink-0 flex items-center justify-center text-white/40 text-xs text-center leading-tight">
              תמונה<br/>80×80
            </div>
            <div>
              <p className="text-white font-bold text-xl">בוריס סולטנוב</p>
              <p className="text-[#F9D0CF] text-sm mt-1">מרצה בכיר | סטודיו ברברה ברזין</p>
            </div>
          </div>
          <div className="p-6 space-y-3 text-[#5A3F50] leading-relaxed">
            <p>מייסד מחלקת הום סטיילינג והמחלקה הבינלאומית של הסטודיו.</p>
            <p>20+ שנות ניסיון בעיצוב פנים ובהוראה — ממקום של אנשים שעשו את זה באמת.</p>
            <p className="text-[#1A1218] font-semibold">
              בוריס מלמד אותך לראות את החלל — לא רק להסתכל עליו.
            </p>
          </div>
        </motion.div>

        {/* Barbara Barzin */}
        <motion.div variants={fadeUp} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8DDD0]">
          <div className="bg-[#6B1A47] py-5 px-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#4E1235] flex-shrink-0 flex items-center justify-center text-white/40 text-xs text-center leading-tight">
              תמונה<br/>80×80
            </div>
            <div>
              <p className="text-white font-bold text-xl">ברברה ברזין</p>
              <p className="text-[#F9D0CF] text-sm mt-1">מייסדת הסטודיו | אוטוריטה מובילה בעיצוב פנים</p>
            </div>
          </div>
          <div className="p-6 space-y-3 text-[#5A3F50] leading-relaxed">
            <p>45+ שנה בתחום עיצוב הפנים בישראל — מהשמות הגדולים והוותיקים בענף.</p>
            <p>מנטורית של אלפי מעצבים ובוגרי סטודיו ברברה ברזין ברחבי הארץ.</p>
            <p className="text-[#1A1218] font-semibold">
              ברברה בנתה שיטה — לא סתם תוכן. זו המתודולוגיה שמאחורי Decorra Pro.
            </p>
          </div>
        </motion.div>
      </StaggerFade>

      <Fade>
        <div className="bg-[#FAF6F0] border border-[#E8DDD0] rounded-2xl p-6 text-center">
          <p className="text-[#1A1218] font-bold text-lg leading-relaxed">
            Decorra Pro נבנתה מתוך ניסיון אמיתי בשטח —
            <br />לא תאוריה. לא ניחושים.
          </p>
        </div>
      </Fade>
    </section>
  );
}

// ─── Marketing Video ────────────────────────────────────────────────────────────

function MarketingVideoSection() {
  const youtubeId = "MARKETING_VIDEO_ID_HERE";
  return (
    <section className="py-10 md:py-16 px-4 md:px-8 max-w-4xl mx-auto">
      <Fade>
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-[#1A1218]" style={{ paddingTop: "56.25%" }}>
          {youtubeId === "MARKETING_VIDEO_ID_HERE" ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-4">
              <p className="text-6xl">🎬</p>
              <p className="text-[#F9D0CF] text-xl font-semibold">סרטון שיווקי</p>
              <p className="text-white/50 text-sm">יתווסף בקרוב</p>
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
    </section>
  );
}

// ─── Truth ─────────────────────────────────────────────────────────────────────

function TruthSection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 max-w-3xl mx-auto text-center">
      <Fade className="space-y-6">
        <h2 className="text-2xl md:text-3xl text-[#1A1218] font-bold">
          האמת הפשוטה
        </h2>
        <div className="space-y-1 text-[#5A3F50] text-xl leading-loose">
          <p>עיצוב טוב הוא לא כישרון.</p>
          <p>הוא לא אינטואיציה.</p>
          <p className="font-bold text-[#1A1218] text-2xl"><Highlight>הוא שיטה.</Highlight></p>
        </div>
        <div className="bg-[#FAF6F0] border border-[#E8DDD0] rounded-2xl p-6 text-right">
          <p className="text-[#6B1A47] font-semibold mb-3 text-center">שיטה שאומרת לך:</p>
          {["מאיפה מתחילים", "מה עושים קודם", "איך בוחרים נכון", "ואיך הכל מתחבר לתוצאה אחת שלמה"].map((item, i) => (
            <p key={i} className="text-[#1A1218] flex items-center gap-2 mb-2 text-lg">
              <span className="text-[#6B1A47]">✦</span> {item}
            </p>
          ))}
        </div>
        <p className="text-[#1A1218] font-bold text-lg">בלי ניחושים. בלי בלבול. בלי טעויות יקרות.</p>
        <div className="bg-[#6B1A47] text-white rounded-2xl p-6 md:p-8">
          <p className="text-lg leading-relaxed mb-3">
            אם גם את מרגישה שאת &ldquo;כמעט שם&rdquo;…
            <br />אבל משהו לא מתחבר —
          </p>
          <p className="text-[#F9D0CF] font-bold text-xl">
            זה בדיוק המקום שבו רוב האנשים נתקעים.
          </p>
          <p className="text-white font-bold text-xl mt-2">
            ופה Decorra Pro משנה את המשחק.
          </p>
        </div>
      </Fade>
    </section>
  );
}

// ─── Not A Course ──────────────────────────────────────────────────────────────

function NotACourseSection() {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
        </svg>
      ),
      title: "כלי עבודה אמיתי",
      sub: "כל פרק = יישום מיידי",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      ),
      title: "שינוי בתפיסה",
      sub: "כל חלק = זווית חדשה",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
      title: "התקדמות מיידית",
      sub: "כל צפייה = צעד קדימה",
    },
  ];

  return (
    <section className="py-10 md:py-16 px-4 md:px-8 max-w-3xl mx-auto">
      <Fade>
        <div className="bg-[#1A1218] rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl text-white font-bold mb-3 text-center">
            חשוב להבין: זה לא קורס רגיל
          </h2>
          <div className="space-y-1 text-white/50 text-base mb-10 text-center">
            <p>זה לא מדריך שמתחיל באל״ף ומסתיים בתי״ו.</p>
            <p>זה לא ידע שצריך ״לסיים״ כדי להשתמש בו.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {features.map((item, i) => (
              <div key={i} className="bg-[#FAF6F0] rounded-2xl p-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#F9D0CF] flex items-center justify-center text-[#6B1A47]">
                  {item.icon}
                </div>
                <p className="text-[#1A1218] font-bold text-sm leading-snug">{item.title}</p>
                <p className="text-[#5A3F50] text-xs">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 text-center space-y-1">
            <p className="text-white font-bold text-base">גם פרק אחד נותן לך יתרון.</p>
            <p className="text-[#F9D0CF] text-sm">וכשמחברים עוד חלקים? פתאום הכל מתחיל להסתדר.</p>
          </div>
        </div>
      </Fade>
    </section>
  );
}

// ─── What You Get ──────────────────────────────────────────────────────────────

function WhatYouGetSection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <Fade className="text-center mb-10">
        <p className="text-[#5A3F50] text-lg mb-2">אז מה את מקבלת עכשיו?</p>
        <h2 className="text-2xl md:text-3xl text-[#6B1A47] mb-2 font-bold">
          DECORRA PRO
        </h2>
        <p className="text-[#5A3F50] text-lg mb-4">מבית סטודיו ברברה ברזין</p>
        <p className="text-[#1A1218] text-xl font-bold mb-1">סנונית ראשונה ומופלאה מתוך המדריך המלא!</p>
        <p className="text-[#5A3F50] text-lg mb-2">6 פרקים. 6 זוויות שונות. 6 קפיצות מדרגה בהבנה שלך.</p>
        <p className="text-[#5A3F50] leading-relaxed max-w-xl mx-auto">
          לא &ldquo;טעימה קטנה&rdquo; —{" "}
          <Highlight>אלא בסיס חכם שמתחיל לבנות לך שיטה בראש.</Highlight>
        </p>
      </Fade>

      <div className="mb-4">
        <p className="text-[#6B1A47] font-semibold text-center mb-4">6 הפרקים הזמינים עכשיו:</p>
        <StaggerFade className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {CHAPTERS.map((ch) => (
            <motion.div key={ch.number} variants={fadeUp} className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E8DDD0]">
              <div className="bg-[#6B1A47] py-3 px-5 flex items-center gap-3">
                <span className="text-white font-bold text-2xl flex-shrink-0">{ch.number}</span>
                <span className="text-[#F9D0CF] text-sm font-semibold leading-snug">{ch.name}</span>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-[#5A3F50] text-sm leading-relaxed">{ch.description}</p>
                <p className="text-[#6B1A47] font-semibold text-sm">✅ {ch.transformation}</p>
              </div>
            </motion.div>
          ))}
        </StaggerFade>

        <div className="mt-8 bg-[#FAF6F0] border border-[#E8DDD0] rounded-2xl p-6">
          <div className="text-center mb-5">
            <p className="text-[#6B1A47] font-bold text-base mb-1">✦ עוד פרקים בדרך ✦</p>
            <p className="text-[#5A3F50] text-sm">המדריך מתפתח — הנה טעימה ממה שמגיע</p>
          </div>
          <StaggerFade className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { num: 7, name: "עיצוב עם תקציב" },
              { num: 8, name: "תאורה ואווירה" },
              { num: 9, name: "טקסטיל ורכות" },
              { num: 10, name: "שילוב סגנונות" },
            ].map((ch) => (
              <motion.div key={ch.num} variants={fadeUp} className="rounded-xl overflow-hidden border border-[#E8DDD0] shadow-sm">
                <div className="bg-[#1A1218] relative" style={{ paddingTop: "62%" }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 translate-x-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="bg-[#F9D0CF] text-[#6B1A47] text-xs font-bold px-2.5 py-0.5 rounded-full">
                      בקרוב
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 text-white/25 font-bold text-xs">{ch.num}</div>
                </div>
                <div className="bg-white px-3 py-2.5 text-center">
                  <p className="text-[#1A1218] font-semibold text-xs">{ch.name}</p>
                </div>
              </motion.div>
            ))}
          </StaggerFade>
        </div>
      </div>

      <Fade className="text-center mt-10">
        <CTAButton text="אני רוצה להתחיל →" />
      </Fade>
    </section>
  );
}

// ─── Chapters Detail ───────────────────────────────────────────────────────────

function ChaptersDetailSection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <Fade className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl text-[#1A1218] font-bold">
          מה מחכה לך בפנים?
        </h2>
      </Fade>
      <StaggerFade className="grid md:grid-cols-2 gap-5 mb-8">
        {CHAPTERS.map((ch) => (
          <ChapterCard key={ch.number} chapter={ch} />
        ))}
      </StaggerFade>
      <Fade>
        <div className="bg-[#FAF6F0] border border-[#E8DDD0] rounded-2xl p-6 md:p-8 text-center">
          <p className="text-[#1A1218] font-bold text-xl mb-4">
            וזה רק ההתחלה!
          </p>
          <div className="space-y-2 mb-4">
            {[
              { icon: "🔹", text: 'עוד "סנוניות" — זוויות חדשות' },
              { icon: "🔹", text: "מודולי עומק — כניסה לעומק אמיתי" },
              { icon: "🔹", text: "שיטה שמתפתחת כל הזמן" },
            ].map((item, i) => (
              <p key={i} className="text-[#5A3F50] flex items-center gap-2 justify-center">
                <span>{item.icon}</span> {item.text}
              </p>
            ))}
          </div>
          <p className="text-[#5A3F50]">
            את לא נכנסת לקורס סגור.{" "}
            <Highlight>את נכנסת למערכת שמתפתחת איתך.</Highlight>
          </p>
        </div>
      </Fade>
    </section>
  );
}

// ─── Who Is It For ─────────────────────────────────────────────────────────────

function WhoIsItForSection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 max-w-3xl mx-auto">
      <Fade>
        <div className="bg-[#F9D0CF] rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl text-[#6B1A47] font-bold mb-5 text-center">
            למי זה מתאים?
          </h2>
          <ul className="space-y-3 mb-5">
            {[
              "מרגישה שיש לך טעם — אבל חסר לך ביטחון בבחירות",
              "מתבלבלת בין אפשרויות ולא יודעת מה לבחור",
              "קונה ולא מרוצה עד הסוף",
              "רוצה בית שנראה מקצועי באמת",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[#1A1218] text-lg">
                <span className="text-[#6B1A47] flex-shrink-0 text-xl mt-0.5">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-center text-[#1A1218] font-bold text-lg">
            זה בדיוק בשבילך.
          </p>
          <p className="text-center text-[#5A3F50] mt-1">
            גם אם את בתחילת הדרך. וגם אם את כבר בתחום — אבל חסר לך סדר.
          </p>
        </div>
      </Fade>

      <Fade className="space-y-5 text-center">
        <p className="text-[#1A1218] font-bold text-xl">כי בואי נדבר תכל&apos;ס:</p>
        <div className="space-y-2 text-[#5A3F50] text-lg leading-loose">
          <p>כמה פעמים קנית משהו — והוא פשוט לא עבד?</p>
          <p>כמה כסף הלך על טעויות? כמה זמן על התלבטויות?</p>
          <p className="italic text-[#1A1218]">&ldquo;אני לא מצליחה לשים את האצבע על הבעיה…&rdquo;</p>
        </div>
        <div className="bg-[#FAF6F0] border border-[#E8DDD0] rounded-2xl p-6">
          <p className="text-[#1A1218] font-bold text-xl mb-2">
            את לא צריכה לדעת הכל.
            <br />את רק צריכה להתחיל נכון.
          </p>
          <p className="text-[#5A3F50] text-lg">
            וששת הפרקים האלה —
            <br /><Highlight>הם בדיוק ההתחלה שאת צריכה.</Highlight>
          </p>
        </div>
      </Fade>
    </section>
  );
}

// ─── Benefits ──────────────────────────────────────────────────────────────────

function BenefitsSection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 max-w-3xl mx-auto">
      <Fade className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl text-[#1A1218] font-bold">
          כשיש שיטה — הכל משתנה
        </h2>
      </Fade>
      <Fade>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <ImagePlaceholder label="לפני" aspect="4/3" hint="חלל לפני עיצוב" />
          <ImagePlaceholder label="אחרי" aspect="4/3" hint="חלל אחרי עיצוב" />
        </div>
        <div className="bg-[#6B1A47] text-white rounded-2xl p-8 mb-8">
          <ul className="space-y-4">
            {[
              "הבחירות נהיות ברורות",
              "הבית נראה מחובר ומדויק",
              "את מפסיקה לנחש",
              "את חוסכת כסף",
              "ואת מרגישה שליטה",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-lg">
                <span className="text-[#F9D0CF] text-xl font-bold flex-shrink-0">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Fade>
    </section>
  );
}

// ─── Pricing / Form ────────────────────────────────────────────────────────────

function PricingSection() {
  return (
    <section id="form" className="py-16 md:py-20 px-4 md:px-8 max-w-3xl mx-auto">
      <Fade className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl text-[#1A1218] font-bold mb-3">
          מה תקבלי מיד אחרי ההצטרפות?
        </h2>
      </Fade>
      <Fade>
        <div className="bg-white rounded-2xl shadow-lg border border-[#E8DDD0] overflow-hidden">
          <div className="bg-[#6B1A47] py-8 px-6 text-center">
            <p className="text-[#F9D0CF] text-sm mb-2">מחיר השקה בלבד</p>
            <p className="text-white text-5xl md:text-6xl font-bold">₪450</p>
            <p className="text-[#F9D0CF] text-sm mt-2">יעלה עם השקת החלקים הבאים</p>
          </div>
          <div className="p-6 md:p-8">
            <ul className="space-y-4 mb-8">
              {[
                "גישה מיידית ל־6 הפרקים",
                "צפייה בקצב שלך מכל מכשיר",
                "ליווי בקבוצת וואטסאפ",
                "גישה להמשך התפתחות המדריך",
                "מחיר מועדף על חלקי הקורס הבאים",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[#6B1A47] font-bold text-xl flex-shrink-0">✔</span>
                  <span className="text-[#1A1218] text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <form
              className="space-y-4"
              onSubmit={(e) => { e.preventDefault(); alert("תודה! נחזור אלייך בקרוב."); }}
            >
              <input type="text" placeholder="שם מלא *" required dir="rtl"
                className="w-full border border-[#E8DDD0] rounded-xl px-4 py-4 text-[#1A1218] bg-[#FAF6F0] focus:outline-none focus:border-[#6B1A47] text-right text-base transition-colors" />
              <input type="email" placeholder="כתובת מייל *" required dir="rtl"
                className="w-full border border-[#E8DDD0] rounded-xl px-4 py-4 text-[#1A1218] bg-[#FAF6F0] focus:outline-none focus:border-[#6B1A47] text-right text-base transition-colors" />
              <input type="tel" placeholder="טלפון נייד *" required dir="ltr" style={{ textAlign: "right" }}
                className="w-full border border-[#E8DDD0] rounded-xl px-4 py-4 text-[#1A1218] bg-[#FAF6F0] focus:outline-none focus:border-[#6B1A47] text-base transition-colors" />
              <button type="submit"
                className="w-full bg-[#6B1A47] hover:bg-[#4E1235] active:scale-[0.99] text-white text-xl font-bold py-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                הצטרפי עכשיו →
              </button>
            </form>
          </div>
        </div>
      </Fade>
    </section>
  );
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────

function FAQSection() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 max-w-3xl mx-auto">
      <Fade className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl text-[#1A1218] font-bold">
          שאלות נפוצות
        </h2>
      </Fade>
      <div className="bg-white rounded-2xl shadow-sm border border-[#E8DDD0] px-6 md:px-8 py-2">
        {FAQ_ITEMS.map((item, i) => (
          <FAQAccordionItem key={i} item={item} />
        ))}
      </div>
    </section>
  );
}

// ─── Urgency CTA ───────────────────────────────────────────────────────────────

function UrgencySection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-3xl mx-auto text-center">
      <Fade>
        <div className="bg-[#1A1218] text-white rounded-2xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            אם לא תעשי שינוי עכשיו…
          </h2>
          <p className="text-[#F9D0CF] text-lg md:text-xl leading-loose mb-6">
            סביר שתמשיכי:
            <br />להתלבט,
            <br />לבזבז כסף,
            <br />ולהישאר עם בית &ldquo;כמעט&rdquo;.
          </p>
          <p className="text-white text-xl font-bold mb-1">אבל אם את רוצה אחרת —</p>
          <p className="text-[#F9D0CF] text-lg">ביטחון, דיוק ושקט בראש —</p>
        </div>
        <p className="text-[#5A3F50] text-lg mb-1 font-semibold">Decorra Pro מבית סטודיו ברברה ברזין</p>
        <p className="text-[#1A1218] text-xl font-bold mb-8">
          היא השיטה שתלמד אותך לעצב נכון — כבר מהצעד הראשון
        </p>
        <div className="flex justify-center">
          <CTAButton text="הצטרפי עכשיו →" />
        </div>
      </Fade>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#6B1A47] text-white py-8 px-4 text-center">
      <p className="text-[#F9D0CF] text-sm leading-relaxed">
        © {new Date().getFullYear()} סטודיו ברברה ברזין | Decorra Pro
        <br />כל הזכויות שמורות
        <br />
        <span className="text-white/60 text-xs mt-2 block">
          * Decorra Pro הוא מדריך דיגיטלי מבית סטודיו ברברה ברזין — ולא קורס אישי של ברברה ברזין.
        </span>
      </p>
    </footer>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function DecoraProPage() {
  return (
    <main dir="rtl" className="bg-[#FAF6F0] text-[#1A1218] overflow-x-hidden">
      <div className="bg-[#6B1A47] text-white text-center py-3 px-4 text-sm font-medium">
        🎉 מחיר השקה | Decorra Pro חלק 1 | ₪450 בלבד — לזמן מוגבל
      </div>
      <NavBar />
      <HeroSection />
      <Divider />
      <VideoSection />
      <Divider />
      <AuthoritySection />
      <Divider />
      <MarketingVideoSection />
      <Divider />
      <TruthSection />
      <Divider />
      <NotACourseSection />
      <Divider />
      <WhatYouGetSection />
      <Divider />
      <ChaptersDetailSection />
      <Divider />
      <WhoIsItForSection />
      <Divider />
      <BenefitsSection />
      <Divider />
      <PricingSection />
      <Divider />
      <FAQSection />
      <Divider />
      <UrgencySection />
      <Footer />
    </main>
  );
}
