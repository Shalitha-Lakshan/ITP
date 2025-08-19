import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div style={{ padding: 24 }}>
      <h2>My Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Points: {user.points}</p>
    </div>
  );
}

