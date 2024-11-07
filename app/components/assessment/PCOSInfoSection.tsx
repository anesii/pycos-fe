'use client'

import { useState } from 'react'
import { AssessmentFormData, PCOSSymptom } from 'app/types/assessment'

interface PCOSInfoSectionProps {
  data: AssessmentFormData
  onUpdate: (data: Partial<AssessmentFormData>) => void
  onNext: () => void
  onBack: () => void
}

const symptoms: { value: PCOSSymptom; label: string }[] = [
  { value: 'irregular_periods', label: 'Irregular periods' },
  { value: 'weight_gain', label: 'Weight gain' },
  { value: 'acne', label: 'Acne' },
  { value: 'hair_thinning', label: 'Hair thinning' },
  { value: 'fatigue', label: 'Fatigue' },
  { value: 'mood_swings', label: 'Mood swings' },
  { value: 'excessive_hair_growth', label: 'Excessive hair growth' },
  { value: 'difficulty_sleeping', label: 'Difficulty sleeping' },
  { value: 'other', label: 'Other' }
]

export default function PCOSInfoSection({
  data,
  onUpdate,
  onNext,
  onBack,
}: PCOSInfoSectionProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    if (!data.diagnosedWithPCOS) {
      newErrors.diagnosis = 'Please indicate if you have been diagnosed with PCOS'
    }
    if (!data.symptoms || data.symptoms.length === 0) {
      newErrors.symptoms = 'Please select at least one symptom'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onNext()
  }

  const handleSymptomChange = (symptom: PCOSSymptom) => {
    const currentSymptoms = data.symptoms || []
    const newSymptoms = currentSymptoms.includes(symptom)
      ? currentSymptoms.filter(s => s !== symptom)
      : [...currentSymptoms, symptom]
    onUpdate({ symptoms: newSymptoms })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">PCOS Information</h2>
        
        {/* PCOS Diagnosis */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Have you been diagnosed with PCOS?
          </label>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="diagnosis"
                checked={data.diagnosedWithPCOS === true}
                onChange={() => onUpdate({ diagnosedWithPCOS: true })}
                className="form-radio text-teal-500 focus:ring-teal-500"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="diagnosis"
                checked={data.diagnosedWithPCOS === false}
                onChange={() => onUpdate({ diagnosedWithPCOS: false })}
                className="form-radio text-teal-500 focus:ring-teal-500"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
          {errors.diagnosis && (
            <p className="mt-1 text-sm text-red-600">{errors.diagnosis}</p>
          )}
        </div>

        {/* Symptoms */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What symptoms do you experience? (Select all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {symptoms.map(({ value, label }) => (
              <label key={value} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={data.symptoms?.includes(value) || false}
                  onChange={() => handleSymptomChange(value)}
                  className="form-checkbox text-teal-500 focus:ring-teal-500"
                />
                <span className="ml-2">{label}</span>
              </label>
            ))}
          </div>
          {errors.symptoms && (
            <p className="mt-1 text-sm text-red-600">{errors.symptoms}</p>
          )}
        </div>

        {/* Other Health Conditions */}
        <div className="mb-6">
          <label htmlFor="conditions" className="block text-sm font-medium text-gray-700 mb-2">
            Have you been diagnosed with any other health conditions?
          </label>
          <textarea
            id="conditions"
            value={data.otherHealthConditions?.join('\n') || ''}
            onChange={(e) => onUpdate({ otherHealthConditions: e.target.value.split('\n') })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500"
            rows={3}
            placeholder="e.g., Diabetes, Thyroid disorders"
          />
        </div>

        {/* Current Medications */}
        <div>
          <label htmlFor="medications" className="block text-sm font-medium text-gray-700 mb-2">
            Current medications or treatments for PCOS
          </label>
          <textarea
            id="medications"
            value={data.medications?.join('\n') || ''}
            onChange={(e) => onUpdate({ medications: e.target.value.split('\n') })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500"
            rows={3}
            placeholder="e.g., Metformin, Birth control"
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