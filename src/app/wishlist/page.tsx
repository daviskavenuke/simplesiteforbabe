'use client';

import { useWishlistStore } from '@/lib/store';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  const items = useWishlistStore((state) => state.items);

  useEffect(() => {
    setIsClient(true);
    setWishlistItems(items);
  }, [items]);

  if (!isClient) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold">My List</h1>
          <p className="text-pink-100 mt-2">Your saved favorite products</p>
        </div>
      </section>

      {/* Wishlist Items */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your list is empty</h2>
            <p className="text-gray-600 mb-6">Start adding products to your wishlist!</p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Saved Items ({wishlistItems.length})</h2>
              <p className="text-gray-600">You have {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your list</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
