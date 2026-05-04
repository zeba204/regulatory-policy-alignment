import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PolicyListPage from './pages/PolicyListPage';
import Dashboard from './pages/Dashboard';
import PolicyFormPage from './pages/PolicyFormPage';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <PolicyListPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/policy/create" element={
          <ProtectedRoute>
            <PolicyFormPage />
          </ProtectedRoute>
        } />
        <Route path="/policy/edit/:id" element={
          <ProtectedRoute>
            <PolicyFormPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;