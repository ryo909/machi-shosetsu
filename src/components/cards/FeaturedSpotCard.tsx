import { Link } from "react-router-dom";

import type { Spot } from "../../data/types";
import styles from "./Cards.module.css";

type FeaturedSpotCardProps = {
  spot: Spot;
  representativeWorkTitle: string;
};

export function FeaturedSpotCard({
  spot,
  representativeWorkTitle,
}: FeaturedSpotCardProps) {
  return (
    <Link className={`${styles.card} ${styles.featuredCard}`} to={`/spots/${spot.slug}`}>
      <div className={styles.featuredRegion}>{spot.parent_area}</div>
      <h3 className={styles.featuredTitle}>{spot.display_name}</h3>
      <p className={styles.copy}>{spot.list_copy}</p>
      <div className={styles.meta}>
        <span>{representativeWorkTitle}</span>
        <span>{spot.category}</span>
      </div>
    </Link>
  );
}
