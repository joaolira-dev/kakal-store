import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { asset } from '../../data';
import { useCart } from '../../hooks/useCart';

const links = [
  { label: 'Início', to: '/', end: true },
  { label: 'Catálogo', to: '/catalogo', search: '' },
  { label: 'Meninas', to: '/categoria/meninas' },
  { label: 'Meninos', to: '/categoria/meninos' },
  { label: 'Promoções', to: '/catalogo?promotion=1', search: '?promotion=1' },
  { label: 'Novidades', to: '/catalogo?new=1', search: '?new=1' },
];

export default function StoreHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="relative z-30 flex h-[74px] items-center gap-3 rounded-[19px] bg-white px-4 shadow-soft lg:gap-7 lg:px-5">
      <Link className="flex min-w-0 items-center gap-2.5 lg:min-w-[190px]" to="/">
        <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-yellow-300 bg-kakal-yellow">
          <img
            className="h-full w-full scale-125 object-cover object-[46%_29%]"
            src={asset('logo-kakal.png')}
            alt="Kakal Kids Store"
          />
        </span>
        <span className="min-w-0">
          <b className="block truncate text-sm lg:text-base">Kakal Kids Store</b>
          <small className="block text-[10px] text-slate-500 lg:text-[11px]">
            João Pessoa • PB
          </small>
        </span>
      </Link>

      <nav
        className={`${
          open
            ? 'absolute left-0 right-0 top-[68px] flex flex-col rounded-2xl bg-white p-3 shadow-soft'
            : 'hidden'
        } flex-1 lg:static lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-1 lg:bg-transparent lg:p-0 lg:shadow-none`}
      >
        {links.map(({ label, to, search, end }) => (
          <NavLink
            className={({ isActive }) => {
              const active = isActive && (search === undefined || location.search === search);

              return `rounded-full px-3 py-2 text-center text-xs font-black transition hover:text-kakal-pink ${
                active
                  ? 'bg-kakal-pink text-white shadow-md shadow-pink-200 hover:text-white'
                  : 'text-slate-700'
              }`;
            }}
            key={label}
            to={to}
            end={end}
            onClick={() => setOpen(false)}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2 text-slate-800">
        <button
          className="hidden p-1 transition hover:text-kakal-pink sm:block"
          aria-label="Buscar"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          className="hidden p-1 transition hover:text-kakal-pink sm:block"
          aria-label="Favoritos"
        >
          <Heart className="h-5 w-5" />
        </button>
        <Link
          className="relative grid p-1 transition hover:text-kakal-pink"
          aria-label="Carrinho"
          to="/carrinho"
        >
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <i className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-kakal-pink text-[9px] font-black not-italic text-white">
              {count}
            </i>
          )}
        </Link>
        <button
          className="grid p-1 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Abrir menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
