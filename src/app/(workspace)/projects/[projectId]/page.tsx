import WorkspaceSection from "shared/ui/workspace/WorkspaceSection";

type ProjectDetailPageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { projectId } = await params;

  return (
    <WorkspaceSection
      title="Project details"
      description={`You are viewing project ${projectId}.`}
    />
  );
}