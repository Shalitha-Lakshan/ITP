import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export default function Drops() {
  const [drops, setDrops] = useState([]);
  const [weight, setWeight] = useState('');
  const [binId, setBinId] = useState('');
  const [bins, setBins] = useState([]);

  useEffect(() => {
    api.get('/drops').then((res) => setDrops(res.data));
    api.get('/bins').then((res) => setBins(res.data));
  }, []);

  async function addDrop(e) {
    e.preventDefault();
    if (!binId || !weight) return;
    const res = await api.post('/drops', { binId, weightKg: Number(weight) });
    setDrops([res.data, ...drops]);
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>My Drops</h2>
      <form onSubmit={addDrop} style={{ display: 'flex', gap: 8 }}>
        <select value={binId} onChange={(e) => setBinId(e.target.value)}>
          <option value="">Select Bin</option>
          {bins.map((b) => <option value={b._id} key={b._id}>{b.code}</option>)}
        </select>
        <input placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <button type="submit">Record</button>
      </form>
      <ul>
        {drops.map((d) => (
          <li key={d._id}>{new Date(d.createdAt).toLocaleString()} - {d.weightKg} kg - {d.pointsAwarded} pts - Bin {d.bin?.code}</li>
        ))}
      </ul>
    </div>
  );
}

