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
interface Founder {
  name: string;
  title: string;
  leadStat?: string;
  credentials: string[];
  quote: string;
}
interface Testimonial {
  name: string;
  title: string;
  quote: string;
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
      'ברברה ובוריס ילמדו אותך להתחיל מהשאלה הנכונה: איך נראים "חיים טובים" — ואיך זה מתבטא בבית שלך.',
    transformation: 'אחרי הפרק הזה תפסיקי לעצב "יפה" — ותתחילי לעצב עם כוונה.',
  },
  {
    number: 2,
    name: "סידור מדף: הקומפוזיציה שמשנה הכל",
    description: "שיטה פשוטה שעובדת תוך דקות — על כל משטח, בכל חדר, בכל בית.",
    transformation: "אחרי הפרק הזה תסתכלי אחרת על כל פינה בבית.",
  },
  {
    number: 3,
    name: "צבע: להפסיק לפחד ולהתחיל לבחור",
    description:
      "איך לבחור צבע נכון — גם בלי להיות מומחית, גם בלי תואר, גם בלי ניסיון קודם.",
    transformation: "אחרי הפרק הזה תקבלי החלטות צבע בלי להתחרט.",
  },
  {
    number: 4,
    name: "שרטוטים: לקרוא תוכנית כמו מקצוענית",
    description:
      "איך להפוך תוכנית עמידה לכלי עבודה אמיתי — ולבחור פריטים בדיוק מלא.",
    transformation: "אחרי הפרק הזה תפסיקי לנחש גדלים.",
  },
  {
    number: 5,
    name: "שיטת הבצל: לזהות מה לא עובד",
    description:
      "השיטה שמלמדת אותך לפרק כל חלל שכבה אחרי שכבה — ולזהות בדיוק מאיפה מתחילים לתקן.",
    transformation: "אחרי הפרק הזה תלמדי לחשוב על חלל — לא רק להרגיש אותו.",
  },
  {
    number: 6,
    name: "סיור באולם תצוגה: לקנות כמו מקצוענית",
    description:
      "איך להיכנס לחנות עם ראש ברור — ולצאת עם פריטים שמתחברים לתמונה שלמה.",
    transformation: "אחרי הפרק הזה תראי את הבית כולו — לא רק פריט אחד.",
  },
];

const FOUNDERS: Founder[] = [
  {
    name: "ברברה ברזין",
    title: "מעצבת פנים בכירה | מייסדת הסטודיו הוותיק בישראל להכשרת מתכנני פנים",
    leadStat: "70% ממעצבי הפנים העובדים בישראל היום — הוכשרו על ידה.",
    credentials: [
      "45 שנות ניסיון בשטח — 3,600+ פרויקטים בארץ ובעולם",
      "הסטודיו הוותיק בישראל להכשרת מתכנני פנים — מאז 1998",
      "בוגרת הסדנא לעיצוב ואדריכלות | שותפה בצוות תכנון בית המשפט העליון",
      "מרצה מבוקשת | מאמרים וטורים במגזיני עיצוב מובילים",
      "מנחה-שותפה בפודקאסט עיצוב הפנים המוביל בישראל",
    ],
    quote:
      "ראיתי כבר כל טעות אפשרית, כל תרגיל של קבלן, כל כשל בתכנון. Decorra Pro הוא 45 שנה דחוסות לשיטה שכל אחת יכולה ללמוד.",
  },
  {
    name: "בוריס סולטנוב",
    title: "מעצב פנים בכיר | רכז המחלקה הבינלאומית | חוקר תרבות יפן",
    credentials: [
      "מעל 20 שנה כמעצב פנים ומרצה בכיר בסטודיו ברברה ברזין",
      "חוקר תרבות יפן ומומחה לפנג שואי ופילוסופיה סינית",
      'מלמד בשיטת "האומן והשולייה" — ידע שעובר מיד ליד, לא מסלייד לסלייד',
      "מנחה-שותף בפודקאסט עיצוב הפנים המוביל בישראל",
    ],
    quote: "עיצוב טוב הוא לא טרנד. הוא שפה. וכל שפה — אפשר ללמוד.",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "רינת קינן",
    title: "בוגרת הסטודיו",
    quote:
      "שנת ההתמחות המעשית מיישמת את מה שלמדת בתיאוריה דרך פרויקטים אמיתיים — ונותנת כלים מעשיים יקרי ערך להתמודד עם תהליכים מורכבים.",
  },
  {
    name: "הדס בראון-שדות",
    title: "מהנדסת אזרחית ← בוגרת הסטודיו ← בעלת סטודיו עצמאי",
    quote:
      "ברברה היא אישיות. למדתי ממנה לשים את האגו בצד ולזכור שאנחנו יוצרות בתים עבור אחרים — לא עבור השרטוטים שלנו.",
  },
  {
    name: "צוף הלפרין",
    title: "בוגרת הסטודיו ← בעלת סטודיו עצמאי",
    quote:
      "האינטראקציה האינטימית והגישה האישית גרמו לי לוודא שזה המקום הנכון. כל שיעור היה פיצוץ בלתי רגיל של אנרגיה וידע.",
  },
  {
    name: "איריס סוכר",
    title: "מעצבת גרפית ← בוגרת הסטודיו",
    quote:
      "אין קיצורי דרך — לא כסטודנטית ולא כבעלת סטודיו עצמאי בעולם האמיתי. הסטודיו נותן כלים של מקצועיות ואסרטיביות.",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "6 פרקים — זה מספיק?",
    a: "כל פרק הוא כלי עבודה אמיתי — לא שיעור תיאורטי. יחד הם יוצרים בסיס שישנה את הדרך שבה את רואה כל חלל. וזו רק ההתחלה — עוד חלקים בדרך.",
  },
  {
    q: "זה מתאים גם למתחילות לגמרי?",
    a: "כן. לא צריך ידע קודם, לא צריך רקע בעיצוב. רק רצון ללמוד שיטה.",
  },
  {
    q: "זה מתאים גם למי שכבר עוסקת בתחום?",
    a: "מאוד. במיוחד למי שמרגישה שחסר לה סדר או ביטחון בהלבשה ובבחירות.",
  },
  {
    q: "תוך כמה זמן רואים שינוי?",
    a: "כבר תוך כדי צפייה. כל פרק נותן כלי שאפשר להשתמש בו — עוד באותו היום.",
  },
  {
    q: "מה קורה עם החלקים הבאים של הקורס?",
    a: "Decorra Pro מתפתח כמו מערכת — עוד חלקים בדרך. מי שנכנסת עכשיו במחיר ההשקה תקבל גישה לחלקים הבאים במחיר מועדף.",
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

function Fade({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerFade({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Shared UI ─────────────────────────────────────────────────────────────────

const SERIF = "var(--font-playfair), 'Playfair Display', Georgia, serif";

function CTAButton({ text = "אני מצטרפת עכשיו ב-₪450 →" }: { text?: string }) {
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
    <mark className="bg-[#F9D0CF] text-[#1A1218] px-1 rounded not-italic">
      {children}
    </mark>
  );
}

function StatCard({ emoji, text }: { emoji: string; text: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-[#FAF6F0] border border-[#F9D0CF] rounded-xl p-5 flex gap-3 items-start"
    >
      <span className="text-2xl flex-shrink-0">{emoji}</span>
      <p className="text-[#1A1218] leading-relaxed text-base">{text}</p>
    </motion.div>
  );
}

function BadOptionCard({
  title,
  consequence,
}: {
  title: string;
  consequence: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white rounded-xl p-6 border border-[#E8DDD0] shadow-sm"
    >
      <div className="flex items-start gap-2 mb-2">
        <span className="text-red-400 text-lg flex-shrink-0 mt-0.5">✗</span>
        <h4 className="font-bold text-[#1A1218] text-lg leading-snug">{title}</h4>
      </div>
      <p className="text-[#5A3F50] leading-relaxed pr-6">{consequence}</p>
    </motion.div>
  );
}

function ChapterCard({ chapter }: { chapter: Chapter }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white rounded-xl p-6 border-r-4 border-[#6B1A47] shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start gap-4">
        <span
          className="text-3xl font-bold text-[#6B1A47] flex-shrink-0 leading-none mt-1"
          style={{ fontFamily: SERIF }}
        >
          {chapter.number}
        </span>
        <div className="flex-1 min-w-0">
          <h3
            className="text-lg font-bold text-[#1A1218] mb-2 leading-snug"
            style={{ fontFamily: SERIF }}
          >
            {chapter.name}
          </h3>
          <p className="text-[#5A3F50] mb-3 leading-relaxed text-sm md:text-base">
            {chapter.description}
          </p>
          <p className="text-[#6B1A47] font-semibold text-sm">
            ✅ {chapter.transformation}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function FounderCard({ founder }: { founder: Founder }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white rounded-2xl overflow-hidden shadow-md"
    >
      <div className="bg-[#6B1A47] py-5 px-6">
        <h3 className="text-white text-2xl md:text-3xl" style={{ fontFamily: SERIF }}>
          {founder.name}
        </h3>
        <p className="text-[#F9D0CF] text-sm mt-1 leading-snug">{founder.title}</p>
      </div>
      <div className="p-6">
        {founder.leadStat && (
          <div className="bg-[#F9D0CF] text-[#1A1218] rounded-xl p-4 mb-5 flex gap-2 items-start">
            <span className="text-xl flex-shrink-0">👀</span>
            <p className="font-bold text-base leading-snug">{founder.leadStat}</p>
          </div>
        )}
        <ul className="space-y-3 mb-5">
          {founder.credentials.map((cred, i) => (
            <li key={i} className="flex items-start gap-2 text-[#5A3F50] text-sm md:text-base">
              <span className="text-[#6B1A47] flex-shrink-0 mt-0.5">✦</span>
              <span>{cred}</span>
            </li>
          ))}
        </ul>
        <blockquote className="border-r-4 border-[#F9D0CF] pr-4 text-[#5A3F50] italic leading-relaxed text-sm md:text-base">
          &ldquo;{founder.quote}&rdquo;
        </blockquote>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8DDD0] flex flex-col"
    >
      <p className="text-[#5A3F50] leading-relaxed mb-5 italic flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="border-t border-[#E8DDD0] pt-4">
        <p className="font-bold text-[#1A1218]">{t.name}</p>
        <p className="text-sm text-[#6B1A47]">{t.title}</p>
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
        <span className="font-semibold text-[#1A1218] text-base leading-snug text-right">
          {item.q}
        </span>
        <span className="text-[#6B1A47] text-2xl flex-shrink-0 font-light w-6 text-center">
          {open ? "−" : "+"}
        </span>
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

// ─── Page Sections ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="py-16 md:py-28 px-4 md:px-8 max-w-3xl mx-auto text-center">
      <Fade>
        <p className="text-[#6B1A47] font-semibold text-sm uppercase tracking-widest mb-3">
          סוף לבית ה&apos;כמעט&apos;.
        </p>
        <p className="text-[#5A3F50] text-base mb-8">ברוכה הבאה ל-Decorra Pro.</p>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl text-[#1A1218] leading-tight mb-6"
          style={{ fontFamily: SERIF }}
        >
          את לא מתבלבלת
          <br />
          כי אין לך טעם.
          <br />
          <span className="text-[#6B1A47]">את מתבלבלת</span>
          <br />
          כי אין לך שיטה.
          <br />
          <span className="text-[#6B1A47]">ועכשיו — יש.</span>
        </h1>
        <p className="text-[#5A3F50] text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto">
          המדריך הדיגיטלי מבית סטודיו ברברה ברזין שילמד אותך לחשוב, לבחור
          ולעצב — כמו מקצוענית.
        </p>
        <div className="flex justify-center">
          <CTAButton text="אני רוצה שיטה ברורה →" />
        </div>
      </Fade>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <Fade className="text-center mb-10">
        <p className="text-[#6B1A47] font-semibold text-sm uppercase tracking-widest mb-4">
          קצר ולעניין:
        </p>
        <p className="text-[#1A1218] text-xl md:text-2xl font-semibold leading-relaxed">
          עד היום, מי שרצתה לעצב את הבית שלה עמדה בפני 2 אפשרויות בלבד.
        </p>
      </Fade>
      <StaggerFade className="grid md:grid-cols-2 gap-6 mb-12">
        <BadOptionCard
          title="לשכור מעצבת פנים"
          consequence="₪5,000–12,000 לחלל אחד. תוצאה יפה — אבל את עדיין לא מבינה למה זה עובד. ולפעם הבאה? חוזרת לאותה נקודת התחלה."
        />
        <BadOptionCard
          title="לנסות לבד"
          consequence="Pinterest, אינסטגרם, המון השראה — ובסוף: קנייה, אכזבה, ועוד פריט במחסן שלא 'התחבר'."
        />
      </StaggerFade>
      <Fade className="bg-[#6B1A47] text-white rounded-2xl p-8 text-center mb-12">
        <p className="text-lg md:text-xl font-semibold mb-2">בגלל זה בנינו את Decorra Pro.</p>
        <p className="text-[#F9D0CF] mb-6">שיטה שמלמדת אותך:</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {[
            "לחשוב עם המבט של מקצוענית — כבר מהצעד הראשון",
            "לבחור פריטים שמדברים אחד עם השני",
            "לעצב עם כוונה — לא עם ניחוש",
          ].map((p, i) => (
            <div key={i} className="flex items-start gap-2 text-right">
              <span className="text-[#F9D0CF] flex-shrink-0">✦</span>
              <span className="text-sm md:text-base">{p}</span>
            </div>
          ))}
        </div>
      </Fade>
      <StaggerFade className="grid sm:grid-cols-2 gap-4">
        <StatCard
          emoji="👈"
          text="בישראל, עלות ייעוץ עיצוב לחלל אחד עומדת על ₪4,500–12,000 בממוצע — עבור שעות בודדות של עבודה."
        />
        <StatCard
          emoji="👈"
          text="מי שמנסה לעצב לבד בלי שיטה, מוציאה בממוצע 3–5 פעמים יותר כסף ממה שתכננה — על פריטים שנגנזים."
        />
        <StatCard
          emoji="👈"
          text='הסיבה מספר 1 לכך שחלל "לא יושב" — היא לא בחירת פריטים רעה. זו היעדר סדר פעולות.'
        />
        <StatCard
          emoji="👈"
          text='90% מהנשים שמרגישות שחסר להן "טעם" — מגלות עם השיטה הנכונה שהטעם היה שם כל הזמן.'
        />
      </StaggerFade>
    </section>
  );
}

function PainSection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 max-w-3xl mx-auto">
      <Fade className="text-center mb-10">
        <h2
          className="text-3xl md:text-4xl text-[#1A1218] leading-tight mb-8"
          style={{ fontFamily: SERIF }}
        >
          יפה… אבל לא מדויק.
          <br />
          <span className="text-[#6B1A47]">נעים… אבל לא מקצועי.</span>
          <br />
          ואת יודעת בדיוק במה מדובר.
        </h2>
        <div className="space-y-4 text-[#5A3F50] text-lg leading-loose">
          <p>
            זה לא הפריטים. הם יפים.
            <br />
            זה לא הצבעים. הם נחמדים.
            <br />
            זה לא הטעם שלך. הוא קיים.
          </p>
          <p>
            הבעיה היא שבלי סדר פעולות ברור —
            <br />
            אפילו עיניים טובות לא יודעות מאיפה להתחיל.
          </p>
          <p>
            אז את מסדרת. ומסדרת שוב. ומסדרת שוב.
            <br />
            ובכל פעם מחדש — משהו לא יושב עד הסוף.
          </p>
          <p className="font-bold text-[#1A1218] text-xl">
            זה לא כישלון של טעם.
            <br />
            <Highlight>זה כישלון של שיטה.</Highlight>
          </p>
        </div>
      </Fade>

      <Fade className="text-center mb-8">
        <p className="text-[#5A3F50] font-semibold">
          ואת כנראה כבר ניסית את אחת מהאפשרויות האלה:
        </p>
      </Fade>

      <StaggerFade className="space-y-4 mb-10">
        <BadOptionCard
          title="לשאול את כולם מה דעתם"
          consequence="אמא אומרת אחד, החברה אומרת אחר, הבעל לא מבין מה ההבדל — ואת יוצאת מהשיחה מבולבלת יותר ממה שנכנסת אליה."
        />
        <BadOptionCard
          title="לחפש השראה בפינטרסט ואינסטגרם"
          consequence="שעה וחצי של גלילה. 47 תמונות שמורות. ואף אחת מהן לא מתאימה לחלל האמיתי שלך, לתקציב שלך, או לחיים שלך."
        />
        <BadOptionCard
          title='לקנות "פריט מושלם" ולקוות שיעבוד'
          consequence="הוא יושב בסלון. הוא יפה. אבל משהו לא מתחבר. שבוע אחרי — הוא במחסן. והכסף הלך."
        />
      </StaggerFade>

      <Fade>
        <div className="bg-[#F9D0CF] rounded-2xl p-6 md:p-8 text-center">
          <p className="text-[#1A1218] text-lg md:text-xl font-bold leading-relaxed">
            הבעיה אף פעם לא הייתה הטעם שלך.
            <br />
            הבעיה הייתה שאף אחד לא לימד אותך את הסדר הנכון.
          </p>
        </div>
      </Fade>
    </section>
  );
}

function InlineCTA() {
  return (
    <div className="py-10 px-4 flex justify-center">
      <CTAButton />
    </div>
  );
}

function TurningPointSection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 max-w-3xl mx-auto text-center">
      <Fade className="space-y-6">
        <h2
          className="text-3xl md:text-4xl text-[#1A1218]"
          style={{ fontFamily: SERIF }}
        >
          אחרי 45 שנה — הבנתי שיש כאן בעיה רצינית.
        </h2>
        <div className="space-y-4 text-[#5A3F50] text-lg leading-loose">
          <p>
            לאורך ארבעה עשורים ויותר של עיצוב פנים,
            <br />
            פגשתי אלפי נשים עם עין מדהימה.
          </p>
          <p>
            נשים שחיפשו, חלמו, שמרו תמונות —
            <br />
            וכשהגיע הרגע לבחור באמת? נתקעו.
          </p>
          <div className="bg-[#FAF6F0] border border-[#E8DDD0] rounded-2xl p-6 my-4 text-right">
            <p className="text-[#1A1218] italic text-xl leading-relaxed">
              &ldquo;אני לא יודעת מה חסר לי, ברברה.
              <br />
              יש לי טעם, אני יודעת מה יפה —
              <br />
              אבל כשצריך להחליט? משהו נתקע.&rdquo;
            </p>
            <p className="text-[#6B1A47] text-sm mt-3 font-semibold">
              — המשפט שחזר אלפי פעמים
            </p>
          </div>
          <p className="font-bold text-[#1A1218] text-xl">
            הן לא צריכות מעצבת שתחליט במקומן.
            <br />
            <Highlight>הן צריכות שיטה שתלמד אותן לחשוב.</Highlight>
          </p>
        </div>

        <div className="pt-4 space-y-4">
          <h3
            className="text-2xl md:text-3xl text-[#6B1A47]"
            style={{ fontFamily: SERIF }}
          >
            זה הרגע שבו החלטתי לעשות משהו אחר לגמרי.
          </h3>
          <div className="space-y-3 text-[#5A3F50] text-lg leading-loose">
            <p>לא עוד ייעוץ חד-פעמי שנגמר כשאני יוצאת מהדלת.</p>
            <p>לא עוד &ldquo;תקני את זה ואת זה&rdquo; בלי להסביר למה.</p>
            <p className="font-semibold text-[#1A1218]">
              אלא שיטה שלמה שנבנתה מתוך 45 שנה של עבודה אמיתית בשטח —
              <br />
              שהופכת את ה&ldquo;כמעט&rdquo; ל
              <Highlight>&ldquo;בדיוק כמו שדמיינתי&rdquo;</Highlight>.
            </p>
          </div>
        </div>
      </Fade>
    </section>
  );
}

function AuthoritySection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <Fade className="text-center mb-12">
        <h2
          className="text-3xl md:text-4xl text-[#1A1218] mb-3"
          style={{ fontFamily: SERIF }}
        >
          מי עומדת מאחורי השיטה?
        </h2>
        <p className="text-[#6B1A47] text-xl font-semibold">
          האישה שעיצבה את תעשיית עיצוב הפנים בישראל.
        </p>
      </Fade>
      <StaggerFade className="grid md:grid-cols-2 gap-8 mb-8">
        {FOUNDERS.map((f) => (
          <FounderCard key={f.name} founder={f} />
        ))}
      </StaggerFade>
      <Fade>
        <div className="bg-[#6B1A47] text-white rounded-2xl p-6 md:p-8 text-center">
          <p
            className="text-xl md:text-2xl font-bold leading-relaxed"
            style={{ fontFamily: SERIF }}
          >
            65 שנות ניסיון משולב. מזרח ומערב. תיאוריה ושטח.
          </p>
          <p className="text-[#F9D0CF] text-lg mt-2">
            ועכשיו — הכל דחוס לשיטה אחת ברורה.
          </p>
        </div>
      </Fade>
    </section>
  );
}

function SolutionSection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <Fade className="text-center mb-12">
        <p className="text-[#5A3F50] text-lg mb-4">ועכשיו, אחרי 45 שנה בשטח —</p>
        <h2
          className="text-5xl md:text-6xl text-[#6B1A47] mb-2 tracking-wide"
          style={{ fontFamily: SERIF }}
        >
          DECORRA PRO
        </h2>
        <p className="text-[#5A3F50] text-lg mb-6">מבית סטודיו ברברה ברזין</p>
        <p className="text-[#1A1218] text-xl md:text-2xl font-semibold max-w-2xl mx-auto leading-relaxed mb-8">
          המדריך הדיגיטלי שילמד אותך לחשוב, לבחור ולעצב כמו מקצוענית —
          <br />
          בלי לנחש, בלי לבזבז, בלי להרגיש שמשהו &ldquo;לא יושב עד הסוף&rdquo;.
        </p>
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-xl mx-auto">
          {[
            { num: "6", label: "פרקים" },
            { num: "6", label: "כלי עבודה אמיתיים" },
            { num: "גישה", label: "מיידית" },
            { num: "כל", label: "הרמות" },
          ].map((s) => (
            <div key={s.label} className="bg-[#F9D0CF] rounded-xl p-3 text-center">
              <p className="text-[#6B1A47] text-xl md:text-2xl font-bold leading-none">
                {s.num}
              </p>
              <p className="text-[#5A3F50] text-xs md:text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </Fade>

      <StaggerFade className="grid md:grid-cols-2 gap-5 mb-8">
        {CHAPTERS.map((ch) => (
          <ChapterCard key={ch.number} chapter={ch} />
        ))}
      </StaggerFade>

      <Fade>
        <div className="bg-[#FAF6F0] border border-[#E8DDD0] rounded-2xl p-6 text-center">
          <p className="text-[#1A1218] font-bold text-lg mb-1">זו רק ההתחלה.</p>
          <p className="text-[#5A3F50] leading-relaxed">
            Decorra Pro נבנה כמו פאזל — כל פרק מוסיף שכבה.
            <br />
            את לא נכנסת לקורס סגור.{" "}
            <Highlight>את נכנסת למערכת שמתפתחת איתך.</Highlight>
          </p>
        </div>
      </Fade>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <Fade className="text-center mb-10">
        <h2
          className="text-3xl md:text-4xl text-[#1A1218] mb-2"
          style={{ fontFamily: SERIF }}
        >
          מה אומרות מי שלמדו עם ברברה ובוריס
        </h2>
        <p className="text-[#6B1A47] font-semibold">בוגרות סטודיו ברברה ברזין</p>
      </Fade>
      <StaggerFade className="grid sm:grid-cols-2 gap-6 mb-6">
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </StaggerFade>
      <Fade>
        <p className="text-center text-[#5A3F50] text-sm italic">
          * עדויות אלו הן של בוגרות הסטודיו המקצועי של ברברה ברזין.
          <br />
          Decorra Pro הוא מוצר חדש — והעדויות הראשונות שלו בדרך.
        </p>
      </Fade>
    </section>
  );
}

function UrgencySection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 max-w-3xl mx-auto text-center">
      <Fade>
        <div className="bg-[#1A1218] text-white rounded-2xl p-8 md:p-12">
          <p
            className="text-3xl md:text-4xl mb-6"
            style={{ fontFamily: SERIF }}
          >
            הבית לא ישתנה לבד.
          </p>
          <p className="text-[#F9D0CF] text-lg md:text-xl leading-loose mb-6">
            אבל כל שנה שעוברת בלי שיטה —
            <br />
            זה עוד כסף על פריטים שלא עובדים,
            <br />
            עוד סידור מחדש שמסתיים ב&ldquo;כמעט&rdquo;,
            <br />
            ועוד תחושה שמשהו חסר — בלי לדעת מה. 👀
          </p>
          <p className="text-white text-xl font-bold">
            השיטה לא מגיעה לבד. היא נלמדת. ועכשיו — היא כאן.
          </p>
        </div>
      </Fade>
    </section>
  );
}

function WhyStorySection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 max-w-3xl mx-auto">
      <Fade className="text-center space-y-5">
        <h2
          className="text-3xl md:text-4xl text-[#1A1218]"
          style={{ fontFamily: SERIF }}
        >
          למה יצרנו את Decorra Pro?
        </h2>
        <div className="space-y-4 text-[#5A3F50] text-lg leading-loose">
          <p>
            לאורך 45 שנה, ראיתי אלפי נשים עם עין מדהימה — שנתקעו.
            <br />
            לא מחוסר כישרון.{" "}
            <strong className="text-[#1A1218]">מחוסר שיטה.</strong>
          </p>
          <p>
            ייעוץ עיצוב אישי עולה אלפי שקלים. קורס מקצועי לוקח שנים.
            <br />
            ואת, שרק רוצה שהבית שלך ייראה כמו שדמיינת —<br />
            נשארת לבד עם Pinterest וניחושים.
          </p>
          <p className="font-bold text-[#1A1218]">
            זה לא הוגן. וזה מה שהניע אותי ליצור את Decorra Pro.
          </p>
          <p>
            לדחוס 45 שנה של עבודה אמיתית בשטח —
            <br />
            לכלים פשוטים, ברורים ומיידיים.
            <br />
            שכל אחת יכולה ללמוד, להפנים, ולהשתמש בהם —{" "}
            <Highlight>עוד היום.</Highlight>
          </p>
        </div>
      </Fade>

      <Fade className="mt-12">
        <div className="bg-[#F9D0CF] rounded-2xl p-6 md:p-8">
          <p
            className="text-[#6B1A47] text-xl font-bold mb-6 text-center"
            style={{ fontFamily: SERIF }}
          >
            Decorra Pro מתאים לך אם:
          </p>
          <ul className="space-y-4">
            {[
              "את מרגישה שיש לך טעם — אבל חסר לך ביטחון בבחירות",
              "את מתבלבלת בין אפשרויות ולא יודעת מה לבחור",
              "קנית פריטים שלא עבדו — ולא הבנת למה",
              "את רוצה בית שנראה מחובר, מדויק ומקצועי",
              "את בתחילת הדרך — ורוצה להתחיל נכון",
              "את כבר בתחום — ומרגישה שחסר לך סדר",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[#1A1218]">
                <span className="text-[#6B1A47] flex-shrink-0 mt-0.5 text-xl">✦</span>
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-[#5A3F50] leading-relaxed">
            גם אם לא עיצבת בחיים.
            <br />
            גם אם ניסית כבר ולא הצלחת.
            <br />
            <strong className="text-[#1A1218]">
              השיטה עובדת — כי היא לא מבוססת על כישרון. היא מבוססת על סדר.
            </strong>
          </p>
        </div>
      </Fade>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="form" className="py-16 md:py-20 px-4 md:px-8 max-w-3xl mx-auto">
      <Fade className="text-center mb-10">
        <h2
          className="text-3xl md:text-4xl text-[#1A1218] mb-4"
          style={{ fontFamily: SERIF }}
        >
          כמה זה עולה?
        </h2>
        <div className="inline-block bg-[#FAF6F0] border border-[#E8DDD0] rounded-xl px-5 py-4 mb-6">
          <p className="text-[#5A3F50] line-through text-base">
            ייעוץ עיצוב פנים לחלל אחד: ₪4,500–12,000
          </p>
          <p className="text-[#5A3F50] text-sm mt-1">
            (ואת עדיין לא יודעת למה זה עובד)
          </p>
        </div>
      </Fade>

      <Fade>
        <div className="bg-white rounded-2xl shadow-lg border border-[#E8DDD0] overflow-hidden">
          {/* Price header */}
          <div className="bg-[#6B1A47] py-8 px-6 text-center">
            <p className="text-[#F9D0CF] text-sm mb-2">
              ב-Decorra Pro חלק 1 את מקבלת:
            </p>
            <p className="text-white text-5xl md:text-6xl font-bold" style={{ fontFamily: SERIF }}>
              ₪450
            </p>
            <p className="text-[#F9D0CF] text-sm mt-2">
              מחיר השקה בלבד — יעלה עם השקת החלקים הבאים
            </p>
          </div>

          {/* Included */}
          <div className="p-6 md:p-8">
            <ul className="space-y-4 mb-8">
              {[
                "גישה מיידית ל-6 הפרקים",
                "6 כלי עבודה שתשתמשי בהם כל חיים",
                "ליווי בקבוצת וואטסאפ",
                "גישה להמשך פיתוח המדריך",
                "מחיר מועדף על חלקי הקורס הבאים",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[#6B1A47] font-bold text-xl flex-shrink-0 leading-snug">
                    ✔
                  </span>
                  <span className="text-[#1A1218] text-lg leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            {/* Form */}
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("תודה! נחזור אלייך בקרוב.");
              }}
            >
              <input
                type="text"
                placeholder="שם מלא *"
                required
                dir="rtl"
                className="w-full border border-[#E8DDD0] rounded-xl px-4 py-4 text-[#1A1218] bg-[#FAF6F0] focus:outline-none focus:border-[#6B1A47] text-right text-base transition-colors"
              />
              <input
                type="email"
                placeholder="כתובת מייל *"
                required
                dir="rtl"
                className="w-full border border-[#E8DDD0] rounded-xl px-4 py-4 text-[#1A1218] bg-[#FAF6F0] focus:outline-none focus:border-[#6B1A47] text-right text-base transition-colors"
              />
              <input
                type="tel"
                placeholder="טלפון נייד *"
                required
                dir="ltr"
                style={{ textAlign: "right" }}
                className="w-full border border-[#E8DDD0] rounded-xl px-4 py-4 text-[#1A1218] bg-[#FAF6F0] focus:outline-none focus:border-[#6B1A47] text-base transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-[#6B1A47] hover:bg-[#4E1235] active:scale-[0.99] text-white text-xl font-bold py-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                אני מצטרפת עכשיו ב-₪450 →
              </button>
            </form>

            <p className="text-center text-[#5A3F50] text-sm mt-5 leading-relaxed">
              זהו מחיר ההשקה של Decorra Pro חלק 1.
              <br />
              ברגע שיושקו החלקים הבאים — המחיר עולה.
              <br />
              <strong className="text-[#6B1A47]">
                מי שנכנסת עכשיו, נכנסת ראשונה ובמחיר הכי טוב שיהיה.
              </strong>
            </p>
          </div>
        </div>
      </Fade>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 max-w-3xl mx-auto">
      <Fade className="text-center mb-8">
        <h2
          className="text-3xl md:text-4xl text-[#1A1218]"
          style={{ fontFamily: SERIF }}
        >
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

function FinalCTASection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-3xl mx-auto text-center">
      <Fade>
        <h2
          className="text-3xl md:text-4xl text-[#1A1218] mb-4"
          style={{ fontFamily: SERIF }}
        >
          מוכנה להפסיק לנחש?
        </h2>
        <p className="text-[#5A3F50] text-xl mb-10 leading-relaxed">
          הצטרפי עכשיו במחיר ההשקה
          <br />
          ותתחילי לעצב עם שיטה — כבר מהפרק הראשון.
        </p>
        <div className="flex justify-center mb-6">
          <CTAButton />
        </div>
        <p className="text-[#5A3F50] text-sm">
          ₪450 · גישה מיידית · מחיר השקה · Decorra Pro חלק 1
        </p>
      </Fade>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#6B1A47] text-white py-8 px-4 text-center">
      <p className="text-[#F9D0CF] text-sm leading-relaxed">
        © {new Date().getFullYear()} סטודיו ברברה ברזין | Decorra Pro
        <br />
        כל הזכויות שמורות
      </p>
    </footer>
  );
}

// ─── Nav Bar ───────────────────────────────────────────────────────────────────

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8DDD0] py-3 px-4 md:px-8">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <a
          href="#form"
          className="bg-[#6B1A47] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#4E1235] transition-colors"
        >
          הצטרפות →
        </a>
        <div className="text-center">
          <p className="font-bold text-[#6B1A47] text-base" style={{ fontFamily: SERIF }}>
            Decorra Pro
          </p>
          <p className="text-[#5A3F50] text-xs">סטודיו ברברה ברזין</p>
        </div>
      </div>
    </nav>
  );
}

// ─── Video Section ─────────────────────────────────────────────────────────────

function VideoSection() {
  // ← החלפי את VIDEO_ID_HERE במזהה הסרטון שלך מ-YouTube
  // לדוגמה: youtube.com/watch?v=abc123  →  youtubeId = "abc123"
  const youtubeId = "VIDEO_ID_HERE";

  return (
    <section className="py-16 md:py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <Fade className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl text-[#1A1218] mb-3" style={{ fontFamily: SERIF }}>
          ראי את הסטודיו בפעולה
        </h2>
        <p className="text-[#5A3F50] text-lg">45 שנה של ניסיון — מרוכזות בשיטה אחת ברורה</p>
      </Fade>
      <Fade>
        <div
          className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-[#1A1218]"
          style={{ paddingTop: "56.25%" }}
        >
          {youtubeId === "VIDEO_ID_HERE" ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-4">
              <div className="w-20 h-20 rounded-full bg-[#6B1A47] flex items-center justify-center text-3xl">
                ▶
              </div>
              <p className="text-[#F9D0CF] text-lg font-semibold">הסרטון יתווסף בקרוב</p>
            </div>
          ) : (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="Decorra Pro - סטודיו ברברה ברזין"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </Fade>
    </section>
  );
}

// ─── Gallery Section ───────────────────────────────────────────────────────────

function GallerySection() {
  const tiles = [
    { label: "סלון", bg: "#F9D0CF" },
    { label: "חדר שינה", bg: "#E8DDD0" },
    { label: "מטבח", bg: "#F9D0CF" },
    { label: "פינת אוכל", bg: "#E8DDD0" },
    { label: "חלל עבודה", bg: "#F9D0CF" },
    { label: "כניסה לבית", bg: "#E8DDD0" },
  ];

  return (
    <section className="py-16 md:py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <Fade className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl text-[#1A1218] mb-3" style={{ fontFamily: SERIF }}>
          מתוך עבודות הסטודיו
        </h2>
        <p className="text-[#5A3F50] text-lg">3,600+ פרויקטים. כל אחד — עם כוונה.</p>
      </Fade>
      <StaggerFade className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {tiles.map((tile, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="aspect-square rounded-xl overflow-hidden flex flex-col items-center justify-center shadow-sm gap-2"
            style={{ backgroundColor: tile.bg }}
          >
            <span className="text-3xl">🏠</span>
            <p className="text-[#6B1A47] font-semibold text-sm">{tile.label}</p>
            <p className="text-[#5A3F50] text-xs">תמונה בקרוב</p>
          </motion.div>
        ))}
      </StaggerFade>
      <Fade>
        <p className="text-center text-[#5A3F50] text-sm italic">
          תמונות פרויקטים מהסטודיו יתווספו בקרוב
        </p>
      </Fade>
    </section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function DecoraProPage() {
  return (
    <main dir="rtl" className="bg-[#FAF6F0] text-[#1A1218] overflow-x-hidden">
      {/* Announcement bar */}
      <div className="bg-[#6B1A47] text-white text-center py-3 px-4 text-sm font-medium">
        🎉 מחיר השקה | Decorra Pro חלק 1 | ₪450 בלבד — לזמן מוגבל
      </div>

      <NavBar />
      <HeroSection />
      <Divider />
      <ProblemSection />
      <Divider />
      <PainSection />
      <InlineCTA />
      <Divider />
      <TurningPointSection />
      <Divider />
      <AuthoritySection />
      <Divider />
      <VideoSection />
      <Divider />
      <SolutionSection />
      <Divider />
      <GallerySection />
      <InlineCTA />
      <Divider />
      <TestimonialsSection />
      <Divider />
      <UrgencySection />
      <Divider />
      <WhyStorySection />
      <Divider />
      <PricingSection />
      <Divider />
      <FAQSection />
      <Divider />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
