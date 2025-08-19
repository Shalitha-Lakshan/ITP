import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  useEffect(() => {
    api.get('/deliveries').then((res) => setDeliveries(res.data));
  }, []);
  return (
    <div style={{ padding: 24 }}>
      <h2>Deliveries</h2>
      <ul>
        {deliveries.map((d) => (
          <li key={d._id}>{d.status} - Bin {d.bin?.code} - picked {d.pickupWeightKg}kg</li>
        ))}
      </ul>
    </div>
  );
}

