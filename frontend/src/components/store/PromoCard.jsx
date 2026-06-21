import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { asset } from '../../data';

export default function PromoCard() {
  return (
    <aside className="relative min-h-[270px] overflow-hidden rounded-2xl bg-cyan-100 p-7">
      <div className="relative z-10 max-w-[58%]">
        <h2 className="text-3xl font-black leading-none">
          <em className="not-italic text-kakal-pink">Promoções</em>
          <br />
          da semana
        </h2>
        <span className="mt-4 grid h-[74px] w-[74px] place-items-center rounded-full bg-kakal-yellow text-center text-[11px] font-black leading-none">
          até
          <br />
          <b className="text-2xl">30%</b>
          <br />
          OFF
        </span>
        <p className="mt-4 text-xs font-semibold leading-5 text-slate-700">
          Descontos especiais em peças selecionadas!
        </p>
        <Link
          className="mt-2 inline-flex rounded-full bg-kakal-pink px-3 py-2 text-[10px] font-black text-white transition hover:bg-pink-600"
          to="/catalogo?promotion=1"
        >
          Aproveite agora
        </Link>
      </div>
      <img
        className="absolute -bottom-8 -right-6 h-60 w-60 rotate-[-5deg] rounded-3xl object-cover shadow-lg"
        src={asset('promo-kids.png')}
        alt="Peças infantis em promoção"
      />
      <Sparkles className="absolute right-5 top-5 h-6 w-6 text-kakal-yellow" />
    </aside>
  );
}
