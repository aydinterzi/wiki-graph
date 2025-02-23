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
        <Link href="/notes/create">
          <Button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
            Create Note
          </Button>
        </Link>
      </header>

      {noteList.length === 0 ? (
        <p className="text-center text-gray-600">No notes found. Create one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {noteList.map((note) => (
            <Link key={note.id} href={`/notes/${note.id}`}>
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer flex flex-col justify-between">
                <h2 className="text-xl font-semibold">{note.title}</h2>
                <p className="text-gray-500 text-sm mt-2">
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
