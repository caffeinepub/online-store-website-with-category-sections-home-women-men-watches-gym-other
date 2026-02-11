import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ProductMeta from '../components/catalog/ProductMeta';
import LoadingState from '../components/feedback/LoadingState';
import ErrorState from '../components/feedback/ErrorState';
import { useGetProductById } from '../services/catalogQueries';
import { useCart } from '../cart/useCart';

export default function ProductDetailPage() {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const { addItem } = useCart();

  const productId = id ? BigInt(id) : BigInt(0);
  const { data: product, isLoading, error, refetch } = useGetProductById(productId);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <LoadingState message="Loading product details..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-12">
        <ErrorState message="Failed to load product details" onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Button variant="ghost" onClick={() => navigate({ to: -1 as any })} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-lg bg-muted">
          <img
            src={product.imageLink}
            alt={product.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=800&fit=crop';
            }}
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <ProductMeta
              category={product.category}
              price={product.price}
              description="Premium quality product crafted with attention to detail. Perfect for those who appreciate fine craftsmanship and timeless design."
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <Button size="lg" className="w-full" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>

          <Separator />

          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Product Details</h3>
              <ul className="space-y-1">
                <li>• High-quality materials</li>
                <li>• Expert craftsmanship</li>
                <li>• Satisfaction guaranteed</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Shipping & Returns</h3>
              <p>Free shipping on orders over $100. 30-day return policy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
