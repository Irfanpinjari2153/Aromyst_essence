import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";

const DiscoverScent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  const questions = [
    {
      question: "What's your preferred time of day?",
      options: ["Morning", "Afternoon", "Evening", "Night"]
    },
    {
      question: "Which season do you love most?",
      options: ["Spring", "Summer", "Fall", "Winter"]
    },
    {
      question: "What's your style personality?",
      options: ["Classic & Elegant", "Bold & Confident", "Casual & Fresh", "Romantic & Dreamy"]
    },
    {
      question: "Which scent family appeals to you?",
      options: ["Floral", "Woody", "Fresh & Aquatic", "Oriental & Spicy"]
    },
    {
      question: "What's your ideal vacation?",
      options: ["Beach Resort", "Mountain Retreat", "City Adventure", "Countryside Escape"]
    }
  ];

  const handleAnswer = async (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz complete - get AI recommendations
      setIsLoading(true);
      setCurrentQuestion(questions.length); // Move to results view
      toast.success("Quiz complete! Calculating your perfect scent...");
      
      try {
        console.log('Invoking get-scent-recommendations with answers:', newAnswers);
        const { data, error } = await supabase.functions.invoke('get-scent-recommendations', {
          body: { answers: newAnswers }
        });

        console.log('Function response - data:', data, 'error:', error);

        if (error) {
          console.error('Function error:', error);
          throw error;
        }
        
        if (!data || !Array.isArray(data.recommendations) || data.recommendations.length === 0) {
          console.error('Invalid or empty data structure:', data);
          throw new Error('Invalid or empty response');
        }

        console.log('Setting recommendations:', data.recommendations);
        setRecommendations(data.recommendations);
        toast.success("Your personalized recommendations are ready!");
      } catch (error) {
        console.error('Error getting recommendations:', error);
        toast.error("Failed to get recommendations. Showing defaults.");
        // Fallback recommendations
        setRecommendations([
          { id: "amerul-oud", name: "Amerul Oud", match: "95%", reason: "Rich and luxurious, perfect for your style", category: "Woody & Oriental", price: 299, image: "/placeholder.svg" },
          { id: "mogra", name: "Mogra", match: "88%", reason: "Elegant floral that matches your preference", category: "Floral & Fresh", price: 189, image: "/placeholder.svg" },
          { id: "cr7", name: "CR7", match: "82%", reason: "Fresh and confident for daily wear", category: "Cool & Sporty", price: 219, image: "/placeholder.svg" }
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
            <Sparkles className="w-4 h-4 text-luxury-gold" />
            <span className="text-sm font-medium text-luxury-silver">Personalized Experience</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            Discover Your Signature Scent
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Take our expert quiz to find fragrances that match your unique personality, 
            style, and preferences.
          </p>
        </div>
      </section>

      {/* Quiz Section */}
      {currentQuestion < questions.length ? (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion) / questions.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-luxury transition-all duration-500"
                style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className="card-luxury animate-fade-in">
            <CardContent className="p-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-8 text-center">
                {questions[currentQuestion].question}
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline-luxury"
                    size="lg"
                    className="h-auto py-6 text-lg justify-between group"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          {currentQuestion > 0 && (
            <div className="text-center mt-6">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setCurrentQuestion(currentQuestion - 1);
                  setAnswers(answers.slice(0, -1));
                }}
              >
                ← Back
              </Button>
            </div>
          )}
        </section>
      ) : (
        /* Results Section */
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {isLoading ? (
            <div className="text-center py-20">
              <Loader2 className="w-16 h-16 animate-spin text-luxury-gold mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">Analyzing your preferences...</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                  <Sparkles className="w-10 h-10 text-foreground" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 gradient-text">
                  Your Perfect Matches
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Based on your preferences, we recommend these exquisite fragrances
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {recommendations.map((rec, index) => (
                  <Card key={index} className="card-luxury text-center animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                    <CardContent className="p-6">
                      <div className="w-full h-48 bg-gradient-to-br from-luxury-blue/20 to-luxury-gold/20 rounded-xl mb-4" />
                      <h3 className="font-serif text-xl font-semibold mb-2">{rec.name}</h3>
                      <div className="text-luxury-gold font-bold text-2xl mb-2">{rec.match} Match</div>
                      <p className="text-sm text-muted-foreground mb-3">{rec.reason}</p>
                      <p className="text-lg font-bold gradient-text mb-4">₹{rec.price}</p>
                      <Button 
                        variant="luxury" 
                        size="sm" 
                        className="w-full"
                        onClick={() => addToCart({
                          id: rec.id,
                          name: rec.name,
                          price: rec.price,
                          image: rec.image,
                          category: rec.category,
                          variant: 'EDT'
                        })}
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center space-y-4">
                <Button variant="luxury" size="lg">
                  Save My Results
                </Button>
                <div>
                  <Button variant="ghost" onClick={resetQuiz}>
                    Retake Quiz
                  </Button>
                </div>
              </div>
            </>
          )}
        </section>
      )}

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Personalized", desc: "Get recommendations tailored to your unique preferences" },
            { title: "Expert Curation", desc: "Algorithm developed by master perfumers" },
            { title: "Save Time", desc: "Skip the guesswork and find your scent faster" }
          ].map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-luxury-gold" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DiscoverScent;
