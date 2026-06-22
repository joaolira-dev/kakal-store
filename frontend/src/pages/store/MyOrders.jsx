import { PackageCheck } from 'lucide-react';
import StoreHeader from '../../components/store/StoreHeader';
import StoreFooter from '../../components/store/StoreFooter';
import StorePageFrame from '../../components/store/StorePageFrame';
import OrderCard from '../../components/store/OrderCard';
export default function MyOrders() {
  const last = JSON.parse(localStorage.getItem('kakal_last_order') || 'null');
  const orders = last
    ? [last]
    : [{ code: 'KKS1048', total: 189.9, status: 'PAGO', createdAt: '2026-06-18', items: [{}] }];
  return (
    <>
      <StorePageFrame>
        <main className="store-shell page-store">
          <StoreHeader />
        <div className="breadcrumb">
          Início / <b>Meus pedidos</b>
        </div>
        <section className="orders-page">
          <span className="eyebrow">Acompanhe suas aventuras</span>
          <h1>
            Meus pedidos <PackageCheck />
          </h1>
          <p>Confira o status de cada compra feita na Kakal Kids Store.</p>
          <div>
            {orders.map((order) => (
              <OrderCard order={order} key={order.code} />
            ))}
          </div>
        </section>
        </main>
      </StorePageFrame>
      <StoreFooter />
    </>
  );
}
