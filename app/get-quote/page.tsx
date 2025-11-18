import { Suspense } from "react";
import Contact from "@/components/sections/Contact";
import GetQuoteClient from "@/components/Get-Quote";

export default function GetQuotePage() {
  return (
    <div className="min-h-screen bg-background relative">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl text-foreground-light">Loading...</div>
          </div>
        }
      >
        <GetQuoteClient />
      </Suspense>

      <div className="relative z-10 w-full mt-24">
        <Contact />
      </div>
    </div>
  );
}
