'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema } from '@/lib/validation';
import { Product } from '@/types';
import Image from 'next/image';
import { uploadImageToImgBB } from '@/lib/imgbb';

// Disable static generation for admin dashboard
export const dynamic = 'force-dynamic';

type ProductFormData = {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [apiError, setApiError] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [mostLoved, setMostLoved] = useState<Product[]>([]);
  const [mostOrdered, setMostOrdered] = useState<Product[]>([]);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      fetchProducts();
    }
  }, [status, router]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map((p: Product) => p.category)));
        setCategories(uniqueCategories as string[]);
      }

      // Fetch analytics
      const analyticsResponse = await fetch('/api/products/analytics');
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        setMostLoved(analyticsData.mostLoved);
        setMostOrdered(analyticsData.mostOrdered);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setApiError('');
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/products/${isEditing}` : '/api/products';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchProducts();
        reset();
        setImagePreview('');
        setIsEditing(null);
      } else {
        const error = await response.json();
        setApiError(error.error || 'Failed to save product');
      }
    } catch (error: any) {
      setApiError(error.message || 'Failed to save product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchProducts();
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setIsEditing(product.id);
    setValue('name', product.name);
    setValue('description', product.description);
    setValue('price', product.price);
    setValue('category', product.category);
    setValue('image', product.image);
    setImagePreview(product.image);
    setSelectedCategory(product.category);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        // Show preview immediately
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          setImagePreview(dataUrl);
        };
        reader.readAsDataURL(file);

        // Upload to ImgBB
        const imgbbUrl = await uploadImageToImgBB(file);
        setValue('image', imgbbUrl);
      } catch (error: any) {
        setApiError('Failed to upload image: ' + (error.message || 'Unknown error'));
      } finally {
        setUploading(false);
      }
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updatedCategories = [...categories, newCategory.trim()];
      setCategories(updatedCategories);
      setSelectedCategory(newCategory.trim());
      setValue('category', newCategory.trim());
      setNewCategory('');
      setShowNewCategoryInput(false);
    }
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setValue('category', category);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Image
            src="https://i.ibb.co/s9W88Z6p/Chat-GPT-Image-Dec-16-2025-03-05-07-PM.png"
            alt="RK Glow Logo"
            width={70}
            height={70}
            className="object-contain"
            priority
          />
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome, {session.user?.email}</p>
          </div>
        </div>
        </div>
        <button
          onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Analytics Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Most Loved Products */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">❤️ Most Loved</h2>
          <p className="text-sm text-gray-600 mb-4">Products with most wishlist adds</p>
          {mostLoved.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No liked products yet
            </div>
          ) : (
            <div className="space-y-3">
              {mostLoved.map((product, index) => (
                <div key={product.id} className="flex items-start justify-between border-b pb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-purple-500">#{index + 1}</span>
                      <div>
                        <h3 className="font-semibold text-sm">{product.name}</h3>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-500">{product.likes || 0}</p>
                    <p className="text-xs text-gray-600">likes</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Most Ordered Products */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">🛍️ Most Ordered</h2>
          <p className="text-sm text-gray-600 mb-4">Products ordered most via WhatsApp</p>
          {mostOrdered.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No orders yet
            </div>
          ) : (
            <div className="space-y-3">
              {mostOrdered.map((product, index) => (
                <div key={product.id} className="flex items-start justify-between border-b pb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-blue-500">#{index + 1}</span>
                      <div>
                        <h3 className="font-semibold text-sm">{product.name}</h3>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-500">{product.orders || 0}</p>
                    <p className="text-xs text-gray-600">orders</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div>
          <div className="card p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? 'Edit Product' : 'Add Product'}
            </h2>

            {apiError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Name</label>
                <input
                  placeholder="Product name"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Category</label>
                <div className="space-y-3">
                  {/* Category Buttons */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => handleSelectCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                          selectedCategory === category
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                    {/* Add Category Button */}
                    <button
                      type="button"
                      onClick={() => setShowNewCategoryInput(!showNewCategoryInput)}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition flex items-center gap-1"
                    >
                      <span className="text-lg">+</span> Add
                    </button>
                  </div>

                  {/* New Category Input */}
                  {showNewCategoryInput && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter category name"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
                      />
                      <button
                        type="button"
                        onClick={handleAddCategory}
                        className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition text-sm font-medium"
                      >
                        Add
                      </button>
                    </div>
                  )}

                  {!selectedCategory && (
                    <p className="text-red-500 text-xs">Please select or create a category</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Price (TSh)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  {...register('price', { valueAsNumber: true })}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea
                  placeholder="Product description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={uploading}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:outline-none disabled:opacity-50"
                />
                {uploading && (
                  <p className="text-sm text-blue-600 mt-1">Uploading image to ImgBB...</p>
                )}
                {imagePreview && (
                  <div className="mt-2 relative w-20 h-20">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  {isEditing ? 'Update' : 'Add'}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Products List */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Products ({products.length})</h2>

          {products.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No products yet. Add your first product!
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="card p-4 flex gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gray-200 rounded">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <p className="text-pink-500 font-bold">TSh {product.price.toLocaleString()}</p>
                  </div>

                  <div className="flex gap-2 flex-col">
                    <button
                      onClick={() => handleEdit(product)}
                      className="btn-secondary text-sm px-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white text-sm px-3 py-2 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
