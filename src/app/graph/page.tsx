import GraphVisualization from "@/components/GraphVisualization";
import db from "@/db";
import { notes, links } from "@/db/schema";

export default async function GraphPage() {
  const noteList = await db.select().from(notes);
  const linkList = await db.select().from(links);

  const nodes = noteList.map((note) => ({
    id: note.id.toString(),
    title: note.title,
  }));

  const graphLinks = linkList.map((link) => ({
    source: link.fromNoteId.toString(),
    target: link.toNoteId.toString(),
  }));

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Knowledge Graph</h1>
      <GraphVisualization
        nodes={nodes}
        links={graphLinks}
        availableNotes={noteList}
      />
    </div>
  );
}
