'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';
import { generateOrderMessage, generateWhatsAppUrl } from '@/lib/whatsapp';
import { Product } from '@/types';

interface ProductDetailsProps {
  productId: string;
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showAdded, setShowAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setShowAdded(true);
      setTimeout(() => setShowAdded(false), 2000);
    }
  };

  const handleOrderOnWhatsApp = () => {
    if (product) {
      const message = `Hi! I'm interested in:\n\n📦 *${product.name}*\n💰 Price: $${product.price.toFixed(2)}\nQuantity: ${quantity}\n\nPlease let me know more details!`;
      const whatsappUrl = generateWhatsAppUrl(
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890',
        message
      );
      window.open(whatsappUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-gray-500">Product not found</div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Image */}
      <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image Available
          </div>
        )}
      </div>

      {/* Details */}
      <div>
        <span className="badge">{product.category}</span>
        <h1 className="text-4xl font-bold mt-4 mb-2">{product.name}</h1>
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-4xl font-bold text-pink-500">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Quantity Selector */}
        <div className="mb-6 flex items-center gap-4">
          <label htmlFor="quantity" className="font-semibold">
            Quantity:
          </label>
          <div className="flex items-center border border-gray-300 rounded">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 hover:bg-gray-100 transition"
            >
              −
            </button>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 text-center border-none outline-none"
              min="1"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 hover:bg-gray-100 transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-3 rounded-lg font-bold transition-all duration-300 ${
              showAdded
                ? 'bg-green-500 text-white'
                : 'btn-primary'
            }`}
          >
            {showAdded ? '✓ Added to Cart' : 'Add to Cart'}
          </button>
          <button
            onClick={handleOrderOnWhatsApp}
            className="flex-1 bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            📱 Order on WhatsApp
          </button>
        </div>

        {/* Additional Info */}
        <div className="border-t pt-6 text-sm text-gray-600">
          <p>✓ Quality Guaranteed</p>
          <p>✓ Fast Delivery Available</p>
          <p>✓ Customer Support via WhatsApp</p>
        </div>
      </div>
    </div>
  );
}
