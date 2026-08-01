import React, { useState } from 'react';
import { PetProfile, HandlerProfile } from '../types';
import { CameraPhotoModal } from './CameraPhotoModal';
import {
  PawPrint,
  Heart,
  Zap,
  Volume2,
  Wind,
  Smile,
  ShieldCheck,
  Calendar,
  CheckCircle,
  Clock,
  Edit3,
  Award,
  Sparkles,
  User,
  Star,
  Activity,
  Phone,
  AlertTriangle,
  Info,
  Camera
} from 'lucide-react';

interface PetProfileViewProps {
  pet: PetProfile;
  handlers: HandlerProfile[];
  onUpdatePet: (updatedPet: PetProfile) => void;
  setActiveTab: (tab: string) => void;
}

export const PetProfileView: React.FC<PetProfileViewProps> = ({
  pet,
  handlers,
  onUpdatePet,
  setActiveTab,
}) => {
  const [activeSection, setActiveSection] = useState<'about' | 'behaviour' | 'routine' | 'history' | 'handlers' | 'graph'>('about');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState(pet.careNotes);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  const handleSaveNotes = () => {
    onUpdatePet({
      ...pet,
      careNotes: editedNotes,
    });
    setIsEditingNotes(false);
  };

  const handlePhotoCaptured = (capturedDataUrl: string) => {
    onUpdatePet({
      ...pet,
      avatarUrl: capturedDataUrl,
    });
  };

  const trustedHandlerProfiles = handlers.filter((h) => pet.trustedHandlers?.includes(h.id));

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Camera Capture Modal */}
      {isCameraModalOpen && (
        <CameraPhotoModal
          petName={pet.name}
          currentAvatarUrl={pet.avatarUrl}
          onClose={() => setIsCameraModalOpen(false)}
          onPhotoCaptured={handlePhotoCaptured}
        />
      )}

      {/* Lifelong Pet Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="relative group">
              <img
                src={pet.avatarUrl}
                alt={pet.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-amber-400/40 shadow-xl transition group-hover:brightness-95"
              />
              <button
                type="button"
                onClick={() => setIsCameraModalOpen(true)}
                title={`Take photo of ${pet.name}`}
                className="absolute -top-2 -right-2 p-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-2xl shadow-lg ring-2 ring-white font-bold flex items-center justify-center transition hover:scale-105 active:scale-95"
              >
                <Camera className="w-4 h-4" />
              </button>
              <span className="absolute -bottom-2 right-0 px-3 py-0.5 bg-stone-900 text-amber-300 font-bold text-xs rounded-full border border-amber-400/40 shadow">
                Lifelong Profile
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
                  {pet.name}
                </h1>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200">
                  {pet.breed}
                </span>
                <button
                  type="button"
                  onClick={() => setIsCameraModalOpen(true)}
                  className="px-3 py-1 rounded-full bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-bold border border-amber-400/30 flex items-center gap-1.5 shadow-sm transition"
                >
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>Take Pet Photo</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 font-medium">
                <span>🎂 {pet.age} Years Old</span>
                <span>•</span>
                <span>⚖️ {pet.weight}</span>
                <span>•</span>
                <span className="text-amber-700 font-semibold">⚡ {pet.exerciseNeeds} Exercise Needs</span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {pet.personality.map((trait, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs border border-stone-200"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200/80 w-full md:w-80 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Special Care Note</span>
              </span>
              <button
                onClick={() => setIsEditingNotes(!isEditingNotes)}
                className="text-[11px] text-amber-700 hover:underline flex items-center gap-1 font-semibold"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isEditingNotes ? 'Cancel' : 'Edit'}</span>
              </button>
            </div>

            {isEditingNotes ? (
              <div className="space-y-2">
                <textarea
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  rows={2}
                />
                <button
                  onClick={handleSaveNotes}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg shadow transition-colors"
                >
                  Save Note
                </button>
              </div>
            ) : (
              <p className="text-xs text-stone-700 italic leading-relaxed">
                "{pet.careNotes}"
              </p>
            )}
          </div>

        </div>

        {/* Section Navigation Tabs */}
        <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'about', label: 'About', icon: Info },
            { id: 'behaviour', label: 'Behaviour', icon: Zap },
            { id: 'routine', label: 'Care Routine', icon: Clock },
            { id: 'history', label: 'Care History', icon: Calendar },
            { id: 'handlers', label: 'Trusted Handlers', icon: User },
            { id: 'graph', label: 'Trust Graph', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Display */}

      {/* 1. About Section */}
      {activeSection === 'about' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
              <PawPrint className="w-5 h-5 text-amber-600" />
              <span>General Profile & Environment</span>
            </h3>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="p-3 bg-stone-50 rounded-2xl flex justify-between items-center">
                <span className="font-semibold text-stone-500">Breed</span>
                <span className="font-bold text-stone-900">{pet.breed}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl flex justify-between items-center">
                <span className="font-semibold text-stone-500">Age & Weight</span>
                <span className="font-bold text-stone-900">{pet.age} Years Old ({pet.weight})</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl flex justify-between items-center">
                <span className="font-semibold text-stone-500">Exercise Needs</span>
                <span className="font-bold text-amber-700">{pet.exerciseNeeds}</span>
              </div>
              <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200">
                <span className="font-semibold text-amber-900 block mb-1">Environment Preference</span>
                <p className="text-stone-700">{pet.environmentPreference}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Medical & Vet Records</span>
            </h3>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="p-3 bg-stone-50 rounded-2xl flex justify-between items-center">
                <span className="font-semibold text-stone-500">Microchip ID</span>
                <span className="font-mono font-bold text-stone-900">{pet.medicalHistory.microchipId}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl flex justify-between items-center">
                <span className="font-semibold text-stone-500">Vaccinations</span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  ✓ Up To Date
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl space-y-1">
                <span className="font-semibold text-stone-500 block">Registered Veterinary Clinic</span>
                <div className="flex items-center justify-between font-bold text-stone-900">
                  <span>{pet.medicalHistory.vetClinic}</span>
                  <a
                    href={`tel:${pet.medicalHistory.vetPhone}`}
                    className="flex items-center gap-1 text-amber-700 text-xs hover:underline"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{pet.medicalHistory.vetPhone}</span>
                  </a>
                </div>
              </div>
              <div className="p-3 bg-red-50 rounded-2xl border border-red-100">
                <span className="font-semibold text-red-900 block mb-1">Special Medical Alert</span>
                <p className="text-red-800">{pet.medicalHistory.specialConditions}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Behaviour Section */}
      {activeSection === 'behaviour' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
              <Smile className="w-5 h-5 text-amber-600" />
              <span>Temperament & Socialization</span>
            </h3>

            <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-100">
              {pet.behaviour}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-800">Favourite Activities</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pet.favouriteActivities.map((act, idx) => (
                  <div key={idx} className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-900 font-semibold flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-red-600" />
              <span>Anxiety Triggers & Comfort Protocols</span>
            </h3>

            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-800">Known Triggers</span>
              {pet.anxietyTriggers.map((trig, idx) => (
                <div key={idx} className="p-3 bg-red-50 rounded-xl border border-red-100 text-xs text-red-900 font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{trig}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-stone-900 text-stone-100 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <Wind className="w-4 h-4" />
                <span>Pawmise Thunderstorm Protocol for {pet.name}</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                During tropical rainstorms or loud thunder: keep {pet.name} inside an air-conditioned room with soft background music (or white noise), provide a frozen lick mat, and avoid forcing outdoor play.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Care Routine Section */}
      {activeSection === 'routine' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
          {/* Feeding Routine */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>Feeding & Diet Routine</span>
            </h3>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="p-3 bg-stone-50 rounded-2xl flex justify-between items-center">
                <span className="font-semibold text-stone-500">Meals Per Day</span>
                <span className="font-bold text-stone-900">{pet.feedingRoutine.mealsPerDay} Meals</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl space-y-1">
                <span className="font-semibold text-stone-500 block">Diet Details</span>
                <p className="font-medium text-stone-900">{pet.feedingRoutine.dietDetails}</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl space-y-1">
                <span className="font-semibold text-stone-500 block">Daily Supplements</span>
                <p className="font-medium text-stone-900">{pet.feedingRoutine.supplements}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-2xl border border-red-100">
                <span className="font-bold text-red-900 block mb-1">Food Allergies / Intolerances</span>
                <ul className="list-disc list-inside text-red-800 space-y-1">
                  {pet.feedingRoutine.foodAllergies.map((alg, idx) => (
                    <li key={idx}>{alg}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Exercise Routine */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-600" />
              <span>Exercise & Walk Safety</span>
            </h3>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="p-3 bg-stone-50 rounded-2xl flex justify-between items-center">
                <span className="font-semibold text-stone-500">Daily Walks</span>
                <span className="font-bold text-stone-900">{pet.exerciseRoutine.walksPerDay} Walks Daily</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl space-y-1">
                <span className="font-semibold text-stone-500 block">Preferred Times</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {pet.exerciseRoutine.preferredTimes.map((tm, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-semibold">
                      {tm}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                <span className="font-bold text-amber-900 block mb-1">Singapore Weather Heat Precaution</span>
                <p className="text-stone-700">{pet.exerciseRoutine.weatherPrecautions}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Care History Section */}
      {activeSection === 'history' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              <span>Lifelong Care History ({pet.name})</span>
            </h3>
            <span className="text-xs text-stone-500">{pet.careHistory.length} Recorded Bookings</span>
          </div>

          {pet.careHistory.length > 0 ? (
            <div className="space-y-4">
              {pet.careHistory.map((log) => (
                <div key={log.id} className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/60 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-800 font-bold flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm">{log.serviceType}</h4>
                        <span className="text-xs text-stone-500">Caregiver: <span className="font-semibold text-stone-800">{log.handlerName}</span> • {log.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full text-xs self-start sm:self-center">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{log.rating}.0 / 5</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-700 italic pt-1">
                    "{log.notes}"
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-stone-50 rounded-2xl border border-dashed border-stone-200 text-stone-500 text-xs">
              No previous bookings logged yet for {pet.name}. Verified stays will automatically populate this lifelong care ledger!
            </div>
          )}
        </div>
      )}

      {/* 5. Trusted Handlers Section */}
      {activeSection === 'handlers' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
              <User className="w-5 h-5 text-amber-600" />
              <span>{pet.name}'s Saved & Verified Handlers</span>
            </h3>
            <button
              onClick={() => setActiveTab('find-care')}
              className="text-xs font-bold text-amber-700 hover:underline"
            >
              + Find New Handler
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trustedHandlerProfiles.map((handler) => (
              <div key={handler.id} className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={handler.avatarUrl}
                    alt={handler.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-400/50"
                  />
                  <div>
                    <h4 className="font-bold text-stone-900 text-base font-serif">{handler.name}</h4>
                    <p className="text-xs text-stone-600">{handler.role}</p>
                    <div className="flex items-center gap-2 text-[11px] text-amber-700 font-semibold mt-1">
                      <span>Trust Score: {handler.trustScore}/100</span>
                      <span>•</span>
                      <span>{handler.verifiedServicesCount} Verified Services</span>
                    </div>
                  </div>
                </div>

                <div className="bg-stone-50 p-3 rounded-2xl text-xs text-stone-600 space-y-1">
                  <span className="font-semibold text-stone-800 block">Verified Qualifications:</span>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {handler.verifiedQualifications.slice(0, 2).map((q, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-stone-200/80 text-stone-800 text-[10px] font-medium">
                        ✓ {q}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('find-care')}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all shadow-md text-center"
                >
                  Book {handler.name} Again
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Trust Graph Section */}
      {activeSection === 'graph' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Pawmise Trust Graph • {pet.name}'s Care Ledger</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900 font-serif">
              How Trust Becomes Visible & Portable
            </h3>
            <p className="text-xs text-stone-600 max-w-2xl leading-relaxed">
              Every completed stay, verified temperature log, and caregiver observation enriches {pet.name}'s lifelong Pawmise Trust Graph. This ensures seamless continuity of care regardless of which caregiver handles {pet.name}.
            </p>
          </div>

          {/* Interactive Formula Diagram */}
          <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Pawmise Trust Graph Formula
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-[11px] font-medium">
              <div className="bg-stone-800 p-3 rounded-2xl border border-stone-700">
                <span className="text-amber-300 font-bold block text-xs">ID</span>
                <span className="text-stone-300">Verified Identity</span>
              </div>
              <div className="bg-stone-800 p-3 rounded-2xl border border-stone-700">
                <span className="text-amber-300 font-bold block text-xs">Certs</span>
                <span className="text-stone-300">Qualifications</span>
              </div>
              <div className="bg-stone-800 p-3 rounded-2xl border border-stone-700">
                <span className="text-amber-300 font-bold block text-xs">Logs</span>
                <span className="text-stone-300">Verified Services</span>
              </div>
              <div className="bg-stone-800 p-3 rounded-2xl border border-stone-700">
                <span className="text-amber-300 font-bold block text-xs">Reviews</span>
                <span className="text-stone-300">Mutual Ratings</span>
              </div>
              <div className="bg-stone-800 p-3 rounded-2xl border border-stone-700">
                <span className="text-amber-300 font-bold block text-xs">Repeat</span>
                <span className="text-stone-300">Repeat Bookings</span>
              </div>
              <div className="bg-stone-800 p-3 rounded-2xl border border-stone-700">
                <span className="text-amber-300 font-bold block text-xs">Breed</span>
                <span className="text-stone-300">Pet Compatibility</span>
              </div>
              <div className="bg-amber-500/20 p-3 rounded-2xl border border-amber-500/40 col-span-2 sm:col-span-1">
                <span className="text-amber-300 font-bold block text-xs">Outcomes</span>
                <span className="text-amber-200">Care Health</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 text-center italic pt-2">
              More verified interactions create richer data, which continuously improves AI handler recommendations over time.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
