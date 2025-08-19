import { useState } from 'react';
import { api } from '../services/api.js';

export default function ManufacturerTake() {
  const [items, setItems] = useState([{ category: 'SHRED_RICE', color: 'MIXED', weightKg: 1 }]);

  function updateItem(index, key, value) {
    const next = items.slice();
    next[index] = { ...next[index], [key]: value };
    setItems(next);
  }

  async function submit(e) {
    e.preventDefault();
    await api.post('/manufacturer/take', { items: items.map((i) => ({ ...i, weightKg: Number(i.weightKg) })) });
    alert('Recorded');
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Manufacturer Take</h2>
      <form onSubmit={submit}>
        {items.map((it, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <select value={it.category} onChange={(e) => updateItem(idx, 'category', e.target.value)}>
              <option>BOTTLE</option>
              <option>LID</option>
              <option>SHRED_DUST</option>
              <option>SHRED_RICE</option>
              <option>SHRED_RING</option>
            </select>
            <input value={it.color} onChange={(e) => updateItem(idx, 'color', e.target.value)} placeholder="Color" />
            <input value={it.weightKg} onChange={(e) => updateItem(idx, 'weightKg', e.target.value)} placeholder="Weight kg" />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

