import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/components/AppLayout";
import { doctorPatients } from "@/lib/doctorMockData";
import { ArrowLeft, Phone, Mail, Calendar, Droplet, AlertTriangle, Pill, FileText, ScrollText } from "lucide-react";

export const Route = createFileRoute("/doctor/patient/$patientId")({
  head: () => ({ meta: [{ title: "Patient Record — MedVault" }] }),
  component: PatientView,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-sm text-muted-foreground">
      Patient not found. <Link to="/doctor" className="text-primary ml-2">Back</Link>
    </div>
  ),
});

function PatientView() {
  useRequireAuth("doctor");
  const { patientId } = Route.useParams();
  const data = doctorPatients.find((p) => p.patient.patientId === patientId);
  if (!data) throw notFound();

  const { patient, allergies, chronicConditions, medications, records, accessEvents } = data;

  return (
    <AppLayout title="Patient Record" role="doctor">
      <Link to="/doctor/patients" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-3 w-3" /> All patients
      </Link>

      <header className="rounded-2xl border border-border bg-card p-5 shadow-card mb-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{patient.name}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{patient.patientId}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {patient.dob}</span>
              <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {patient.email}</span>
              <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {patient.phone}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-destructive bg-destructive/10 rounded-xl px-3 py-2">
            <Droplet className="h-4 w-4" /> {patient.bloodType}
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-4 mb-5">
        <Panel icon={AlertTriangle} tone="destructive" title="Allergies">
          {allergies.length ? (
            <ul className="text-sm space-y-1">{allergies.map((a) => <li key={a}>• {a}</li>)}</ul>
          ) : <p className="text-sm text-muted-foreground">None reported</p>}
        </Panel>
        <Panel icon={AlertTriangle} tone="warning" title="Chronic conditions">
          {chronicConditions.length ? (
            <ul className="text-sm space-y-1">{chronicConditions.map((c) => <li key={c}>• {c}</li>)}</ul>
          ) : <p className="text-sm text-muted-foreground">None reported</p>}
        </Panel>
      </div>

      <section className="mb-5">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Pill className="h-4 w-4" /> Current medications</h3>
        <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
          {medications.length === 0 && <div className="p-4 text-sm text-muted-foreground">No active medications.</div>}
          {medications.map((m) => (
            <div key={m.name} className="p-4 flex justify-between text-sm">
              <span className="font-medium">{m.name}</span>
              <span className="text-muted-foreground">{m.dose} · {m.frequency}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><FileText className="h-4 w-4" /> Medical history</h3>
        <div className="space-y-2">
          {records.map((r) => (
            <div key={r.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{r.date} · {r.type}</span>
                <span>{r.facility}</span>
              </div>
              <div className="mt-1 text-sm font-medium">{r.diagnosis}</div>
              <div className="mt-1 text-xs text-muted-foreground">{r.doctor}</div>
              {r.prescription && r.prescription !== "—" && (
                <div className="mt-2 text-xs"><span className="text-muted-foreground">Rx:</span> {r.prescription}</div>
              )}
              {r.notes && <div className="mt-1 text-xs text-muted-foreground">{r.notes}</div>}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><ScrollText className="h-4 w-4" /> Access log</h3>
        <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
          {accessEvents.map((e) => (
            <div key={e.id} className="p-4 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">{e.doctor}</span>
                <span className="text-xs text-muted-foreground">{e.timestamp}</span>
              </div>
              <div className="text-xs text-muted-foreground">{e.facility} · {e.purpose}</div>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}

function Panel({ icon: Icon, tone, title, children }: {
  icon: React.ComponentType<{ className?: string }>;
  tone: "destructive" | "warning";
  title: string;
  children: React.ReactNode;
}) {
  const toneClass = tone === "destructive" ? "text-destructive bg-destructive/10" : "text-warning-foreground bg-warning/30";
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <span className={`h-8 w-8 rounded-lg grid place-items-center ${toneClass}`}><Icon className="h-4 w-4" /></span>
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      {children}
    </div>
  );
}
