"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Mot de passe incorrect");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-5 font-body">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border-4 border-mustard bg-cream p-8 shadow-2xl"
      >
        <h1 className="font-script text-4xl text-red text-center">Chez Ricco</h1>
        <p className="mt-1 text-center text-xs uppercase tracking-widest text-black/60 font-display">
          Espace administration
        </p>

        <label className="mt-6 block text-xs font-bold uppercase tracking-wide text-black/70">
          Mot de passe
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="mt-2 w-full rounded-lg border-2 border-black/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-mustard"
        />

        {error && <p className="mt-3 text-sm font-bold text-red">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-mustard px-4 py-3 font-display text-sm text-black font-bold shadow-[3px_3px_0_#1c1410] hover:bg-mustard-light transition-all disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
