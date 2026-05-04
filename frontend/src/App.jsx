import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import PolicyListPage from './pages/PolicyListPage';
import Dashboard from './pages/Dashboard';
import PolicyFormPage from './pages/PolicyFormPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PolicyDetailPage from './pages/PolicyDetailPage';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
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
      <Route path="/analytics" element={
        <ProtectedRoute>
         <AnalyticsPage />
        </ProtectedRoute>
      } />
      <Route path="/policy/:id" element={
        <ProtectedRoute>
         <PolicyDetailPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;