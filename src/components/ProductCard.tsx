'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [showAdded, setShowAdded] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showWishlistAdded, setShowWishlistAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const checkWishlist = useWishlistStore((state) => state.isInWishlist);

  useEffect(() => {
    setIsInWishlist(checkWishlist(product.id));
  }, [product.id, checkWishlist]);

  const handleAddToCart = () => {
    addItem(product, 1);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      setIsInWishlist(false);
    } else {
      addToWishlist(product);
      setIsInWishlist(true);
      setShowWishlistAdded(true);
      setTimeout(() => setShowWishlistAdded(false), 2000);
      
      // Track the like/wishlist action
      fetch('/api/products/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, action: 'like' }),
      }).catch(err => console.error('Failed to track like:', err));
    }
  };

  return (
    <div className="card overflow-hidden animate-fadeIn relative">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition"
      >
        <svg
          className={`w-6 h-6 transition ${
            isInWishlist ? 'fill-pink-500 text-pink-500' : 'text-gray-400'
          }`}
          viewBox="0 0 24 24"
          fill={isInWishlist ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <div className="relative h-48 bg-gray-200">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="p-4">
        <span className="badge text-xs">{product.category}</span>
        <h3 className="text-lg font-semibold mt-2 mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-pink-500">
            TSh {product.price.toLocaleString()}
          </span>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 btn-secondary text-center text-sm"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            className={`flex-1 text-sm font-semibold rounded-lg transition-all duration-300 ${
              showAdded
                ? 'bg-green-500 text-white'
                : 'btn-primary'
            }`}
          >
            {showAdded ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
