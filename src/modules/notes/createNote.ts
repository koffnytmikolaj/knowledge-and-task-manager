import { Rules } from "domain/rules";
import type { Note } from "domain/note/Note";
import { normalizeNoteTitle } from "domain/note/NoteRules";

export type CreateNoteInput = {
  title: string;
  content: string;
};

export type CreateNoteResult = {
  note: Note;
  aiTriggered: boolean;
};

export function createNote(input: CreateNoteInput): CreateNoteResult {
  const title = normalizeNoteTitle(input.title);
  const now = new Date();

  const note: Note = {
    id: crypto.randomUUID(),
    title,
    content: input.content,
    createdAt: now,
    updatedAt: now,
  };

  return {
    note,
    aiTriggered: Rules.shouldTriggerAIForNote(input.content),
  };
}
