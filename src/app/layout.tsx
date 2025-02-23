import Header from "@/components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <title>Knowledge Graph Wiki</title>
      </head>
      <body className="bg-gray-50 text-gray-800">
        <Header />
        <main className="max-w-5xl mx-auto p-8">{children}</main>
      </body>
    </html>
  );
}
