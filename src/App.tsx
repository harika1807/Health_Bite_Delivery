import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Restaurants from "./pages/Restaurants";
import Restaurant from "./pages/Restaurant";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/restaurant/:id" element={<Restaurant />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders/:orderId" element={<OrderTracking />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/favorites" element={<Favorites />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
