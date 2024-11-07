import { NextResponse } from 'next/server';
import { GeminiClient } from 'gemini-api';


export async function POST(request: Request) {
  const { userInput } = await request.json();

  //const apiUrl = 'https://generativelanguage.googleapis.com'; // Replace with the actual Gemini API endpoint
  const apiKey = process.env.GEMINI_API_KEY; // Ensure you have your API key stored in environment variables

  console.log('API Key:', apiKey); // Log the API key for verification

  try {
    const response = await fetch('/api/generatePlan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: `Generate a health plan for the is user based on the following input: ${JSON.stringify(userInput)}. 
        Take into account the food preferences and in a tabular form, generate meals based on how many times the user eats in a day (breakfast, lunch or dinner) and also add in snacks. 
        These meals should be between 1000 and 2000 calories and rich in protein. For every plan, generate meals for 30 days based on foods the user has chosen from the Food Preferences dropdown.
        Based on the user's activity level, suggest exercises or movements (yoga or pliates) that the user can do and attach links to public youtube videos. 
        These videos should be at least 10 and at most 30. 
        Take into account the PCOS symptoms the user encounters (acne, facial hair, irregular preiod, etc.) and suggest supplements that helps for each. 
        Please use research papers and proven facts to generate these.`,
        format: 'json', // Ensure the output is in JSON format
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate health plan');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error generating health plan:', error);
    return NextResponse.json({ error: 'Failed to generate health plan' }, { status: 500 });
  }
}