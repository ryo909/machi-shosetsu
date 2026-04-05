import { relationLabels } from "../../lib/relationLabels";
import type { Relation } from "../../data/types";
import styles from "./Badges.module.css";

type RelationBadgeProps = {
  type: Relation["relation_type"];
};

export function RelationBadge({ type }: RelationBadgeProps) {
  return <span className={styles.badge}>{relationLabels[type]}</span>;
}
