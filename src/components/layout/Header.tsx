import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import styles from "./Layout.module.css";

type HeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  backTo?: string;
  backLabel?: string;
  actions?: ReactNode;
};

export function Header({
  title,
  description,
  eyebrow,
  backTo,
  backLabel = "戻る",
  actions,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerMain}>
        {backTo ? (
          <Link className={styles.backLink} to={backTo}>
            <span aria-hidden="true">←</span>
            <span>{backLabel}</span>
          </Link>
        ) : null}
        {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}
        <h1 className={styles.title}>{title}</h1>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </header>
  );
}
