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
      <div className={styles.mapFrame}>
        <svg
          aria-hidden="true"
          className={styles.svg}
          viewBox="0 0 320 390"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect className={styles.guide} height="390" rx="32" width="320" x="0" y="0" />
          <path
            className={styles.land}
            d="M242 38c18 10 31 24 33 40-3 12-12 19-23 22 6 11 5 23-2 35l-15 18c-6 9-8 19-4 31 2 8-3 17-12 23l-16 13c-10 8-16 19-16 31l-1 15c-1 15-11 27-28 36l-26 15c-18 10-32 11-45 2l-14-10c-8-6-17-7-26-2l-15 9c-8 5-16 4-23-1 0-16 7-29 22-40l20-14c10-7 15-16 16-27l1-17c1-13 7-24 17-33l18-16c8-7 12-16 12-26 0-14 7-24 20-31l24-12c12-6 20-15 23-28l5-21c3-12 12-22 26-29 13-7 25-8 34-4z"
          />
          <path
            className={styles.land}
            d="M233 12c7 1 14 5 22 11l-12 7-17-3 7-15z"
          />
          <path
            className={styles.land}
            d="M72 338c12 1 24 6 35 14l-8 12-29-5-8-12 10-9z"
          />
          <path
            className={styles.land}
            d="M45 303c8 2 15 6 21 12l-8 10-17-4-3-12 7-6z"
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
