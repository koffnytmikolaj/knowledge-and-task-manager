"use server";

import type { Note } from "domain/note/Note";
import { PrismaNoteRepository } from "infrastructure/repositories/PrismaNoteRepository";
import { createNote } from "modules/notes/createNote";

const noteRepository = new PrismaNoteRepository();

type CreateNoteActionInput = {
  title: string;
  content: string;
  projectId?: string;
};

export async function createNoteAction(
  input: CreateNoteActionInput,
): Promise<Note> {
  const result = await createNote(input, noteRepository);
  return result.note;
}
