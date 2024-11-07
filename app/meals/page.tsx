'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MealsPage() {
  const [mealPlan, setMealPlan] = useState<any>(null); // Replace 'any' with your meal plan type
  const router = useRouter();

  useEffect(() => {
    // Fetch the meal plan from local storage or an API
    const storedMealPlan = localStorage.getItem('mealPlan'); // Assuming you store the plan in local storage
    if (storedMealPlan) {
      setMealPlan(JSON.parse(storedMealPlan));
    }
  }, []);

  const handleGeneratePlan = () => {
    router.push('/assessment'); // Redirect to the Symptom Assessment page
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Meal Plans</h1>

      {mealPlan ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Generated Meal Plan</h2>
          <ul className="space-y-4">
            {mealPlan.map((meal: any, index: number) => ( // Replace 'any' with your meal type
              <li key={index} className="border-b pb-2">
                <h3 className="font-medium">{meal.name}</h3>
                <p>{meal.description}</p>
                <p className="text-sm text-gray-500">Ingredients: {meal.ingredients.join(', ')}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">No Meal Plan Generated</h2>
          <p className="mb-4">You need to generate a meal plan first.</p>
          <button
            onClick={handleGeneratePlan}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Go to Symptom Assessment
          </button>
        </div>
      )}
    </div>
  );
}