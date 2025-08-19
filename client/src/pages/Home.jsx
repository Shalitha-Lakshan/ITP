import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Home() {
  const { user } = useAuth();
  return (
    <div style={{ padding: 24 }}>
      <h1>EcoCycle</h1>
      <p>Digital plastic recycling system.</p>
      {!user && (
        <p>
          <Link to="/login">Login</Link> or <Link to="/register">Register</Link>
        </p>
      )}
      <nav style={{ display: 'grid', gap: 8, marginTop: 16 }}>
        <Link to="/products">Products</Link>
        {user && <Link to="/profile">My Profile</Link>}
        {user && <Link to="/drops">My Drops</Link>}
        {user && <Link to="/orders">My Orders</Link>}
        {user && <Link to="/bins">Bins</Link>}
        {user && <Link to="/inventory">Inventory</Link>}
        {user && <Link to="/deliveries">Deliveries</Link>}
        {user && <Link to="/manufacturer/take">Manufacturer Take</Link>}
        {user && <Link to="/finance">Finance</Link>}
        {user && <Link to="/reports">Reports</Link>}
      </nav>
    </div>
  );
}

