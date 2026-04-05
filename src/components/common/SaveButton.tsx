import styles from "./Common.module.css";

type SaveButtonProps = {
  active: boolean;
  onClick: () => void;
};

export function SaveButton({ active, onClick }: SaveButtonProps) {
  return (
    <button
      aria-pressed={active}
      className={`${styles.saveButton} ${active ? styles.saveButtonActive : ""}`.trim()}
      onClick={onClick}
      type="button"
    >
      <span className={styles.saveDot} aria-hidden="true" />
      <span>{active ? "保存済み" : "保存する"}</span>
    </button>
  );
}
