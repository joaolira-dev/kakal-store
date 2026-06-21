import { CreditCard, Headphones, LockKeyhole, RefreshCw, Truck } from 'lucide-react';

const benefits = [
  [Truck, 'Frete rápido', 'Para todo o Brasil', 'text-kakal-pink'],
  [RefreshCw, 'Troca fácil', 'Até 7 dias', 'text-yellow-500'],
  [LockKeyhole, 'Compra segura', 'Seus dados protegidos', 'text-kakal-green'],
  [CreditCard, 'Parcelamento', 'Até 6x sem juros', 'text-kakal-pink'],
  [Headphones, 'Atendimento', 'Via WhatsApp', 'text-kakal-green'],
];

export default function BenefitsBar() {
  return (
    <section className="my-5 grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2 lg:grid-cols-5">
      {benefits.map(([Icon, title, text, color]) => (
        <div className="flex items-center gap-3 lg:justify-center" key={title}>
          <Icon className={`h-6 w-6 ${color}`} />
          <span>
            <b className="block text-xs">{title}</b>
            <small className="block text-[10px] text-slate-500">{text}</small>
          </span>
        </div>
      ))}
    </section>
  );
}
