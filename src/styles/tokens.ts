export const regionLabels = {
  all: "すべて",
  kyoto: "京都",
  kamakura: "鎌倉",
  onomichi: "尾道",
  dogo: "道後",
  otaru: "小樽",
  tokyo: "東京",
} as const;

export type RegionKey = keyof typeof regionLabels;

export const regionOptions = Object.entries(regionLabels).map(([value, label]) => ({
  value,
  label,
}));
