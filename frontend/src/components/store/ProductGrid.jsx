import ProductCard from './ProductCard';

export default function ProductGrid({ products, compact = false }) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4 ${
        compact ? 'xl:grid-cols-5' : 'xl:grid-cols-4'
      }`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} compact={compact} />
      ))}
    </div>
  );
}
