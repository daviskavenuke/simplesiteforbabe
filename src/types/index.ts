export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderDetails {
  items: CartItem[];
  total: number;
  sellerPhone: string;
}
