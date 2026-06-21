import { useEffect, useState } from 'react';
import api from '../services/api';
import { fallbackProducts } from '../data';
export default function useProducts(params = {}) {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let live = true;
    api
      .get('/products', { params })
      .then(({ data }) => live && setProducts(data.length ? data : fallbackProducts))
      .catch(() => live && setProducts(fallbackProducts))
      .finally(() => live && setLoading(false));
    return () => {
      live = false;
    };
  }, [JSON.stringify(params)]);
  return { products, loading, setProducts };
}
