export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'athlete';

export type DietType = 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian' | 'keto' | 'paleo' | 'mediterranean';

export type PCOSSymptom = 
  | 'irregular_periods'
  | 'weight_gain'
  | 'acne'
  | 'hair_thinning'
  | 'fatigue'
  | 'mood_swings'
  | 'excessive_hair_growth'
  | 'difficulty_sleeping'
  | 'other';

export interface AssessmentFormData {
    preferredCuisines?: string[]; // Added preferredCuisines property
    hydrationLevel: number;
    exerciseFrequency: number; // Add this line to define exerciseFrequency
    additionalNotes?: string; // Add this line if it's missing



  // Personal Information
  age: number;
  location: string;
  height: number;
  weight: number;
  foodPreferences: string[];
  
  // PCOS Information
  diagnosedWithPCOS: boolean;
  symptoms: PCOSSymptom[];
  otherSymptoms?: string;
  otherHealthConditions: string[];
  medications: string[];
  familyHistory: boolean;
  
  // Dietary Preferences
  dietType: DietType;
  restrictions: string[];
  favoriteFoods: string[];
  foodsToAvoid: string[];
  mealsPerDay: number;
  mealTiming: string[];

  //Nutrition Section
  caloricPreference?: string
  macroPreference?: string
  mealPrepTime?: string
  includeSnacks?: boolean
  preferredSnacks?: string[]

  //Lifestyle Section
  activityLevel?: ActivityLevel;
  preferredExercises?: string[];
  sleepDuration?: string;
  sleepQuality?: string;
  stressLevel?: number;

  //Lifestyle Factors Section
  occupationType: string;
  cookingPreference: string;
  shoppingFrequency: string;
  budgetLevel: string;
  mealScheduleFlexibility?: string;

  //Goals Section
  primaryGoal?: 'weight_loss' | 'weight_maintenance' | 'muscle_gain' | 'hormonal_balance' | 'manage_symptoms';
  timeframe?: 'short_term' | 'mid_term' | 'long_term';
  targetWeight?: number;
  shortTermGoals?: string[];
  longTermVision?: string;

  //Hormonal Health Section
  cycleRegularity: string;
  cycleLength?: number;
  menstrualSymptoms?: string[];
  hormonalSymptoms?: string[];
  symptomSeverity?: number;
  hormonalNotes?: string;

  //Supplement Section
  supplementNames?: string[];
  supplementDosages?: string[];
  supplementDuration?: string;
  supplementEffectiveness?: string;


  // Additional sections will be added as we build them...
}

// Add this type definition if it doesn't exist
export interface PersonalInfoSectionProps {
    data: {
      preferredCuisines?: string[];
      // Add other properties as needed
    };
    onUpdate: (data: { preferredCuisines: string[] }) => void;
    onNext: () => void;
  }