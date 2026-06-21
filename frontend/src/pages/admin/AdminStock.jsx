import { ArrowDownToLine, ArrowUpFromLine, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import StockTable from '../../components/admin/StockTable';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { fallbackProducts } from '../../data';
import api from '../../services/api';
export default function AdminStock() {
  const [products, setProducts] = useState(fallbackProducts),
    [movements, setMovements] = useState([]),
    [open, setOpen] = useState(false),
    [form, setForm] = useState({ productId: '', type: 'ENTRADA', quantity: '', note: '' });
  const load = () => {
    api
      .get('/stock')
      .then(({ data }) => data.length && setProducts(data))
      .catch(() => {});
    api
      .get('/stock/movements')
      .then(({ data }) => setMovements(data))
      .catch(() => {});
  };
  useEffect(load, []);
  const low = products.filter((p) => p.stock <= (p.minStock || 4)).length;
  async function movement(event) {
    event.preventDefault();
    try {
      await api.post('/stock/movement', form);
      setOpen(false);
      load();
    } catch (error) {
      alert(error.response?.data?.message || 'Inicie o backend para registrar a movimentação.');
    }
  }
  return (
    <AdminLayout
      title="Estoque"
      action={
        <button className="btn btn-primary admin-action" onClick={() => setOpen(true)}>
          <Plus /> Nova movimentação
        </button>
      }
    >
      <section className="inventory-cards">
        <article>
          <span>
            <ArrowUpFromLine />
          </span>
          <div>
            <b>Em estoque</b>
            <strong>{products.reduce((sum, p) => sum + p.stock, 0)}</strong>
          </div>
        </article>
        <article>
          <span className="yellow">
            <ArrowDownToLine />
          </span>
          <div>
            <b>Estoque baixo</b>
            <strong>{low}</strong>
          </div>
        </article>
        <article>
          <span className="blue">✦</span>
          <div>
            <b>Produtos cadastrados</b>
            <strong>{products.length}</strong>
          </div>
        </article>
      </section>
      <section className="admin-card management">
        <h2>Controle de estoque</h2>
        <StockTable products={products} />
      </section>
      <section className="admin-card management movement-history">
        <h2>Histórico de movimentações</h2>
        {movements.length ? (
          <div className="movement-list">
            {movements.map((m) => (
              <p key={m.id}>
                <span className={m.quantity > 0 ? 'in' : 'out'}>
                  {m.quantity > 0 ? '+' : '−'} {Math.abs(m.quantity)}
                </span>
                <b>{m.product?.name}</b>
                <small>{m.note || m.type}</small>
              </p>
            ))}
          </div>
        ) : (
          <p className="empty-row">As novas entradas e saídas aparecerão aqui.</p>
        )}
      </section>
      <Modal open={open} onClose={() => setOpen(false)} title="Nova movimentação">
        <form className="stack-form" onSubmit={movement}>
          <Select
            label="Produto"
            value={form.productId}
            onChange={(e) => setForm({ ...form, productId: e.target.value })}
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
          <Select
            label="Tipo"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option>ENTRADA</option>
            <option>SAÍDA</option>
          </Select>
          <Input
            label="Quantidade"
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
          <Input
            label="Observação"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
          <button className="btn btn-primary">Registrar</button>
        </form>
      </Modal>
    </AdminLayout>
  );
}
