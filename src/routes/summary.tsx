import { createFileRoute } from "@tanstack/react-router";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/components/AppLayout";
import { mockPatient, allergies, chronicConditions, currentMedications } from "@/lib/mockData";
import { Droplet, AlertTriangle, Activity, Pill, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/summary")({
  head: () => ({ meta: [{ title: "Health summary — MedVault" }] }),
  component: SummaryPage,
});

function SummaryPage() {
  useRequireAuth();
  return (
    <AppLayout title="Health summary">
      <div className="bg-gradient-primary text-primary-foreground rounded-2xl p-5 shadow-elegant mb-4">
        <div className="flex items-center gap-2 text-xs opacity-90">
          <ShieldAlert className="h-4 w-4" /> Emergency view
        </div>
        <h2 className="text-xl font-semibold mt-1">{mockPatient.name}</h2>
        <p className="text-sm opacity-90">{mockPatient.gender} · DOB {mockPatient.dob}</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="bg-primary-foreground/15 backdrop-blur rounded-xl px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider opacity-80">Blood type</p>
            <p className="text-lg font-bold flex items-center gap-1"><Droplet className="h-4 w-4" /> {mockPatient.bloodType}</p>
          </div>
          <div className="bg-primary-foreground/15 backdrop-blur rounded-xl px-3 py-2 flex-1">
            <p className="text-[10px] uppercase tracking-wider opacity-80">Patient ID</p>
            <p className="text-sm font-medium">{mockPatient.patientId}</p>
          </div>
        </div>
      </div>

      <Block icon={AlertTriangle} tone="destructive" title="Allergies">
        <div className="flex flex-wrap gap-2">
          {allergies.map((a) => (
            <span key={a} className="px-3 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium">{a}</span>
          ))}
        </div>
      </Block>

      <Block icon={Activity} tone="warning" title="Chronic conditions">
        <ul className="space-y-1">
          {chronicConditions.map((c) => (
            <li key={c} className="text-sm flex gap-2"><span className="text-warning-foreground">•</span>{c}</li>
          ))}
        </ul>
      </Block>

      <Block icon={Pill} tone="primary" title="Current medications">
        <ul className="divide-y divide-border">
          {currentMedications.map((m) => (
            <li key={m.name} className="py-2 first:pt-0 last:pb-0 flex items-baseline justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.frequency}</p>
              </div>
              <span className="text-xs font-medium text-primary">{m.dose}</span>
            </li>
          ))}
        </ul>
      </Block>
    </AppLayout>
  );
}

function Block({ icon: Icon, title, tone, children }: { icon: typeof AlertTriangle; title: string; tone: "primary" | "warning" | "destructive"; children: React.ReactNode }) {
  const toneMap = {
    primary: "bg-primary/10 text-primary",
    warning: "bg-warning/25 text-warning-foreground",
    destructive: "bg-destructive/10 text-destructive",
  };
  return (
    <section className="bg-card border border-border rounded-2xl p-4 shadow-card mb-3">
      <div className="flex items-center gap-2 mb-3">
        <div className={`h-8 w-8 rounded-lg grid place-items-center ${toneMap[tone]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {children}
    </section>
  );
}
