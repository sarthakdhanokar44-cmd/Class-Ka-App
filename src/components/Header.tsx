import React, { useState } from 'react';
import { useClassHub, NavPortal } from '../context/ClassContext';
import {
  Bell,
  EyeOff,
  UserCheck,
  ChevronDown,
  Sparkles,
  Radio,
  BookOpen,
  Calendar,
  Layers,
  GraduationCap,
  ClipboardList,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentUser,
    setCurrentUser,
    availableUsers,
    currentPortal,
    setCurrentPortal,
    selectedBatchFilter,
    setSelectedBatchFilter,
    updates,
    liveTest,
    toggleStealthMode,
    resetToDefaultData,
  } = useClassHub();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isUrgentOpen, setIsUrgentOpen] = useState(false);

  const urgentUpdates = updates.filter((u) => u.isUrgent);

  const navLinks: { portal: NavPortal; label: string; icon: React.ReactNode; color?: string }[] = [
    { portal: 'dashboard', label: 'Dashboard', icon: <GraduationCap className="w-4 h-4" /> },
    {
      portal: 'updates',
      label: 'Updates',
      icon: <Bell className="w-4 h-4" />,
      color: urgentUpdates.length > 0 ? 'text-rose-600' : undefined,
    },
    { portal: 'academics', label: 'Academics', icon: <BookOpen className="w-4 h-4" /> },
    { portal: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
    { portal: 'batch', label: 'Batch Portals', icon: <Layers className="w-4 h-4" /> },
    { portal: 'assignments', label: 'Assignments', icon: <ClipboardList className="w-4 h-4" /> },
    { portal: 'copy-portal', label: 'Copy Portal', icon: <Sparkles className="w-4 h-4" /> },
    {
      portal: 'live-test',
      label: 'Live Test',
      icon: <Radio className="w-4 h-4 animate-pulse text-rose-500" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {/* Top emergency announcement ticker if urgent notices exist */}
      {urgentUpdates.length > 0 && (
        <div className="bg-rose-600 text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-5xl mx-auto w-full truncate">
            <span className="flex items-center gap-1 font-semibold uppercase tracking-wider text-[11px] bg-rose-700/80 px-2 py-0.5 rounded">
              <AlertTriangle className="w-3.5 h-3.5" /> Urgent Notice
            </span>
            <span className="truncate">{urgentUpdates[0].title}</span>
            <button
              onClick={() => {
                setCurrentPortal('updates');
              }}
              className="underline hover:text-rose-100 whitespace-nowrap text-xs font-semibold ml-2 cursor-pointer"
            >
              View Notice &rarr;
            </button>
          </div>
          <span className="text-[11px] text-rose-200 hidden sm:inline tabular-nums">
            {urgentUpdates.length} Active Notice{urgentUpdates.length > 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Zone 1: Single Brand Title */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentPortal('dashboard')}
              className="text-left group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-extrabold text-base shadow-sm group-hover:bg-indigo-700 transition-colors">
                CH
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900 tracking-tight block leading-tight">
                  ClassHub
                </span>
                <span className="text-[11px] text-slate-500 font-medium block">
                  CSE Department · 2026
                </span>
              </div>
            </button>

            {/* Quick Batch Filter Switcher */}
            <div className="hidden lg:flex items-center bg-slate-100 p-0.5 rounded-lg ml-3 border border-slate-200 text-xs">
              <span className="px-2 text-slate-500 font-medium text-[11px]">Batch:</span>
              {(['All', 'A', 'B', 'C'] as const).map((batch) => (
                <button
                  key={batch}
                  onClick={() => setSelectedBatchFilter(batch)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    selectedBatchFilter === batch
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {batch === 'All' ? 'All' : `Batch ${batch}`}
                </button>
              ))}
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 overflow-x-auto py-1 scrollbar-none">
            {navLinks.map((item) => {
              const isActive = currentPortal === item.portal;
              return (
                <button
                  key={item.portal}
                  onClick={() => setCurrentPortal(item.portal)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span className={item.color && !isActive ? item.color : undefined}>
                    {item.label}
                  </span>
                  {item.portal === 'live-test' && liveTest.isActive && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block ml-0.5" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Profile Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Panic / Stealth Cloak Button */}
            <button
              onClick={toggleStealthMode}
              title="Stealth Mode (Quickly disguise screen if faculty approaches! Or press Esc key)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 text-xs font-medium shadow-xs transition-colors cursor-pointer"
            >
              <EyeOff className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden xl:inline">Stealth Cloak</span>
              <kbd className="hidden lg:inline text-[10px] bg-slate-100 px-1 py-0.5 rounded text-slate-500 border border-slate-200">
                Esc
              </kbd>
            </button>

            {/* Notifications quick dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUrgentOpen(!isUrgentOpen)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 cursor-pointer"
                title="Notifications & Urgent Notices"
              >
                <Bell className="w-4 h-4" />
                {urgentUpdates.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                    {urgentUpdates.length}
                  </span>
                )}
              </button>

              {isUrgentOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <span className="text-xs font-bold text-slate-800">Class Notices & Alerts</span>
                    <button
                      onClick={() => {
                        setIsUrgentOpen(false);
                        setCurrentPortal('updates');
                      }}
                      className="text-[11px] text-indigo-600 hover:underline cursor-pointer"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {updates.slice(0, 4).map((u) => (
                      <div
                        key={u.id}
                        onClick={() => {
                          setIsUrgentOpen(false);
                          setCurrentPortal('updates');
                        }}
                        className={`p-2 rounded-lg cursor-pointer text-xs transition-colors ${
                          u.isUrgent
                            ? 'bg-rose-50 hover:bg-rose-100 border border-rose-100'
                            : 'bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className={u.isUrgent ? 'font-semibold text-rose-700' : 'font-medium'}>
                            {u.isUrgent ? 'URGENT' : u.category.toUpperCase()}
                          </span>
                          <span>{u.date}</span>
                        </div>
                        <p className="font-semibold text-slate-800 line-clamp-1">{u.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Student Login / Profile Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs text-slate-800 font-medium transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="font-bold leading-tight truncate max-w-[110px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <span>Batch {currentUser.batch}</span>
                    <span>·</span>
                    <span className="uppercase font-semibold text-indigo-600">
                      {currentUser.role}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900">Switch Student / Role Profile</p>
                    <p className="text-[11px] text-slate-500">
                      Experience portal as Student, CR, or Faculty
                    </p>
                  </div>

                  <div className="space-y-1">
                    {availableUsers.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => {
                          setCurrentUser(user);
                          setIsUserMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                          user.id === currentUser.id
                            ? 'bg-indigo-50 text-indigo-900 font-semibold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-xs font-semibold">{user.name}</div>
                            <div className="text-[11px] text-slate-500">
                              {user.rollNo} · Batch {user.batch}
                            </div>
                          </div>
                        </div>
                        {user.id === currentUser.id ? (
                          <UserCheck className="w-4 h-4 text-indigo-600" />
                        ) : (
                          <span className="text-[10px] uppercase font-bold text-slate-400 px-1.5 py-0.5 rounded bg-slate-100">
                            {user.role}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between px-2">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        resetToDefaultData();
                      }}
                      className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer py-1"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset Demo Data
                    </button>
                    <span className="text-[10px] text-slate-400">CSE Dept 2026</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-100 scrollbar-none">
          {navLinks.map((item) => {
            const isActive = currentPortal === item.portal;
            return (
              <button
                key={item.portal}
                onClick={() => setCurrentPortal(item.portal)}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
