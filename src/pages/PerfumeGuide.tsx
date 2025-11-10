import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Droplets, Clock, Sparkles, Heart, Wind } from "lucide-react";

const PerfumeGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
            <BookOpen className="w-4 h-4 text-luxury-gold" />
            <span className="text-sm font-medium text-luxury-silver">Expert Knowledge</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            The Art of Fragrance Making
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the ancient craft of perfume and attar making, from traditional distillation 
            methods to modern techniques that create the fragrances you love.
          </p>
        </div>
      </section>

      {/* The Making Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-12 text-center gradient-text">
          Traditional Attar Making Process
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="card-luxury">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-luxury-gold">1</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-3">Hydro-Distillation</h3>
                  <p className="text-muted-foreground">
                    Fresh flowers, herbs, or wood are placed in copper vessels (deg) with water. 
                    As heat is applied, steam carries the aromatic compounds through a bamboo pipe 
                    into a receiving vessel containing sandalwood oil.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-luxury">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-luxury-gold">2</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-3">Slow Infusion</h3>
                  <p className="text-muted-foreground">
                    The fragrant steam condenses and infuses into the base oil over 12-15 hours. 
                    This slow, gentle process preserves delicate aromatics that would be destroyed 
                    by harsh extraction methods.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-luxury">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-luxury-gold">3</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-3">Multiple Distillations</h3>
                  <p className="text-muted-foreground">
                    The process is repeated multiple times with fresh botanicals added to the same 
                    base oil. Each distillation deepens and enriches the fragrance, building 
                    complexity over days or weeks.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-luxury">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-luxury-gold">4</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-3">Aging & Maturation</h3>
                  <p className="text-muted-foreground">
                    Like fine wine, attar is aged in leather or camel bone containers for months 
                    to years. This maturation allows the notes to marry and develop their full 
                    character, creating a harmonious, long-lasting fragrance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="card-luxury text-center max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl font-bold mb-4 text-luxury-gold">
            Why Traditional Attar is Special
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Unlike modern perfumes that use alcohol as a carrier, traditional attar is completely 
            alcohol-free and uses natural oils as the base. This makes it longer-lasting on the skin, 
            gentler for sensitive skin, and allows the fragrance to evolve uniquely with your body 
            chemistry. The labor-intensive process and use of premium natural ingredients make each 
            attar a true artisanal treasure.
          </p>
        </div>
      </section>

      {/* Modern Perfume Making */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-r from-luxury-blue/10 to-luxury-gold/10 rounded-3xl">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-12 text-center gradient-text">
          Modern Perfume Creation
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="card-product">
            <CardContent className="p-8">
              <h3 className="font-serif text-xl font-semibold mb-4">The Perfumer's Art</h3>
              <p className="text-muted-foreground mb-4">
                Modern perfumers, or "noses," blend natural essential oils with synthetic molecules 
                to create complex fragrances. With access to over 3,000 raw materials, they craft 
                scents that can evoke memories, emotions, and experiences.
              </p>
              <p className="text-muted-foreground">
                Creating a perfume can take months to years, with hundreds of trials before 
                achieving the perfect balance. The perfumer must consider how the fragrance will 
                evolve from top notes through heart to base, ensuring each stage is captivating.
              </p>
            </CardContent>
          </Card>

          <Card className="card-product">
            <CardContent className="p-8">
              <h3 className="font-serif text-xl font-semibold mb-4">Extraction Methods</h3>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <strong className="text-foreground">Steam Distillation:</strong> Similar to traditional 
                  attar making but on an industrial scale, used for hardy materials like lavender and rosemary.
                </div>
                <div>
                  <strong className="text-foreground">Solvent Extraction:</strong> Delicate flowers like 
                  jasmine and tuberose are extracted using solvents to preserve their precious aromatics.
                </div>
                <div>
                  <strong className="text-foreground">CO2 Extraction:</strong> Modern technique using 
                  pressurized carbon dioxide to extract pure, vibrant essential oils without heat damage.
                </div>
                <div>
                  <strong className="text-foreground">Expression:</strong> For citrus fruits, oils are 
                  mechanically pressed from the peel, capturing bright, fresh notes.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Understanding Fragrance Notes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-12 text-center">
          Understanding Fragrance Notes
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="card-luxury">
            <CardContent className="p-8 text-center">
              <Wind className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-semibold mb-3">Top Notes</h3>
              <p className="text-muted-foreground mb-4">
                The first impression - light, fresh scents that evaporate quickly (5-15 minutes)
              </p>
              <div className="text-sm text-luxury-gold">
                Citrus • Herbs • Light Fruits
              </div>
            </CardContent>
          </Card>

          <Card className="card-luxury">
            <CardContent className="p-8 text-center">
              <Heart className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-semibold mb-3">Heart Notes</h3>
              <p className="text-muted-foreground mb-4">
                The soul of the fragrance - emerges after top notes fade (20 minutes - 1 hour)
              </p>
              <div className="text-sm text-luxury-gold">
                Florals • Spices • Green Notes
              </div>
            </CardContent>
          </Card>

          <Card className="card-luxury">
            <CardContent className="p-8 text-center">
              <Droplets className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-semibold mb-3">Base Notes</h3>
              <p className="text-muted-foreground mb-4">
                The foundation - rich, deep scents that last for hours (4-6+ hours)
              </p>
              <div className="text-sm text-luxury-gold">
                Woods • Musk • Vanilla • Amber
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Perfume Concentrations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-r from-luxury-blue/10 to-luxury-gold/10 rounded-3xl">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-12 text-center gradient-text">
          Perfume Concentrations
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            { name: "Parfum (Pure Perfume)", concentration: "20-30%", duration: "6-8 hours", description: "Most concentrated, longest lasting, most expensive" },
            { name: "Eau de Parfum (EDP)", concentration: "15-20%", duration: "4-6 hours", description: "Great balance of longevity and price" },
            { name: "Eau de Toilette (EDT)", concentration: "5-15%", duration: "2-4 hours", description: "Lighter, perfect for daily wear" },
            { name: "Eau de Cologne (EDC)", concentration: "2-5%", duration: "1-2 hours", description: "Fresh, light, ideal for hot weather" }
          ].map((type, index) => (
            <Card key={index} className="card-product">
              <CardContent className="p-6">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-semibold mb-2">{type.name}</h3>
                    <p className="text-muted-foreground">{type.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-luxury-gold font-bold">{type.concentration}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {type.duration}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Application Tips */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-12 text-center">
          How to Apply Perfume
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Sparkles, title: "Pulse Points", tip: "Apply to wrists, neck, behind ears, and inner elbows where blood vessels are close to skin" },
            { icon: Droplets, title: "Don't Rub", tip: "Spray or dab - don't rub as it breaks down molecules and alters the scent" },
            { icon: Clock, title: "Timing Matters", tip: "Apply right after shower when pores are open for better absorption" },
            { icon: Heart, title: "Layer Wisely", tip: "Use matching body lotion first to help fragrance last longer" },
            { icon: Wind, title: "Distance", tip: "Hold bottle 5-7 inches away for even distribution" },
            { icon: BookOpen, title: "Less is More", tip: "Start with 2-3 sprays and adjust based on fragrance strength" }
          ].map((tip, index) => (
            <Card key={index} className="card-product text-center">
              <CardContent className="p-6">
                <tip.icon className="w-10 h-10 text-luxury-gold mx-auto mb-4" />
                <h3 className="font-serif text-lg font-semibold mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.tip}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Storage Tips */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="card-luxury max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold mb-6 gradient-text">
            Proper Storage
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Protect your investment by storing perfumes correctly. Keep them in a cool, 
            dark place away from direct sunlight, heat, and humidity. Original boxes 
            provide extra protection.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-2xl mb-2">🌡️</div>
              <div className="font-semibold mb-1">Temperature</div>
              <div className="text-muted-foreground">15-20°C (59-68°F)</div>
            </div>
            <div>
              <div className="text-2xl mb-2">☀️</div>
              <div className="font-semibold mb-1">Light Exposure</div>
              <div className="text-muted-foreground">Avoid direct sunlight</div>
            </div>
            <div>
              <div className="text-2xl mb-2">💧</div>
              <div className="font-semibold mb-1">Humidity</div>
              <div className="text-muted-foreground">Keep away from bathroom</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h2 className="font-serif text-3xl font-bold mb-4">Ready to Find Your Signature Scent?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Use your newfound knowledge to explore our collection and discover the perfect fragrance for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="luxury" size="lg" onClick={() => window.location.href = '/collections'}>
            Explore Collection
          </Button>
          <Button variant="outline-luxury" size="lg" onClick={() => window.location.href = '/discover-scent'}>
            Take Scent Quiz
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PerfumeGuide;
