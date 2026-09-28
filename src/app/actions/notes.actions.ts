"use server";

import type { Note as DbNote } from "@prisma/client";
import { db } from "infrastructure/db/prisma";

type CreateNoteActionInput = {
  title: string;
  content: string;
};

export async function createNoteAction(
  input: CreateNoteActionInput,
): Promise<DbNote> {
  return db.note.create({
    data: {
      title: input.title,
      content: input.content,
    },
  });
}
