import { Inter, Outfit, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { getDictionarySafe, hasLocale } from "@/lib/i18n/get-dictionary";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { LenisProvider } from "../components/providers/LenisProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Display font for headings - Space Grotesk (modern and stylish)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Secondary font for accents - Outfit (elegant and geometric)
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "sl" }, { lang: "de" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionarySafe(lang);

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} dark`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <LenisProvider>
          <Header lang={lang} dictionary={dictionary} />
          <main className="relative">
            {/* Animated background orbs */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-float" />
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-600/20 rounded-full blur-3xl animate-float-delay-1" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-600/20 rounded-full blur-3xl animate-float-delay-2" />

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            </div>

            {children}
          </main>
          <Footer lang={lang} dictionary={dictionary} />
        </LenisProvider>
      </body>
    </html>
  );
}
