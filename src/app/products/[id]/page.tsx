import { ProductDetails } from '@/components/ProductDetails';

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <ProductDetails productId={params.id} />
    </div>
  );
}
