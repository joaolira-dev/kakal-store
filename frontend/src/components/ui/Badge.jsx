export default function Badge({ children, color = 'pink' }) {
  return <span className={`badge badge-${color}`}>{children}</span>;
}
