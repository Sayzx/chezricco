"use client";

import { useEffect, useState } from "react";
import type { DaySchedule } from "@/lib/store";

function computeStatus(schedule: DaySchedule[]): { isOpen: boolean; text: string } {
  const now = new Date();
  const today = schedule.find((d) => d.dayIndex === now.getDay());
  if (!today || today.closed) return { isOpen: false, text: "Fermé" };

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const isOpen = today.ranges.some((r) => {
    const [oh, om] = r.open.split(":").map(Number);
    const [ch, cm] = r.close.split(":").map(Number);
    const openMinutes = oh * 60 + om;
    const closeMinutes = ch * 60 + cm;
    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  });

  return isOpen ? { isOpen: true, text: "Ouvert" } : { isOpen: false, text: "Fermé" };
}

export default function OpenStatus({ className = "" }: { className?: string }) {
  const [schedule, setSchedule] = useState<DaySchedule[] | null>(null);
  const [status, setStatus] = useState<{ isOpen: boolean; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/hours")
      .then((r) => r.json())
      .then((d) => setSchedule(d.schedule))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!schedule) return;
    setStatus(computeStatus(schedule));
    const interval = setInterval(() => setStatus(computeStatus(schedule)), 60000);
    return () => clearInterval(interval);
  }, [schedule]);

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
