'use client'

import { useState } from 'react'
import { AssessmentFormData, DietType } from 'app/types/assessment'

interface DietarySectionProps {
  data: AssessmentFormData
  onUpdate: (data: Partial<AssessmentFormData>) => void
  onNext: () => void
  onBack: () => void
}

const dietTypes: { value: DietType; label: string }[] = [
  { value: 'omnivore', label: 'Omnivore' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'pescatarian', label: 'Pescatarian' },
  { value: 'keto', label: 'Keto' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'mediterranean', label: 'Mediterranean' }
]

const restrictions = [
  { value: 'gluten-free', label: 'Gluten-free' },
  { value: 'dairy-free', label: 'Dairy-free' },
  { value: 'nut-free', label: 'Nut-free' },
  { value: 'soy-free', label: 'Soy-free' }
]

const mealTimings = [
  { value: '2', label: '2 meals per day' },
  { value: '3', label: '3 meals per day' },
  { value: '4', label: '4 meals per day' },
  { value: '5', label: '5 meals per day' }
]

export default function DietarySection({
  data,
  onUpdate,
  onNext,
  onBack,
}: DietarySectionProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    if (!data.dietType) {
      newErrors.dietType = 'Please select a diet type'
    }
    if (!data.mealsPerDay) {
      newErrors.mealsPerDay = 'Please select number of meals per day'
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
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Dietary Preferences</h2>
        
        {/* Diet Type */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What type of diet do you follow?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {dietTypes.map(({ value, label }) => (
              <label
                key={value}
                className={`
                  flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer
                  ${data.dietType === value 
                    ? 'border-teal-500 bg-teal-50 text-teal-700' 
                    : 'border-gray-200 hover:border-teal-200'
                  }
                `}
              >
                <input
                  type="radio"
                  name="dietType"
                  value={value}
                  checked={data.dietType === value}
                  onChange={(e) => onUpdate({ dietType: e.target.value as DietType })}
                  className="sr-only"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
          {errors.dietType && (
            <p className="mt-1 text-sm text-red-600">{errors.dietType}</p>
          )}
        </div>

        {/* Dietary Restrictions */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Do you have any dietary restrictions? (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {restrictions.map(({ value, label }) => (
              <label key={value} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={data.restrictions?.includes(value) || false}
                  onChange={(e) => {
                    const current = data.restrictions || []
                    const updated = e.target.checked
                      ? [...current, value]
                      : current.filter(r => r !== value)
                    onUpdate({ restrictions: updated })
                  }}
                  className="form-checkbox text-teal-500 focus:ring-teal-500"
                />
                <span className="ml-2">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Meals Per Day */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How many meals do you prefer per day?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {mealTimings.map(({ value, label }) => (
              <label
                key={value}
                className={`
                  flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer
                  ${data.mealsPerDay === parseInt(value)
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-teal-200'
                  }
                `}
              >
                <input
                  type="radio"
                  name="mealsPerDay"
                  value={value}
                  checked={data.mealsPerDay === parseInt(value)}
                  onChange={(e) => onUpdate({ mealsPerDay: parseInt(e.target.value) })}
                  className="sr-only"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
          {errors.mealsPerDay && (
            <p className="mt-1 text-sm text-red-600">{errors.mealsPerDay}</p>
          )}
        </div>

        {/* Food Preferences */}
        <div className="space-y-6">
          <div>
            <label htmlFor="favoriteFoods" className="block text-sm font-medium text-gray-700 mb-2">
              What are your favorite foods?
            </label>
            <textarea
              id="favoriteFoods"
              value={data.favoriteFoods?.join(', ') || ''}
              onChange={(e) => onUpdate({ 
                favoriteFoods: e.target.value.split(',').map(s => s.trim()) 
              })}
              placeholder="Enter your favorite foods, separated by commas"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="foodsToAvoid" className="block text-sm font-medium text-gray-700 mb-2">
              Are there any foods you dislike or want to avoid?
            </label>
            <textarea
              id="foodsToAvoid"
              value={data.foodsToAvoid?.join(', ') || ''}
              onChange={(e) => onUpdate({ 
                foodsToAvoid: e.target.value.split(',').map(s => s.trim()) 
              })}
              placeholder="Enter foods to avoid, separated by commas"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500"
              rows={3}
            />
          </div>
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