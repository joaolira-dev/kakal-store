import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { asset } from '../../data';

const money = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const toneBySlug = {
  'vestido-floral-encantado': 'object-[10%_13%]',
  'polo-listrada-aventura': 'object-[85%_13%]',
  'jardineira-jeans-divertida': 'object-[48%_50%]',
  'camiseta-dino-explorador': 'object-[10%_83%]',
  'bermuda-moletom-conforto': 'object-[82%_82%]',
  'vestido-arco-iris': 'object-[10%_13%]',
  'conjunto-natureza': 'object-[85%_13%]',
  'moletom-ursinho': 'object-[10%_83%]',
  'jaqueta-jeans': 'object-[48%_50%]',
  'calca-jogger-rosa': 'object-[82%_82%]',
};

export default function ProductCard({ product, compact = false }) {
  const price = product.salePrice || product.price;
  const crop = toneBySlug[product.slug] || 'object-[10%_13%]';

  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-soft">
      <Link
        className={`relative block overflow-hidden bg-orange-50 ${compact ? 'h-36' : 'h-52'}`}
        to={`/produto/${product.slug}`}
      >
        <img
          className={`h-full w-full object-cover transition duration-300 group-hover:scale-105 ${crop}`}
          src={product.image?.startsWith('http') ? product.image : asset('colecao-produtos.png')}
          alt={product.name}
        />
        {product.new && (
          <span className="absolute left-2 top-2 rounded-md bg-sky-500 px-2 py-1 text-[10px] font-black text-white">
            Novo
          </span>
        )}
        {product.promotion && (
          <span className="absolute left-2 top-2 rounded-md bg-kakal-pink px-2 py-1 text-[10px] font-black text-white">
            Promo
          </span>
        )}
        <button
          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white text-slate-400 shadow-sm transition hover:text-kakal-pink"
          onClick={(event) => event.preventDefault()}
          aria-label="Favoritar"
        >
          <Heart className="h-4 w-4" />
        </button>
      </Link>
      <div className={`${compact ? 'space-y-1 p-2' : 'space-y-1.5 p-3'}`}>
        <Link
          className={`block min-h-9 font-extrabold leading-snug text-kakal-ink hover:text-kakal-pink ${
            compact ? 'text-[11px]' : 'text-sm'
          }`}
          to={`/produto/${product.slug}`}
        >
          {product.name}
        </Link>
        <div className="flex flex-wrap items-baseline gap-x-2">
          <strong className={compact ? 'text-sm' : 'text-base'}>{money(price)}</strong>
          {product.salePrice && (
            <del className="text-[10px] text-slate-400">{money(product.price)}</del>
          )}
        </div>
        <small className="block text-[9px] font-semibold text-slate-500">
          6x de {money(price / 6)} sem juros
        </small>
      </div>
    </article>
  );
}
