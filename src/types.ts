export interface PetProfile {
  id: string;
  name: string;
  breed: string;
  age: number | string;
  weight: string;
  avatarUrl: string;
  personality: string[];
  exerciseNeeds: 'Low' | 'Moderate' | 'High' | 'Very High';
  behaviour: string;
  anxietyTriggers: string[];
  environmentPreference: string;
  favouriteActivities: string[];
  careNotes: string;
  feedingRoutine: {
    mealsPerDay: number;
    dietDetails: string;
    foodAllergies: string[];
    supplements: string;
  };
  exerciseRoutine: {
    walksPerDay: number;
    preferredTimes: string[];
    idealDuration: string;
    weatherPrecautions: string;
  };
  medicalHistory: {
    microchipId: string;
    vaccinationsUpToDate: boolean;
    vetClinic: string;
    vetPhone: string;
    specialConditions: string;
  };
  careHistory: {
    id: string;
    date: string;
    handlerName: string;
    serviceType: string;
    notes: string;
    rating: number;
  }[];
  trustedHandlers: string[]; // Handler IDs
}

export interface HandlerProfile {
  id: string;
  name: string;
  role: string;
  companyOrStudio: string;
  avatarUrl: string;
  coverUrl: string;
  location: string;
  experienceYears: number;
  verifiedQualifications: string[];
  servicesOffered: string[];
  trustScore: number; // e.g. 98
  verifiedServicesCount: number; // e.g. 142
  repeatBookingRate: number; // e.g. 94%
  relevantBreedExperience: string[];
  hourlyRate: string;
  bio: string;
  facilityHighlights: string[];
  verifiedReviews: {
    id: string;
    reviewerName: string;
    petBreed: string;
    rating: number;
    comment: string;
    date: string;
    verifiedBooking: boolean;
  }[];
  trustBadges: string[];
}

export interface HandlerMatch {
  handlerId: string;
  matchPercentage: number;
  keyReasons: string[];
  considerations: string[];
  trustSignals: string[];
}

export interface CareHandoverData {
  summaryTitle: string;
  greetingNotice: string;
  feedingRoutine: string;
  exerciseRoutine: string;
  behaviourAndTemperament: string;
  triggersAndAnxieties: string;
  medicationHealth: string;
  likesDislikes: string;
  emergencyContact: string;
  previousObservations: string;
  importantInstructions: string;
}

export interface CareIdea {
  id?: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  whySuitsPet: string;
  whatYouNeed?: string[];
  careConsiderations?: string[];
  influencedByTraits?: string[];
  isAdapted?: boolean;
  adaptationNote?: string;
  version?: number;
}

export interface TrustGraphPillar {
  name: string;
  score: number;
  description: string;
  iconName: string;
  details: string[];
}
