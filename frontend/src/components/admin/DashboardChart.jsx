import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const data = [
  { day: 'Seg', sales: 3600 },
  { day: 'Ter', sales: 4500 },
  { day: 'Qua', sales: 5500 },
  { day: 'Qui', sales: 6600 },
  { day: 'Sex', sales: 7700 },
  { day: 'Sáb', sales: 9100 },
  { day: 'Dom', sales: 5700 },
];
export default function DashboardChart() {
  return (
    <section className="admin-card chart-card">
      <h2>
        Vendas da semana <em>☆</em>
      </h2>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: '#fff4f6' }} formatter={(v) => [`R$ ${v}`, 'Vendas']} />
            <Bar dataKey="sales" fill="#ff5b82" radius={[5, 5, 0, 0]} barSize={25} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
