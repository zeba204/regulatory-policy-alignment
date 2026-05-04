import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  });
  const navigate = useNavigate();

  /*const login = async (username, password) => {
    const res = await api.post('/api/auth/login', { username, password });
    const token = res.data.token;
    localStorage.setItem('token', token);
    setUser({ token });
    navigate('/');
  };*/
  const login = async (username, password) => {
  // Temporary bypass — remove when backend is running
  if (username === 'admin' && password === 'admin123') {
    const fakeToken = 'fake-jwt-token-for-testing';
    localStorage.setItem('token', fakeToken);
    setUser({ token: fakeToken });
    navigate('/');
  } else {
    throw new Error('Invalid credentials');
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}