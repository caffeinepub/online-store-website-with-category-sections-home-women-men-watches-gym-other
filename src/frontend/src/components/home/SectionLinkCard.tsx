import { Link } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface SectionLinkCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

export default function SectionLinkCard({ title, description, image, href }: SectionLinkCardProps) {
  // Extract category from href like "/category/women" -> "women"
  const category = href.split('/').pop() || 'other';
  
  return (
    <Link to="/category/$category" params={{ category }}>
      <Card className="group overflow-hidden transition-all hover:shadow-xl">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-sm text-white/90 mb-4">{description}</p>
            <div className="flex items-center gap-2 text-sm font-medium">
              Shop Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
