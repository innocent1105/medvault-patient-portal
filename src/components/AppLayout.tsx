import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, FileText, HeartPulse, Share2, ScrollText, Settings,
  LogOut, Moon, Sun, WifiOff, Stethoscope, Users, KeyRound,
} from "lucide-react";
import { useEffect, useState, type ReactNode, type ComponentType } from "react";
import { logout, currentUser, type Role } from "@/lib/auth";

type NavItem = { to: string; label: string; icon: ComponentType<{ className?: string }> };

const patientNav: NavItem[] = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/history", label: "History", icon: FileText },
  { to: "/summary", label: "Summary", icon: HeartPulse },
  { to: "/share", label: "Share", icon: Share2 },
  { to: "/access-log", label: "Access", icon: ScrollText },
  { to: "/settings", label: "Settings", icon: Settings },
];

const doctorNav: NavItem[] = [
  { to: "/doctor", label: "Home", icon: LayoutDashboard },
  { to: "/doctor/lookup", label: "Lookup", icon: KeyRound },
  { to: "/doctor/patients", label: "Patients", icon: Users },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppLayout({ children, title, role: roleOverride }: { children: ReactNode; title: string; role?: Role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [dark, setDark] = useState(false);
  const [offline, setOffline] = useState(false);
  const [user, setUser] = useState(() => currentUser());

  useEffect(() => {
    const stored = localStorage.getItem("medvault.theme") === "dark";
    setDark(stored);
    document.documentElement.classList.toggle("dark", stored);
  }, []);

  useEffect(() => {
    setUser(currentUser());
  }, [location.pathname]);

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

  const role: Role = roleOverride ?? user?.role ?? "patient";
  const navItems = role === "doctor" ? doctorNav : patientNav;

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
    <div className="min-h-screen bg-gradient-soft flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 border-r border-border bg-card/80 backdrop-blur z-30">
        <div className="h-16 flex items-center gap-2 px-5 border-b border-border">
          <div className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground font-bold">M</div>
          <div>
            <div className="text-sm font-semibold tracking-tight">MedVault</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {role === "doctor" ? "Clinician portal" : "Patient portal"}
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to}
                className={`flex items-center gap-3 px-3 h-10 rounded-lg text-sm font-medium transition ${
                  active ? "bg-primary text-primary-foreground shadow-card" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}>
                <Icon className="h-4 w-4" /> {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border space-y-2">
          {user && (
            <div className="px-3 py-2 rounded-lg bg-muted/60">
              <div className="text-xs font-medium truncate">{user.name}</div>
              <div className="text-[10px] text-muted-foreground truncate">{user.email}</div>
            </div>
          )}
          <div className="flex items-center gap-1">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="flex-1 h-9 rounded-lg hover:bg-muted transition flex items-center justify-center gap-2 text-xs">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {dark ? "Light" : "Dark"}
            </button>
            <button onClick={handleLogout} aria-label="Sign out" className="flex-1 h-9 rounded-lg hover:bg-destructive/10 hover:text-destructive transition flex items-center justify-center gap-2 text-xs">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 lg:ml-64 pb-24 lg:pb-8 min-w-0">
        <header className="sticky top-0 z-20 backdrop-blur-md bg-background/80 border-b border-border">
          <div className="mx-auto max-w-5xl px-4 lg:px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2 lg:hidden">
              <div className="h-8 w-8 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground font-bold">M</div>
              <h1 className="text-base font-semibold tracking-tight">{title}</h1>
            </div>
            <h1 className="hidden lg:flex items-center gap-2 text-lg font-semibold tracking-tight">
              {role === "doctor" && <Stethoscope className="h-5 w-5 text-primary" />}
              {title}
            </h1>
            <div className="flex items-center gap-1">
              {offline && (
                <span className="inline-flex items-center gap-1 text-xs text-warning-foreground bg-warning/30 rounded-full px-2 py-1">
                  <WifiOff className="h-3 w-3" /> Offline
                </span>
              )}
              <button onClick={toggleTheme} aria-label="Toggle theme" className="lg:hidden p-2 rounded-lg hover:bg-muted transition">
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button onClick={handleLogout} aria-label="Sign out" className="lg:hidden p-2 rounded-lg hover:bg-muted transition">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 lg:px-8 pt-4 lg:pt-6">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border bg-background/95 backdrop-blur">
        <div className={`mx-auto max-w-2xl grid`} style={{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }}>
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to}
                className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}>
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
