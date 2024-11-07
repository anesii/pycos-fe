'use client'

import { useState } from 'react'
import { AssessmentFormData } from 'app/types/assessment'
import { generateHealthPlan } from 'app/utils/api';


interface ReviewSectionProps {
  data: AssessmentFormData
  onSubmit: () => void
  onBack: () => void
}

interface SectionSummaryProps {
  title: string
  children: React.ReactNode
}


const SectionSummary = ({ title, children }: SectionSummaryProps) => (
  <div className="mb-6">
    <h3 className="text-lg font-medium text-gray-900 mb-3">{title}</h3>
    <div className="bg-gray-50 rounded-lg p-4">{children}</div>
  </div>
)

export default function ReviewSection({
  data,
  onSubmit,
  onBack,
}: ReviewSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // TODO: Add API call to submit assessment data
      const plan = await generateHealthPlan(data);
      console.log('Generated Health Plan:', plan);
      
      // Store the meal plan in local storage
      localStorage.setItem('mealPlan', JSON.stringify(plan.meals)); // Assuming 'meals' is the key in the response
  

      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulated API call
      onSubmit()
    } catch (err) {
      setError('There was an error submitting your assessment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Review Your Assessment</h2>
          <div className="text-sm text-gray-500">
            Please review your information before submitting
          </div>
        </div>


        {/* Personal Information */}
        <SectionSummary title="Personal Information">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Age</div>
              <div>{data.age} years</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Location</div>
              <div>{data.location}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Height</div>
              <div>{data.height} cm</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Weight</div>
              <div>{data.weight} kg</div>
            </div>
          </div>
        </SectionSummary>

        {/* PCOS Information */}
        <SectionSummary title="PCOS Information">
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-500">Diagnosed with PCOS</div>
              <div>{data.diagnosedWithPCOS ? 'Yes' : 'No'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Symptoms</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {data.symptoms?.map((symptom) => (
                  <span
                    key={symptom}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                  >
                    {symptom.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SectionSummary>

        {/* Health Goals */}
        <SectionSummary title="Health Goals">
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-500">Primary Goal</div>
              <div>{data.primaryGoal?.replace('_', ' ')}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Target Weight</div>
              <div>{data.targetWeight} kg</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Timeframe</div>
              <div>{data.timeframe?.replace('_', ' ')}</div>
            </div>
          </div>
        </SectionSummary>

        {/* Lifestyle & Activity */}
        <SectionSummary title="Lifestyle & Activity">
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-500">Activity Level</div>
              <div>{data.activityLevel?.replace('_', ' ')}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Preferred Exercises</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {data.preferredExercises?.map((exercise) => (
                  <span
                    key={exercise}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                  >
                    {exercise}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SectionSummary>

        {/* Nutritional Preferences */}
        <SectionSummary title="Nutritional Preferences">
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-500">Diet Type</div>
              <div>{data.dietType?.replace('_', ' ')}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Meals per Day</div>
              <div>{data.mealsPerDay}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Dietary Restrictions</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {data.restrictions?.map((restriction) => (
                  <span
                    key={restriction}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                  >
                    {restriction}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SectionSummary>

        {/* Hormonal Health */}
        <SectionSummary title="Hormonal Health">
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-500">Cycle Regularity</div>
              <div>{data.cycleRegularity?.replace('_', ' ')}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Cycle Length</div>
              <div>{data.cycleLength} days</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Symptom Severity</div>
              <div>Level {data.symptomSeverity}/5</div>
            </div>
          </div>
        </SectionSummary>

        {/* Terms and Privacy */}
        <div className="mt-8">
          <label className="flex items-start">
            <input
              type="checkbox"
              className="mt-1 form-checkbox text-teal-500 focus:ring-teal-500"
              required
            />
            <span className="ml-2 text-sm text-gray-600">
              I confirm that the information provided is accurate and I understand that the results are not diagnosed by a professional
            </span>
          </label>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
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
          disabled={isSubmitting}
          className={`
            px-6 py-2 rounded-lg text-white transition-colors
            ${isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-teal-500 hover:bg-teal-600'
            }
          `}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </div>
          ) : (
            'Generate Health Plan'
          )}
        </button>
      </div>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  )
}

