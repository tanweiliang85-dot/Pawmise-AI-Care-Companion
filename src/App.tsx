import React, { useState } from 'react';
import { HeaderNavigation } from './components/HeaderNavigation';
import { HomeView } from './components/HomeView';
import { PetProfileView } from './components/PetProfileView';
import { FindCareView } from './components/FindCareView';
import { CareHandoverView } from './components/CareHandoverView';
import { CareIdeasView } from './components/CareIdeasView';
import { TrustProfileView } from './components/TrustProfileView';
import { AddPetModal } from './components/AddPetModal';
import { INITIAL_PETS, MOCK_HANDLERS } from './data/mockData';
import { PetProfile, HandlerProfile, CareIdea } from './types';
import { ShieldCheck, Heart, Sparkles, Award } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [pets, setPets] = useState<PetProfile[]>(INITIAL_PETS);
  const [selectedPetId, setSelectedPetId] = useState<string>(INITIAL_PETS[0].id);
  const [handlers] = useState<HandlerProfile[]>(MOCK_HANDLERS);
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState<boolean>(false);

  const selectedPet = pets.find((p) => p.id === selectedPetId) || pets[0];

  const handleUpdatePet = (updatedPet: PetProfile) => {
    setPets(pets.map((p) => (p.id === updatedPet.id ? updatedPet : p)));
  };

  const handleAddPet = (newPet: PetProfile) => {
    setPets([...pets, newPet]);
    setSelectedPetId(newPet.id);
  };

  const handleSaveIdeaToPet = (idea: CareIdea) => {
    const updatedPet = {
      ...selectedPet,
      favouriteActivities: [
        ...selectedPet.favouriteActivities,
        `${idea.title} (${idea.category})`
      ],
      careNotes: `${selectedPet.careNotes} | Added AI Routine: ${idea.title}`
    };
    handleUpdatePet(updatedPet);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans flex flex-col selection:bg-amber-500 selection:text-stone-950">
      
      {/* Top Sticky Header */}
      <HeaderNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pets={pets}
        selectedPetId={selectedPetId}
        setSelectedPetId={setSelectedPetId}
        onOpenAddPetModal={() => setIsAddPetModalOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'home' && (
          <HomeView
            selectedPet={selectedPet}
            setActiveTab={setActiveTab}
            onOpenAddPetModal={() => setIsAddPetModalOpen(true)}
          />
        )}

        {activeTab === 'pet-profile' && (
          <PetProfileView
            pet={selectedPet}
            handlers={handlers}
            onUpdatePet={handleUpdatePet}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'find-care' && (
          <FindCareView
            pets={pets}
            selectedPetId={selectedPetId}
            setSelectedPetId={setSelectedPetId}
            handlers={handlers}
          />
        )}

        {activeTab === 'care-handover' && (
          <CareHandoverView pet={selectedPet} />
        )}

        {activeTab === 'care-ideas' && (
          <CareIdeasView
            pet={selectedPet}
            onSaveIdeaToPet={handleSaveIdeaToPet}
          />
        )}

        {activeTab === 'trust-profile' && (
          <TrustProfileView />
        )}
      </main>

      {/* Add New Furkid Modal */}
      {isAddPetModalOpen && (
        <AddPetModal
          onClose={() => setIsAddPetModalOpen(false)}
          onAddPet={handleAddPet}
        />
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 py-8 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 font-bold flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-stone-100 text-sm font-serif">Pawmise AI Care Companion</span>
                <p className="text-stone-400 text-[11px]">Trust Made Visible, Portable and Personal • Singapore Startup</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-stone-400 text-[11px]">
              <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Explainable AI Standards</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Handlers Ledger</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400 text-[11px]">
            <p>
              © {new Date().getFullYear()} Pawmise Technologies Pte. Ltd. All rights reserved. Built for Singapore pawrents and pet caregivers.
            </p>
            <p className="italic text-stone-400">
              Pawmise AI provides care recommendations and handover tools. For medical health concerns, consult a licensed veterinarian.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
