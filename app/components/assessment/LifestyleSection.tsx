'use client'

import { useState } from 'react'
import { AssessmentFormData, ActivityLevel } from 'app/types/assessment'

interface LifestyleSectionProps {
  data: AssessmentFormData
  onUpdate: (data: Partial<AssessmentFormData>) => void
  onNext: () => void
  onBack: () => void
}

const activityLevels: { value: ActivityLevel; label: string; description: string }[] = [
  { 
    value: 'sedentary', 
    label: 'Sedentary', 
    description: 'Little to no exercise'
  },
  { 
    value: 'lightly_active', 
    label: 'Lightly Active', 
    description: 'Light exercise 1-2 times per week'
  },
  { 
    value: 'moderately_active', 
    label: 'Moderately Active', 
    description: 'Moderate exercise 3-4 times per week'
  },
  { 
    value: 'very_active', 
    label: 'Very Active', 
    description: 'Intense exercise 5-6 times per week'
  },
  { 
    value: 'athlete', 
    label: 'Athlete', 
    description: 'High-intensity training daily'
  }
]

const exerciseTypes = [
  'Walking',
  'Running',
  'Yoga/Pilates',
  'Strength training',
  'HIIT',
  'Cycling',
  'Swimming',
  'Dancing'
]

const sleepDurations = [
  { value: 'less_than_5', label: 'Less than 5 hours' },
  { value: '5_to_7', label: '5-7 hours' },
  { value: '7_to_9', label: '7-9 hours' },
  { value: 'more_than_9', label: 'More than 9 hours' }
]

const sleepQualities = [
  { value: 'poor', label: 'Poor' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'good', label: 'Good' },
  { value: 'excellent', label: 'Excellent' }
]

export default function LifestyleSection({
  data,
  onUpdate,
  onNext,
  onBack,
}: LifestyleSectionProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    if (!data.activityLevel) {
      newErrors.activityLevel = 'Please select your activity level'
    }
    if (!data.preferredExercises || data.preferredExercises.length === 0) {
      newErrors.exercises = 'Please select at least one exercise type'
    }
    if (!data.sleepDuration) {
      newErrors.sleepDuration = 'Please select your sleep duration'
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
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Lifestyle Choices</h2>
        
        {/* Activity Level */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What is your activity level?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activityLevels.map(({ value, label, description }) => (
              <label
                key={value}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${data.activityLevel === value 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 hover:border-teal-200'
                  }
                `}
              >
                <input
                  type="radio"
                  name="activityLevel"
                  value={value}
                  checked={data.activityLevel === value}
                  onChange={(e) => onUpdate({ activityLevel: e.target.value as ActivityLevel })}
                  className="sr-only"
                />
                <div>
                  <div className="font-medium text-gray-900">{label}</div>
                  <div className="text-sm text-gray-500">{description}</div>
                </div>
              </label>
            ))}
          </div>
          {errors.activityLevel && (
            <p className="mt-1 text-sm text-red-600">{errors.activityLevel}</p>
          )}
        </div>

        {/* Exercise Types */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What types of exercise do you prefer? (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {exerciseTypes.map((exercise) => (
              <label
                key={exercise}
                className={`
                  flex items-center p-3 rounded-lg border cursor-pointer transition-all
                  ${data.preferredExercises?.includes(exercise)
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-teal-200'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={data.preferredExercises?.includes(exercise) || false}
                  onChange={(e) => {
                    const current = data.preferredExercises || []
                    const updated = e.target.checked
                      ? [...current, exercise]
                      : current.filter(ex => ex !== exercise)
                    onUpdate({ preferredExercises: updated })
                  }}
                  className="sr-only"
                />
                <span>{exercise}</span>
              </label>
            ))}
          </div>
          {errors.exercises && (
            <p className="mt-1 text-sm text-red-600">{errors.exercises}</p>
          )}
        </div>

        {/* Sleep Pattern */}
        <div className="space-y-6">
          {/* Sleep Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Average hours of sleep per night
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sleepDurations.map(({ value, label }) => (
                <label
                  key={value}
                  className={`
                    flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer
                    ${data.sleepDuration === value
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-200 hover:border-teal-200'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="sleepDuration"
                    value={value}
                    checked={data.sleepDuration === value}
                    onChange={(e) => onUpdate({ sleepDuration: e.target.value })}
                    className="sr-only"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sleep Quality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How would you rate your sleep quality?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sleepQualities.map(({ value, label }) => (
                <label
                  key={value}
                  className={`
                    flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer
                    ${data.sleepQuality === value
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-200 hover:border-teal-200'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="sleepQuality"
                    value={value}
                    checked={data.sleepQuality === value}
                    onChange={(e) => onUpdate({ sleepQuality: e.target.value })}
                    className="sr-only"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Stress Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What is your current stress level?
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="1"
                max="5"
                value={data.stressLevel || 1}
                onChange={(e) => onUpdate({ stressLevel: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <span className="text-sm text-gray-600 min-w-[4rem]">
                Level {data.stressLevel || 1}/5
              </span>
            </div>
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