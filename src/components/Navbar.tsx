'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { useState, useEffect } from 'react';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalWishlistItems = useWishlistStore((state) => state.getTotalWishlistItems);

  useEffect(() => {
    setCartCount(getTotalItems());
    setWishlistCount(getTotalWishlistItems());
  }, [getTotalItems, getTotalWishlistItems]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    // Desktop navigation - hidden on mobile
    <nav className="hidden md:block bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="flex items-center">
            <Image
              src="https://i.ibb.co/s9W88Z6p/Chat-GPT-Image-Dec-16-2025-03-05-07-PM.png"
              alt="RK Glow Logo"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-gray-600 hover:text-pink-500 transition">
              Products
            </Link>
            <Link href="/wishlist" className="relative">
              <span className="text-gray-600 hover:text-pink-500 transition">
                My List
              </span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
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
        
        {/* Search Bar */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition"
          />
          <button className="ml-2 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
}
