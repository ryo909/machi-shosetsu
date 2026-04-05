export function toPercent(value: number | null) {
  return value === null ? undefined : `${value}%`;
}

export function clampSelection<T>(items: T[], currentIndex: number) {
  if (items.length === 0) {
    return null;
  }
  return items[Math.max(0, Math.min(currentIndex, items.length - 1))];
}
