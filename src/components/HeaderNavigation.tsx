import React from 'react';
import { PetProfile } from '../types';
import {
  Shield,
  Heart,
  Search,
  FileSpreadsheet,
  Lightbulb,
  Award,
  ChevronDown,
  PlusCircle,
  Sparkles,
  PawPrint
} from 'lucide-react';

interface HeaderNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pets: PetProfile[];
  selectedPetId: string;
  setSelectedPetId: (id: string) => void;
  onOpenAddPetModal: () => void;
}

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  activeTab,
  setActiveTab,
  pets,
  selectedPetId,
  setSelectedPetId,
  onOpenAddPetModal,
}) => {
  const [petDropdownOpen, setPetDropdownOpen] = React.useState(false);
  const selectedPet = pets.find((p) => p.id === selectedPetId) || pets[0];

  const navItems = [
    { id: 'home', label: 'Home', icon: Heart },
    { id: 'pet-profile', label: 'My Furkid', icon: PawPrint },
    { id: 'find-care', label: 'Find Care', icon: Search },
    { id: 'care-handover', label: 'Care Handover', icon: FileSpreadsheet },
    { id: 'care-ideas', label: 'Care Ideas', icon: Lightbulb },
    { id: 'trust-profile', label: 'Trust Profile', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/30">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-100/30 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-white font-serif">
                  Pawmise
                </span>
                <span className="text-[10px] sm:text-xs uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 tracking-wider">
                  AI Care
                </span>
              </div>
              <p className="text-[11px] text-stone-400 hidden md:block">
                Trust Made Visible, Portable & Personal • Singapore
              </p>
            </div>
          </div>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Pet Switcher & Badge */}
          <div className="flex items-center gap-3">
            {/* Active Pet Selector */}
            <div className="relative">
              <button
                onClick={() => setPetDropdownOpen(!petDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-750 border border-stone-700/80 text-stone-200 text-xs sm:text-sm transition-all shadow-inner"
              >
                <img
                  src={selectedPet?.avatarUrl}
                  alt={selectedPet?.name}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover ring-1 ring-amber-400/40"
                />
                <div className="text-left hidden sm:block">
                  <div className="font-semibold text-stone-100 text-xs leading-tight">
                    {selectedPet?.name}
                  </div>
                  <div className="text-[10px] text-stone-400 leading-tight">
                    {selectedPet?.breed}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {/* Pet Dropdown */}
              {petDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-stone-900 border border-stone-700 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider border-b border-stone-800">
                    Switch Furkid
                  </div>
                  {pets.map((pet) => (
                    <button
                      key={pet.id}
                      onClick={() => {
                        setSelectedPetId(pet.id);
                        setPetDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs hover:bg-stone-800 transition-colors ${
                        pet.id === selectedPetId ? 'bg-amber-500/10 text-amber-300 font-medium' : 'text-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={pet.avatarUrl}
                          alt={pet.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-stone-100">{pet.name}</div>
                          <div className="text-[10px] text-stone-400">{pet.breed} • {pet.age} yrs</div>
                        </div>
                      </div>
                      {pet.id === selectedPetId && (
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      )}
                    </button>
                  ))}
                  <div className="border-t border-stone-800 mt-1 pt-1 px-1">
                    <button
                      onClick={() => {
                        setPetDropdownOpen(false);
                        onOpenAddPetModal();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-amber-400 hover:bg-amber-500/10 rounded-xl font-medium transition-colors"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Add New Furkid</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* AI Trust Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Explainable AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around border-t border-stone-800/80 bg-stone-900/90 px-2 py-2 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all whitespace-nowrap ${
                isActive ? 'text-amber-300 bg-amber-500/15' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
