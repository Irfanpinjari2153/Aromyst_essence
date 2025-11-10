import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Collections from "./pages/Collections";
import Attar from "./pages/Attar";
import Perfumes from "./pages/Perfumes";
import GiftSets from "./pages/GiftSets";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Shopping from "./pages/Shopping";
import Search from "./pages/Search";
import PerfumeGuide from "./pages/PerfumeGuide";
import DiscoverScent from "./pages/DiscoverScent";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import DeleteAccount from "./pages/DeleteAccount";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/attar" element={<Attar />} />
            <Route path="/perfumes" element={<Perfumes />} />
            <Route path="/gift-sets" element={<GiftSets />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/search" element={<Search />} />
            <Route path="/perfume-guide" element={<PerfumeGuide />} />
            <Route path="/discover-scent" element={<DiscoverScent />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
