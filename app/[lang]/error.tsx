"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { getErrorDictionary } from "@/lib/i18n/get-error-dictionary";
import { Button } from "../components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams<{ lang: string }>();
  const dictionary = getErrorDictionary(params?.lang ?? "en");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-red-600">{dictionary.title}</h2>
        <p className="text-secondary-600">{error.message}</p>
        <Button onClick={reset}>{dictionary["try-again"]}</Button>
      </div>
    </div>
  );
}
