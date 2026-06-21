import { Bell, ChevronDown, Search } from 'lucide-react';
export default function AdminHeader({ title = 'Olá, Kakal Kids! 👋', action }) {
  return (
    <header className="admin-header">
      <div>
        <h1>{title}</h1>
        <p>Bem-vinda ao painel da sua lojinha</p>
      </div>
      <label className="admin-search">
        <Search />
        <input placeholder="Buscar produtos, pedidos ou clientes..." />
      </label>
      <button className="notification">
        <Bell />
        <i>3</i>
      </button>
      <div className="admin-avatar">
        <span>KA</span>
        <div>
          <b>Kakal Admin</b>
          <small>Administradora</small>
        </div>
        <ChevronDown size={17} />
      </div>
      {action}
    </header>
  );
}
