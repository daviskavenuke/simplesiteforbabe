import { CartItem } from '@/types';

export const generateWhatsAppMessage = (product: {
  name: string;
  price: number;
  description?: string;
}): string => {
  const message = `Hi! I'm interested in this product:\n\n📦 *${product.name}*\n💰 Price: $${product.price.toFixed(2)}\n${product.description ? `📝 ${product.description}\n` : ''}\nPlease let me know more details!`;
  return message;
};

export const generateWhatsAppUrl = (phone: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
};

export const generateOrderMessage = (items: CartItem[], total: number): string => {
  let message = `*🛍️ Order Summary*\n\n`;
  
  items.forEach((item) => {
    message += `📦 ${item.name}\n   Qty: ${item.quantity} x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}\n\n`;
  });
  
  message += `*Total: $${total.toFixed(2)}*\n\nPlease confirm this order. Thank you!`;
  
  return message;
};
