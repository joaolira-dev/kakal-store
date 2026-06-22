import { ChevronLeft, ChevronRight, Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import StoreFooter from '../../components/store/StoreFooter';
import StoreHeader from '../../components/store/StoreHeader';
import StorePageFrame from '../../components/store/StorePageFrame';
import ProductGrid from '../../components/store/ProductGrid';
import useProducts from '../../hooks/useProducts';

const categoryOptions = [
  { label: 'Meninas', slug: 'meninas' },
  { label: 'Meninos', slug: 'meninos' },
  { label: 'Bebê', slug: 'bebe' },
  { label: 'Acessórios', slug: 'acessorios' },
];
const sizes = ['P', 'M', 'G'];
const colors = ['Coral', 'Azul', 'Amarelo', 'Jeans', 'Rosa'];
const colorBySlug = {
  'vestido-floral-encantado': ['Coral', 'Rosa'],
  'polo-listrada-aventura': ['Azul'],
  'jardineira-jeans-divertida': ['Jeans'],
  'camiseta-dino-explorador': ['Amarelo'],
  'bermuda-moletom-conforto': ['Azul'],
  'vestido-arco-iris': ['Rosa', 'Coral'],
  'conjunto-natureza': ['Verde', 'Rosa'],
  'moletom-ursinho': ['Amarelo'],
  'jaqueta-jeans': ['Jeans'],
  'calca-jogger-rosa': ['Rosa'],
};

const productPrice = (product) => Number(product.salePrice || product.price || 0);
const listValue = (value, fallback = []) => {
  const values = Array.isArray(value) ? value : String(value || '').split(',');
  const normalized = values.map((item) => item.trim()).filter(Boolean);
  return normalized.length && !normalized.includes('Colorido') ? normalized : fallback;
};

function CheckboxFilter({ checked, label, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-600">
      <input
        className="h-4 w-4 rounded border-slate-300 text-kakal-pink focus:ring-kakal-pink"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}

export default function Catalog({ fixedCategory }) {
  const [params, setSearchParams] = useSearchParams();
  const { products } = useProducts({
    category: fixedCategory,
    promotion: params.get('promotion') || undefined,
    new: params.get('new') || undefined,
  });
  const [search, setSearch] = useState(params.get('busca') || '');
  const [selectedCategories, setSelectedCategories] = useState(
    fixedCategory ? [fixedCategory] : []
  );
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const promotionOnly = params.get('promotion') === '1';
  const newOnly = params.get('new') === '1';

  useEffect(() => {
    setSelectedCategories(fixedCategory ? [fixedCategory] : []);
  }, [fixedCategory]);

  useEffect(() => {
    const next = new URLSearchParams(params);
    if (search.trim()) next.set('busca', search.trim());
    else next.delete('busca');
    setSearchParams(next, { replace: true });
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [search, selectedCategories, selectedSizes, selectedColors, priceRange, sort]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('pt-BR');
    const filtered = products.filter((product) => {
      const category = product.category?.slug || product.gender?.toLowerCase();
      const categoryMatch = !selectedCategories.length || selectedCategories.includes(category);
      const searchMatch =
        !query ||
        product.name.toLocaleLowerCase('pt-BR').includes(query) ||
        product.category?.name?.toLocaleLowerCase('pt-BR').includes(query);
      const productSizes = listValue(product.sizes, sizes);
      const productColors = listValue(product.colors, colorBySlug[product.slug] || colors);
      const sizeMatch =
        !selectedSizes.length || selectedSizes.some((size) => productSizes.includes(size));
      const colorMatch =
        !selectedColors.length || selectedColors.some((color) => productColors.includes(color));
      const price = productPrice(product);
      const priceMatch = price >= priceRange[0] && price <= priceRange[1];
      const promotionMatch = !promotionOnly || product.promotion;
      const newMatch = !newOnly || product.new;
      return (
        categoryMatch &&
        searchMatch &&
        sizeMatch &&
        colorMatch &&
        priceMatch &&
        promotionMatch &&
        newMatch
      );
    });

    return filtered.sort((first, second) => {
      if (sort === 'price-asc') return productPrice(first) - productPrice(second);
      if (sort === 'price-desc') return productPrice(second) - productPrice(first);
      if (sort === 'new') return Number(second.new) - Number(first.new);
      return Number(second.featured) - Number(first.featured);
    });
  }, [
    products,
    search,
    selectedCategories,
    selectedSizes,
    selectedColors,
    priceRange,
    sort,
    promotionOnly,
    newOnly,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const displayedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);
  const toggle = (value, values, setValues) =>
    setValues(
      values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
    );
  const clearFilters = () => {
    setSearch('');
    setSelectedCategories(fixedCategory ? [fixedCategory] : []);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 200]);
    setSort('featured');
  };
  const hasFilters =
    Boolean(search) ||
    selectedSizes.length ||
    selectedColors.length ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 200 ||
    (!fixedCategory && selectedCategories.length);

  return (
    <>
      <StorePageFrame>
        <main className="mx-auto min-h-[75vh] max-w-[1440px] bg-transparent px-4 pb-10 pt-4 font-nunito text-kakal-ink sm:bg-kakal-cream sm:px-7 lg:px-12">
          <StoreHeader />

        <div className="mb-6 mt-6 text-sm text-slate-500">
          Início / <b className="text-kakal-ink">{fixedCategory || 'Catálogo'}</b>
        </div>

        <section className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-kakal-yellow px-3 py-1 text-xs font-black">
              Peças cheias de afeto
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {fixedCategory
                ? `Coleção ${categoryOptions.find((item) => item.slug === fixedCategory)?.label || fixedCategory}`
                : 'Nosso catálogo'}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Escolha looks coloridos e confortáveis para cada aventura.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="flex h-11 min-w-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 shadow-sm sm:w-72">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar produtos..."
              />
              {search && (
                <button
                  className="text-slate-400 hover:text-kakal-pink"
                  onClick={() => setSearch('')}
                  type="button"
                  aria-label="Limpar busca"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
            <label className="flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-extrabold shadow-sm">
              <SlidersHorizontal className="h-4 w-4 text-kakal-pink" />
              <select
                className="bg-transparent outline-none"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="featured">Em destaque</option>
                <option value="new">Mais novidades</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
              </select>
            </label>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[235px_minmax(0,1fr)]">
          <aside className="h-max rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-5">
            <div className="flex items-center justify-between">
              <b className="flex items-center gap-2 text-lg">
                <Filter className="h-5 w-5 text-kakal-pink" /> Filtros
              </b>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-black text-kakal-pink hover:underline"
                  type="button"
                >
                  Limpar
                </button>
              )}
            </div>

            <div className="my-5 border-t border-slate-100" />
            <fieldset className="space-y-3">
              <legend className="mb-3 text-sm font-black">Categorias</legend>
              {!fixedCategory &&
                categoryOptions.map(({ label, slug }) => (
                  <CheckboxFilter
                    key={slug}
                    label={label}
                    checked={selectedCategories.includes(slug)}
                    onChange={() => toggle(slug, selectedCategories, setSelectedCategories)}
                  />
                ))}
              {fixedCategory && (
                <p className="rounded-lg bg-kakal-blush px-3 py-2 text-sm font-bold text-kakal-pink">
                  {categoryOptions.find((item) => item.slug === fixedCategory)?.label}
                </p>
              )}
            </fieldset>

            <div className="my-5 border-t border-slate-100" />
            <fieldset>
              <legend className="mb-3 text-sm font-black">Faixa de preço</legend>
              <div className="grid grid-cols-2 gap-2">
                <label className="text-xs font-bold text-slate-500">
                  Mínimo
                  <input
                    className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 text-sm text-kakal-ink outline-none focus:border-kakal-pink"
                    min="0"
                    max={priceRange[1]}
                    type="number"
                    value={priceRange[0]}
                    onChange={(event) =>
                      setPriceRange([
                        Math.min(Number(event.target.value), priceRange[1]),
                        priceRange[1],
                      ])
                    }
                  />
                </label>
                <label className="text-xs font-bold text-slate-500">
                  Máximo
                  <input
                    className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 text-sm text-kakal-ink outline-none focus:border-kakal-pink"
                    min={priceRange[0]}
                    max="200"
                    type="number"
                    value={priceRange[1]}
                    onChange={(event) =>
                      setPriceRange([
                        priceRange[0],
                        Math.max(Number(event.target.value), priceRange[0]),
                      ])
                    }
                  />
                </label>
              </div>
              <input
                className="mt-4 w-full accent-kakal-pink"
                min="0"
                max="200"
                type="range"
                value={priceRange[1]}
                onChange={(event) => setPriceRange([priceRange[0], Number(event.target.value)])}
              />
            </fieldset>

            <div className="my-5 border-t border-slate-100" />
            <fieldset>
              <legend className="mb-3 text-sm font-black">Tamanho</legend>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    className={`h-9 min-w-9 rounded-lg border px-3 text-xs font-black transition ${
                      selectedSizes.includes(size)
                        ? 'border-kakal-pink bg-kakal-pink text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-kakal-pink'
                    }`}
                    key={size}
                    onClick={() => toggle(size, selectedSizes, setSelectedSizes)}
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="my-5 border-t border-slate-100" />
            <fieldset>
              <legend className="mb-3 text-sm font-black">Cor</legend>
              <div className="space-y-3">
                {colors.map((color) => (
                  <CheckboxFilter
                    key={color}
                    label={color}
                    checked={selectedColors.includes(color)}
                    onChange={() => toggle(color, selectedColors, setSelectedColors)}
                  />
                ))}
              </div>
            </fieldset>
          </aside>

          <section>
            <p className="mb-4 text-sm text-slate-500">
              <b className="text-kakal-ink">{filteredProducts.length} produtos</b> encontrados
            </p>
            {displayedProducts.length ? (
              <ProductGrid products={displayedProducts} />
            ) : (
              <div className="rounded-2xl border border-dashed border-pink-200 bg-white px-6 py-20 text-center">
                <p className="text-xl font-black">Nenhuma peça encontrada.</p>
                <p className="mt-2 text-sm text-slate-500">
                  Tente retirar algum filtro ou buscar por outro termo.
                </p>
                <button
                  className="mt-5 rounded-full bg-kakal-pink px-5 py-3 text-sm font-black text-white shadow-soft"
                  onClick={clearFilters}
                  type="button"
                >
                  Limpar filtros
                </button>
              </div>
            )}

            {filteredProducts.length > pageSize && (
              <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Paginação">
                <button
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={page === 1}
                  onClick={() => setPage((current) => current - 1)}
                  type="button"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
                  <button
                    className={`grid h-10 w-10 place-items-center rounded-full text-sm font-black transition ${
                      page === item
                        ? 'bg-kakal-pink text-white shadow-soft'
                        : 'border border-slate-200 bg-white text-slate-600 hover:border-kakal-pink'
                    }`}
                    key={item}
                    onClick={() => setPage(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
                <button
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={page === totalPages}
                  onClick={() => setPage((current) => current + 1)}
                  type="button"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            )}
          </section>
        </div>
        </main>
      </StorePageFrame>
      <StoreFooter />
    </>
  );
}
