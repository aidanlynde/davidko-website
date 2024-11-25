import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Professional Website',
  description: 'A modern professional website.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}

