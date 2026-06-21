import {
  AlertTriangle,
  Boxes,
  ClipboardList,
  DollarSign,
  Package,
  Plus,
  ShoppingBag,
  Wallet,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import StatsCard from '../../components/admin/StatsCard';
import DashboardChart from '../../components/admin/DashboardChart';
import OrdersTable from '../../components/admin/OrdersTable';
import { fallbackProducts } from '../../data';
import api from '../../services/api';
export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 128,
    orders: 23,
    sales: 98,
    revenue: 78540.5,
    lowStock: 15,
  });
  const [orders, setOrders] = useState([
    {
      id: 1,
      code: 'KKS1048',
      customer: { name: 'Maria Eduarda' },
      total: 189.9,
      status: 'PAGO',
      createdAt: '2026-06-18',
    },
    {
      id: 2,
      code: 'KKS1047',
      customer: { name: 'João Miguel' },
      total: 249.9,
      status: 'PENDENTE',
      createdAt: '2026-06-17',
    },
  ]);
  useEffect(() => {
    api
      .get('/reports/dashboard')
      .then(({ data }) => setStats(data))
      .catch(() => {});
    api
      .get('/orders')
      .then(({ data }) => data.length && setOrders(data))
      .catch(() => {});
  }, []);
  return (
    <AdminLayout
      action={
        <Link className="btn btn-primary admin-action" to="/admin/produtos/novo">
          <Plus /> Adicionar produto
        </Link>
      }
    >
      <section className="stats-grid">
        <StatsCard
          icon={ShoppingBag}
          label="Total de produtos"
          value={stats.products}
          trend="+12% este mês"
        />
        <StatsCard
          icon={Boxes}
          color="blue"
          label="Produtos em estoque"
          value={stats.sales}
          trend="+8% este mês"
        />
        <StatsCard
          icon={AlertTriangle}
          color="yellow"
          label="Estoque baixo"
          value={stats.lowStock}
          trend="-5% este mês"
        />
        <StatsCard
          icon={DollarSign}
          color="green"
          label="Vendas do mês"
          value="R$ 24.860,90"
          trend="+18% este mês"
        />
        <StatsCard
          icon={ClipboardList}
          color="purple"
          label="Pedidos pendentes"
          value={stats.orders}
          trend="+6% este mês"
        />
        <StatsCard
          icon={Wallet}
          color="coral"
          label="Faturamento total"
          value={`R$ ${Number(stats.revenue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          trend="+22% este mês"
        />
      </section>
      <div className="dashboard-mid">
        <DashboardChart />
        <section className="admin-card top-products">
          <h2>
            Produtos mais vendidos <em>♡</em>
          </h2>
          {fallbackProducts.slice(0, 5).map((product, index) => (
            <article key={product.id}>
              <i>{index + 1}</i>
              <span className={`tiny-product tone-${product.tone}`} />
              <div>
                <b>{product.name}</b>
                <p>
                  <span style={{ width: `${93 - index * 10}%` }} />
                </p>
              </div>
              <strong>{256 - index * 24}</strong>
            </article>
          ))}
        </section>
        <section className="admin-card quick-summary">
          <h2>
            Resumo rápido <em>☆</em>
          </h2>
          <p>
            <span>Novos clientes este mês</span>
            <b>34</b>
          </p>
          <p>
            <span>Ticket médio</span>
            <b>R$ 152,90</b>
          </p>
          <p>
            <span>Produtos em promoção</span>
            <b>18</b>
          </p>
          <p>
            <span>Avaliações de clientes</span>
            <b className="stars">★★★★★ 4.8</b>
          </p>
          <p>
            <span>Mensagens não lidas</span>
            <b>7</b>
          </p>
        </section>
      </div>
      <div className="dashboard-bottom">
        <section className="admin-card last-orders">
          <h2>Últimos pedidos</h2>
          <OrdersTable orders={orders.slice(0, 5)} />
          <Link to="/admin/pedidos" className="see-all">
            Ver todos os pedidos →
          </Link>
        </section>
        <aside>
          <section className="admin-card alert-card">
            <h2>
              🔔 Alertas importantes <em>☆</em>
            </h2>
            <p>
              <i className="orange" /> {stats.lowStock} produtos com estoque baixo{' '}
              <a>Ver produtos</a>
            </p>
            <p>
              <i className="pink" /> 3 produtos esgotados <a>Ver produtos</a>
            </p>
            <p>
              <i className="yellow" /> 7 pedidos aguardando pagamento <a>Ver pedidos</a>
            </p>
          </section>
          <section className="admin-card quick-whatsapp">
            <h2>🟢 Atendimento rápido</h2>
            <p>Fale com seus clientes pelo WhatsApp</p>
            <a href="https://web.whatsapp.com" target="_blank">
              Abrir WhatsApp Web ↗
            </a>
          </section>
        </aside>
      </div>
    </AdminLayout>
  );
}
