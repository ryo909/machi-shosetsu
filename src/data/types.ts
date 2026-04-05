export type Spot = {
  spot_id: string;
  slug: string;
  display_name: string;
  short_name: string;
  prefecture: string;
  city: string;
  // フィルタ表示は都道府県名で統一し、スポット名とは分離して扱う。
  parent_area: string;
  // 広域地域フィルタは北海道 / 東北 / 関東 ... の単位で統一する。
  region: string;
  category: string;
  lat: number | null;
  lng: number | null;
  display_x?: number | null;
  display_y?: number | null;
  map_mode?: "hidden" | "approx" | "representative";
  display_priority?: number | null;
  map_x: number | null;
  map_y: number | null;
  fine_dx?: number | null;
  fine_dy?: number | null;
  // 一覧画面と地図画面は同じ region_key を参照する。
  region_key: string;
  priority: number;
  status: "draft" | "published";
  heroCopy?: string;
  placeIntro?: string;
  readingEntry?: string;
  firstBookReason?: string;
  list_copy: string;
  description: string;
  tags: string[];
};

export type Work = {
  work_id: string;
  slug: string;
  title: string;
  author: string;
  era_label: string;
  year_label: string;
  famous_level: "high" | "medium" | "low";
  format: "novel" | "series";
  summary_short: string;
  tone_tags: string[];
  purchase_links: {
    amazon: string | null;
    rakuten: string | null;
    kindle: string | null;
  };
  cover_image_url: string | null;
  heroCopy?: string;
  workIntro?: string;
  readingPoint?: string;
  placeRelationNote?: string;
  status: "draft" | "published";
};

export type Relation = {
  relation_id: string;
  spot_id: string;
  work_id: string;
  relation_type:
    | "main_stage"
    | "major_scene"
    | "model_place"
    | "popular_association";
  confidence_label: "strong" | "medium" | "light";
  is_anchor: boolean;
  display_rank: number;
  card_copy: string;
  detail_intro: string;
  why_here: string;
  source_hint: string | null;
  editor_note: string | null;
  status: "draft" | "published";
};
