import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Droplets, Wind, Flame } from "lucide-react";
import roseImage from "@/assets/perfume-rose.jpg";
import oudImage from "@/assets/perfume-oud.jpg";
import oceanImage from "@/assets/perfume-ocean.jpg";
import heroImage from "@/assets/hero-perfume.jpg";

const Perfumes = () => {
  const perfumeCategories = {
    woody: {
      icon: Flame,
      name: "Woody & Oriental",
      description: "Deep, luxurious, and long-lasting — perfect for evenings or winter.",
      tagline: "Bold. Mysterious. Timeless.",
      products: [
        {
          id: "perf-1",
          name: "Amerul Oud",
          description: "Rich, smoky oud tone with Arabic warmth",
          price: 299,
          originalPrice: 399,
          image: oudImage,
          rating: 5.0,
          category: "Woody & Oriental",
          isBestSeller: true,
        },
        {
          id: "perf-2",
          name: "Green Ajmeri",
          description: "Earthy, classic attar vibe with oud base",
          price: 249,
          image: oudImage,
          rating: 4.9,
          category: "Woody & Oriental",
        },
        {
          id: "perf-3",
          name: "Black Jaguar",
          description: "Bold masculine scent with dark woody notes",
          price: 279,
          image: oudImage,
          rating: 4.8,
          category: "Woody & Oriental",
          isNew: true,
        },
        {
          id: "perf-13",
          name: "Tam Dao",
          description: "Exquisite sandalwood blend with cedar undertones",
          price: 319,
          image: oudImage,
          rating: 5.0,
          category: "Woody & Oriental",
          isBestSeller: true,
        },
        {
          id: "perf-14",
          name: "White Oud",
          description: "Pure white oud with soft musk accents",
          price: 329,
          image: oudImage,
          rating: 4.9,
          category: "Woody & Oriental",
        }
      ]
    },
    floral: {
      icon: Droplets,
      name: "Floral & Fresh",
      description: "Light, soothing, and elegant — ideal for daily wear and subtle presence.",
      tagline: "Elegance that speaks softly.",
      products: [
        {
          id: "perf-4",
          name: "Mogra",
          description: "Pure Indian jasmine aroma, traditional favorite",
          price: 189,
          image: roseImage,
          rating: 4.9,
          category: "Floral & Fresh",
          isBestSeller: true,
        },
        {
          id: "perf-5",
          name: "Dove",
          description: "Soft, clean, and refreshing like a morning breeze",
          price: 149,
          image: roseImage,
          rating: 4.8,
          category: "Floral & Fresh",
        },
        {
          id: "perf-6",
          name: "Charlie",
          description: "Modern floral fusion with a gentle charm",
          price: 169,
          image: roseImage,
          rating: 4.7,
          category: "Floral & Fresh",
        }
      ]
    },
    sweet: {
      icon: Sparkles,
      name: "Sweet & Musky",
      description: "Warm, smooth, and romantic — perfect for cozy moods and evenings.",
      tagline: "Sweetness that stays with you.",
      products: [
        {
          id: "perf-7",
          name: "Chocolate Musk",
          description: "Creamy, sweet blend with musk depth",
          price: 199,
          image: heroImage,
          rating: 4.9,
          category: "Sweet & Musky",
          isNew: true,
        },
        {
          id: "perf-8",
          name: "Mitthi",
          description: "Soft, sweet traditional scent reminiscent of rain-soaked earth",
          price: 159,
          image: heroImage,
          rating: 4.8,
          category: "Sweet & Musky",
        },
        {
          id: "perf-9",
          name: "Blackberry",
          description: "Fruity-sweet with a musky base",
          price: 179,
          image: heroImage,
          rating: 4.7,
          category: "Sweet & Musky",
        },
        {
          id: "perf-15",
          name: "Musk Rizali",
          description: "Deep musk with rose and amber harmony",
          price: 229,
          image: heroImage,
          rating: 4.8,
          category: "Sweet & Musky",
        },
        {
          id: "perf-16",
          name: "Bare Vanilla",
          description: "Soft creamy vanilla with gentle embrace",
          price: 219,
          image: heroImage,
          rating: 4.7,
          category: "Sweet & Musky",
        }
      ]
    },
    sporty: {
      icon: Wind,
      name: "Cool & Sporty",
      description: "Energetic, sharp, and youthful — made for confidence and everyday freshness.",
      tagline: "Freshness that fuels your day.",
      products: [
        {
          id: "perf-10",
          name: "CR7",
          description: "Sporty, modern, and vibrant masculine scent",
          price: 219,
          originalPrice: 289,
          image: heroImage,
          rating: 4.9,
          category: "Cool & Sporty",
          isBestSeller: true,
        },
        {
          id: "perf-11",
          name: "Zatax",
          description: "Strong, fresh blend inspired by designer perfumes",
          price: 199,
          image: heroImage,
          rating: 4.8,
          category: "Cool & Sporty",
        },
        {
          id: "perf-12",
          name: "Azzaro",
          description: "Premium blend with citrus and spice edges",
          price: 239,
          image: heroImage,
          rating: 4.9,
          category: "Cool & Sporty",
        },
        {
          id: "perf-17",
          name: "Dior Sauvage",
          description: "Iconic pepper and bergamot fusion with ambroxan",
          price: 349,
          image: oceanImage,
          rating: 5.0,
          category: "Cool & Sporty",
          isBestSeller: true,
        },
        {
          id: "perf-18",
          name: "Hawas",
          description: "Aquatic freshness with citrus and woody notes",
          price: 269,
          image: oceanImage,
          rating: 4.9,
          category: "Cool & Sporty",
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
            <Sparkles className="w-4 h-4 text-luxury-gold" />
            <span className="text-sm font-medium text-luxury-silver">Signature Scents</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            Luxury Perfumes
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore our exquisite collection of luxury perfumes, each one crafted with 
            premium ingredients and designed to make a lasting impression. From fresh 
            and aquatic to deep and mysterious.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="luxury" size="lg" onClick={() => window.location.href = '/discover-scent'}>
              Discover Your Scent
            </Button>
            <Button variant="outline-luxury" size="lg" onClick={() => window.location.href = '/perfume-guide'}>
              Fragrance Guide
            </Button>
          </div>
        </div>
      </section>

      {/* Fragrance Families */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Fragrance Families
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover your perfect scent by exploring our carefully curated fragrance families.
          </p>
        </div>

        <Tabs defaultValue="woody" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-card/50 h-auto p-1">
            {Object.entries(perfumeCategories).map(([key, category]) => (
              <TabsTrigger 
                key={key} 
                value={key} 
                className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-dark"
              >
                <category.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(perfumeCategories).map(([key, category]) => (
            <TabsContent key={key} value={key} className="space-y-8">
              <div className="text-center">
                <h3 className="font-serif text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-2">{category.description}</p>
                <p className="text-sm font-medium text-luxury-gold italic">"{category.tagline}"</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.products.map((product, index) => (
                  <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Perfume Guide Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-r from-luxury-blue/10 to-luxury-gold/10 rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 gradient-text">
            How to Choose Your Perfect Perfume
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-luxury-gold">1</span>
            </div>
            <h3 className="font-serif text-xl font-semibold mb-2">Know Your Notes</h3>
            <p className="text-muted-foreground">
              Understand the difference between top, heart, and base notes to find your preference.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-luxury-gold">2</span>
            </div>
            <h3 className="font-serif text-xl font-semibold mb-2">Test on Skin</h3>
            <p className="text-muted-foreground">
              Perfumes smell different on everyone. Always test on your skin before deciding.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-luxury-gold">3</span>
            </div>
            <h3 className="font-serif text-xl font-semibold mb-2">Consider Occasion</h3>
            <p className="text-muted-foreground">
              Choose lighter fragrances for day and richer scents for evening events.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Perfumes;
