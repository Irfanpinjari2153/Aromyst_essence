import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Globe, Heart, Star, Sparkles, Target, Eye } from "lucide-react";
import heroImage from "@/assets/hero-perfume.jpg";
import irfanPhoto from "@/assets/Irfan.jpeg";
import kasifPhoto from "@/assets/Kasif.jpeg";
import dipakPhoto from "@/assets/Dipak.jpeg";

const About = () => {
  const milestones = [
    { year: "2025", title: "Stall Based Beginnings", description: "Started as stall based attar selling + on-ground sampling" },
    { year: "2025", title: "Niche Modern Blends", description: "Developed niche modern blends based on customer demand" },
    { year: "2025", title: "Digital Launch", description: "Launched Aromyst Essence digital brand identity" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Honesty before marketing",
      description: "We believe in transparent authenticity over inflated promises."
    },
    {
      icon: Award,
      title: "Quality over volume",
      description: "Each bottle is crafted with precision, not mass production."
    },
    {
      icon: Users,
      title: "Long term trust above quick sales",
      description: "Building relationships that last, not just transactions."
    }
  ];

  const cofounders = [
    {
      name: "Irfan",
      role: "Co-Founder",
      description: "Visionary behind Aromyst's authentic fragrance philosophy",
      photo: irfanPhoto
    },
    {
      name: "Kasif",
      role: "Co-Founder",
      description: "Master craftsman bringing precision to every blend",
      photo: kasifPhoto
    },
    {
      name: "Dipak",
      role: "Co-Founder",
      description: "Strategic mind driving our quality-first approach",
      photo: dipakPhoto
    }
  ];


  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
              <Sparkles className="w-4 h-4 text-luxury-gold" />
              <span className="text-sm font-medium text-luxury-silver">Our Story</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 gradient-text">
              Our Story
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              Aromyst Essence was born in 2025 — starting from a small stall setup selling attars locally… 
              crafted and curated by passion, not by marketing budgets. We are building this brand deliberately 
              slow, precise and quality-first — bottle by bottle — earning trust with real scent, not hype.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="luxury" size="lg">
                Our Collections
              </Button>
              <Button variant="outline-luxury" size="lg">
                Contact Us
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden glass-effect">
              <img 
                src={heroImage} 
                alt="Aromyst Essence luxury perfume collection"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-luxury-gold rounded-full flex items-center justify-center animate-pulse-glow">
              <Star className="w-12 h-12 text-luxury-dark" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <Card className="card-luxury">
            <CardContent className="p-6 md:p-8 text-center">
              <Target className="w-10 h-10 md:w-12 md:h-12 text-luxury-gold mx-auto mb-3 md:mb-4" />
              <h2 className="font-serif text-xl md:text-2xl font-bold mb-3 md:mb-4 gradient-text">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To make premium attars & signature perfume blends accessible… without compromising 
                purity, craft or character. Luxury should be honest — not inflated.
              </p>
            </CardContent>
          </Card>

          <Card className="card-luxury">
            <CardContent className="p-6 md:p-8 text-center">
              <Eye className="w-10 h-10 md:w-12 md:h-12 text-luxury-gold mx-auto mb-3 md:mb-4" />
              <h2 className="font-serif text-xl md:text-2xl font-bold mb-3 md:mb-4 gradient-text">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the most trusted modern fragrance house from India — where every formula 
                is clean, intentional and built with long term value… not trend based shortcuts.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
            Our Journey
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Young brand. Fresh era. Transparent foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((milestone, index) => (
            <Card 
              key={milestone.year}
              className="card-luxury hover:scale-105 transition-transform duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-luxury-gold mb-2">{milestone.year}</div>
                <h3 className="font-serif text-xl font-semibold mb-2">{milestone.title}</h3>
                <p className="text-sm text-muted-foreground">{milestone.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-r from-luxury-blue/10 to-luxury-gold/10 rounded-2xl md:rounded-3xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 gradient-text">
            Our Values
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            The principles that guide every decision and inspire every creation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {values.map((value, index) => (
            <div 
              key={value.title}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-luxury-gold" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
        
        <p className="text-center text-sm md:text-base text-muted-foreground mt-8 md:mt-12 max-w-3xl mx-auto leading-relaxed px-4">
          We create fragrances for people who value subtle power — depth — elegance — identity… not noise.
        </p>
      </section>

      {/* Cofounders Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 gradient-text">
            Meet Our Co-Founders
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            The passionate minds building Aromyst Essence from the ground up.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cofounders.map((cofounder, index) => (
            <Card 
              key={cofounder.name}
              className="card-luxury hover:scale-105 transition-transform duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
            <CardContent className="p-6 md:p-8 text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-4 md:mb-6 shadow-luxury overflow-hidden">
                  <img 
                    src={cofounder.photo} 
                    alt={`${cofounder.name} - ${cofounder.role}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-bold mb-2 text-foreground">{cofounder.name}</h3>
                <p className="text-luxury-gold font-medium mb-3 md:mb-4 text-sm md:text-base">{cofounder.role}</p>
                <p className="text-sm md:text-base text-muted-foreground">{cofounder.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="card-luxury text-center max-w-3xl mx-auto p-6 md:p-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3 md:mb-4 gradient-text">
            Join Our Fragrance Family
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-6">
            Become part of our growing community of fragrance enthusiasts. 
            Follow our journey and be the first to discover new collections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="luxury" size="lg">
              Subscribe to Updates
            </Button>
            <Button variant="outline-luxury" size="lg">
              Follow Our Story
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;