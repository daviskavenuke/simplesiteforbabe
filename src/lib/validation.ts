import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000),
  price: z.coerce.number().positive('Price must be greater than 0'),
  category: z.string().min(2, 'Category is required'),
  image: z.string().url('Image must be a valid URL').optional().or(z.literal('')),
});

export const AdminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type ProductFormData = z.infer<typeof ProductSchema>;
export type AdminLoginData = z.infer<typeof AdminLoginSchema>;
