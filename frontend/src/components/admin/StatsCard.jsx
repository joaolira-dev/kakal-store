export default function StatsCard({ icon: Icon, label, value, trend, color = 'pink' }) {
  return (
    <article className={`stats-card ${color}`}>
      <span>
        <Icon />
      </span>
      <div>
        <b>{label}</b>
        <strong>{value}</strong>
        <small className={trend?.startsWith('-') ? 'down' : ''}>
          {trend || '+8% este mês'} <i>{trend?.startsWith('-') ? '↓' : '↑'}</i>
        </small>
      </div>
    </article>
  );
}
