"use client";

import { useEffect, useState } from "react";

export function getOpenStatusInfo() {
  const now = new Date();
  const day = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (day === 2) {
    return { isOpen: false, text: "Fermé" };
  }

  const morningStart = 7 * 60;
  const morningEnd = 14 * 60;
  const eveningStart = 17 * 60 + 30;
  const eveningEnd = 21 * 60 + 30;

  if (
    (currentMinutes >= morningStart && currentMinutes < morningEnd) ||
    (currentMinutes >= eveningStart && currentMinutes < eveningEnd)
  ) {
    return { isOpen: true, text: "Ouvert" };
  }

  return { isOpen: false, text: "Fermé" };
}

export default function OpenStatus({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<{ isOpen: boolean; text: string } | null>(null);

  useEffect(() => {
    setStatus(getOpenStatusInfo());
    const interval = setInterval(() => {
      setStatus(getOpenStatusInfo());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-display tracking-wide transition-all ${
        status.isOpen
          ? "border-emerald-600/30 bg-emerald-50 text-emerald-950 font-medium"
          : "border-red/30 bg-red/5 text-red font-medium"
      } ${className}`}
    >
      <span
        className={`h-2 w-2 rounded-full shrink-0 ${
          status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-red"
        }`}
      />
      <span>{status.text}</span>
    </div>
  );
}
