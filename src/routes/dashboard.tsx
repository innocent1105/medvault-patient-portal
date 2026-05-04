import { createFileRoute, Link } from "@tanstack/react-router";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/components/AppLayout";
import { mockPatient, allergies, currentMedications, medicalRecords, labResults } from "@/lib/mockData";
import { AlertTriangle, Pill, Stethoscope, FlaskConical, ArrowRight, Share2, KeyRound, FileText } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — MedVault" }] }),
  component: Dashboard,
});

function Dashboard() {
  useRequireAuth();
  const recentVisits = medicalRecords.filter((r) => r.type === "Visit").slice(0, 2);

  return (
    <AppLayout title="MedVault">
      <section className="mb-5">
        <p className="text-sm text-muted-foreground">Welcome back,</p>
        <h2 className="text-2xl font-semibold tracking-tight">{mockPatient.name.split(" ")[0]} 👋</h2>
        <p className="text-xs text-muted-foreground mt-1">Patient ID · {mockPatient.patientId}</p>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <SummaryCard icon={AlertTriangle} tone="destructive" label="Allergies" value={`${allergies.length}`} hint={allergies.slice(0, 2).join(", ")} />
        <SummaryCard icon={Pill} tone="primary" label="Medications" value={`${currentMedications.length}`} hint="Active prescriptions" />
        <SummaryCard icon={Stethoscope} tone="success" label="Recent visits" value={`${recentVisits.length}`} hint={recentVisits[0]?.facility.split(",")[0] ?? "—"} />
        <SummaryCard icon={FlaskConical} tone="warning" label="Lab results" value={`${labResults.length}`} hint={labResults[0]?.name ?? "—"} />
      </div>

      <h3 className="mt-6 mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quick actions</h3>
      <div className="space-y-2">
        <QuickAction to="/history" icon={FileText} label="View full history" desc="All visits, labs and prescriptions" />
        <QuickAction to="/share" icon={Share2} label="Share record" desc="Give a clinician temporary access" />
        <QuickAction to="/share" icon={KeyRound} label="Generate access code" desc="6-digit code, expires in 10 min" />
      </div>

      <h3 className="mt-6 mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recent activity</h3>
      <div className="space-y-2">
        {recentVisits.map((r) => (
          <div key={r.id} className="bg-card border border-border rounded-2xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{r.diagnosis}</p>
              <span className="text-xs text-muted-foreground">{r.date}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{r.facility}</p>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}

function SummaryCard({
  icon: Icon, label, value, hint, tone,
}: {
  icon: typeof AlertTriangle; label: string; value: string; hint: string;
  tone: "primary" | "success" | "warning" | "destructive";
}) {
  const toneMap = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/25 text-warning-foreground",
    destructive: "bg-destructive/10 text-destructive",
  };
  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
      <div className={`h-9 w-9 rounded-xl grid place-items-center ${toneMap[tone]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="text-xs font-medium">{label}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{hint}</p>
    </div>
  );
}

function QuickAction({ to, icon: Icon, label, desc }: { to: "/history" | "/share"; icon: typeof FileText; label: string; desc: string }) {
  return (
    <Link to={to} className="flex items-center gap-3 bg-card border border-border rounded-2xl p-4 shadow-card hover:border-primary/40 transition group">
      <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground line-clamp-1">{desc}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
    </Link>
  );
}
