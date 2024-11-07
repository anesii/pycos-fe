'use client'

import { useState } from 'react'; // Ensure useState is imported
import { DietType, AssessmentFormData as ImportedAssessmentFormData } from 'app/types/assessment'; // Import the correct type

import PCOSInfoSection from 'app/components/assessment/PCOSInfoSection'; // Added import for PCOSInfoSection
import DietarySection from 'app/components/assessment/DietarySection'; // Adjusted to the correct path
import PersonalInfoSection from 'app/components/assessment/PersonalInfoSection'; // Added import for PersonalInfoSection
import LifestyleSection from 'app/components/assessment/LifestyleSection'; // Added import for LifestyleSection
import LifestyleFactorsSection from 'app/components/assessment/LifestyleFactorsSection'; // Added import for LifestyleFactorsSection
import HormonalHealthSection from 'app/components/assessment/HormonalHealthSection'; // Added import for HormonalHealthSection
import SupplementSection from 'app/components/assessment/SupplementSection'; // Added import for SupplementSection
import ReviewSection from 'app/components/assessment/ReviewSection'; // Added import for ReviewSection

function AssessmentPage() {
    const [currentStep, setCurrentStep] = useState(1); // Initialize currentStep
    const [formData, setFormData] = useState<ImportedAssessmentFormData>({
        preferredCuisines: [],
        age: 0,
        location: '',
        height: 0,
        weight: 0,
        foodPreferences: [],
        diagnosedWithPCOS: false,
        symptoms: [],
        otherHealthConditions: [],
        medications: [],
        familyHistory: false,
        dietType: 'defaultDietType' as DietType,
        restrictions: [],
        favoriteFoods: [],
        foodsToAvoid: [],
        mealsPerDay: 0,
        mealTiming: [],
        hydrationLevel: 0,
        exerciseFrequency: 0,
        sleepQuality: '',
        stressLevel: 0,
        additionalNotes: '',
        occupationType: '',
        cookingPreference: '',
        shoppingFrequency: '',
        budgetLevel: '',
        cycleRegularity: '',  // Ensure this matches the imported type
        // ... add other required properties with default values
    });

    const steps = [ // Define the steps array
      { id: 1, name: 'Personal Info' },
      { id: 2, name: 'PCOS Info' },
      { id: 3, name: 'Dietary Info' },
      { id: 4, name: 'Lifestyle Info' },
      { id: 5, name: 'Lifestyle Factors' },
      { id: 6, name: 'Hormonal Health' },
      { id: 7, name: 'Supplements' },
      { id: 8, name: 'Review' },
    ];  

    const updateFormData = (data: Partial<ImportedAssessmentFormData>) => {
        // Validate data before updating
        if (data) {
            setFormData(prev => ({ ...prev, ...data })); // Update formData
        }
    };

    const handleSubmit = () => {
        // Implement form submission logic
        console.log('Form submitted:', formData);
        // TODO: Add actual submission logic (e.g., API call)
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">PCOS Symptom Assessment</h1>
                    <span className="text-sm text-gray-500">
                        Step {currentStep} of {steps.length}
                    </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                    <div
                        className="h-full bg-teal-500 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / steps.length) * 100}%` }}
                    />
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    {steps[currentStep - 1].name}
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex">
                {/* Navigation Buttons */}
                <div className="w-1/4 pr-4"> {/* Adjust width as needed */}
                    <div className="flex flex-col space-y-4 mb-4">
                        {steps.map(step => (
                            <button
                                key={step.id}
                                className={`px-4 py-2 rounded ${currentStep === step.id ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                onClick={() => setCurrentStep(step.id)}
                            >
                                {step.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Form Sections */}
                <div className="w-3/4"> {/* Adjust width as needed */}
                    <div className="space-y-8">
                        {currentStep === 1 && (
                            <PersonalInfoSection
                                data={formData} // Pass complete formData
                                onUpdate={updateFormData}
                                onNext={() => {
                                    updateFormData(formData); // Save data
                                    setCurrentStep(2);
                                }}
                            />
                        )}
                        {currentStep === 2 && (
                            <PCOSInfoSection
                                data={formData}
                                onUpdate={updateFormData}
                                onNext={() => {
                                    updateFormData(formData); // Save data
                                    setCurrentStep(3);
                                }}
                                onBack={() => setCurrentStep(1)} // Allow back navigation
                            />
                        )}
                        {currentStep === 3 && (
                            <DietarySection
                                data={formData}
                                onUpdate={updateFormData}
                                onNext={() => {
                                    updateFormData(formData); // Save data
                                    setCurrentStep(4);
                                }}
                                onBack={() => setCurrentStep(2)} // Allow back navigation
                            />
                        )}
                        {currentStep === 4 && (
                            <LifestyleSection
                                data={formData}
                                onUpdate={updateFormData}
                                onNext={() => {
                                    updateFormData(formData); // Save data
                                    setCurrentStep(5);
                                }}
                                onBack={() => setCurrentStep(3)} // Allow back navigation
                            />
                        )}
                        {currentStep === 5 && (
                            <LifestyleFactorsSection
                                data={formData}
                                onUpdate={updateFormData}
                                onNext={() => {
                                    updateFormData(formData); // Save data
                                    setCurrentStep(6);
                                }}
                                onBack={() => setCurrentStep(4)} // Allow back navigation
                            />
                        )}
                        {currentStep === 6 && (
                            <HormonalHealthSection
                                data={formData}
                                onUpdate={updateFormData}
                                onNext={() => {
                                    updateFormData(formData); // Save data
                                    setCurrentStep(7);
                                }}
                                onBack={() => setCurrentStep(5)} // Allow back navigation
                            />
                        )}
                        {currentStep === 7 && (
                            <SupplementSection
                                data={formData}
                                onUpdate={updateFormData}
                                onNext={() => {
                                    updateFormData(formData); // Save data
                                    setCurrentStep(8);
                                }}
                                onBack={() => setCurrentStep(6)} // Allow back navigation
                            />
                        )}
                        {currentStep === 8 && (
                            <ReviewSection
                                data={formData} // This now uses the correct type
                                onSubmit={handleSubmit}
                                onBack={() => setCurrentStep(7)} // Allow back navigation
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssessmentPage; // Ensure the component is exported