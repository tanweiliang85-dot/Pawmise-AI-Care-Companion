import React, { useState, useEffect } from 'react';
import { PetProfile, CareIdea } from '../types';
import {
  Lightbulb,
  Sparkles,
  Zap,
  Clock,
  CheckCircle,
  Plus,
  RefreshCw,
  Heart,
  HelpCircle,
  Flame,
  ShieldCheck,
  Compass,
  Smile,
  BookOpen,
  Sliders,
  Wand2,
  Edit3,
  Send,
  Layers,
  ArrowRight,
  Bookmark,
  Check,
  Package,
  AlertTriangle,
  Info
} from 'lucide-react';

interface CareIdeasViewProps {
  pet: PetProfile;
  onSaveIdeaToPet: (idea: CareIdea) => void;
}

export const CareIdeasView: React.FC<CareIdeasViewProps> = ({ pet, onSaveIdeaToPet }) => {
  // Goal Selection
  const [selectedGoal, setSelectedGoal] = useState<string>('Mental Stimulation');
  const goals = [
    'Burn Energy',
    'Mental Stimulation',
    'Calm & Relax',
    'Social Bonding',
    'Learn Something New'
  ];

  // Setting Selection
  const [selectedSetting, setSelectedSetting] = useState<string>('Indoor');
  const settings = ['Indoor', 'Outdoor', 'Either'];

  // Optional Free Text
  const [additionalNotes, setAdditionalNotes] = useState<string>(
    'I only have 30 minutes and would like to do something together with Teddie.'
  );

  // State for generated ideas
  const [ideas, setIdeas] = useState<CareIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedIdeaIds, setSavedIdeaIds] = useState<string[]>([]);
  const [likedIdeaIds, setLikedIdeaIds] = useState<string[]>([]);

  // Adaptation Modal / Panel State
  const [adaptingIdeaIndex, setAdaptingIdeaIndex] = useState<number | null>(null);
  const [adaptationInput, setAdaptationInput] = useState<string>('');
  const [isAdaptingLoading, setIsAdaptingLoading] = useState<boolean>(false);

  const presetAdaptations = [
    'Make it suitable for two dogs.',
    'I only have 15 minutes.',
    'Make it completely indoors.',
    'I want to participate too.'
  ];

  // Primary Generation Function
  const fetchCareIdeas = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-care-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pet,
          goal: selectedGoal,
          setting: selectedSetting,
          additionalNotes,
        }),
      });

      const data = await response.json();
      if (data.ideas && Array.isArray(data.ideas)) {
        setIdeas(data.ideas);
      }
    } catch (err) {
      console.error('Failed to generate care ideas:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCareIdeas();
  }, [pet.id]);

  // Handle "I Like This"
  const handleLikeIdea = (idx: number) => {
    const idStr = `idea-${idx}`;
    if (!likedIdeaIds.includes(idStr)) {
      setLikedIdeaIds([...likedIdeaIds, idStr]);
    } else {
      setLikedIdeaIds(likedIdeaIds.filter((id) => id !== idStr));
    }
  };

  // Handle "Save to Routine"
  const handleSaveIdea = (idea: CareIdea, idx: number) => {
    const idStr = `idea-${idx}`;
    if (!savedIdeaIds.includes(idStr)) {
      setSavedIdeaIds([...savedIdeaIds, idStr]);
      onSaveIdeaToPet(idea);
    }
  };

  // Handle "Make It More Creative"
  const handleMakeMoreCreative = async (idx: number) => {
    const ideaToRefine = ideas[idx];
    setIsAdaptingLoading(true);
    setAdaptingIdeaIndex(idx);

    try {
      const response = await fetch('/api/adapt-care-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pet,
          originalIdea: ideaToRefine,
          feedbackInstruction: 'Make this activity even more creative, novel, and engaging for Teddie',
          mode: 'creative',
        }),
      });

      const data = await response.json();
      if (data.adaptedIdea) {
        const updatedIdeas = [...ideas];
        updatedIdeas[idx] = data.adaptedIdea;
        setIdeas(updatedIdeas);
      }
    } catch (err) {
      console.error('Failed to make idea more creative:', err);
    } finally {
      setIsAdaptingLoading(false);
      setAdaptingIdeaIndex(null);
    }
  };

  // Handle "Adapt This Idea" Submission
  const handleAdaptIdeaSubmit = async (idx: number, customInstruction?: string) => {
    const instruction = customInstruction || adaptationInput;
    if (!instruction.trim()) return;

    const ideaToRefine = ideas[idx];
    setIsAdaptingLoading(true);

    try {
      const response = await fetch('/api/adapt-care-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pet,
          originalIdea: ideaToRefine,
          feedbackInstruction: instruction,
          mode: 'adapt',
        }),
      });

      const data = await response.json();
      if (data.adaptedIdea) {
        const updatedIdeas = [...ideas];
        updatedIdeas[idx] = data.adaptedIdea;
        setIdeas(updatedIdeas);
        setAdaptingIdeaIndex(null);
        setAdaptationInput('');
      }
    } catch (err) {
      console.error('Failed to adapt care idea:', err);
    } finally {
      setIsAdaptingLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* SECTION 1: HEADER & CORE CO-CREATION PRINCIPLE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        
        {/* Top Feature Tag & Title */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-100 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold shadow-sm">
              <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
              <span>3. Creativity Capability — AI-Enabled Personalised Care</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
              Co-Create Care & Enrichment Ideas
            </h1>
            
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
              Pawmise combines lifelong knowledge of your furkid with your ideas and context to co-create personalised care experiences.
            </p>
          </div>

          {/* Prominent Principle Banner */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-stone-950 p-5 rounded-3xl shadow-lg border border-amber-400 max-w-xs w-full space-y-1.5 shrink-0">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-950/80">
              <Sparkles className="w-4 h-4 fill-amber-950" />
              <span>Co-Creation Principle</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold font-serif text-stone-950 leading-snug">
              “AI inspires. Pawrent shapes. Furkid experiences.”
            </h2>
            <p className="text-[11px] font-medium text-stone-900/90 leading-tight">
              Personalised enrichment grounded in {pet.name}'s lifelong profile.
            </p>
          </div>
        </div>

        {/* QUESTIONNAIRE SECTION: Pawrent Intent */}
        <div className="bg-stone-50 p-6 rounded-3xl border border-stone-200/80 space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
            <Sliders className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold font-serif text-stone-900 uppercase tracking-wide">
              Pawrent Daily Context & Goal Questionnaire
            </h3>
          </div>

          {/* Q1: Goal */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-800">
              “What would you like to achieve with {pet.name} today?”
            </label>
            <div className="flex flex-wrap gap-2">
              {goals.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGoal(g)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm ${
                    selectedGoal === g
                      ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-600 font-extrabold shadow-amber-500/20'
                      : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                  }`}
                >
                  {g === 'Burn Energy' && '⚡ '}
                  {g === 'Mental Stimulation' && '🧩 '}
                  {g === 'Calm & Relax' && '🌙 '}
                  {g === 'Social Bonding' && '🤝 '}
                  {g === 'Learn Something New' && '🎓 '}
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Q2 & Q3 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Q2: Setting */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-800">
                “What is today's setting?”
              </label>
              <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-stone-200">
                {settings.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSetting(s)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedSetting === s
                        ? 'bg-stone-900 text-amber-300 shadow'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3: Optional free text */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-xs font-bold text-stone-800">
                “Anything else Pawmise should consider?” <span className="text-stone-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Example: “I only have 30 minutes and would like to do something together with Teddie.”"
                className="w-full bg-white border border-stone-200 text-stone-900 text-xs font-medium rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
              />
            </div>

          </div>

          {/* Primary Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Grounded in {pet.name}'s profile: Samoyed • High Energy • Puzzle Toys • Heat Sensitivity</span>
            </div>

            <button
              onClick={fetchCareIdeas}
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Wand2 className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Co-Creating Care Ideas...' : 'Generate Personalised Care Ideas'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* SECTION 2: AI-GENERATED RECOMMENDATIONS DISPLAY */}
      <div className="space-y-6">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500 text-stone-950 rounded-xl font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-stone-900">
                AI-Generated Care Ideas for {pet.name}
              </h2>
              <p className="text-xs text-stone-500">
                Click any button under an idea to refine, adapt, or save it to {pet.name}'s care routine.
              </p>
            </div>
          </div>

          <span className="text-xs text-stone-500 font-medium hidden sm:inline-block">
            {ideas.length} Recommendations Ready
          </span>
        </div>

        {isLoading ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 space-y-4 shadow-sm">
            <Sparkles className="w-10 h-10 text-amber-500 animate-spin mx-auto" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold font-serif text-stone-900">
                Co-Creating Personalised Enrichment for {pet.name}...
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                Combining {pet.name}'s Samoyed double coat requirements, high working intelligence, and your requested {selectedGoal} goal.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {ideas.map((idea, idx) => {
              const isSaved = savedIdeaIds.includes(`idea-${idx}`);
              const isLiked = likedIdeaIds.includes(`idea-${idx}`);
              const isCurrentlyAdapting = adaptingIdeaIndex === idx;

              // Fallback traits if backend didn't supply
              const influencedTraits = idea.influencedByTraits && idea.influencedByTraits.length > 0
                ? idea.influencedByTraits
                : ['Samoyed', 'High energy', 'Social', 'Enjoys puzzle toys', 'Sensitive to loud noises', 'Heat-sensitive double coat'];

              const whatYouNeed = idea.whatYouNeed || [
                'Silicone lick mat or snuffle towel',
                'Freeze-dried treats',
                'Air-conditioned room'
              ];

              const careConsiderations = idea.careConsiderations || [
                'Keep temperature cool for thick double coat.',
                'Provide fresh chilled water.'
              ];

              return (
                <div
                  key={idx}
                  className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between space-y-5 relative shadow-sm hover:shadow-xl ${
                    idea.isAdapted ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-stone-200'
                  }`}
                >
                  
                  {/* Card Main Body */}
                  <div className="space-y-4">
                    
                    {/* Top Label & Duration Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>AI-Generated Care Idea</span>
                        </span>
                        {idea.isAdapted && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold">
                            v{idea.version || 2} Refined
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-bold text-stone-700 flex items-center gap-1 bg-stone-100 px-2.5 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{idea.duration}</span>
                      </span>
                    </div>

                    {/* VISUAL PROVENANCE PIPELINE DEMONSTRATION */}
                    <div className="bg-stone-900 text-stone-200 p-3 rounded-2xl text-[10px] font-mono space-y-1 shadow-inner">
                      <div className="text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1 text-[9px]">
                        <Layers className="w-3 h-3 text-amber-400" />
                        <span>Co-Creation Provenance Flow</span>
                      </div>
                      <div className="flex items-center justify-between text-stone-300 gap-1 overflow-x-auto py-0.5">
                        <span className="text-amber-200 font-semibold shrink-0">Pet Profile</span>
                        <span className="text-stone-500">→</span>
                        <span className="text-amber-200 font-semibold shrink-0">Pawrent Intent</span>
                        <span className="text-stone-500">→</span>
                        <span className="text-emerald-300 font-semibold shrink-0">AI Suggestion</span>
                        {idea.isAdapted && (
                          <>
                            <span className="text-stone-500">→</span>
                            <span className="text-amber-300 font-bold shrink-0">Pawrent Feedback</span>
                            <span className="text-stone-500">→</span>
                            <span className="text-purple-300 font-bold shrink-0">Refined Idea</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold font-serif text-stone-900 leading-snug">
                      {idea.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-stone-600 leading-relaxed font-medium">
                      {idea.description}
                    </p>

                    {/* Adaptation Note Callout if Refined */}
                    {idea.isAdapted && idea.adaptationNote && (
                      <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-2xl text-xs text-emerald-950 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Pawrent Feedback Applied:</span>
                        </div>
                        <p className="text-[11px] italic text-emerald-900 font-semibold">
                          “{idea.adaptationNote}”
                        </p>
                      </div>
                    )}

                    {/* Profile Characteristics That Influenced This Recommendation */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                        Profile Characteristics Influencing Recommendation:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {influencedTraits.map((trait, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-xl bg-amber-100/80 text-amber-950 font-bold text-[10px] border border-amber-300/60 flex items-center gap-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                            <span>{trait}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Why It Suits Teddie */}
                    <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900 text-[11px]">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>Why this suits {pet.name}:</span>
                      </div>
                      <p className="text-[11px] text-amber-900 leading-relaxed italic font-medium">
                        "{idea.whySuitsPet}"
                      </p>
                    </div>

                    {/* What You Need */}
                    <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-stone-800 text-[11px]">
                        <Package className="w-3.5 h-3.5 text-stone-600 shrink-0" />
                        <span>What You Need:</span>
                      </div>
                      <ul className="space-y-1 text-[11px] text-stone-700">
                        {whatYouNeed.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-stone-400 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Care Considerations */}
                    <div className="bg-orange-50/80 p-3.5 rounded-2xl border border-orange-200 text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-orange-950 text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                        <span>Care Considerations:</span>
                      </div>
                      <ul className="space-y-1 text-[11px] text-orange-900">
                        {careConsiderations.map((cc, ccIdx) => (
                          <li key={ccIdx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-orange-500 shrink-0" />
                            <span>{cc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* CO-CREATION BUTTONS (HUMAN–AI CO-CREATION) */}
                  <div className="border-t border-stone-100 pt-4 space-y-3">
                    
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block text-center">
                      Human–AI Co-Creation Actions:
                    </span>

                    <div className="grid grid-cols-3 gap-2">
                      
                      {/* Button 1: I Like This */}
                      <button
                        type="button"
                        onClick={() => handleLikeIdea(idx)}
                        className={`py-2 px-2 rounded-xl font-bold text-[11px] transition flex items-center justify-center gap-1 shadow-sm ${
                          isLiked
                            ? 'bg-rose-100 text-rose-900 border border-rose-300'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-600 text-rose-600' : 'text-stone-500'}`} />
                        <span>{isLiked ? 'Liked' : 'I Like This'}</span>
                      </button>

                      {/* Button 2: Make It More Creative */}
                      <button
                        type="button"
                        disabled={isAdaptingLoading}
                        onClick={() => handleMakeMoreCreative(idx)}
                        className="py-2 px-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-[11px] transition flex items-center justify-center gap-1 border border-purple-200 shadow-sm disabled:opacity-50"
                      >
                        <Wand2 className={`w-3.5 h-3.5 text-purple-700 ${isCurrentlyAdapting ? 'animate-spin' : ''}`} />
                        <span>More Creative</span>
                      </button>

                      {/* Button 3: Adapt This Idea */}
                      <button
                        type="button"
                        onClick={() => setAdaptingIdeaIndex(adaptingIdeaIndex === idx ? null : idx)}
                        className="py-2 px-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] transition flex items-center justify-center gap-1 shadow-sm"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Adapt This Idea</span>
                      </button>

                    </div>

                    {/* EXPANDABLE INLINE ADAPTATION PANEL */}
                    {adaptingIdeaIndex === idx && (
                      <div className="bg-amber-50/90 p-4 rounded-2xl border border-amber-300 space-y-3 animate-in fade-in duration-200 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-950 text-xs flex items-center gap-1">
                            <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                            <span>Adapt "{idea.title}"</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setAdaptingIdeaIndex(null)}
                            className="text-[10px] font-bold text-amber-900 hover:underline"
                          >
                            Cancel
                          </button>
                        </div>

                        {/* Preset instructions */}
                        <div className="space-y-1">
                          <span className="text-[10px] text-amber-900 font-bold block">Quick Preset Instructions:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {presetAdaptations.map((preset, pIdx) => (
                              <button
                                key={pIdx}
                                type="button"
                                onClick={() => handleAdaptIdeaSubmit(idx, preset)}
                                className="px-2.5 py-1 rounded-xl bg-white hover:bg-amber-100 text-amber-950 text-[10px] font-bold border border-amber-200 shadow-sm text-left transition"
                              >
                                “{preset}”
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Custom Instruction Input */}
                        <div className="space-y-2 pt-1">
                          <input
                            type="text"
                            value={adaptationInput}
                            onChange={(e) => setAdaptationInput(e.target.value)}
                            placeholder="Type custom instructions (e.g. 'Make it suitable for 2 dogs')"
                            className="w-full bg-white border border-amber-300 text-stone-900 text-xs font-medium rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />

                          <button
                            type="button"
                            disabled={isAdaptingLoading || !adaptationInput.trim()}
                            onClick={() => handleAdaptIdeaSubmit(idx)}
                            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isAdaptingLoading ? 'animate-spin' : ''}`} />
                            <span>Refine Idea with Pawrent Feedback</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Secondary Save to Routine Action */}
                    <button
                      type="button"
                      onClick={() => handleSaveIdea(idea, idx)}
                      disabled={isSaved}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm ${
                        isSaved
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-stone-900 hover:bg-stone-800 text-amber-300'
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span>Saved to {pet.name}'s Routine</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 text-amber-400" />
                          <span>Add to {pet.name}'s Routine</span>
                        </>
                      )}
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Footer Co-Creation Banner */}
      <div className="bg-stone-900 text-stone-100 p-6 rounded-3xl space-y-2 text-center border border-stone-800 shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Pawmise AI Co-Creation Framework</span>
        </div>
        <p className="text-base font-serif font-bold text-white">
          “AI inspires. Pawrent shapes. Furkid experiences.”
        </p>
        <p className="text-xs text-stone-400 max-w-xl mx-auto leading-relaxed">
          Pawmise combines lifelong knowledge of your furkid with your ideas and context to co-create personalised care experiences.
        </p>
      </div>

    </div>
  );
};
