import { Badge } from '@/components/ui/badge';
import { Category } from '../../backend';

interface ProductMetaProps {
  category: Category;
  price: bigint;
  description?: string;
}

const categoryLabels: Record<Category, string> = {
  [Category.women]: 'Women',
  [Category.men]: 'Men',
  [Category.watches]: 'Watches',
  [Category.gym]: 'Gym',
  [Category.other]: 'Other',
};

export default function ProductMeta({ category, price, description }: ProductMetaProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge variant="secondary">{categoryLabels[category]}</Badge>
      </div>
      <div className="text-3xl font-bold">${price.toString()}</div>
      {description && (
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}
