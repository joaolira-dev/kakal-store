import { MessageCircle, Printer, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import Badge from '../../components/ui/Badge';
import { asset } from '../../data';
import api from '../../services/api';
export default function AdminOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    api
      .get(`/orders/${id}`)
      .then(({ data }) => setOrder(data))
      .catch(() =>
        setOrder({
          code: 'KKS1048',
          status: 'PAGO',
          total: 189.9,
          payment: 'PIX',
          customer: {
            name: 'Maria Eduarda',
            phone: '(83) 99999-0000',
            address: 'João Pessoa - PB',
          },
          items: [{ product: { name: 'Vestido Floral Encantado' }, quantity: 1, price: 89.9 }],
        })
      );
  }, [id]);
  if (!order) return null;
  return (
    <AdminLayout
      title={`Pedido #${order.code}`}
      action={
        <button className="btn btn-white admin-action" onClick={() => print()}>
          <Printer /> Imprimir
        </button>
      }
    >
      <div className="admin-order-detail">
        <section className="admin-card">
          <div className="management-top">
            <h2>Dados do pedido</h2>
            <Badge color="green">{order.status}</Badge>
          </div>
          <p>
            <b>Cliente:</b> {order.customer?.name}
          </p>
          <p>
            <b>WhatsApp:</b> {order.customer?.phone || '—'}
          </p>
          <p>
            <b>Endereço:</b> {order.address || order.customer?.address || '—'}
          </p>
          <p>
            <b>Pagamento:</b> {order.payment}
          </p>
          <a
            className="btn btn-whatsapp"
            href={`https://wa.me/5583999999999?text=${encodeURIComponent(`Olá, ${order.customer?.name}! Aqui é da Kakal Kids Store. Estamos falando sobre seu pedido ${order.code}.`)}`}
            target="_blank"
          >
            <MessageCircle /> Falar no WhatsApp
          </a>
        </section>
        <section className="admin-card">
          <h2>Itens comprados</h2>
          {order.items.map((item, i) => (
            <article className="admin-order-product" key={i}>
              <img src={asset('colecao-produtos.png')} />
              <b>{item.product?.name}</b>
              <span>{item.quantity}x</span>
              <strong>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</strong>
            </article>
          ))}
          <p className="total">
            <b>Total</b>
            <strong>R$ {order.total.toFixed(2).replace('.', ',')}</strong>
          </p>
        </section>
        <section className="admin-card order-timeline">
          <h2>
            <Truck /> Timeline do pedido
          </h2>
          <p>
            <i /> Pedido recebido
          </p>
          <p>
            <i /> Pagamento confirmado
          </p>
          <p>
            <i className="empty" /> Aguardando envio
          </p>
        </section>
      </div>
    </AdminLayout>
  );
}
