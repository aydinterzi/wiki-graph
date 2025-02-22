import Link from "next/link";
import db from "@/db";
import { notes } from "@/db/schema";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const noteList = await db.select().from(notes);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <Button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
          <Link href="/notes/create">Create Note</Link>
        </Button>
      </header>

      {noteList.length === 0 ? (
        <p className="text-center text-gray-600">No notes found. Create one!</p>
      ) : (
        <div className="space-y-4">
          {noteList.map((note) => (
            <Link key={note.id} href={`/notes/${note.id}`}>
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                <h2 className="text-xl font-semibold">{note.title}</h2>
                <p className="text-gray-500 text-sm">
                  {note.content.length > 100
                    ? note.content.substring(0, 100) + "..."
                    : note.content}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
