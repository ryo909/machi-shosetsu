import styles from "./Common.module.css";

type RegionChipProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export function RegionChip({ label, active = false, onClick }: RegionChipProps) {
  return (
    <button
      className={`${styles.chip} ${active ? styles.chipActive : ""}`.trim()}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
