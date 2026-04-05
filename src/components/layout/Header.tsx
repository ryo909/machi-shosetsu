import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { APP_NAME } from "../../lib/site";
import styles from "./Layout.module.css";

type BreadcrumbItem = {
  label: string;
  to?: string;
};

type HeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  backTo?: string;
  backLabel?: string;
  actions?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
};

export function Header({
  title,
  description,
  eyebrow,
  backTo,
  backLabel = "戻る",
  actions,
  breadcrumbs,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerMain}>
        <Link className={styles.brandLink} to="/">
          <span className={styles.brandLabel}>{APP_NAME}</span>
          <span className={styles.brandMeta}>トップへ戻る</span>
        </Link>
        {breadcrumbs?.length ? (
          <nav aria-label="パンくず" className={styles.breadcrumbs}>
            {breadcrumbs.map((item, index) => (
              <span className={styles.breadcrumbItem} key={`${item.label}-${index}`}>
                {item.to ? (
                  <Link className={styles.breadcrumbLink} to={item.to}>
                    {item.label}
                  </Link>
                ) : (
                  <span className={styles.breadcrumbCurrent}>{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}
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
