import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/components/AppLayout";
import { useState, type FormEvent } from "react";
import { KeyRound, Loader2, AlertCircle } from "lucide-react";
import { findByCode } from "@/lib/doctorMockData";

export const Route = createFileRoute("/doctor/lookup")({
  head: () => ({ meta: [{ title: "Patient Lookup — MedVault" }] }),
  component: DoctorLookup,
});

function DoctorLookup() {
  useRequireAuth("doctor");
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTimeout(() => {
      const found = findByCode(code.trim());
      setLoading(false);
      if (!found) {
        setError("No patient record matches this code. Try 428193, 771204 or 305618.");
        return;
      }
      navigate({ to: "/doctor/patient/$patientId", params: { patientId: found.patient.patientId } });
    }, 500);
  };

  return (
    <AppLayout title="Patient Lookup" role="doctor">
      <section className="max-w-md">
        <h2 className="text-xl font-semibold tracking-tight">Access a patient record</h2>
        <p className="text-sm text-muted-foreground mt-1">Enter the 6-digit share code provided by the patient.</p>

        <form onSubmit={handleSubmit} className="mt-6 bg-card border border-border rounded-2xl p-5 shadow-card space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground" htmlFor="code">Share code</label>
            <div className="mt-1 flex items-center gap-2 px-3 h-12 rounded-xl border border-input bg-background focus-within:ring-2 focus-within:ring-ring transition">
              <KeyRound className="h-4 w-4 text-muted-foreground" />
              <input
                id="code"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className="flex-1 bg-transparent outline-none text-lg font-mono tracking-[0.4em]"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 text-xs text-destructive bg-destructive/10 rounded-lg p-3">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full h-11 rounded-xl bg-gradient-primary text-primary-foreground font-medium shadow-elegant hover:opacity-95 transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Access record
          </button>
        </form>

        <p className="text-xs text-muted-foreground mt-4">
          Demo codes: <span className="font-mono">428193</span>, <span className="font-mono">771204</span>, <span className="font-mono">305618</span>
        </p>
      </section>
    </AppLayout>
  );
}
