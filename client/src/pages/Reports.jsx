import { api } from '../services/api.js';

export default function Reports() {
  function downloadInventoryCsv() {
    window.open((import.meta.env.VITE_API_URL || 'http://localhost:4000/api') + '/reports/inventory.csv', '_blank');
  }
  return (
    <div style={{ padding: 24 }}>
      <h2>Reports</h2>
      <button onClick={downloadInventoryCsv}>Download Inventory CSV</button>
    </div>
  );
}

