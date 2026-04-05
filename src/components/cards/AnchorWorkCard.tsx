import { Link } from "react-router-dom";

import type { Relation, Work } from "../../data/types";
import { RelationBadge } from "../badges/RelationBadge";
import styles from "./Cards.module.css";

type AnchorWorkCardProps = {
  work: Work;
  relation: Relation;
  spotSlug: string;
};

export function AnchorWorkCard({ work, relation, spotSlug }: AnchorWorkCardProps) {
  return (
    <article className={`${styles.card} ${styles.anchorCard}`}>
      <div className={styles.eyebrow}>
        <span aria-hidden="true">◆</span>
        まずはこの一冊
      </div>
      <h3 className={styles.workTitle}>{work.title}</h3>
      <p className={styles.author}>{work.author}</p>
      <div className={styles.badgeRow}>
        <RelationBadge type={relation.relation_type} />
      </div>
      <p className={styles.copy}>{relation.card_copy}</p>
      <p className={styles.intro}>{relation.detail_intro}</p>
      <Link className={styles.cta} to={`/works/${work.slug}?spot=${spotSlug}`}>
        作品詳細へ
      </Link>
    </article>
  );
}
