import type { Relation } from "../data/types";

export const relationLabels: Record<Relation["relation_type"], string> = {
  main_stage: "主舞台",
  major_scene: "主要場面",
  model_place: "モデル地",
  popular_association: "通説関連",
};
