import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { isAuthed } from "@/lib/auth";

export function useRequireAuth() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthed()) navigate({ to: "/login" });
  }, [navigate]);
}
