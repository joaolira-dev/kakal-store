import { ArrowLeft, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import api from '../../services/api';
const initial = {
  name: '',
  price: '',
  salePrice: '',
  stock: '0',
  minStock: '3',
  sizes: '2,4,6,8,10',
  colors: 'Coral, Azul',
  gender: 'Unissex',
  description: '',
  categoryId: '',
  active: true,
  featured: false,
  new: false,
  promotion: false,
};
export default function AdminProductForm() {
  const { id } = useParams();
  const [form, setForm] = useState(initial);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api
      .get('/categories')
      .then(({ data }) => setCategories(data))
      .catch(() => {});
    if (id)
      api
        .get(`/products/${id}`)
        .then(({ data }) => setForm(data))
        .catch(() => {});
  }, [id]);
  const change = (event) =>
    setForm({
      ...form,
      [event.target.name]:
        event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  async function save(event) {
    event.preventDefault();
    try {
      id ? await api.put(`/products/${id}`, form) : await api.post('/products', form);
      navigate('/admin/produtos');
    } catch (error) {
      alert(error.response?.data?.message || 'Inicie o backend para salvar o produto.');
    }
  }
  return (
    <AdminLayout title={id ? 'Editar produto' : 'Adicionar produto'}>
      <form className="product-form admin-card" onSubmit={save}>
        <Link className="back-link" to="/admin/produtos">
          <ArrowLeft /> Voltar para produtos
        </Link>
        <div className="form-grid">
          <Input label="Nome do produto" name="name" value={form.name} onChange={change} required />
          <Select
            label="Categoria"
            name="categoryId"
            value={form.categoryId || ''}
            onChange={change}
          >
            <option value="">Selecione</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <Input
            label="Preço"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={change}
            required
          />
          <Input
            label="Preço promocional"
            name="salePrice"
            type="number"
            min="0"
            step="0.01"
            value={form.salePrice || ''}
            onChange={change}
          />
          <Input
            label="Estoque"
            name="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={change}
          />
          <Input
            label="Estoque mínimo"
            name="minStock"
            type="number"
            min="0"
            value={form.minStock}
            onChange={change}
          />
          <Input
            label="Tamanhos (separados por vírgula)"
            name="sizes"
            value={form.sizes || ''}
            onChange={change}
          />
          <Input
            label="Cores (separadas por vírgula)"
            name="colors"
            value={form.colors || ''}
            onChange={change}
          />
          <Select label="Gênero" name="gender" value={form.gender} onChange={change}>
            <option>Unissex</option>
            <option>Meninas</option>
            <option>Meninos</option>
            <option>Bebê</option>
          </Select>
        </div>
        <label className="field">
          <span>Descrição</span>
          <textarea name="description" value={form.description || ''} onChange={change} />
        </label>
        <div className="check-row">
          {[
            ['active', 'Produto ativo'],
            ['featured', 'Destaque'],
            ['new', 'Novidade'],
            ['promotion', 'Promoção'],
          ].map(([name, label]) => (
            <label key={name}>
              <input type="checkbox" name={name} checked={!!form[name]} onChange={change} />
              {label}
            </label>
          ))}
        </div>
        <button className="btn btn-primary">
          <Save /> Salvar produto
        </button>
      </form>
    </AdminLayout>
  );
}
