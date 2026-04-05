const SAVED_SPOT_IDS_KEY = "saved_spot_ids";
const SAVED_WORK_IDS_KEY = "saved_work_ids";
export const SAVED_ITEMS_EVENT = "saved-items-updated";

function isBrowser() {
  return typeof window !== "undefined";
}

function readIds(key: string) {
  if (!isBrowser()) {
    return [] as string[];
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return [] as string[];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]) {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(key, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent(SAVED_ITEMS_EVENT));
}

function toggleId(key: string, id: string) {
  const current = readIds(key);
  const exists = current.includes(id);
  const next = exists ? current.filter((item) => item !== id) : [...current, id];
  writeIds(key, next);
  return next;
}

export function getSavedSpotIds() {
  return readIds(SAVED_SPOT_IDS_KEY);
}

export function getSavedWorkIds() {
  return readIds(SAVED_WORK_IDS_KEY);
}

export function toggleSavedSpotId(id: string) {
  return toggleId(SAVED_SPOT_IDS_KEY, id);
}

export function toggleSavedWorkId(id: string) {
  return toggleId(SAVED_WORK_IDS_KEY, id);
}
