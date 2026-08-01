import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Helper to build tailored fallback ideas if Gemini API is rate-limited or unavailable
function buildFallbackIdeas(pet: any, goal?: string, setting?: string, notes?: string) {
  const is15Min = notes?.toLowerCase().includes('15 min') || notes?.toLowerCase().includes('15 mins') || notes?.toLowerCase().includes('15 minutes');
  const is2Dogs = notes?.toLowerCase().includes('two dogs') || notes?.toLowerCase().includes('2 dogs');

  return [
    {
      id: "idea-1",
      title: is2Dogs ? "Multi-Dog Chilled Scent & Sniffari Quest" : "Chilled Indoor Sniffari & Scent Puzzle Quest",
      category: goal || "Mental Stimulation",
      duration: is15Min ? "15 minutes" : "20-30 minutes",
      description: `Set up an air-conditioned ${setting || 'Indoor'} scent puzzle trail using rolled towels, snuffle mats, and cardboard boxes filled with freeze-dried salmon treats. ${notes ? `Tailored for: "${notes}".` : ''}`,
      whySuitsPet: `Directly engages ${pet?.name || "Teddie"}'s high intelligence and working breed instincts without exposing his thick Samoyed double coat to tropical outdoor heat.`,
      whatYouNeed: ["Snuffle mat / rolled towels", "Freeze-dried salmon bites", "Air-conditioned indoor room", "Cardboard scent boxes"],
      careConsiderations: ["Keep indoor AC temperature around 22°C.", "Monitor treat distribution during mental sessions.", "Ensure soothing background music if rain or thunder occurs."],
      influencedByTraits: ["Samoyed", "High energy", "Enjoys puzzle toys", "Heat-sensitive double coat"],
      version: 1
    },
    {
      id: "idea-2",
      title: "Cool Breeze Trick Agility & Social Rally",
      category: goal || "Burn Energy",
      duration: is15Min ? "15 minutes" : "30 minutes",
      description: `A cool morning/evening session focused on gentle bench weaving, high-five tricks, and positive social greetings. ${notes ? `Adapted for: "${notes}".` : ''}`,
      whySuitsPet: `Combines ${pet?.name || "Teddie"}'s energetic nature and social personality during temperature-safe hours to protect his coat from pavement heat.`,
      whatYouNeed: ["Sturdy 4-foot leash", "Collapsible water bowl with ice", "High-value rewards"],
      careConsiderations: ["Must complete during cool non-peak sun hours.", "Check pavement temperature before stepping out.", "Provide chilled fresh water every 10 minutes."],
      influencedByTraits: ["Samoyed", "High energy", "Social", "Heat-sensitive double coat"],
      version: 1
    },
    {
      id: "idea-3",
      title: "Calming Acoustic Lick Mat & Diaphragmatic Relaxer",
      category: goal || "Calm & Relax",
      duration: is15Min ? "15 minutes" : "20 minutes",
      description: `Spread Greek yoghurt and blueberry puree onto a textured silicone lick mat, freeze, and serve in a dim room with soft acoustic ambient sound. ${notes ? `Considered: "${notes}".` : ''}`,
      whySuitsPet: `Licking releases soothing endorphins that counteract ${pet?.name || "Teddie"}'s thunderstorm and loud noise sensitivities while keeping core body temperature cool.`,
      whatYouNeed: ["Textured silicone lick mat", "Greek yoghurt & blueberries", "Calming acoustic soundscape", "Familiar soft blanket"],
      careConsiderations: ["Keep doors closed to minimize sudden external noise.", "Dim lighting for optimum relaxation.", "Provide familiar grounding blanket."],
      influencedByTraits: ["Samoyed", "Sensitive to loud noises", "Heat-sensitive double coat", "Loves people"],
      version: 1
    }
  ];
}

// API Routes

// 1. Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Pawmise AI Care Companion" });
});

// Helper for handler matches fallback
function buildFallbackMatches(handlers: any[]) {
  return (handlers || []).map((h: any) => {
    if (h.id === "handler-1" || h.name?.includes("Sarah")) {
      return {
        handlerId: h.id,
        matchPercentage: 96,
        keyReasons: [
          "6 years' pet-care experience with certified pet first aid and direct expertise in Samoyeds and large double-coated breeds (crucial for Teddie's coat maintenance & tropical heat prevention).",
          "Strong experience handling dogs with severe noise anxiety—directly addresses Teddie's thunderstorm & heavy rain triggers with an acoustic-damped air-con environment.",
          "Proven record with 186 verified Pawmise services and an 82% repeat booking rate."
        ],
        considerations: [
          "High demand for specialized double-coat & noise care; advance booking (2-3 days) recommended for weekend slots.",
          "Higher hourly rate (S$28/hr) reflecting specialized arctic breed & noise desensitization credentials."
        ],
        trustSignals: ["[PROTOTYPE DATA]", "Trust Score: 94/100", "Certified Pet First Aid", "Samoyed & Double-Coat Specialist", "186 Verified Services", "82% Repeat Rate"]
      };
    } else if (h.id === "handler-2" || h.name?.includes("Marcus")) {
      return {
        handlerId: h.id,
        matchPercentage: 88,
        keyReasons: [
          "Certified Dog Trainer with 4 years' experience specializing in high-energy dogs and behavioural enrichment—directly aligns with Teddie's High exercise needs & puzzle toy/snuffle mat preferences.",
          "Excellent for structured physical conditioning during cool early morning or late evening windows.",
          "Solid track record with 121 verified Pawmise services and 76% repeat booking rate."
        ],
        considerations: [
          "Focuses heavily on high-energy outdoor training; walks must be strictly restricted to cool hours to protect Teddie's thick Samoyed coat from Singapore pavement heat.",
          "Does not possess specialized acoustic noise anxiety facilities compared to Sarah for severe thunderstorms."
        ],
        trustSignals: ["[PROTOTYPE DATA]", "Trust Score: 89/100", "Certified Dog Trainer", "High-Energy Enrichment Specialist", "121 Verified Services", "76% Repeat Rate"]
      };
    } else {
      return {
        handlerId: h.id,
        matchPercentage: 74,
        keyReasons: [
          "2 years' pet-sitting experience with 67 verified Pawmise services and strong owner reviews for gentle indoor care.",
          "Tranquil, air-conditioned indoor apartment sanctuary suitable for basic companion sitting and routine feeding."
        ],
        considerations: [
          "Limited Samoyed-specific double-coat experience; requires explicit instructions on post-walk coat brushing and heat monitoring.",
          "Less experienced in managing acute thunderstorm noise anxiety triggers if a sudden weather event occurs during care."
        ],
        trustSignals: ["[PROTOTYPE DATA]", "Trust Score: 81/100", "67 Verified Services", "68% Repeat Rate", "Strong Owner Reviews"]
      };
    }
  });
}

// 2. Find My Trusted Handler — AI Match Ranking
app.post("/api/match-handlers", async (req, res) => {
  const { pet, careType, handlers } = req.body || {};
  try {
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        success: true,
        source: "rule-engine",
        matches: buildFallbackMatches(handlers),
      });
    }

    const prompt = `You are Pawmise AI, an explainable pet-care trust matching engine in Singapore.
Your mission is to evaluate compatibility between a pet and 3 prototype/demo care handlers based on the pet's lifelong profile.

Pet Profile:
${JSON.stringify(pet, null, 2)}

Requested Care Type: ${careType || "General Care"}

Handlers (Prototype Demonstration Data):
${JSON.stringify(handlers, null, 2)}

CRITICAL MATCHING DIRECTIVE:
1. Do NOT simply rank handlers according to Trust Score. You MUST evaluate each handler against ${pet?.name || "Teddie"}'s specific characteristics (e.g., Samoyed double-coat heat sensitivity, high exercise needs, severe noise anxiety during thunderstorms, snuffle mat / puzzle preferences).
2. For each handler, show BOTH positive match factors ("keyReasons") AND relevant considerations / limitations ("considerations").

Return a JSON array of matches matching this schema:
[
  {
    "handlerId": "string",
    "matchPercentage": number (70-98),
    "keyReasons": ["positive match factor 1", "positive match factor 2", "positive match factor 3"],
    "considerations": ["relevant consideration 1", "relevant consideration 2"],
    "trustSignals": ["string 1", "string 2"]
  }
]
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              handlerId: { type: Type.STRING },
              matchPercentage: { type: Type.NUMBER },
              keyReasons: { type: Type.ARRAY, items: { type: Type.STRING } },
              considerations: { type: Type.ARRAY, items: { type: Type.STRING } },
              trustSignals: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["handlerId", "matchPercentage", "keyReasons", "considerations", "trustSignals"],
          },
        },
      },
    });

    const matches = JSON.parse(response.text || "[]");
    return res.json({ success: true, source: "gemini-3.6-flash", matches: matches.length > 0 ? matches : buildFallbackMatches(handlers) });
  } catch (error: any) {
    console.warn("Match Handlers Notice (falling back to rule engine):", error?.message?.slice(0, 200));
    return res.json({
      success: true,
      source: "rule-engine-fallback",
      matches: buildFallbackMatches(handlers),
    });
  }
});

// Helper for handover fallback
function buildFallbackHandover(pet: any, caregiverName?: string, duration?: string, additionalNotes?: string) {
  const defaultObservation = pet?.careHistory?.find((c: any) => c.notes?.includes("thunderstorm"))?.notes ||
    "During Teddie's previous boarding stay, he became anxious during an evening thunderstorm. Moving him to a quiet air-conditioned room, playing low background music and giving him his familiar blanket helped him settle within approximately 20 minutes.";

  return {
    summaryTitle: `Pawmise AI Care Handover Pass • ${pet?.name || "Teddie"} (${pet?.breed || "Samoyed"})`,
    greetingNotice: `Prepared for incoming handler: ${caregiverName || "Sarah Lim"} • Duration: ${duration || "Upcoming Stay"}`,
    feedingRoutine: pet?.feedingRoutine?.dietDetails 
      ? `${pet.feedingRoutine.mealsPerDay || 2} meals daily: ${pet.feedingRoutine.dietDetails}. Add ${pet.feedingRoutine.supplements || "salmon oil"}. Allergy: ${pet.feedingRoutine.foodAllergies?.join(', ') || "None"}.` 
      : "Not provided — pawrent input required",
    exerciseRoutine: pet?.exerciseRoutine?.weatherPrecautions 
      ? `${pet.exerciseRoutine.walksPerDay || 2} daily walks (${pet.exerciseRoutine.preferredTimes?.join(", ") || "Cool hours"}). ${pet.exerciseRoutine.weatherPrecautions}` 
      : "Not provided — pawrent input required",
    behaviourAndTemperament: `${pet?.behaviour || "Friendly, social and energetic."} Personality traits: ${pet?.personality?.join(", ") || "Friendly, Social"}.`,
    triggersAndAnxieties: `Anxiety Triggers: ${pet?.anxietyTriggers?.join(", ") || "Noise & Thunderstorms"}. Preferred Environment: ${pet?.environmentPreference || "Air-conditioned"}`,
    medicationHealth: pet?.medicalHistory?.specialConditions 
      ? `Vaccinations: ${pet.medicalHistory.vaccinationsUpToDate ? "Up to date" : "Pending"}. Microchip: ${pet.medicalHistory.microchipId || "S9876543A"}. ${pet.medicalHistory.specialConditions}` 
      : "Not provided — pawrent input required",
    likesDislikes: `Loves: ${pet?.favouriteActivities?.join(", ") || "Cool walks, puzzle toys"}. Dislikes: Direct hot sun, loud vacuum sounds.`,
    emergencyContact: pet?.medicalHistory?.vetClinic 
      ? `Pawrent Contact: +65 9123 4567 | Vet Clinic: ${pet.medicalHistory.vetClinic} (${pet.medicalHistory.vetPhone})` 
      : "Not provided — pawrent input required",
    previousObservations: defaultObservation,
    importantInstructions: additionalNotes 
      ? `Pawrent Instruction: ${additionalNotes}. Standard: Always keep leash attached near roads, maintain air-con environment.` 
      : "Standard: Keep leash attached near traffic. Never walk on hot asphalt. Keep chilled water available."
  };
}

// 3. AI Care Handover Generation
app.post("/api/generate-handover", async (req, res) => {
  const { pet, caregiverName, duration, additionalNotes } = req.body || {};
  try {
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        success: true,
        source: "template",
        handover: buildFallbackHandover(pet, caregiverName, duration, additionalNotes)
      });
    }

    const prompt = `You are Pawmise AI, generating a structured, professional AI Care Handover for a new caregiver.

Pet Profile:
${JSON.stringify(pet, null, 2)}
Caregiver Name: ${caregiverName || "Sarah Lim"}
Duration: ${duration || "Upcoming Stay"}
Additional Pawrent Notes: ${additionalNotes || "None"}

CRITICAL GROUNDING DIRECTIVE:
1. Do NOT invent missing information. If information such as feeding quantities, medication, or emergency contacts has not been provided in the pet profile, explicitly return 'Not provided — pawrent input required' for that section.
2. For previousObservations, ALWAYS include the verified observation: "During Teddie's previous boarding stay, he became anxious during an evening thunderstorm. Moving him to a quiet air-conditioned room, playing low background music and giving him his familiar blanket helped him settle within approximately 20 minutes."

Generate a detailed JSON object:
{
  "summaryTitle": "string",
  "greetingNotice": "string",
  "feedingRoutine": "string",
  "exerciseRoutine": "string",
  "behaviourAndTemperament": "string",
  "triggersAndAnxieties": "string",
  "medicationHealth": "string",
  "likesDislikes": "string",
  "emergencyContact": "string",
  "previousObservations": "string",
  "importantInstructions": "string"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summaryTitle: { type: Type.STRING },
            greetingNotice: { type: Type.STRING },
            feedingRoutine: { type: Type.STRING },
            exerciseRoutine: { type: Type.STRING },
            behaviourAndTemperament: { type: Type.STRING },
            triggersAndAnxieties: { type: Type.STRING },
            medicationHealth: { type: Type.STRING },
            likesDislikes: { type: Type.STRING },
            emergencyContact: { type: Type.STRING },
            previousObservations: { type: Type.STRING },
            importantInstructions: { type: Type.STRING },
          },
          required: [
            "summaryTitle", "greetingNotice", "feedingRoutine", "exerciseRoutine",
            "behaviourAndTemperament", "triggersAndAnxieties", "medicationHealth",
            "likesDislikes", "emergencyContact", "previousObservations", "importantInstructions"
          ]
        }
      }
    });

    const handover = JSON.parse(response.text || "{}");
    return res.json({ success: true, source: "gemini-3.6-flash", handover });
  } catch (error: any) {
    console.warn("Generate Handover Notice (falling back to template):", error?.message?.slice(0, 200));
    return res.json({
      success: true,
      source: "template-fallback",
      handover: buildFallbackHandover(pet, caregiverName, duration, additionalNotes)
    });
  }
});

// 4. Personalised Care Ideas Generation
app.post("/api/generate-care-ideas", async (req, res) => {
  const { pet, goal, setting, additionalNotes } = req.body || {};
  try {
    const ai = getGenAI();
    const sampleIdeas = buildFallbackIdeas(pet, goal, setting, additionalNotes);

    if (!ai) {
      return res.json({
        success: true,
        source: "template",
        ideas: sampleIdeas
      });
    }

    const prompt = `You are Pawmise AI, an expert pet enrichment & co-creation engine in Singapore.
Pet Profile:
${JSON.stringify(pet, null, 2)}

Pawrent Selections & Intent:
- Primary Goal: ${goal || "Mental Stimulation & Energy Burn"}
- Environment Setting: ${setting || "Indoor or Shaded Outdoor"}
- Additional Pawrent Consideration / Notes: ${additionalNotes || "None"}

CRITICAL GROUNDING DIRECTIVE:
1. Base all recommendations strictly on ${pet?.name || "Teddie"}'s profile traits: ${pet?.breed || "Samoyed"} breed, age ${pet?.age || 3}, high exercise needs, love for puzzle toys/snuffle mats, severe noise/thunderstorm sensitivity, and Singapore heat-sensitive double coat.
2. DO NOT invent medical conditions, preferences, or traits not in the profile.
3. For each idea, provide 3-4 specific profile characteristics in 'influencedByTraits' (e.g. ["Samoyed", "High energy", "Social", "Enjoys puzzle toys", "Sensitive to loud noises", "Heat-sensitive double coat"]).

Generate 3 creative, distinct enrichment activities in JSON format:
[
  {
    "id": "idea-1",
    "title": "string",
    "category": "string",
    "duration": "string",
    "description": "string",
    "whySuitsPet": "string explaining why this suits ${pet?.name || "Teddie"}",
    "whatYouNeed": ["item 1", "item 2", "item 3"],
    "careConsiderations": ["consideration 1", "consideration 2"],
    "influencedByTraits": ["trait 1", "trait 2", "trait 3"]
  }
]`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              category: { type: Type.STRING },
              duration: { type: Type.STRING },
              description: { type: Type.STRING },
              whySuitsPet: { type: Type.STRING },
              whatYouNeed: { type: Type.ARRAY, items: { type: Type.STRING } },
              careConsiderations: { type: Type.ARRAY, items: { type: Type.STRING } },
              influencedByTraits: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["id", "title", "category", "duration", "description", "whySuitsPet", "whatYouNeed", "careConsiderations", "influencedByTraits"]
          }
        }
      }
    });

    const ideas = JSON.parse(response.text || "[]");
    return res.json({ success: true, source: "gemini-3.6-flash", ideas: ideas.length > 0 ? ideas : sampleIdeas });
  } catch (error: any) {
    console.warn("Generate Care Ideas Notice (falling back to template):", error?.message?.slice(0, 200));
    return res.json({
      success: true,
      source: "template-fallback",
      ideas: buildFallbackIdeas(pet, goal, setting, additionalNotes)
    });
  }
});

// 5. Co-Creation Adaptation Endpoint
app.post("/api/adapt-care-idea", async (req, res) => {
  const { pet, originalIdea, feedbackInstruction, mode } = req.body || {};
  try {
    const ai = getGenAI();

    if (!ai) {
      const isMoreCreative = mode === 'creative';
      return res.json({
        success: true,
        source: "template",
        adaptedIdea: {
          ...originalIdea,
          title: isMoreCreative ? `✨ ${originalIdea.title} (Creative Twist)` : `🛠️ ${originalIdea.title} (Adapted)`,
          duration: feedbackInstruction?.includes('15 mins') || feedbackInstruction?.includes('15 minutes') ? '15 minutes' : originalIdea.duration,
          description: `[Co-created with Pawrent]: ${originalIdea.description} Adapted for: "${feedbackInstruction || "Creative enhancement"}".`,
          whySuitsPet: `${originalIdea.whySuitsPet} (Refined to incorporate pawrent feedback: ${feedbackInstruction}).`,
          whatYouNeed: [...(originalIdea.whatYouNeed || []), isMoreCreative ? "Interactive timer & partner" : "Custom setup adjustments"],
          careConsiderations: [...(originalIdea.careConsiderations || []), "Adapted based on live pawrent preference."],
          isAdapted: true,
          adaptationNote: feedbackInstruction || (isMoreCreative ? "Made more creative" : "Adapted by pawrent"),
          version: (originalIdea.version || 1) + 1
        }
      });
    }

    const prompt = `You are Pawmise AI, co-creating a refined pet care idea with a pawrent.
Pet Profile:
${JSON.stringify(pet, null, 2)}

Original Idea:
${JSON.stringify(originalIdea, null, 2)}

Pawrent Feedback / Adaptation Instruction: "${feedbackInstruction || "Make this idea more creative and novel"}"
Co-Creation Mode: ${mode === 'creative' ? 'Make It More Creative' : 'Adapt This Idea'}

Generate a single refined JSON object for this idea. Modify the title, duration, description, items needed, and care considerations to directly incorporate the pawrent's feedback while strictly adhering to ${pet?.name || "Teddie"}'s profile traits (${pet?.breed || "Samoyed"}, high energy, noise sensitivity, heat-sensitive double coat).

Return JSON:
{
  "id": "${originalIdea?.id || 'idea-adapted'}",
  "title": "string",
  "category": "${originalIdea?.category || 'Enrichment'}",
  "duration": "string",
  "description": "string",
  "whySuitsPet": "string",
  "whatYouNeed": ["string"],
  "careConsiderations": ["string"],
  "influencedByTraits": ["string"],
  "isAdapted": true,
  "adaptationNote": "${feedbackInstruction || 'Refined with Pawrent Input'}",
  "version": ${(originalIdea?.version || 1) + 1}
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            category: { type: Type.STRING },
            duration: { type: Type.STRING },
            description: { type: Type.STRING },
            whySuitsPet: { type: Type.STRING },
            whatYouNeed: { type: Type.ARRAY, items: { type: Type.STRING } },
            careConsiderations: { type: Type.ARRAY, items: { type: Type.STRING } },
            influencedByTraits: { type: Type.ARRAY, items: { type: Type.STRING } },
            isAdapted: { type: Type.BOOLEAN },
            adaptationNote: { type: Type.STRING },
            version: { type: Type.NUMBER }
          },
          required: ["title", "category", "duration", "description", "whySuitsPet", "whatYouNeed", "careConsiderations", "influencedByTraits", "isAdapted", "adaptationNote"]
        }
      }
    });

    const adaptedIdea = JSON.parse(response.text || "{}");
    return res.json({ success: true, source: "gemini-3.6-flash", adaptedIdea });
  } catch (error: any) {
    console.warn("Adapt Care Idea Notice (falling back to template):", error?.message?.slice(0, 200));
    const isMoreCreative = mode === 'creative';
    const original = originalIdea || {
      id: 'idea-1',
      title: "Chilled Indoor Sniffari & Scent Puzzle Quest",
      category: "Mental Stimulation",
      duration: "20-30 minutes",
      description: "Air-conditioned indoor scent puzzle trail.",
      whySuitsPet: "Engages working breed intelligence safely.",
      whatYouNeed: ["Snuffle mat", "Salmon treats"],
      careConsiderations: ["Keep AC at 22°C"],
      influencedByTraits: ["Samoyed", "High energy", "Enjoys puzzle toys", "Heat-sensitive double coat"]
    };

    const is15Min = feedbackInstruction?.toLowerCase().includes('15 min') || feedbackInstruction?.toLowerCase().includes('15 minutes');
    const is2Dogs = feedbackInstruction?.toLowerCase().includes('two dogs') || feedbackInstruction?.toLowerCase().includes('2 dogs');
    const isIndoors = feedbackInstruction?.toLowerCase().includes('indoor') || feedbackInstruction?.toLowerCase().includes('indoors');
    const isParticipate = feedbackInstruction?.toLowerCase().includes('participate') || feedbackInstruction?.toLowerCase().includes('together');

    let updatedTitle = isMoreCreative ? `✨ ${original.title} (Creative Twist)` : `🛠️ ${original.title} (Adapted)`;
    if (is2Dogs) updatedTitle = `🐕🐕 ${original.title} (Two-Dog Edition)`;
    if (isIndoors) updatedTitle = `🏠 ${original.title} (100% Indoor Adaptation)`;

    return res.json({
      success: true,
      source: "template-fallback",
      adaptedIdea: {
        ...original,
        id: original.id || 'idea-adapted',
        title: updatedTitle,
        duration: is15Min ? '15 minutes' : original.duration,
        description: `[Co-Created Refinement]: ${original.description} Refined for: "${feedbackInstruction || (isMoreCreative ? "Maximum novelty & engagement" : "Pawrent preference")}".`,
        whySuitsPet: `${original.whySuitsPet} (Refined to incorporate pawrent feedback: ${feedbackInstruction || "Custom adaptation"}).`,
        whatYouNeed: [
          ...(original.whatYouNeed || []),
          is2Dogs ? "Extra treat bowls & divider space for 2 dogs" : isParticipate ? "Interactive handler participation" : "Custom setup adjustment"
        ],
        careConsiderations: [
          ...(original.careConsiderations || []),
          "Adapted based on live pawrent preference."
        ],
        influencedByTraits: original.influencedByTraits || ["Samoyed", "High energy", "Enjoys puzzle toys", "Heat-sensitive double coat"],
        isAdapted: true,
        adaptationNote: feedbackInstruction || (isMoreCreative ? "Made more creative" : "Adapted by pawrent"),
        version: (original.version || 1) + 1
      }
    });
  }
});

// Start Express + Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Pawmise AI Care Companion Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
