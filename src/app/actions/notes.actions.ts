"use server";

import { analyzeNote } from "modules/notes/analyzeNote";
import { createNote, type CreateNoteInput } from "modules/notes/createNote";

export async function createNoteAction(input: CreateNoteInput) {
  const result = createNote(input);
  const analysis = analyzeNote(input.content);

  return {
    note: result.note,
    aiTriggered: result.aiTriggered,
    analysis,
  };
}
