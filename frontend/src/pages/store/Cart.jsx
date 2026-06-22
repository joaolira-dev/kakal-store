import { ArrowLeft, ArrowRight, MessageCircle, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import StoreHeader from '../../components/store/StoreHeader';
import StoreFooter from '../../components/store/StoreFooter';
import StorePageFrame from '../../components/store/StorePageFrame';
import CartItem from '../../components/store/CartItem';
import { useCart } from '../../hooks/useCart';
export default function Cart() {
  const { items, subtotal, update, remove } = useCart();
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState('');
  const navigate = useNavigate();
  const total = Math.max(0, subtotal - discount);
  function applyCoupon() {
    if (coupon.toUpperCase() === 'KAKAL10') setDiscount(subtotal * 0.1);
    else alert('Use o cupom KAKAL10 para experimentar a promoção.');
  }
  const message = encodeURIComponent(
    `Olá! Quero finalizar minha compra na Kakal Kids Store. Meu carrinho tem: ${items.map((item) => item.name).join(', ')}. Total: R$ ${total.toFixed(2)}.`
  );
  return (
    <>
      <StorePageFrame>
        <main className="store-shell page-store">
          <StoreHeader />
        <div className="breadcrumb">
          Início / <b>Carrinho</b>
        </div>
        <h1 className="page-title">
          Seu carrinho <span>💖</span>
        </h1>
        {!items.length ? (
          <section className="empty-cart">
            <h2>Seu carrinho está esperando uma aventura!</h2>
            <p>Escolha uma peça especial para começar.</p>
            <Link className="btn btn-primary" to="/catalogo">
              Ver catálogo
            </Link>
          </section>
        ) : (
          <div className="cart-layout">
            <section className="cart-list">
              {items.map((item) => (
                <CartItem
                  item={item}
                  key={`${item.id}-${item.size}-${item.color}`}
                  onUpdate={update}
                  onRemove={remove}
                />
              ))}
              <Link className="continue" to="/catalogo">
                <ArrowLeft /> Continuar comprando
              </Link>
            </section>
            <aside className="order-summary">
              <h2>Resumo do pedido</h2>
              <div className="coupon">
                <label>
                  <Tag />
                  <input
                    value={coupon}
                    onChange={(event) => setCoupon(event.target.value)}
                    placeholder="Cupom de desconto"
                  />
                </label>
                <button onClick={applyCoupon}>Aplicar</button>
              </div>
              <p>
                <span>Subtotal</span>
                <b>R$ {subtotal.toFixed(2).replace('.', ',')}</b>
              </p>
              {discount > 0 && (
                <p className="discount">
                  <span>Desconto</span>
                  <b>- R$ {discount.toFixed(2).replace('.', ',')}</b>
                </p>
              )}
              <p>
                <span>Frete</span>
                <b>Grátis</b>
              </p>
              <hr />
              <p className="total">
                <span>Total</span>
                <b>R$ {total.toFixed(2).replace('.', ',')}</b>
              </p>
              <button className="btn btn-primary full" onClick={() => navigate('/checkout')}>
                Finalizar compra <ArrowRight />
              </button>
              <a
                className="btn btn-whatsapp full"
                href={`https://wa.me/5583999999999?text=${message}`}
                target="_blank"
              >
                <MessageCircle /> Comprar pelo WhatsApp
              </a>
              <small>🔒 Compra 100% segura</small>
            </aside>
          </div>
        )}
        </main>
      </StorePageFrame>
      <StoreFooter />
    </>
  );
}
