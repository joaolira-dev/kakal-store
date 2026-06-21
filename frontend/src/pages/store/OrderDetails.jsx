import { CheckCircle2, MessageCircle, Package, Truck } from 'lucide-react';
import { useParams } from 'react-router-dom';
import StoreHeader from '../../components/store/StoreHeader';
import StoreFooter from '../../components/store/StoreFooter';
import { asset } from '../../data';
export default function OrderDetails() {
  const { code } = useParams();
  const local = JSON.parse(localStorage.getItem('kakal_last_order') || 'null');
  const order =
    local?.code === code
      ? local
      : {
          code,
          total: 189.9,
          status: 'PAGO',
          payment: 'PIX',
          createdAt: '2026-06-18',
          address: 'João Pessoa - PB',
          items: [{ name: 'Vestido Floral Encantado', quantity: 1, price: 89.9 }],
        };
  return (
    <>
      <main className="store-shell page-store">
        <StoreHeader />
        <div className="breadcrumb">
          Início / Meus pedidos / <b>#{code}</b>
        </div>
        <section className="order-detail-page">
          <div className="order-detail-heading">
            <div>
              <span className="eyebrow">Pedido #{order.code}</span>
              <h1>
                Seu pedido está <em>{order.status.toLowerCase()}</em> 💖
              </h1>
              <p>Feito em {new Date(order.createdAt).toLocaleDateString('pt-BR')}</p>
            </div>
            <span className="status paid">{order.status}</span>
          </div>
          <div className="order-detail-grid">
            <section className="card order-products">
              <h2>
                <Package /> Produtos do pedido
              </h2>
              {order.items.map((item, index) => (
                <article key={index}>
                  <img src={asset('colecao-produtos.png')} />
                  <div>
                    <b>{item.name || item.product?.name}</b>
                    <small>Quantidade: {item.quantity}</small>
                  </div>
                  <strong>
                    R${' '}
                    {((item.price || item.product?.price || 0) * item.quantity)
                      .toFixed(2)
                      .replace('.', ',')}
                  </strong>
                </article>
              ))}
            </section>
            <aside className="card delivery-card">
              <h2>
                <Truck /> Entrega e pagamento
              </h2>
              <p>
                <b>Endereço</b>
                <span>{order.address || 'A combinar pelo WhatsApp'}</span>
              </p>
              <p>
                <b>Pagamento</b>
                <span>{order.payment || 'PIX'}</span>
              </p>
              <hr />
              <p className="total">
                <b>Total</b>
                <strong>R$ {(order.total || 0).toFixed(2).replace('.', ',')}</strong>
              </p>
              <a
                className="btn btn-whatsapp full"
                target="_blank"
                href={`https://wa.me/5583999999999?text=${encodeURIComponent(`Olá! Gostaria de falar sobre meu pedido ${order.code}.`)}`}
              >
                <MessageCircle /> Falar sobre o pedido
              </a>
            </aside>
          </div>
          <section className="delivery-timeline">
            <div className="active">
              <CheckCircle2 />
              <b>Pedido recebido</b>
              <small>Seu pedido chegou até nós</small>
            </div>
            <div className="active">
              <Package />
              <b>Em preparação</b>
              <small>Estamos separando suas peças</small>
            </div>
            <div>
              <Truck />
              <b>Em rota de entrega</b>
              <small>Logo vai chegar!</small>
            </div>
          </section>
        </section>
      </main>
      <StoreFooter />
    </>
  );
}
