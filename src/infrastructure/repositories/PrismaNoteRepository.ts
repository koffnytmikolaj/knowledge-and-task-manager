import type { Note as PrismaNote, PrismaClient } from "@prisma/client";
import type { Note } from "domain/note/Note";
import type { NewNote, NoteRepository } from "modules/notes/NoteRepository";
import { prisma } from "../db/client";

function toDomainNote(record: PrismaNote): Note {
  return {
    id: record.id,
    title: record.title,
    content: record.content,
    ...(record.projectId === null ? {} : { projectId: record.projectId }),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

export class PrismaNoteRepository implements NoteRepository {
  constructor(
    private readonly client: Pick<PrismaClient, "note"> = prisma,
  ) {}

  async create(note: NewNote): Promise<Note> {
    const record = await this.client.note.create({
      data: {
        title: note.title,
        content: note.content,
        ...(note.projectId === undefined ? {} : { projectId: note.projectId }),
      },
    });

    return toDomainNote(record);
  }

  async findById(id: string): Promise<Note | null> {
    const record = await this.client.note.findUnique({ where: { id } });
    return record === null ? null : toDomainNote(record);
  }

  async findAll(): Promise<Note[]> {
    const records = await this.client.note.findMany({
      orderBy: { createdAt: "desc" },
    });
    return records.map(toDomainNote);
  }
}
