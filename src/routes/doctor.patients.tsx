import { createFileRoute, Link } from "@tanstack/react-router";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/components/AppLayout";
import { doctorPatients } from "@/lib/doctorMockData";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/doctor/patients")({
  head: () => ({ meta: [{ title: "My Patients — MedVault" }] }),
  component: DoctorPatients,
});

function DoctorPatients() {
  useRequireAuth("doctor");
  const [q, setQ] = useState("");
  const filtered = doctorPatients.filter(
    (p) =>
      p.patient.name.toLowerCase().includes(q.toLowerCase()) ||
      p.patient.patientId.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <AppLayout title="My Patients" role="doctor">
      <div className="mb-4 flex items-center gap-2 px-3 h-11 rounded-xl border border-input bg-card focus-within:ring-2 focus-within:ring-ring transition max-w-md">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or patient ID"
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>

      <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
        {filtered.length === 0 && (
          <div className="p-6 text-sm text-muted-foreground text-center">No patients match.</div>
        )}
        {filtered.map((p) => (
          <Link
            key={p.patient.patientId}
            to="/doctor/patient/$patientId"
            params={{ patientId: p.patient.patientId }}
            className="flex items-center justify-between p-4 hover:bg-muted/40 transition"
          >
            <div>
              <div className="text-sm font-medium">{p.patient.name}</div>
              <div className="text-xs text-muted-foreground">
                {p.patient.patientId} · {p.patient.gender} · Last visit {p.lastVisit}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{p.bloodType}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
