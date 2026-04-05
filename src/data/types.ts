export type Spot = {
  spot_id: string;
  slug: string;
  display_name: string;
  short_name: string;
  prefecture: string;
  city: string;
  parent_area: string;
  category: string;
  lat: number | null;
  lng: number | null;
  map_x: number | null;
  map_y: number | null;
  region_key: string;
  priority: number;
  status: "draft" | "published";
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
