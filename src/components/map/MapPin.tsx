import { toPercent } from "../../lib/mapHelpers";
import styles from "./Map.module.css";

type MapPinProps = {
  x: number;
  y: number;
  active?: boolean;
  onClick: () => void;
  label: string;
};

export function MapPin({ x, y, active = false, onClick, label }: MapPinProps) {
  return (
    <button
      aria-label={label}
      className={`${styles.pin} ${active ? styles.pinActive : ""}`.trim()}
      onClick={onClick}
      style={{ left: toPercent(x), top: toPercent(y) }}
      type="button"
    >
      <span className={styles.pinInner} />
    </button>
  );
}
