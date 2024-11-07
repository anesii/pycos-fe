export async function generateHealthPlan(userInput: any, retries: number = 5): Promise<any> {
    const response = await fetch('/api/generatePlan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    if (!response.ok) {
      if (retries > 0) {
        console.warn(`Retrying... Attempts left: ${retries}`);
        return generateHealthPlan(userInput, retries - 1);
      }
      throw new Error('Failed to generate health plan after multiple attempts');
    }
  
    return response.json();
  }