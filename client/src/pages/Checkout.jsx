import { useMemo, useState } from 'react';
import { api } from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Checkout() {
  const navigate = useNavigate();
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
  const [redeem, setRedeem] = useState(0);
  const { user } = useAuth();

  const subtotal = useMemo(() => 0, [items]); // prices handled server-side

  async function placeOrder() {
    const res = await api.post('/orders', { items, redeemPoints: Number(redeem) });
    localStorage.removeItem('cart');
    navigate('/orders');
    return res;
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Checkout</h2>
      <p>Items: {items.length}</p>
      <p>Your points: {user?.points}</p>
      <input placeholder="Redeem points" value={redeem} onChange={(e) => setRedeem(e.target.value)} />
      <button onClick={placeOrder}>Place order</button>
    </div>
  );
}

