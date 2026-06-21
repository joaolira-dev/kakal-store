import { Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import ProductTable from '../../components/admin/ProductTable';
import { fallbackProducts } from '../../data';
import api from '../../services/api';
export default function AdminProducts() {
  const [products, setProducts] = useState(fallbackProducts);
  const [query, setQuery] = useState('');
  useEffect(() => {
    api
      .get('/products')
      .then(({ data }) => data.length && setProducts(data))
      .catch(() => {});
  }, []);
  const remove = async (product) => {
    if (!confirm(`Excluir ${product.name}?`)) return;
    try {
      await api.delete(`/products/${product.id}`);
      setProducts(products.filter((item) => item.id !== product.id));
    } catch {
      alert('Não foi possível excluir sem a API ativa.');
    }
  };
  const filtered = products.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <AdminLayout
      title="Produtos"
      action={
        <Link className="btn btn-primary admin-action" to="/admin/produtos/novo">
          <Plus /> Adicionar produto
        </Link>
      }
    >
      <section className="admin-card management">
        <div className="management-top">
          <div>
            <h2>Todos os produtos</h2>
            <p>Organize a vitrine mais encantadora da cidade.</p>
          </div>
          <label className="admin-search inline">
            <Search />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar produto..."
            />
          </label>
        </div>
        <ProductTable products={filtered} onDelete={remove} />
      </section>
    </AdminLayout>
  );
}
