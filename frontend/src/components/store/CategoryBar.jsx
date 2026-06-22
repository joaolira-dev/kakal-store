import { Link } from 'react-router-dom';
import { categories } from '../../data';
import accessoriesIcon from '../../../assets/acessories.png';
import clothesIcon from '../../../assets/clothes.png';
import dressIcon from '../../../assets/dress.png';
import jeansIcon from '../../../assets/jeans.png';
import shortsIcon from '../../../assets/shorts.png';
import tshirtIcon from '../../../assets/tshirt.png';

const categoryImages = {
  Vestidos: dressIcon,
  Conjuntos: clothesIcon,
  Blusas: tshirtIcon,
  Calças: jeansIcon,
  Shorts: shortsIcon,
  Acessórios: accessoriesIcon,
};

export default function CategoryBar() {
  return (
    <section className="my-5 grid grid-cols-3 gap-y-4 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-6">
      {categories
        .filter(([name]) => categoryImages[name])
        .map(([name, _icon, slug, color]) => {
          return (
            <Link
              className="group text-center text-[11px] font-black"
              key={name}
              to={`/categoria/${slug}`}
            >
              <span
                className="mx-auto mb-1.5 grid h-14 w-14 place-items-center rounded-full transition group-hover:-translate-y-1 group-hover:shadow-md"
                style={{ background: color }}
              >
                <img
                  className="h-11 w-11 object-contain transition group-hover:scale-110"
                  src={categoryImages[name]}
                  alt=""
                />
              </span>
              {name}
            </Link>
          );
        })}
    </section>
  );
}
