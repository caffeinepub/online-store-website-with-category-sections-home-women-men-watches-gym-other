interface CategoryHeroProps {
  category: string;
}

const categoryConfig: Record<string, { title: string; description: string; image: string }> = {
  women: {
    title: "Women's Collection",
    description: 'Discover our curated selection of elegant and contemporary pieces',
    image: '/assets/generated/hero-women.dim_1600x600.png',
  },
  men: {
    title: "Men's Collection",
    description: 'Timeless style meets modern sophistication',
    image: '/assets/generated/hero-men.dim_1600x600.png',
  },
  watches: {
    title: 'Watches',
    description: 'Precision craftsmanship for the discerning collector',
    image: '/assets/generated/hero-watches.dim_1600x600.png',
  },
  gym: {
    title: 'Gym & Fitness',
    description: 'Performance gear for your active lifestyle',
    image: '/assets/generated/hero-gym.dim_1600x600.png',
  },
  other: {
    title: 'Accessories & More',
    description: 'Complete your look with our premium selection',
    image: '/assets/generated/hero-other.dim_1600x600.png',
  },
};

export default function CategoryHero({ category }: CategoryHeroProps) {
  const config = categoryConfig[category] || categoryConfig.other;

  return (
    <div className="relative h-64 md:h-80 overflow-hidden bg-muted">
      <img
        src={config.image}
        alt={config.title}
        className="h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=600&fit=crop';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{config.title}</h1>
          <p className="text-lg md:text-xl text-white/90">{config.description}</p>
        </div>
      </div>
    </div>
  );
}
