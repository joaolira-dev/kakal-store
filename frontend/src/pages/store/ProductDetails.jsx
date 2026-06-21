import { Check, Heart, MessageCircle, Minus, Plus, ShoppingBag, Star, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StoreHeader from '../../components/store/StoreHeader';
import StoreFooter from '../../components/store/StoreFooter';
import { asset, fallbackProducts } from '../../data';
import { useCart } from '../../hooks/useCart';
import api from '../../services/api';
const money = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(
    () => fallbackProducts.find((item) => item.slug === slug) || fallbackProducts[0]
  );
  const [size, setSize] = useState('6');
  const [color, setColor] = useState('Coral');
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState('Descrição');
  const { add } = useCart();
  useEffect(() => {
    api
      .get(`/products/${slug}`)
      .then(({ data }) => setProduct(data))
      .catch(() => {});
  }, [slug]);
  const price = product.salePrice || product.price;
  const whatsapp = encodeURIComponent(
    `Olá! Tenho interesse no produto ${product.name}, tamanho ${size}, cor ${color}.`
  );
  return (
    <>
      <main className="store-shell page-store">
        <StoreHeader />
        <div className="breadcrumb">
          Início / Catálogo / <b>{product.name}</b>
        </div>
        <section className="product-detail">
          <div className="product-gallery">
            <div className="gallery-thumbs">
              <button>
                <img src={asset('colecao-produtos.png')} />
              </button>
              <button>
                <img src={asset('hero-kids.png')} />
              </button>
            </div>
            <div className="main-product-image">
              <img src={asset('colecao-produtos.png')} alt={product.name} />
              {product.new && <span className="product-label blue">Novo</span>}
            </div>
          </div>
          <div className="detail-info">
            <div className="detail-title">
              <div>
                <span>{product.category?.name || 'Kakal Kids'}</span>
                <h1>{product.name}</h1>
              </div>
              <button>
                <Heart />
              </button>
            </div>
            <div className="rating">
              <Star fill="#ffd91a" />
              <Star fill="#ffd91a" />
              <Star fill="#ffd91a" />
              <Star fill="#ffd91a" />
              <Star fill="#ffd91a" /> <u>4.9 (18 avaliações)</u>
            </div>
            <div className="detail-price">
              {product.salePrice && <del>{money(product.price)}</del>}
              <strong>{money(price)}</strong>
              <small>ou 6x de {money(price / 6)} sem juros</small>
            </div>
            <p className="detail-copy">
              {product.description ||
                'Uma peça linda, macia e cheia de personalidade para deixar a infância ainda mais colorida.'}
            </p>
            <div className="picker">
              <b>
                Cor: <em>{color}</em>
              </b>
              <div className="color-list">
                <button className="color coral" onClick={() => setColor('Coral')} />
                <button className="color blue" onClick={() => setColor('Azul')} />
                <button className="color yellow" onClick={() => setColor('Amarelo')} />
              </div>
            </div>
            <div className="picker">
              <b>Tamanho</b>
              <div className="size-chips">
                {['2', '4', '6', '8', '10'].map((value) => (
                  <button
                    className={size === value ? 'selected' : ''}
                    key={value}
                    onClick={() => setSize(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div className="buy-line">
              <div className="quantity">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus />
                </button>
                <b>{quantity}</b>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus />
                </button>
              </div>
              <button
                className="btn btn-primary buy-button"
                onClick={() => add(product, { size, color, quantity })}
              >
                <ShoppingBag /> Adicionar ao carrinho
              </button>
            </div>
            <a
              className="whatsapp-buy"
              target="_blank"
              href={`https://wa.me/5583999999999?text=${whatsapp}`}
            >
              <MessageCircle /> Comprar pelo WhatsApp
            </a>
            <div className="shipping-note">
              <Truck />
              <div>
                <b>Frete rápido para todo o Brasil</b>
                <span>Calcule o prazo no checkout</span>
              </div>
              <Check />
            </div>
          </div>
        </section>
        <section className="detail-tabs">
          <div>
            {['Descrição', 'Informações', 'Avaliações'].map((item) => (
              <button
                className={tab === item ? 'selected' : ''}
                onClick={() => setTab(item)}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
          <p>
            {tab === 'Descrição'
              ? 'Modelagem confortável, tecido macio e acabamento feito para brincar, pular e viver muitas aventuras. Cada peça Kakal é escolhida com muito carinho.'
              : tab === 'Informações'
                ? 'Composição: algodão e materiais selecionados. Consulte a tabela de medidas antes de comprar.'
                : '“A qualidade é maravilhosa e chegou bem rapidinho!” — Mamãe da Alice'}
          </p>
        </section>
      </main>
      <StoreFooter />
    </>
  );
}
