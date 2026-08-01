import React, { useState } from 'react';
import { MOCK_HANDLERS, TRUST_GRAPH_PILLARS } from '../data/mockData';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  TrendingUp,
  ChevronRight,
  ShieldAlert,
  Info,
  X,
  Send,
  Building2,
  User,
  Heart,
  Star,
  Repeat,
  ArrowRight,
  Briefcase,
  Lock,
  Scale,
  RefreshCw,
  Eye,
  Layers,
  Sliders,
  Check,
  FileCheck,
  Activity,
  UserCheck
} from 'lucide-react';

export const TrustProfileView: React.FC = () => {
  // Demo handler: Sarah Lim
  const sarah = MOCK_HANDLERS[0];

  // UI state
  const [showWhyScoreModal, setShowWhyScoreModal] = useState(false);
  const [selectedGraphNode, setSelectedGraphNode] = useState<string>('sarah');
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [escalationReason, setEscalationReason] = useState('');
  const [escalationSubmitted, setEscalationSubmitted] = useState(false);
  const [showHandlerChallengeModal, setShowHandlerChallengeModal] = useState(false);
  const [challengeText, setChallengeText] = useState('');
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);

  // Evidence categories breakdown for Sarah's 94/100 Trust Score
  const scoreBreakdown = [
    {
      category: 'Identity & Credentials',
      points: '20 / 20 pts',
      icon: ShieldCheck,
      color: 'emerald',
      description: 'Singapore Gov-Verified NRIC, Criminal Record Clearance, St. John Pet CPR & Fear-Free® Certification.',
      evidence: ['Gov NRIC SG-S****123A Verified', 'St. John Pet First Aid #CP-9021', 'Criminal Clearance Cert #2024-88']
    },
    {
      category: 'Verified Service History',
      points: '20 / 20 pts',
      icon: CheckCircle2,
      color: 'amber',
      description: '186 fully completed, GPS-verified stays on Pawmise with zero missing environment/check-in logs.',
      evidence: ['186 GPS Check-ins Verified', '100% Air-Con Temp Log Compliance', '1,420 Real-time Photo Audits']
    },
    {
      category: 'Repeat Pawrent Trust',
      points: '18 / 20 pts',
      icon: Repeat,
      color: 'blue',
      description: '82% repeat booking rate among Singapore pawrents, indicating long-term retention and relationship trust.',
      evidence: ['82% Retention Rate (Top 3% in SG)', '42 Unique Recurring Furkids', 'Average Relationship: 1.8 Years']
    },
    {
      category: 'Verified Reviews',
      points: '16 / 18 pts',
      icon: Star,
      color: 'purple',
      description: '4.98 / 5.0 average rating across 142 dual-blind verified reviews from confirmed bookings.',
      evidence: ['142 Dual-Blind Pawrent Reviews', '99.2% Positive Sentiment Score', 'Zero Flagged or Synthetic Reviews']
    },
    {
      category: 'Relevant Experience',
      points: '12 / 12 pts',
      icon: Briefcase,
      color: 'indigo',
      description: '6 years of professional experience specializing in Arctic double-coat breeds & thunderstorm noise anxiety care.',
      evidence: ['Specialized Arctic Breed Handler', 'Noise Anxiety Desensitizer', '6 Years Active Care History']
    },
    {
      category: 'Accountability & Incident History',
      points: '8 / 10 pts',
      icon: ShieldAlert,
      color: 'rose',
      description: '0 verified safety incidents or active disputes across 6 years of care history in the Pawmise Ledger.',
      evidence: ['0 Verified Safety Incidents', '0 Active Escalate Claims', '100% On-Time Check-in Record']
    }
  ];

  // Trust Graph Nodes centered around Sarah Lim
  const graphNodes = [
    {
      id: 'sarah',
      label: 'Sarah Lim',
      type: 'center',
      role: 'Featured Handler (Trust Score: 94)',
      details: 'Senior Pet-Care Specialist • Portable ID #SG-PAW-9042',
      badge: 'PROTOTYPE / DEMO DATA'
    },
    {
      id: 'pawrent-clara',
      label: 'Clara W. (Pawrent)',
      type: 'pawrent',
      role: 'Verified Pawrent',
      details: 'Owner of Kobe (Samoyed). 12 verified stays with Sarah. 5-star review left.',
      badge: 'Verified Client'
    },
    {
      id: 'pet-teddie',
      label: 'Teddie (Samoyed)',
      type: 'furkid',
      role: 'Furkid Cared For',
      details: 'High-energy Samoyed with thunderstorm anxiety. 3 verified boarding stays.',
      badge: '96% Match'
    },
    {
      id: 'org-company-a',
      label: 'Happy Paws Haven',
      type: 'org',
      role: 'Participating Organisation',
      details: 'Previous employer (2022-2024). 85 bookings logged under Sarah\'s portable ledger.',
      badge: 'Past Org'
    },
    {
      id: 'org-company-b',
      label: 'Sarah\'s Arctic Paws',
      type: 'org',
      role: 'Current Independent Studio',
      details: 'Current operating studio in River Valley. 101 bookings logged.',
      badge: 'Active Studio'
    },
    {
      id: 'cert-cpr',
      label: 'St. John Pet CPR',
      type: 'cert',
      role: 'Verified Qualification',
      details: 'Cert #CP-9021 verified directly with St. John Ambulance Singapore.',
      badge: 'Credential'
    },
    {
      id: 'review-ledger',
      label: '142 Verified Reviews',
      type: 'reviews',
      role: 'Dual-Blind Mutual Ledger',
      details: '4.98/5 score accumulated across all participating organisations.',
      badge: 'Mutual Ledger'
    }
  ];

  const selectedNodeData = graphNodes.find((n) => n.id === selectedGraphNode) || graphNodes[0];

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* HEADER BANNER: Core Business Model Thesis */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        
        {/* Top Tag & Title */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-stone-100 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold shadow-sm">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Pawmise Core Trust Architecture</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 leading-tight">
              Trust Made Visible, Portable and Personal
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
              Existing pet-care platforms attach reputation to the company. Pawmise instead builds a persistent and portable trust profile around the individual handler, supported by verified evidence from their interactions across participating organisations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowEscalationModal(true)}
              className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs rounded-2xl shadow-md transition-all flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Escalate Case to Trust Officer</span>
            </button>
          </div>
        </div>

        {/* THREE CORE PILLARS BANNER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span>1. Verified Trust Signals</span>
            </div>
            <p className="text-xs text-amber-900/90 leading-snug">
              Factual evidence from NRIC checks, CPR certs, GPS walks, and dual-blind reviews.
            </p>
          </div>

          <div className="bg-purple-50/80 p-4 rounded-2xl border border-purple-200 space-y-1.5">
            <div className="flex items-center gap-2 text-purple-950 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
              <span>2. AI Interpretation</span>
            </div>
            <p className="text-xs text-purple-900/90 leading-snug">
              Explainable analysis matching handler strengths with furkid breed and anxiety traits.
            </p>
          </div>

          <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs uppercase tracking-wider">
              <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>3. Pawrent Decision</span>
            </div>
            <p className="text-xs text-emerald-900/90 leading-snug">
              Final human judgement. AI informs trust, but pawrents retain complete choice authority.
            </p>
          </div>

        </div>

      </div>

      {/* SECTION A: HANDLER TRUST PROFILE (Sarah Lim) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 relative">
        
        {/* Prototype Data Banner */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-stone-900 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider">
              [PROTOTYPE / DEMO DATA]
            </span>
            <span className="text-xs text-stone-500 font-medium hidden sm:inline-block">
              Featured Prototype Handler Profile
            </span>
          </div>

          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Gov-Verified Identity</span>
          </span>
        </div>

        {/* Main Handler Profile Card Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-stone-50 p-6 rounded-3xl border border-stone-200/80">
          
          <div className="flex items-center gap-5">
            <img
              src={sarah.avatarUrl}
              alt={sarah.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-amber-500 shadow-md shrink-0"
            />
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
                  {sarah.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                  {sarah.role}
                </span>
              </div>

              <p className="text-xs text-stone-600 font-medium">
                {sarah.companyOrStudio} • {sarah.location}
              </p>

              <div className="flex items-center gap-3 text-xs text-stone-500 pt-1 flex-wrap">
                <span className="flex items-center gap-1 font-bold text-stone-800">
                  <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                  <span>{sarah.experienceYears} Years Experience</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-bold text-stone-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{sarah.verifiedServicesCount} Verified Stays</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-bold text-stone-800">
                  <Repeat className="w-3.5 h-3.5 text-purple-600" />
                  <span>{sarah.repeatBookingRate}% Repeat Rate</span>
                </span>
              </div>
            </div>
          </div>

          {/* Trust Score Box with "Why this Trust Score?" Button */}
          <div className="bg-stone-900 text-stone-100 p-5 rounded-3xl text-center space-y-3 min-w-[220px] w-full md:w-auto shadow-xl border border-stone-800 shrink-0">
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                Accumulated Trust Score
              </span>
              <div className="flex items-baseline justify-center gap-1 my-1">
                <span className="text-4xl font-extrabold font-serif text-amber-400">
                  {sarah.trustScore}
                </span>
                <span className="text-stone-400 text-sm font-bold">/ 100</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold block">
                100% Verified Evidence Ledger
              </span>
            </div>

            {/* PROMINENT BUTTON: Why this Trust Score? */}
            <button
              onClick={() => setShowWhyScoreModal(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 fill-stone-950 text-amber-500" />
              <span>Why this Trust Score?</span>
            </button>
          </div>

        </div>

        {/* KEY DECLARATION BANNER: Trust belongs to the handler */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 p-5 rounded-3xl shadow-lg border border-amber-400 space-y-2">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-950">
            <Lock className="w-4 h-4 text-amber-950" />
            <span>Portable Reputation Principle</span>
          </div>
          <p className="text-base sm:text-lg font-serif font-bold text-stone-950 leading-snug">
            “Trust belongs to the handler and follows them across participating Pawmise organisations.”
          </p>
          <p className="text-xs font-medium text-stone-900/90 leading-relaxed">
            Sarah's trust profile is portable—even if she works independently or moves between participating pet-care companies, her 186 verified stays, CPR certifications, and 4.98/5 ratings remain tied to her verified identity.
          </p>
        </div>

        {/* Verified Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-1">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Verified Identity</span>
            <span className="text-sm font-bold text-stone-900 block flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Gov-Verified NRIC
            </span>
            <span className="text-[11px] text-stone-500">Biometric & ACRA Checked</span>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-1">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Qualifications</span>
            <span className="text-sm font-bold text-stone-900 block flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-600" />
              Pet First Aid & CPR
            </span>
            <span className="text-[11px] text-stone-500">St. John Ambulance SG</span>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-1">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Breed Specialization</span>
            <span className="text-sm font-bold text-stone-900 block flex items-center gap-1">
              <Heart className="w-4 h-4 text-rose-600" />
              Arctic Double Coats
            </span>
            <span className="text-[11px] text-stone-500">Samoyed & Husky Expert</span>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-1">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Safety History</span>
            <span className="text-sm font-bold text-emerald-700 block flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              0 Safety Incidents
            </span>
            <span className="text-[11px] text-stone-500">Across 6 Years Service</span>
          </div>

        </div>

      </div>

      {/* SECTION B: EXPLAINABLE TRUST SCORE & DISTINCTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-amber-300 text-xs font-bold mb-2">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>Explainable AI Standard</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
              Explainable Trust Score vs. AI Compatibility Match
            </h2>
            <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
              Pawmise rejects "black-box" numbers. We explicitly separate a handler's accumulated evidence from their specific fit for your furkid.
            </p>
          </div>

          <button
            onClick={() => setShowWhyScoreModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow transition flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Open Score Breakdown</span>
          </button>
        </div>

        {/* PROMINENT VISUAL DISTINCTION BOX */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          
          {/* Box 1: Trust Score */}
          <div className="bg-stone-900 text-stone-100 p-6 rounded-3xl border border-stone-800 space-y-4 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider">
                Objective Track Record
              </span>
              <span className="text-3xl font-extrabold font-serif text-amber-400">94 / 100</span>
            </div>

            <h3 className="text-lg font-bold font-serif text-white">
              Handler Trust Score
            </h3>

            <p className="text-xs text-stone-300 leading-relaxed">
              Measures the <strong className="text-amber-300">accumulated verified evidence</strong> supporting a handler's professional reputation across all past stays, credentials, and reviews.
            </p>

            <div className="bg-stone-850 p-3.5 rounded-2xl border border-stone-800 text-[11px] text-stone-400 space-y-1">
              <span className="font-bold text-amber-300 block">Factual Evidence Inputs:</span>
              <p className="leading-tight">
                Identity check + CPR Certs + 186 GPS Stays + 82% Repeat Rate + 0 Incidents.
              </p>
            </div>
          </div>

          {/* Box 2: AI Compatibility Match */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-3xl border border-amber-200 text-amber-950 space-y-4 shadow-md relative">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider">
                Personalized Algorithmic Fit
              </span>
              <span className="text-3xl font-extrabold font-serif text-amber-900">96% Match</span>
            </div>

            <h3 className="text-lg font-bold font-serif text-amber-950">
              AI Compatibility Match (e.g. for Teddie)
            </h3>

            <p className="text-xs text-amber-900 leading-relaxed">
              Measures how <strong className="text-amber-950">suitable this specific handler is for a specific furkid</strong> based on unique breed requirements, noise triggers, and air-con preferences.
            </p>

            <div className="bg-white/80 p-3.5 rounded-2xl border border-amber-300 text-[11px] text-amber-900 space-y-1">
              <span className="font-bold text-amber-950 block">Tailored Match Reasons:</span>
              <p className="leading-tight">
                Sarah's 100% air-con room ≤21°C + acoustic noise damping directly addresses Teddie's Samoyed double-coat heat sensitivity & thunderstorm anxiety.
              </p>
            </div>
          </div>

        </div>

        {/* Clear Mandatory Statement Callout */}
        <div className="bg-stone-100 p-4 rounded-2xl border border-stone-300 text-xs text-stone-800 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-stone-900 block uppercase tracking-wide text-[11px]">
              Key Algorithmic Governance Rule:
            </span>
            <p className="text-stone-700 leading-relaxed italic font-medium">
              “Trust Score measures accumulated verified trust signals. It does not determine whether Sarah is the best handler for every furkid.”
            </p>
          </div>
        </div>

      </div>

      {/* SECTION C: PAWMISE TRUST GRAPH */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold">
            <Layers className="w-3.5 h-3.5 text-purple-600" />
            <span>Networked Ledger Visualization</span>
          </div>
          
          <h2 className="text-2xl font-bold font-serif text-stone-900">
            Pawmise Trust Graph
          </h2>

          <p className="text-xs text-stone-600 max-w-3xl leading-relaxed">
            Trust is created from verified relationships and real interactions, rather than anonymous or unverified ratings. Below is Sarah Lim's live Trust Graph.
          </p>
        </div>

        {/* EQUATION BANNER */}
        <div className="bg-stone-900 text-stone-100 p-4 sm:p-5 rounded-2xl text-xs space-y-2 border border-stone-800 shadow-inner">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
            Underlying Pawmise Trust Graph Equation
          </span>
          <p className="font-mono text-amber-200 text-xs sm:text-sm font-bold leading-relaxed">
            Trust Graph = Verified Identity + Credentials + Verified Services + Mutual Reviews + Repeat Bookings + Relevant Experience + Accountability History
          </p>
        </div>

        {/* Interactive Trust Graph Network Visualizer */}
        <div className="bg-stone-950 text-stone-100 p-6 sm:p-8 rounded-3xl border border-stone-800 space-y-6 relative overflow-hidden">
          
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block text-center">
            Interactive Network Graph • Click Any Node to Inspect Verified Evidence
          </span>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
            {graphNodes.map((node) => {
              const isSelected = selectedGraphNode === node.id;
              const isCenter = node.type === 'center';

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedGraphNode(node.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 space-y-2 relative cursor-pointer ${
                    isCenter
                      ? 'bg-amber-500 text-stone-950 border-amber-400 col-span-2 md:col-span-4 text-center ring-4 ring-amber-400/30'
                      : isSelected
                      ? 'bg-stone-800 text-amber-300 border-amber-400 ring-2 ring-amber-400/50'
                      : 'bg-stone-900 hover:bg-stone-850 text-stone-200 border-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isCenter ? 'bg-stone-950 text-amber-300' : 'bg-stone-800 text-amber-400 border border-stone-700'
                    }`}>
                      {node.badge}
                    </span>

                    {isCenter ? (
                      <Award className="w-5 h-5 text-stone-950" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>

                  <div>
                    <h4 className={`font-bold font-serif text-sm ${isCenter ? 'text-stone-950 text-base sm:text-lg' : 'text-white'}`}>
                      {node.label}
                    </h4>
                    <p className={`text-[11px] ${isCenter ? 'text-stone-900 font-medium' : 'text-stone-400'}`}>
                      {node.role}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Node Inspector Details Box */}
          <div className="bg-stone-900 p-5 rounded-2xl border border-stone-800 space-y-2">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-amber-400" />
                <span>Verified Ledger Node Inspection: {selectedNodeData.label}</span>
              </span>
              <span className="text-[10px] font-mono text-stone-500">PROTOTYPE / DEMO DATA</span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              {selectedNodeData.details}
            </p>
          </div>

        </div>

      </div>

      {/* SECTION D: PORTABLE REPUTATION SCENARIO */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
            <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
            <span>Portable Reputation Paradigm</span>
          </div>

          <h2 className="text-2xl font-bold font-serif text-stone-900">
            Portable Reputation Across Employer Transitions
          </h2>

          <p className="text-xs text-stone-600 max-w-3xl leading-relaxed">
            When a handler moves between companies or starts an independent practice, their verified track record stays intact.
          </p>
        </div>

        {/* Scenario Timeline Visual */}
        <div className="bg-stone-50 p-6 rounded-3xl border border-stone-200 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            
            {/* Stage 1 */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3 shadow-sm relative">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-800 text-[10px] font-bold">
                  2022 - 2024
                </span>
                <Building2 className="w-4 h-4 text-stone-500" />
              </div>

              <h3 className="font-bold text-sm text-stone-900 font-serif">
                Stage 1: Pet-Care Company A
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                Sarah works at "Happy Paws Haven". Completes 85 verified stays. Earns St. John CPR qualification.
              </p>

              <div className="pt-2 border-t border-stone-100 text-[11px] font-bold text-amber-700">
                Trust Score: 88 / 100 Accumulated
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3 shadow-sm relative">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                  Mid-2024
                </span>
                <User className="w-4 h-4 text-amber-600" />
              </div>

              <h3 className="font-bold text-sm text-stone-900 font-serif">
                Stage 2: Independent Practice
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                Sarah becomes an Independent Caregiver. Retains all 85 reviews, CPR certs, and client relationships seamlessly.
              </p>

              <div className="pt-2 border-t border-stone-100 text-[11px] font-bold text-amber-700">
                Trust Score: 90 / 100 Maintained
              </div>
            </div>

            {/* Stage 3 */}
            <div className="bg-white p-5 rounded-2xl border border-amber-300 ring-2 ring-amber-400/30 space-y-3 shadow-md relative">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold">
                  2025 - Present
                </span>
                <Building2 className="w-4 h-4 text-emerald-600" />
              </div>

              <h3 className="font-bold text-sm text-stone-900 font-serif">
                Stage 3: Pet-Care Company B
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                Sarah joins "Sarah's Arctic Paws Haven". Reaches 186 verified stays with zero lost historical data.
              </p>

              <div className="pt-2 border-t border-stone-100 text-[11px] font-bold text-emerald-700">
                Trust Score: 94 / 100 Portable
              </div>
            </div>

          </div>

          {/* Statement Callout */}
          <div className="bg-stone-900 text-stone-100 p-5 rounded-2xl space-y-2 shadow-md">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
              Core Architectural Commitment:
            </span>
            <p className="text-sm font-serif font-bold text-amber-200 leading-snug">
              “A company's reputation should not hide individual performance—and a trusted handler should not lose years of verified reputation simply because they change employer.”
            </p>
          </div>

        </div>

      </div>

      {/* SECTION E: PAWMISE AI TRUST FLYWHEEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Self-Reinforcing Network Advantage</span>
          </div>

          <h2 className="text-2xl font-bold font-serif text-stone-900">
            Pawmise AI Trust Flywheel
          </h2>

          <p className="text-xs text-stone-600 max-w-3xl leading-relaxed">
            How verified care interactions continuously refine algorithmic precision and elevate Singapore pet-care standards.
          </p>
        </div>

        {/* Circular / Flow Visual */}
        <div className="bg-stone-900 text-stone-100 p-6 sm:p-8 rounded-3xl border border-stone-800 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
            
            <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700 space-y-2 flex flex-col justify-center">
              <span className="text-amber-400 font-bold text-xs">Step 1</span>
              <p className="text-xs font-bold text-white">More Verified Interactions</p>
              <span className="text-[10px] text-stone-400">GPS & Temp logs</span>
            </div>

            <div className="hidden md:flex items-center justify-center text-amber-400 font-bold">→</div>

            <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700 space-y-2 flex flex-col justify-center">
              <span className="text-amber-400 font-bold text-xs">Step 2</span>
              <p className="text-xs font-bold text-white">Richer Trust Graph</p>
              <span className="text-[10px] text-stone-400">Expanded node proof</span>
            </div>

            <div className="hidden md:flex items-center justify-center text-amber-400 font-bold">→</div>

            <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700 space-y-2 flex flex-col justify-center">
              <span className="text-amber-400 font-bold text-xs">Step 3</span>
              <p className="text-xs font-bold text-white">Better AI Recommendations</p>
              <span className="text-[10px] text-stone-400">Precision matching</span>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center pt-2">
            
            <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700 space-y-1">
              <span className="text-emerald-400 font-bold text-xs">Step 4</span>
              <p className="text-xs font-bold text-white">Better Care Experiences</p>
              <span className="text-[10px] text-stone-400">Stress-free furkids</span>
            </div>

            <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700 space-y-1">
              <span className="text-purple-400 font-bold text-xs">Step 5</span>
              <p className="text-xs font-bold text-white">Greater Trust & Repeat Usage</p>
              <span className="text-[10px] text-stone-400">82% retention rate</span>
            </div>

            <div className="bg-amber-500 text-stone-950 p-4 rounded-2xl font-bold text-xs flex flex-col justify-center shadow-lg">
              <span>🔄 Loop Re-enters Step 1</span>
              <span className="text-[10px] font-medium text-stone-900 mt-0.5">Reinforcing Trust Loop</span>
            </div>

          </div>

          {/* Explanation Callout */}
          <div className="bg-stone-850 p-4 rounded-2xl border border-stone-800 text-xs text-stone-300 leading-relaxed">
            <span className="font-bold text-amber-300 block mb-1">Flywheel Mechanism Explanation:</span>
            “Every verified interaction strengthens Pawmise's trust data. As the Trust Graph becomes richer, AI can provide more informed and personalised recommendations, creating a reinforcing data-and-trust advantage.”
          </div>

        </div>

      </div>

      {/* SECTION F: RESPONSIBLE AI & GOVERNANCE */}
      <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-800 relative">
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Pawmise Trust Governance Standard</span>
          </div>

          <h2 className="text-2xl font-bold font-serif text-white">
            Responsible AI & Governance Commitments
          </h2>

          <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
            Pawmise adheres strictly to explainable, human-governed AI standards across all matching algorithms, profiles, and trust scores.
          </p>
        </div>

        {/* Governance Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          
          <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700 space-y-1.5">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              1. Explainable Recommendations
            </span>
            <p className="text-stone-300 text-[11px] leading-snug">
              Every compatibility match or care suggestion provides transparent reasoning grounded in verified profile data.
            </p>
          </div>

          <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700 space-y-1.5">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              2. Verified Facts vs. AI Predictions
            </span>
            <p className="text-stone-300 text-[11px] leading-snug">
              Factual ledger evidence (NRIC, CPR certs) is strictly separated from predictive compatibility matching.
            </p>
          </div>

          <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700 space-y-1.5">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              3. Human Decision Authority
            </span>
            <p className="text-stone-300 text-[11px] leading-snug">
              AI never completes autonomous bookings or caregiver selections. Pawrents retain 100% final choice authority.
            </p>
          </div>

          <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700 space-y-1.5">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              4. Human Review Escalation
            </span>
            <p className="text-stone-300 text-[11px] leading-snug">
              Disputed stays, safety concerns, or high-risk cases are immediately escalated to Pawmise Human Trust Officers.
            </p>
          </div>

          <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700 space-y-1.5">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-400" />
              5. Zero Score Manipulation
            </span>
            <p className="text-stone-300 text-[11px] leading-snug">
              Trust Scores cannot be purchased, sponsored with advertising fees, or boosted by commission payments.
            </p>
          </div>

          <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700 space-y-1.5">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-amber-400" />
              6. Fact Integrity Commitment
            </span>
            <p className="text-stone-300 text-[11px] leading-snug">
              Pawmise never fabricates missing profile information. Unverified fields are clearly labeled 'Pawrent Input Required'.
            </p>
          </div>

        </div>

        {/* Action Button: Handler Challenge / Review Mechanism */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-800">
          <p className="text-xs text-stone-400">
            Mechanism for handlers to review or challenge inaccurate ledger information:
          </p>

          <button
            onClick={() => setShowHandlerChallengeModal(true)}
            className="px-4 py-2.5 bg-stone-800 hover:bg-stone-750 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-2xl transition flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-amber-400" />
            <span>Challenge Inaccurate Ledger Entry</span>
          </button>
        </div>

        {/* CORE GOVERNANCE PRINCIPLE BANNER */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 p-6 rounded-3xl text-center space-y-1.5 shadow-xl border border-amber-400">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-950 block">
            The Pawmise Governance Principle
          </span>
          <p className="text-xl sm:text-2xl font-bold font-serif text-stone-950">
            “AI informs trust. Evidence builds trust. Humans decide trust.”
          </p>
        </div>

      </div>

      {/* MODAL 1: EXPLAINABLE TRUST SCORE BREAKDOWN ("Why this Trust Score?") */}
      {showWhyScoreModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setShowWhyScoreModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 border-b border-stone-100 pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Explainable Score Breakdown</span>
              </div>

              <h3 className="text-2xl font-bold font-serif text-stone-900">
                Why Sarah Lim Has a 94 / 100 Trust Score
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                The Trust Score is an objective measurement of accumulated verified evidence—never a black-box rating or sponsored boost.
              </p>
            </div>

            {/* Evidence Categories List */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {scoreBreakdown.map((item, idx) => {
                const IconComponent = item.icon;

                return (
                  <div key={idx} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4 text-amber-600 shrink-0" />
                        <h4 className="font-bold text-stone-900 text-sm">{item.category}</h4>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-900 text-amber-300 text-xs font-bold font-mono">
                        {item.points}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed font-medium">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.evidence.map((ev, evIdx) => (
                        <span key={evIdx} className="px-2 py-0.5 rounded-lg bg-white border border-stone-200 text-[10px] font-bold text-stone-700">
                          ✓ {ev}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Distinction Reminder Callout */}
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
              <span className="font-bold text-amber-900 block">Crucial Distinction:</span>
              <p className="text-[11px] leading-relaxed">
                “Trust Score measures accumulated verified trust signals. It does not determine whether Sarah is the best handler for every furkid.”
              </p>
            </div>

            <button
              onClick={() => setShowWhyScoreModal(false)}
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs rounded-2xl shadow transition cursor-pointer"
            >
              Close Score Breakdown
            </button>

          </div>
        </div>
      )}

      {/* MODAL 2: HUMAN ESCALATION CASE MODAL */}
      {showEscalationModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowEscalationModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {escalationSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold font-serif text-stone-900">
                  Case Escalated to Trust Officer
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                  Your case has been flagged for manual review by a Pawmise Human Trust Officer. We will contact you via phone/email within 1 hour.
                </p>
                <button
                  onClick={() => {
                    setShowEscalationModal(false);
                    setEscalationSubmitted(false);
                  }}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                  <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-800 flex items-center justify-center font-bold">
                    <ShieldAlert className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-serif text-stone-900">
                      Escalate to Human Trust Officer
                    </h3>
                    <p className="text-xs text-stone-500">
                      Pawmise Human Trust Review Protocol
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Reason for Escalation / Dispute</label>
                  <textarea
                    value={escalationReason}
                    onChange={(e) => setEscalationReason(e.target.value)}
                    rows={4}
                    placeholder="Describe any safety concern, review dispute, or high-risk observation requiring human intervention..."
                    className="w-full text-xs p-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowEscalationModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setEscalationSubmitted(true)}
                    className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Submit Escalation Case</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: HANDLER CHALLENGE INACCURATE INFO MODAL */}
      {showHandlerChallengeModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowHandlerChallengeModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {challengeSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold font-serif text-stone-900">
                  Challenge Audit Submitted
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                  Your request to review or correct ledger data has been submitted. The Pawmise Trust Audit Team will review supporting evidence within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setShowHandlerChallengeModal(false);
                    setChallengeSubmitted(false);
                  }}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow cursor-pointer"
                >
                  Return to Profile
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <RefreshCw className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-serif text-stone-900">
                      Challenge Inaccurate Information
                    </h3>
                    <p className="text-xs text-stone-500">
                      Handler Ledger Audit & Corrections Mechanism
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Details of Inaccurate Ledger Data</label>
                  <textarea
                    value={challengeText}
                    onChange={(e) => setChallengeText(e.target.value)}
                    rows={4}
                    placeholder="Specify the service log, certification date, or review entry you wish to challenge or update..."
                    className="w-full text-xs p-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowHandlerChallengeModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setChallengeSubmitted(true)}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-stone-950" />
                    <span>Submit Audit Request</span>
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
