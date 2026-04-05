import { Link } from "react-router-dom";

import type { Spot } from "../../data/types";
import styles from "./Map.module.css";

type MapSpotMiniListProps = {
  spots: Array<{
    spot: Spot;
    representativeWorkTitle: string;
  }>;
  selectedSpotId?: string | null;
  onSelect: (spotId: string) => void;
};

export function MapSpotMiniList({
  spots,
  selectedSpotId,
  onSelect,
}: MapSpotMiniListProps) {
  return (
    <div className={styles.miniList}>
      {spots.map(({ spot, representativeWorkTitle }) => (
        <article
          className={`${styles.miniListButton} ${
            selectedSpotId === spot.spot_id ? styles.miniListButtonActive : ""
          }`.trim()}
          key={spot.spot_id}
        >
          <button className={styles.miniListHeader} onClick={() => onSelect(spot.spot_id)} type="button">
            <div className={styles.miniListText}>
              <div className={styles.miniListRegion}>{spot.parent_area}</div>
              <div className={styles.miniListTitle}>{spot.display_name}</div>
            </div>
            <div className={styles.miniListSelect}>地図で選択</div>
          </button>
          <div className={styles.miniListMeta}>{representativeWorkTitle}</div>
          <Link className={styles.miniListLink} to={`/spots/${spot.slug}`}>
            スポット詳細へ
          </Link>
        </article>
      ))}
    </div>
  );
}
