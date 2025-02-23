"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black text-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-3xl font-extrabold tracking-tight">
          Knowledge Graph Wiki
        </Link>
        <nav className="flex space-x-8">
          <Link
            href="/"
            className="text-lg font-medium hover:text-gray-300 transition-colors"
          >
            Notes
          </Link>
          <Link
            href="/notes/create"
            className="text-lg font-medium hover:text-gray-300 transition-colors"
          >
            Create Note
          </Link>
          <Link
            href="/graph"
            className="text-lg font-medium hover:text-gray-300 transition-colors"
          >
            Graph
          </Link>
        </nav>
      </div>
    </header>
  );
}
