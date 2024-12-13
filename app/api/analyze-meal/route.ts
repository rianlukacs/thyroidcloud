import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  // Check for all required environment variables
  const requiredEnvVars = [
    'OPENAI_API_KEY',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ];

  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:', missingEnvVars.join(', '));
    return NextResponse.json({ error: 'Server configuration error. Missing environment variables.' }, { status: 500 });
  }

  const { meal } = await req.json();
  if (!meal || meal.trim().length === 0) {
    return NextResponse.json({ error: 'Meal description is required' }, { status: 400 });
  }

  // Get the access token from the Authorization header
  const authHeader = req.headers.get('Authorization')
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Create a Supabase client with the token included in the Authorization header
  const supabaseServerClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  );

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert in analyzing meals for thyroid health and have been in the field for 20+ years. Rate meals for women with hypothyroidism or hyperthyroidism on a scale of 0 to 100, where:
            
0-20: Very harmful to thyroid health
21-40: Potentially problematic for thyroid health
41-60: Neutral or mixed impact on thyroid health
61-80: Generally beneficial for thyroid health
81-100: Excellent for thyroid health

Notes for response:
- Fats are not the enemy, sugar is.

Here is the structure I want the answer to be in:

***Rating: xx/100***

**Analysis of the Food**

analysis of the food

**Potential Downsides to the Meal**

bullet list 2 potential things to be careful of in the meal

**Suggestions to Make It Better**

bullet list suggestions to make it better (if the rating is under 70)

Be more lenient in your ratings for meals rich in healthy proteins and fats, as these are generally beneficial for thyroid function. However, be particularly harsh with ratings for meals high in sugar or refined carbohydrates, as these can be especially problematic for thyroid health.

For example:
- A meal with lean protein (like chicken or fish) and healthy fats (like avocado or olive oil) should receive a higher score, even if it's not perfect in all aspects.
- A meal high in sugar (like desserts or sweetened beverages) should receive a very low score, even if it contains some healthy ingredients.

Provide a brief but complete explanation for your rating, including specific impacts on thyroid function. Consider the balance of macronutrients, the presence of thyroid-supportive nutrients (like iodine, selenium, and zinc), and the overall impact on blood sugar levels.

IMPORTANT: Ensure the rating is ALWAYS at the beginning of your response in the format "***Rating: xx/100***". For example, valid ratings could be 14/100, 37/100, 62/100, or 91/100.

Ensure your response is coherent and complete within 300 tokens. Start your response with the precise rating, followed by your analysis.`
          },
          {
            role: 'user',
            content: `Analyze this meal: ${meal}`,
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData?.error?.message || 'OpenAI API error';
      console.error('OpenAI API error:', errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;
    const rating = extractRating(analysis);

    // Get the current user
    const { data: { user } } = await supabaseServerClient.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Store in Supabase
    const { error: supabaseError } = await supabaseServerClient
      .from('analyzed_meals')
      .insert({ meal, analysis, rating, user_id: user.id });

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
    }

    return NextResponse.json({ analysis });
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: error.message || 'An unexpected error occurred.' }, { status: 500 });
  }
}

function extractRating(analysis: string): number {
  const match = analysis.match(/^\*\*\*Rating:\s*(\d+)\/100\*\*\*/);
  return match ? parseInt(match[1]) : 0;
}

