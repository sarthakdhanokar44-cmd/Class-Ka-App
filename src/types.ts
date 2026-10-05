export type UserRole = 'student' | 'cr' | 'faculty';
export type BatchType = 'A' | 'B' | 'C';

export interface User {
  id: string;
  name: string;
  rollNo: string;
  batch: BatchType;
  role: UserRole;
  email: string;
  avatar?: string;
}

export interface UpdateItem {
  id: string;
  title: string;
  content: string;
  category: 'urgent' | 'general' | 'cia' | 'academic' | 'event';
  date: string;
  timestamp: number;
  author: string;
  authorRole: string;
  targetBatch: 'All' | BatchType;
  isUrgent: boolean;
  attachments?: string[];
  pinned?: boolean;
  deadline?: string;
}

export interface TestItem {
  id: string;
  title: string;
  code: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  hall: string;
  maxMarks: number;
  type: 'CIA-1' | 'CIA-2' | 'Model Exam' | 'Lab Practical';
  syllabus: string[];
  guidelines: string;
  weightage: string;
  portionsCovered: string;
}

export interface NoteItem {
  id: string;
  title: string;
  subject: string;
  unit: string;
  uploadedBy: string;
  uploaderRoll: string;
  batch: BatchType;
  date: string;
  fileType: string;
  fileSize: string;
  downloads: number;
  upvotes: number;
  hasUpvoted?: boolean;
  tags: string[];
  description: string;
  downloadUrl?: string;
}

export interface AssignmentItem {
  id: string;
  title: string;
  subject: string;
  code: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  dueTime: string;
  maxMarks: number;
  targetBatch: 'All' | BatchType;
  submissionsCount: number;
  totalStudents: number;
  status: 'Active' | 'Due Soon' | 'Submitted' | 'Closed';
  instructions: string[];
  referenceLink?: string;
}

export interface ExperimentItem {
  id: string;
  expNo: number;
  title: string;
  subject: string;
  lab: string;
  batch: 'All' | BatchType;
  dateScheduled: string;
  aim: string;
  theory: string;
  codeTemplate: string;
  sampleInput: string;
  sampleOutput: string;
  vivaQuestions: { q: string; a: string }[];
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Hackathon' | 'Technical' | 'Cultural' | 'Sports' | 'Workshop';
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  deadline: string;
  description: string;
  prizes: string;
  registeredCount: number;
  tags: string[];
  coordinator: string;
}

export interface EventParticipant {
  id: string;
  eventId: string;
  eventTitle: string;
  teamName?: string;
  studentName: string;
  rollNo: string;
  batch: BatchType;
  roleInTeam: string;
  registrationDate: string;
  contact: string;
}

export interface BatchInfo {
  batch: BatchType;
  crName: string;
  crContact: string;
  mentor: string;
  labSlot: string;
  labVenue: string;
  currentExperiment: string;
  vivaSlot: string;
  studentsCount: number;
  announcements: { id: string; text: string; date: string; author: string }[];
}

export interface CRSubmissionTrack {
  id: string;
  rollNo: string;
  studentName: string;
  batch: BatchType;
  assignmentId: string;
  assignmentTitle: string;
  status: 'Submitted' | 'Pending' | 'Late' | 'Verified';
  submittedAt?: string;
  verifiedByCR: boolean;
  score?: number;
}

export interface CopyAnswerItem {
  id: string;
  subject: string;
  testName: string;
  examYear: string;
  questionNo: string;
  questionText: string;
  marks: number;
  answerText: string;
  keyPoints: string[];
  codeSnippet?: string;
  diagramNote?: string;
  verifiedByCR: boolean;
  upvotes: number;
  hasUpvoted?: boolean;
}

export interface LiveTestQuestion {
  qNo: string;
  marks: number;
  text: string;
  optionsOrHints?: string;
}

export interface LiveAnswerPost {
  id: string;
  qNo: string;
  studentAlias: string;
  batch: BatchType;
  answerText: string;
  code?: string;
  votes: number;
  timestamp: string;
  isVerified: boolean;
  hasVoted?: boolean;
}

export interface LiveTestState {
  isActive: boolean;
  subject: string;
  testType: string;
  hall: string;
  totalTimeMinutes: number;
  startTime: number;
  questions: LiveTestQuestion[];
  answers: LiveAnswerPost[];
}
