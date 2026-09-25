import { Rules } from "domain/rules";
import type { Note } from "domain/note";

export type CreateNoteInput = {
  title: string;
  content: string;
};

export type CreateNoteResult = {
  note: Note;
  aiTriggered: boolean;
};

export function createNote(input: CreateNoteInput): CreateNoteResult {
  const note: Note = {
    id: crypto.randomUUID(),
    title: input.title,
    content: input.content,
    createdAt: new Date(),
  };

  return {
    note,
    aiTriggered: Rules.shouldTriggerAIForNote(input.content),
  };
}
