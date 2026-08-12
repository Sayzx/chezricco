"use client";

import { useEffect, useState } from "react";

export function getOpenStatusInfo() {
  const now = new Date();
  const day = now.getDay(); // 0 = Dim, 1 = Lun, 2 = Mar, 3 = Mer, 4 = Jeu, 5 = Ven, 6 = Sam
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (day === 2) {
    return { isOpen: false, text: "Fermé le mardi", detail: "Réouverture mercredi à 7h00" };
  }

  const morningStart = 7 * 60; // 7h00 (420)
  const morningEnd = 14 * 60; // 14h00 (840)
  const eveningStart = 17 * 60 + 30; // 17h30 (1050)
  const eveningEnd = 21 * 60 + 30; // 21h30 (1290)

  if (currentMinutes >= morningStart && currentMinutes < morningEnd) {
    return { isOpen: true, text: "Ouvert actuellement", detail: "Ferme à 14h00" };
  }

  if (currentMinutes >= eveningStart && currentMinutes < eveningEnd) {
    return { isOpen: true, text: "Ouvert actuellement", detail: "Ferme à 21h30" };
  }

  if (currentMinutes < morningStart) {
    return { isOpen: false, text: "Fermé actuellement", detail: "Ouvre aujourd'hui à 7h00" };
  }

  if (currentMinutes >= morningEnd && currentMinutes < eveningStart) {
    return { isOpen: false, text: "Fermé actuellement", detail: "Ouvre aujourd'hui à 17h30" };
  }

  // After 21:30
  if (day === 1) {
    return { isOpen: false, text: "Fermé actuellement", detail: "Fermé demain (mardi)" };
  }
  return { isOpen: false, text: "Fermé actuellement", detail: "Ouvre demain à 7h00" };
}

export default function OpenStatus({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<{ isOpen: boolean; text: string; detail: string } | null>(null);

  useEffect(() => {
    setStatus(getOpenStatusInfo());
    const interval = setInterval(() => {
      setStatus(getOpenStatusInfo());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-black/20 px-3 py-1 text-xs font-display tracking-wide ${className}`}>
      <span className={`h-2.5 w-2.5 rounded-full ${status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-red"}`} />
      <span className="font-semibold">{status.text}</span>
      <span className="opacity-75">({status.detail})</span>
    </div>
  );
}
