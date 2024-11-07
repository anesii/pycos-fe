'use client'

import { useState } from 'react'
import { AssessmentFormData } from 'app/types/assessment'

interface SupplementSectionProps {
  data: AssessmentFormData
  onUpdate: (data: Partial<AssessmentFormData>) => void
  onNext: () => void
  onBack: () => void
}

export default function SupplementSection({
  data,
  onUpdate,
  onNext,
  onBack,
}: SupplementSectionProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Supplement Information</h2>
        
        {/* Current Supplements */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What supplements are you currently taking?
          </label>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Supplement Name</label>
              <textarea
                value={data.supplementNames?.join('\n') || ''}
                onChange={(e) => onUpdate({ 
                  supplementNames: e.target.value.split('\n').filter(s => s.trim()) 
                })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500"
                rows={3}
                placeholder="List your supplements, one per line (e.g., Vitamin D, Magnesium, etc.)"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Dosage & Frequency</label>
              <textarea
                value={data.supplementDosages?.join('\n') || ''}
                onChange={(e) => onUpdate({ 
                  supplementDosages: e.target.value.split('\n').filter(s => s.trim()) 
                })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500"
                rows={3}
                placeholder="List dosage and frequency for each supplement (e.g., 1000 IU daily, 400mg twice daily)"
              />
            </div>
          </div>
        </div>

        {/* Supplement Duration */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How long have you been taking these supplements?
          </label>
          <textarea
            value={data.supplementDuration || ''}
            onChange={(e) => onUpdate({ supplementDuration: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500"
            rows={2}
            placeholder="Describe how long you've been taking each supplement..."
          />
        </div>

        {/* Supplement Effectiveness */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Have you noticed any improvements or side effects from taking these supplements?
          </label>
          <textarea
            value={data.supplementEffectiveness || ''}
            onChange={(e) => onUpdate({ supplementEffectiveness: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500"
            rows={3}
            placeholder="Describe any positive or negative effects you've experienced..."
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