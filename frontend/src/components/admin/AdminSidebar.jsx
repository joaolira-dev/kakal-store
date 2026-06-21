import {
  BarChart3,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Package,
  Percent,
  Settings,
  ShoppingCart,
  Tags,
  Users,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { asset } from '../../data';
const links = [
  [LayoutDashboard, 'Dashboard', '/admin/dashboard'],
  [Package, 'Produtos', '/admin/produtos'],
  [Boxes, 'Estoque', '/admin/estoque'],
  [ShoppingCart, 'Vendas', '/admin/vendas'],
  [ClipboardList, 'Pedidos', '/admin/pedidos'],
  [Users, 'Clientes', '/admin/clientes'],
  [Tags, 'Categorias', '/admin/categorias'],
  [Percent, 'Promoções', '/admin/promocoes'],
  [BarChart3, 'Relatórios', '/admin/relatorios'],
  [Settings, 'Configurações', '/admin/configuracoes'],
];
export default function AdminSidebar() {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem('kakal_admin_token');
    navigate('/admin/login');
  }
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <img src={asset('logo-kakal.png')} />
        <span>
          <b>Kakal Kids Store</b>
          <small>Painel Administrativo</small>
        </span>
      </div>
      <nav>
        {links.map(([Icon, label, to]) => (
          <NavLink key={label} to={to}>
            <Icon /> {label}
          </NavLink>
        ))}
      </nav>
      <button className="logout" onClick={logout}>
        <LogOut /> Sair
      </button>
      <img className="sidebar-doll" src={asset('boneca-kakal.png')} />
    </aside>
  );
}
