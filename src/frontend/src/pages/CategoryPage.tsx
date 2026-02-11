import { useParams } from '@tanstack/react-router';
import CategoryHero from '../components/catalog/CategoryHero';
import ProductGrid from '../components/catalog/ProductGrid';
import ProductCard from '../components/catalog/ProductCard';
import StoreSection from '../components/common/StoreSection';
import LoadingState from '../components/feedback/LoadingState';
import ErrorState from '../components/feedback/ErrorState';
import { useFilterProductsByCategory } from '../services/catalogQueries';
import { Category } from '../backend';

export default function CategoryPage() {
  const { category } = useParams({ strict: false });
  const categoryKey = category as keyof typeof Category;
  const categoryEnum = Category[categoryKey];

  const { data: products, isLoading, error, refetch } = useFilterProductsByCategory(categoryEnum);

  return (
    <div>
      <CategoryHero category={category || 'other'} />
      <StoreSection>
        {isLoading && <LoadingState message="Loading products..." />}
        {error && <ErrorState message="Failed to load products" onRetry={() => refetch()} />}
        {!isLoading && !error && products && products.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No products found in this category.
          </div>
        )}
        {!isLoading && !error && products && products.length > 0 && (
          <ProductGrid>
            {products.map((product) => (
              <ProductCard key={product.id.toString()} product={product} />
            ))}
          </ProductGrid>
        )}
      </StoreSection>
    </div>
  );
}
