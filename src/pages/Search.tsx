import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, SlidersHorizontal, X, Star } from "lucide-react";
import { useState } from "react";
import AroImage from "@/assets/Aromystper.jpeg";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("relevance");

  const allProducts = [
    {
      id: "1",
      name: "Midnight Rose Attar",
      description: "An enchanting blend of Bulgarian rose and dark amber, perfect for evening wear.",
      price: 89,
      originalPrice: 120,
      image: AroImage,
      rating: 4.8,
      category: "Attar",
      notes: ["Rose", "Amber", "Musk"],
      isBestSeller: true,
    },
    {
      id: "2",
      name: "Golden Oud Premium",
      description: "Rich and sophisticated oud with hints of saffron and vanilla.",
      price: 156,
      image: AroImage,
      rating: 4.9,
      category: "Premium",
      notes: ["Oud", "Saffron", "Vanilla"],
      isNew: true,
    },
    {
      id: "3",
      name: "Ocean Breeze Fresh",
      description: "Fresh and invigorating with marine notes and citrus undertones.",
      price: 67,
      image: AroImage,
      rating: 4.6,
      category: "Fresh",
      notes: ["Marine", "Citrus", "Mint"],
    },
    {
      id: "4",
      name: "Royal Sandalwood",
      description: "Creamy sandalwood with jasmine and musk, a timeless classic.",
      price: 134,
      originalPrice: 160,
      image: AroImage,
      rating: 4.9,
      category: "Woody",
      notes: ["Sandalwood", "Jasmine", "Musk"],
      isBestSeller: true,
    },
    {
      id: "5",
      name: "Desert Storm Spice",
      description: "Bold and mysterious with leather, tobacco, and spice notes.",
      price: 98,
      image: AroImage,
      rating: 4.7,
      category: "Spicy",
      notes: ["Leather", "Tobacco", "Spices"],
    },
    {
      id: "6",
      name: "White Magnolia Floral",
      description: "Delicate floral bouquet with white flowers and soft musk.",
      price: 78,
      image: AroImage,
      rating: 4.5,
      category: "Floral",
      notes: ["Magnolia", "White Flowers", "Musk"],
      isNew: true,
    }
  ];

  const filterOptions = {
    categories: ["Attar", "Premium", "Fresh", "Woody", "Spicy", "Floral"],
    notes: ["Rose", "Oud", "Sandalwood", "Vanilla", "Marine", "Citrus", "Musk", "Amber", "Saffron", "Jasmine", "Leather", "Tobacco", "Spices", "Magnolia", "White Flowers", "Mint"],
    priceRanges: ["Under $50", "$50 - $100", "$100 - $150", "$150 - $200", "Over $200"]
  };

  const popularSearches = [
    "Rose attar", "Oud perfume", "Fresh fragrance", "Woody scents", 
    "Luxury perfume", "Natural attar", "Floral bouquet", "Spicy fragrance"
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.notes.some(note => note.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.some(filter => 
                            product.category === filter || 
                            product.notes.includes(filter)
                          );
    
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesFilters && matchesPrice;
  });

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setPriceRange([0, 500]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold gradient-text mb-6">
            Search Fragrances
          </h1>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, notes, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-luxury-gold"
            />
          </div>

          {/* Popular Searches */}
          {!searchQuery && (
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => setSearchQuery(search)}
                    className="px-3 py-1 text-sm bg-card hover:bg-luxury-gold/20 border border-border hover:border-luxury-gold rounded-full transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-luxury sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl font-semibold flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </h2>
                  {selectedFilters.length > 0 && (
                    <Button 
                      variant="ghost-luxury" 
                      size="sm" 
                      onClick={clearFilters}
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Active Filters */}
                {selectedFilters.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Active Filters:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedFilters.map((filter) => (
                        <span
                          key={filter}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-luxury-gold/20 text-luxury-gold rounded-full text-xs"
                        >
                          {filter}
                          <button onClick={() => toggleFilter(filter)}>
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {filterOptions.categories.map((category) => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFilters.includes(category)}
                          onChange={() => toggleFilter(category)}
                          className="rounded border-border text-luxury-gold focus:ring-luxury-gold"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Fragrance Notes */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Fragrance Notes</h3>
                  <div className="space-y-2">
                    {filterOptions.notes.slice(0, 8).map((note) => (
                      <label key={note} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFilters.includes(note)}
                          onChange={() => toggleFilter(note)}
                          className="rounded border-border text-luxury-gold focus:ring-luxury-gold"
                        />
                        <span className="text-sm">{note}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {filterOptions.priceRanges.map((range) => (
                      <label key={range} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          className="border-border text-luxury-gold focus:ring-luxury-gold"
                        />
                        <span className="text-sm">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="font-serif text-2xl font-semibold">
                  {searchQuery ? `Results for "${searchQuery}"` : "All Fragrances"}
                </h2>
                <p className="text-muted-foreground">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </p>
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            ) : (
              /* No Results */
              <div className="text-center py-16">
                <Search className="w-24 h-24 text-muted-foreground/50 mx-auto mb-6" />
                <h3 className="font-serif text-2xl font-semibold mb-4">No results found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="luxury" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                  <Button variant="outline-luxury" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default SearchPage;