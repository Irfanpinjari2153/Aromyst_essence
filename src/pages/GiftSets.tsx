import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Heart, Star, Crown, Sparkles, Package } from "lucide-react";
import Giftset from "@/assets/Aromyst_gift.png";


const GiftSets = () => {
  const giftSets = [
    {
      id: "gift-1",
      name: "Woody Oriental Collection",
      description: "Amerul Oud, Green Ajmeri & Black Jaguar - Bold, mysterious, and timeless fragrances in luxury gift box.",
      price: 799,
      originalPrice: 867,
      image: Giftset,
      rating: 4.9,
      category: "Woody & Oriental",
      isBestSeller: true,
    },
    {
      id: "gift-2",
      name: "Floral Fresh Set",
      description: "Mogra, Dove & Charlie - Elegant fragrances that speak softly with matching silk pouch.",
      price: 499,
      originalPrice: 537,
      image: Giftset,
      rating: 4.8,
      category: "Floral & Fresh",
      isNew: true,
    },
    {
      id: "gift-3",
      name: "Sweet Musky Bundle",
      description: "Chocolate Musk, Mitthi & Blackberry - Sweetness that stays with you, in premium packaging.",
      price: 599,
      originalPrice: 627,
      image: Giftset,
      rating: 4.7,
      category: "Sweet & Musky",
    },
    {
      id: "gift-4",
      name: "Cool Sporty Experience",
      description: "CR7, Zatax & Azzaro - Freshness that fuels your day in an elegant presentation case.",
      price: 679,
      originalPrice: 707,
      image: Giftset,
      rating: 5.0,
      category: "Cool & Sporty",
      isBestSeller: true,
    },
    {
      id: "gift-5",
      name: "Premium Duo - Dior Sauvage & Hawas",
      description: "Two luxury fragrances for the modern gentleman with personalized engraving option.",
      price: 599,
      image: Giftset,
      rating: 4.9,
      category: "Premium Collection",
    },
    {
      id: "gift-6",
      name: "Discovery Sample Set",
      description: "Perfect introduction - 12 sample vials from all fragrance categories.",
      price: 89,
      image: Giftset,
      rating: 4.6,
      category: "Discovery",
      isNew: true,
    }
  ];

  const giftOccasions = [
    {
      icon: Heart,
      title: "Romance & Love",
      description: "Perfect for anniversaries, Valentine's Day, and romantic gestures",
      sets: ["Royal Romance Set", "Bridal Bliss Set"]
    },
    {
      icon: Crown,
      title: "Luxury Gifts",
      description: "Premium sets for those who appreciate the finest things",
      sets: ["Luxury Trio Experience", "Gentleman's Choice"]
    },
    {
      icon: Gift,
      title: "Special Occasions", 
      description: "Birthdays, graduations, and milestone celebrations",
      sets: ["Fresh Start Bundle", "Discovery Sample Set"]
    },
    {
      icon: Sparkles,
      title: "Corporate Gifts",
      description: "Elegant options for business relationships and clients",
      sets: ["Gentleman's Choice", "Luxury Trio Experience"]
    }
  ];

  const giftServices = [
    {
      icon: Package,
      title: "Luxury Packaging",
      description: "Every gift set comes in premium packaging with ribbon and card"
    },
    {
      icon: Star,
      title: "Personal Engraving",
      description: "Add a personal touch with custom engraving on select items"
    },
    {
      icon: Gift,
      title: "Gift Wrapping",
      description: "Professional gift wrapping service available for all orders"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
            <Gift className="w-4 h-4 text-luxury-gold" />
            <span className="text-sm font-medium text-luxury-silver">Curated Gift Collections</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            Luxury Gift Sets
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Express your feelings with our carefully curated gift sets. Each collection 
            tells a story and creates lasting memories through the power of fragrance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="luxury" size="lg" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
              <Gift className="w-5 h-5 mr-2" />
              Shop Gift Sets
            </Button>
            <Button variant="outline-luxury" size="lg" onClick={() => window.location.href = '/perfume-guide'}>
              Gift Guide
            </Button>
          </div>
        </div>
      </section>

      {/* Gift Occasions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Perfect Gifts for Every Occasion
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the ideal fragrance gift for any special moment in life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {giftOccasions.map((occasion, index) => (
            <Card 
              key={occasion.title}
              className="card-luxury text-center hover:scale-105 transition-transform duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <occasion.icon className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">{occasion.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{occasion.description}</p>
                <div className="text-xs text-luxury-gold">
                  {occasion.sets.join(" • ")}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Gift Sets Collection */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 gradient-text">
            Featured Gift Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular gift sets, each thoughtfully curated to create 
            an unforgettable unboxing experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {giftSets.map((product, index) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>

      {/* Gift Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Premium Gift Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Make your gift extra special with our luxury services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {giftServices.map((service, index) => (
            <div 
              key={service.title}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-4">
                <service.icon className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gift Guide CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="card-luxury text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold mb-4 gradient-text">
            Need Help Choosing?
          </h2>
          <p className="text-muted-foreground mb-6">
            Our fragrance experts are here to help you find the perfect gift. 
            Take our gift quiz or speak with a consultant for personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="luxury" size="lg" onClick={() => window.location.href = '/discover-scent'}>
              Take Gift Quiz
            </Button>
            <Button variant="outline-luxury" size="lg" onClick={() => window.open('mailto:expert@aromyst.com')}>
              Speak with Expert
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GiftSets;