import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Award, Sparkles, Heart, Mountain, Flower, Cake, Zap } from "lucide-react";
import AromystAttar from "@/assets/Aromyst_attar.png";

const Attar = () => {
  const categories = {
    woody: {
      name: "Woody & Oriental",
      tagline: "Bold. Mysterious. Timeless.",
      icon: Mountain,
      description: "Deep, luxurious, and long-lasting — perfect for evenings or winter.",
      products: [
        {
          id: "attar-1",
          name: "Amerul Oud",
          description: "Rich, smoky oud tone with Arabic warmth",
          price: 299,
          originalPrice: 399,
          image: AromystAttar,
          rating: 5.0,
          category: "Woody & Oriental",
          isBestSeller: true,
        },
        {
          id: "attar-2",
          name: "Green Ajmeri",
          description: "Earthy, classic attar vibe with oud base",
          price: 249,
          image: AromystAttar,
          rating: 4.9,
          category: "Woody & Oriental",
        },
        {
          id: "attar-3",
          name: "Black Jaguar",
          description: "Bold masculine scent with dark woody notes",
          price: 279,
          image: AromystAttar,
          rating: 4.8,
          category: "Woody & Oriental",
          isNew: true,
        },
        {
          id: "attar-13",
          name: "Tam Dao",
          description: "Exquisite sandalwood blend with cedar undertones",
          price: 319,
          image: AromystAttar,
          rating: 5.0,
          category: "Woody & Oriental",
          isBestSeller: true,
        },
        {
          id: "attar-14",
          name: "White Oud",
          description: "Pure white oud with soft musk accents",
          price: 329,
          image: AromystAttar,
          rating: 4.9,
          category: "Woody & Oriental",
        },
        {
          id: "attar-19",
          name: "Purple Oud",
          description: "Royal oud blend with violet and amber",
          price: 349,
          image: AromystAttar,
          rating: 5.0,
          category: "Woody & Oriental",
          isNew: true,
        },
        {
          id: "attar-20",
          name: "BelaVitta Oud",
          description: "Luxurious oud with soft floral undertones",
          price: 339,
          image: AromystAttar,
          rating: 4.9,
          category: "Woody & Oriental",
        },
        {
          id: "attar-21",
          name: "Shagaf Oud",
          description: "Passionate oud with rich woody base",
          price: 359,
          image: AromystAttar,
          rating: 5.0,
          category: "Woody & Oriental",
          isBestSeller: true,
        },
        {
          id: "attar-22",
          name: "Khamaraha Latafa",
          description: "Opulent Arabian oud with spicy notes",
          price: 369,
          image: AromystAttar,
          rating: 4.9,
          category: "Woody & Oriental",
        },
        {
          id: "attar-23",
          name: "Sandalwood Amber",
          description: "Warm sandalwood with golden amber harmony",
          price: 289,
          image: AromystAttar,
          rating: 4.8,
          category: "Woody & Oriental",
        }
      ]
    },
    floral: {
      name: "Floral & Fresh",
      tagline: "Elegance that speaks softly.",
      icon: Flower,
      description: "Light, soothing, and elegant — ideal for daily wear and subtle presence.",
      products: [
        {
          id: "attar-4",
          name: "Mogra",
          description: "Pure Indian jasmine aroma, traditional favorite",
          price: 189,
          image: AromystAttar,
          rating: 4.9,
          category: "Floral & Fresh",
          isBestSeller: true,
        },
        {
          id: "attar-5",
          name: "Dove",
          description: "Soft, clean, and refreshing like a morning breeze",
          price: 149,
          image: AromystAttar,
          rating: 4.8,
          category: "Floral & Fresh",
        },
        {
          id: "attar-6",
          name: "Charlie",
          description: "Modern floral fusion with a gentle charm",
          price: 169,
          image: AromystAttar,
          rating: 4.7,
          category: "Floral & Fresh",
        },
        {
          id: "attar-24",
          name: "Shanaya",
          description: "Elegant floral bouquet with rose and jasmine",
          price: 209,
          image: AromystAttar,
          rating: 4.9,
          category: "Floral & Fresh",
          isNew: true,
        }
      ]
    },
    sweet: {
      name: "Sweet & Musky",
      tagline: "Sweetness that stays with you.",
      icon: Cake,
      description: "Warm, smooth, and romantic — perfect for cozy moods and evenings.",
      products: [
        {
          id: "attar-7",
          name: "Chocolate Musk",
          description: "Creamy, sweet blend with musk depth",
          price: 199,
          image: AromystAttar,
          rating: 4.9,
          category: "Sweet & Musky",
          isNew: true,
        },
        {
          id: "attar-8",
          name: "Mitthi",
          description: "Soft, sweet traditional scent reminiscent of rain-soaked earth",
          price: 159,
          image: AromystAttar,
          rating: 4.8,
          category: "Sweet & Musky",
        },
        {
          id: "attar-9",
          name: "Blackberry",
          description: "Fruity-sweet with a musky base",
          price: 179,
          image: AromystAttar,
          rating: 4.7,
          category: "Sweet & Musky",
        },
        {
          id: "attar-15",
          name: "Musk Rizali",
          description: "Deep musk with rose and amber harmony",
          price: 229,
          image: AromystAttar,
          rating: 4.8,
          category: "Sweet & Musky",
        },
        {
          id: "attar-16",
          name: "Bare Vanilla",
          description: "Soft creamy vanilla with gentle embrace",
          price: 219,
          image: AromystAttar,
          rating: 4.7,
          category: "Sweet & Musky",
        }
      ]
    },
    sporty: {
      name: "Cool & Sporty",
      tagline: "Freshness that fuels your day.",
      icon: Zap,
      description: "Energetic, sharp, and youthful — made for confidence and everyday freshness.",
      products: [
        {
          id: "attar-10",
          name: "CR7",
          description: "Sporty, modern, and vibrant masculine scent",
          price: 219,
          originalPrice: 289,
          image: AromystAttar,
          rating: 4.9,
          category: "Cool & Sporty",
          isBestSeller: true,
        },
        {
          id: "attar-11",
          name: "Zatax",
          description: "Strong, fresh blend inspired by designer perfumes",
          price: 199,
          image: AromystAttar,
          rating: 4.8,
          category: "Cool & Sporty",
        },
        {
          id: "attar-12",
          name: "Azzaro",
          description: "Premium blend with citrus and spice edges",
          price: 239,
          image: AromystAttar,
          rating: 4.9,
          category: "Cool & Sporty",
        },
        {
          id: "attar-17",
          name: "Dior Sauvage",
          description: "Iconic pepper and bergamot fusion with ambroxan",
          price: 349,
          image: AromystAttar,
          rating: 5.0,
          category: "Cool & Sporty",
          isBestSeller: true,
        },
        {
          id: "attar-18",
          name: "Hawas",
          description: "Aquatic freshness with citrus and woody notes",
          price: 269,
          image: AromystAttar,
          rating: 4.9,
          category: "Cool & Sporty",
        },
        {
          id: "attar-25",
          name: "Cool Water",
          description: "Fresh aquatic with mint and lavender accents",
          price: 229,
          image: AromystAttar,
          rating: 4.8,
          category: "Cool & Sporty",
          isNew: true,
        }
      ]
    }
  };

  const features = [
    {
      icon: Award,
      title: "100% Natural",
      description: "Pure, alcohol-free attar made from natural ingredients"
    },
    {
      icon: Star,
      title: "Traditional Craft",
      description: "Crafted using centuries-old distillation methods"
    },
    {
      icon: Heart,
      title: "Long Lasting",
      description: "Concentrated oils that last 8-12 hours"
    },
    {
      icon: Sparkles,
      title: "Authentic",
      description: "Sourced directly from renowned attar artisans"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
            <Sparkles className="w-4 h-4 text-luxury-gold" />
            <span className="text-sm font-medium text-luxury-silver">Pure Traditional Attar</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            Premium Attar Collection
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the ancient art of attar making. Our collection features pure, 
            alcohol-free fragrances crafted using traditional distillation methods 
            passed down through generations.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="card-luxury text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="w-8 h-8 text-luxury-gold mx-auto mb-3" />
              <h3 className="font-serif text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What is Attar Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6 text-foreground">
              The Art of Attar
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Attar, also known as ittar, is a natural perfume oil derived from botanical sources. 
              Unlike modern perfumes, attar contains no alcohol, making it pure, long-lasting, and gentle on the skin.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our attars are crafted using the ancient hydro-distillation process, where flowers, herbs, 
              or wood are distilled into a base of sandalwood oil or liquid paraffin, creating a 
              concentrated fragrance that develops beautifully on the skin.
            </p>
            <Button variant="luxury" size="lg" onClick={() => window.location.href = '/perfume-guide'}>
              Learn More About Our Process
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden glass-effect">
              <img 
                src={AromystAttar} 
                alt="Traditional attar making process"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-luxury-gold rounded-full flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-luxury-dark" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 gradient-text">
            🌿 Fragrance Categories for Aromyst Essence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of pure, traditional attars, 
            organized by fragrance families.
          </p>
        </div>

        <Tabs defaultValue="woody" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 h-auto">
            {Object.entries(categories).map(([key, category]) => (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2 py-3">
                <category.icon className="w-4 h-4" />
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(categories).map(([key, category]) => (
            <TabsContent key={key} value={key}>
              <div className="mb-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <category.icon className="w-6 h-6 text-luxury-gold" />
                  <h3 className="font-serif text-2xl font-bold">{category.name}</h3>
                </div>
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

      <Footer />
    </div>
  );
};

export default Attar;