import { Routes, Route, Navigate } from "react-router-dom";
import FormPage from "../pages/FormPage";
import LoginPage from "../pages/login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/home/Home";

export default function AppRoutes({ loggedIn, onLogin, onLogout }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<LoginPage onLogin={onLogin} />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute loggedIn={loggedIn}>
            <DashboardPage onLogout={onLogout} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
