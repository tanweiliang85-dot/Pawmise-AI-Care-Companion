import { PetProfile, HandlerProfile, TrustGraphPillar } from '../types';

export const INITIAL_PETS: PetProfile[] = [
  {
    id: 'teddie-samoyed',
    name: 'Teddie',
    breed: 'Samoyed',
    age: 3,
    weight: '24 kg',
    avatarUrl: 'https://images.unsplash.com/photo-1529429612779-c8e40ef2f56d?auto=format&fit=crop&q=80&w=800',
    personality: ['Friendly', 'Social', 'Energetic', 'Gentle', 'Playful'],
    exerciseNeeds: 'High',
    behaviour: 'Loves people and other dogs. Extremely affectionate and vocal when excited. Responds very well to praise and positive reward training.',
    anxietyTriggers: ['Loud noises and thunderstorms', 'Heavy rain downpours', 'Sudden loud metallic drops'],
    environmentPreference: 'Air-conditioned environments in hot weather (crucial for Singapore tropical climate).',
    favouriteActivities: ['Cool morning walks', 'Social play with gentle dogs', 'Frozen lick mats', 'Puzzle toys & snuffle mats'],
    careNotes: 'Monitor heat exposure during outdoor activity. Double coat requires brushing after wet grass play. Chilled water must always be accessible.',
    feedingRoutine: {
      mealsPerDay: 2,
      dietDetails: '1.5 cups dry kibble + 1 tbsp steamed salmon toppers at 8:00 AM & 6:30 PM.',
      foodAllergies: ['Poultry/Chicken sensitivity (causes itchy paws)'],
      supplements: 'Omega-3 Salmon Oil (1 pump in evening meal) & Joint glucosamine chew',
    },
    exerciseRoutine: {
      walksPerDay: 2,
      preferredTimes: ['7:00 AM - Morning breeze walk', '8:00 PM - Night stroll'],
      idealDuration: '30-45 mins per session',
      weatherPrecautions: 'Strictly no outdoor walks between 11:00 AM and 5:00 PM on hot pavement to protect paw pads and prevent heatstroke.',
    },
    medicalHistory: {
      microchipId: 'SG-702-9981-4412',
      vaccinationsUpToDate: true,
      vetClinic: 'Mount Pleasant Veterinary Centre (Gelap)',
      vetPhone: '+65 6251 7666',
      specialConditions: 'Thick double coat; susceptible to thermal stress if kept in non-air-con humid areas during Singapore afternoon.',
    },
    careHistory: [
      {
        id: 'ch-3',
        date: '2026-07-28',
        handlerName: 'Sarah Lim',
        serviceType: 'Verified Boarding Observation',
        notes: 'During Teddie\'s previous boarding stay, he became anxious during an evening thunderstorm. Moving him to a quiet air-conditioned room, playing low background music and giving him his familiar blanket helped him settle within approximately 20 minutes.',
        rating: 5,
      },
      {
        id: 'ch-1',
        date: '2026-07-20',
        handlerName: 'Siti N.',
        serviceType: 'Full Day Air-Con Daycare',
        notes: 'Teddie had a wonderful session! Played gently with two golden retrievers. Settled peacefully with his snuffle mat during the 2 PM thunderstorm.',
        rating: 5,
      },
      {
        id: 'ch-2',
        date: '2026-06-12',
        handlerName: 'Marcus Tan',
        serviceType: '7:00 AM Shaded Park Walk',
        notes: 'Great energy level! Completed 40 mins walk around Bishan Park before sun got warm. Paw pads checked and cleaned.',
        rating: 5,
      },
    ],
    trustedHandlers: ['handler-1', 'handler-2'],
  },
  {
    id: 'mochi-frenchie',
    name: 'Mochi',
    breed: 'French Bulldog',
    age: 2,
    weight: '11.5 kg',
    avatarUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800',
    personality: ['Calm', 'Affectionate', 'Curious', 'Easygoing'],
    exerciseNeeds: 'Moderate',
    behaviour: 'Snuggly companion dog. Loves gentle indoor playtime and lounging near air-con vents.',
    anxietyTriggers: ['Crowded elevator noises', 'Over-exertion'],
    environmentPreference: 'Strict indoor air-conditioned sanctuary with non-slip rugs.',
    favouriteActivities: ['Squeaky toy fetching', 'Napping on orthopedic beds', 'Short sniffaris'],
    careNotes: 'Brachycephalic breed - monitor breathing closely. No strenuous running.',
    feedingRoutine: {
      mealsPerDay: 2,
      dietDetails: '1 cup hypo-allergenic kibble + warm water broth.',
      foodAllergies: ['Grains', 'Beef'],
      supplements: 'Probiotic powder & facial fold wipe routine daily',
    },
    exerciseRoutine: {
      walksPerDay: 2,
      preferredTimes: ['7:30 AM', '7:30 PM'],
      idealDuration: '15-20 mins gentle walk',
      weatherPrecautions: 'Zero high-heat exposure. Indoor games preferred on humid days.',
    },
    medicalHistory: {
      microchipId: 'SG-819-2041-3301',
      vaccinationsUpToDate: true,
      vetClinic: 'Sunset Vet Clinic (Clementi)',
      vetPhone: '+65 6710 9988',
      specialConditions: 'Brachycephalic airway sensitivity.',
    },
    careHistory: [],
    trustedHandlers: ['handler-1', 'handler-3'],
  },
];

export const MOCK_HANDLERS: HandlerProfile[] = [
  {
    id: 'handler-1',
    name: 'Sarah Lim',
    role: 'Senior Pet-Care Specialist & Noise Anxiety Handler',
    companyOrStudio: "Sarah's Arctic Paws Haven • Central & River Valley",
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    coverUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=1200',
    location: 'Central Singapore (River Valley / Novena)',
    experienceYears: 6,
    verifiedQualifications: [
      'Certified Pet First Aid & CPR',
      'Specialized Double-Coated & Samoyed Breed Handler',
      'Canine Noise Anxiety & Storm Care Specialist',
      'Diploma in Animal Management & Behaviour'
    ],
    servicesOffered: [
      'Full Day Air-Con Care & Socialization',
      'Samoyed Double-Coat Grooming & Hydration Care',
      'Thunderstorm Noise Anxiety Relief Session',
      'Private 1-on-1 Gentle Enrichment'
    ],
    trustScore: 94,
    verifiedServicesCount: 186,
    repeatBookingRate: 82,
    relevantBreedExperience: ['Samoyed', 'Alaskan Malamute', 'Siberian Husky', 'Golden Retriever', 'Japanese Spitz'],
    hourlyRate: 'S$28 / hr',
    bio: '[PROTOTYPE / DEMO DATA] 6 years of professional pet-care experience. Certified in pet first aid with deep expertise in managing Samoyeds, large double-coated breeds, and dogs with severe noise anxiety during Singapore thunderstorms.',
    facilityHighlights: [
      '100% Air-Conditioned Playroom (Maintained at ≤21°C)',
      'Acoustic Thunderstorm Noise Damping & Calming Music',
      'Chilled Fresh Water Fountains & Cooling Gel Mats',
      'GPS Walk Logging & Real-Time Photo/Video Updates'
    ],
    verifiedReviews: [
      {
        id: 'rev-1',
        reviewerName: 'Clara W.',
        petBreed: 'Samoyed (Kobe)',
        rating: 5,
        comment: 'Sarah is an absolute lifesaver for Samoyeds! Kobe stayed completely cool and was totally relaxed during a massive 2 PM thunderstorm thanks to her acoustic setup and soothing techniques.',
        date: '2026-07-22',
        verifiedBooking: true
      },
      {
        id: 'rev-2',
        reviewerName: 'David K.',
        petBreed: 'Japanese Spitz (Snowy)',
        rating: 5,
        comment: 'Sarah knows double coats and noise triggers inside out. Certified pet first aid gave us complete confidence!',
        date: '2026-07-08',
        verifiedBooking: true
      }
    ],
    trustBadges: ['PROTOTYPE / DEMO DATA', 'Certified Pet First Aid', 'Samoyed & Double-Coat Expert', 'Noise Anxiety Specialist', '186 Verified Services']
  },
  {
    id: 'handler-2',
    name: 'Marcus Tan',
    role: 'Certified Dog Trainer & High-Energy Specialist',
    companyOrStudio: 'Paws & Trails SG • Bishan & Thomson',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
    coverUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200',
    location: 'North-Central Singapore (Bishan / Thomson)',
    experienceYears: 4,
    verifiedQualifications: [
      'Certified Professional Dog Trainer (CPDT-KA)',
      'High-Energy Behavioural Enrichment Specialist',
      'K9 Emergency First Responder'
    ],
    servicesOffered: [
      'Early Morning Shaded Trail Walk',
      'High-Energy Behavioural Enrichment',
      'Snuffle Mat & Puzzle Toy Challenge Sessions',
      'Controlled Socialization & Loose-Leash Refresher'
    ],
    trustScore: 89,
    verifiedServicesCount: 121,
    repeatBookingRate: 76,
    relevantBreedExperience: ['Border Collie', 'Golden Retriever', 'Samoyed', 'Labrador Retriever', 'Singapore Special'],
    hourlyRate: 'S$25 / hr',
    bio: '[PROTOTYPE / DEMO DATA] 4 years of professional experience as a certified dog trainer. Specializes in high-energy dogs, active enrichment routines, snuffle puzzles, and structured physical exercise.',
    facilityHighlights: [
      'Pavement Heat Sensors & Temperature Monitoring',
      'Mental Enrichment & Snuffle Mat Equipment',
      'Hydration Backpack & Cold Compress Emergency Kit'
    ],
    verifiedReviews: [
      {
        id: 'rev-3',
        reviewerName: 'Jason L.',
        petBreed: 'Border Collie (Milo)',
        rating: 5,
        comment: 'Marcus is fantastic with high-energy dogs! He knows how to combine physical exercise with mental enrichment puzzles safely.',
        date: '2026-07-15',
        verifiedBooking: true
      }
    ],
    trustBadges: ['PROTOTYPE / DEMO DATA', 'Certified Dog Trainer', 'High-Energy Enrichment Specialist', '121 Verified Services']
  },
  {
    id: 'handler-3',
    name: 'Chloe Lee',
    role: 'Pet Sitter & Companion Caregiver',
    companyOrStudio: 'Cozy Paws Home Care • Katong & East Coast',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    coverUrl: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=1200',
    location: 'East Coast (Katong / Joo Chiat)',
    experienceYears: 2,
    verifiedQualifications: [
      'Pet Sitting & Basic Care Certificate',
      'Gentle Companion Care Provider',
      'Basic Pet First Aid & Hygiene'
    ],
    servicesOffered: [
      'Indoor Air-Con Home Sitting',
      'Gentle Companion Walking',
      'Attentive Routine Care & Feeding'
    ],
    trustScore: 81,
    verifiedServicesCount: 67,
    repeatBookingRate: 68,
    relevantBreedExperience: ['French Bulldog', 'Pug', 'Shih Tzu', 'Corgi', 'Maltese'],
    hourlyRate: 'S$22 / hr',
    bio: '[PROTOTYPE / DEMO DATA] 2 years of pet-sitting experience with 67 verified Pawmise services. Strong owner reviews for attentive companion care, though with limited Samoyed-specific double-coat experience.',
    facilityHighlights: [
      'Quiet Air-Conditioned Residential Apartment',
      'Non-Slip Indoor Floor Rugs',
      'Dedicated 1-on-1 Gentle Attention'
    ],
    verifiedReviews: [
      {
        id: 'rev-4',
        reviewerName: 'Rachel T.',
        petBreed: 'Frenchie (Boba)',
        rating: 5,
        comment: 'Chloe is sweet, attentive, and sent great photo updates throughout the stay!',
        date: '2026-06-30',
        verifiedBooking: true
      }
    ],
    trustBadges: ['PROTOTYPE / DEMO DATA', '2 Yrs Pet-Sitting Experience', '67 Verified Services', 'Strong Owner Reviews']
  }
];

export const TRUST_GRAPH_PILLARS: TrustGraphPillar[] = [
  {
    name: 'Verified Identity',
    score: 100,
    description: 'Biometric & Gov-Verified NRIC / ACRA business registration checks.',
    iconName: 'ShieldCheck',
    details: [
      'Singapore Gov-Verified NRIC / FIN identity check',
      'Criminal record clearance certificate',
      'Physical address & studio inspection by Pawmise Trust Team'
    ]
  },
  {
    name: 'Verified Qualifications',
    score: 98,
    description: 'Accredited certs in Canine First Aid, Fear-Free handling & Behavioural Training.',
    iconName: 'Award',
    details: [
      'Verified St. John Ambulance / Red Cross Pet CPR',
      'International Fear-Free® Certification verification',
      'Specialized breed handling credentials (Arctic double-coats, Brachycephalic)'
    ]
  },
  {
    name: 'Verified Services',
    score: 95,
    description: 'GPS-logged check-ins, air-con environment logs, and automated activity timestamps.',
    iconName: 'CheckCircle2',
    details: [
      'Live GPS walk tracking with ambient pavement temperature alerts',
      'Indoor air-conditioning temperature log verification (kept at ≤22°C)',
      'Timestamped meal, water and medication delivery confirmations'
    ]
  },
  {
    name: 'Mutual Reviews',
    score: 96,
    description: 'Dual-blind 2-way reviews between pawrents and handlers following completed stays.',
    iconName: 'Star',
    details: [
      'Only 100% completed, verified bookings can submit reviews',
      'AI sentiment analysis flags outlier or fake reviews',
      'Transparent feedback loop builds long-term reputation portability'
    ]
  },
  {
    name: 'Repeat Bookings',
    score: 94,
    description: 'Demonstrated long-term trust and bond between handler, pawrent, and pet.',
    iconName: 'Repeat',
    details: [
      'High repeat rate indicates consistent, reliable care quality',
      'Creates a deep lifelong familiarity advantage for the furkid',
      'Reduces transition stress for pets with anxiety triggers'
    ]
  },
  {
    name: 'Pet Compatibility',
    score: 97,
    description: 'Algorithmic matching based on breed temperament, energy, and anxiety triggers.',
    iconName: 'HeartHandshake',
    details: [
      'Matches Arctic breeds with temperature-controlled indoor setups',
      'Pairs noise-anxious pets with handlers trained in calm acoustic environments',
      'Excludes high-heat outdoor handlers during peak UV/humidity hours'
    ]
  },
  {
    name: 'Care Outcomes',
    score: 99,
    description: 'Post-care health, stress-free behavior logs, and mood tracking history.',
    iconName: 'Activity',
    details: [
      'Handover logs track post-care appetite, energy, and stress levels',
      'Zero safety incidents recorded across verified bookings',
      'Continuous AI model optimization based on positive care feedback'
    ]
  }
];
