import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'RapidRescue',
  description: 'Real-Time Emergency Help Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <header className="bg-red-600 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">🚨 RapidRescue</h1>
          <nav className="space-x-4">
            <Link href="/emergency" className="hover:underline">
              Emergency
            </Link>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link href="/map" className="hover:underline">
              Map
            </Link>
          </nav>
        </header>
        <main className="p-4">{children}</main>
        <footer className="bg-gray-200 text-center p-2 mt-4">
          &copy; {new Date().getFullYear()} RapidRescue
        </footer>
      </body>
    </html>
  );
}