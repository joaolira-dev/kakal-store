import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import BenefitsBar from '../../components/store/BenefitsBar';
import CategoryBar from '../../components/store/CategoryBar';
import Hero from '../../components/store/Hero';
import InstagramSection from '../../components/store/InstagramSection';
import ProductGrid from '../../components/store/ProductGrid';
import PromoCard from '../../components/store/PromoCard';
import StoreFooter from '../../components/store/StoreFooter';
import StoreHeader from '../../components/store/StoreHeader';
import WhatsAppCard from '../../components/store/WhatsAppCard';
import useProducts from '../../hooks/useProducts';

function SectionTitle({ children, to = '/catalogo', icon }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-lg font-black">
        {icon}
        {children}
      </h2>
      <Link
        className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-[10px] font-black transition hover:border-kakal-pink hover:text-kakal-pink"
        to={to}
      >
        Ver todos <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

export default function Home() {
  const { products } = useProducts();
  const featured = products.filter((product) => product.featured).slice(0, 5);
  const fresh = products.filter((product) => product.new).slice(0, 5);

  return (
    <>
      <main className="relative isolate mx-auto max-w-[1440px] overflow-hidden bg-kakal-cream px-4 pt-4 font-nunito text-kakal-ink sm:px-7 lg:px-12">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-28 z-0 h-56 w-[350px] rounded-br-[90%] bg-kakal-yellow sm:-left-24 sm:-top-36 sm:h-72 sm:w-[460px]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-36 z-0 h-52 w-[350px] rounded-bl-[92%] bg-sky-400 sm:-right-32 sm:-top-44 sm:h-72 sm:w-[450px]"
        />

        <div className="relative z-10">
          <StoreHeader />
          <Hero />
          <CategoryBar />
          <div className="grid gap-4 lg:grid-cols-[1.55fr_.95fr]">
            <section className="rounded-2xl border border-slate-200 bg-white p-4">
              <SectionTitle>Destaques da semana</SectionTitle>
              <ProductGrid products={featured.length ? featured : products.slice(0, 5)} compact />
            </section>
            <PromoCard />
            <section className="rounded-2xl border border-violet-100 bg-kakal-lilac/45 p-4">
              <SectionTitle icon={<Sparkles className="h-5 w-5 text-violet-500" />}>
                Novidades
              </SectionTitle>
              <ProductGrid products={fresh.length ? fresh : products.slice(5, 10)} compact />
            </section>
            <WhatsAppCard />
          </div>
          <BenefitsBar />
          <InstagramSection />
        </div>
      </main>
      <StoreFooter />
    </>
  );
}
