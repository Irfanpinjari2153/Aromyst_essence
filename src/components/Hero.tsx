import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-perfume.jpg";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Luxury perfume bottles floating in dark space with golden lighting"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark/20 via-transparent to-luxury-dark/80" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-luxury-gold rounded-full animate-float opacity-70" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-luxury-gold rounded-full animate-float-delayed opacity-50" />
        <div className="absolute bottom-40 left-40 w-3 h-3 bg-luxury-gold/30 rounded-full animate-float" />
        <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-luxury-gold rounded-full animate-float-delayed opacity-60" />
        <div className="absolute bottom-60 right-20 w-2 h-2 bg-luxury-gold/40 rounded-full animate-float" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6 animate-fade-in">
          <Sparkles className="w-4 h-4 text-luxury-gold" />
          <span className="text-sm font-medium text-luxury-silver">Premium Fragrance Collection</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
          <span className="block text-foreground">Aromyst</span>
          <span className="block gradient-text glow-text">Essence</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed animate-slide-up [animation-delay:200ms]">
          Discover the art of luxury fragrances. Each scent tells a story of elegance, 
          crafted with the finest ingredients to capture your unique essence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up [animation-delay:400ms]">
          <Button 
            variant="luxury" 
            size="xl"
            className="group"
            onClick={() => navigate('/collections')}
          >
            Explore Collection
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline-luxury" 
            size="xl"
            className="group"
            onClick={() => navigate('/perfumes')}
          >
            View Signature Scents
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 animate-fade-in [animation-delay:600ms]">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-serif font-bold gradient-text">50+</div>
            <div className="text-sm text-muted-foreground mt-1">Premium Scents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-serif font-bold gradient-text">1000+</div>
            <div className="text-sm text-muted-foreground mt-1">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-serif font-bold gradient-text">5★</div>
            <div className="text-sm text-muted-foreground mt-1">Premium Rating</div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};