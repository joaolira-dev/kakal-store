import { Heart, MessageCircle, Star } from 'lucide-react';
import { asset } from '../../data';

export default function WhatsAppCard() {
  return (
    <aside className="relative min-h-[212px] overflow-hidden rounded-2xl bg-lime-100 p-8">
      <Star className="absolute right-5 top-5 h-6 w-6 text-kakal-green" />
      <div className="relative z-10 max-w-[60%]">
        <h2 className="text-3xl font-black leading-none">
          Compre pelo
          <br />
          <em className="not-italic text-kakal-green">WhatsApp</em>
        </h2>
        <p className="mt-4 text-xs font-semibold leading-5 text-slate-700">
          Atendimento rápido, prático e feito com muito carinho!
        </p>
        <a
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-kakal-green px-4 py-2.5 text-[10px] font-black text-white transition hover:bg-green-600"
          target="_blank"
          rel="noreferrer"
          href="https://wa.me/5583999999999"
        >
          <MessageCircle className="h-4 w-4" /> Chamar no WhatsApp
        </a>
      </div>
      <img
        className="absolute -bottom-4 right-5 w-36 object-contain"
        src={asset('boneca-kakal.png')}
        alt="Personagem Kakal"
      />
      <Heart className="absolute bottom-5 right-44 h-6 w-6 text-kakal-pink" />
    </aside>
  );
}
