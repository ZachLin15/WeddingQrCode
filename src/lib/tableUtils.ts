import { TABLE_COUNT } from "./config";

export function parseTableParam(raw: string | undefined | null): number | null {
  if (!raw) return null;
  if (!/^\d+$/.test(raw)) return null;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 1 || n > TABLE_COUNT) return null;
  return n;
}
