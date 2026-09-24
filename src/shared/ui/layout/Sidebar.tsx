"use client";

import classNames from "classnames";
import Link from "next/link";
import { navigationItems } from "./navigation";
import styles from "./Sidebar.module.scss";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <aside
        id="workspace-sidebar"
        className={classNames(
          styles.sidebar,
          isOpen && styles["sidebar--open"],
        )}
        aria-label="Main navigation"
      >
        <div className={styles.sidebar__brand}>
          <div className={styles.sidebar__logo}>AI</div>
          <div>
            <p className={styles.sidebar__title}>AI Manager</p>
            <p className={styles.sidebar__subtitle}>Workspace</p>
          </div>
        </div>

        <nav className={styles.sidebar__nav} aria-label="Sidebar navigation">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={styles.sidebar__link}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <button
          type="button"
          className={styles.sidebar__overlay}
          aria-label="Close sidebar"
          onClick={onClose}
        />
      )}
    </>
  );
}
