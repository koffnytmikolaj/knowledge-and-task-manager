import { Rules } from "domain/rules";
import type { Note } from "domain/note/Note";
import { normalizeNoteTitle } from "domain/note/NoteRules";
import type { NoteRepository } from "./NoteRepository";

export type CreateNoteInput = {
  title: string;
  content: string;
  projectId?: string;
};

export type CreateNoteResult = {
  note: Note;
  aiTriggered: boolean;
};

export async function createNote(
  input: CreateNoteInput,
  repository: NoteRepository,
): Promise<CreateNoteResult> {
  const title = normalizeNoteTitle(input.title);
  const note: Note = await repository.create({
    title,
    content: input.content,
    ...(input.projectId === undefined ? {} : { projectId: input.projectId }),
  });

  return {
    note,
    aiTriggered: Rules.shouldTriggerAIForNote(input.content),
  };
}
