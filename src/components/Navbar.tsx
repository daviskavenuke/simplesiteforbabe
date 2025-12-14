'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  useEffect(() => {
    setCartCount(getTotalItems());
  }, [getTotalItems]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-pink-500">
          RK Glow
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-gray-600 hover:text-pink-500 transition">
            Products
          </Link>
          <Link href="/cart" className="relative">
            <span className="text-gray-600 hover:text-pink-500 transition">
              Cart
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/admin/login" className="btn-secondary text-sm">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
