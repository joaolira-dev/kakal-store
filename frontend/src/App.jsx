import { CartProvider } from './hooks/useCart';
import AppRoutes from './routes/AppRoutes';
export default function App() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}
