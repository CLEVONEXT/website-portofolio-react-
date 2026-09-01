import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

// Admin pages are code-split so visitors never download them
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div className="min-h-screen bg-base" />}>
              <AdminLogin />
            </Suspense>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div className="min-h-screen bg-base" />}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
