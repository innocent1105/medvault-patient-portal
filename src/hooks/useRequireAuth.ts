import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { isAuthed, currentUser, type Role } from "@/lib/auth";

export function useRequireAuth(role?: Role) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthed()) {
      navigate({ to: "/login" });
      return;
    }
    if (role) {
      const u = currentUser();
      if (u?.role !== role) {
        navigate({ to: u?.role === "doctor" ? "/doctor" : "/dashboard" });
      }
    }
  }, [navigate, role]);
}
