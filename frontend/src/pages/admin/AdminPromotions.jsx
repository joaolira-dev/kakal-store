import { CalendarDays, Percent, Plus, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import api from '../../services/api';
export default function AdminPromotions() {
  const [data, setData] = useState({ promotions: [], coupons: [] }),
    [open, setOpen] = useState(false),
    [coupon, setCoupon] = useState({ code: '', discount: '10', expiresAt: '2027-12-31' });
  const load = () =>
    api
      .get('/promotions')
      .then(({ data }) => setData(data))
      .catch(() =>
        setData({
          promotions: [
            {
              id: 1,
              name: 'Semana encantada',
              discount: 30,
              startDate: '2026-06-01',
              endDate: '2026-06-30',
              active: true,
            },
          ],
          coupons: [
            { id: 1, code: 'KAKAL10', discount: 10, active: true, expiresAt: '2027-12-31' },
          ],
        })
      );
  useEffect(load, []);
  async function save(e) {
    e.preventDefault();
    try {
      await api.post('/promotions', { coupon: { ...coupon, discount: +coupon.discount } });
      setOpen(false);
      load();
    } catch {
      alert('Inicie o backend para criar o cupom.');
    }
  }
  return (
    <AdminLayout
      title="Promoções"
      action={
        <button className="btn btn-primary admin-action" onClick={() => setOpen(true)}>
          <Plus /> Criar cupom
        </button>
      }
    >
      <div className="promo-admin-grid">
        <section className="admin-card">
          <h2>
            <Percent /> Promoções ativas
          </h2>
          {data.promotions.map((p) => (
            <article className="promotion-row" key={p.id}>
              <span>
                <Percent />
              </span>
              <div>
                <b>{p.name}</b>
                <small>
                  <CalendarDays /> Até {new Date(p.endDate).toLocaleDateString('pt-BR')}
                </small>
              </div>
              <strong>{p.discount}% OFF</strong>
            </article>
          ))}
        </section>
        <section className="admin-card">
          <h2>
            <Tag /> Cupons de desconto
          </h2>
          {data.coupons.map((c) => (
            <article className="coupon-row" key={c.id}>
              <b>{c.code}</b>
              <span>{c.discount}% off</span>
              <small>{c.active ? 'Ativo' : 'Inativo'}</small>
            </article>
          ))}
        </section>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Novo cupom">
        <form className="stack-form" onSubmit={save}>
          <Input
            label="Código"
            value={coupon.code}
            onChange={(e) => setCoupon({ ...coupon, code: e.target.value.toUpperCase() })}
          />
          <Input
            label="Desconto (%)"
            type="number"
            value={coupon.discount}
            onChange={(e) => setCoupon({ ...coupon, discount: e.target.value })}
          />
          <Input
            label="Validade"
            type="date"
            value={coupon.expiresAt}
            onChange={(e) => setCoupon({ ...coupon, expiresAt: e.target.value })}
          />
          <button className="btn btn-primary">Criar cupom</button>
        </form>
      </Modal>
    </AdminLayout>
  );
}
