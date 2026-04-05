import { Link } from "react-router-dom";

import type { Spot } from "../../data/types";
import styles from "./Cards.module.css";

type SelectedSpotPreviewCardProps = {
  spot: Spot;
  representativeWorkTitle: string;
};

export function SelectedSpotPreviewCard({
  spot,
  representativeWorkTitle,
}: SelectedSpotPreviewCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.spotRegion}>{spot.parent_area}</div>
      <h3 className={styles.featuredTitle}>{spot.display_name}</h3>
      <p className={styles.copy}>{spot.list_copy}</p>
      <div className={styles.meta}>
        <span>{spot.city}</span>
        <span>{spot.category}</span>
      </div>
      <div className={styles.spotWork}>代表作品: {representativeWorkTitle}</div>
      <div className={styles.previewActions}>
        <Link className={styles.cta} to={`/spots/${spot.slug}`}>
          スポット詳細へ
        </Link>
      </div>
    </article>
  );
}
