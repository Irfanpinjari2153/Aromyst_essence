import { Button } from "@/components/ui/button";
import { Search, User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.jpg";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      try {
        // @ts-ignore - Supabase types will be updated automatically
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .single();

        setIsAdmin(!!data);
      } catch (error) {
        setIsAdmin(false);
      }
    };

    checkAdminRole();
  }, [user]);

  const navLinks = [
    { label: "Collections", href: "/collections" },
    { label: "Attar", href: "/attar" },
    { label: "Perfumes", href: "/perfumes" },
    { label: "Gift Sets", href: "/gift-sets" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Aromyst Essence" className="h-12 w-12 object-contain" />
              <h2 className="font-serif text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300">
                Aromyst
              </h2>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-foreground/80 hover:text-luxury-gold transition-colors duration-300 font-medium"
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="text-foreground/80 hover:text-luxury-gold transition-colors duration-300 font-medium"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost-luxury" 
              size="sm"
              onClick={() => navigate('/search')}
            >
              <Search className="w-4 h-4" />
            </Button>
            
            <CartDrawer />
            
            <Button 
              variant="ghost-luxury" 
              size="sm"
              onClick={() => navigate('/auth')}
            >
              <User className="w-4 h-4" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost-luxury"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-foreground/80 hover:text-luxury-gold transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-foreground/80 hover:text-luxury-gold transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};