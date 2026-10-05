import React from 'react';
import { useClassHub } from '../context/ClassContext';
import {
  Bell,
  AlertOctagon,
  BookOpen,
  Calendar,
  Layers,
  ClipboardList,
  Sparkles,
  Radio,
  FileText,
  Clock,
  ArrowRight,
  CheckCircle2,
  Users,
  FlaskConical,
  Award,
  UploadCloud,
  ChevronRight,
} from 'lucide-react';

export const MainDashboard: React.FC = () => {
  const {
    currentUser,
    setCurrentPortal,
    updates,
    tests,
    assignments,
    events,
    notes,
    liveTest,
    participants,
    selectedBatchFilter,
    setSelectedBatchFilter,
  } = useClassHub();

  const urgentList = updates.filter((u) => u.isUrgent);
  const generalList = updates.filter((u) => !u.isUrgent);
  const nextTest = tests[0];
  const pendingAssignments = assignments.filter((a) => a.status !== 'Closed');

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold tracking-wider uppercase">
              <span>Third Year CSE · Semester VI</span>
              <span>·</span>
              <span className="bg-indigo-900/80 px-2 py-0.5 rounded text-[11px] text-indigo-200 border border-indigo-700/50">
                Batch {currentUser.batch}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Here is your centralized academic station. Access CIA schedules, experiment manuals, peer notes, event rosters, batch updates, and the live test answer room.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            {liveTest.isActive && (
              <button
                onClick={() => setCurrentPortal('live-test')}
                className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-900/30 transition-all cursor-pointer"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>Live Test Room Active</span>
              </button>
            )}

            <button
              onClick={() => setCurrentPortal('academics')}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold backdrop-blur-xs border border-white/10 transition-colors cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Notes</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Upcoming CIA</span>
            <span className="font-bold text-white text-sm sm:text-base truncate block">
              {nextTest ? nextTest.subject : 'No immediate test'}
            </span>
            <span className="text-indigo-300 text-[11px] font-mono">{nextTest?.date}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Active Assignments</span>
            <span className="font-bold text-white text-sm sm:text-base tabular-nums">
              {pendingAssignments.length} In Progress
            </span>
            <span className="text-amber-400 text-[11px]">Next due in 3 days</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Shared Notes Library</span>
            <span className="font-bold text-white text-sm sm:text-base tabular-nums">
              {notes.length} PDF Modules
            </span>
            <span className="text-emerald-400 text-[11px]">Verified by CRs</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Events Registered</span>
            <span className="font-bold text-white text-sm sm:text-base tabular-nums">
              {participants.length} Students Active
            </span>
            <span className="text-indigo-300 text-[11px]">TechFest CodeStorm</span>
          </div>
        </div>
      </div>

      {/* Primary Navigation Hub - Modeled Exactly from user diagram "Coolege ka website flow" */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Main Dashboard Flow</h2>
            <p className="text-xs text-slate-500">
              Interactive portals structured from your college class architecture
            </p>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">Click any card to open portal</span>
        </div>

        {/* Grid of 5 Main Portals matching colors in diagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* 1. UPDATES (Pink in diagram) */}
          <div className="bg-rose-50/50 hover:bg-rose-50 border border-rose-200/80 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between group shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
                  <Bell className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded uppercase tracking-wide">
                  Updates
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Class Updates</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Central circulars, class cancellations, timetable shifts, and priority notices.
              </p>

              <div className="space-y-2 border-t border-rose-200/60 pt-3 text-xs">
                <button
                  onClick={() => setCurrentPortal('updates')}
                  className="w-full text-left flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white text-slate-700 hover:text-rose-700 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> General Updates
                  </span>
                  <span className="text-[11px] text-slate-400 tabular-nums">({generalList.length})</span>
                </button>

                <button
                  onClick={() => setCurrentPortal('updates')}
                  className="w-full text-left flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white text-rose-700 font-semibold transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" /> Urgent Notices
                  </span>
                  <span className="text-[11px] text-rose-600 font-bold tabular-nums">
                    ({urgentList.length})
                  </span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setCurrentPortal('updates')}
              className="mt-4 pt-3 border-t border-rose-200/60 text-xs font-bold text-rose-700 flex items-center justify-between group-hover:translate-x-0.5 transition-transform cursor-pointer"
            >
              <span>Open Updates Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2. ACADEMICS (Green in diagram) */}
          <div className="bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-200/80 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between group shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded uppercase tracking-wide">
                  Academics
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Academics Hub</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                CIA test dates, peer notes uploads, syllabus guidelines, and the CR Portal.
              </p>

              <div className="space-y-1.5 border-t border-emerald-200/60 pt-3 text-xs">
                <button
                  onClick={() => setCurrentPortal('academics')}
                  className="w-full text-left flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Tests & CIA
                  </span>
                  <span className="text-[11px] text-slate-400 tabular-nums">{tests.length} scheduled</span>
                </button>

                <button
                  onClick={() => setCurrentPortal('academics')}
                  className="w-full text-left flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Notes Submission
                  </span>
                  <span className="text-[11px] text-slate-400 tabular-nums">{notes.length} uploaded</span>
                </button>

                <button
                  onClick={() => setCurrentPortal('academics')}
                  className="w-full text-left flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> CR Portal (Ass / Exp)
                  </span>
                  <span className="text-[10px] bg-emerald-200/70 text-emerald-800 px-1 rounded font-semibold">
                    CR Leads
                  </span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setCurrentPortal('academics')}
              className="mt-4 pt-3 border-t border-emerald-200/60 text-xs font-bold text-emerald-700 flex items-center justify-between group-hover:translate-x-0.5 transition-transform cursor-pointer"
            >
              <span>Explore Academics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3. EVENTS (Purple in diagram) */}
          <div className="bg-purple-50/50 hover:bg-purple-50 border border-purple-200/80 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between group shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded uppercase tracking-wide">
                  Events
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Events Portal</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Hackathons, fests, workshops, and transparent rosters of who is participating!
              </p>

              <div className="space-y-2 border-t border-purple-200/60 pt-3 text-xs">
                <button
                  onClick={() => setCurrentPortal('events')}
                  className="w-full text-left flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white text-slate-700 hover:text-purple-700 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Upcoming Events
                  </span>
                  <span className="text-[11px] text-slate-400 tabular-nums">({events.length})</span>
                </button>

                <button
                  onClick={() => setCurrentPortal('events')}
                  className="w-full text-left flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white text-purple-700 font-semibold transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600" /> Event Participation
                  </span>
                  <span className="text-[11px] text-purple-700 font-bold tabular-nums">
                    ({participants.length} Active)
                  </span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setCurrentPortal('events')}
              className="mt-4 pt-3 border-t border-purple-200/60 text-xs font-bold text-purple-700 flex items-center justify-between group-hover:translate-x-0.5 transition-transform cursor-pointer"
            >
              <span>View Who is Taking Part</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4. BATCH (Yellow in diagram) */}
          <div className="bg-amber-50/50 hover:bg-amber-50 border border-amber-200/80 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between group shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded uppercase tracking-wide">
                  Batch
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Batch Portals</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Dedicated channels for Batch A, Batch B, and Batch C lab slots and notices.
              </p>

              <div className="space-y-1.5 border-t border-amber-200/60 pt-3 text-xs">
                {(['A', 'B', 'C'] as const).map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      setSelectedBatchFilter(b);
                      setCurrentPortal('batch');
                    }}
                    className={`w-full text-left flex items-center justify-between py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                      selectedBatchFilter === b
                        ? 'bg-amber-100 text-amber-900 font-bold'
                        : 'hover:bg-white text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-[10px] font-bold">
                        {b}
                      </span>
                      <span>Batch {b} Portal</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">24 Students</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentPortal('batch')}
              className="mt-4 pt-3 border-t border-amber-200/60 text-xs font-bold text-amber-800 flex items-center justify-between group-hover:translate-x-0.5 transition-transform cursor-pointer"
            >
              <span>Open Batch Channels</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 5. ASSIGNMENTS (Blue in diagram) */}
          <div className="bg-sky-50/50 hover:bg-sky-50 border border-sky-200/80 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between group shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded uppercase tracking-wide">
                  Assignments
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Assignments Portal</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Centralized submission drop for all subjects with deadlines and rubrics.
              </p>

              <div className="space-y-2 border-t border-sky-200/60 pt-3 text-xs">
                <button
                  onClick={() => setCurrentPortal('assignments')}
                  className="w-full text-left flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white text-slate-700 hover:text-sky-700 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" /> Assignment Portal (All)
                  </span>
                  <span className="text-[11px] text-slate-400 tabular-nums">
                    {assignments.length} Tasks
                  </span>
                </button>

                <div className="p-2 bg-sky-100/60 rounded-lg text-[11px] text-sky-900">
                  <span className="font-bold">Next Due:</span> OS CPU Scheduling Simulator (Oct 5)
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentPortal('assignments')}
              className="mt-4 pt-3 border-t border-sky-200/60 text-xs font-bold text-sky-700 flex items-center justify-between group-hover:translate-x-0.5 transition-transform cursor-pointer"
            >
              <span>Submit Assignment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* OPTIONAL PORTALS SECTION - Highlighted in dashed container as depicted in flowchart */}
      <div className="border-2 border-dashed border-indigo-200 rounded-3xl p-6 bg-gradient-to-b from-indigo-50/30 to-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider">
              Optional Portals
            </span>
            <span className="text-xs text-slate-500">
              Exam answers repository & live test-session answer crowdsourcing
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Copy Portal (Test Answers) */}
          <div
            onClick={() => setCurrentPortal('copy-portal')}
            className="bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-teal-400 rounded-2xl p-5 cursor-pointer transition-all duration-200 shadow-xs group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">Copy Portal</h3>
                    <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 px-1.5 py-0.2 rounded font-semibold">
                      Answer Bank
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Test Answers & Solved Question Papers</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
            </div>

            <p className="text-xs text-slate-600 mt-4 leading-relaxed">
              Access verified solutions for CIA-1, CIA-2, and model exam questions with full derivations, formatted algorithms, C/C++ code snippets, and one-click copy buttons.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-teal-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified by CR & Top Scorers
              </span>
              <span className="text-slate-400">4 Solved Modules</span>
            </div>
          </div>

          {/* Live Test Session */}
          <div
            onClick={() => setCurrentPortal('live-test')}
            className={`border rounded-2xl p-5 cursor-pointer transition-all duration-200 shadow-xs group ${
              liveTest.isActive
                ? 'bg-rose-50/40 hover:bg-rose-50/80 border-rose-300 ring-2 ring-rose-500/20'
                : 'bg-white hover:bg-slate-50/80 border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                    liveTest.isActive ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-800 text-white'
                  }`}
                >
                  <Radio className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">Live Test Session</h3>
                    {liveTest.isActive ? (
                      <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider animate-pulse">
                        LIVE NOW
                      </span>
                    ) : (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                        Offline
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Upload & View Answers During Active Test
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
            </div>

            <p className="text-xs text-slate-600 mt-4 leading-relaxed">
              Real-time live examination room. Collaborate with peers to upload solved questions, vote on verified code and math proofs, and utilize the stealth cloak hotkey.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-rose-600 font-semibold flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" /> {liveTest.subject} (Hall 304)
              </span>
              <span className="text-slate-500 tabular-nums">
                {liveTest.answers.length} live contributions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Utility: Urgent Notices feed on left, Today's CIA / Class Schedule on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Urgent Notices & Class Bulletins (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm ring-1 ring-slate-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                <AlertOctagon className="w-4 h-4 text-rose-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base leading-tight">
                  High-Priority Class Bulletins & Action Deadlines
                </h3>
                <p className="text-[11px] text-slate-500">
                  Critical circulars with scheduled submission dates and exam deadlines
                </p>
              </div>
            </div>
            <button
              onClick={() => setCurrentPortal('updates')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer self-start sm:self-auto"
            >
              View All Circulars &rarr;
            </button>
          </div>

          <div className="space-y-3.5">
            {updates.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all duration-150 ${
                  item.isUrgent
                    ? 'border-l-4 border-l-rose-500 bg-gradient-to-r from-rose-50/50 via-rose-50/20 to-white border-rose-200/80 hover:shadow-xs'
                    : 'border-l-4 border-l-indigo-500 bg-gradient-to-r from-slate-50/80 via-slate-50/30 to-white border-slate-200/80 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <div className="flex items-center gap-2">
                    {item.isUrgent ? (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-200/70 px-2 py-0.5 rounded uppercase tracking-wider">
                        URGENT
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded uppercase tracking-wider">
                        {item.category}
                      </span>
                    )}
                    <span className="font-semibold text-slate-700">{item.author}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{item.date}</span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm mb-1 leading-snug">{item.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.content}</p>

                {/* Prominent Action Deadline / Date Badge */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-[11px] text-rose-700 bg-rose-50/90 border border-rose-200/70 px-2.5 py-1 rounded-lg">
                    <Calendar className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>
                      <strong className="text-rose-900">Deadline / Target Date:</strong>{' '}
                      {item.deadline || 'Immediate action requested'}
                    </span>
                  </div>

                  <button
                    onClick={() => setCurrentPortal('updates')}
                    className="text-[11px] font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    Details &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick CIA Timetable & Lab Slot */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">Next CIA Schedule</h3>
              </div>
              <span className="text-[11px] font-mono text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                Oct 2026
              </span>
            </div>

            {nextTest && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{nextTest.code} · {nextTest.subject}</span>
                  <span className="text-rose-600 font-bold text-[11px]">{nextTest.type}</span>
                </div>
                <p className="text-xs text-slate-600">{nextTest.date} · {nextTest.time}</p>
                <div className="text-[11px] text-slate-500 font-mono">
                  Room: {nextTest.hall}
                </div>
                <div className="text-[11px] text-indigo-700 font-medium">
                  {nextTest.portionsCovered}
                </div>
              </div>
            )}

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Active Batch View</span>
                <span className="font-bold text-slate-800">
                  {selectedBatchFilter === 'All' ? 'All Batches (A, B, C)' : `Batch ${selectedBatchFilter}`}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Lab Mentor</span>
                <span className="font-medium text-slate-800">Prof. K. Venkatesh</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-500">Exp Manual Status</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentPortal('academics')}
            className="w-full mt-4 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center"
          >
            Open Full Academic Calendar
          </button>
        </div>
      </div>
    </div>
  );
};
