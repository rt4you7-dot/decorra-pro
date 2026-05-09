import type { Metadata } from "next";
import { Playfair_Display, Heebo } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Decorra Pro | מבית סטודיו ברברה ברזין",
  description:
    "את לא מתבלבלת כי אין לך טעם — את מתבלבלת כי אין לך שיטה. המדריך הדיגיטלי שילמד אותך לחשוב, לבחור ולעצב כמו מקצוענית.",
  openGraph: {
    title: "Decorra Pro | מבית סטודיו ברברה ברזין",
    description:
      "המדריך הדיגיטלי לעיצוב פנים — 6 פרקים, 6 כלי עבודה אמיתיים. גישה מיידית.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${playfair.variable} ${heebo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
