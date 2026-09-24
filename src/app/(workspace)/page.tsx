import styles from "./page.module.scss";
import {
  recentWorkspaceNotes,
  workspaceOverviewMetrics,
  workspaceTaskQueue,
} from "./workspace.mock";

export default function WorkspacePage() {
  return (
    <div className={styles.page}>
      <section className={styles.page__hero}>
        <div>
          <p className={styles.page__eyebrow}>Workspace overview</p>
          <h1 className={styles.page__title}>
            AI Knowledge &amp; Task Manager
          </h1>
        </div>

        <button type="button" className={styles["page__primary-button"]}>
          New item
        </button>
      </section>

      <section className={styles.page__metrics} aria-label="Workspace metrics">
        {workspaceOverviewMetrics.map((metric) => (
          <article key={metric.label} className={styles.page__metric}>
            <span className={styles["page__metric-value"]}>{metric.value}</span>
            <span className={styles["page__metric-label"]}>{metric.label}</span>
          </article>
        ))}
      </section>

      <section className={styles.page__grid}>
        <article className={styles.page__card}>
          <h2 className={styles["page__card-title"]}>Recent notes</h2>

          <ul className={styles.page__list}>
            {recentWorkspaceNotes.map((item) => (
              <li key={item.title} className={styles.page__item}>
                <span className={styles["page__item-text"]}>{item.title}</span>
                <span className={styles.page__status}>{item.state}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.page__card}>
          <h2 className={styles["page__card-title"]}>Task queue</h2>

          <ul className={styles.page__list}>
            {workspaceTaskQueue.map((item) => (
              <li key={item.title} className={styles.page__item}>
                <span className={styles["page__item-text"]}>{item.title}</span>
                <span className={styles.page__status}>{item.state}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
