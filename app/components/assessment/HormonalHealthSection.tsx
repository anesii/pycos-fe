'use client'

import { useState } from 'react'
import { AssessmentFormData } from 'app/types/assessment'

interface HormonalHealthSectionProps {
  data: AssessmentFormData
  onUpdate: (data: Partial<AssessmentFormData>) => void
  onNext: () => void
  onBack: () => void
}

const menstrualSymptoms = [
  { value: 'irregular_periods', label: 'Irregular Periods' },
  { value: 'heavy_periods', label: 'Heavy Periods' },
  { value: 'painful_periods', label: 'Painful Periods' },
  { value: 'spotting', label: 'Spotting Between Periods' },
  { value: 'absent_periods', label: 'Absent Periods' },
  { value: 'mood_changes', label: 'Mood Changes' },
  { value: 'bloating', label: 'Bloating' },
  { value: 'cramps', label: 'Cramps' }
]

const hormonalSymptoms = [
  { value: 'acne', label: 'Acne' },
  { value: 'hair_loss', label: 'Hair Loss' },
  { value: 'hirsutism', label: 'Excess Hair Growth' },
  { value: 'weight_gain', label: 'Weight Gain' },
  { value: 'fatigue', label: 'Fatigue' },
  { value: 'anxiety', label: 'Anxiety' },
  { value: 'depression', label: 'Depression' },
  { value: 'insomnia', label: 'Sleep Issues' }
]

const cycleRegularity = [
  { 
    value: 'regular', 
    label: 'Regular', 
    description: '21-35 days consistently'
  },
  { 
    value: 'somewhat_irregular', 
    label: 'Somewhat Irregular', 
    description: 'Varies by a few days'
  },
  { 
    value: 'very_irregular', 
    label: 'Very Irregular', 
    description: 'Unpredictable cycles'
  },
  { 
    value: 'absent', 
    label: 'Absent', 
    description: 'No periods for 3+ months'
  }
]

export default function HormonalHealthSection({
  data,
  onUpdate,
  onNext,
  onBack,
}: HormonalHealthSectionProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    if (!data.cycleRegularity) {
      newErrors.cycleRegularity = 'Please select your cycle regularity'
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
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Hormonal Health Assessment</h2>
        
        {/* Cycle Regularity */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How would you describe your menstrual cycle regularity?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cycleRegularity.map(({ value, label, description }) => (
              <label
                key={value}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${data.cycleRegularity === value 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 hover:border-teal-200'
                  }
                `}
              >
                <input
                  type="radio"
                  name="cycleRegularity"
                  value={value}
                  checked={data.cycleRegularity === value}
                  onChange={(e) => onUpdate({ cycleRegularity: e.target.value })}
                  className="sr-only"
                />
                <div>
                  <div className="font-medium text-gray-900">{label}</div>
                  <div className="text-sm text-gray-500">{description}</div>
                </div>
              </label>
            ))}
          </div>
          {errors.cycleRegularity && (
            <p className="mt-1 text-sm text-red-600">{errors.cycleRegularity}</p>
          )}
        </div>

        {/* Cycle Length */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Average cycle length (in days)
          </label>
          <input
            type="number"
            value={data.cycleLength || ''}
            onChange={(e) => onUpdate({ cycleLength: parseInt(e.target.value) })}
            className="w-full md:w-1/3 rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500"
            placeholder="e.g., 28"
            min="1"
            max="90"
          />
        </div>

        {/* Menstrual Symptoms */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Which menstrual symptoms do you experience? (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {menstrualSymptoms.map(({ value, label }) => (
              <label
                key={value}
                className={`
                  flex items-center p-3 rounded-lg border cursor-pointer transition-all
                  ${data.menstrualSymptoms?.includes(value)
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-teal-200'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={data.menstrualSymptoms?.includes(value) || false}
                  onChange={(e) => {
                    const current = data.menstrualSymptoms || []
                    const updated = e.target.checked
                      ? [...current, value]
                      : current.filter(s => s !== value)
                    onUpdate({ menstrualSymptoms: updated })
                  }}
                  className="sr-only"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Hormonal Symptoms */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Which hormonal symptoms do you experience? (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {hormonalSymptoms.map(({ value, label }) => (
              <label
                key={value}
                className={`
                  flex items-center p-3 rounded-lg border cursor-pointer transition-all
                  ${data.hormonalSymptoms?.includes(value)
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-teal-200'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={data.hormonalSymptoms?.includes(value) || false}
                  onChange={(e) => {
                    const current = data.hormonalSymptoms || []
                    const updated = e.target.checked
                      ? [...current, value]
                      : current.filter(s => s !== value)
                    onUpdate({ hormonalSymptoms: updated })
                  }}
                  className="sr-only"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Symptom Severity */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How would you rate the severity of your symptoms? (1-5)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="1"
              max="5"
              value={data.symptomSeverity || 1}
              onChange={(e) => onUpdate({ symptomSeverity: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
            <span className="text-sm text-gray-600 min-w-[4rem]">
              Level {data.symptomSeverity || 1}/5
            </span>
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Any additional notes about your hormonal health?
          </label>
          <textarea
            value={data.hormonalNotes || ''}
            onChange={(e) => onUpdate({ hormonalNotes: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500"
            rows={4}
            placeholder="Share any other relevant information about your hormonal health..."
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