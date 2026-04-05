import type { ReactNode } from "react";

import styles from "./Common.module.css";

type SectionHeadingProps = {
  title: string;
  meta?: ReactNode;
};

export function SectionHeading({ title, meta }: SectionHeadingProps) {
  return (
    <div className={styles.sectionHeadingWrap}>
      <h2 className={styles.sectionHeading}>{title}</h2>
      {meta ? <div className={styles.sectionMeta}>{meta}</div> : null}
    </div>
  );
}
