import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import FidelidadePage from "./pages/FidelidadePage";
import MembershipPage from "./pages/MembershipPage";
import ProfilePage from "./pages/ProfilePage";
import SaloesPage from "./pages/SaloesPage";
import ShopPage from "./pages/ShopPage";
import PartnerPage from "./pages/PartnerPage";
import ProfessionalDashboardPage from "./pages/ProfessionalDashboardPage";
import CheckoutPage from "./pages/CheckoutPage";
import CartDrawer from "./components/cart/CartDrawer";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">
        {/* CARRINHO GLOBAL FLUTUANTE */}
        <div className="fixed bottom-6 right-6 z-50">
          <CartDrawer />
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/fidelidade" element={<FidelidadePage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/saloes" element={<SaloesPage />} />
          <Route path="/loja" element={<ShopPage />} />
          <Route path="/parceiro" element={<PartnerPage />} />
          <Route path="/profissional" element={<ProfessionalDashboardPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* Próximas rotas virão aqui */}
        </Routes>

        <Toaster position="top-center" richColors />
      </div>
    </BrowserRouter>
  );
}
