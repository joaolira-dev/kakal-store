import DashboardChart from './DashboardChart';
export default function ReportsCharts() {
  return (
    <div className="reports-charts">
      <DashboardChart />
      <section className="admin-card simple-bars">
        <h2>Categorias mais vendidas</h2>
        {[
          ['Meninas', 82, '#ff5b82'],
          ['Meninos', 66, '#0ea5c6'],
          ['Bebê', 48, '#a36be8'],
          ['Acessórios', 35, '#ffd91a'],
        ].map(([label, value, color]) => (
          <p key={label}>
            <span>{label}</span>
            <i>
              <b style={{ width: `${value}%`, background: color }} />
            </i>
            <strong>{value}%</strong>
          </p>
        ))}
      </section>
    </div>
  );
}
