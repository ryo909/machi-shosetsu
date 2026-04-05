import styles from "./Common.module.css";

type EmptyStateProps = {
  message: string;
};

export function EmptyState({ message }: EmptyStateProps) {
  return <div className={styles.emptyState}>{message}</div>;
}
