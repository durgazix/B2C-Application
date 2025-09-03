import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import Home from "./pages/Home";
import "./App.css";

function ProtectedRoutes({ allowedRoles, children }) {
  const role = localStorage.getItem("role");
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
}

const App =() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? <Home /> : <Navigate to="/auth/login" replace />
          }
        />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route
          path="/products"
          element={
            <ProtectedRoutes allowedRoles={["user", "admin", "superadmin"]}>
              <ProductList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/superadmin/dashboard"
          element={
            <ProtectedRoutes allowedRoles={["superadmin"]}>
              <SuperAdminDashboard />
            </ProtectedRoutes>
          }
        />
        {/* Catch-all: redirect unknown routes to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;