import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [totals, setTotals] = useState({ byCategory: [], byColor: [] });
  useEffect(() => {
    api.get('/inventory').then((res) => setItems(res.data));
    api.get('/inventory/totals').then((res) => setTotals(res.data));
  }, []);
  return (
    <div style={{ padding: 24 }}>
      <h2>Inventory</h2>
      <h3>Totals by Category</h3>
      <ul>{totals.byCategory.map((t) => (<li key={t._id}>{t._id}: {t.weightKg} kg</li>))}</ul>
      <h3>Totals by Color</h3>
      <ul>{totals.byColor.map((t) => (<li key={t._id}>{t._id}: {t.weightKg} kg</li>))}</ul>
      <h3>Recent Items</h3>
      <ul>
        {items.map((i) => (
          <li key={i._id}>{i.category} - {i.color} - {i.weightKg} kg</li>
        ))}
      </ul>
    </div>
  );
}

