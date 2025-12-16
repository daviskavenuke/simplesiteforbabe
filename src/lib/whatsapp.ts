import { CartItem } from '@/types';

export const generateWhatsAppMessage = (product: {
  name: string;
  price: number;
  description?: string;
}): string => {
  const message = `Hi! I'm interested in this product:\n\n📦 *${product.name}*\n💰 Price: TSh ${product.price.toLocaleString()}\n${product.description ? `📝 ${product.description}\n` : ''}\nPlease let me know more details!`;
  return message;
};

export const generateWhatsAppUrl = (phone: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
};

export const generateOrderMessage = (items: CartItem[], total: number): string => {
  let message = `*🛍️ Order Summary*\n\n`;
  
  items.forEach((item) => {
    message += `📦 ${item.name}\n   Qty: ${item.quantity} x TSh ${item.price.toLocaleString()} = TSh ${(item.quantity * item.price).toLocaleString()}\n\n`;
  });
  
  message += `*Total: TSh ${total.toLocaleString()}*\n\nPlease confirm this order. Thank you!`;
  
  return message;
};
