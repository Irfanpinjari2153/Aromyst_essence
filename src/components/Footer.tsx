import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-luxury-dark border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-3xl font-bold gradient-text mb-4">
              Aromyst Essence
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Crafting luxury fragrances that tell your story. From our humble beginnings 
              as a stall business to serving discerning customers worldwide with premium 
              attar and perfumes.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <Button variant="ghost-luxury" size="sm" className="p-2">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost-luxury" size="sm" className="p-2">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost-luxury" size="sm" className="p-2">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-4 text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#collections" className="hover:text-luxury-gold transition-colors">
                  Collections
                </a>
              </li>
              <li>
                <a href="#attar" className="hover:text-luxury-gold transition-colors">
                  Premium Attar
                </a>
              </li>
              <li>
                <a href="#perfumes" className="hover:text-luxury-gold transition-colors">
                  Luxury Perfumes
                </a>
              </li>
              <li>
                <a href="#gifts" className="hover:text-luxury-gold transition-colors">
                  Gift Sets
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-luxury-gold transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-4 text-foreground">
              Contact
            </h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                <span>hello@aromystessence.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-luxury-gold flex-shrink-0 mt-0.5" />
                <span>123 Fragrance Avenue<br />Luxury District, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-serif text-xl font-semibold mb-2 text-foreground">
              Stay In The Scent
            </h4>
            <p className="text-muted-foreground mb-4">
              Get exclusive offers and be the first to discover new fragrances.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-luxury-gold"
              />
              <Button variant="luxury">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 Aromyst Essence. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#privacy" className="hover:text-luxury-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-luxury-gold transition-colors">
              Terms of Service
            </a>
            <a href="#shipping" className="hover:text-luxury-gold transition-colors">
              Shipping Info
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};