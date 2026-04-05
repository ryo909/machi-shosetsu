import type { Spot } from "../../data/types";
import { MapPin } from "./MapPin";
import styles from "./Map.module.css";

const mapImageSrc = `${import.meta.env.BASE_URL}images/map-background.jpg`;

type JapanMapCardProps = {
  spots: Spot[];
  selectedSpotId?: string | null;
  onSelect: (spotId: string) => void;
};

export function JapanMapCard({
  spots,
  selectedSpotId,
  onSelect,
}: JapanMapCardProps) {
  return (
    <section className={styles.mapCard}>
      <div className={styles.mapHeader}>
        <span className={styles.mapCompass} aria-hidden="true">N</span>
        <span className={styles.mapTitle}>文学スポットマップ</span>
      </div>
      <div className={styles.mapFrame}>
        <img
          alt="日本地図"
          className={styles.mapImage}
          draggable="false"
          src={mapImageSrc}
        />
        <div className={styles.mapImageVeil} aria-hidden="true" />
        <div className={styles.pinsLayer}>
          {spots.map((spot) =>
            spot.map_x !== null && spot.map_y !== null ? (
              <MapPin
                active={spot.spot_id === selectedSpotId}
                key={spot.spot_id}
                label={spot.display_name}
                onClick={() => onSelect(spot.spot_id)}
                x={spot.map_x}
                y={spot.map_y}
              />
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}
