import { createFileRoute } from "@tanstack/react-router";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/components/AppLayout";
import { useEffect, useRef, useState } from "react";
import { KeyRound, RefreshCw, Copy, Check, QrCode, Eye } from "lucide-react";
import { mockPatient, allergies, currentMedications } from "@/lib/mockData";

export const Route = createFileRoute("/share")({
  head: () => ({ meta: [{ title: "Share record — MedVault" }] }),
  component: SharePage,
});

const EXPIRY_SECONDS = 600;

function SharePage() {
  useRequireAuth();
  const [code, setCode] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(EXPIRY_SECONDS);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearInterval(timer.current); }, []);

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
      setCode(newCode);
      setSeconds(EXPIRY_SECONDS);
      setGenerating(false);
      if (timer.current) window.clearInterval(timer.current);
      timer.current = window.setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            if (timer.current) window.clearInterval(timer.current);
            setCode(null);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }, 500);
  };

  const copy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <AppLayout title="Share record">
      <section className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <div className="flex items-center gap-2 mb-2">
          <KeyRound className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Temporary access code</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Share this 6-digit code with a clinician. Expires automatically.</p>

        {code ? (
          <>
            <div className="rounded-2xl bg-gradient-primary text-primary-foreground p-5 text-center shadow-elegant">
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">Access code</p>
              <p className="mt-2 text-4xl font-bold tracking-[0.4em] tabular-nums">{code}</p>
              <p className="mt-3 text-xs opacity-90">Expires in <span className="font-semibold tabular-nums">{mm}:{ss}</span></p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button onClick={copy} className="h-10 rounded-xl border border-border bg-secondary text-sm font-medium flex items-center justify-center gap-2 hover:bg-accent transition">
                {copied ? <><Check className="h-4 w-4 text-success" /> Copied</> : <><Copy className="h-4 w-4" /> Copy</>}
              </button>
              <button onClick={generate} className="h-10 rounded-xl border border-border bg-secondary text-sm font-medium flex items-center justify-center gap-2 hover:bg-accent transition">
                <RefreshCw className="h-4 w-4" /> Regenerate
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-dashed border-border p-4 text-center">
              <div className="mx-auto h-40 w-40 grid place-items-center bg-foreground/5 rounded-xl">
                <QrPlaceholder code={code} />
              </div>
              <p className="text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
                <QrCode className="h-3 w-3" /> Scan from a clinician device
              </p>
            </div>
          </>
        ) : (
          <button
            onClick={generate}
            disabled={generating}
            className="w-full h-12 rounded-xl bg-gradient-primary text-primary-foreground font-medium shadow-elegant hover:opacity-95 transition disabled:opacity-70"
          >
            {generating ? "Generating…" : "Generate access code"}
          </button>
        )}
      </section>

      <section className="bg-card border border-border rounded-2xl p-5 shadow-card mt-3">
        <div className="flex items-center gap-2 mb-3">
          <Eye className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">What the doctor will see</h3>
        </div>
        <div className="rounded-xl bg-muted p-4 text-sm space-y-2">
          <p><span className="text-muted-foreground">Patient:</span> {mockPatient.name}</p>
          <p><span className="text-muted-foreground">Blood type:</span> {mockPatient.bloodType}</p>
          <p><span className="text-muted-foreground">Allergies:</span> {allergies.join(", ")}</p>
          <p><span className="text-muted-foreground">Medications:</span> {currentMedications.map((m) => m.name).join(", ")}</p>
          <p className="text-xs text-muted-foreground pt-2">Full history is hidden unless explicitly shared.</p>
        </div>
      </section>
    </AppLayout>
  );
}

// Deterministic mock QR-style grid from the code
function QrPlaceholder({ code }: { code: string }) {
  const size = 13;
  let seed = 0;
  for (const c of code) seed = (seed * 31 + c.charCodeAt(0)) >>> 0;
  const cells: boolean[] = [];
  for (let i = 0; i < size * size; i++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    cells.push((seed & 1) === 1);
  }
  return (
    <div className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
      {cells.map((on, i) => (
        <div key={i} className={`h-2 w-2 rounded-[1px] ${on ? "bg-foreground" : "bg-transparent"}`} />
      ))}
    </div>
  );
}
