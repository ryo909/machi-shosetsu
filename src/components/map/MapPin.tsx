import styles from "./Map.module.css";

type MapPinProps = {
  x: number;
  y: number;
  active?: boolean;
  zIndex?: number;
  onClick: () => void;
  label: string;
};

export function MapPin({
  x,
  y,
  active = false,
  zIndex,
  onClick,
  label,
}: MapPinProps) {
  return (
    <button
      aria-label={label}
      className={`${styles.pin} ${active ? styles.pinActive : ""}`.trim()}
      onClick={onClick}
      style={{ left: `${x}px`, top: `${y}px`, zIndex }}
      type="button"
    >
      <span className={styles.pinInner} />
      {active ? <span className={styles.pinRing} /> : null}
      <span className={styles.pinLabel}>{label}</span>
    </button>
  );
}
