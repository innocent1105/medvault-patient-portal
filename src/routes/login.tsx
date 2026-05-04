import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Fingerprint, Loader2, Mail, Lock, ShieldCheck } from "lucide-react";
import { login } from "@/lib/auth";

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
  const [email, setEmail] = useState("chanda.mwansa@medvault.zm");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);
  const [bioLoading, setBioLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login();
    navigate({ to: "/dashboard" });
  };

  const handleBio = async () => {
    setBioLoading(true);
    await login();
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-primary grid place-items-center shadow-elegant mb-4">
            <ShieldCheck className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to MedVault</h1>
          <p className="text-sm text-muted-foreground mt-1">Your health record, in your pocket.</p>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-gradient-primary text-primary-foreground font-medium shadow-elegant hover:opacity-95 active:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Sign in
          </button>

          <div className="relative my-1 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <span className="relative bg-card px-3 text-[11px] uppercase tracking-wider text-muted-foreground">or</span>
          </div>

          <button
            type="button"
            onClick={handleBio}
            disabled={bioLoading}
            className="w-full h-11 rounded-xl border border-border bg-secondary text-secondary-foreground font-medium hover:bg-accent hover:text-accent-foreground transition flex items-center justify-center gap-2"
          >
            {bioLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Fingerprint className="h-4 w-4" />}
            Use biometric login
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">Protected with end-to-end encryption · Mock prototype</p>
      </div>
    </div>
  );
}
