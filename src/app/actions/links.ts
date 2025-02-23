"use server";

import { revalidatePath } from "next/cache";
import db from "@/db";
import { links } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function createLink(formData: FormData) {
  const fromNoteIdStr = formData.get("fromNoteId")?.toString().trim();
  const toNoteIdStr = formData.get("toNoteId")?.toString().trim();

  if (!fromNoteIdStr || !toNoteIdStr) {
    throw new Error("Both fromNoteId and toNoteId are required.");
  }
  const fromNoteId = parseInt(fromNoteIdStr, 10);
  const toNoteId = parseInt(toNoteIdStr, 10);

  await db.insert(links).values({
    fromNoteId,
    toNoteId,
    createdAt: new Date(),
  });

  revalidatePath("/graph");
}

export async function deleteLink(formData: FormData) {
  const fromNoteIdStr = formData.get("fromNoteId")?.toString().trim();
  const toNoteIdStr = formData.get("toNoteId")?.toString().trim();

  if (!fromNoteIdStr || !toNoteIdStr) {
    throw new Error("Both fromNoteId and toNoteId are required.");
  }
  const fromNoteId = parseInt(fromNoteIdStr, 10);
  const toNoteId = parseInt(toNoteIdStr, 10);

  await db
    .delete(links)
    .where(and(eq(links.fromNoteId, fromNoteId), eq(links.toNoteId, toNoteId)));

  revalidatePath("/graph");
}
