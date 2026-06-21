import { createContext, useContext, useEffect, useMemo, useState } from 'react';
const CartContext = createContext();
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('kakal_cart') || '[]'));
  useEffect(() => localStorage.setItem('kakal_cart', JSON.stringify(items)), [items]);
  const value = useMemo(
    () => ({
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      add(product, options = {}) {
        setItems((all) => {
          const index = all.findIndex(
            (item) =>
              item.id === product.id && item.size === options.size && item.color === options.color
          );
          return index >= 0
            ? all.map((item, i) =>
                i === index ? { ...item, quantity: item.quantity + (options.quantity || 1) } : item
              )
            : [...all, { ...product, ...options, quantity: options.quantity || 1 }];
        });
      },
      update(id, quantity) {
        setItems((all) =>
          all.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
        );
      },
      remove(id) {
        setItems((all) => all.filter((item) => item.id !== id));
      },
      clear() {
        setItems([]);
      },
      subtotal: items.reduce(
        (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
        0
      ),
    }),
    [items]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);
