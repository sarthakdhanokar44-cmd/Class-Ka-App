import React, { useState, useEffect } from 'react';
import { useClassHub } from '../context/ClassContext';
import {
  Radio,
  Clock,
  Send,
  ThumbsUp,
  CheckCircle2,
  EyeOff,
  AlertTriangle,
  Code2,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
  ShieldAlert,
} from 'lucide-react';

export const LiveTestSession: React.FC = () => {
  const {
    liveTest,
    postLiveAnswer,
    voteLiveAnswer,
    toggleLiveTestStatus,
    toggleStealthMode,
    currentUser,
    showToast,
  } = useClassHub();

  const [selectedQNo, setSelectedQNo] = useState<string>(liveTest.questions[0]?.qNo || 'Q1');
  const [answerInput, setAnswerInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [isCodeBoxOpen, setIsCodeBoxOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Remaining timer simulation
  const [secondsRemaining, setSecondsRemaining] = useState(58 * 60 + 24);

  useEffect(() => {
    if (!liveTest.isActive) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [liveTest.isActive]);

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePostAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerInput.trim() && !codeInput.trim()) return;

    postLiveAnswer(selectedQNo, answerInput.trim(), codeInput.trim() || undefined);
    setAnswerInput('');
    setCodeInput('');
    setIsCodeBoxOpen(false);
  };

  const handleCopySnippet = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Answer copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const selectedQuestionObj = liveTest.questions.find((q) => q.qNo === selectedQNo);
  const filteredAnswers = liveTest.answers.filter((a) => a.qNo === selectedQNo);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Live Examination Ribbon */}
      <div
        className={`p-6 rounded-2xl border shadow-xs transition-all ${
          liveTest.isActive
            ? 'bg-rose-950 text-white border-rose-800'
            : 'bg-white text-slate-800 border-slate-200'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {liveTest.isActive ? (
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-600 text-white font-extrabold text-xs tracking-wider uppercase animate-pulse">
                  <Radio className="w-3.5 h-3.5" /> Live Test Session Active
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-md bg-slate-200 text-slate-700 font-semibold text-xs uppercase">
                  Session Paused
                </span>
              )}
              <span className={liveTest.isActive ? 'text-rose-300 text-xs' : 'text-slate-500 text-xs'}>
                {liveTest.hall}
              </span>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight">
              {liveTest.subject} · {liveTest.testType}
            </h1>
            <p className={`text-xs ${liveTest.isActive ? 'text-rose-200/80' : 'text-slate-500'}`}>
              Crowdsourced live answer sharing feed. Students upload solutions and derivations in real-time.
            </p>
          </div>

          {/* Right: Countdown clock & Stealth trigger */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className={`block text-[11px] ${liveTest.isActive ? 'text-rose-300' : 'text-slate-400'}`}>
                Time Remaining in Exam
              </span>
              <span className="font-mono text-2xl font-bold tracking-tight text-white tabular-nums">
                {formatTimer(secondsRemaining)}
              </span>
            </div>

            <button
              onClick={toggleStealthMode}
              title="Discreet Cloak: Instantly switch to academic reference mode if invigilator looks over!"
              className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
            >
              <EyeOff className="w-4 h-4 text-rose-300" />
              <span>Stealth Cloak (Esc)</span>
            </button>

            {(currentUser.role === 'cr' || currentUser.role === 'faculty') && (
              <button
                onClick={toggleLiveTestStatus}
                className="px-3 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-medium cursor-pointer border border-slate-700"
              >
                {liveTest.isActive ? 'Pause Room' : 'Resume Room'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Layout: Question Selector on Top, Content & Submissions Below */}
      <div className="space-y-6">
        {/* Question Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {liveTest.questions.map((q) => {
            const isSelected = selectedQNo === q.qNo;
            const answersForQ = liveTest.answers.filter((a) => a.qNo === q.qNo);
            return (
              <button
                key={q.qNo}
                onClick={() => setSelectedQNo(q.qNo)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{q.qNo}</span>
                <span className="text-[10px] opacity-80">({q.marks} Marks)</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {answersForQ.length} answers
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Question Details Banner */}
        {selectedQuestionObj && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-rose-700 uppercase tracking-wide">
                Live Question · {selectedQuestionObj.qNo} ({selectedQuestionObj.marks} Marks)
              </span>
              <span className="text-xs text-slate-400 font-mono">CIA-2 Question Paper</span>
            </div>
            <h3 className="font-bold text-slate-900 text-base leading-snug">
              {selectedQuestionObj.text}
            </h3>
            {selectedQuestionObj.optionsOrHints && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200/80">
                <strong>Peer Hint / Formula:</strong> {selectedQuestionObj.optionsOrHints}
              </p>
            )}
          </div>
        )}

        {/* 2-Column: Upload Answer Box on Left, Live Answer Feed on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Upload Answer for this question (1 col) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs h-fit space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm pb-2 border-b border-slate-100">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span>Upload Answer for {selectedQNo}</span>
            </div>

            <form onSubmit={handlePostAnswer} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Step-by-Step Derivation / Answer:
                </label>
                <textarea
                  required={!codeInput.trim()}
                  rows={6}
                  placeholder={`Write step-by-step solution, calculation tables, or numerical answers for ${selectedQNo}...`}
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono resize-none leading-relaxed"
                />
              </div>

              {/* Optional Code Snippet toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsCodeBoxOpen(!isCodeBoxOpen)}
                  className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{isCodeBoxOpen ? 'Hide Code Box' : '+ Add Code / Script'}</span>
                </button>

                {isCodeBoxOpen && (
                  <textarea
                    rows={4}
                    placeholder="// Paste C, Python, or SQL code snippet here..."
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    className="w-full mt-2 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono bg-slate-950 text-emerald-300 resize-none"
                  />
                )}
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 space-y-0.5">
                <span className="font-semibold text-slate-800">Posting Identity:</span>
                <p>
                  {currentUser.name} (Batch {currentUser.batch}) · Answers are instantly broadcast to all peers.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Broadcast Answer to Live Test</span>
              </button>
            </form>
          </div>

          {/* Right Column: Live Answers Feed (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>Live Crowdsourced Answers for {selectedQNo}</span>
                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-mono">
                  {filteredAnswers.length} Posts
                </span>
              </h3>
              <span className="text-xs text-slate-400">Upvote verified solutions</span>
            </div>

            {filteredAnswers.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <Radio className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="font-bold text-slate-700 text-sm">No answers uploaded for {selectedQNo} yet</p>
                <p className="text-xs text-slate-500 mt-1">
                  Be the first student to upload a working solution using the form on the left!
                </p>
              </div>
            ) : (
              filteredAnswers.map((ans) => (
                <div
                  key={ans.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-rose-200 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{ans.studentAlias}</span>
                      <span className="text-[11px] text-slate-500 font-mono">· {ans.timestamp}</span>
                      {ans.isVerified && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Solution
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleCopySnippet(ans.id, ans.answerText + (ans.code ? '\n' + ans.code : ''))
                        }
                        className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-100 cursor-pointer"
                      >
                        {copiedId === ans.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Answer Text */}
                  <pre className="bg-slate-50 p-4 rounded-xl font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed border border-slate-200/80 overflow-x-auto max-h-72">
                    {ans.answerText}
                  </pre>

                  {/* Code snippet if attached */}
                  {ans.code && (
                    <div className="mt-2">
                      <span className="text-[11px] font-bold text-slate-600 block mb-1">
                        Code Snippet:
                      </span>
                      <pre className="bg-slate-950 text-emerald-300 p-3 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800">
                        {ans.code}
                      </pre>
                    </div>
                  )}

                  {/* Voting and actions */}
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <button
                      onClick={() => voteLiveAnswer(ans.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                        ans.hasVoted
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="tabular-nums">{ans.votes} Upvoted</span>
                    </button>

                    <span className="text-slate-400 text-[11px]">
                      Press <kbd className="bg-slate-100 px-1 py-0.5 rounded border border-slate-200">Esc</kbd> for Stealth Cloak
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
