import React, { useState } from 'react';
import { PetProfile } from '../types';
import { CameraPhotoModal } from './CameraPhotoModal';
import { X, PawPrint, Plus, Camera } from 'lucide-react';

interface AddPetModalProps {
  onClose: () => void;
  onAddPet: (newPet: PetProfile) => void;
}

export const AddPetModal: React.FC<AddPetModalProps> = ({ onClose, onAddPet }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState<number>(2);
  const [weight, setWeight] = useState('12 kg');
  const [exerciseNeeds, setExerciseNeeds] = useState<'Low' | 'Moderate' | 'High' | 'Very High'>('High');
  const [behaviour, setBehaviour] = useState('Friendly, playful and well-socialized.');
  const [anxietyTriggers, setAnxietyTriggers] = useState('Thunderstorms & heavy rain');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800');
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !breed) return;

    const newPet: PetProfile = {
      id: `pet-${Date.now()}`,
      name,
      breed,
      age,
      weight,
      avatarUrl,
      personality: ['Friendly', 'Social', 'Curious'],
      exerciseNeeds,
      behaviour,
      anxietyTriggers: anxietyTriggers.split(',').map((s) => s.trim()),
      environmentPreference: 'Air-conditioned indoor environment in hot weather.',
      favouriteActivities: ['Walks', 'Playtime', 'Treat puzzles'],
      careNotes: 'Keep fresh drinking water accessible and monitor outdoor heat.',
      feedingRoutine: {
        mealsPerDay: 2,
        dietDetails: '1.5 cups premium kibble twice daily.',
        foodAllergies: ['None declared'],
        supplements: 'Multivitamin chew',
      },
      exerciseRoutine: {
        walksPerDay: 2,
        preferredTimes: ['7:00 AM', '7:00 PM'],
        idealDuration: '30 mins per walk',
        weatherPrecautions: 'Avoid peak afternoon hot asphalt.',
      },
      medicalHistory: {
        microchipId: `SG-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
        vaccinationsUpToDate: true,
        vetClinic: 'Mount Pleasant Veterinary Centre',
        vetPhone: '+65 6251 7666',
        specialConditions: 'None',
      },
      careHistory: [],
      trustedHandlers: ['handler-1'],
    };

    onAddPet(newPet);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 font-bold flex items-center justify-center">
            <PawPrint className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif text-stone-900">
              Add New Furkid Profile
            </h3>
            <p className="text-xs text-stone-500">
              Create a lifelong Pawmise care ledger
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-stone-700 mb-1">Furkid Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Teddie, Milo, Boba"
              className="w-full p-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Breed *</label>
              <input
                type="text"
                required
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="e.g. Samoyed, Golden"
                className="w-full p-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Age (Years)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 1)}
                className="w-full p-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Weight</label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 24 kg"
                className="w-full p-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Exercise Needs</label>
              <select
                value={exerciseNeeds}
                onChange={(e) => setExerciseNeeds(e.target.value as any)}
                className="w-full p-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              >
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
                <option value="Very High">Very High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">Anxiety Triggers</label>
            <input
              type="text"
              value={anxietyTriggers}
              onChange={(e) => setAnxietyTriggers(e.target.value)}
              placeholder="e.g. Loud noises, Thunderstorms"
              className="w-full p-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">Furkid Avatar Photo</label>
            <div className="flex items-center gap-3">
              <img
                src={avatarUrl}
                alt="Furkid Avatar Preview"
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-400 shrink-0"
              />
              <div className="flex-grow space-y-1.5">
                <button
                  type="button"
                  onClick={() => setIsCameraModalOpen(true)}
                  className="w-full py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition border border-amber-400/30"
                >
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>Snap Photo with Camera</span>
                </button>
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="Or paste image URL"
                  className="w-full p-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Camera Capture Modal */}
          {isCameraModalOpen && (
            <CameraPhotoModal
              petName={name || 'New Furkid'}
              currentAvatarUrl={avatarUrl}
              onClose={() => setIsCameraModalOpen(false)}
              onPhotoCaptured={(dataUrl) => {
                setAvatarUrl(dataUrl);
                setIsCameraModalOpen(false);
              }}
            />
          )}

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-300 font-bold text-stone-700 hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Furkid Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
