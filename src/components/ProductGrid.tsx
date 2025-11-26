import { ProductCard } from "./ProductCard";
import AroImage from "@/assets/Aromystper.jpeg";


const featuredProducts = [
  {
    id: "1",
    name: "Amerul Oud",
    description: "Rich, smoky oud tone with Arabic warmth",
    price: 299,
    originalPrice: 399,
    image: AroImage,
    rating: 5.0,
    category: "Woody & Oriental",
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Mogra",
    description: "Pure Indian jasmine aroma, traditional favorite",
    price: 189,
    image: AroImage,
    rating: 4.9,
    category: "Floral & Fresh",
    isBestSeller: true,
  },
  {
    id: "3",
    name: "CR7",
    description: "Sporty, modern, and vibrant masculine scent",
    price: 219,
    originalPrice: 289,
    image: AroImage,
    rating: 4.9,
    category: "Cool & Sporty",
    isBestSeller: true,
  },
  {
    id: "4",
    name: "Chocolate Musk",
    description: "Creamy, sweet blend with musk depth",
    price: 199,
    image: AroImage,
    rating: 4.9,
    category: "Sweet & Musky",
    isNew: true,
  },
  {
    id: "5",
    name: "Green Ajmeri",
    description: "Earthy, classic attar vibe with oud base",
    price: 249,
    image: AroImage,
    rating: 4.9,
    category: "Woody & Oriental",
  },
  {
    id: "6",
    name: "Dove",
    description: "Soft, clean, and refreshing like a morning breeze",
    price: 149,
    image: AroImage,
    rating: 4.8,
    category: "Floral & Fresh",
    isNew: true,
  },
];

export const ProductGrid = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4 gradient-text">
          Featured Collection
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our most beloved fragrances, each crafted to perfection with premium ingredients 
          and designed to leave a lasting impression.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <div key={product.id} className="animate-fade-in">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </section>
  );
};