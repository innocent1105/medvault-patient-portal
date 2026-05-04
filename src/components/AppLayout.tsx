import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, FileText, HeartPulse, Share2, ScrollText, Settings, LogOut, Moon, Sun, WifiOff } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { logout } from "@/lib/auth";

const navItems = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/history", label: "History", icon: FileText },
  { to: "/summary", label: "Summary", icon: HeartPulse },
  { to: "/share", label: "Share", icon: Share2 },
  { to: "/access-log", label: "Access", icon: ScrollText },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppLayout({ children, title }: { children: ReactNode; title: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [dark, setDark] = useState(false);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("medvault.theme") === "dark";
    setDark(stored);
    document.documentElement.classList.toggle("dark", stored);
  }, []);

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("medvault.theme", next ? "dark" : "light");
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-gradient-soft pb-24">
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="mx-auto max-w-2xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground font-bold">M</div>
            <h1 className="text-base font-semibold tracking-tight">{title}</h1>
          </div>
          <div className="flex items-center gap-1">
            {offline && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-warning-foreground bg-warning/30 rounded-full px-2 py-1">
                <WifiOff className="h-3 w-3" /> Offline
              </span>
            )}
            <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-lg hover:bg-muted transition">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button onClick={handleLogout} aria-label="Sign out" className="p-2 rounded-lg hover:bg-muted transition">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
        {offline && (
          <div className="sm:hidden px-4 pb-2 text-xs text-warning-foreground flex items-center gap-1">
            <WifiOff className="h-3 w-3" /> Offline — showing cached data
          </div>
        )}
      </header>

      <main className="mx-auto max-w-2xl px-4 pt-4">{children}</main>

      <nav className="fixed bottom-0 inset-x-0 z-30 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-2xl grid grid-cols-6">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "scale-110" : ""} transition-transform`} />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
