import { Routes, Route, Navigate } from 'react-router';

import AuthLayout from './layouts/AuthLayout';
import AppLayout from './layouts/AppLayout';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import CategoriesPage from './pages/CategoriesPage';

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />
        <Route
          path="/transactions"
          element={<TransactionsPage />}
        />
        <Route
          path="/categories"
          element={<CategoriesPage />}
        />
      </Route>

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="*"
        element={<h1>404 - Page not found</h1>}
      />
    </Routes>
  );
}

export default App;
