import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { asset } from '../../data';

function CollectionCard({ boy = false }) {
  const title = boy ? 'Meninos' : 'Meninas';
  const copy = boy
    ? 'Conforto e estilo para todos os momentos!'
    : 'Peças encantadoras para brilhar!';
  const color = boy ? 'text-sky-600' : 'text-kakal-pink';
  const button = boy ? 'bg-sky-500 hover:bg-sky-600' : 'bg-kakal-pink hover:bg-pink-600';

  return (
    <article className="relative min-h-36 overflow-hidden rounded-2xl p-6 isolate">
      <img
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        src={asset(boy ? 'menino-card.png' : 'menina-card.png')}
        alt={`Coleção para ${title.toLowerCase()}`}
      />
      <div className="max-w-[58%]">
        <h2 className={`text-2xl font-black ${color}`}>{title}</h2>
        <p className="mt-1.5 text-xs font-semibold leading-5 text-slate-700">{copy}</p>
        <Link
          className={`mt-3 inline-flex rounded-full px-3 py-2 text-[10px] font-black text-white transition ${button}`}
          to={`/categoria/${boy ? 'meninos' : 'meninas'}`}
        >
          Ver coleção
        </Link>
      </div>
    </article>
  );
}

export default function Hero() {
  return (
    <section className="mt-5 grid gap-4 xl:grid-cols-[1.02fr_1.06fr_.88fr]">
      <div className="relative px-3 py-8 sm:px-4 xl:py-14">
        <span className="inline-flex rounded-full bg-kakal-yellow px-3 py-1 text-xs font-black">
          Moda infantil que encanta
        </span>
        <Sparkles className="absolute right-4 top-20 h-8 w-8 text-sky-500" />
        <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
          Estilo, conforto
          <br />e diversão para
          <br />
          <em className="not-italic text-kakal-pink">todas as aventuras!</em>
        </h1>
        <p className="mt-5 max-w-sm text-sm font-semibold leading-6 text-slate-600">
          Peças lindas e cheias de personalidade para acompanhar cada fase do seu pequeno.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="inline-flex items-center gap-2 rounded-full bg-kakal-pink px-5 py-3 text-sm font-black text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5"
            to="/catalogo"
          >
            Ver catálogo <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black shadow-sm transition hover:-translate-y-0.5"
            target="_blank"
            rel="noreferrer"
            href="https://wa.me/5583999999999"
          >
            <MessageCircle className="h-4 w-4 text-kakal-green" /> Fale no WhatsApp
          </a>
        </div>
      </div>

      <div className="relative h-[344px] overflow-hidden rounded-[20px]">
        <img
          className="h-full w-full object-cover object-[center_7%]"
          src={asset('hero-kids.png')}
          alt="Crianças felizes usando roupas Kakal"
        />
        <span className="absolute bottom-3 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white shadow-[18px_0_0_#ff7f9a,36px_0_0_white]" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        <CollectionCard />
        <CollectionCard boy />
      </div>
    </section>
  );
}
