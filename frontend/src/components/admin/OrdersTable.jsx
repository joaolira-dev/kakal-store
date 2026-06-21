import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
const color = (status) =>
  ({ PAGO: 'green', PENDENTE: 'yellow', CANCELADO: 'pink', ENVIADO: 'purple' })[status] || 'blue';
export default function OrdersTable({ orders = [] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <b>#{order.code}</b>
              </td>
              <td>{order.customer?.name}</td>
              <td>R$ {order.total.toFixed(2).replace('.', ',')}</td>
              <td>
                <Badge color={color(order.status)}>{order.status}</Badge>
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</td>
              <td>
                <Link className="icon-button" to={`/admin/pedidos/${order.id}`}>
                  <Eye />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
