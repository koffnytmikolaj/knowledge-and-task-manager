import WorkspaceSection from "shared/ui/workspace/WorkspaceSection";

type NoteDetailPageProps = {
  params: Promise<{ noteId: string }>;
};

export default async function NoteDetailPage({
  params,
}: NoteDetailPageProps) {
  const { noteId } = await params;

  return (
    <WorkspaceSection
      title="Note details"
      description={`You are viewing note ${noteId}.`}
    />
  );
}