import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.css";

const items = [
  { to: "/", label: "ホーム", end: true },
  { to: "/spots", label: "スポット" },
  { to: "/map", label: "地図" },
  { to: "/saved", label: "保存" },
];

export function BottomNav() {
  return (
    <nav className={styles.bottomNav} aria-label="主要ナビゲーション">
      {items.map((item) => (
        <NavLink
          key={item.to}
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.navItemActive : ""}`.trim()
          }
          end={item.end}
          to={item.to}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
