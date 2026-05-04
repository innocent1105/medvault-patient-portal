import { createFileRoute } from "@tanstack/react-router";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/components/AppLayout";
import { mockPatient } from "@/lib/mockData";
import { useState } from "react";
import { User, Phone, Mail, Shield, Download, ChevronRight, Check } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — MedVault" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  useRequireAuth();
  const [twoFA, setTwoFA] = useState(true);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(false);
    setTimeout(() => setDownloaded(true), 800);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <AppLayout title="Settings">
      <section className="bg-card border border-border rounded-2xl p-4 shadow-card mb-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-semibold">
            {mockPatient.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="font-semibold">{mockPatient.name}</p>
            <p className="text-xs text-muted-foreground">{mockPatient.patientId}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2 text-sm">
          <Field icon={User} label="Full name" value={mockPatient.name} />
          <Field icon={Phone} label="Phone" value={mockPatient.phone} />
          <Field icon={Mail} label="Email" value={mockPatient.email} />
        </div>
      </section>

      <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold px-1 mb-2">Security</h3>
      <section className="bg-card border border-border rounded-2xl shadow-card mb-3 divide-y divide-border">
        <div className="p-4 flex items-center gap-3">
          <Shield className="h-4 w-4 text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium">Two-factor authentication</p>
            <p className="text-xs text-muted-foreground">Extra protection on every login</p>
          </div>
          <Toggle checked={twoFA} onChange={setTwoFA} />
        </div>
        <button className="w-full p-4 flex items-center gap-3 text-left hover:bg-muted/50 transition">
          <Shield className="h-4 w-4 text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium">Change password</p>
            <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </section>

      <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold px-1 mb-2">Data control</h3>
      <section className="bg-card border border-border rounded-2xl shadow-card">
        <button onClick={handleDownload} className="w-full p-4 flex items-center gap-3 text-left hover:bg-muted/50 transition">
          <Download className="h-4 w-4 text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium">Download my data</p>
            <p className="text-xs text-muted-foreground">Export your full record as JSON</p>
          </div>
          {downloaded ? <Check className="h-4 w-4 text-success" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
        </button>
      </section>

      <p className="text-center text-[11px] text-muted-foreground mt-6">MedVault prototype · v0.1</p>
    </AppLayout>
  );
}

function Field({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div className="flex-1 min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-sm truncate">{value}</p>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-primary" : "bg-muted"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-background shadow transition-all ${checked ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}
