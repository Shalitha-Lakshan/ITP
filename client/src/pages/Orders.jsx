import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    api.get('/orders').then((res) => setOrders(res.data));
  }, []);
  return (
    <div style={{ padding: 24 }}>
      <h2>My Orders</h2>
      <ul>
        {orders.map((o) => (
          <li key={o._id}>{new Date(o.createdAt).toLocaleString()} - total ${o.total} - items {o.items.length}</li>
        ))}
      </ul>
    </div>
  );
}

