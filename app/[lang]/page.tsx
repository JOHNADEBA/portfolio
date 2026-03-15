import { getDictionary } from "@/lib/i18n/get-dictionary";
import { About } from "../components/sections/About";
import { Experience } from "../components/sections/Experience";
import { Hero } from "../components/sections/Hero";
import { Projects } from "../components/sections/Projects";
import { Skills } from "../components/sections/Skills";
import { Contact } from "../components/sections/Contact";
import { isValidLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  // AWAIT the params here too
  const { lang } = await params;

  // Validate that lang is a supported locale
  if (!isValidLocale(lang)) {
    notFound();
  }
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Hero dictionary={dictionary} lang={lang} />
      <About dictionary={dictionary} lang={lang} />
      <Skills dictionary={dictionary} />
      <Experience dictionary={dictionary} />
      <Projects dictionary={dictionary} />
      <Contact dictionary={dictionary} lang={lang} />
    </>
  );
}
