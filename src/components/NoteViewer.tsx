"use client";

import { createLink } from "@/app/actions/links";
import Link from "next/link";
import { useState } from "react";

interface Note {
  id: number;
  title: string;
}

interface NoteViewerProps {
  noteId: string;
  noteTitle: string;
  availableNotes: Note[];
}

export default function NoteViewer({
  noteId,
  noteTitle,
  availableNotes,
}: NoteViewerProps) {
  const [selectedLink, setSelectedLink] = useState<number | "">("");

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">{noteTitle}</h3>
      <p className="text-sm text-gray-600 mb-4">
        View details or update this note.
      </p>
      <Link href={`/notes/${noteId}`}>
        <button className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition mb-4">
          Open Note
        </button>
      </Link>
      <div className="mt-4">
        <h4 className="text-md font-semibold mb-2">
          Link this note to another:
        </h4>
        <form action={createLink} className="flex items-center space-x-2">
          <input type="hidden" name="fromNoteId" value={noteId} />
          <select
            name="toNoteId"
            value={selectedLink}
            onChange={(e) => setSelectedLink(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select a note</option>
            {availableNotes.map((note) => (
              <option key={note.id} value={note.id}>
                {note.title}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition"
          >
            Add Link
          </button>
        </form>
      </div>
    </div>
  );
}
