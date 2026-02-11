import { ReactNode } from 'react';

interface StoreSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function StoreSection({ title, description, children, className = '' }: StoreSectionProps) {
  return (
    <section className={`py-12 ${className}`}>
      <div className="container">
        {(title || description) && (
          <div className="mb-8 text-center">
            {title && <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>}
            {description && <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
