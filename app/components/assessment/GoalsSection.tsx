'use client'

import { useState } from 'react'
import { AssessmentFormData } from 'app/types/assessment'

interface GoalsSectionProps {
  data: AssessmentFormData
  onUpdate: (data: Partial<AssessmentFormData>) => void
  onNext: () => void
  onBack: () => void
}

type PrimaryGoal = {
    value: AssessmentFormData['primaryGoal'];
    label: string;
  }
  
  type TimeFrame = {
    value: AssessmentFormData['timeframe'];
    label: string;
    description: string;
  }
  
  type ShortTermGoal = {
    value: string;
    label: string;
  }

const primaryGoals = [
  { value: 'weight_loss', label: 'Weight Loss' },
  { value: 'weight_maintenance', label: 'Weight Maintenance' },
  { value: 'muscle_gain', label: 'Muscle Gain' },
  { value: 'hormonal_balance', label: 'Improve Hormonal Balance' },
  { value: 'manage_symptoms', label: 'Manage PCOS Symptoms' }
] as const;

const shortTermGoals = [
  { value: 'lose_weight', label: 'Lose Weight' },
  { value: 'increase_energy', label: 'Increase Energy' },
  { value: 'improve_sleep', label: 'Improve Sleep' },
  { value: 'reduce_symptoms', label: 'Reduce PCOS Symptoms' },
  { value: 'build_strength', label: 'Build Strength' }
]

const timeframes = [
  { value: 'short_term', label: 'Short-term', description: 'Within 3 months' },
  { value: 'mid_term', label: 'Mid-term', description: '3-6 months' },
  { value: 'long_term', label: 'Long-term', description: '6+ months' }
] as const;

export default function GoalsSection({
  data,
  onUpdate,
  onNext,
  onBack,
}: GoalsSectionProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    if (!data.primaryGoal) {
      newErrors.primaryGoal = 'Please select a primary goal'
    }
    if (!data.timeframe) {
      newErrors.timeframe = 'Please select a timeframe'
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
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Health and Fitness Goals</h2>
        
        {/* Primary Goal */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What is your primary health goal?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {primaryGoals.map(({ value, label }) => (
              <label
                key={value}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${(data.primaryGoal || '') === value 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 hover:border-teal-200'
                  }
                `}
              >
                <input
                  type="radio"
                  name="primaryGoal"
                  value={value}
                  checked={data.primaryGoal === value}
                  onChange={(e) => onUpdate({ primaryGoal: e.target.value as AssessmentFormData['primaryGoal']})}
                  className="sr-only"
                />
                <span className="font-medium text-gray-900">{label}</span>
              </label>
            ))}
          </div>
          {errors.primaryGoal && (
            <p className="mt-1 text-sm text-red-600">{errors.primaryGoal}</p>
          )}
        </div>

        {/* Weight Goal */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Target Weight Goal (kg)
          </label>
          <input
            type="number"
            value={data.targetWeight || ''}
            onChange={(e) => onUpdate({ targetWeight: parseFloat(e.target.value) })}
            className="w-full md:w-1/3 rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500"
            placeholder="Enter target weight"
          />
        </div>

        {/* Short-term Goals */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What short-term goals would you like to achieve? (Select all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {shortTermGoals.map(({ value, label }) => (
              <label
                key={value}
                className={`
                  flex items-center p-3 rounded-lg border cursor-pointer transition-all
                  ${data.shortTermGoals?.includes(value)
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-teal-200'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={data.shortTermGoals?.includes(value) || false}
                  onChange={(e) => {
                    const current = data.shortTermGoals || []
                    const updated = e.target.checked
                      ? [...current, value]
                      : current.filter(g => g !== value)
                    onUpdate({ shortTermGoals: updated })
                  }}
                  className="sr-only"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Timeframe */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What is your preferred timeframe for achieving these goals?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {timeframes.map(({ value, label, description }) => (
              <label
                key={value}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${data.timeframe === value 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 hover:border-teal-200'
                  }
                `}
              >
                <input
                  type="radio"
                  name="timeframe"
                  value={value}
                  checked={data.timeframe === value}
                  onChange={(e) => onUpdate({ timeframe: e.target.value as AssessmentFormData['timeframe']})}
                  className="sr-only"
                />
                <div>
                  <div className="font-medium text-gray-900">{label}</div>
                  <div className="text-sm text-gray-500">{description}</div>
                </div>
              </label>
            ))}
          </div>
          {errors.timeframe && (
            <p className="mt-1 text-sm text-red-600">{errors.timeframe}</p>
          )}
        </div>

        {/* Long-term Vision */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What is your long-term vision for your health? (Optional)
          </label>
          <textarea
            value={data.longTermVision || ''}
            onChange={(e) => onUpdate({ longTermVision: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500"
            rows={4}
            placeholder="Describe your long-term health and wellness goals..."
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