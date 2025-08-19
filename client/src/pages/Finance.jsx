import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export default function Finance() {
  const [entries, setEntries] = useState([]);
  const [type, setType] = useState('EPF');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    api.get('/finance').then((res) => setEntries(res.data));
  }, []);

  async function add(e) {
    e.preventDefault();
    const res = await api.post('/finance', { type, amount: Number(amount) });
    setEntries([res.data, ...entries]);
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Finance</h2>
      <form onSubmit={add} style={{ display: 'flex', gap: 8 }}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>EPF</option>
          <option>ETF</option>
          <option>WAGE</option>
          <option>OTHER</option>
        </select>
        <input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {entries.map((e) => (
          <li key={e._id}>{e.type} - {e.amount}</li>
        ))}
      </ul>
    </div>
  );
}

