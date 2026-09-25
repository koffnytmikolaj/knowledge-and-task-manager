"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "shared/config/navigation";
import styles from "./Sidebar.module.scss";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

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
        <nav className={styles.sidebar__nav} aria-label="Sidebar navigation">
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={classNames(
                  styles.sidebar__link,
                  isActive && styles["sidebar__link--active"],
                )}
                aria-current={isActive ? "page" : undefined}
                onClick={onClose}
              >
                {item.label}
              </Link>
            );
          })}
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
