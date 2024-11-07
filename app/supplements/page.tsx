'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const supplementData = [
  {
    symptom: 'Irregular Periods',
    supplement: 'Inositol',
    dosage: '2000 mg daily',
  },
  {
    symptom: 'Weight Gain',
    supplement: 'Omega-3',
    dosage: '1000 mg daily',
  },
  {
    symptom: 'Fatigue',
    supplement: 'Vitamin D',
    dosage: '1000 IU daily',
  },
  {
    symptom: 'Insulin Resistance',
    supplement: 'Chromium',
    dosage: '200 mcg daily',
  },
  // Add more supplements as needed
];

export default function SupplementsPage() {
  const [hasPlan, setHasPlan] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedMealPlan = localStorage.getItem('mealPlan');
    if (storedMealPlan) {
      setHasPlan(true);
    }
  }, []);

  const handleGeneratePlan = () => {
    router.push('/assessment'); // Redirect to the Symptom Assessment page
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Supplements</h1>

      {!hasPlan ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">No Health Plan Generated</h2>
          <p className="mb-4">You need to generate a health plan first.</p>
          <button
            onClick={handleGeneratePlan}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Go to Symptom Assessment
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recommended Supplements</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PCOS Symptom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {supplementData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.symptom}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.supplement}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.dosage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}