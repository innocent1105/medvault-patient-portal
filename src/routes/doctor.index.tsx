import { createFileRoute, Link } from "@tanstack/react-router";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/components/AppLayout";
import { currentUser } from "@/lib/auth";
import { doctorPatients } from "@/lib/doctorMockData";
import { Users, KeyRound, Activity, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/doctor/")({
  head: () => ({ meta: [{ title: "Clinician Dashboard — MedVault" }] }),
  component: DoctorHome,
});

function DoctorHome() {
  useRequireAuth("doctor");
  const user = currentUser();
  const totalPatients = doctorPatients.length;
  const todayAccess = 3;

  return (
    <AppLayout title="Clinician Dashboard" role="doctor">
      <section className="mb-6">
        <p className="text-sm text-muted-foreground">Welcome back,</p>
        <h2 className="text-2xl font-semibold tracking-tight">{user?.name ?? "Doctor"}</h2>
        <p className="text-xs text-muted-foreground mt-1">
          {user?.specialty ?? "Clinician"} · {user?.facility ?? "—"}
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <StatCard icon={Users} label="Patients in care" value={totalPatients.toString()} />
        <StatCard icon={Activity} label="Records accessed today" value={todayAccess.toString()} />
        <StatCard icon={Clock} label="Last login" value="Just now" />
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        <Link to="/doctor/lookup" className="group rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-elegant transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center text-primary mb-3">
                <KeyRound className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">Access patient record</h3>
              <p className="text-xs text-muted-foreground mt-1">Enter a 6-digit share code from the patient.</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition" />
          </div>
        </Link>
        <Link to="/doctor/patients" className="group rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-elegant transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-10 w-10 rounded-xl bg-accent/40 grid place-items-center text-accent-foreground mb-3">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">My patients</h3>
              <p className="text-xs text-muted-foreground mt-1">Browse all patients you have access to.</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition" />
          </div>
        </Link>
      </div>

      <section>
        <h3 className="text-sm font-semibold mb-3">Recent patients</h3>
        <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
          {doctorPatients.map((p) => (
            <Link
              key={p.patient.patientId}
              to="/doctor/patient/$patientId"
              params={{ patientId: p.patient.patientId }}
              className="flex items-center justify-between p-4 hover:bg-muted/40 transition"
            >
              <div>
                <div className="text-sm font-medium">{p.patient.name}</div>
                <div className="text-xs text-muted-foreground">{p.patient.patientId} · Last visit {p.lastVisit}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
        <Icon className="h-4 w-4" /> {label}
      </div>
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}
