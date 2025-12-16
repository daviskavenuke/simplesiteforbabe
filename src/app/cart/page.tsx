'use client';

import { useCartStore } from '@/lib/store';
import { generateOrderMessage, generateWhatsAppUrl } from '@/lib/whatsapp';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOrderOnWhatsApp = () => {
    const message = generateOrderMessage(items, getTotalPrice());
    const whatsappUrl = generateWhatsAppUrl(
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890',
      message
    );
    window.open(whatsappUrl, '_blank');
  };

  if (!mounted) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
          <Link href="/" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card p-4 flex gap-4">
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-200 rounded">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">TSh {item.price.toLocaleString()} each</p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-semibold">Qty:</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const qty = parseInt(e.target.value);
                        if (qty > 0) {
                          updateQuantity(item.id, qty);
                        }
                      }}
                      className="w-12 px-2 py-1 border border-gray-300 rounded"
                      min="1"
                    />
                  </div>

                  <p className="font-bold">
                    Subtotal: TSh {((item.price * item.quantity)).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 font-bold self-start"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="mb-6 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">TSh {getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Shipping:</span>
                <span className="font-semibold">Contact Seller</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-pink-500">TSh {getTotalPrice().toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleOrderOnWhatsApp}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition mb-3 flex items-center justify-center gap-2"
            >
              Order All on WhatsApp
            </button>

            <Link href="/" className="block w-full btn-secondary text-center py-3">
              Continue Shopping
            </Link>

            <button
              onClick={clearCart}
              className="w-full mt-3 text-red-500 hover:text-red-700 font-semibold"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
