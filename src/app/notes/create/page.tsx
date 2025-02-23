import CreateNoteForm from "@/components/CreateNoteForm";
import db from "@/db";
import { notes } from "@/db/schema";

export default async function CreateNotePage() {
  const availableNotes = await db.select().from(notes);
  return <CreateNoteForm availableNotes={availableNotes} />;
}
