import type { Spot } from "../../data/types";
import { MapPin } from "./MapPin";
import styles from "./Map.module.css";

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
        <svg
          aria-hidden="true"
          className={styles.svg}
          viewBox="0 0 400 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* grid lines for paper-map texture */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(116,105,93,0.06)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="400" height="500" fill="url(#grid)" />

          {/* Hokkaido */}
          <path
            className={styles.land}
            d="M290 28c4 2 10 6 14 12 5 8 6 16 3 24-2 5-6 9-12 12l-8 4c-3 2-7 5-8 9l-2 7c-3 8-9 14-16 17l-8 3c-5 2-9 0-13-4l-5-7c-2-4-6-7-10-7l-5 0c-4 1-8-1-10-5-2-4-1-8 2-12l7-8c3-4 6-8 7-13l1-6c0-4 2-8 5-11l6-5c3-3 7-4 11-4 5-1 10 0 15 3l6 3c4 2 9 2 13 0l8-5c4-3 9-4 14-3l4 1c-3-2-5-3-8-4z"
          />
          {/* Hokkaido detail - cape */}
          <path
            className={styles.land}
            d="M304 22c3 1 5 3 7 6l-5 4-6-2 1-6 3-2z"
          />

          {/* Honshu main body */}
          <path
            className={styles.land}
            d="M302 110c6 5 10 14 10 24-1 8-5 14-12 18l-10 6c-4 3-8 7-10 12l-4 10c-3 8-8 14-15 18l-14 9c-8 5-13 13-14 22l-2 12c-1 8-5 15-11 20l-12 10c-7 6-11 13-12 22l-1 9c0 8-4 15-10 20l-10 9c-5 5-8 11-9 18l-2 8c-2 8-7 14-14 18l-16 10c-9 5-15 12-18 21l-4 12c-2 7-7 12-14 15l-18 8c-9 4-16 10-20 18l-6 11c-4 7-11 12-19 14l-12 3c-6 1-11-1-14-5-3-5-2-10 1-16l6-10c4-6 5-13 4-20l-1-8c-1-6 1-12 5-17l8-9c4-5 7-10 7-17l0-6c0-7 3-13 8-18l10-9c5-4 8-10 9-17l1-7c1-7 4-13 9-17l12-10c5-5 8-11 8-18l0-8c0-6 3-12 8-17l12-10c5-4 7-10 7-16l0-6c0-8 4-15 10-20l10-9c5-4 8-10 9-16l2-7c2-8 8-14 16-18l14-7c6-3 11-8 14-14l3-6c3-6 8-9 14-10 6-2 12-1 17 2z"
          />

          {/* Shikoku */}
          <path
            className={styles.land}
            d="M125 365c8 2 16 8 22 16l-3 8c-3 5-7 8-12 9l-14 2c-6 1-11-1-15-5l-6-8c-3-4-2-9 2-13l8-6c5-3 11-4 18-3z"
          />

          {/* Kyushu */}
          <path
            className={styles.land}
            d="M80 340c6 1 12 5 17 12l3 6c2 5 2 10-1 14l-6 10c-3 5-8 8-14 9l-8 1c-5 0-10-2-14-6l-6-8c-3-5-3-10 0-15l6-10c4-6 9-10 15-12l8-1z"
          />
        </svg>
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
