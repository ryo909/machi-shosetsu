import { Link, useLocation } from "react-router-dom";

import styles from "./Navigation.module.css";

const items = [
  { to: "/", label: "ホーム", matches: ["/"] },
  { to: "/spots", label: "スポット", matches: ["/spots", "/works"] },
  { to: "/map", label: "地図", matches: ["/map"] },
  { to: "/saved", label: "保存", matches: ["/saved"] },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className={styles.bottomNav} aria-label="主要ナビゲーション">
      {items.map((item) => {
        const isActive =
          item.to === "/"
            ? location.pathname === "/"
            : item.matches.some((match) => location.pathname.startsWith(match));

        return (
          <Link
            key={item.to}
            className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`.trim()}
            to={item.to}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
