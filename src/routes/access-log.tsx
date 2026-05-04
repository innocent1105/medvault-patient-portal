import { createFileRoute } from "@tanstack/react-router";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/components/AppLayout";
import { accessEvents } from "@/lib/mockData";
import { Stethoscope, Clock } from "lucide-react";

export const Route = createFileRoute("/access-log")({
  head: () => ({ meta: [{ title: "Access log — MedVault" }] }),
  component: AccessLogPage,
});

function AccessLogPage() {
  useRequireAuth();
  return (
    <AppLayout title="Access log">
      <p className="text-xs text-muted-foreground mb-3">Every time someone views your record, it's listed here.</p>
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-border" aria-hidden />
        <ul className="space-y-3">
          {accessEvents.map((e) => (
            <li key={e.id} className="relative pl-10">
              <div className="absolute left-2.5 top-3 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
              <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-primary" /> {e.doctor}
                  </p>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {e.timestamp}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{e.facility}</p>
                <p className="text-xs mt-2 px-2 py-1 inline-block rounded-md bg-accent text-accent-foreground">{e.purpose}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}
