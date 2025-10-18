import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import FormPage from "../pages/FormPage";
import Quotation from "../pages/Dashboard/Quotation";
import BoomBarrier from "../pages/home/BoomBarrier";
import MetalDetector from "../pages/home/MetalDetector";
import Turnstile from "../pages/home/Turnstile";
import Masterpage from "../pages/master/Masterpage";
import SwingBarrier from "../pages/home/SwingBarrier";
import FlapBarrier from "../pages/home/FlapBarrier";
import BaggageScanner from "../pages/home/BaggageScanner";
import BollardSystem from "../pages/home/BollardSystem";
import HomeAutomation from "../pages/home/HomeAutomation";
import DashboardSheet from "../pages/Dashboard/DashboardSheet";
import DashboardLayout from "../components/layout/DashboardLayout"; // 👈 ADD THIS

export default function AppRoutes({ loggedIn, onLogin, onLogout }) {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Masterpage />} />
      <Route path="/home" element={<Masterpage />} />
      <Route path="/boombarrier" element={<BoomBarrier />} />
      <Route path="/swingbarrier" element={<SwingBarrier />} />
      <Route path="/metaldetector" element={<MetalDetector />} />
      <Route path="/turnstile" element={<Turnstile />} />
      <Route path="/baggagescanner" element={<BaggageScanner />} />
      <Route path="/flapbarrier" element={<FlapBarrier />} />
      <Route path="/enquiryform" element={<FormPage />} />
      <Route path="/bollardsystem" element={<BollardSystem />} />
      <Route path="/quotation" element={<Quotation />} />
      <Route path="/homeautomation" element={<HomeAutomation />} />
      <Route path="/login" element={<LoginPage onLogin={onLogin} />} />

      {/* ✅ Protected Admin Routes with Layout */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute loggedIn={loggedIn}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage onLogout={onLogout} />} />
        <Route path="leads" element={<DashboardSheet onLogout={onLogout} />} />
      </Route>

      {/* Redirect unknown paths */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
