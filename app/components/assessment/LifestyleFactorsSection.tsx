'use client'

import { useState } from 'react'
import { AssessmentFormData } from 'app/types/assessment'

interface LifestyleFactorsSectionProps {
  data: AssessmentFormData
  onUpdate: (data: Partial<AssessmentFormData>) => void
  onNext: () => void
  onBack: () => void
}

const occupationTypes = [
  { 
    value: 'desk_job', 
    label: 'Desk Job', 
    description: 'Sedentary work environment'
  },
  { 
    value: 'active_job', 
    label: 'Active Job', 
    description: 'On your feet often'
  },
  { 
    value: 'shift_work', 
    label: 'Shift Work', 
    description: 'Irregular hours'
  }
]

const cookingPreferences = [
  { 
    value: 'enjoy_cooking', 
    label: 'I enjoy cooking', 
    description: 'Happy to spend time in the kitchen'
  },
  { 
    value: 'minimal_cooking', 
    label: 'Minimal cooking', 
    description: 'Prefer quick and simple meals'
  },
  { 
    value: 'pre_prepared', 
    label: 'Pre-prepared meals', 
    description: 'Rely on ready-made options'
  }
]

const shoppingFrequencies = [
  { value: 'daily', label: 'Daily' },
  { value: 'few_days', label: 'Every few days' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'online', label: 'I order groceries online' }
]

const budgetLevels = [
  { 
    value: 'low', 
    label: 'Budget-conscious', 
    description: 'Focus on cost-effective options'
  },
  { 
    value: 'medium', 
    label: 'Moderate', 
    description: 'Standard variety of meals'
  },
  { 
    value: 'high', 
    label: 'Premium', 
    description: 'Organic and specialty ingredients'
  }
]

export default function LifestyleFactorsSection({
  data,
  onUpdate,
  onNext,
  onBack,
}: LifestyleFactorsSectionProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    if (!data.occupationType) {
      newErrors.occupationType = 'Please select your occupation type'
    }
    if (!data.cookingPreference) {
      newErrors.cookingPreference = 'Please select your cooking preference'
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
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Lifestyle Factors</h2>
        
        {/* Occupation Type */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What type of occupation do you have?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {occupationTypes.map(({ value, label, description }) => (
              <label
                key={value}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${data.occupationType === value 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 hover:border-teal-200'
                  }
                `}
              >
                <input
                  type="radio"
                  name="occupationType"
                  value={value}
                  checked={data.occupationType === value}
                  onChange={(e) => onUpdate({ occupationType: e.target.value })}
                  className="sr-only"
                />
                <div>
                  <div className="font-medium text-gray-900">{label}</div>
                  <div className="text-sm text-gray-500">{description}</div>
                </div>
              </label>
            ))}
          </div>
          {errors.occupationType && (
            <p className="mt-1 text-sm text-red-600">{errors.occupationType}</p>
          )}
        </div>

        {/* Cooking Preferences */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What are your cooking preferences?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cookingPreferences.map(({ value, label, description }) => (
              <label
                key={value}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${data.cookingPreference === value 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 hover:border-teal-200'
                  }
                `}
              >
                <input
                  type="radio"
                  name="cookingPreference"
                  value={value}
                  checked={data.cookingPreference === value}
                  onChange={(e) => onUpdate({ cookingPreference: e.target.value })}
                  className="sr-only"
                />
                <div>
                  <div className="font-medium text-gray-900">{label}</div>
                  <div className="text-sm text-gray-500">{description}</div>
                </div>
              </label>
            ))}
          </div>
          {errors.cookingPreference && (
            <p className="mt-1 text-sm text-red-600">{errors.cookingPreference}</p>
          )}
        </div>

        {/* Shopping Frequency */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How often do you grocery shop?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {shoppingFrequencies.map(({ value, label }) => (
              <label
                key={value}
                className={`
                  flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer
                  ${data.shoppingFrequency === value
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-teal-200'
                  }
                `}
              >
                <input
                  type="radio"
                  name="shoppingFrequency"
                  value={value}
                  checked={data.shoppingFrequency === value}
                  onChange={(e) => onUpdate({ shoppingFrequency: e.target.value })}
                  className="sr-only"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Budget Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What is your food budget level?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {budgetLevels.map(({ value, label, description }) => (
              <label
                key={value}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${data.budgetLevel === value 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 hover:border-teal-200'
                  }
                `}
              >
                <input
                  type="radio"
                  name="budgetLevel"
                  value={value}
                  checked={data.budgetLevel === value}
                  onChange={(e) => onUpdate({ budgetLevel: e.target.value })}
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

        {/* Meal Schedule Flexibility */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How flexible is your meal schedule?
          </label>
          <textarea
            value={data.mealScheduleFlexibility || ''}
            onChange={(e) => onUpdate({ mealScheduleFlexibility: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500"
            rows={3}
            placeholder="Describe your typical meal timing and any constraints..."
          />
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