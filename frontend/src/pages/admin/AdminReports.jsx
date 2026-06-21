import { Download, Package, Users, Wallet } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatsCard from '../../components/admin/StatsCard';
import ReportsCharts from '../../components/admin/ReportsCharts';
export default function AdminReports() {
  return (
    <AdminLayout
      title="Relatórios"
      action={
        <button
          className="btn btn-white admin-action"
          onClick={() => alert('Relatório CSV preparado para exportação.')}
        >
          <Download /> Exportar CSV
        </button>
      }
    >
      <section className="stats-grid report-stats">
        <StatsCard icon={Wallet} label="Faturamento" value="R$ 78.540,50" trend="+22%" />
        <StatsCard icon={Package} color="blue" label="Itens vendidos" value="641" trend="+16%" />
        <StatsCard icon={Users} color="purple" label="Novos clientes" value="34" trend="+12%" />
      </section>
      <ReportsCharts />
      <section className="admin-card best-report">
        <h2>Produtos mais vendidos</h2>
        <ol>
          <li>
            <span>1</span> Vestido Floral Encantado <b>256 unidades</b>
          </li>
          <li>
            <span>2</span> Polo Listrada Aventura <b>198 unidades</b>
          </li>
          <li>
            <span>3</span> Jardineira Jeans Divertida <b>174 unidades</b>
          </li>
        </ol>
      </section>
    </AdminLayout>
  );
}
