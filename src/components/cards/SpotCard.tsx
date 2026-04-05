import { Link } from "react-router-dom";

import type { Spot } from "../../data/types";
import styles from "./Cards.module.css";

type SpotCardProps = {
  spot: Spot;
  representativeWorkTitle: string;
  workCount: number;
};

export function SpotCard({
  spot,
  representativeWorkTitle,
  workCount,
}: SpotCardProps) {
  return (
    <Link className={styles.card} to={`/spots/${spot.slug}`}>
      <div className={styles.spotTop}>
        <div>
          <div className={styles.spotRegion}>{spot.parent_area}</div>
          <h3 className={styles.spotTitle}>{spot.display_name}</h3>
        </div>
        <div className={styles.spotCount}>{workCount}作品</div>
      </div>
      <p className={styles.copy}>{spot.list_copy}</p>
      <div className={styles.spotWork}>代表作品: {representativeWorkTitle}</div>
      <div className={styles.spotLink}>詳しく見る</div>
    </Link>
  );
}
