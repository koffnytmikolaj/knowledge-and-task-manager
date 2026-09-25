"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import styles from "./Shell.module.scss";

type ShellProps = {
  children: React.ReactNode;
};

export default function Shell({ children }: ShellProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <div className={styles.main}>
        <Topbar
          isSidebarOpen={isSidebarOpen}
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
        />

        <main className={styles.content}>{children}</main>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}
