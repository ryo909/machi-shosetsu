import { RegionChip } from "./RegionChip";
import styles from "./Common.module.css";

type RegionOption = {
  value: string;
  label: string;
};

type RegionChipGroupProps = {
  options: RegionOption[];
  value: string;
  onChange: (value: string) => void;
};

export function RegionChipGroup({
  options,
  value,
  onChange,
}: RegionChipGroupProps) {
  return (
    <div className={styles.chipGroup}>
      {options.map((option) => (
        <RegionChip
          key={option.value}
          active={option.value === value}
          label={option.label}
          onClick={() => onChange(option.value)}
        />
      ))}
    </div>
  );
}
