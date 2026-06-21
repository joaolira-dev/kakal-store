import { Minus, Plus, Trash2 } from 'lucide-react';
import { asset } from '../../data';
export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <article className="cart-item">
      <img src={asset('colecao-produtos.png')} />
      <div>
        <b>{item.name}</b>
        <small>
          Cor: {item.color || 'Colorido'} · Tam: {item.size || '6'}
        </small>
        <strong>R$ {(item.salePrice || item.price).toFixed(2).replace('.', ',')}</strong>
      </div>
      <div className="quantity">
        <button onClick={() => onUpdate(item.id, item.quantity - 1)}>
          <Minus />
        </button>
        <b>{item.quantity}</b>
        <button onClick={() => onUpdate(item.id, item.quantity + 1)}>
          <Plus />
        </button>
      </div>
      <button className="icon-button danger" onClick={() => onRemove(item.id)}>
        <Trash2 />
      </button>
    </article>
  );
}
