"use server";

import { revalidatePath } from "next/cache";
import db from "@/db";
import { notes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function createNote(formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  const content = formData.get("content")?.toString().trim();

  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  await db.insert(notes).values({
    title,
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath("/notes");
  redirect("/");
}

export async function updateNote(formData: FormData) {
  const idStr = formData.get("id")?.toString().trim();
  const title = formData.get("title")?.toString().trim();
  const content = formData.get("content")?.toString().trim();

  if (!idStr || !title || !content) {
    throw new Error("ID, Title ve Content alanları zorunludur.");
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
  revalidatePath("/notes");
  redirect("/");
}
