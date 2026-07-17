"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorWidget } from "@/components/CalculatorWidget";
import { embedIframeSnippet, embedScriptSnippet } from "@/lib/config";

const EXAMPLE_SLUG = "acme-freight";
const snippets = {
  script: embedScriptSnippet(EXAMPLE_SLUG),
  iframe: embedIframeSnippet(EXAMPLE_SLUG),
};

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-[#18181b] p-4 font-mono text-xs leading-relaxed text-zinc-200">
      <code>{code}</code>
    </pre>
  );
}

export function EmbedShowcase() {
  const [tab, setTab] = useState<"script" | "iframe">("script");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippets[tab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  return (
    <section id="embed" className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-14">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            <span className="text-sm uppercase tracking-wider text-zinc-400">
              Embed anywhere
            </span>
          </div>
          <h2 className="heading-serif text-4xl text-white md:text-5xl">
            One snippet. Live on your site.
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Drop this into your website and your customers get the calculator on
            the right — branded as yours. No build step, no maintenance.
          </p>
        </header>

        <div className="grid items-start gap-8 lg:grid-cols-2">
          {/* Code */}
          <div className="glass-strong rounded-2xl border border-white/10 p-5">
            <Tabs
              value={tab}
              onValueChange={(v) => setTab(v as "script" | "iframe")}
            >
              <div className="flex items-center justify-between">
                <TabsList className="border border-white/10 bg-white/5">
                  <TabsTrigger
                    value="script"
                    className="text-white/60 data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
                  >
                    Script
                  </TabsTrigger>
                  <TabsTrigger
                    value="iframe"
                    className="text-white/60 data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
                  >
                    iframe
                  </TabsTrigger>
                </TabsList>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/5"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>
              <TabsContent value="script">
                <CodeBlock code={snippets.script} />
              </TabsContent>
              <TabsContent value="iframe">
                <CodeBlock code={snippets.iframe} />
              </TabsContent>
            </Tabs>
            <p className="mt-4 text-xs text-white/40">
              Replace{" "}
              <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-orange-300">
                {EXAMPLE_SLUG}
              </code>{" "}
              with your portal handle from settings.
            </p>
          </div>

          {/* Live preview inside a browser frame */}
          <div className="ambient-glow">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/30">
              <div className="flex items-center gap-2 border-b border-white/10 bg-zinc-800/60 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-white/15" />
                  <span className="h-3 w-3 rounded-full bg-white/15" />
                  <span className="h-3 w-3 rounded-full bg-white/15" />
                </div>
                <div className="flex-1">
                  <div className="mx-auto w-fit rounded-md bg-white/5 px-3 py-1 font-mono text-xs text-white/40">
                    your-website.com
                  </div>
                </div>
              </div>
              {/* Reliable live preview of the real calculator. Once a dedicated
                  demo org is provisioned, this can be swapped for the actual
                  embed iframe: <iframe src={embedIframeUrl(DEMO_ORG_SLUG)} … /> */}
              <div className="p-5">
                <CalculatorWidget variant="embedded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
