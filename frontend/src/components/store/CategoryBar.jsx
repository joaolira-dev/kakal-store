import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../../data';

export default function CategoryBar() {
  return (
    <section className="my-5 grid grid-cols-4 gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-8">
      {categories.map(([name, icon, slug, color]) => {
        const Icon = Icons[icon] || Icons.Sparkles;
        return (
          <Link
            className="group text-center text-[11px] font-black"
            key={name}
            to={`/categoria/${slug}`}
          >
            <span
              className="mx-auto mb-1.5 grid h-12 w-12 place-items-center rounded-full text-slate-700 transition group-hover:-translate-y-1 group-hover:shadow-md"
              style={{ background: color }}
            >
              <Icon className="h-6 w-6 stroke-[1.7]" />
            </span>
            {name}
          </Link>
        );
      })}
    </section>
  );
}
