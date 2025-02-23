"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createNote } from "@/app/actions/notes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Note {
  id: number;
  title: string;
}

interface CreateNoteFormProps {
  availableNotes: Note[];
}

export default function CreateNoteForm({
  availableNotes,
}: CreateNoteFormProps) {
  const { pending } = useFormStatus();
  const [selectedLinks, setSelectedLinks] = useState<number[]>([]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selected: number[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(Number(options[i].value));
      }
    }
    setSelectedLinks(selected);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Create a New Note</h1>
      <form action={createNote} className="space-y-6">
        <div>
          <Label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Enter note title"
            className="w-full"
            required
          />
        </div>
        <div>
          <Label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content
          </Label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your note in markdown..."
            rows={8}
            className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <div>
          <Label
            htmlFor="links"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Link to Existing Notes
          </Label>
          <select
            id="links"
            name="links"
            multiple
            onChange={handleSelectChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {availableNotes.map((note) => (
              <option key={note.id} value={note.id}>
                {note.title}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Hold Ctrl (or Cmd on Mac) to select multiple notes.
          </p>
          <input type="hidden" name="links" value={selectedLinks.join(",")} />
        </div>
        <div className="text-center">
          <Button type="submit" disabled={pending}>
            {pending ? "Creating..." : "Create Note"}
          </Button>
        </div>
      </form>
    </div>
  );
}
