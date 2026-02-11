import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useListAllProducts } from '../services/catalogQueries';
import LoadingState from '../components/feedback/LoadingState';
import ErrorState from '../components/feedback/ErrorState';
import { Category } from '../backend';

export default function DashboardPage() {
  const { data: products, isLoading, isError, error, refetch } = useListAllProducts();

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <LoadingState message="Loading dashboard data..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <ErrorState
          message={error instanceof Error ? error.message : 'Failed to load dashboard data'}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  // Compute catalog metrics
  const totalProducts = products?.length || 0;
  
  const categoryCounts = {
    women: products?.filter(p => p.category === Category.women).length || 0,
    men: products?.filter(p => p.category === Category.men).length || 0,
    watches: products?.filter(p => p.category === Category.watches).length || 0,
    gym: products?.filter(p => p.category === Category.gym).length || 0,
    other: products?.filter(p => p.category === Category.other).length || 0,
  };

  const categoryMetrics = [
    { label: 'Women', count: categoryCounts.women, category: 'women' },
    { label: 'Men', count: categoryCounts.men, category: 'men' },
    { label: 'Watches', count: categoryCounts.watches, category: 'watches' },
    { label: 'Gym', count: categoryCounts.gym, category: 'gym' },
    { label: 'Other', count: categoryCounts.other, category: 'other' },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of your product catalog</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Products Card */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
            <CardDescription>Total number of products in the catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>

        {/* Category Cards */}
        {categoryMetrics.map((metric) => (
          <Card key={metric.category}>
            <CardHeader>
              <CardTitle>{metric.label}</CardTitle>
              <CardDescription>Products in {metric.label} category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metric.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
