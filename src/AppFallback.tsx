import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/contexts/CartContext";

// Direct imports for critical components
import Index from "@/pages/Index";
import NeoSavannahIndex from "@/pages/NeoSavannahIndex";

function AppFallback() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <Router>
          <CartProvider>
            <div className="min-h-screen bg-background font-sans antialiased">
              <Routes>
                {/* Main Pages */}
                <Route path="/" element={<Index />} />
                <Route path="/neo-savannah" element={<NeoSavannahIndex />} />

                {/* Fallback route */}
                <Route path="*" element={<Index />} />
              </Routes>

              <Toaster />
            </div>
          </CartProvider>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default AppFallback;
