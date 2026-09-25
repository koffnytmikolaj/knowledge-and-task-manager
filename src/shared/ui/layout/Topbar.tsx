"use client";

import Link from "next/link";
import BrandMark from "./BrandMark";
import styles from "./Topbar.module.scss";
import { usePathname } from "next/navigation";

type TopbarProps = {
  isSidebarOpen: boolean;
  onMenuClick: () => void;
};

export default function Topbar({ isSidebarOpen, onMenuClick }: TopbarProps) {
  const pathname = usePathname();

  return (
    <header className={styles.topbar}>
      <div className={styles.topbar__group}>
        <Link
          href="/"
          className={styles.topbar__brand}
          aria-label="Go to homepage"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <BrandMark />
          <div>
            <p className={styles.topbar__kicker}>Workspace</p>
            <h2 className={styles.topbar__title}>Overview</h2>
          </div>
        </Link>
      </div>

      <div className={styles.topbar__actions}>
        <button
          type="button"
          className={styles["topbar__menu-button"]}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-controls="workspace-sidebar"
          aria-expanded={isSidebarOpen}
          onClick={onMenuClick}
        >
          <span aria-hidden="true">☰</span>
        </button>
      </div>
    </header>
  );
}
