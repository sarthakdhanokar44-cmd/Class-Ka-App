import React, { useState } from 'react';
import { useClassHub } from '../context/ClassContext';
import {
  Sparkles,
  Copy,
  Check,
  Search,
  ThumbsUp,
  Plus,
  BookOpen,
  CheckCircle2,
  X,
  Code2,
  FileCheck,
} from 'lucide-react';
import { CopyAnswerItem } from '../types';

export const CopyPortal: React.FC = () => {
  const { copyAnswers, addCopyAnswer, upvoteCopyAnswer, showToast } = useClassHub();

  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Answer Form
  const [newSubject, setNewSubject] = useState('Operating Systems');
  const [newTestName, setNewTestName] = useState('CIA-2 Examination');
  const [newExamYear, setNewExamYear] = useState('2025-2026');
  const [newQuestionNo, setNewQuestionNo] = useState('');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newMarks, setNewMarks] = useState<number>(8);
  const [newAnswerText, setNewAnswerText] = useState('');
  const [newKeyPoints, setNewKeyPoints] = useState('');

  const subjects = ['All', 'Operating Systems', 'DBMS', 'Computer Networks'];

  const handleCopyAnswer = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Full formatted test answer copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionNo.trim() || !newAnswerText.trim()) return;

    addCopyAnswer({
      subject: newSubject,
      testName: newTestName,
      examYear: newExamYear,
      questionNo: newQuestionNo.trim(),
      questionText: newQuestionText.trim() || 'Exam Question',
      marks: newMarks,
      answerText: newAnswerText.trim(),
      keyPoints: newKeyPoints
        .split('\n')
        .map((p) => p.trim())
        .filter(Boolean),
      verifiedByCR: true,
    });

    setIsAddModalOpen(false);
    setNewQuestionNo('');
    setNewQuestionText('');
    setNewAnswerText('');
    setNewKeyPoints('');
  };

  const filteredAnswers = copyAnswers.filter((item) => {
    if (selectedSubject !== 'All' && item.subject !== selectedSubject) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.questionNo.toLowerCase().includes(q) ||
        item.questionText.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q) ||
        item.answerText.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Solved Exam Repository</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Copy Portal (Test Answers Bank)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Archive of verified CIA & semester exam answers with step-by-step mathematical proofs, working code, and instant one-click copy buttons.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Solved Answer</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
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

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Q1, Banker's, Lossless join, LRU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white"
          />
        </div>
      </div>

      {/* Answers List */}
      <div className="space-y-6">
        {filteredAnswers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-base">No solved solutions match your search</h3>
            <p className="text-xs text-slate-500 mt-1">Try searching for other subjects or question terms.</p>
          </div>
        ) : (
          filteredAnswers.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-teal-300 transition-all space-y-4"
            >
              {/* Question Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono font-bold text-xs text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded">
                    {item.questionNo}
                  </span>
                  <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {item.subject}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {item.testName} · {item.examYear}
                  </span>
                  {item.verifiedByCR && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3.5 h-3.5" /> CR Verified Solution
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-700 font-mono bg-slate-100 px-2.5 py-1 rounded">
                    {item.marks} Marks
                  </span>

                  <button
                    onClick={() => handleCopyAnswer(item.id, item.answerText)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Answer</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {item.questionText}
                </h3>
              </div>

              {/* Key scoring points */}
              {item.keyPoints && item.keyPoints.length > 0 && (
                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 text-xs space-y-1">
                  <span className="font-bold text-amber-900 uppercase tracking-wide text-[10px] block">
                    Key Scoring Formula / Grading Rubric:
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.keyPoints.map((kp, idx) => (
                      <span
                        key={idx}
                        className="bg-white/90 text-amber-950 px-2 py-0.5 rounded border border-amber-200 text-[11px] font-medium"
                      >
                        ✓ {kp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Formatted Full Answer */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>Solved Examination Script:</span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    Formatted for answer booklet
                  </span>
                </div>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed border border-slate-800 max-h-96 overflow-y-auto">
                  {item.answerText}
                </pre>
              </div>

              {/* Footer: Upvotes & stats */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <button
                  onClick={() => upvoteCopyAnswer(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    item.hasUpvoted
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="tabular-nums">{item.upvotes} Students found this accurate</span>
                </button>

                <button
                  onClick={() => handleCopyAnswer(item.id, item.answerText)}
                  className="text-teal-700 hover:underline font-semibold cursor-pointer"
                >
                  Quick Copy to Clipboard
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Solved Answer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-slate-900 text-base">Contribute Solved Test Answer</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    <option value="Operating Systems">Operating Systems</option>
                    <option value="DBMS">DBMS</option>
                    <option value="Computer Networks">Computer Networks</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Question Identifier *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Q1 (b) or Q3"
                    value={newQuestionNo}
                    onChange={(e) => setNewQuestionNo(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Question Problem Statement *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Explain Banker's Algorithm with safe state data structures..."
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Exam / Test Name
                  </label>
                  <input
                    type="text"
                    value={newTestName}
                    onChange={(e) => setNewTestName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Marks Allocation
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newMarks}
                    onChange={(e) => setNewMarks(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Step-by-Step Solved Answer *
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Write clear mathematical steps, matrices, formulas, C/C++ code, and explanations..."
                  value={newAnswerText}
                  onChange={(e) => setNewAnswerText(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Key Scoring Rubrics (one per line)
                </label>
                <textarea
                  rows={2}
                  placeholder="Define Available & Need matrices&#10;State safe sequence formula&#10;Resource request roll-back"
                  value={newKeyPoints}
                  onChange={(e) => setNewKeyPoints(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-medium hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Save Answer to Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
