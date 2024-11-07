'use client'

import { useState } from 'react'
import { AssessmentFormData } from 'app/types/assessment'

interface NutritionSectionProps {
  data: AssessmentFormData
  onUpdate: (data: Partial<AssessmentFormData>) => void
  onNext: () => void
  onBack: () => void
}

const caloricPreferences = [
  { 
    value: 'low_calorie', 
    label: 'Low-calorie', 
    description: 'For weight loss'
  },
  { 
    value: 'maintenance', 
    label: 'Standard calorie', 
    description: 'For weight maintenance'
  },
  { 
    value: 'high_calorie', 
    label: 'High-calorie', 
    description: 'For weight gain'
  }
]

const macroPreferences = [
  { 
    value: 'high_protein', 
    label: 'Higher Protein', 
    description: 'Emphasis on protein-rich foods'
  },
  { 
    value: 'low_carb', 
    label: 'Low Carbohydrate', 
    description: 'Reduced intake of carbs'
  },
  { 
    value: 'balanced', 
    label: 'Balanced Macros', 
    description: 'Equal distribution of nutrients'
  }
]

const mealPrepTimes = [
  { 
    value: 'quick', 
    label: 'Quick and Easy', 
    description: '15-20 minutes'
  },
  { 
    value: 'medium', 
    label: 'Medium Effort', 
    description: '30-45 minutes'
  },
  { 
    value: 'batch', 
    label: 'Batch Cooking', 
    description: 'Meal prepping'
  }
]

const snackTypes = [
  { value: 'sweet', label: 'Sweet Snacks' },
  { value: 'salty', label: 'Salty Snacks' },
  { value: 'high_protein', label: 'High Protein Snacks' },
  { value: 'low_carb', label: 'Low Carb Snacks' }
]

export default function NutritionSection({
  data,
  onUpdate,
  onNext,
  onBack,
}: NutritionSectionProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    if (!data.caloricPreference) {
      newErrors.caloricPreference = 'Please select a caloric preference'
    }
    if (!data.macroPreference) {
      newErrors.macroPreference = 'Please select a macro preference'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Nutritional Needs and Preferences</h2>
        
        {/* Caloric Intake Preference */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What is your preferred caloric intake?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {caloricPreferences.map(({ value, label, description }) => (
              <label
                key={value}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${data.caloricPreference === value 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 hover:border-teal-200'
                  }
                `}
              >
                <input
                  type="radio"
                  name="caloricPreference"
                  value={value}
                  checked={data.caloricPreference === value}
                  onChange={(e) => onUpdate({ caloricPreference: e.target.value })}
                  className="sr-only"
                />
                <div>
                  <div className="font-medium text-gray-900">{label}</div>
                  <div className="text-sm text-gray-500">{description}</div>
                </div>
              </label>
            ))}
          </div>
          {errors.caloricPreference && (
            <p className="mt-1 text-sm text-red-600">{errors.caloricPreference}</p>
          )}
        </div>

        {/* Macro Preferences */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What is your preferred macro distribution?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {macroPreferences.map(({ value, label, description }) => (
              <label
                key={value}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${data.macroPreference === value 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 hover:border-teal-200'
                  }
                `}
              >
                <input
                  type="radio"
                  name="macroPreference"
                  value={value}
                  checked={data.macroPreference === value}
                  onChange={(e) => onUpdate({ macroPreference: e.target.value })}
                  className="sr-only"
                />
                <div>
                  <div className="font-medium text-gray-900">{label}</div>
                  <div className="text-sm text-gray-500">{description}</div>
                </div>
              </label>
            ))}
          </div>
          {errors.macroPreference && (
            <p className="mt-1 text-sm text-red-600">{errors.macroPreference}</p>
          )}
        </div>

        {/* Meal Prep Preferences */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How much time do you want to spend on meal preparation?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mealPrepTimes.map(({ value, label, description }) => (
              <label
                key={value}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${data.mealPrepTime === value 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 hover:border-teal-200'
                  }
                `}
              >
                <input
                  type="radio"
                  name="mealPrepTime"
                  value={value}
                  checked={data.mealPrepTime === value}
                  onChange={(e) => onUpdate({ mealPrepTime: e.target.value })}
                  className="sr-only"
                />
                <div>
                  <div className="font-medium text-gray-900">{label}</div>
                  <div className="text-sm text-gray-500">{description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Snack Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Would you like snack options?
          </label>
          <div className="mb-4">
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="includeSnacks"
                  checked={data.includeSnacks === true}
                  onChange={() => onUpdate({ includeSnacks: true })}
                  className="form-radio text-teal-500 focus:ring-teal-500"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="includeSnacks"
                  checked={data.includeSnacks === false}
                  onChange={() => onUpdate({ includeSnacks: false })}
                  className="form-radio text-teal-500 focus:ring-teal-500"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {data.includeSnacks && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {snackTypes.map(({ value, label }) => (
                <label
                  key={value}
                  className={`
                    flex items-center p-3 rounded-lg border cursor-pointer transition-all
                    ${data.preferredSnacks?.includes(value)
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-200 hover:border-teal-200'
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={data.preferredSnacks?.includes(value) || false}
                    onChange={(e) => {
                      const current = data.preferredSnacks || []
                      const updated = e.target.checked
                        ? [...current, value]
                        : current.filter(s => s !== value)
                      onUpdate({ preferredSnacks: updated })
                    }}
                    className="sr-only"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 px-6 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors"
        >
          Next
        </button>
      </div>
    </form>
  )
}