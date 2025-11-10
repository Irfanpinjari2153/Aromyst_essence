import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const products = [
      { name: "Amerul Oud", category: "Woody & Oriental", notes: ["Oud", "Amber", "Musk"], price: 299 },
      { name: "Green Ajmeri", category: "Woody & Oriental", notes: ["Oud", "Earthy", "Woody"], price: 279 },
      { name: "Black Jaguar", category: "Woody & Oriental", notes: ["Woody", "Leather", "Spice"], price: 289 },
      { name: "Tam Dao", category: "Woody & Oriental", notes: ["Sandalwood", "Cedar", "Cypress"], price: 319 },
      { name: "White Oud", category: "Woody & Oriental", notes: ["Oud", "White Musk", "Amber"], price: 329 },
      { name: "Mogra", category: "Floral & Fresh", notes: ["Jasmine", "White Floral"], price: 189 },
      { name: "Dove", category: "Floral & Fresh", notes: ["Fresh", "Clean", "Light"], price: 169 },
      { name: "Charlie", category: "Floral & Fresh", notes: ["Floral", "Modern", "Gentle"], price: 179 },
      { name: "Chocolate Musk", category: "Sweet & Musky", notes: ["Chocolate", "Musk", "Vanilla"], price: 219 },
      { name: "Mitthi", category: "Sweet & Musky", notes: ["Sweet", "Earthy", "Traditional"], price: 199 },
      { name: "Blackberry", category: "Sweet & Musky", notes: ["Berry", "Sweet", "Musk"], price: 209 },
      { name: "Musk Rizali", category: "Sweet & Musky", notes: ["Musk", "Rose", "Amber"], price: 229 },
      { name: "Bare Vanilla", category: "Sweet & Musky", notes: ["Vanilla", "Cream", "Soft"], price: 219 },
      { name: "CR7", category: "Cool & Sporty", notes: ["Citrus", "Fresh", "Woody"], price: 219 },
      { name: "Zatax", category: "Cool & Sporty", notes: ["Fresh", "Spicy", "Aromatic"], price: 239 },
      { name: "Azzaro", category: "Cool & Sporty", notes: ["Citrus", "Lavender", "Spice"], price: 249 },
      { name: "Dior Sauvage", category: "Cool & Sporty", notes: ["Pepper", "Bergamot", "Ambroxan"], price: 349 },
      { name: "Hawas", category: "Cool & Sporty", notes: ["Aquatic", "Citrus", "Woody"], price: 269 }
    ];

    const prompt = `Based on the following quiz answers, recommend the top 3 most suitable fragrances from this list.

Quiz Answers:
${answers.map((a: string, i: number) => `Question ${i + 1}: ${a}`).join('\n')}

Available Products:
${products.map(p => `- ${p.name} (${p.category}): ${p.notes.join(', ')} - $${p.price}`).join('\n')}

Return ONLY a JSON array of 3 products with this exact structure (no markdown, no explanation):
[
  {
    "name": "Product Name",
    "match": "95%",
    "reason": "Brief reason why it matches (max 20 words)",
    "category": "Category Name",
    "price": 299
  }
]`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are a fragrance expert. Return only valid JSON, no markdown formatting.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    let recommendationsText = data.choices[0].message.content.trim();
    
    // Remove markdown code blocks if present
    recommendationsText = recommendationsText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    const recommendations = JSON.parse(recommendationsText);

    return new Response(JSON.stringify({ recommendations }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in get-scent-recommendations:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
