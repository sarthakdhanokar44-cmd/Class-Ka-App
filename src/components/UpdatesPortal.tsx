import React, { useState } from 'react';
import { useClassHub } from '../context/ClassContext';
import {
  Bell,
  AlertTriangle,
  Plus,
  Search,
  Pin,
  Trash2,
  FileText,
  Send,
  X,
  Filter,
  Users,
  Calendar,
} from 'lucide-react';
import { BatchType } from '../types';

export const UpdatesPortal: React.FC = () => {
  const { updates, addUpdate, deleteUpdate, currentUser, selectedBatchFilter, setSelectedBatchFilter } =
    useClassHub();

  const [activeTab, setActiveTab] = useState<'all' | 'urgent' | 'general' | 'cia'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // New Update Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'general' | 'urgent' | 'cia' | 'event'>('general');
  const [newTargetBatch, setNewTargetBatch] = useState<'All' | BatchType>('All');
  const [newDeadline, setNewDeadline] = useState('');
  const [isUrgentCheckbox, setIsUrgentCheckbox] = useState(false);
  const [attachmentName, setAttachmentName] = useState('');

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    addUpdate({
      title: newTitle.trim(),
      content: newContent.trim(),
      category: isUrgentCheckbox ? 'urgent' : newCategory,
      date: 'Today, Just now',
      deadline: newDeadline.trim() || undefined,
      author: `${currentUser.name} (${currentUser.role.toUpperCase()})`,
      authorRole: currentUser.role === 'cr' ? 'Class Representative (CR)' : currentUser.role === 'faculty' ? 'Faculty' : 'Student',
      targetBatch: newTargetBatch,
      isUrgent: isUrgentCheckbox || newCategory === 'urgent',
      pinned: isUrgentCheckbox,
      attachments: attachmentName ? [attachmentName] : undefined,
    });

    // Reset & close
    setNewTitle('');
    setNewContent('');
    setNewCategory('general');
    setNewDeadline('');
    setIsUrgentCheckbox(false);
    setAttachmentName('');
    setIsPostModalOpen(false);
  };

  const filteredUpdates = updates.filter((item) => {
    // Category filter
    if (activeTab === 'urgent' && !item.isUrgent) return false;
    if (activeTab === 'general' && (item.isUrgent || item.category === 'cia')) return false;
    if (activeTab === 'cia' && item.category !== 'cia') return false;

    // Batch filter
    if (selectedBatchFilter !== 'All') {
      if (item.targetBatch !== 'All' && item.targetBatch !== selectedBatchFilter) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchContent = item.content.toLowerCase().includes(q);
      const matchAuthor = item.author.toLowerCase().includes(q);
      if (!matchTitle && !matchContent && !matchAuthor) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4" />
            <span>Class Communication Feed</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Updates & Notices Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            General department updates, urgent timetable changes, exam notifications, and CR circulars.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Update</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            All Updates ({updates.length})
          </button>

          <button
            onClick={() => setActiveTab('urgent')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'urgent'
                ? 'bg-rose-600 text-white'
                : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Urgent Notices ({updates.filter((u) => u.isUrgent).length})
          </button>

          <button
            onClick={() => setActiveTab('general')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'general'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            General Updates
          </button>

          <button
            onClick={() => setActiveTab('cia')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'cia'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            CIA Updates
          </button>
        </div>

        {/* Batch and Search */}
        <div className="flex items-center gap-3">
          {/* Target Batch Filter */}
          <div className="flex items-center gap-1 text-xs border border-slate-200 rounded-lg p-1 bg-slate-50">
            <span className="text-[11px] text-slate-500 font-medium px-1.5">Batch:</span>
            {(['All', 'A', 'B', 'C'] as const).map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBatchFilter(b)}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  selectedBatchFilter === b ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search circulars, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Updates Stream */}
      <div className="space-y-4">
        {filteredUpdates.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <Bell className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No updates match your filter</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try switching your active batch selector or clear your search query to see other class announcements.
            </p>
          </div>
        ) : (
          filteredUpdates.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition-all shadow-xs ${
                item.isUrgent
                  ? 'bg-rose-50/40 border-rose-200 ring-1 ring-rose-300/40'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.isUrgent ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-200/80 px-2 py-0.5 rounded uppercase tracking-wider">
                      <AlertTriangle className="w-3.5 h-3.5" /> Urgent Notice
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                      {item.category}
                    </span>
                  )}

                  <span className="text-xs text-slate-500">
                    Target: <strong className="text-slate-700">{item.targetBatch === 'All' ? 'All Batches (A, B, C)' : `Batch ${item.targetBatch}`}</strong>
                  </span>

                  {item.pinned && (
                    <span className="flex items-center gap-1 text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                      <Pin className="w-3 h-3 text-amber-600" /> Pinned
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="font-mono">{item.date}</span>
                  {(currentUser.role === 'cr' || currentUser.role === 'faculty') && (
                    <button
                      onClick={() => deleteUpdate(item.id)}
                      title="Delete Update"
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <h2 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{item.title}</h2>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line mb-3">
                {item.content}
              </p>

              {/* Deadline / Action Target Date */}
              {item.deadline && (
                <div className="mb-4 flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1 rounded-lg w-fit">
                  <Calendar className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>
                    <strong className="text-rose-950">Action Deadline:</strong> {item.deadline}
                  </span>
                </div>
              )}

              {/* Attachments if any */}
              {item.attachments && item.attachments.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {item.attachments.map((file, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700 hover:bg-slate-200 cursor-pointer transition-colors"
                    >
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <span className="font-mono text-xs">{file}</span>
                      <span className="text-[11px] text-indigo-600 font-semibold underline">
                        Download
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">{item.author}</span>
                    <span className="text-slate-400 ml-1.5">({item.authorRole})</span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400">Department of Computer Science</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Post Update Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">Broadcast Class Update</h3>
              </div>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Update Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., CIA-2 Time Table Revised for Friday"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Announcement Body *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detail the update, room numbers, instructions, or deadlines..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="general">General Update</option>
                    <option value="urgent">Urgent Notice</option>
                    <option value="cia">CIA / Test Notice</option>
                    <option value="event">Event Notice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Batch</label>
                  <select
                    value={newTargetBatch}
                    onChange={(e) => setNewTargetBatch(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="All">All Batches (A, B, C)</option>
                    <option value="A">Batch A Only</option>
                    <option value="B">Batch B Only</option>
                    <option value="C">Batch C Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Action Deadline / Target Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Oct 03, 2026 · 10:00 AM"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Attachment Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Seating_Arrangement_Oct2026.pdf"
                    value={attachmentName}
                    onChange={(e) => setAttachmentName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl">
                <input
                  type="checkbox"
                  id="urgentCheck"
                  checked={isUrgentCheckbox}
                  onChange={(e) => setIsUrgentCheckbox(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500 h-4 w-4"
                />
                <label htmlFor="urgentCheck" className="text-xs text-rose-900 font-semibold cursor-pointer">
                  Mark as High Urgency (Will broadcast top emergency alert banner to everyone)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-medium hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Notice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
