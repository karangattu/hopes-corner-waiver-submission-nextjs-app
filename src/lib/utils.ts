import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toZonedTime, format } from "date-fns-tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPacificTime(): Date {
  return toZonedTime(new Date(), "America/Los_Angeles");
}

export function getPacificDate(): string {
  const pacificTime = getPacificTime();
  return format(pacificTime, "yyyy-MM-dd", { timeZone: "America/Los_Angeles" });
}

export function getPacificDateTime(): string {
  const pacificTime = getPacificTime();
  return format(pacificTime, "yyyy-MM-dd HH:mm:ss", { timeZone: "America/Los_Angeles" });
}

export function getCurrentYear(): number {
  return getPacificTime().getFullYear();
}

export function capitalizeFullName(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function generateInitials(name: string): string {
  return name
    .split(" ")
    .filter((word) => word.trim() !== "")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}
