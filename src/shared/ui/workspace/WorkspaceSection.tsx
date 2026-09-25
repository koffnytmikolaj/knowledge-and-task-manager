import styles from "./WorkspaceSection.module.scss";

type WorkspaceSectionProps = {
  title: string;
  description: string;
};

export default function WorkspaceSection({
  title,
  description,
}: WorkspaceSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="workspace-section-title">
      <p className={styles.section__eyebrow}>Workspace</p>
      <h1 id="workspace-section-title" className={styles.section__title}>
        {title}
      </h1>
      <p className={styles.section__description}>{description}</p>
    </section>
  );
}