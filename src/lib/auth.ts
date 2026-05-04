const KEY = "medvault.auth";

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "1";
}

export function login(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(KEY, "1");
      resolve();
    }, 700);
  });
}

export function logout() {
  localStorage.removeItem(KEY);
}
