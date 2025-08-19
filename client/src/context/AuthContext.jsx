import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      api.setToken(token);
      api.get('/users/me').then((res) => setUser(res.data)).catch(() => {});
    } else {
      localStorage.removeItem('token');
      api.setToken(null);
      setUser(null);
    }
  }, [token]);

  const value = useMemo(() => ({ token, setToken, user, setUser }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

