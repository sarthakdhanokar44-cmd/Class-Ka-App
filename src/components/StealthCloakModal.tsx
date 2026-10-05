import React from 'react';
import { useClassHub } from '../context/ClassContext';
import { Eye, ExternalLink, Search, Globe, Bookmark } from 'lucide-react';

export const StealthCloakModal: React.FC = () => {
  const { isStealthMode, toggleStealthMode } = useClassHub();

  if (!isStealthMode) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white text-slate-800 overflow-y-auto font-serif">
      {/* Fake Academic / Wikipedia style toolbar */}
      <div className="border-b border-slate-300 bg-slate-50 px-6 py-2.5 flex items-center justify-between text-xs font-sans">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
            <Globe className="w-4 h-4 text-slate-700" />
            <span>Encyclopedia Academicus</span>
          </div>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600">Department of Computer Science & Engineering</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
            <input
              type="text"
              readOnly
              value="Kernel scheduling & process management"
              className="pl-8 pr-3 py-1 text-xs border border-slate-300 rounded bg-white text-slate-700 w-64"
            />
          </div>

          <button
            onClick={toggleStealthMode}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Resume ClassHub</span>
            <kbd className="text-[10px] bg-slate-800 px-1 py-0.5 rounded ml-1">Esc</kbd>
          </button>
        </div>
      </div>

      {/* Realistic Academic Paper Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="border-b border-slate-200 pb-4 mb-6">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-sans mb-1">
            Reference Document · CS602 Operating Systems
          </p>
          <h1 className="text-3xl font-serif font-bold text-slate-900 leading-snug">
            Operating System Kernel Architectures: Process Scheduling, Concurrency & Semaphore Primitives
          </h1>
          <div className="flex items-center gap-3 text-xs text-slate-500 font-sans mt-3">
            <span>Authored: IEEE Computer Society Academic Library</span>
            <span>·</span>
            <span>Document ID: REF-OS-2026-B4</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Bookmark className="w-3 h-3 text-emerald-600" /> Verified Lecture Note
            </span>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-base leading-relaxed space-y-5">
          <p className="text-slate-700">
            In modern multitasking operating systems, the <strong>kernel</strong> serves as the core interface between physical hardware devices and user-space processes. A fundamental responsibility of the operating system is the allocation of computational units across conflicting threads while preserving mutual exclusion, memory protection, and fair scheduling bandwidth.
          </p>

          <h2 className="text-xl font-bold font-sans text-slate-900 mt-6 border-b border-slate-200 pb-2">
            1. The Banker's Algorithm and Safe State Traversal
          </h2>
          <p>
            Developed by Edsger Dijkstra, the Banker's algorithm represents a resource allocation and deadlock avoidance metric that inspects the feasibility of granting requested vectors without entering an unsafe state.
          </p>
          <div className="bg-slate-50 border-l-4 border-slate-400 p-4 my-4 font-mono text-xs rounded-r">
            <p className="font-bold text-slate-800 mb-2">// Invariant safety vector definition:</p>
            <p>Need[i][j] = Max[i][j] - Allocation[i][j]</p>
            <p>Work = Available;</p>
            <p>while (∃ i such that Finish[i] == false && Need[i] &lt;= Work) &#123;</p>
            <p className="pl-4">Work = Work + Allocation[i];</p>
            <p className="pl-4">Finish[i] = true;</p>
            <p>&#125;</p>
          </div>

          <h2 className="text-xl font-bold font-sans text-slate-900 mt-6 border-b border-slate-200 pb-2">
            2. Memory Paging and Temporal Locality
          </h2>
          <p>
            Virtual memory architectures partition physical address spaces into fixed-size frames, typically 4 Kilobytes in contemporary architectures. Paging systems utilize Translation Lookaside Buffers (TLB) to minimize associative lookup overhead. Under high memory contention, replacement algorithms such as Least Recently Used (LRU) approximate optimal stack algorithms without suffering from Belady's Anomaly.
          </p>

          <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-lg text-xs font-sans text-amber-900">
            <strong>Professor's Remark:</strong> Review the difference between Belady's anomaly in FIFO versus stack-based replacement in LRU for the forthcoming examination session.
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-500 font-sans flex items-center justify-between">
          <p>This lecture viewport is displayed in read-only educational reference mode.</p>
          <button
            onClick={toggleStealthMode}
            className="text-indigo-600 hover:underline flex items-center gap-1 font-medium cursor-pointer"
          >
            <span>Exit Reference Mode (Press Esc)</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
