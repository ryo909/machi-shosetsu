import styles from "./Common.module.css";

type Tab = {
  value: string;
  label: string;
};

type TabSwitcherProps = {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
};

export function TabSwitcher({ tabs, value, onChange }: TabSwitcherProps) {
  return (
    <div className={styles.tabSwitcher}>
      {tabs.map((tab) => (
        <button
          className={`${styles.tabButton} ${
            value === tab.value ? styles.tabButtonActive : ""
          }`.trim()}
          key={tab.value}
          onClick={() => onChange(tab.value)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
