export const regionLabels = {
  all: "すべて",
  hokkaido: "北海道",
  aomori: "青森",
  iwate: "岩手",
  yamagata: "山形",
  tokyo: "東京",
  kanagawa: "神奈川",
  niigata: "新潟",
  nagano: "長野",
  gifu: "岐阜",
  shizuoka: "静岡",
  ishikawa: "石川",
  kyoto: "京都",
  osaka: "大阪",
  hyogo: "兵庫",
  wakayama: "和歌山",
  hiroshima: "広島",
  ehime: "愛媛",
  nagasaki: "長崎",
  kumamoto: "熊本",
  okinawa: "沖縄",
} as const;

export type RegionKey = keyof typeof regionLabels;

export const prefectureRegionOrder: RegionKey[] = [
  "all",
  "hokkaido",
  "aomori",
  "iwate",
  "yamagata",
  "tokyo",
  "kanagawa",
  "niigata",
  "nagano",
  "gifu",
  "shizuoka",
  "ishikawa",
  "kyoto",
  "osaka",
  "hyogo",
  "wakayama",
  "hiroshima",
  "ehime",
  "nagasaki",
  "kumamoto",
  "okinawa",
];

export const homeRegionShortcutKeys: RegionKey[] = [
  "kyoto",
  "kanagawa",
  "hiroshima",
  "ehime",
  "hokkaido",
  "tokyo",
];

export const regionOptions = homeRegionShortcutKeys.map((value) => ({
  value,
  label: regionLabels[value],
}));

export function getRegionOrderIndex(value: string) {
  const index = prefectureRegionOrder.indexOf(value as RegionKey);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}
