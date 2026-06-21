import { Heart, Instagram } from 'lucide-react';
import { asset } from '../../data';

const posts = [
  'instagram-1.png',
  'instagram-2.png',
  'instagram-3.png',
  'hero-kids.png',
  'promo-kids.png',
  'menina-card.png',
  'menino-card.png',
];
const positions = [
  'object-center',
  'object-top',
  'object-center',
  'object-top',
  'object-center',
  'object-right',
  'object-right',
];

export default function InstagramSection() {
  return (
    <section className="mx-2 mb-9 mt-6">
      <h2 className="flex items-center gap-2 text-lg font-black">
        Inspire-se no nosso Instagram <Heart className="h-5 w-5 fill-kakal-blush text-kakal-pink" />
      </h2>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-[repeat(7,minmax(0,1fr))_1.6fr]">
        {posts.map((post, index) => (
          <img
            className={`h-24 w-full rounded-xl object-cover transition duration-200 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-soft ${positions[index]}`}
            key={post}
            src={asset(post)}
            alt="Inspiração Kakal Kids"
          />
        ))}
        <a
          className="col-span-full self-center text-center text-xs font-black text-kakal-pink lg:col-span-1"
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
        >
          <Instagram className="mr-1 inline h-4 w-4 align-text-bottom" /> Seguir no Instagram
          <b className="mt-2 block text-sm text-kakal-ink">@kakalkidsstore</b>
        </a>
      </div>
    </section>
  );
}
