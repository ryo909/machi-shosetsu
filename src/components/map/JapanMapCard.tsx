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
          viewBox="0 0 430 520"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(116,105,93,0.06)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="430" height="520" fill="url(#grid)" />

          <path
            className={styles.land}
            d="M287 29c11 2 22 8 29 18 7 9 10 20 8 31-2 9-8 17-17 23l-15 10c-6 4-10 10-12 17l-3 11c-3 10-10 18-21 24l-13 7c-9 5-17 4-23-2l-10-10c-5-6-11-8-18-7l-10 1c-8 1-14-1-17-7-3-6-2-12 2-18l10-12c5-5 8-11 10-18l3-10c2-7 6-13 12-18l10-8c6-5 13-7 20-7 8 0 15 2 22 7l9 6c6 4 13 4 19 0l12-8c7-4 14-6 22-5z"
          />
          <path
            className={styles.land}
            d="M313 22c7 2 12 6 16 12l-10 7-11-3 0-10 5-6z"
          />

          <path
            className={styles.land}
            d="M312 128c9 7 14 18 14 30 0 12-6 22-17 29l-12 9c-7 5-12 12-15 20l-5 14c-4 10-11 18-20 24l-19 12c-10 6-17 16-19 28l-3 15c-2 10-7 19-15 26l-15 13c-8 7-13 15-14 26l-2 13c-1 11-6 20-14 27l-14 13c-7 6-11 14-13 23l-2 10c-2 10-8 19-17 25l-21 13c-11 7-19 15-23 27l-5 15c-3 9-10 16-19 20l-19 9c-10 4-18 10-23 19l-9 14c-5 8-12 13-22 16l-15 3c-9 2-16-1-20-8-3-7-3-14 2-22l9-14c5-8 7-16 5-25l-2-10c-2-8 1-16 7-23l11-13c6-7 9-14 9-23v-9c0-8 4-16 11-22l13-12c6-6 10-14 11-22l2-10c1-9 6-17 13-23l16-13c7-6 11-14 11-23v-10c0-8 4-15 11-22l15-13c6-5 9-12 9-20v-8c0-10 4-19 12-26l14-12c7-6 11-13 13-21l2-10c3-11 10-19 21-24l18-9c9-5 16-11 20-19l5-10c4-8 10-13 18-16 8-3 16-2 24 3z"
          />

          <path
            className={styles.land}
            d="M140 374c13 2 26 10 34 20l-3 11c-3 8-10 14-18 16l-23 4c-8 1-15-1-21-6l-10-9c-6-5-6-12-1-18l13-10c8-6 18-9 29-8z"
          />

          <path
            className={styles.land}
            d="M87 343c10 2 19 8 26 18l5 10c3 8 2 15-3 22l-9 15c-5 8-13 13-22 15l-12 1c-8 1-15-2-21-8l-10-11c-5-7-5-15 0-23l9-15c6-9 14-15 24-18l13-2z"
          />
          <text className={styles.mapLabel} x="294" y="183">北海道</text>
          <text className={styles.mapLabel} x="287" y="294">関東</text>
          <text className={styles.mapLabel} x="190" y="312">関西</text>
          <text className={styles.mapLabel} x="102" y="372">中国</text>
          <text className={styles.mapLabel} x="120" y="441">四国</text>
          <text className={styles.mapLabel} x="48" y="431">九州</text>
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
