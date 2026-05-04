export type Role = "patient" | "doctor";

export interface AuthUser {
  email: string;
  name: string;
  role: Role;
  // doctor-only
  facility?: string;
  specialty?: string;
}

interface StoredUser extends AuthUser {
  password: string;
}

const SESSION_KEY = "medvault.session";
const USERS_KEY = "medvault.users";

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function seedDemoUsers() {
  const users = readUsers();
  if (users.length > 0) return;
  writeUsers([
    {
      email: "chanda.mwansa@medvault.zm",
      password: "demo1234",
      name: "Chanda Mwansa",
      role: "patient",
    },
    {
      email: "dr.banda@uth.zm",
      password: "demo1234",
      name: "Dr. M. Banda",
      role: "doctor",
      facility: "University Teaching Hospital",
      specialty: "Internal Medicine",
    },
  ]);
}

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(SESSION_KEY);
}

export function currentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function login(email: string, password: string, role: Role): Promise<AuthUser> {
  seedDemoUsers();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = readUsers();
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.role === role,
      );
      if (!user) return reject(new Error("Invalid credentials for this role."));
      const session: AuthUser = {
        email: user.email,
        name: user.name,
        role: user.role,
        facility: user.facility,
        specialty: user.specialty,
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      resolve(session);
    }, 600);
  });
}

export function signup(input: {
  email: string;
  password: string;
  name: string;
  role: Role;
  facility?: string;
  specialty?: string;
}): Promise<AuthUser> {
  seedDemoUsers();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = readUsers();
      if (users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
        return reject(new Error("An account with this email already exists."));
      }
      const stored: StoredUser = { ...input };
      users.push(stored);
      writeUsers(users);
      const session: AuthUser = {
        email: input.email,
        name: input.name,
        role: input.role,
        facility: input.facility,
        specialty: input.specialty,
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      resolve(session);
    }, 700);
  });
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
