import type { ReactNode } from "react";

import styles from "./Common.module.css";

type HeroSectionProps = {
  eyebrow: string;
  title: string;
  text: string;
  actions?: ReactNode;
};

export function HeroSection({ eyebrow, title, text, actions }: HeroSectionProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroEyebrow}>
        <span aria-hidden="true">◇</span>
        {eyebrow}
      </div>
      <h1 className={styles.heroTitle}>{title}</h1>
      <p className={styles.heroText}>{text}</p>
      <div className={styles.heroOrnament} aria-hidden="true" />
      {actions ? <div className={styles.buttonRow}>{actions}</div> : null}
    </section>
  );
}
