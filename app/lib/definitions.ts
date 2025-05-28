export type SessionUser = {
  name?: string | null;
  email?: string | null;
  license?: string | null;
  employer?: string | null;
  role?: string | null;
  employees?: { license: string; name: string }[]; // Optional: add employees if needed
};

export type SessionData = {
  user?: SessionUser;
};

export type Employee = {
  license: string;
  name: string;
};