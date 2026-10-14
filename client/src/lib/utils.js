import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Junta nombres de clase y resuelve conflictos de Tailwind (la última gana)
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
