import React, { useState } from 'react';
import { useClassHub } from '../context/ClassContext';
import {
  Calendar,
  Users,
  Award,
  Clock,
  MapPin,
  Plus,
  Search,
  CheckCircle2,
  X,
  Send,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { BatchType } from '../types';

export const EventsPortal: React.FC = () => {
  const {
    events,
    participants,
    registerParticipant,
    currentUser,
    selectedBatchFilter,
    setSelectedBatchFilter,
  } = useClassHub();

  const [activeSubTab, setActiveSubTab] = useState<'upcoming' | 'participation'>('upcoming');
  const [selectedEventIdFilter, setSelectedEventIdFilter] = useState<string>('All');
  const [participantSearch, setParticipantSearch] = useState('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [preselectedEventId, setPreselectedEventId] = useState<string>(events[0]?.id || '');

  // Form State
  const [regEventId, setRegEventId] = useState(events[0]?.id || '');
  const [regTeamName, setRegTeamName] = useState('');
  const [regRole, setRegRole] = useState('Full Stack Developer');
  const [regContact, setRegContact] = useState(currentUser.email);

  const openRegisterModalFor = (eventId: string) => {
    setRegEventId(eventId);
    setIsRegisterModalOpen(true);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventObj = events.find((ev) => ev.id === regEventId);
    if (!eventObj) return;

    registerParticipant({
      eventId: regEventId,
      eventTitle: eventObj.title,
      teamName: regTeamName.trim() || `${currentUser.name}'s Duo`,
      studentName: currentUser.name,
      rollNo: currentUser.rollNo,
      batch: currentUser.batch,
      roleInTeam: regRole.trim() || 'Team Member',
      contact: regContact.trim() || currentUser.email,
    });

    setIsRegisterModalOpen(false);
    setRegTeamName('');
    setActiveSubTab('participation');
  };

  const filteredParticipants = participants.filter((p) => {
    if (selectedEventIdFilter !== 'All' && p.eventId !== selectedEventIdFilter) return false;
    if (selectedBatchFilter !== 'All' && p.batch !== selectedBatchFilter) return false;
    if (participantSearch.trim()) {
      const q = participantSearch.toLowerCase();
      return (
        p.studentName.toLowerCase().includes(q) ||
        p.rollNo.toLowerCase().includes(q) ||
        p.eventTitle.toLowerCase().includes(q) ||
        (p.teamName && p.teamName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Campus Activities & Competitions</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Events & Participation Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Discover upcoming hackathons, sports tournaments, and see exactly who is participating in what event.
          </p>
        </div>

        <button
          onClick={() => {
            setRegEventId(events[0]?.id || '');
            setIsRegisterModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Register for an Event</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('upcoming')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeSubTab === 'upcoming'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Upcoming Events</span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">
            {events.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('participation')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeSubTab === 'participation'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Who's Taking Part (Roster)</span>
          <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.2 rounded font-mono font-bold">
            {participants.length} Active
          </span>
        </button>
      </div>

      {/* SUB-TAB 1: UPCOMING EVENTS */}
      {activeSubTab === 'upcoming' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => {
            const eventParticipants = participants.filter((p) => p.eventId === event.id);
            const userIsRegistered = eventParticipants.some((p) => p.rollNo === currentUser.rollNo);

            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-purple-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded uppercase">
                      {event.category}
                    </span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {event.prizes}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> Date & Time:
                      </span>
                      <span className="font-semibold text-slate-800">
                        {event.date} ({event.time})
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> Venue:
                      </span>
                      <span className="font-semibold text-slate-800">{event.venue}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" /> Team Size:
                      </span>
                      <span className="font-semibold text-indigo-700">{event.teamSize}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Registration Closes:</span>
                      <span className="font-semibold text-rose-600">{event.deadline}</span>
                    </div>
                  </div>

                  {/* Registered Students Avatar previews */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 mb-4">
                    <span className="font-semibold text-slate-700">
                      {eventParticipants.length} class students registered
                    </span>
                    <button
                      onClick={() => {
                        setSelectedEventIdFilter(event.id);
                        setActiveSubTab('participation');
                      }}
                      className="text-purple-600 font-semibold hover:underline cursor-pointer"
                    >
                      View participant list &rarr;
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  {userIsRegistered ? (
                    <div className="w-full py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>You are registered for this event!</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => openRegisterModalFor(event.id)}
                      className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                    >
                      Participate / Register Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SUB-TAB 2: WHO'S TAKING PART (PARTICIPATION ROSTER) */}
      {activeSubTab === 'participation' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Event Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedEventIdFilter('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedEventIdFilter === 'All'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                All Events ({participants.length})
              </button>

              {events.map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => setSelectedEventIdFilter(ev.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    selectedEventIdFilter === ev.id
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {ev.title.split(':')[0]}
                </button>
              ))}
            </div>

            {/* Batch & Search */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs border border-slate-200 rounded-lg p-1 bg-slate-50">
                <span className="text-[11px] text-slate-500 font-medium px-1.5">Batch:</span>
                {(['All', 'A', 'B', 'C'] as const).map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBatchFilter(b)}
                    className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                      selectedBatchFilter === b ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-60">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search student, team, roll..."
                  value={participantSearch}
                  onChange={(e) => setParticipantSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Participants Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredParticipants.length === 0 ? (
              <div className="col-span-3 text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
                <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="font-bold text-slate-700 text-sm">No registered students found</p>
                <p className="text-xs text-slate-500 mt-1">Be the first to register for this event!</p>
              </div>
            ) : (
              filteredParticipants.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-purple-300 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded text-[11px] truncate max-w-[180px]">
                      {p.teamName || 'Solo'}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      Batch {p.batch}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm shrink-0">
                      {p.studentName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{p.studentName}</h4>
                      <p className="text-xs text-slate-500 font-mono">
                        {p.rollNo} · <span className="text-slate-700 font-medium">{p.roleInTeam}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-400 block text-[10px]">Registered Event:</span>
                    <p className="font-semibold text-slate-800 line-clamp-1">{p.eventTitle}</p>
                    <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                      Contact: {p.contact}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-slate-900 text-base">Register for College Event</h3>
              </div>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Event *
                </label>
                <select
                  value={regEventId}
                  onChange={(e) => setRegEventId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.title} ({ev.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Team Name (Leave empty if Solo)
                </label>
                <input
                  type="text"
                  placeholder="e.g., CodeCrusaders or AlgoBeasts"
                  value={regTeamName}
                  onChange={(e) => setRegTeamName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Role in Team
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Full Stack Dev / UI Lead"
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Email / Phone
                  </label>
                  <input
                    type="text"
                    value={regContact}
                    onChange={(e) => setRegContact(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900">
                Registering as: <strong>{currentUser.name}</strong> (Roll: {currentUser.rollNo}, Batch: {currentUser.batch})
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-medium hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
