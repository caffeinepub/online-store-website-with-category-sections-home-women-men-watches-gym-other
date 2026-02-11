import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import StoreSection from '../components/common/StoreSection';
import SectionLinkCard from '../components/home/SectionLinkCard';
import ProductGrid from '../components/catalog/ProductGrid';
import ProductCard from '../components/catalog/ProductCard';
import LoadingState from '../components/feedback/LoadingState';
import ErrorState from '../components/feedback/ErrorState';
import { useListAllProducts } from '../services/catalogQueries';

export default function HomePage() {
  const { data: products, isLoading, error, refetch } = useListAllProducts();

  const sections = [
    {
      title: "Women's Collection",
      description: 'Elegant and contemporary pieces',
      image: '/assets/generated/hero-women.dim_1600x600.png',
      href: '/category/women',
    },
    {
      title: "Men's Collection",
      description: 'Timeless style meets modern sophistication',
      image: '/assets/generated/hero-men.dim_1600x600.png',
      href: '/category/men',
    },
    {
      title: 'Watches',
      description: 'Precision craftsmanship',
      image: '/assets/generated/hero-watches.dim_1600x600.png',
      href: '/category/watches',
    },
    {
      title: 'Gym & Fitness',
      description: 'Performance gear',
      image: '/assets/generated/hero-gym.dim_1600x600.png',
      href: '/category/gym',
    },
    {
      title: 'Accessories',
      description: 'Complete your look',
      image: '/assets/generated/hero-other.dim_1600x600.png',
      href: '/category/other',
    },
  ];

  const featuredProducts = products?.slice(0, 4) || [];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-muted">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
          alt="Hero"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Your Style</h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Curated collections for the modern lifestyle
              </p>
              <Link to="/category/$category" params={{ category: 'women' }}>
                <Button size="lg" className="text-lg">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <StoreSection title="Shop by Category" description="Explore our curated collections">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.slice(0, 3).map((section) => (
            <SectionLinkCard key={section.href} {...section} />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {sections.slice(3).map((section) => (
            <SectionLinkCard key={section.href} {...section} />
          ))}
        </div>
      </StoreSection>

      {/* Featured Products */}
      <StoreSection
        title="Featured Products"
        description="Handpicked favorites from our latest collection"
        className="bg-muted/30"
      >
        {isLoading && <LoadingState message="Loading featured products..." />}
        {error && <ErrorState message="Failed to load products" onRetry={() => refetch()} />}
        {!isLoading && !error && featuredProducts.length > 0 && (
          <ProductGrid>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id.toString()} product={product} />
            ))}
          </ProductGrid>
        )}
      </StoreSection>
    </div>
  );
}
