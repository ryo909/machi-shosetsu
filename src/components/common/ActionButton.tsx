import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import styles from "./Common.module.css";

type ActionButtonProps = {
  to: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ActionButton({
  to,
  children,
  variant = "primary",
}: ActionButtonProps) {
  return (
    <Link
      className={`${styles.actionButton} ${
        variant === "primary" ? styles.primaryButton : styles.secondaryButton
      }`}
      to={to}
    >
      {children}
    </Link>
  );
}
