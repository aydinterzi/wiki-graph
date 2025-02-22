import Link from "next/link";
import { notFound } from "next/navigation";
import db from "@/db";
import { notes } from "@/db/schema";
import { updateNote } from "@/app/actions/notes";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";

interface NoteDetailPageProps {
  params: {
    id: string;
  };
}

export default async function NoteDetailPage({ params }: NoteDetailPageProps) {
  const { id: noteId } = await params;
  const note = await db
    .select()
    .from(notes)
    .where(eq(notes.id, noteId))
    .then((res) => res[0]);

  if (!note) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <header className="mb-6">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Back to Notes
        </Link>
      </header>
      <h1 className="text-3xl font-bold mb-4">Edit Note</h1>
      <form action={updateNote} className="space-y-6">
        <input type="hidden" name="id" value={note.id} />
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={note.title}
            placeholder="Enter note title"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            defaultValue={note.content}
            placeholder="Edit your note in markdown..."
            rows={10}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <div className="text-center">
          <Button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Update Note
          </Button>
        </div>
      </form>
    </div>
  );
}
