const MAX_NOTE_TITLE_LENGTH = 200;

export function normalizeNoteTitle(title: string): string {
  const normalizedTitle = title.trim();

  if (normalizedTitle.length === 0) {
    throw new Error("Note title cannot be empty");
  }

  if (normalizedTitle.length > MAX_NOTE_TITLE_LENGTH) {
    throw new Error(
      `Note title cannot exceed ${MAX_NOTE_TITLE_LENGTH} characters`,
    );
  }

  return normalizedTitle;
}
