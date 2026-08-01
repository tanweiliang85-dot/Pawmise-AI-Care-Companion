import React from 'react';
import { PetProfile } from '../types';
import {
  Search,
  FileSpreadsheet,
  Lightbulb,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Heart,
  Calendar,
  CheckCircle,
  Thermometer,
  CloudRain
} from 'lucide-react';

interface HomeViewProps {
  selectedPet: PetProfile;
  setActiveTab: (tab: string) => void;
  onOpenAddPetModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  selectedPet,
  setActiveTab,
  onOpenAddPetModal,
}) => {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Hero Greeting Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 border border-stone-800 text-stone-100 p-6 sm:p-10 shadow-2xl">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold border border-amber-500/30 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Singapore's AI Pet Care Trust Platform</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
                Hi Pawrent 👋 Who are we caring for today?
              </h1>
              <p className="mt-2 text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Welcome back to Pawmise. We convert lifelong pet observations and verified handler records into portable, explainable AI care intelligence.
              </p>
            </div>

            <button
              onClick={onOpenAddPetModal}
              className="self-start sm:self-center px-4 py-2.5 rounded-2xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs sm:text-sm font-medium transition-all shadow-md flex items-center gap-2"
            >
              <span>+ Add Another Furkid</span>
            </button>
          </div>

          {/* Active Pet Spotlight Card */}
          <div className="bg-stone-800/80 backdrop-blur-sm rounded-2xl p-5 border border-stone-700/80 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto">
              <div className="relative">
                <img
                  src={selectedPet.avatarUrl}
                  alt={selectedPet.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-amber-400/50 shadow-lg"
                />
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-amber-500 text-stone-950 font-bold text-[10px] rounded-full uppercase tracking-wider shadow">
                  Active
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
                    {selectedPet.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-700/80 text-amber-200 text-xs font-medium">
                    {selectedPet.breed} • {selectedPet.age} yrs
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedPet.personality.slice(0, 3).map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-stone-900/80 text-stone-300 text-[11px] border border-stone-700"
                    >
                      {p}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 text-[11px] font-medium border border-amber-500/30">
                    Needs: {selectedPet.exerciseNeeds} Exercise
                  </span>
                </div>

                <p className="text-xs text-stone-400 line-clamp-1 pt-1">
                  <span className="text-amber-400 font-medium">Care Note:</span> {selectedPet.careNotes}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 border-stone-700/60 pt-4 md:pt-0">
              <button
                onClick={() => setActiveTab('pet-profile')}
                className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <span>View Furkid Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Large Actions Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-900 font-serif flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>Core AI Capabilities</span>
          </h2>
          <span className="text-xs font-medium text-stone-500">3 Verified Workflows</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Action 1: Find My Trusted Handler */}
          <div
            onClick={() => setActiveTab('find-care')}
            className="group relative bg-white hover:bg-gradient-to-b hover:from-white hover:to-amber-50/50 rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shadow-inner group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                    1. Decision-Making
                  </span>
                  <span className="text-xs text-stone-500 font-medium">Explainable AI</span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 font-serif group-hover:text-amber-800 transition-colors">
                  Find a Trusted Handler
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Matches {selectedPet.name} with vetted Singapore pet handlers using breed compatibility, heat tolerance, and thunderstorm anxiety ratings.
                </p>
              </div>

              <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 space-y-1.5 text-[11px] text-stone-600">
                <div className="flex items-center gap-1.5 text-stone-800 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Includes Match % & Explainable Reasoning</span>
                </div>
                <p className="text-stone-500 text-[10px]">
                  Analyzes 140+ verified service logs & handler credentials.
                </p>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:text-amber-800">
              <span>Match Handlers Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Action 2: Prepare a Care Handover */}
          <div
            onClick={() => setActiveTab('care-handover')}
            className="group relative bg-white hover:bg-gradient-to-b hover:from-white hover:to-orange-50/50 rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold shadow-inner group-hover:scale-110 transition-transform">
                <FileSpreadsheet className="w-6 h-6" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-orange-700 uppercase tracking-wider bg-orange-100/80 px-2.5 py-0.5 rounded-full">
                    2. Collaboration
                  </span>
                  <span className="text-xs text-stone-500 font-medium">Portable Pass</span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 font-serif group-hover:text-orange-800 transition-colors">
                  Prepare a Care Handover
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Generates a structured, shareable AI Care Pass from {selectedPet.name}'s lifelong profile. Never start from zero with new caregivers.
                </p>
              </div>

              <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 space-y-1.5 text-[11px] text-stone-600">
                <div className="flex items-center gap-1.5 text-stone-800 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-orange-600" />
                  <span>Feeding, Triggers, Vet Contacts & Routine</span>
                </div>
                <p className="text-stone-500 text-[10px]">
                  Shareable via WhatsApp, PDF, or direct Pawmise Care QR code.
                </p>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between text-xs font-bold text-orange-700 group-hover:text-orange-800">
              <span>Generate Care Handover</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Action 3: Create Care Ideas */}
          <div
            onClick={() => setActiveTab('care-ideas')}
            className="group relative bg-white hover:bg-gradient-to-b hover:from-white hover:to-emerald-50/50 rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-inner group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                    3. Creativity
                  </span>
                  <span className="text-xs text-stone-500 font-medium">Tailored Enrichment</span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 font-serif group-hover:text-emerald-800 transition-colors">
                  Create Care Ideas
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Generates personalized indoor enrichment, mental stimulation, and weather-aware routines specifically suited to {selectedPet.name}.
                </p>
              </div>

              <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 space-y-1.5 text-[11px] text-stone-600">
                <div className="flex items-center gap-1.5 text-stone-800 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Explains WHY it suits {selectedPet.name}</span>
                </div>
                <p className="text-stone-500 text-[10px]">
                  Factors in Singapore weather (Monsoon / Sunny Heat) & breed traits.
                </p>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>Generate Enrichment Ideas</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* Trust Philosophy Statement Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-stone-900 rounded-3xl p-6 sm:p-8 text-stone-100 border border-amber-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Trust Made Visible, Portable and Personal</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white leading-tight">
              “Pawmise recommends the individual caring for your furkid—not just the company they work for.”
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Pet care company brand names don't walk or soothe your pet—individual caregivers do. Pawmise builds lifelong trust around individual handler credentials, verified service outcomes, and pet compatibility.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('trust-profile')}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2 whitespace-nowrap"
          >
            <span>Explore Trust Graph</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Status Bar & Recent Care Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Environment & Care Highlights */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-stone-900 font-serif flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-amber-600" />
            <span>Today's Care Guidelines</span>
          </h3>

          <div className="space-y-3 text-xs text-stone-600">
            <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-100 flex items-start gap-3">
              <CloudRain className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-800">Thunderstorm Warning (PM):</span>
                <p className="text-[11px] text-stone-600 mt-0.5">
                  Ensure indoor air-con is on and calming music is queued if {selectedPet.name} is alone during afternoon downpours.
                </p>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100 flex items-start gap-3">
              <Thermometer className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-800">Heat Advisory:</span>
                <p className="text-[11px] text-stone-600 mt-0.5">
                  Outdoor asphalt temperatures reach 42°C between 12 PM - 4 PM. Restrict walks to shaded grass before 8:30 AM or after 7:00 PM.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Care History Preview */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 font-serif flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Verified Care History ({selectedPet.name})</span>
            </h3>
            <button
              onClick={() => setActiveTab('pet-profile')}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800"
            >
              View All Logs →
            </button>
          </div>

          {selectedPet.careHistory && selectedPet.careHistory.length > 0 ? (
            <div className="space-y-3">
              {selectedPet.careHistory.map((log) => (
                <div
                  key={log.id}
                  className="p-4 bg-stone-50 rounded-2xl border border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900">{log.handlerName}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                        Verified Booking
                      </span>
                      <span className="text-stone-400">• {log.date}</span>
                    </div>
                    <p className="text-stone-600 font-medium">{log.serviceType}</p>
                    <p className="text-stone-500 italic text-[11px]">"{log.notes}"</p>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-100/60 px-2.5 py-1 rounded-xl text-amber-800 font-bold shrink-0 self-start sm:self-center">
                    <Heart className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{log.rating}.0 / 5</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-stone-50 rounded-2xl border border-dashed border-stone-200 text-stone-500 text-xs">
              No care history recorded yet for {selectedPet.name}. Book a verified handler to start building lifelong care logs!
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
