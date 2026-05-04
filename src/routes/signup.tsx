import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Loader2, Mail, Lock, ShieldCheck, Stethoscope, User as UserIcon, Building2, Briefcase } from "lucide-react";
import { signup, type Role } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account — MedVault" },
      { name: "description", content: "Sign up for MedVault as a patient or clinician." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [facility, setFacility] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await signup({ name, email, password, role, facility, specialty });
      navigate({ to: user.role === "doctor" ? "/doctor" : "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-up failed");
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
          <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">It only takes a moment.</p>
        </div>

        <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl mb-4">
          <button type="button" onClick={() => setRole("patient")}
            className={`flex items-center justify-center gap-2 h-9 rounded-lg text-sm font-medium transition ${role === "patient" ? "bg-card shadow-card text-foreground" : "text-muted-foreground"}`}>
            <UserIcon className="h-4 w-4" /> Patient
          </button>
          <button type="button" onClick={() => setRole("doctor")}
            className={`flex items-center justify-center gap-2 h-9 rounded-lg text-sm font-medium transition ${role === "doctor" ? "bg-card shadow-card text-foreground" : "text-muted-foreground"}`}>
            <Stethoscope className="h-4 w-4" /> Doctor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-5 shadow-card space-y-4">
          <Field icon={UserIcon} label="Full name" value={name} onChange={setName} type="text" required />
          <Field icon={Mail} label="Email" value={email} onChange={setEmail} type="email" required />
          <Field icon={Lock} label="Password" value={password} onChange={setPassword} type="password" required />

          {role === "doctor" && (
            <>
              <Field icon={Building2} label="Facility / Hospital" value={facility} onChange={setFacility} type="text" required />
              <Field icon={Briefcase} label="Specialty" value={specialty} onChange={setSpecialty} type="text" required />
            </>
          )}

          {error && <p className="text-xs text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-gradient-primary text-primary-foreground font-medium shadow-elegant hover:opacity-95 transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Create {role === "doctor" ? "doctor" : "patient"} account
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, type, required }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="mt-1 flex items-center gap-2 px-3 h-11 rounded-xl border border-input bg-background focus-within:ring-2 focus-within:ring-ring transition">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-transparent outline-none text-sm" required={required} />
      </div>
    </div>
  );
}
