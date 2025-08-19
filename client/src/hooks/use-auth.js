import { useAuth as useAuthContext } from '@/context/AuthContext.jsx';

export function useAuth() {
  const { token, setToken, user } = useAuthContext();
  function logout() {
    setToken(null);
  }
  return { token, user, logout };
}

