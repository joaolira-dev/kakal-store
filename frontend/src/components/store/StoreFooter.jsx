import { Facebook, Instagram, MapPin, MessageCircle, Music2, Send } from 'lucide-react';
import { asset } from '../../data';

const footerGroups = [
  ['Institucional', ['Sobre nós', 'Trocas e Devoluções', 'Política de Privacidade', 'Contato']],
  ['Categorias', ['Meninas', 'Meninos', 'Bebês', 'Acessórios']],
  ['Ajuda', ['Como comprar', 'Formas de pagamento', 'Prazos de entrega', 'Perguntas frequentes']],
];

export default function StoreFooter() {
  return (
    <footer className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 border-t-2 border-yellow-200 bg-[#fffdf8] px-6 py-12 font-nunito text-sm sm:grid-cols-3 lg:grid-cols-[1.7fr_repeat(4,1fr)] lg:px-16">
      <div className="col-span-2 flex gap-3 sm:col-span-1 lg:col-span-1">
        <img
          className="h-12 w-12 rounded-full bg-kakal-yellow object-cover object-[46%_29%]"
          src={asset('logo-kakal.png')}
          alt="Kakal Kids Store"
        />
        <div>
          <b className="text-sm">Kakal Kids Store</b>
          <p className="my-1.5 max-w-48 text-xs leading-5 text-slate-500">
            Moda infantil com amor e carinho para o seu pequeno.
          </p>
          <span className="flex gap-2 text-kakal-pink">
            <Instagram className="h-4 w-4" />
            <Facebook className="h-4 w-4" />
            <Music2 className="h-4 w-4" />
          </span>
        </div>
      </div>

      {footerGroups.map(([title, items]) => (
        <div className="flex flex-col gap-2 text-xs" key={title}>
          <b className="mb-1 text-sm">{title}</b>
          {items.map((item) => (
            <a className="text-slate-500 hover:text-kakal-pink" key={item} href="#">
              {item}
            </a>
          ))}
        </div>
      ))}

      <div className="flex flex-col gap-2 text-xs">
        <b className="mb-1 text-sm">Atendimento</b>
        <a
          className="flex items-center gap-1.5 text-slate-500 hover:text-kakal-pink"
          href="https://wa.me/5583999999999"
        >
          <MessageCircle className="h-3.5 w-3.5 text-kakal-green" /> (83) 99999-9999
        </a>
        <a
          className="flex items-center gap-1.5 text-slate-500 hover:text-kakal-pink"
          href="mailto:atendimento@kakalkids.com.br"
        >
          <Send className="h-3.5 w-3.5 text-kakal-green" /> atendimento@kakalkids.com.br
        </a>
        <span className="flex items-center gap-1.5 text-slate-500">
          <MapPin className="h-3.5 w-3.5 text-kakal-green" /> João Pessoa - PB
        </span>
      </div>

      <small className="col-span-full mt-4 text-center text-[11px] text-slate-400">
        © 2026 Kakal Kids Store - Todos os direitos reservados.
      </small>
    </footer>
  );
}
