"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { track } from "@/lib/analytics";
import { captureAttribution, readAttribution } from "@/lib/attribution";

function PageViewInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureAttribution();
    track("page_view", {
      path: pathname,
      referrer: document.referrer || undefined,
      ...readAttribution(),
    });
  }, [pathname, searchParams]);

  return null;
}

export function PageView() {
  return (
    <Suspense fallback={null}>
      <PageViewInner />
    </Suspense>
  );
}
