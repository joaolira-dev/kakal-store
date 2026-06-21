import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/store/Home';
import Catalog from '../pages/store/Catalog';
import Category from '../pages/store/Category';
import ProductDetails from '../pages/store/ProductDetails';
import Cart from '../pages/store/Cart';
import Checkout from '../pages/store/Checkout';
import MyOrders from '../pages/store/MyOrders';
import OrderDetails from '../pages/store/OrderDetails';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminProducts from '../pages/admin/AdminProducts';
import AdminProductForm from '../pages/admin/AdminProductForm';
import AdminStock from '../pages/admin/AdminStock';
import AdminSales from '../pages/admin/AdminSales';
import AdminOrders from '../pages/admin/AdminOrders';
import AdminOrderDetails from '../pages/admin/AdminOrderDetails';
import AdminCustomers from '../pages/admin/AdminCustomers';
import AdminCategories from '../pages/admin/AdminCategories';
import AdminPromotions from '../pages/admin/AdminPromotions';
import AdminReports from '../pages/admin/AdminReports';
import AdminSettings from '../pages/admin/AdminSettings';
const secured = (Component) => (
  <PrivateRoute>
    <Component />
  </PrivateRoute>
);
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalog />} />
      <Route path="/categoria/:slug" element={<Category />} />
      <Route path="/produto/:slug" element={<ProductDetails />} />
      <Route path="/carrinho" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/meus-pedidos" element={<MyOrders />} />
      <Route path="/pedido/:code" element={<OrderDetails />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={secured(AdminDashboard)} />
      <Route path="/admin/produtos" element={secured(AdminProducts)} />
      <Route path="/admin/produtos/novo" element={secured(AdminProductForm)} />
      <Route path="/admin/produtos/:id/editar" element={secured(AdminProductForm)} />
      <Route path="/admin/estoque" element={secured(AdminStock)} />
      <Route path="/admin/vendas" element={secured(AdminSales)} />
      <Route path="/admin/pedidos" element={secured(AdminOrders)} />
      <Route path="/admin/pedidos/:id" element={secured(AdminOrderDetails)} />
      <Route path="/admin/clientes" element={secured(AdminCustomers)} />
      <Route path="/admin/categorias" element={secured(AdminCategories)} />
      <Route path="/admin/promocoes" element={secured(AdminPromotions)} />
      <Route path="/admin/relatorios" element={secured(AdminReports)} />
      <Route path="/admin/configuracoes" element={secured(AdminSettings)} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
