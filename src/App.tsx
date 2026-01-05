import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute, RedirectIfAuthenticated } from "./lib/auth";
import { AuthModalProvider } from "./lib/authModal";
import { MaintenanceBanner } from "./components/MaintenanceBanner";
import { FrameScreen } from "./screens/FrameScreen";
import { Dashboard } from "./routes/Dashboard/screens/Dashboard";
import { OrdersPage } from "./routes/Dashboard/screens/OrdersPage";
import { PagePublic } from "./routes/PagePublic/PagePublic";
import { PageService } from "./routes/PageService/PageService";


export const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthModalProvider>
          {/* Maintenance mode banner - shows at top when enabled */}
          <MaintenanceBanner />
          <Routes>
            {/* Home page - redirect to dashboard if already authenticated */}
            <Route path="/" element={
              <RedirectIfAuthenticated>
                <FrameScreen />
              </RedirectIfAuthenticated>
            } />

            {/* Protected dashboard routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/orders" element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } />

            {/* Checkout return pages (Stripe redirects here after payment) */}
            <Route path="/checkout/success" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/checkout/cancel" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            {/* Public pages */}
            <Route path="/public" element={<PagePublic />} />
            <Route path="/public/:username" element={<PagePublic />} />
            <Route path="/service" element={<PageService />} />
            <Route path="/service/:slug" element={<PageService />} />
          </Routes>
        </AuthModalProvider>
      </Router>
    </AuthProvider>
  );
};
