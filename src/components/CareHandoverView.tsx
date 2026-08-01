import React, { useState } from 'react';
import { PetProfile, CareHandoverData } from '../types';
import {
  FileSpreadsheet,
  Sparkles,
  Check,
  Copy,
  Printer,
  QrCode,
  Share2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Heart,
  Phone,
  Edit3,
  CheckCircle,
  FileText,
  UserCheck,
  Info,
  Send,
  MessageSquare,
  Lock,
  Unlock,
  Eye,
  Bookmark
} from 'lucide-react';

interface CareHandoverViewProps {
  pet: PetProfile;
}

export const CareHandoverView: React.FC<CareHandoverViewProps> = ({ pet }) => {
  const [caregiverName, setCaregiverName] = useState('Sarah Lim');
  const [duration, setDuration] = useState('3-Day Boarding & Daycare Stay');
  const [additionalNotes, setAdditionalNotes] = useState('Please give 1 pump of salmon oil with evening meal. Teddie enjoys snuffle mat treats before bedtime.');
  const [isLoading, setIsLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [approvalConfirmed, setApprovalConfirmed] = useState(false);
  
  // Modals for sharing prototypes
  const [showQrModal, setShowQrModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Exact thunderstorm observation required by specification
  const thunderstormObservation = "During Teddie's previous boarding stay, he became anxious during an evening thunderstorm. Moving him to a quiet air-conditioned room, playing low background music and giving him his familiar blanket helped him settle within approximately 20 minutes.";

  const [handoverData, setHandoverData] = useState<CareHandoverData | null>({
    summaryTitle: `Pawmise AI Care Handover Pass • ${pet.name} (${pet.breed})`,
    greetingNotice: `Prepared for incoming handler: ${caregiverName} • Duration: ${duration}`,
    feedingRoutine: pet.feedingRoutine?.dietDetails 
      ? `${pet.feedingRoutine.mealsPerDay} meals daily: ${pet.feedingRoutine.dietDetails}. Add ${pet.feedingRoutine.supplements}. Allergy: ${pet.feedingRoutine.foodAllergies.join(', ')}.`
      : "Not provided — pawrent input required",
    exerciseRoutine: pet.exerciseRoutine?.weatherPrecautions
      ? `${pet.exerciseRoutine.walksPerDay} daily walks (${pet.exerciseRoutine.preferredTimes.join(', ')}). ${pet.exerciseRoutine.weatherPrecautions}`
      : "Not provided — pawrent input required",
    behaviourAndTemperament: `${pet.behaviour} Personality traits: ${pet.personality.join(', ')}.`,
    triggersAndAnxieties: `Anxiety Triggers: ${pet.anxietyTriggers.join(', ')}. Preferred Environment: ${pet.environmentPreference}`,
    medicationHealth: pet.medicalHistory?.specialConditions
      ? `Vaccinations: ${pet.medicalHistory.vaccinationsUpToDate ? 'Up to date' : 'Pending'}. Microchip: ${pet.medicalHistory.microchipId}. Special Condition: ${pet.medicalHistory.specialConditions}`
      : "Not provided — pawrent input required",
    likesDislikes: `Loves: ${pet.favouriteActivities.join(', ')}. Dislikes: Direct afternoon sun, loud vacuum cleaners.`,
    emergencyContact: pet.medicalHistory?.vetClinic
      ? `Pawrent Contact: +65 9123 4567 | Vet Clinic: ${pet.medicalHistory.vetClinic} (${pet.medicalHistory.vetPhone})`
      : "Not provided — pawrent input required",
    previousObservations: thunderstormObservation,
    importantInstructions: `Pawrent Instruction: ${additionalNotes}. Standard: Keep leash attached near traffic. Maintain air-conditioned indoor resting environment.`
  });

  const generateHandover = async () => {
    setIsLoading(true);
    setIsApproved(false); // Reset approval when regenerated
    setApprovalConfirmed(false);
    try {
      const response = await fetch('/api/generate-handover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pet,
          caregiverName,
          duration,
          additionalNotes,
        }),
      });

      const data = await response.json();
      if (data.handover) {
        setHandoverData(data.handover);
      }
    } catch (err) {
      console.error('Failed to generate AI care handover:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveHandover = () => {
    if (!approvalConfirmed) return;
    setIsApproved(true);
  };

  const handleCopySummary = () => {
    if (!handoverData) return;
    const fullText = `🐾 PAWMISE AI CARE HANDOVER SUMMARY
Pet: ${pet.name} (${pet.breed}, ${pet.age} yrs)
Incoming Handler: ${caregiverName} | Stay: ${duration}

[DATA ORIGIN LEGEND]
• Pawrent Profile Data
• Verified Care History
• AI-Generated Summary

IMPORTANT PREVIOUS CARE INSIGHT (Verified Care History):
"${thunderstormObservation}"
*Pawmise AI surfaced this insight from Teddie's verified care history so his next caregiver does not have to start from zero.*

1. FEEDING ROUTINE [Pawrent Profile]:
${handoverData.feedingRoutine}

2. EXERCISE ROUTINE [Pawrent Profile]:
${handoverData.exerciseRoutine}

3. BEHAVIOUR & TEMPERAMENT [Pawrent Profile]:
${handoverData.behaviourAndTemperament}

4. TRIGGERS & ANXIETIES [Pawrent Profile]:
${handoverData.triggersAndAnxieties}

5. LIKES & DISLIKES [Pawrent Profile]:
${handoverData.likesDislikes}

6. HEALTH & CARE CONSIDERATIONS [Pawrent Profile]:
${handoverData.medicationHealth}

7. EMERGENCY CONTACT [Pawrent Profile]:
${handoverData.emergencyContact}

8. IMPORTANT PAWRENT INSTRUCTIONS [AI-Generated Summary]:
${handoverData.importantInstructions}

9. RELEVANT PREVIOUS CAREGIVER OBSERVATIONS [Verified Care History]:
${handoverData.previousObservations}

AI prepares. Pawrent verifies. Caregiver receives.
`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-100 pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold">
                <FileSpreadsheet className="w-3.5 h-3.5 text-orange-600" />
                <span>2. Collaboration Capability</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI-Enabled Continuity of Care</span>
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
              Prepare Care Handover
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
              Pawmise prevents every new caregiver from <span className="font-bold text-stone-900">"starting from zero"</span> by compiling <span className="font-bold text-stone-900">{pet.name}'s</span> lifelong pet profile and verified care history into an actionable, portable Care Pass.
            </p>
          </div>

          {/* Central Governance Banner */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-amber-950 text-xs max-w-xs space-y-1 shadow-sm">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Core Principle</span>
            </div>
            <p className="font-serif text-sm font-bold text-amber-950">
              “AI prepares. Pawrent verifies. Caregiver receives.”
            </p>
            <p className="text-[11px] text-amber-800 leading-tight">
              AI supports seamless collaboration while human judgement and pawrent accountability remain central.
            </p>
          </div>
        </div>

        {/* Handover Parameters Form */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Incoming Caregiver / Handler</label>
            <input
              type="text"
              value={caregiverName}
              onChange={(e) => setCaregiverName(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. Sarah Lim"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Care Duration / Service Stay</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. 3-Day Boarding Stay"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Additional Custom Pawrent Notes</label>
            <input
              type="text"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. Special treat instructions or dietary timing"
            />
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-100">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Lifelong Profile & Past Observations automatically linked for {pet.name} ({pet.breed}, {pet.age} yrs).</span>
          </div>

          <button
            onClick={generateHandover}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Compiling Care Handover Summary...' : 'Prepare Care Handover'}</span>
          </button>
        </div>
      </div>

      {/* Generated AI Care Handover Pass */}
      {handoverData && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl space-y-6 relative overflow-hidden">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900 text-stone-100 p-6 rounded-2xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h2 className="text-lg sm:text-xl font-bold font-serif text-white">
                  {handoverData.summaryTitle}
                </h2>
              </div>
              <p className="text-xs text-amber-300 font-medium">
                {handoverData.greetingNotice}
              </p>
            </div>

            {/* Core Principle Tagline in Summary */}
            <div className="bg-amber-500/10 border border-amber-400/30 px-3.5 py-2 rounded-xl text-amber-300 text-xs font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>“AI prepares. Pawrent verifies. Caregiver receives.”</span>
            </div>
          </div>

          {/* VISUALLY PROMINENT SECTION: Important Previous Care Insight */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-100 to-amber-50 border-2 border-amber-400 p-6 rounded-2xl space-y-3 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 border-b border-amber-200/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500 text-stone-950 font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-serif text-stone-900">
                    Important Previous Care Insight
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold border border-emerald-300">
                      🟢 Verified Care History
                    </span>
                    <span className="text-xs text-stone-500">
                      Surfaced from past verified boarding logs
                    </span>
                  </div>
                </div>
              </div>

              <span className="hidden sm:inline-flex px-3 py-1 bg-amber-200 text-amber-950 font-bold text-xs rounded-full">
                Thunderstorm Care Protocol
              </span>
            </div>

            {/* Quoted Observation */}
            <blockquote className="text-sm font-medium text-stone-900 italic bg-white/80 p-4 rounded-xl border-l-4 border-amber-500 shadow-inner leading-relaxed">
              “{thunderstormObservation}”
            </blockquote>

            {/* Spec-Required Exact Statement */}
            <div className="bg-stone-900 text-amber-300 p-3.5 rounded-xl text-xs font-bold flex items-center gap-2.5 shadow">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                “Pawmise AI surfaced this insight from Teddie's verified care history so his next caregiver does not have to start from zero.”
              </span>
            </div>
          </div>

          {/* Source Origin Legend Bar */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-bold text-stone-800">Information Data Source Origin:</span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 font-bold border border-blue-300 flex items-center gap-1">
                <span>🔵</span> Pawrent Profile
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold border border-emerald-300 flex items-center gap-1">
                <span>🟢</span> Verified Care History
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-bold border border-purple-300 flex items-center gap-1">
                <span>🟣</span> AI-Generated Summary
              </span>
            </div>
          </div>

          {/* Structured Handover Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            
            {/* 1. Feeding Routine */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 space-y-2 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-900 font-bold font-serif text-sm">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>1. Feeding Routine</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold border border-blue-200">
                  🔵 Pawrent Profile
                </span>
              </div>
              <p className={`leading-relaxed font-medium ${handoverData.feedingRoutine.includes('Not provided') ? 'text-amber-800 italic font-bold bg-amber-50 p-2 rounded-xl' : 'text-stone-700'}`}>
                {handoverData.feedingRoutine}
              </p>
            </div>

            {/* 2. Exercise Routine */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-900 font-bold font-serif text-sm">
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span>2. Exercise & Weather Safety</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold border border-blue-200">
                  🔵 Pawrent Profile
                </span>
              </div>
              <p className={`leading-relaxed font-medium ${handoverData.exerciseRoutine.includes('Not provided') ? 'text-amber-800 italic font-bold bg-amber-50 p-2 rounded-xl' : 'text-stone-700'}`}>
                {handoverData.exerciseRoutine}
              </p>
            </div>

            {/* 3. Behaviour & Temperament */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-900 font-bold font-serif text-sm">
                  <Heart className="w-4 h-4 text-emerald-600" />
                  <span>3. Behaviour & Temperament</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold border border-blue-200">
                  🔵 Pawrent Profile
                </span>
              </div>
              <p className="text-stone-700 leading-relaxed font-medium">
                {handoverData.behaviourAndTemperament}
              </p>
            </div>

            {/* 4. Triggers & Anxieties */}
            <div className="bg-red-50/80 p-5 rounded-2xl border border-red-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-red-950 font-bold font-serif text-sm">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>4. Triggers & Anxieties</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold border border-blue-200">
                  🔵 Pawrent Profile
                </span>
              </div>
              <p className="text-red-900 leading-relaxed font-medium">
                {handoverData.triggersAndAnxieties}
              </p>
            </div>

            {/* 5. Likes & Dislikes */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-900 font-bold font-serif text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>5. Likes & Dislikes</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold border border-blue-200">
                  🔵 Pawrent Profile
                </span>
              </div>
              <p className="text-stone-700 leading-relaxed font-medium">
                {handoverData.likesDislikes}
              </p>
            </div>

            {/* 6. Health & Care Considerations */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-900 font-bold font-serif text-sm">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>6. Health & Care Considerations</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold border border-blue-200">
                  🔵 Pawrent Profile
                </span>
              </div>
              <p className={`leading-relaxed font-medium ${handoverData.medicationHealth.includes('Not provided') ? 'text-amber-800 italic font-bold bg-amber-50 p-2 rounded-xl' : 'text-stone-700'}`}>
                {handoverData.medicationHealth}
              </p>
            </div>

            {/* 7. Emergency Contact */}
            <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-950 font-bold font-serif text-sm">
                  <Phone className="w-4 h-4 text-amber-700" />
                  <span>7. Emergency Contact & Vet</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold border border-blue-200">
                  🔵 Pawrent Profile
                </span>
              </div>
              <p className={`leading-relaxed font-bold ${handoverData.emergencyContact.includes('Not provided') ? 'text-amber-900 italic font-bold bg-amber-100 p-2 rounded-xl' : 'text-stone-800'}`}>
                {handoverData.emergencyContact}
              </p>
            </div>

            {/* 8. Relevant Previous Caregiver Observations */}
            <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-950 font-bold font-serif text-sm">
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <span>8. Verified Previous Observations</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold border border-emerald-300">
                  🟢 Verified Care History
                </span>
              </div>
              <p className="text-emerald-950 leading-relaxed italic font-medium">
                "{handoverData.previousObservations}"
              </p>
            </div>

            {/* 9. Important Pawrent Instructions */}
            <div className="bg-purple-50/80 p-5 rounded-2xl border border-purple-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-950 font-bold font-serif text-sm">
                  <CheckCircle className="w-4 h-4 text-purple-700" />
                  <span>9. Important Instructions</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-bold border border-purple-300">
                  🟣 AI-Generated Summary
                </span>
              </div>
              <p className="text-purple-950 leading-relaxed font-medium">
                {handoverData.importantInstructions}
              </p>
            </div>

          </div>

          {/* REVIEW & APPROVAL GATE SECTION */}
          <div className="border-t-2 border-stone-200 pt-6 space-y-4">
            
            {!isApproved ? (
              <div className="bg-stone-900 text-stone-100 p-6 sm:p-8 rounded-3xl space-y-5 shadow-2xl relative overflow-hidden border-2 border-amber-400">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-serif text-amber-300">
                      Pawrent Approval Required Before Sharing
                    </h3>
                    <p className="text-xs text-stone-300">
                      Please review all AI-generated handover details for accuracy. Pawrent approval is required before sharing with caregivers.
                    </p>
                  </div>
                </div>

                <div className="bg-stone-800/80 p-4 rounded-2xl border border-stone-700 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="approvalCheckbox"
                    checked={approvalConfirmed}
                    onChange={(e) => setApprovalConfirmed(e.target.checked)}
                    className="mt-1 w-4 h-4 text-amber-500 bg-stone-900 border-stone-600 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="approvalCheckbox" className="text-xs text-stone-200 font-medium leading-relaxed cursor-pointer select-none">
                    I have reviewed {pet.name}'s Care Handover Summary, verified that all feeding, exercise, and emergency details are accurate, and authorize sharing with incoming caregiver <span className="font-bold text-amber-300">{caregiverName}</span>.
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>“AI prepares. Pawrent verifies. Caregiver receives.”</span>
                  </div>

                  <button
                    type="button"
                    disabled={!approvalConfirmed}
                    onClick={handleApproveHandover}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-bold text-sm transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Review & Approve Handover</span>
                  </button>
                </div>
              </div>
            ) : (
              /* UNLOCKED SHARING OPTIONS SECTION AFTER APPROVAL */
              <div className="bg-emerald-50 border-2 border-emerald-400 p-6 sm:p-8 rounded-3xl space-y-6 shadow-md animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-200 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-md">
                      <Unlock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold font-serif text-emerald-950">
                          Handover Reviewed & Approved
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-xs font-bold">
                          ✓ Ready for Sharing
                        </span>
                      </div>
                      <p className="text-xs text-emerald-800">
                        Authorized by Pawrent for caregiver <span className="font-bold">{caregiverName}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsApproved(false)}
                    className="text-xs text-emerald-800 hover:text-emerald-950 underline font-semibold"
                  >
                    Re-edit or Revoke Approval
                  </button>
                </div>

                {/* Sharing Options Bar */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-emerald-950">
                    Prototype Sharing Options:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    
                    {/* 1. Share with Handler */}
                    <button
                      type="button"
                      onClick={() => setShowShareModal(true)}
                      className="p-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition shadow-md border border-amber-400/30"
                    >
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>Share with Handler</span>
                    </button>

                    {/* 2. WhatsApp */}
                    <button
                      type="button"
                      onClick={() => setShowWhatsappModal(true)}
                      className="p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Share via WhatsApp</span>
                    </button>

                    {/* 3. PDF Export */}
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="p-3.5 rounded-2xl bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
                    >
                      <Printer className="w-4 h-4 text-stone-700" />
                      <span>Export as PDF</span>
                    </button>

                    {/* 4. QR Pass */}
                    <button
                      type="button"
                      onClick={() => setShowQrModal(true)}
                      className="p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>Show Care QR Pass</span>
                    </button>

                  </div>
                </div>

                {/* Copy Summary Quick Action */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleCopySummary}
                    className="px-4 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 text-xs font-bold flex items-center gap-2 transition border border-emerald-300"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4 text-emerald-800" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Formatted Text Summary'}</span>
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Footer Accountability Statement */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center text-stone-600 text-xs font-semibold flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>“AI prepares. Pawrent verifies. Caregiver receives.” • Pawlistic Care Accountability Standard</span>
          </div>

        </div>
      )}

      {/* SHARE WITH HANDLER MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 font-bold mx-auto flex items-center justify-center shadow-lg">
              <Send className="w-6 h-6" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-serif text-stone-900">
                Care Pass Sent to {caregiverName}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {pet.name}'s verified handover summary and thunderstorm protocols have been securely transmitted to {caregiverName}'s Pawmise Care Portal.
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950 text-left space-y-1">
              <span className="font-bold block">Transmission Confirmation:</span>
              <p>• Verified Pawrent Approval: ✓ Active</p>
              <p>• Lifelong Profile & Past Observations Attached</p>
              <p>• Handover Reference ID: <span className="font-mono font-bold">PAWMISE-HO-2026-0801</span></p>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}

      {/* WHATSAPP SHARE MODAL */}
      {showWhatsappModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center shadow-lg">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-stone-900">
                  Share via WhatsApp
                </h3>
                <p className="text-xs text-stone-500">
                  Send formatted Care Pass preview to {caregiverName}
                </p>
              </div>
            </div>

            <div className="bg-stone-900 text-stone-200 p-4 rounded-2xl text-xs font-mono max-h-48 overflow-y-auto space-y-2 border border-stone-800">
              <p className="text-amber-300 font-bold">🐾 Pawmise Care Pass for {pet.name}</p>
              <p>Incoming Caregiver: {caregiverName}</p>
              <p>Stay: {duration}</p>
              <p className="text-emerald-400">⚡ Important Insight: "{thunderstormObservation}"</p>
              <p>Feeding: {handoverData?.feedingRoutine}</p>
              <p>Exercise: {handoverData?.exerciseRoutine}</p>
              <p className="text-stone-400">Verified Pawrent Approval: Yes</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowWhatsappModal(false)}
                className="w-1/2 py-3 rounded-2xl border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-xs"
              >
                Cancel
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`🐾 PAWMISE CARE PASS FOR ${pet.name.toUpperCase()}\n\nIncoming Handler: ${caregiverName}\nStay: ${duration}\n\nIMPORTANT PREVIOUS CARE INSIGHT:\n"${thunderstormObservation}"\n\nAI prepares. Pawrent verifies. Caregiver receives.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowWhatsappModal(false)}
                className="w-1/2 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* QR CODE MODAL */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold font-serif text-stone-900">
              Pawmise Care Pass QR Code
            </h3>
            <p className="text-xs text-stone-600">
              Scan with mobile camera to instantly load {pet.name}'s verified handover pass on {caregiverName}'s device.
            </p>

            {/* Mock QR Code Graphic */}
            <div className="w-48 h-48 bg-stone-900 rounded-2xl p-4 mx-auto flex items-center justify-center border-4 border-amber-400 shadow-xl">
              <div className="w-full h-full border-2 border-dashed border-amber-300/40 rounded-xl flex flex-col items-center justify-center space-y-2">
                <QrCode className="w-20 h-20 text-amber-400" />
                <span className="text-[10px] text-stone-300 font-mono tracking-widest">PAWMISE-HO-{pet.id.toUpperCase()}</span>
              </div>
            </div>

            <p className="text-[11px] font-bold text-amber-800 bg-amber-50 p-2 rounded-xl">
              ✓ Pawrent Approval Verified
            </p>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow"
            >
              Close QR Pass
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
