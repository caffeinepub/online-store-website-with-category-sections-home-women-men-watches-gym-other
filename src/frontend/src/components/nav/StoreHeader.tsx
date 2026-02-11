import { Link, useRouterState } from '@tanstack/react-router';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '../../cart/useCart';

export default function StoreHeader() {
  const { items } = useCart();
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Women', path: '/category/women' },
    { label: 'Men', path: '/category/men' },
    { label: 'Watches', path: '/category/watches' },
    { label: 'Gym', path: '/category/gym' },
    { label: 'Other', path: '/category/other' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/assets/generated/store-logo.dim_512x256.png" alt="Luxury Bazar Logo" className="h-8" />
          <span className="text-xl font-semibold tracking-tight">Luxury Bazar</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                isActive(link.path) ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link to="/cart">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
              >
                {totalItems}
              </Badge>
            )}
          </Button>
        </Link>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-t px-4 py-2 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-foreground/80 ${
                isActive(link.path) ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
