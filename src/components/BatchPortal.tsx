import React, { useState } from 'react';
import { useClassHub } from '../context/ClassContext';
import { BatchType } from '../types';
import {
  Layers,
  Phone,
  UserCheck,
  Clock,
  MapPin,
  FlaskConical,
  Plus,
  Send,
  MessageSquare,
  Users,
  Calendar,
  AlertCircle,
} from 'lucide-react';

export const BatchPortal: React.FC = () => {
  const {
    batches,
    addBatchAnnouncement,
    selectedBatchFilter,
    setSelectedBatchFilter,
    currentUser,
  } = useClassHub();

  const [activeBatch, setActiveBatch] = useState<BatchType>(
    selectedBatchFilter !== 'All' ? selectedBatchFilter : 'B'
  );
  const [newAnnouncementText, setNewAnnouncementText] = useState('');

  const currentBatchData = batches[activeBatch];

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncementText.trim()) return;
    addBatchAnnouncement(activeBatch, newAnnouncementText.trim());
    setNewAnnouncementText('');
  };

  // Generate roll numbers for the batch display
  const getBatchRollList = (batch: BatchType) => {
    const start = batch === 'A' ? 1 : batch === 'B' ? 25 : 49;
    return Array.from({ length: 24 }, (_, i) => {
      const num = (start + i).toString().padStart(3, '0');
      const roll = `22CS${num}`;
      return {
        rollNo: roll,
        isCurrentUser: roll === currentUser.rollNo,
      };
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Sub-Group Organization</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Batch-Wise Portals (A, B, C)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tailored lab schedules, allocated venues, faculty mentorship, and localized class circulars.
          </p>
        </div>

        {/* Batch Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          {(['A', 'B', 'C'] as const).map((batch) => (
            <button
              key={batch}
              onClick={() => {
                setActiveBatch(batch);
                setSelectedBatchFilter(batch);
              }}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeBatch === batch
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Batch {batch}
            </button>
          ))}
        </div>
      </div>

      {/* Main Batch Detail Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Key Batch Logistics & Mentor (1 col) */}
        <div className="space-y-4">
          {/* CR Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              Class Representative
            </span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                {currentBatchData.crName.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{currentBatchData.crName}</h4>
                <p className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                  <Phone className="w-3 h-3 text-slate-400" /> {currentBatchData.crContact}
                </p>
              </div>
            </div>
          </div>

          {/* Mentor & Lab Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
              Batch {activeBatch} Logistics
            </h3>

            <div>
              <span className="text-slate-400 block text-[11px]">Faculty Mentor</span>
              <span className="font-semibold text-slate-800 text-sm block">
                {currentBatchData.mentor}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] flex items-center gap-1">
                <Clock className="w-3 h-3" /> Scheduled Lab Slot
              </span>
              <span className="font-semibold text-slate-800 block">
                {currentBatchData.labSlot}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Assigned Lab Venue
              </span>
              <span className="font-semibold text-indigo-700 block">
                {currentBatchData.labVenue}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] flex items-center gap-1">
                <FlaskConical className="w-3 h-3" /> Current Experiment
              </span>
              <span className="font-semibold text-emerald-800 block">
                {currentBatchData.currentExperiment}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Weekly Viva Voce
              </span>
              <span className="font-semibold text-slate-800 block">
                {currentBatchData.vivaSlot}
              </span>
            </div>
          </div>

          {/* Student Roll numbers mini roster */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-xs">
                Batch {activeBatch} Roll Numbers ({currentBatchData.studentsCount})
              </span>
              <span className="text-[11px] text-slate-400">CSE Department</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono">
              {getBatchRollList(activeBatch).map((item) => (
                <span
                  key={item.rollNo}
                  className={`px-1.5 py-1 rounded text-center ${
                    item.isCurrentUser
                      ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                      : 'bg-slate-50 text-slate-600'
                  }`}
                >
                  {item.rollNo.slice(-3)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Batch-Specific Updates & Announcements Feed (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post to this batch */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-600" />
              Post Notice to Batch {activeBatch}
            </h3>
            <form onSubmit={handlePostAnnouncement} className="space-y-3">
              <textarea
                required
                rows={2}
                placeholder={`Broadcast message exclusively for Batch ${activeBatch} (e.g., viva timings, lab changes, project groups)...`}
                value={newAnnouncementText}
                onChange={(e) => setNewAnnouncementText(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">
                  Visible to all students in Batch {activeBatch}
                </span>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to Batch {activeBatch}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Announcements Timeline */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">
              Batch {activeBatch} Broadcast History
            </h3>

            {currentBatchData.announcements.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-xl border border-slate-200 p-6">
                <p className="text-xs text-slate-500">No batch-specific circulars yet.</p>
              </div>
            ) : (
              currentBatchData.announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2 hover:border-amber-300 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="font-bold text-slate-800">{ann.author}</span>
                    </div>
                    <span className="font-mono">{ann.date}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{ann.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
