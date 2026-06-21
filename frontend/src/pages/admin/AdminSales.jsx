import { Plus, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import SalesTable from '../../components/admin/SalesTable';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import api from '../../services/api';
export default function AdminSales() {
  const [sales, setSales] = useState([]),
    [products, setProducts] = useState([]),
    [open, setOpen] = useState(false),
    [form, setForm] = useState({ productId: '', quantity: 1, payment: 'PIX' });
  const load = () =>
    api
      .get('/sales')
      .then(({ data }) => setSales(data))
      .catch(() => {});
  useEffect(() => {
    load();
    api
      .get('/products')
      .then(({ data }) => setProducts(data))
      .catch(() => {});
  }, []);
  async function sell(event) {
    event.preventDefault();
    try {
      await api.post('/sales', {
        items: [{ productId: +form.productId, quantity: +form.quantity }],
        payment: form.payment,
      });
      setOpen(false);
      load();
    } catch (error) {
      alert(error.response?.data?.message || 'Inicie o backend para finalizar a venda.');
    }
  }
  return (
    <AdminLayout
      title="Vendas"
      action={
        <button className="btn btn-primary admin-action" onClick={() => setOpen(true)}>
          <Plus /> Nova venda
        </button>
      }
    >
      <section className="admin-card management">
        <div className="management-top">
          <div>
            <h2>Histórico de vendas</h2>
            <p>Vendas feitas no balcão da sua lojinha.</p>
          </div>
          <span className="large-icon">
            <ShoppingCart />
          </span>
        </div>
        <SalesTable sales={sales} />
      </section>
      <Modal open={open} onClose={() => setOpen(false)} title="Nova venda">
        <form className="stack-form" onSubmit={sell}>
          <Select
            label="Produto"
            value={form.productId}
            onChange={(e) => setForm({ ...form, productId: e.target.value })}
          >
            <option value="">Selecione um produto</option>
            {products.map((p) => (
              <option value={p.id} key={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
          <Input
            label="Quantidade"
            type="number"
            min="1"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
          <Select
            label="Pagamento"
            value={form.payment}
            onChange={(e) => setForm({ ...form, payment: e.target.value })}
          >
            <option>PIX</option>
            <option>Cartão</option>
            <option>Dinheiro</option>
          </Select>
          <button className="btn btn-primary">Finalizar venda</button>
        </form>
      </Modal>
    </AdminLayout>
  );
}
