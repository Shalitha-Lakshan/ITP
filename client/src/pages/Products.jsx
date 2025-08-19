import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    api.get('/products').then((res) => setProducts(res.data));
  }, []);
  return (
    <div style={{ padding: 24 }}>
      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - ${p.price} - stock {p.stock}
            <Link to={`/cart?add=${p._id}`} style={{ marginLeft: 8 }}>Add to cart</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

