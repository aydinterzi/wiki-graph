"use server";

import { revalidatePath } from "next/cache";
import db from "@/db";
import { notes, links } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createNote(formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const linksField = formData.get("links")?.toString().trim();

  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  const result = await db
    .insert(notes)
    .values({
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning({ id: notes.id });

  const noteId = result[0].id;

  if (linksField) {
    const targetIds = linksField
      .split(",")
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !isNaN(id));

    for (const toNoteId of targetIds) {
      await db.insert(links).values({
        fromNoteId: noteId,
        toNoteId,
        createdAt: new Date(),
      });
    }
  }

  revalidatePath("/notes");
}

export async function updateNote(formData: FormData) {
  const idStr = formData.get("id")?.toString().trim();
  const title = formData.get("title")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const linksField = formData.get("links")?.toString().trim();

  if (!idStr || !title || !content) {
    throw new Error("ID, Title and Content are required.");
  }
  const id = parseInt(idStr, 10);

  await db
    .update(notes)
    .set({
      title,
      content,
      updatedAt: new Date(),
    })
    .where(eq(notes.id, id));

  await db.delete(links).where(eq(links.fromNoteId, id));

  if (linksField) {
    const targetIds = linksField
      .split(",")
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !isNaN(id));
    for (const toNoteId of targetIds) {
      await db.insert(links).values({
        fromNoteId: id,
        toNoteId,
        createdAt: new Date(),
      });
    }
  }

  revalidatePath("/");
}
