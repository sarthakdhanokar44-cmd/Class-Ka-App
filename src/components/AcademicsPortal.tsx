import React, { useState } from 'react';
import { useClassHub } from '../context/ClassContext';
import {
  BookOpen,
  Calendar,
  FileText,
  UploadCloud,
  ThumbsUp,
  Download,
  Users,
  FlaskConical,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  Plus,
  Send,
  X,
  Code2,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { NoteItem } from '../types';

export const AcademicsPortal: React.FC = () => {
  const {
    tests,
    notes,
    uploadNote,
    upvoteNote,
    downloadNote,
    assignments,
    experiments,
    crTrack,
    updateCRStatus,
    toggleCRVerify,
    broadcastCRReminder,
    currentUser,
    setCurrentPortal,
  } = useClassHub();

  const [activeSubTab, setActiveSubTab] = useState<'tests' | 'notes' | 'assignments' | 'cr-portal'>('tests');
  const [crSubTab, setCrSubTab] = useState<'assignments' | 'experiments'>('assignments');
  
  // Notes filter
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [notesSearch, setNotesSearch] = useState<string>('');
  const [isUploadNoteModalOpen, setIsUploadNoteModalOpen] = useState(false);

  // New Note Form
  const [noteTitle, setNoteTitle] = useState('');
  const [noteSubject, setNoteSubject] = useState('Operating Systems');
  const [noteUnit, setNoteUnit] = useState('Unit 3');
  const [noteDescription, setNoteDescription] = useState('');
  const [noteTags, setNoteTags] = useState('');
  const [noteFileSize, setNoteFileSize] = useState('2.8 MB');

  // Expanded experiment accordion
  const [expandedExpId, setExpandedExpId] = useState<string | null>('exp-1');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const subjects = ['All', 'Operating Systems', 'DBMS', 'Computer Networks', 'Compiler Design'];

  const filteredNotes = notes.filter((n) => {
    if (selectedSubject !== 'All' && n.subject !== selectedSubject) return false;
    if (notesSearch.trim()) {
      const q = notesSearch.toLowerCase();
      return (
        n.title.toLowerCase().includes(q) ||
        n.subject.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleUploadNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;

    uploadNote({
      title: noteTitle.trim(),
      subject: noteSubject,
      unit: noteUnit,
      uploadedBy: currentUser.name,
      uploaderRoll: currentUser.rollNo,
      batch: currentUser.batch,
      fileType: 'PDF',
      fileSize: noteFileSize,
      tags: noteTags.split(',').map((t) => t.trim()).filter(Boolean),
      description: noteDescription.trim() || 'Comprehensive revision notes prepared for exams.',
    });

    setNoteTitle('');
    setNoteDescription('');
    setNoteTags('');
    setIsUploadNoteModalOpen(false);
  };

  const copyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  const pendingCRCount = crTrack.filter((c) => c.status === 'Pending').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Academic Curriculum & Examination Portal</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Academics Hub
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tests schedule, student-contributed notes library, assignments, and CR's experiments & submission tracker.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUploadNoteModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Notes (For Everyone)</span>
          </button>
        </div>
      </div>

      {/* Main Sub-Navigation Tabs matching flowchart */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('tests')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
            activeSubTab === 'tests'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Tests & CIA Updates</span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">
            {tests.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('notes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
            activeSubTab === 'notes'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Notes Submission (Everyone)</span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">
            {notes.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('assignments')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
            activeSubTab === 'assignments'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Assignments Overview</span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">
            {assignments.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('cr-portal')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
            activeSubTab === 'cr-portal'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-400" />
          <span>CR's Portal (Ass & Exp)</span>
          {pendingCRCount > 0 && (
            <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-mono font-bold">
              {pendingCRCount} Pending
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: TESTS & CIA UPDATES */}
      {activeSubTab === 'tests' && (
        <div className="space-y-6">
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <h3 className="text-xs font-bold text-emerald-900">
                  Continuous Internal Assessment (CIA) Schedule - Semester VI
                </h3>
                <p className="text-[11px] text-emerald-700">
                  CIA carries 40% weightage toward the final semester grade. Bring university ID cards and blue/black pens.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-300 transition-all space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase">
                        {test.type}
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-semibold">{test.code}</span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">{test.title}</h2>
                  </div>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {test.maxMarks} Marks
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Date & Time:</span>
                    <span className="font-semibold text-slate-800">{test.date} · {test.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Duration:</span>
                    <span className="font-semibold text-slate-800">{test.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Exam Hall:</span>
                    <span className="font-semibold text-indigo-700">{test.hall}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Weightage:</span>
                    <span className="font-semibold text-slate-800">{test.weightage}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wider">
                    Syllabus Modules Covered:
                  </h3>
                  <ul className="space-y-1.5">
                    {test.syllabus.map((s, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <strong className="text-slate-700">Exam Guidelines:</strong> {test.guidelines}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: NOTES SUBMISSION (FOR EVERYONE) */}
      {activeSubTab === 'notes' && (
        <div className="space-y-6">
          {/* Notes Filter and Controls */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Subject Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    selectedSubject === sub
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Search and Upload */}
            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search notes, chapters, topics..."
                  value={notesSearch}
                  onChange={(e) => setNotesSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white"
                />
              </div>

              <button
                onClick={() => setIsUploadNoteModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload</span>
              </button>
            </div>
          </div>

          {/* Notes Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      {note.subject}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{note.fileSize} · {note.fileType}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1.5">
                    {note.title}
                  </h3>

                  <div className="text-[11px] text-slate-500 font-semibold mb-2">
                    {note.unit}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {note.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {note.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[10px]">
                        {note.uploadedBy.charAt(0)}
                      </div>
                      <span className="truncate max-w-[120px] font-medium text-slate-700">
                        {note.uploadedBy}
                      </span>
                    </div>
                    <span>Batch {note.batch}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => upvoteNote(note.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        note.hasUpvoted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="tabular-nums">{note.upvotes} Helpful</span>
                    </button>

                    <button
                      onClick={() => downloadNote(note.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ASSIGNMENTS OVERVIEW */}
      {activeSubTab === 'assignments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-sky-50 border border-sky-200 p-4 rounded-xl">
            <div className="text-xs text-sky-900">
              <strong>General Assignments Overview:</strong> Submissions are tracked and verified by Batch CRs. Head to the full Assignment Portal for direct submission.
            </div>
            <button
              onClick={() => setCurrentPortal('assignments')}
              className="text-xs font-bold text-sky-700 underline cursor-pointer hover:text-sky-900 whitespace-nowrap ml-4"
            >
              Go to Assignment Portal &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assignments.map((asg) => (
              <div
                key={asg.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded uppercase">
                      {asg.code}
                    </span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {asg.maxMarks} Marks
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-2">{asg.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {asg.description}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1 mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Deadline:</span>
                      <span className="font-semibold text-rose-600">{asg.dueDate} ({asg.dueTime})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Submissions:</span>
                      <span className="font-semibold text-slate-800 tabular-nums">
                        {asg.submissionsCount} / {asg.totalStudents} students
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPortal('assignments')}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer text-center"
                >
                  Submit / View Assignment
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CR PORTAL (ASSIGNMENTS & EXPERIMENTS) */}
      {activeSubTab === 'cr-portal' && (
        <div className="space-y-6">
          {/* CR Sub-header switcher */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                <Users className="w-4 h-4" />
                <span>Class Representative (CR) Dashboard</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                CR's Portal: Assignments & Lab Experiments
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Manage batch-wise submission checkoffs, send broadcast reminders to defaulters, and access lab experiment codes & viva solutions.
              </p>
            </div>

            {/* Toggle between CR Assignments & CR Experiments */}
            <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setCrSubTab('assignments')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  crSubTab === 'assignments'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Assignment Tracking Sheet
              </button>
              <button
                onClick={() => setCrSubTab('experiments')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  crSubTab === 'experiments'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Lab Experiments & Viva Q&A
              </button>
            </div>
          </div>

          {/* CR SUB-MODULE 1: ASSIGNMENT TRACKING */}
          {crSubTab === 'assignments' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Assignment 2: CPU Scheduling Simulator — Submission Roster
                  </h3>
                  <p className="text-xs text-slate-500">
                    Verify student submissions, record marks, and broadcast reminders to pending students.
                  </p>
                </div>

                <button
                  onClick={() => broadcastCRReminder('CPU Scheduling Simulator', pendingCRCount)}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Broadcast Reminder to Pending ({pendingCRCount})</span>
                </button>
              </div>

              {/* Submission Status Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                      <th className="py-2.5 px-3">Roll No</th>
                      <th className="py-2.5 px-3">Student Name</th>
                      <th className="py-2.5 px-3">Batch</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Submission Timestamp</th>
                      <th className="py-2.5 px-3">CR Verified</th>
                      <th className="py-2.5 px-3 text-right">Score (/20)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {crTrack.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-800">
                          {row.rollNo}
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">
                          {row.studentName}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                            Batch {row.batch}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <select
                            value={row.status}
                            onChange={(e) => updateCRStatus(row.id, e.target.value as any)}
                            className={`px-2 py-1 rounded-md text-[11px] font-bold border ${
                              row.status === 'Verified'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : row.status === 'Submitted'
                                ? 'bg-sky-50 text-sky-800 border-sky-200'
                                : row.status === 'Late'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-rose-50 text-rose-800 border-rose-200'
                            }`}
                          >
                            <option value="Submitted">Submitted</option>
                            <option value="Verified">Verified</option>
                            <option value="Late">Late</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </td>
                        <td className="py-2.5 px-3 text-slate-500">
                          {row.submittedAt || '—'}
                        </td>
                        <td className="py-2.5 px-3">
                          <button
                            onClick={() => toggleCRVerify(row.id)}
                            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold cursor-pointer transition-colors ${
                              row.verifiedByCR
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{row.verifiedByCR ? 'Verified' : 'Click to Verify'}</span>
                          </button>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <input
                            type="number"
                            min="0"
                            max="20"
                            defaultValue={row.score ?? ''}
                            placeholder="—"
                            onBlur={(e) => {
                              const val = parseInt(e.target.value, 10);
                              if (!isNaN(val)) updateCRStatus(row.id, row.status, val);
                            }}
                            className="w-14 text-right px-2 py-1 border border-slate-200 rounded font-mono font-bold text-slate-900"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CR SUB-MODULE 2: LAB EXPERIMENTS & VIVA Q&A */}
          {crSubTab === 'experiments' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>
                  Official Laboratory Manual for CS608L Operating Systems & System Programming Lab.
                </span>
                <span className="font-semibold text-emerald-700">Experiments 1 through 4 Ready</span>
              </div>

              {experiments.map((exp) => {
                const isExpanded = expandedExpId === exp.id;
                return (
                  <div
                    key={exp.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
                  >
                    <div
                      onClick={() => setExpandedExpId(isExpanded ? null : exp.id)}
                      className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                          E{exp.expNo}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{exp.title}</h4>
                          <span className="text-[11px] text-slate-500">
                            {exp.subject} · Scheduled {exp.dateScheduled}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                          {exp.vivaQuestions.length} Viva Questions
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-500" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-5 animate-in fade-in">
                        {/* Aim & Theory */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                            <h5 className="font-bold text-slate-800 uppercase tracking-wide mb-1 text-[11px]">
                              Aim of Experiment:
                            </h5>
                            <p className="text-slate-600 leading-relaxed">{exp.aim}</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                            <h5 className="font-bold text-slate-800 uppercase tracking-wide mb-1 text-[11px]">
                              Core Theory:
                            </h5>
                            <p className="text-slate-600 leading-relaxed">{exp.theory}</p>
                          </div>
                        </div>

                        {/* Working Code Template with Copy */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                              <Code2 className="w-4 h-4 text-emerald-600" />
                              Executable Source Code (C / Lex):
                            </span>
                            <button
                              onClick={() => copyCode(exp.id, exp.codeTemplate)}
                              className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Sparkles className="w-3 h-3 text-emerald-400" />
                              <span>{copiedCodeId === exp.id ? 'Copied to Clipboard!' : 'Copy Code'}</span>
                            </button>
                          </div>

                          <pre className="bg-slate-950 text-emerald-300 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800 max-h-80 leading-relaxed">
                            {exp.codeTemplate}
                          </pre>
                        </div>

                        {/* Sample Input / Output */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="font-bold text-slate-700 block mb-1">Sample Terminal Input:</span>
                            <pre className="bg-slate-100 p-3 rounded-lg font-mono text-[11px] text-slate-800 whitespace-pre-wrap border border-slate-200">
                              {exp.sampleInput}
                            </pre>
                          </div>
                          <div>
                            <span className="font-bold text-slate-700 block mb-1">Verified Terminal Output:</span>
                            <pre className="bg-slate-100 p-3 rounded-lg font-mono text-[11px] text-slate-800 whitespace-pre-wrap border border-slate-200">
                              {exp.sampleOutput}
                            </pre>
                          </div>
                        </div>

                        {/* Viva Voce Questions & Answers */}
                        <div>
                          <h5 className="font-bold text-slate-900 text-xs mb-3 flex items-center gap-1.5 uppercase tracking-wide">
                            <HelpCircle className="w-4 h-4 text-amber-600" />
                            Common Lab Viva Questions & Answers:
                          </h5>
                          <div className="space-y-2">
                            {exp.vivaQuestions.map((v, i) => (
                              <div
                                key={i}
                                className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-xs space-y-1"
                              >
                                <p className="font-bold text-amber-950">Q: {v.q}</p>
                                <p className="text-slate-700">Ans: {v.a}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Upload Note Modal */}
      {isUploadNoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">Contribute Class Notes</h3>
              </div>
              <button
                onClick={() => setIsUploadNoteModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadNoteSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Note Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Bankers Algorithm & Resource Allocation Graph Solved Numericals"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={noteSubject}
                    onChange={(e) => setNoteSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Operating Systems">Operating Systems</option>
                    <option value="DBMS">DBMS</option>
                    <option value="Computer Networks">Computer Networks</option>
                    <option value="Compiler Design">Compiler Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Unit / Chapter</label>
                  <input
                    type="text"
                    placeholder="e.g., Unit 3: Deadlocks"
                    value={noteUnit}
                    onChange={(e) => setNoteUnit(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention key topics, solved past questions, formula sheet..."
                  value={noteDescription}
                  onChange={(e) => setNoteDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Bankers Algorithm, Deadlock, Formula Sheet"
                  value={noteTags}
                  onChange={(e) => setNoteTags(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Simulated file upload area */}
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <FileText className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-slate-700">Drop PDF file or click to browse</p>
                <p className="text-[11px] text-slate-400">PDF, ZIP, DOCX up to 25 MB</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadNoteModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-medium hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Submit Notes to Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
