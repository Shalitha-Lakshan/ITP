import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const addId = params.get('add');
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));

  useEffect(() => {
    if (addId) {
      const next = [...items];
      const idx = next.findIndex((i) => i.product === addId);
      if (idx >= 0) next[idx].quantity += 1; else next.push({ product: addId, quantity: 1 });
      setItems(next);
      localStorage.setItem('cart', JSON.stringify(next));
      navigate('/cart', { replace: true });
    }
  }, [addId]);

  const totalQuantity = useMemo(() => items.reduce((a, b) => a + b.quantity, 0), [items]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Cart</h2>
      <p>Items: {totalQuantity}</p>
      <button onClick={() => navigate('/checkout')}>Checkout</button>
    </div>
  );
}

