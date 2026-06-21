import { ChevronRight, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function OrderCard({ order }) {
  return (
    <article className="order-card">
      <span className="order-icon">
        <Package />
      </span>
      <div>
        <b>Pedido #{order.code}</b>
        <small>
          {new Date(order.createdAt || Date.now()).toLocaleDateString('pt-BR')} ·{' '}
          {order.items?.length || 1} item(ns)
        </small>
      </div>
      <strong>R$ {(order.total || 0).toFixed(2).replace('.', ',')}</strong>
      <span className="status paid">{order.status || 'PAGO'}</span>
      <Link to={`/pedido/${order.code}`}>
        <ChevronRight />
      </Link>
    </article>
  );
}
