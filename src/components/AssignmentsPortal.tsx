import React, { useState } from 'react';
import { useClassHub } from '../context/ClassContext';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  FileText,
  Link2,
  Calendar,
  X,
  ExternalLink,
  Search,
} from 'lucide-react';
import { AssignmentItem } from '../types';

export const AssignmentsPortal: React.FC = () => {
  const { assignments, submitAssignmentWork, currentUser } = useClassHub();

  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Submitted'>('All');
  const [selectedAsg, setSelectedAsg] = useState<AssignmentItem | null>(assignments[0] || null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Form State
  const [submissionLink, setSubmissionLink] = useState('');
  const [fileName, setFileName] = useState('');
  const [remarks, setRemarks] = useState('');

  const openSubmitModal = (asg: AssignmentItem) => {
    setSelectedAsg(asg);
    setFileName(`${currentUser.rollNo}_${asg.code}_Work.zip`);
    setIsSubmitModalOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsg) return;

    submitAssignmentWork(selectedAsg.id, {
      fileOrLink: submissionLink.trim() || fileName,
      remarks: remarks.trim(),
    });

    setIsSubmitModalOpen(false);
    setSubmissionLink('');
    setRemarks('');
  };

  const filteredAssignments = assignments.filter((a) => {
    if (filterStatus === 'Active' && a.status === 'Closed') return false;
    if (filterStatus === 'Submitted' && a.status !== 'Submitted') return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase tracking-wider mb-1">
            <ClipboardList className="w-4 h-4" />
            <span>Class Submissions & Evaluations</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Assignments Portal (For Everyone)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Central repository of term problem sets, lab code submissions, deadlines, and grade evaluations.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          {(['All', 'Active', 'Submitted'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterStatus === st
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout: Assignment List on Left, Active Selection on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Assignment Cards (1 col) */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">All Course Tasks</h3>
          {filteredAssignments.map((asg) => {
            const isSelected = selectedAsg?.id === asg.id;
            return (
              <div
                key={asg.id}
                onClick={() => setSelectedAsg(asg)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all shadow-xs ${
                  isSelected
                    ? 'bg-sky-50/50 border-sky-300 ring-2 ring-sky-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded font-mono">
                    {asg.code}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      asg.status === 'Submitted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : asg.status === 'Due Soon'
                        ? 'bg-amber-100 text-amber-800'
                        : asg.status === 'Closed'
                        ? 'bg-slate-100 text-slate-500'
                        : 'bg-sky-100 text-sky-800'
                    }`}
                  >
                    {asg.status}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm leading-snug mb-1">
                  {asg.title}
                </h4>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-rose-600 font-semibold">
                    <Clock className="w-3.5 h-3.5" /> Due {asg.dueDate}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-slate-700">
                    {asg.maxMarks} Marks
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Assignment Details & Submission (2 cols) */}
        <div className="lg:col-span-2">
          {selectedAsg ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1 text-xs">
                    <span className="font-bold text-sky-700">{selectedAsg.subject}</span>
                    <span>·</span>
                    <span className="font-mono text-slate-500">{selectedAsg.code}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 leading-snug">
                    {selectedAsg.title}
                  </h2>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs text-slate-400 block">Total Marks</span>
                  <span className="text-xl font-bold font-mono text-slate-900">
                    {selectedAsg.maxMarks} pts
                  </span>
                </div>
              </div>

              {/* Status & Deadline Banner */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Submission Deadline</span>
                  <span className="font-bold text-rose-600 text-sm">
                    {selectedAsg.dueDate} at {selectedAsg.dueTime}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Submissions Recorded</span>
                  <span className="font-bold text-slate-800 text-sm tabular-nums">
                    {selectedAsg.submissionsCount} of {selectedAsg.totalStudents} students
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Your Status</span>
                  <span
                    className={`font-bold text-sm ${
                      selectedAsg.status === 'Submitted' ? 'text-emerald-700' : 'text-amber-600'
                    }`}
                  >
                    {selectedAsg.status}
                  </span>
                </div>
              </div>

              {/* Problem Description */}
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-2">Problem Statement</h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                  {selectedAsg.description}
                </p>
              </div>

              {/* Submission Instructions */}
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-2">Submission Guidelines</h3>
                <ul className="space-y-2">
                  {selectedAsg.instructions.map((inst, idx) => (
                    <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedAsg.referenceLink && (
                <div className="p-3 bg-sky-50/60 border border-sky-200 rounded-xl text-xs flex items-center justify-between">
                  <span className="text-sky-900 font-medium">Starter Code Repository available</span>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-1 text-sky-700 font-bold hover:underline"
                  >
                    <span>View GitHub Repo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Action: Submit Assignment */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Submissions are reviewed by {currentUser.batch === 'A' ? 'Aarav Sharma' : currentUser.batch === 'B' ? 'Sarthak Dhanokar' : 'Priya Patel'} (CR)
                </span>

                <button
                  onClick={() => openSubmitModal(selectedAsg)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>{selectedAsg.status === 'Submitted' ? 'Resubmit Assignment' : 'Submit Assignment'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-500 text-xs">Select an assignment to view problem requirements.</p>
            </div>
          )}
        </div>
      </div>

      {/* Submit Assignment Modal */}
      {isSubmitModalOpen && selectedAsg && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-sky-600" />
                <h3 className="font-bold text-slate-900 text-base">Submit Course Assignment</h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-800">{selectedAsg.title}</span>
                <p className="text-slate-500 mt-0.5">Due: {selectedAsg.dueDate} ({selectedAsg.dueTime})</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upload Archive File (ZIP / PDF)
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <FileText className="w-7 h-7 text-sky-600 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-slate-700">{fileName}</p>
                  <p className="text-[11px] text-slate-400">Click to change attached archive</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Or GitHub / Google Drive Repository Link
                </label>
                <div className="relative">
                  <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="url"
                    placeholder="https://github.com/username/project-repo"
                    value={submissionLink}
                    onChange={(e) => setSubmissionLink(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Remarks / Execution Notes for Reviewer
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Compiled with gcc -pthread. Run ./simulator to launch."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-medium hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Confirm & Submit Work
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
