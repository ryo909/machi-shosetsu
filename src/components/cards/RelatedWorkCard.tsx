import { Link } from "react-router-dom";

import type { Relation, Work } from "../../data/types";
import { RelationBadge } from "../badges/RelationBadge";
import styles from "./Cards.module.css";

type RelatedWorkCardProps = {
  work: Work;
  relation: Relation;
  spotSlug?: string;
};

export function RelatedWorkCard({ work, relation, spotSlug }: RelatedWorkCardProps) {
  const to = spotSlug ? `/works/${work.slug}?spot=${spotSlug}` : `/works/${work.slug}`;

  return (
    <article className={styles.subtleCard}>
      <h3 className={styles.spotTitle}>{work.title}</h3>
      <p className={styles.author}>{work.author}</p>
      <div className={styles.badgeRow}>
        <RelationBadge type={relation.relation_type} />
      </div>
      <p className={styles.copy}>{relation.card_copy}</p>
      <Link className={styles.cta} to={to}>
        読みどころを見る
      </Link>
    </article>
  );
}
