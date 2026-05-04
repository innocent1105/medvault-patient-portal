import { createFileRoute } from "@tanstack/react-router";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/components/AppLayout";
import { medicalRecords, type MedicalRecord } from "@/lib/mockData";
import { useMemo, useState } from "react";
import { Search, X, Calendar, Building2, Stethoscope, Pill, NotebookPen } from "lucide-react";

export const Route = createFileRoute("/history")({
  head: () => ({ meta: [{ title: "Medical history — MedVault" }] }),
  component: HistoryPage,
});

const TYPES = ["All", "Visit", "Lab", "Imaging", "Vaccination"] as const;

function HistoryPage() {
  useRequireAuth();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [active, setActive] = useState<MedicalRecord | null>(null);

  const filtered = useMemo(() => {
    return medicalRecords.filter((r) => {
      const matchesType = type === "All" || r.type === type;
      const q = query.trim().toLowerCase();
      const matchesQ =
        !q ||
        r.diagnosis.toLowerCase().includes(q) ||
        r.facility.toLowerCase().includes(q) ||
        r.doctor.toLowerCase().includes(q);
      return matchesType && matchesQ;
    });
  }, [query, type]);

  return (
    <AppLayout title="Medical history">
      <div className="relative mb-3">
        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search diagnosis, facility, doctor"
          className="w-full h-11 pl-9 pr-3 rounded-xl border border-input bg-card text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`shrink-0 px-3 h-8 rounded-full text-xs font-medium border transition ${
              type === t
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-2 mt-2">
        {filtered.map((r) => (
          <button
            key={r.id}
            onClick={() => setActive(r)}
            className="w-full text-left bg-card border border-border rounded-2xl p-4 shadow-card hover:border-primary/40 transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{r.diagnosis}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{r.facility}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-secondary text-secondary-foreground">{r.type}</span>
                <p className="text-[11px] text-muted-foreground mt-1">{r.date}</p>
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-10">No records match your search.</p>
        )}
      </div>

      {active && <RecordModal record={active} onClose={() => setActive(null)} />}
    </AppLayout>
  );
}

function RecordModal({ record, onClose }: { record: MedicalRecord; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in" onClick={onClose}>
      <div
        className="bg-card w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl border border-border shadow-elegant p-5 animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-accent text-accent-foreground">{record.type}</span>
            <h3 className="mt-2 text-lg font-semibold">{record.diagnosis}</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-3 text-sm">
          <Row icon={Calendar} label="Date" value={record.date} />
          <Row icon={Building2} label="Facility" value={record.facility} />
          <Row icon={Stethoscope} label="Doctor" value={record.doctor} />
          <Row icon={Pill} label="Prescription" value={record.prescription} />
          <Row icon={NotebookPen} label="Notes" value={record.notes} />
        </div>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <Icon className="h-4 w-4 mt-0.5 text-primary shrink-0" />
      <div className="flex-1">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
}
