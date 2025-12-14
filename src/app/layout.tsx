import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'TSUK - Premium Cosmetics',
  description: 'Discover premium cosmetics products. Shop now!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4">TSUK</h3>
                <p className="text-gray-400">Premium cosmetics for everyone.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="text-gray-400 space-y-2">
                  <li><a href="/" className="hover:text-white">Home</a></li>
                  <li><a href="/cart" className="hover:text-white">Cart</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <p className="text-gray-400">Email: support@tsuk.com</p>
                <p className="text-gray-400">WhatsApp: {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}</p>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-center text-gray-400">© 2024 TSUK. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
