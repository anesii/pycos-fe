import { useState } from 'react';
import Select from 'react-select';
import { AssessmentFormData } from 'app/types/assessment';
import { PersonalInfoSectionProps } from 'app/types/assessment';
import { WORLD_CUISINES } from 'app/types/constants'; // Adjust the path as necessary

// ... existing WORLD_CUISINES array ...

export default function PersonalInfoSection({
  data,
  onUpdate,
  onNext,
}: PersonalInfoSectionProps) {
  const [age, setAge] = useState<number | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [heightUnit, setHeightUnit] = useState<'cm' | 'inches'>('cm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'pounds'>('kg');
  const [errors, setErrors] = useState<{ preferredCuisines?: string }>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Basic form validation
    const newErrors: { preferredCuisines?: string } = {};
    if (!age || age <= 0) {
      newErrors.preferredCuisines = "Please enter a valid age.";
    }
    if (!data.preferredCuisines || data.preferredCuisines.length === 0) {
      newErrors.preferredCuisines = "Please select at least one preferred cuisine.";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext(); // Call onNext or any other logic needed after submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
        
        <div className="space-y-4">
          {/* Age or Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age / Date of Birth</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              placeholder="Enter your age"
              className="border rounded-md p-2 w-full"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <Select
              options={WORLD_CUISINES.map((cuisine: { value: string; label: string }) => ({ value: cuisine.value, label: cuisine.label }))}
              onChange={(selected: { value: string; label: string } | null) => setLocation(selected?.value)}              className="text-sm"
              classNamePrefix="select"
              placeholder="Select your location"
            />
          </div>

          {/* Preferred Cuisines */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Food Preferences</label>
            <Select
              isMulti
              options={WORLD_CUISINES}
              value={WORLD_CUISINES.filter((cuisine: { value: string; label: string }) => 
                data.preferredCuisines?.includes(cuisine.value)
              )}
              onChange={(selected) => {
                const selectedValues = selected.map(option => option.value);
                onUpdate({ preferredCuisines: selectedValues });
              }}
              className="text-sm"
              classNamePrefix="select"
              placeholder="Select cuisines you're interested in..."
              noOptionsMessage={() => "No cuisines found"}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: '#14b8a6', // teal-500
                  primary25: '#f0fdfa', // teal-50
                  primary50: '#ccfbf1', // teal-100
                },
              })}
            />
            {errors.preferredCuisines && (
              <p className="mt-1 text-sm text-red-600">{errors.preferredCuisines}</p>
            )}
          </div>

          {/* Height and Weight */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  placeholder="Enter your height"
                  className="border rounded-md p-2 w-full"
                />
                <select
                  value={heightUnit}
                  onChange={(e) => setHeightUnit(e.target.value as 'cm' | 'inches')}
                  className="border rounded-md p-2"
                >
                  <option value="cm">cm</option>
                  <option value="inches">inches</option>
                </select>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  placeholder="Enter your weight"
                  className="border rounded-md p-2 w-full"
                />
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'pounds')}
                  className="border rounded-md p-2"
                >
                  <option value="kg">kg</option>
                  <option value="pounds">pounds</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors"
      >Next</button>
    </form>
  );
}