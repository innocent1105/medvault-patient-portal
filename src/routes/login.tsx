import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Loader2, Mail, Lock, ShieldCheck, Stethoscope, User as UserIcon } from "lucide-react";
import { login, type Role } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — MedVault" },
      { name: "description", content: "Securely access your MedVault digital health record." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("patient");
  const [email, setEmail] = useState("chanda.mwansa@medvault.zm");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleChange = (next: Role) => {
    setRole(next);
    setError(null);
    if (next === "doctor") {
      setEmail("dr.banda@uth.zm");
      setPassword("demo1234");
    } else {
      setEmail("chanda.mwansa@medvault.zm");
      setPassword("demo1234");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await login(email, password, role);
      navigate({ to: user.role === "doctor" ? "/doctor" : "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-primary grid place-items-center shadow-elegant mb-4">
            <ShieldCheck className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to MedVault</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
        </div>

        <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl mb-4">
          <button
            type="button"
            onClick={() => handleRoleChange("patient")}
            className={`flex items-center justify-center gap-2 h-9 rounded-lg text-sm font-medium transition ${
              role === "patient" ? "bg-card shadow-card text-foreground" : "text-muted-foreground"
            }`}
          >
            <UserIcon className="h-4 w-4" /> Patient
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("doctor")}
            className={`flex items-center justify-center gap-2 h-9 rounded-lg text-sm font-medium transition ${
              role === "doctor" ? "bg-card shadow-card text-foreground" : "text-muted-foreground"
            }`}
          >
            <Stethoscope className="h-4 w-4" /> Doctor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-5 shadow-card space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground" htmlFor="email">Email</label>
            <div className="mt-1 flex items-center gap-2 px-3 h-11 rounded-xl border border-input bg-background focus-within:ring-2 focus-within:ring-ring transition">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 bg-transparent outline-none text-sm" required />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground" htmlFor="password">Password</label>
            <div className="mt-1 flex items-center gap-2 px-3 h-11 rounded-xl border border-input bg-background focus-within:ring-2 focus-within:ring-ring transition">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="flex-1 bg-transparent outline-none text-sm" required />
            </div>
          </div>

          {error && <p className="text-xs text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-gradient-primary text-primary-foreground font-medium shadow-elegant hover:opacity-95 active:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Sign in as {role === "doctor" ? "Doctor" : "Patient"}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">Create one</Link>
          </p>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">Protected with end-to-end encryption · Mock prototype</p>
      </div>
    </div>
  );
}
