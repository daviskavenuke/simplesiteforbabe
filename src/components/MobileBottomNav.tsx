'use client';

import Link from 'next/link';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { useState, useEffect } from 'react';

export function MobileBottomNav() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalWishlistItems = useWishlistStore((state) => state.getTotalWishlistItems);

  useEffect(() => {
    setCartCount(getTotalItems());
    setWishlistCount(getTotalWishlistItems());
  }, [getTotalItems, getTotalWishlistItems]);

  return (
    // Mobile bottom navigation - visible only on small screens
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
      <div className="flex justify-around items-center py-3 max-w-7xl mx-auto w-full">
        {/* Home */}
        <Link href="/" className="flex flex-col items-center gap-1 text-gray-600 hover:text-pink-500 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h3m10-11l2 3m-2-3v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs">Home</span>
        </Link>

        {/* Search */}
        <Link href="/search" className="flex flex-col items-center gap-1 text-gray-600 hover:text-pink-500 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-xs">Search</span>
        </Link>

        {/* My List / Wishlist */}
        <Link href="/wishlist" className="flex flex-col items-center gap-1 text-gray-600 hover:text-pink-500 transition relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-xs">My List</span>
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* Bag / Cart */}
        <Link href="/cart" className="flex flex-col items-center gap-1 text-gray-600 hover:text-pink-500 transition relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-xs">Bag</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
