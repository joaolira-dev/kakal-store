import { Heart, Plus, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import api from '../../services/api';
const palette = ['#ffe8ef', '#e5f7fc', '#f4efff', '#fff4d5', '#ecfdf3'];
export default function AdminCategories() {
  const [categories, setCategories] = useState([]),
    [open, setOpen] = useState(false),
    [form, setForm] = useState({ name: '', color: '#ffe8ef', icon: 'Heart' });
  const load = () =>
    api
      .get('/categories')
      .then(({ data }) => setCategories(data))
      .catch(() =>
        setCategories([
          {
            id: 1,
            name: 'Meninas',
            slug: 'meninas',
            color: '#ffe8ef',
            icon: 'Heart',
            active: true,
          },
          {
            id: 2,
            name: 'Meninos',
            slug: 'meninos',
            color: '#e5f7fc',
            icon: 'Sparkles',
            active: true,
          },
          { id: 3, name: 'Bebê', slug: 'bebe', color: '#f4efff', icon: 'Baby', active: true },
        ])
      );
  useEffect(load, []);
  async function save(e) {
    e.preventDefault();
    try {
      await api.post('/categories', form);
      setOpen(false);
      load();
    } catch {
      alert('Inicie o backend para salvar a categoria.');
    }
  }
  return (
    <AdminLayout
      title="Categorias"
      action={
        <button className="btn btn-primary admin-action" onClick={() => setOpen(true)}>
          <Plus /> Nova categoria
        </button>
      }
    >
      <section className="category-admin-grid">
        {categories.map((category) => (
          <article className="admin-card category-admin-card" key={category.id}>
            <span style={{ background: category.color }}>
              <Tag />
            </span>
            <h2>{category.name}</h2>
            <p>/{category.slug}</p>
            <small className={category.active ? 'active' : 'inactive'}>
              {category.active ? '● Ativa' : '● Inativa'}
            </small>
          </article>
        ))}
      </section>
      <Modal open={open} onClose={() => setOpen(false)} title="Nova categoria">
        <form className="stack-form" onSubmit={save}>
          <Input
            label="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <label className="field">
            <span>Cor</span>
            <div className="palette">
              {palette.map((color) => (
                <button
                  type="button"
                  key={color}
                  style={{ background: color }}
                  className={form.color === color ? 'selected' : ''}
                  onClick={() => setForm({ ...form, color })}
                />
              ))}
            </div>
          </label>
          <button className="btn btn-primary">
            <Heart /> Criar categoria
          </button>
        </form>
      </Modal>
    </AdminLayout>
  );
}
