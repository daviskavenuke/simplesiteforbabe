export default async function Home() {
  // Fetch products from JSON file via API
  const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/products`, {
    cache: 'no-store'
  });
  const products = res.ok ? await res.json() : [];

  const { ProductCard } = await import('@/components/ProductCard');

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-slideUp">
            Elevate Your Beauty
          </h1>
          <p className="text-xl mb-8 opacity-90 animate-slideUp">
            Discover premium cosmetics that enhance your natural beauty
          </p>
          <button className="bg-white text-pink-500 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-300 animate-slideUp">
            Shop Now
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Our Collection</h2>
          <p className="text-gray-600">Carefully curated products for every skin type</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only the finest cosmetic products</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Order directly via WhatsApp</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💯</div>
              <h3 className="text-xl font-bold mb-2">Satisfaction</h3>
              <p className="text-gray-600">100% customer satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
