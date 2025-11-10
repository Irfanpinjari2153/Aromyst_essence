import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Filter, Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import roseImage from "@/assets/perfume-rose.jpg";
import oudImage from "@/assets/perfume-oud.jpg";
import oceanImage from "@/assets/perfume-ocean.jpg";
import heroImage from "@/assets/hero-perfume.jpg";

const Collections = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const collections = [
    {
      id: "woody-oriental",
      name: "Woody & Oriental",
      description: "Deep, luxurious, and long-lasting — perfect for evenings or winter.",
      tagline: "Bold. Mysterious. Timeless.",
      products: [
        {
          id: "1",
          name: "Amerul Oud",
          description: "Rich, smoky oud tone with Arabic warmth",
          price: 156,
          image: oudImage,
          rating: 4.9,
          category: "Woody & Oriental",
          isBestSeller: true,
        },
        {
          id: "2", 
          name: "Green Ajmeri",
          description: "Earthy, classic attar vibe with oud base",
          price: 134,
          image: heroImage,
          rating: 4.8,
          category: "Woody & Oriental",
        },
        {
          id: "3",
          name: "Black Jaguar",
          description: "Bold masculine scent with dark woody notes",
          price: 145,
          image: heroImage,
          rating: 4.7,
          category: "Woody & Oriental",
          isNew: true,
        }
      ]
    },
    {
      id: "floral-fresh",
      name: "Floral & Fresh",
      description: "Light, soothing, and elegant — ideal for daily wear and subtle presence.",
      tagline: "Elegance that speaks softly.",
      products: [
        {
          id: "4",
          name: "Mogra",
          description: "Pure Indian jasmine aroma, traditional favorite",
          price: 89,
          originalPrice: 120,
          image: roseImage,
          rating: 4.8,
          category: "Floral & Fresh",
          isBestSeller: true,
        },
        {
          id: "5",
          name: "Dove",
          description: "Soft, clean, and refreshing like a morning breeze",
          price: 67,
          image: oceanImage,
          rating: 4.6,
          category: "Floral & Fresh",
        },
        {
          id: "6",
          name: "Charlie",
          description: "Modern floral fusion with a gentle charm",
          price: 78,
          image: roseImage,
          rating: 4.5,
          category: "Floral & Fresh",
        }
      ]
    },
    {
      id: "sweet-musky",
      name: "Sweet & Musky",
      description: "Warm, smooth, and romantic — perfect for cozy moods and evenings.",
      tagline: "Sweetness that stays with you.",
      products: [
        {
          id: "7",
          name: "Chocolate Musk",
          description: "Creamy, sweet blend with musk depth",
          price: 98,
          image: heroImage,
          rating: 4.7,
          category: "Sweet & Musky",
          isNew: true,
        },
        {
          id: "8",
          name: "Mitthi",
          description: "Soft, sweet traditional scent reminiscent of rain-soaked earth",
          price: 85,
          image: heroImage,
          rating: 4.6,
          category: "Sweet & Musky",
        },
        {
          id: "9",
          name: "Blackberry",
          description: "Fruity-sweet with a musky base",
          price: 92,
          image: heroImage,
          rating: 4.5,
          category: "Sweet & Musky",
        }
      ]
    },
    {
      id: "cool-sporty",
      name: "Cool & Sporty",
      description: "Energetic, sharp, and youthful — made for confidence and everyday freshness.",
      tagline: "Freshness that fuels your day.",
      products: [
        {
          id: "10",
          name: "CR7",
          description: "Sporty, modern, and vibrant masculine scent",
          price: 110,
          image: heroImage,
          rating: 4.8,
          category: "Cool & Sporty",
          isBestSeller: true,
        },
        {
          id: "11",
          name: "Zatax",
          description: "Strong, fresh blend inspired by designer perfumes",
          price: 105,
          image: oceanImage,
          rating: 4.7,
          category: "Cool & Sporty",
        },
        {
          id: "12",
          name: "Azzaro",
          description: "Premium blend with citrus and spice edges",
          price: 115,
          image: oceanImage,
          rating: 4.6,
          category: "Cool & Sporty",
          isNew: true,
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            Our Collections
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our curated collections of premium fragrances, each telling a unique story 
            through carefully selected ingredients and masterful craftsmanship.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline-luxury" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline-luxury" size="sm">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Sort
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'luxury' : 'ghost-luxury'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'luxury' : 'ghost-luxury'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        {collections.map((collection, index) => (
          <div key={collection.id} className="mb-16 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
            {/* Collection Header */}
            <div className="mb-8">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-2 text-foreground">
                {collection.name}
              </h2>
              <p className="text-muted-foreground text-lg">{collection.description}</p>
              {collection.tagline && (
                <p className="text-primary font-medium mt-2 italic">{collection.tagline}</p>
              )}
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}>
              {collection.products.map((product) => (
                <div key={product.id}>
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default Collections;