'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCartStore } from '@/lib/store';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [showAdded, setShowAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, 1);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  return (
    <div className="card overflow-hidden animate-fadeIn">
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
            ${product.price.toFixed(2)}
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
