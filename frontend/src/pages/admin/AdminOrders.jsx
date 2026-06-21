import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import OrdersTable from '../../components/admin/OrdersTable';
import api from '../../services/api';
export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    api
      .get('/orders')
      .then(({ data }) => setOrders(data))
      .catch(() =>
        setOrders([
          {
            id: 1,
            code: 'KKS1048',
            customer: { name: 'Maria Eduarda' },
            total: 189.9,
            status: 'PAGO',
            createdAt: '2026-06-18',
          },
        ])
      );
  }, []);
  return (
    <AdminLayout title="Pedidos">
      <section className="admin-card management">
        <div className="management-top">
          <div>
            <h2>Todos os pedidos</h2>
            <p>Acompanhe cada pedido com carinho.</p>
          </div>
          <label className="admin-search inline">
            <Search />
            <input placeholder="Buscar pedido ou cliente..." />
          </label>
        </div>
        <OrdersTable orders={orders} />
      </section>
    </AdminLayout>
  );
}
