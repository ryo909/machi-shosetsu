export const broadRegionLabels = {
  all: "すべて",
  hokkaido: "北海道",
  tohoku: "東北",
  kanto: "関東",
  chubu: "中部",
  kinki: "近畿",
  chugoku: "中国",
  shikoku: "四国",
  kyushu_okinawa: "九州・沖縄",
} as const;

export type BroadRegionKey = keyof typeof broadRegionLabels;
export type BroadRegionValue = Exclude<BroadRegionKey, "all">;

export const broadRegionOrder: BroadRegionKey[] = [
  "all",
  "hokkaido",
  "tohoku",
  "kanto",
  "chubu",
  "kinki",
  "chugoku",
  "shikoku",
  "kyushu_okinawa",
];

const prefectureToBroadRegion: Record<string, BroadRegionValue> = {
  北海道: "hokkaido",
  青森: "tohoku",
  岩手: "tohoku",
  宮城: "tohoku",
  秋田: "tohoku",
  山形: "tohoku",
  福島: "tohoku",
  茨城: "kanto",
  栃木: "kanto",
  群馬: "kanto",
  埼玉: "kanto",
  千葉: "kanto",
  東京: "kanto",
  神奈川: "kanto",
  新潟: "chubu",
  富山: "chubu",
  石川: "chubu",
  福井: "chubu",
  山梨: "chubu",
  長野: "chubu",
  岐阜: "chubu",
  静岡: "chubu",
  愛知: "chubu",
  三重: "kinki",
  滋賀: "kinki",
  京都: "kinki",
  大阪: "kinki",
  兵庫: "kinki",
  奈良: "kinki",
  和歌山: "kinki",
  鳥取: "chugoku",
  島根: "chugoku",
  岡山: "chugoku",
  広島: "chugoku",
  山口: "chugoku",
  徳島: "shikoku",
  香川: "shikoku",
  愛媛: "shikoku",
  高知: "shikoku",
  福岡: "kyushu_okinawa",
  佐賀: "kyushu_okinawa",
  長崎: "kyushu_okinawa",
  熊本: "kyushu_okinawa",
  大分: "kyushu_okinawa",
  宮崎: "kyushu_okinawa",
  鹿児島: "kyushu_okinawa",
  沖縄: "kyushu_okinawa",
};

export function getBroadRegionForPrefecture(prefecture: string): BroadRegionValue {
  const region = prefectureToBroadRegion[prefecture];

  if (!region) {
    throw new Error(`Unsupported prefecture label: ${prefecture}`);
  }

  return region;
}

export function getBroadRegionOrderIndex(region: string) {
  const index = broadRegionOrder.indexOf(region as BroadRegionKey);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

export function isBroadRegionKey(value: string | null | undefined): value is BroadRegionKey {
  return !!value && value in broadRegionLabels;
}
