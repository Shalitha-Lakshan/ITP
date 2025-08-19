import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export default function Bins() {
  const [bins, setBins] = useState([]);
  useEffect(() => {
    api.get('/bins').then((res) => setBins(res.data));
  }, []);
  return (
    <div style={{ padding: 24 }}>
      <h2>Bins</h2>
      <ul>
        {bins.map((b) => (
          <li key={b._id}>{b.code} - {b.city} - {b.currentWeightKg} kg</li>
        ))}
      </ul>
    </div>
  );
}

