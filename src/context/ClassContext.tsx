import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  BatchType,
  UpdateItem,
  TestItem,
  NoteItem,
  AssignmentItem,
  ExperimentItem,
  EventItem,
  EventParticipant,
  BatchInfo,
  CRSubmissionTrack,
  CopyAnswerItem,
  LiveTestState,
  LiveAnswerPost,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_UPDATES,
  INITIAL_TESTS,
  INITIAL_NOTES,
  INITIAL_ASSIGNMENTS,
  INITIAL_EXPERIMENTS,
  INITIAL_EVENTS,
  INITIAL_PARTICIPANTS,
  INITIAL_BATCHES,
  INITIAL_CR_TRACK,
  INITIAL_COPY_ANSWERS,
  INITIAL_LIVE_TEST,
} from '../data/initialData';

export type NavPortal =
  | 'dashboard'
  | 'updates'
  | 'academics'
  | 'events'
  | 'batch'
  | 'assignments'
  | 'copy-portal'
  | 'live-test';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'urgent';
}

interface ClassContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  availableUsers: User[];
  currentPortal: NavPortal;
  setCurrentPortal: (portal: NavPortal) => void;
  selectedBatchFilter: 'All' | BatchType;
  setSelectedBatchFilter: (b: 'All' | BatchType) => void;
  
  // Updates
  updates: UpdateItem[];
  addUpdate: (newUpdate: Omit<UpdateItem, 'id' | 'timestamp'>) => void;
  deleteUpdate: (id: string) => void;
  
  // Academics
  tests: TestItem[];
  notes: NoteItem[];
  uploadNote: (note: Omit<NoteItem, 'id' | 'downloads' | 'upvotes' | 'date'>) => void;
  upvoteNote: (noteId: string) => void;
  downloadNote: (noteId: string) => void;
  
  // Assignments
  assignments: AssignmentItem[];
  submitAssignmentWork: (assignmentId: string, submissionDetails: { fileOrLink: string; remarks: string }) => void;
  
  // Experiments & CR
  experiments: ExperimentItem[];
  crTrack: CRSubmissionTrack[];
  updateCRStatus: (id: string, status: CRSubmissionTrack['status'], score?: number) => void;
  toggleCRVerify: (id: string) => void;
  broadcastCRReminder: (assignmentTitle: string, pendingCount: number) => void;
  
  // Events
  events: EventItem[];
  participants: EventParticipant[];
  registerParticipant: (data: Omit<EventParticipant, 'id' | 'registrationDate'>) => void;
  
  // Batches
  batches: Record<BatchType, BatchInfo>;
  addBatchAnnouncement: (batch: BatchType, text: string) => void;
  
  // Copy Portal & Live Test
  copyAnswers: CopyAnswerItem[];
  addCopyAnswer: (item: Omit<CopyAnswerItem, 'id' | 'upvotes'>) => void;
  upvoteCopyAnswer: (id: string) => void;
  
  liveTest: LiveTestState;
  postLiveAnswer: (qNo: string, text: string, code?: string) => void;
  voteLiveAnswer: (id: string) => void;
  toggleLiveTestStatus: () => void;
  
  // Stealth Panic Mode
  isStealthMode: boolean;
  toggleStealthMode: () => void;
  
  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'urgent') => void;
  removeToast: (id: string) => void;
  
  // Reset Data
  resetToDefaultData: () => void;
}

const ClassContext = createContext<ClassContextType | undefined>(undefined);

export const ClassProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('classhub_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0];
  });

  const [currentPortal, setCurrentPortal] = useState<NavPortal>('dashboard');
  const [selectedBatchFilter, setSelectedBatchFilter] = useState<'All' | BatchType>('All');
  const [isStealthMode, setIsStealthMode] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persistent States with LocalStorage
  const [updates, setUpdates] = useState<UpdateItem[]>(() => {
    const saved = localStorage.getItem('classhub_updates');
    return saved ? JSON.parse(saved) : INITIAL_UPDATES;
  });

  const [tests] = useState<TestItem[]>(() => {
    const saved = localStorage.getItem('classhub_tests');
    return saved ? JSON.parse(saved) : INITIAL_TESTS;
  });

  const [notes, setNotes] = useState<NoteItem[]>(() => {
    const saved = localStorage.getItem('classhub_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [assignments, setAssignments] = useState<AssignmentItem[]>(() => {
    const saved = localStorage.getItem('classhub_assignments');
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  const [experiments] = useState<ExperimentItem[]>(() => {
    const saved = localStorage.getItem('classhub_experiments');
    return saved ? JSON.parse(saved) : INITIAL_EXPERIMENTS;
  });

  const [crTrack, setCRTrack] = useState<CRSubmissionTrack[]>(() => {
    const saved = localStorage.getItem('classhub_cr_track');
    return saved ? JSON.parse(saved) : INITIAL_CR_TRACK;
  });

  const [events] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('classhub_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [participants, setParticipants] = useState<EventParticipant[]>(() => {
    const saved = localStorage.getItem('classhub_participants');
    return saved ? JSON.parse(saved) : INITIAL_PARTICIPANTS;
  });

  const [batches, setBatches] = useState<Record<BatchType, BatchInfo>>(() => {
    const saved = localStorage.getItem('classhub_batches');
    return saved ? JSON.parse(saved) : INITIAL_BATCHES;
  });

  const [copyAnswers, setCopyAnswers] = useState<CopyAnswerItem[]>(() => {
    const saved = localStorage.getItem('classhub_copy_answers');
    return saved ? JSON.parse(saved) : INITIAL_COPY_ANSWERS;
  });

  const [liveTest, setLiveTest] = useState<LiveTestState>(() => {
    const saved = localStorage.getItem('classhub_live_test');
    return saved ? JSON.parse(saved) : INITIAL_LIVE_TEST;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('classhub_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('classhub_updates', JSON.stringify(updates));
  }, [updates]);

  useEffect(() => {
    localStorage.setItem('classhub_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('classhub_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('classhub_cr_track', JSON.stringify(crTrack));
  }, [crTrack]);

  useEffect(() => {
    localStorage.setItem('classhub_participants', JSON.stringify(participants));
  }, [participants]);

  useEffect(() => {
    localStorage.setItem('classhub_batches', JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem('classhub_copy_answers', JSON.stringify(copyAnswers));
  }, [copyAnswers]);

  useEffect(() => {
    localStorage.setItem('classhub_live_test', JSON.stringify(liveTest));
  }, [liveTest]);

  // Stealth Hotkey Listener (Escape key triggers quick cloak)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsStealthMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'urgent' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleStealthMode = () => {
    setIsStealthMode((prev) => !prev);
  };

  // Actions
  const addUpdate = (newUpdate: Omit<UpdateItem, 'id' | 'timestamp'>) => {
    const item: UpdateItem = {
      ...newUpdate,
      id: 'up-' + Date.now(),
      timestamp: Date.now(),
    };
    setUpdates((prev) => [item, ...prev]);
    showToast(
      item.isUrgent ? 'Urgent notice posted to class stream!' : 'Class update published successfully!',
      item.isUrgent ? 'urgent' : 'success'
    );
  };

  const deleteUpdate = (id: string) => {
    setUpdates((prev) => prev.filter((u) => u.id !== id));
    showToast('Update removed', 'info');
  };

  const uploadNote = (noteData: Omit<NoteItem, 'id' | 'downloads' | 'upvotes' | 'date'>) => {
    const newNote: NoteItem = {
      ...noteData,
      id: 'note-' + Date.now(),
      date: 'Just now',
      downloads: 0,
      upvotes: 1,
      hasUpvoted: true,
    };
    setNotes((prev) => [newNote, ...prev]);
    showToast(`Note "${newNote.title}" uploaded to library!`, 'success');
  };

  const upvoteNote = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === noteId) {
          const hasVoted = n.hasUpvoted;
          return {
            ...n,
            upvotes: hasVoted ? n.upvotes - 1 : n.upvotes + 1,
            hasUpvoted: !hasVoted,
          };
        }
        return n;
      })
    );
  };

  const downloadNote = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, downloads: n.downloads + 1 } : n))
    );
    showToast('Document downloaded to device', 'info');
  };

  const submitAssignmentWork = (assignmentId: string, { fileOrLink }: { fileOrLink: string; remarks: string }) => {
    setAssignments((prev) =>
      prev.map((asg) =>
        asg.id === assignmentId
          ? {
              ...asg,
              submissionsCount: asg.submissionsCount + 1,
              status: 'Submitted',
            }
          : asg
      )
    );

    // Also update CR tracking list
    const existingIndex = crTrack.findIndex(
      (c) => c.assignmentId === assignmentId && c.rollNo === currentUser.rollNo
    );
    if (existingIndex >= 0) {
      setCRTrack((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, status: 'Submitted', submittedAt: 'Today, Just now' }
            : item
        )
      );
    } else {
      const newTrack: CRSubmissionTrack = {
        id: 'cr-' + Date.now(),
        rollNo: currentUser.rollNo,
        studentName: currentUser.name,
        batch: currentUser.batch,
        assignmentId,
        assignmentTitle: assignments.find((a) => a.id === assignmentId)?.title || 'Assignment',
        status: 'Submitted',
        submittedAt: 'Today, Just now',
        verifiedByCR: false,
      };
      setCRTrack((prev) => [newTrack, ...prev]);
    }

    showToast(`Assignment submission recorded! File: ${fileOrLink || 'Attached'}`, 'success');
  };

  const updateCRStatus = (id: string, status: CRSubmissionTrack['status'], score?: number) => {
    setCRTrack((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status, score: score !== undefined ? score : item.score } : item
      )
    );
    showToast(`Student status updated to ${status}`, 'info');
  };

  const toggleCRVerify = (id: string) => {
    setCRTrack((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, verifiedByCR: !item.verifiedByCR } : item
      )
    );
    showToast('CR verification status updated', 'success');
  };

  const broadcastCRReminder = (assignmentTitle: string, pendingCount: number) => {
    showToast(
      `Reminder broadcast sent to ${pendingCount} pending students for "${assignmentTitle}"!`,
      'urgent'
    );
  };

  const registerParticipant = (data: Omit<EventParticipant, 'id' | 'registrationDate'>) => {
    const newParticipant: EventParticipant = {
      ...data,
      id: 'part-' + Date.now(),
      registrationDate: 'Just now',
    };
    setParticipants((prev) => [newParticipant, ...prev]);
    showToast(`Successfully registered ${data.studentName} for ${data.eventTitle}!`, 'success');
  };

  const addBatchAnnouncement = (batch: BatchType, text: string) => {
    setBatches((prev) => ({
      ...prev,
      [batch]: {
        ...prev[batch],
        announcements: [
          {
            id: 'ann-' + Date.now(),
            text,
            date: 'Today, Just now',
            author: currentUser.name + (currentUser.role === 'cr' ? ' (CR)' : ''),
          },
          ...prev[batch].announcements,
        ],
      },
    }));
    showToast(`Announcement broadcast to Batch ${batch}`, 'success');
  };

  const addCopyAnswer = (item: Omit<CopyAnswerItem, 'id' | 'upvotes'>) => {
    const newItem: CopyAnswerItem = {
      ...item,
      id: 'copy-' + Date.now(),
      upvotes: 1,
      hasUpvoted: true,
    };
    setCopyAnswers((prev) => [newItem, ...prev]);
    showToast(`Solved answer for ${item.questionNo} saved to Answer Bank!`, 'success');
  };

  const upvoteCopyAnswer = (id: string) => {
    setCopyAnswers((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const hasVoted = a.hasUpvoted;
          return {
            ...a,
            upvotes: hasVoted ? a.upvotes - 1 : a.upvotes + 1,
            hasUpvoted: !hasVoted,
          };
        }
        return a;
      })
    );
  };

  const postLiveAnswer = (qNo: string, text: string, code?: string) => {
    const newAnswer: LiveAnswerPost = {
      id: 'live-ans-' + Date.now(),
      qNo,
      studentAlias: `${currentUser.name} (Batch ${currentUser.batch})`,
      batch: currentUser.batch,
      answerText: text,
      code,
      votes: 1,
      timestamp: 'Just now',
      isVerified: currentUser.role === 'cr' || currentUser.role === 'faculty',
      hasVoted: true,
    };

    setLiveTest((prev) => ({
      ...prev,
      answers: [newAnswer, ...prev.answers],
    }));

    showToast(`Answer posted for ${qNo} to Live Session!`, 'success');
  };

  const voteLiveAnswer = (id: string) => {
    setLiveTest((prev) => ({
      ...prev,
      answers: prev.answers.map((ans) => {
        if (ans.id === id) {
          const hasVoted = ans.hasVoted;
          return {
            ...ans,
            votes: hasVoted ? ans.votes - 1 : ans.votes + 1,
            hasVoted: !hasVoted,
          };
        }
        return ans;
      }),
    }));
  };

  const toggleLiveTestStatus = () => {
    setLiveTest((prev) => ({ ...prev, isActive: !prev.isActive }));
    showToast(liveTest.isActive ? 'Live test ended' : 'Live test room activated', 'info');
  };

  const resetToDefaultData = () => {
    localStorage.clear();
    setUpdates(INITIAL_UPDATES);
    setNotes(INITIAL_NOTES);
    setAssignments(INITIAL_ASSIGNMENTS);
    setCRTrack(INITIAL_CR_TRACK);
    setParticipants(INITIAL_PARTICIPANTS);
    setBatches(INITIAL_BATCHES);
    setCopyAnswers(INITIAL_COPY_ANSWERS);
    setLiveTest(INITIAL_LIVE_TEST);
    setCurrentUser(INITIAL_USERS[0]);
    showToast('Class data reset to university semester defaults', 'info');
  };

  return (
    <ClassContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        availableUsers: INITIAL_USERS,
        currentPortal,
        setCurrentPortal,
        selectedBatchFilter,
        setSelectedBatchFilter,
        updates,
        addUpdate,
        deleteUpdate,
        tests,
        notes,
        uploadNote,
        upvoteNote,
        downloadNote,
        assignments,
        submitAssignmentWork,
        experiments,
        crTrack,
        updateCRStatus,
        toggleCRVerify,
        broadcastCRReminder,
        events,
        participants,
        registerParticipant,
        batches,
        addBatchAnnouncement,
        copyAnswers,
        addCopyAnswer,
        upvoteCopyAnswer,
        liveTest,
        postLiveAnswer,
        voteLiveAnswer,
        toggleLiveTestStatus,
        isStealthMode,
        toggleStealthMode,
        toasts,
        showToast,
        removeToast,
        resetToDefaultData,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export const useClassHub = () => {
  const context = useContext(ClassContext);
  if (!context) {
    throw new Error('useClassHub must be used within a ClassProvider');
  }
  return context;
};
