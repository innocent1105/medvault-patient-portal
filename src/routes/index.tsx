import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { isAuthed, currentUser } from "@/lib/auth";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthed()) {
      navigate({ to: "/login", replace: true });
      return;
    }
    const u = currentUser();
    navigate({ to: u?.role === "doctor" ? "/doctor" : "/dashboard", replace: true });
  }, [navigate]);
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-soft">
      <div className="h-10 w-10 rounded-xl bg-gradient-primary animate-pulse" />
    </div>
  );
}
