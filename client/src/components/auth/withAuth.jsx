import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';

export default function withAuth(Component) {
  return function Wrapped(props) {
    const { token } = useAuth();
    if (!token) return <Navigate to="/login" replace />;
    return <Component {...props} />;
  };
}

