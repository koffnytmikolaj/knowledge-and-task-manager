"use client";

import styles from "./Topbar.module.scss";

type TopbarProps = {
  isSidebarOpen: boolean;
  onMenuClick: () => void;
};

export default function Topbar({ isSidebarOpen, onMenuClick }: TopbarProps) {
  return (
    <header className={styles.topbar}>
      <div className={styles.topbar__group}>
        <button
          type="button"
          className={styles["topbar__menu-button"]}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-controls="workspace-sidebar"
          aria-expanded={isSidebarOpen}
          onClick={onMenuClick}
        >
          ☰
        </button>

        <div className={styles["topbar__title-wrap"]}>
          <p className={styles.topbar__kicker}>Workspace</p>
          <h2 className={styles.topbar__title}>Overview</h2>
        </div>
      </div>

      <div className={styles.topbar__actions}>
        <button
          type="button"
          className={styles["topbar__add-button"]}
          aria-label="Create new item"
        >
          +
        </button>
      </div>
    </header>
  );
}
