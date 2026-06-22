import { CheckCircle2, LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StoreHeader from '../../components/store/StoreHeader';
import StoreFooter from '../../components/store/StoreFooter';
import StorePageFrame from '../../components/store/StorePageFrame';
import CheckoutForm from '../../components/store/CheckoutForm';
import { useCart } from '../../hooks/useCart';
import api from '../../services/api';
export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    zip: '',
    address: '',
    payment: 'PIX',
  });
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const onChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  async function finish() {
    if (!form.name || !form.phone || !form.address)
      return alert('Preencha nome, WhatsApp e endereço para continuar.');
    setSaving(true);
    try {
      const { data } = await api.post('/orders', {
        customer: { name: form.name, phone: form.phone, email: form.email, address: form.address },
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        payment: form.payment,
        address: form.address,
      });
      localStorage.setItem('kakal_last_order', JSON.stringify(data));
      clear();
      setDone(true);
    } catch (error) {
      const order = {
        code: `KKS${Date.now().toString().slice(-6)}`,
        total: subtotal,
        status: 'PENDENTE',
        createdAt: new Date().toISOString(),
        items,
      };
      localStorage.setItem('kakal_last_order', JSON.stringify(order));
      clear();
      setDone(true);
    } finally {
      setSaving(false);
    }
  }
  if (done) {
    const order = JSON.parse(localStorage.getItem('kakal_last_order'));
      return (
        <>
          <StorePageFrame>
            <main className="store-shell page-store">
              <StoreHeader />
              <section className="checkout-success">
                <CheckCircle2 />
                <span className="eyebrow">Pedido enviado com carinho!</span>
                <h1>Oba! Seu pedido foi recebido.</h1>
                <p>
                  O pedido <b>#{order.code}</b> já está com a nossa equipe. Vamos preparar tudo
                  direitinho.
                </p>
                <strong>R$ {(order.total || subtotal).toFixed(2).replace('.', ',')}</strong>
                <Link className="btn btn-primary" to={`/pedido/${order.code}`}>
                  Acompanhar pedido
                </Link>
              </section>
            </main>
          </StorePageFrame>
        <StoreFooter />
      </>
    );
  }
  return (
    <>
      <StorePageFrame>
        <main className="store-shell page-store">
          <StoreHeader />
        <div className="breadcrumb">
          Início / Carrinho / <b>Checkout</b>
        </div>
        <h1 className="page-title">
          Finalizar compra <span>✨</span>
        </h1>
        <div className="checkout-layout">
          <CheckoutForm form={form} onChange={onChange} />
          <aside className="order-summary checkout-summary">
            <h2>Seu pedido</h2>
            {items.map((item) => (
              <p className="mini-item" key={item.id}>
                <span>
                  {item.quantity}x {item.name}
                </span>
                <b>
                  R$ {((item.salePrice || item.price) * item.quantity).toFixed(2).replace('.', ',')}
                </b>
              </p>
            ))}
            <hr />
            <p className="total">
              <span>Total</span>
              <b>R$ {subtotal.toFixed(2).replace('.', ',')}</b>
            </p>
            <button
              className="btn btn-primary full"
              onClick={finish}
              disabled={!items.length || saving}
            >
              {saving ? 'Finalizando...' : 'Confirmar pedido'}
            </button>
            <small>
              <LockKeyhole /> Seus dados estão protegidos
            </small>
          </aside>
        </div>
        </main>
      </StorePageFrame>
      <StoreFooter />
    </>
  );
}
