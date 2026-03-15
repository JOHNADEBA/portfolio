import Link from "next/link";
import { headers } from "next/headers";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { i18n, isValidLocale, getFirstPathSegment } from "@/lib/i18n/config";
import { Button } from "../components/ui/Button";

export default async function NotFound() {
  const headersList = await headers();
  const referer = headersList.get("referer") || "";
  const urlLocale = getFirstPathSegment(referer);
  const locale = isValidLocale(urlLocale) ? urlLocale : i18n.defaultLocale;

  const dictionary = await getDictionary(locale);
  const notFoundDict = dictionary["not-found"];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-primary-600">404</h1>
        <h2 className="text-3xl font-bold">{notFoundDict.title}</h2>
        <p className="text-secondary-600">{notFoundDict.description}</p>
        <Link href={`/${locale}`}>
          <Button size="lg">{notFoundDict["back-home"]}</Button>
        </Link>
      </div>
    </div>
  );
}
