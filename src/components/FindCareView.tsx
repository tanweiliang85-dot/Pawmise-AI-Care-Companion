import React, { useState, useEffect } from 'react';
import { PetProfile, HandlerProfile, HandlerMatch } from '../types';
import {
  Search,
  ShieldCheck,
  Sparkles,
  Award,
  Star,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Clock,
  ThumbsUp,
  UserCheck,
  Send,
  X,
  ChevronRight,
  SlidersHorizontal,
  RefreshCw,
  Info
} from 'lucide-react';

interface FindCareViewProps {
  pets: PetProfile[];
  selectedPetId: string;
  setSelectedPetId: (id: string) => void;
  handlers: HandlerProfile[];
}

export const FindCareView: React.FC<FindCareViewProps> = ({
  pets,
  selectedPetId,
  setSelectedPetId,
  handlers,
}) => {
  const selectedPet = pets.find((p) => p.id === selectedPetId) || pets[0];
  const [careType, setCareType] = useState('Full Day Air-Con Care & Socialization');
  const [matches, setMatches] = useState<HandlerMatch[]>([]);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [selectedHandlerForBooking, setSelectedHandlerForBooking] = useState<HandlerProfile | null>(null);
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Trigger AI Matching Analysis
  const runAiMatching = async () => {
    setIsLoadingAi(true);
    try {
      const response = await fetch('/api/match-handlers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pet: selectedPet,
          careType,
          handlers,
        }),
      });

      const data = await response.json();
      if (data.matches && Array.isArray(data.matches)) {
        setMatches(data.matches);
      }
    } catch (err) {
      console.error('Failed to run AI handler matching:', err);
    } finally {
      setIsLoadingAi(false);
    }
  };

  useEffect(() => {
    runAiMatching();
  }, [selectedPetId, careType]);

  // Combine handler data with match analysis
  const rankedHandlers = handlers.map((handler) => {
    const match = matches.find((m) => m.handlerId === handler.id) || {
      handlerId: handler.id,
      matchPercentage: handler.id === 'handler-1' || handler.name.includes('Sarah') ? 96 : handler.id === 'handler-2' || handler.name.includes('Marcus') ? 88 : 74,
      keyReasons: handler.id === 'handler-1' || handler.name.includes('Sarah') ? [
        "6 years' experience with certified pet first aid & deep specialization in Samoyeds and double-coated breeds.",
        "Acoustic thunderstorm noise damping directly addresses Teddie's severe noise anxiety triggers.",
        "186 verified Pawmise services with an 82% repeat booking rate."
      ] : handler.id === 'handler-2' || handler.name.includes('Marcus') ? [
        "Certified dog trainer specializing in high-energy dogs and behavioural enrichment (ideal for Teddie's high exercise needs & puzzle toys).",
        "4 years' experience with 121 verified Pawmise services and 76% repeat booking rate.",
        "Structured physical and mental stimulation during temperature-safe morning/evening windows."
      ] : [
        "2 years' pet-sitting experience with 67 verified Pawmise services and strong owner reviews.",
        "Attentive 1-on-1 indoor air-conditioned companion care suitable for calm routine supervision."
      ],
      considerations: handler.id === 'handler-1' || handler.name.includes('Sarah') ? [
        "High demand handler; advance booking recommended for peak weekend air-con slots.",
        "Higher hourly rate (S$28/hr) for specialized double-coat & noise desensitization care."
      ] : handler.id === 'handler-2' || handler.name.includes('Marcus') ? [
        "Focuses heavily on high-energy outdoor exercise; walks must be strictly kept to cool early morning/evening hours for Samoyed double coats.",
        "Does not possess specialized acoustic noise anxiety equipment compared to Sarah for sudden thunderstorms."
      ] : [
        "Limited Samoyed-specific double-coat experience; requires clear guidance on post-walk coat brushing & heat monitoring.",
        "May require Pawmise thunderstorm soothing protocols if sudden loud noises or heavy rain occur during care."
      ],
      trustSignals: ['PROTOTYPE / DEMO DATA', `Trust Score: ${handler.trustScore}/100`, `${handler.verifiedServicesCount} Verified Services`]
    };
    return { handler, match };
  }).sort((a, b) => b.match.matchPercentage - a.match.matchPercentage);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-100 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                <Search className="w-3.5 h-3.5 text-amber-600" />
                <span>1. Decision-Making Engine</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-900 text-amber-300 text-xs font-bold border border-amber-400/30">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                <span>PROTOTYPE / DEMO DATA</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
              Find My Trusted Handler
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
              Explainable AI compatibility ranking that evaluates caregiver experience, verified credentials, and environmental fit for <span className="font-bold text-stone-900">{selectedPet.name} ({selectedPet.breed})</span>.
            </p>
          </div>

          <button
            onClick={runAiMatching}
            disabled={isLoadingAi}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 self-start md:self-center shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingAi ? 'animate-spin' : ''}`} />
            <span>{isLoadingAi ? 'Re-Analyzing AI Match...' : 'Re-Run AI Matching'}</span>
          </button>
        </div>

        {/* Prototype Match Directive Notice */}
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Pet-Specific Match Compatibility Notice (Prototype Demonstration)</span>
          </div>
          <p className="leading-relaxed text-amber-900">
            When matching <span className="font-bold">{selectedPet.name}</span>, handlers are <span className="underline font-bold">not simply ranked by Trust Score</span> (Sarah Lim: 94/100, Marcus Tan: 89/100, Chloe Lee: 81/100). The AI engine evaluates {selectedPet.name}'s specific characteristics—including Samoyed double-coat thermal sensitivity, high exercise needs, and severe thunderstorm noise anxiety—showing both <span className="font-bold text-emerald-800">positive match factors</span> and <span className="font-bold text-amber-900">relevant considerations</span> for every handler.
          </p>
        </div>

        {/* Filter / Pet Selection Toolbar */}

        {/* Filter / Pet Selection Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {/* Pet Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Caring For Furkid</label>
            <select
              value={selectedPetId}
              onChange={(e) => setSelectedPetId(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {pets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.breed} • {p.age} yrs)
                </option>
              ))}
            </select>
          </div>

          {/* Care Type Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Service Required</label>
            <select
              value={careType}
              onChange={(e) => setCareType(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Full Day Air-Con Care & Socialization">Full Day Air-Con Care & Socialization</option>
              <option value="Early Morning Shaded Trail Walk">Early Morning Shaded Trail Walk</option>
              <option value="Anxiety & Thunderstorm Care Session">Anxiety & Thunderstorm Care Session</option>
              <option value="Overnight Air-Con Home Boarding">Overnight Air-Con Home Boarding</option>
            </select>
          </div>

          {/* AI Match Context Pill */}
          <div className="sm:col-span-2 lg:col-span-1 bg-amber-50/90 rounded-2xl p-3 border border-amber-200 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-[11px] text-amber-900 font-medium leading-tight">
              AI evaluates <span className="font-bold">{selectedPet.name}'s</span> heat sensitivity, thunderstorm triggers, and breed double-coat requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Prominent Trust Philosophy Callout */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-4 sm:p-5 text-stone-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 shrink-0 fill-stone-950/20 text-stone-950" />
          <span>
            “Pawmise recommends the individual caring for your furkid—not just the company they work for.”
          </span>
        </div>
        <span className="hidden lg:inline-block px-3 py-1 bg-stone-950 text-amber-300 font-bold text-[11px] rounded-full uppercase tracking-wider shrink-0">
          Portable Identity
        </span>
      </div>

      {/* Ranked Handlers List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-serif text-stone-900 flex items-center gap-2">
            <span>AI Ranked Handlers for {selectedPet.name}</span>
            {isLoadingAi && <span className="text-xs font-normal text-amber-600 animate-pulse">(Evaluating...)</span>}
          </h2>
          <span className="text-xs font-semibold text-stone-500">Sorted by AI Compatibility %</span>
        </div>

        <div className="space-y-6">
          {rankedHandlers.map(({ handler, match }, index) => {
            const isTopMatch = index === 0;

            return (
              <div
                key={handler.id}
                className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-300 relative shadow-sm ${
                  isTopMatch
                    ? 'ring-2 ring-amber-500 border-amber-300 shadow-xl'
                    : 'border-stone-200 hover:border-amber-300'
                }`}
              >
                {/* Top Match Ribbon */}
                {isTopMatch && (
                  <div className="absolute -top-3.5 right-6 px-4 py-1 rounded-full bg-amber-500 text-stone-950 font-bold text-xs shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>#1 Highest AI Compatibility Match</span>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Handler Profile Overview (5 cols) */}
                  <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-r border-stone-100 pb-6 lg:pb-0 lg:pr-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={handler.avatarUrl}
                        alt={handler.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-amber-400/50 shadow-md shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg sm:text-xl font-bold font-serif text-stone-900">
                            {handler.name}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            ✓ Verified
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300">
                            Prototype / Demo
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-amber-800 leading-tight">
                          {handler.role}
                        </p>
                        <p className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                          <span>{handler.location}</span>
                        </p>
                      </div>
                    </div>

                    {/* Trust Metrics Pill Row */}
                    <div className="grid grid-cols-3 gap-2 bg-stone-50 p-3 rounded-2xl text-center text-xs">
                      <div>
                        <span className="text-[10px] text-stone-500 font-medium block">Trust Score</span>
                        <span className="font-bold text-amber-800 text-sm">{handler.trustScore}/100</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 font-medium block">Verified Bookings</span>
                        <span className="font-bold text-stone-900 text-sm">{handler.verifiedServicesCount}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 font-medium block">Repeat Rate</span>
                        <span className="font-bold text-emerald-700 text-sm">{handler.repeatBookingRate}%</span>
                      </div>
                    </div>

                    {/* Qualifications & Badges */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                        Verified Credentials & Badges
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {handler.verifiedQualifications.map((qual, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 text-[11px] font-medium border border-stone-200"
                          >
                            ✓ {qual}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Relevant Breed Experience */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-stone-500 block">
                        Relevant Breed Experience:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {handler.relevantBreedExperience.map((breed, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                              breed.toLowerCase().includes(selectedPet.breed.toLowerCase())
                                ? 'bg-amber-100 text-amber-900 ring-1 ring-amber-400'
                                : 'bg-stone-100 text-stone-600'
                            }`}
                          >
                            {breed}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Explainable AI Match Analysis (7 cols) */}
                  <div className="lg:col-span-7 space-y-5">
                    
                    {/* Match Score Header */}
                    <div className="flex items-center justify-between bg-stone-900 text-stone-100 p-4 rounded-2xl shadow-inner">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-lg shadow">
                          {match.matchPercentage}%
                        </div>
                        <div>
                          <div className="font-bold text-sm text-white font-serif">
                            Explainable AI Compatibility Match
                          </div>
                          <p className="text-[11px] text-stone-300">
                            Evaluated specifically for <span className="text-amber-300 font-semibold">{selectedPet.name} ({selectedPet.breed})</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-amber-400 block">{handler.hourlyRate}</span>
                        <span className="text-[10px] text-stone-400">Verified Direct Rate</span>
                      </div>
                    </div>

                    {/* Key Match Reasons */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Why {handler.name} is recommended for {selectedPet.name}:</span>
                      </div>
                      <ul className="space-y-2">
                        {match.keyReasons.map((reason, idx) => (
                          <li
                            key={idx}
                            className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 text-xs text-stone-800 flex items-start gap-2.5"
                          >
                            <ThumbsUp className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Potential Considerations / Risks */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span>Potential Considerations & Risk Mitigations:</span>
                      </div>
                      <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                        <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <ul className="space-y-1">
                          {match.considerations.map((cons, idx) => (
                            <li key={idx} className="leading-relaxed">{cons}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Verified Reviews Snippet */}
                    {handler.verifiedReviews.length > 0 && (
                      <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 text-xs space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] text-stone-500 font-semibold">
                          <span>Recent Verified Review</span>
                          <span className="flex items-center gap-1 text-amber-600">
                            <Star className="w-3 h-3 fill-amber-500" />
                            {handler.verifiedReviews[0].rating}.0 / 5
                          </span>
                        </div>
                        <p className="text-stone-700 italic">
                          "{handler.verifiedReviews[0].comment}"
                        </p>
                        <p className="text-[10px] text-stone-400 text-right">
                          — {handler.verifiedReviews[0].reviewerName} ({handler.verifiedReviews[0].petBreed})
                        </p>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => {
                          setSelectedHandlerForBooking(handler);
                          setBookingMessage(`Hi ${handler.name}! I would like to book care for my ${selectedPet.breed}, ${selectedPet.name}. The AI Match engine recommended you (${match.matchPercentage}% match) due to your experience with ${selectedPet.breed} breeds and anxiety management.`);
                          setBookingSubmitted(false);
                        }}
                        className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>Book {handler.name} for {selectedPet.name}</span>
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Enquiry Modal */}
      {selectedHandlerForBooking && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedHandlerForBooking(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold font-serif text-stone-900">
                  Care Request Sent!
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                  Your request has been delivered directly to <span className="font-bold text-stone-900">{selectedHandlerForBooking.name}</span> along with {selectedPet.name}'s verified Pawmise profile summary.
                </p>
                <button
                  onClick={() => setSelectedHandlerForBooking(null)}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                  <img
                    src={selectedHandlerForBooking.avatarUrl}
                    alt={selectedHandlerForBooking.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-400"
                  />
                  <div>
                    <h3 className="text-lg font-bold font-serif text-stone-900">
                      Request Care with {selectedHandlerForBooking.name}
                    </h3>
                    <p className="text-xs text-amber-800 font-medium">
                      {selectedHandlerForBooking.companyOrStudio}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-2xl text-xs text-amber-900 space-y-1 border border-amber-200">
                  <span className="font-bold block">Pre-Filled AI Context Attached:</span>
                  <p className="text-[11px] text-amber-800">
                    • Furkid: {selectedPet.name} ({selectedPet.breed}, {selectedPet.age} yrs)
                  </p>
                  <p className="text-[11px] text-amber-800">
                    • Special Notes: {selectedPet.careNotes}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Personalized Message to Handler</label>
                  <textarea
                    value={bookingMessage}
                    onChange={(e) => setBookingMessage(e.target.value)}
                    rows={4}
                    className="w-full text-xs p-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setSelectedHandlerForBooking(null)}
                    className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setBookingSubmitted(true)}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Request to {selectedHandlerForBooking.name}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
