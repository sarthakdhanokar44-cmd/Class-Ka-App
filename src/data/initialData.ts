import {
  User,
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
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-sarthak',
    name: 'Sarthak Dhanokar',
    rollNo: '22CS044',
    batch: 'B',
    role: 'student',
    email: 'sarthakdhanokar44@gmail.com',
  },
  {
    id: 'user-aarav',
    name: 'Aarav Sharma',
    rollNo: '22CS012',
    batch: 'A',
    role: 'cr',
    email: 'aarav.cr.a@college.edu',
  },
  {
    id: 'user-priya',
    name: 'Priya Patel',
    rollNo: '22CS089',
    batch: 'C',
    role: 'cr',
    email: 'priya.cr.c@college.edu',
  },
  {
    id: 'user-faculty',
    name: 'Prof. K. Venkatesh',
    rollNo: 'FAC-804',
    batch: 'B',
    role: 'faculty',
    email: 'k.venkatesh@college.edu',
  },
];

export const INITIAL_UPDATES: UpdateItem[] = [
  {
    id: 'up-1',
    title: 'CRITICAL: CIA-2 Operating Systems Rescheduled to Friday 10:00 AM',
    content:
      'Due to the university accreditation audit on Thursday, the Continuous Internal Assessment (CIA-2) for Operating Systems & Concurrency (CS602) has been rescheduled to Friday, Oct 3, 2026 at 10:00 AM in Exam Halls 304 & 305. Seating chart attached.',
    category: 'urgent',
    date: 'Today at 09:15 AM',
    deadline: 'Oct 03, 2026 · 10:00 AM',
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    author: 'Prof. K. Venkatesh (HOD/Exam Cell)',
    authorRole: 'Faculty',
    targetBatch: 'All',
    isUrgent: true,
    pinned: true,
    attachments: ['CIA2_Seating_Arrangement_Oct2026.pdf'],
  },
  {
    id: 'up-2',
    title: 'Urgent: Hardcopy Lab Record Submission Deadline Tomorrow 4 PM',
    content:
      'All batches (A, B, C) must submit their completed Database Management Systems (DBMS) lab records with faculty sign-off by 4:00 PM tomorrow. No grace period will be permitted as internal marks submission portal closes.',
    category: 'urgent',
    date: 'Today at 08:30 AM',
    deadline: 'Tomorrow, Oct 01, 2026 · 04:00 PM (Strict)',
    timestamp: Date.now() - 1000 * 60 * 60 * 4,
    author: 'Aarav Sharma',
    authorRole: 'Class Representative (CR)',
    targetBatch: 'All',
    isUrgent: true,
    pinned: true,
  },
  {
    id: 'up-3',
    title: 'Batch B: Turing Lab-3 Microprocessor practical slot swapped',
    content:
      'Batch B students please note: Your Wednesday afternoon practical session from 2:00 PM to 4:00 PM will now be held in Hardware Lab-2 instead of Turing Lab-3 due to maintenance work.',
    category: 'general',
    date: 'Yesterday at 04:45 PM',
    deadline: 'Wednesday, Oct 01, 2026 · 02:00 PM',
    timestamp: Date.now() - 1000 * 60 * 60 * 20,
    author: 'Dr. Neha Sen',
    authorRole: 'Lab In-Charge',
    targetBatch: 'B',
    isUrgent: false,
  },
  {
    id: 'up-4',
    title: 'Class Announcement: Guest Lecture on Cloud Native Architectures',
    content:
      'Distinguished alumnus from Google Cloud will be delivering an interactive session on Kubernetes & Microservices this Saturday at 11:30 AM in the Main Seminar Auditorium. Attendance is mandatory for 3rd year CSE.',
    category: 'general',
    date: 'Yesterday at 11:00 AM',
    deadline: 'Saturday, Oct 04, 2026 · 11:30 AM',
    timestamp: Date.now() - 1000 * 60 * 60 * 28,
    author: 'Aarav Sharma',
    authorRole: 'Class Representative (CR)',
    targetBatch: 'All',
    isUrgent: false,
    attachments: ['Guest_Lecture_Flyer_K8s.pdf'],
  },
  {
    id: 'up-5',
    title: 'CIA-1 Marks Revaluation and Grievance Window Open',
    content:
      'Students who wish to apply for re-verification of CIA-1 answer scripts in Computer Networks (CS604) may submit the verification form at the department office before Friday 3:00 PM with the CR.',
    category: 'cia',
    date: '2 days ago',
    deadline: 'Friday, Oct 03, 2026 · 03:00 PM',
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    author: 'Priya Patel',
    authorRole: 'Class Representative (CR)',
    targetBatch: 'All',
    isUrgent: false,
  },
  {
    id: 'up-6',
    title: 'Annual TechFest "CodeStorm 2026" Registrations are Live!',
    content:
      'Check the Events portal to register your teams for 24-hr Hackathon, Web Speed Run, and Reverse Coding. Early bird registrations close this weekend with cash prizes worth ₹1,50,000.',
    category: 'event',
    date: '3 days ago',
    deadline: 'Oct 12, 2026 · 11:59 PM',
    timestamp: Date.now() - 1000 * 60 * 60 * 72,
    author: 'Student Council CSE',
    authorRole: 'Event Lead',
    targetBatch: 'All',
    isUrgent: false,
  },
];

export const INITIAL_TESTS: TestItem[] = [
  {
    id: 'test-1',
    title: 'Operating Systems & Concurrency (CIA-2)',
    code: 'CS602',
    subject: 'Operating Systems',
    date: 'Oct 03, 2026',
    time: '10:00 AM - 11:30 AM',
    duration: '90 Minutes',
    hall: 'Hall 304 (Batch A & B), Hall 305 (Batch C)',
    maxMarks: 50,
    type: 'CIA-2',
    syllabus: [
      'Unit 3: Deadlock Characterization, Prevention, Avoidance (Banker\'s Algorithm), and Detection & Recovery',
      'Unit 4: Memory Management, Paging, Page Replacement Algorithms (FIFO, LRU, Optimal), Segmentation',
      'Unit 5: Virtual Memory, Thrashing & Working Set Model',
    ],
    guidelines: 'Scientific calculators allowed. Blue/Black ink only. Late entries beyond 15 minutes will be barred.',
    weightage: '20% of Total Internal Assessment Marks',
    portionsCovered: 'Modules 3, 4 and early Module 5',
  },
  {
    id: 'test-2',
    title: 'Database Management Systems (CIA-2)',
    code: 'CS603',
    subject: 'DBMS',
    date: 'Oct 07, 2026',
    time: '02:00 PM - 03:30 PM',
    duration: '90 Minutes',
    hall: 'Central Examination Block - Floor 2',
    maxMarks: 50,
    type: 'CIA-2',
    syllabus: [
      'Unit 3: Normalization (1NF, 2NF, 3NF, BCNF, 4NF) & Lossless Join Decompositions',
      'Unit 4: Transaction Management, ACID properties, Serializability (Conflict & View)',
      'Unit 5: Concurrency Control Protocols (2PL, Timestamp Ordering, Lock-based protocols)',
    ],
    guidelines: 'ER diagram questions require neat pencil sketches. SQL syntax must follow ANSI standard.',
    weightage: '20% of Total Internal Assessment Marks',
    portionsCovered: 'Modules 3 and 4 completely',
  },
  {
    id: 'test-3',
    title: 'Computer Networks (CIA-1 Re-Test & Improvement)',
    code: 'CS604',
    subject: 'Computer Networks',
    date: 'Oct 11, 2026',
    time: '11:00 AM - 12:30 PM',
    duration: '90 Minutes',
    hall: 'Hall 201',
    maxMarks: 50,
    type: 'CIA-1',
    syllabus: [
      'Unit 1: OSI vs TCP/IP Architecture, Physical Layer Transmission media',
      'Unit 2: Data Link Layer, Error detection (CRC, Hamming code), Sliding Window Protocols (Go-Back-N, Selective Repeat)',
    ],
    guidelines: 'Only for students with prior medical permission or improvement applications signed by HOD.',
    weightage: 'Best of 2 Internal tests counted',
    portionsCovered: 'Modules 1 and 2',
  },
  {
    id: 'test-4',
    title: 'System Software & Compiler Lab Practical Exam',
    code: 'CS608L',
    subject: 'Lab Practicals',
    date: 'Oct 16, 2026',
    time: 'Batch A: 09:00 AM | Batch B: 01:00 PM | Batch C: 03:30 PM',
    duration: '3 Hours',
    hall: 'Turing Computer Labs 1 & 2',
    maxMarks: 100,
    type: 'Lab Practical',
    syllabus: [
      'LEX & YACC specification programs',
      'Design of One-Pass & Two-Pass Assemblers',
      'Intermediate code generation for Three-Address Code (TAC)',
      'Code optimization techniques (Constant folding, dead code elimination)',
    ],
    guidelines: 'Verified record book mandatory for entry. Viva voce carries 30 marks out of 100.',
    weightage: 'Final Lab Grade (4 Credits)',
    portionsCovered: 'Experiments 1 through 10',
  },
];

export const INITIAL_NOTES: NoteItem[] = [
  {
    id: 'note-1',
    title: 'Handwritten OS Deadlock & Banker\'s Algorithm Solved Examples',
    subject: 'Operating Systems',
    unit: 'Unit 3: Deadlocks',
    uploadedBy: 'Sarthak Dhanokar',
    uploaderRoll: '22CS044',
    batch: 'B',
    date: 'Sep 28, 2026',
    fileType: 'PDF',
    fileSize: '4.8 MB',
    downloads: 142,
    upvotes: 68,
    tags: ['Bankers Algorithm', 'Resource Allocation Graph', 'Solved Numericals', 'High Scoring'],
    description: 'Crisp handwritten notes containing 8 past CIA numericals on Banker\'s safety algorithm and resource-request algorithm step-by-step.',
  },
  {
    id: 'note-2',
    title: 'Complete Normalization & Dependency Preservation Cheat Sheet',
    subject: 'DBMS',
    unit: 'Unit 3: Relational Design',
    uploadedBy: 'Priya Patel',
    uploaderRoll: '22CS089',
    batch: 'C',
    date: 'Sep 25, 2026',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    downloads: 198,
    upvotes: 94,
    tags: ['1NF to BCNF', 'Canonical Cover', 'Lossless Join Proofs', 'Exam Favorite'],
    description: 'Summary table comparing 1NF, 2NF, 3NF, BCNF with functional dependencies and easy shortcuts to find candidate keys in under 60 seconds.',
  },
  {
    id: 'note-3',
    title: 'Sliding Window Protocols Visual Breakdown (Stop-and-Wait, GBN, SR)',
    subject: 'Computer Networks',
    unit: 'Unit 2: Data Link Layer',
    uploadedBy: 'Aarav Sharma',
    uploaderRoll: '22CS012',
    batch: 'A',
    date: 'Sep 22, 2026',
    fileType: 'PDF',
    fileSize: '3.1 MB',
    downloads: 115,
    upvotes: 52,
    tags: ['Go-Back-N', 'Selective Repeat', 'Efficiency Formula', 'Timing Diagrams'],
    description: 'Colored timing sequence diagrams showing sender/receiver buffer windows, sequence numbers, timeout ACK/NAK scenarios and bandwidth-delay numericals.',
  },
  {
    id: 'note-4',
    title: 'YACC Syntax Directed Translation & Calculator Implementation Notes',
    subject: 'Compiler Design',
    unit: 'Unit 2: Parsing',
    uploadedBy: 'Tanvi Verma',
    uploaderRoll: '22CS061',
    batch: 'A',
    date: 'Sep 18, 2026',
    fileType: 'ZIP',
    fileSize: '1.2 MB',
    downloads: 87,
    upvotes: 41,
    tags: ['YACC', 'LEX', 'Ambiguous Grammar', 'Lab Help'],
    description: 'Clean documented .l and .y source codes with grammar conflict explanations (shift-reduce, reduce-reduce) and test cases.',
  },
  {
    id: 'note-5',
    title: 'Page Replacement Algorithms (FIFO, LRU, Optimal) Hit/Miss Table Matrix',
    subject: 'Operating Systems',
    unit: 'Unit 4: Memory Management',
    uploadedBy: 'Rohan Mehra',
    uploaderRoll: '22CS034',
    batch: 'B',
    date: 'Sep 15, 2026',
    fileType: 'PDF',
    fileSize: '1.9 MB',
    downloads: 160,
    upvotes: 83,
    tags: ['Page Faults', 'LRU Stack', 'Belady Anomaly', 'Formula Sheet'],
    description: 'Formula sheet and reference comparison matrix of 3, 4 and 5 page frame problems with Belady\'s Anomaly demonstration.',
  },
];

export const INITIAL_ASSIGNMENTS: AssignmentItem[] = [
  {
    id: 'asg-1',
    title: 'Assignment 2: CPU Scheduling Simulator & Gantt Chart Generator',
    subject: 'Operating Systems',
    code: 'CS602',
    description:
      'Implement in C/C++ or Python a simulation comparing FCFS, SJF (Preemptive & Non-preemptive), Priority Scheduling, and Round Robin (Time Quantum = 2ms). Calculate Average Waiting Time and Turnaround Time.',
    assignedDate: 'Sep 24, 2026',
    dueDate: 'Oct 05, 2026',
    dueTime: '11:59 PM',
    maxMarks: 20,
    targetBatch: 'All',
    submissionsCount: 48,
    totalStudents: 72,
    status: 'Due Soon',
    instructions: [
      'Include source code with proper comments and README execution guide.',
      'Provide output screenshots for 3 test process datasets with at least 5 processes each.',
      'Submit zip archive named as RollNo_OS_Assignment2.zip or GitHub repository URL.',
    ],
    referenceLink: 'https://github.com/examples/cpu-scheduling',
  },
  {
    id: 'asg-2',
    title: 'Assignment 3: E-Commerce Schema Design & Complex SQL Query Suite',
    subject: 'DBMS',
    code: 'CS603',
    description:
      'Design a normalized 3NF database schema for an online marketplace with tables for Customers, Orders, Products, Categories, and Reviews. Write 10 nested SQL queries with JOINs, Aggregates, and Window Functions.',
    assignedDate: 'Sep 26, 2026',
    dueDate: 'Oct 09, 2026',
    dueTime: '05:00 PM',
    maxMarks: 25,
    targetBatch: 'All',
    submissionsCount: 31,
    totalStudents: 72,
    status: 'Active',
    instructions: [
      'Draw neat ER diagram with Cardinalities (Crow\'s Foot notation).',
      'Provide DDL SQL script with primary and foreign key constraints.',
      'Include EXPLAIN query execution plan outputs for the 2 most complex queries.',
    ],
  },
  {
    id: 'asg-3',
    title: 'Assignment 1: Socket Programming Multi-Client Chat Server in Python',
    subject: 'Computer Networks',
    code: 'CS604',
    description:
      'Develop a concurrent TCP multi-client chat room application using threading and socket module. Support broadcast messages and private direct messages (@username message).',
    assignedDate: 'Sep 10, 2026',
    dueDate: 'Sep 26, 2026',
    dueTime: '11:59 PM',
    maxMarks: 20,
    targetBatch: 'All',
    submissionsCount: 68,
    totalStudents: 72,
    status: 'Closed',
    instructions: [
      'Graceful socket disconnection and error handling required.',
      'Submission portal closed. Check marks in the grade sheet.',
    ],
  },
];

export const INITIAL_EXPERIMENTS: ExperimentItem[] = [
  {
    id: 'exp-1',
    expNo: 1,
    title: 'Simulation of Process Scheduling Algorithms (FCFS & SJF)',
    subject: 'Operating Systems Lab',
    lab: 'OS & System Lab',
    batch: 'All',
    dateScheduled: 'Week 1-2',
    aim: 'To write a C program that simulates First Come First Served (FCFS) and Shortest Job First (SJF) CPU scheduling algorithms and calculates Average Waiting Time (AWT) and Average Turnaround Time (ATAT).',
    theory:
      'CPU scheduling is the process of deciding which process in the ready queue gets the CPU allocation. In FCFS, jobs are executed on a first-come basis. In SJF, the job with minimum CPU burst time is prioritized.',
    codeTemplate: `#include <stdio.h>

struct Process {
    int pid;
    int burstTime;
    int waitingTime;
    int turnaroundTime;
};

void calculateFCFS(struct Process p[], int n) {
    p[0].waitingTime = 0;
    for(int i = 1; i < n; i++) {
        p[i].waitingTime = p[i-1].waitingTime + p[i-1].burstTime;
    }
    for(int i = 0; i < n; i++) {
        p[i].turnaroundTime = p[i].waitingTime + p[i].burstTime;
    }
}

int main() {
    int n = 3;
    struct Process p[] = {{1, 10, 0, 0}, {2, 5, 0, 0}, {3, 8, 0, 0}};
    calculateFCFS(p, n);
    printf("PID\\tBurst\\tWait\\tTAT\\n");
    for(int i=0; i<n; i++)
        printf("%d\\t%d\\t%d\\t%d\\n", p[i].pid, p[i].burstTime, p[i].waitingTime, p[i].turnaroundTime);
    return 0;
}`,
    sampleInput: 'Enter number of processes: 3\nBurst times: P1=10, P2=5, P3=8',
    sampleOutput: 'Average Waiting Time = 8.33 ms\nAverage Turnaround Time = 16.00 ms',
    vivaQuestions: [
      {
        q: 'What is Convoy Effect in FCFS scheduling?',
        a: 'The Convoy Effect occurs when several IO-bound processes wait for one long CPU-bound process to release the CPU, leading to poor CPU and device utilization.',
      },
      {
        q: 'Why is SJF considered optimal?',
        a: 'SJF gives the minimum average waiting time for a given set of processes, but it cannot be implemented at the short-term CPU level because future CPU burst length cannot be known in advance.',
      },
    ],
  },
  {
    id: 'exp-2',
    expNo: 2,
    title: 'Banker\'s Algorithm for Deadlock Avoidance',
    subject: 'Operating Systems Lab',
    lab: 'OS & System Lab',
    batch: 'All',
    dateScheduled: 'Week 3-4',
    aim: 'To implement the Banker\'s Algorithm for Deadlock Avoidance in C to test if a given system state is safe or unsafe.',
    theory:
      'Banker\'s algorithm tests for safety by simulating the allocation of predetermined maximum possible amounts of all resources, and then makes an \'s-state\' check to test for possible activities, before deciding whether allocation should be allowed.',
    codeTemplate: `#include <stdio.h>
#include <stdbool.h>

#define P 5
#define R 3

bool isSafe(int processes[], int avail[], int max[][R], int allot[][R]) {
    int need[P][R];
    for (int i = 0; i < P; i++)
        for (int j = 0; j < R; j++)
            need[i][j] = max[i][j] - allot[i][j];

    bool finish[P] = {0};
    int safeSeq[P];
    int work[R];
    for (int i = 0; i < R; i++) work[i] = avail[i];

    int count = 0;
    while (count < P) {
        bool found = false;
        for (int p = 0; p < P; p++) {
            if (!finish[p]) {
                int j;
                for (j = 0; j < R; j++)
                    if (need[p][j] > work[j]) break;
                if (j == R) {
                    for (int k = 0; k < R; k++) work[k] += allot[p][k];
                    safeSeq[count++] = p;
                    finish[p] = true;
                    found = true;
                }
            }
        }
        if (!found) return false;
    }
    printf("Safe sequence: ");
    for (int i = 0; i < P; i++) printf("P%d ", safeSeq[i]);
    printf("\\n");
    return true;
}`,
    sampleInput: 'Processes: 5, Resources: 3 (A:10, B:5, C:7)\nAllocated: P0(0,1,0), P1(2,0,0), P2(3,0,2), P3(2,1,1), P4(0,0,2)',
    sampleOutput: 'System is in a SAFE state.\nSafe Sequence: P1 -> P3 -> P4 -> P0 -> P2',
    vivaQuestions: [
      {
        q: 'What are the 4 Coffman conditions necessary for deadlock to happen?',
        a: '1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait.',
      },
      {
        q: 'What is the formula for the Need matrix?',
        a: 'Need[i][j] = Max[i][j] - Allocation[i][j].',
      },
    ],
  },
  {
    id: 'exp-3',
    expNo: 3,
    title: 'Page Replacement Algorithms (FIFO, LRU, Optimal)',
    subject: 'Operating Systems Lab',
    lab: 'OS & System Lab',
    batch: 'All',
    dateScheduled: 'Week 5-6',
    aim: 'To simulate and compare page fault rates for FIFO and Least Recently Used (LRU) page replacement algorithms for a given reference string.',
    theory:
      'Page replacement occurs when a page fault happens and there are no free page frames. LRU replaces the page that has not been referenced for the longest period of time.',
    codeTemplate: `#include <stdio.h>

int findLRU(int time[], int n) {
    int min = time[0], pos = 0;
    for (int i = 1; i < n; ++i) {
        if (time[i] < min) {
            min = time[i];
            pos = i;
        }
    }
    return pos;
}`,
    sampleInput: 'Reference String: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2\nFrames: 3',
    sampleOutput: 'LRU Total Page Faults: 12\nFIFO Total Page Faults: 15',
    vivaQuestions: [
      {
        q: 'What is Belady\'s Anomaly?',
        a: 'Belady\'s Anomaly is the phenomenon in which increasing the number of page frames results in an increase in the number of page faults for certain memory access patterns (observed in FIFO, not in LRU).',
      },
    ],
  },
  {
    id: 'exp-4',
    expNo: 4,
    title: 'Lexical Analyzer Implementation using LEX / FLEX',
    subject: 'Compiler Lab',
    lab: 'System Software Lab',
    batch: 'All',
    dateScheduled: 'Week 7-8',
    aim: 'To design a lexical analyzer using LEX tool to identify tokens like identifiers, constants, keywords, and operators in a C source code file.',
    theory:
      'A lexical analyzer reads the stream of characters representing the source program and groups them into meaningful sequences called lexemes and outputs tokens for the parser.',
    codeTemplate: `%{
#include <stdio.h>
%}

%%
"int"|"float"|"char"|"if"|"else"|"while"   { printf("<KEYWORD, %s>\\n", yytext); }
[a-zA-Z_][a-zA-Z0-9_]*                   { printf("<IDENTIFIER, %s>\\n", yytext); }
[0-9]+                                   { printf("<NUMBER, %s>\\n", yytext); }
"="|"+"|"-"|"*"|"/"                      { printf("<OPERATOR, %s>\\n", yytext); }
";"|","|"{"|"}"                          { printf("<SEPARATOR, %s>\\n", yytext); }
[ \\t\\n]+                                /* ignore whitespace */
%%

int main() {
    yylex();
    return 0;
}
int yywrap() { return 1; }`,
    sampleInput: 'int total = count + 42;',
    sampleOutput: '<KEYWORD, int>\n<IDENTIFIER, total>\n<OPERATOR, =>\n<IDENTIFIER, count>\n<OPERATOR, +>\n<NUMBER, 42>\n<SEPARATOR, ;>',
    vivaQuestions: [
      {
        q: 'What is the role of yywrap() in LEX?',
        a: 'yywrap() is called by the lexer when it reaches end of file. Returning 1 indicates no more input files remain; returning 0 instructs it to continue reading another file.',
      },
    ],
  },
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'CodeStorm 2026: 24-Hour Inter-College Hackathon',
    category: 'Hackathon',
    date: 'Oct 17 - 18, 2026',
    time: '09:00 AM (24 Hours)',
    venue: 'Innovation & Incubation Center - 4th Floor',
    teamSize: '2 to 4 Members',
    deadline: 'Oct 12, 2026',
    description:
      'Build real-world solutions across AI/ML, Web3, FinTech, and Smart Campus systems. Free food, midnight coffee, industry mentors, and direct internship opportunities at sponsor startups.',
    prizes: '₹75,000 First Prize · ₹40,000 Runner Up · ₹20,000 Best UI/UX',
    registeredCount: 38,
    tags: ['Hackathon', 'Web Dev', 'AI/ML', 'Cash Prizes'],
    coordinator: 'Student Council & Tech Club',
  },
  {
    id: 'evt-2',
    title: 'Zenith TechFest: Algorithmic Speed Coding & Bug Bounty',
    category: 'Technical',
    date: 'Oct 23, 2026',
    time: '10:30 AM - 01:30 PM',
    venue: 'Lab Complex - Hall B',
    teamSize: 'Solo or Duo',
    deadline: 'Oct 20, 2026',
    description:
      'High-octane coding contest with rounds on Data Structures, Dynamic Programming, and blind-folded code tracing. Live leaderboard powered by Codeforces.',
    prizes: '₹25,000 Cash + Mechanical Keyboards + Pro Badges',
    registeredCount: 24,
    tags: ['Competitive Programming', 'Algorithms', 'Solo'],
    coordinator: 'Coding Club CSE',
  },
  {
    id: 'evt-3',
    title: 'Pulse 2026: Annual Cultural Night & Battle of Bands',
    category: 'Cultural',
    date: 'Nov 02, 2026',
    time: '05:30 PM - 10:00 PM',
    venue: 'Open Air Amphitheatre',
    teamSize: 'Teams / Solo',
    deadline: 'Oct 25, 2026',
    description:
      'The biggest cultural showcase of the semester! Group dance, acoustic jam, stage play, and DJ night. Audition slots are filling fast.',
    prizes: 'Trophies + Certificates + DJ Night Pass',
    registeredCount: 52,
    tags: ['Dance', 'Music', 'Stage', 'Celebration'],
    coordinator: 'Cultural Committee',
  },
  {
    id: 'evt-4',
    title: 'Inter-Department Cricket & Football Tournament',
    category: 'Sports',
    date: 'Nov 08 - 10, 2026',
    time: '08:00 AM Daily',
    venue: 'University Sports Ground',
    teamSize: '11 + 4 Substitutes',
    deadline: 'Nov 01, 2026',
    description:
      'CSE department team selection trials for the Inter-departmental trophy. Bring your own studs and cricket gear.',
    prizes: 'Department Rolling Championship Shield',
    registeredCount: 42,
    tags: ['Cricket', 'Football', 'Athletics'],
    coordinator: 'Sports Secretary',
  },
];

export const INITIAL_PARTICIPANTS: EventParticipant[] = [
  {
    id: 'part-1',
    eventId: 'evt-1',
    eventTitle: 'CodeStorm 2026: 24-Hour Inter-College Hackathon',
    teamName: 'ByteBusters',
    studentName: 'Sarthak Dhanokar',
    rollNo: '22CS044',
    batch: 'B',
    roleInTeam: 'Frontend & System Lead',
    registrationDate: 'Sep 29, 2026',
    contact: 'sarthakdhanokar44@gmail.com',
  },
  {
    id: 'part-2',
    eventId: 'evt-1',
    eventTitle: 'CodeStorm 2026: 24-Hour Inter-College Hackathon',
    teamName: 'ByteBusters',
    studentName: 'Rohan Mehra',
    rollNo: '22CS034',
    batch: 'B',
    roleInTeam: 'Backend & Database Dev',
    registrationDate: 'Sep 29, 2026',
    contact: 'rohan.m@college.edu',
  },
  {
    id: 'part-3',
    eventId: 'evt-1',
    eventTitle: 'CodeStorm 2026: 24-Hour Inter-College Hackathon',
    teamName: 'NeuralKnights',
    studentName: 'Aarav Sharma',
    rollNo: '22CS012',
    batch: 'A',
    roleInTeam: 'AI / Model Specialist',
    registrationDate: 'Sep 28, 2026',
    contact: 'aarav.cr.a@college.edu',
  },
  {
    id: 'part-4',
    eventId: 'evt-1',
    eventTitle: 'CodeStorm 2026: 24-Hour Inter-College Hackathon',
    teamName: 'NeuralKnights',
    studentName: 'Kunal Joshi',
    rollNo: '22CS019',
    batch: 'A',
    roleInTeam: 'Pitch & Full Stack',
    registrationDate: 'Sep 28, 2026',
    contact: 'kunal.j@college.edu',
  },
  {
    id: 'part-5',
    eventId: 'evt-2',
    eventTitle: 'Zenith TechFest: Algorithmic Speed Coding & Bug Bounty',
    teamName: 'Solo Participant',
    studentName: 'Priya Patel',
    rollNo: '22CS089',
    batch: 'C',
    roleInTeam: 'Solo Competitor',
    registrationDate: 'Sep 30, 2026',
    contact: 'priya.cr.c@college.edu',
  },
  {
    id: 'part-6',
    eventId: 'evt-3',
    eventTitle: 'Pulse 2026: Annual Cultural Night & Battle of Bands',
    teamName: 'The Frequency Band',
    studentName: 'Aditya Nair',
    rollNo: '22CS068',
    batch: 'C',
    roleInTeam: 'Lead Guitarist',
    registrationDate: 'Sep 27, 2026',
    contact: 'aditya.n@college.edu',
  },
  {
    id: 'part-7',
    eventId: 'evt-4',
    eventTitle: 'Inter-Department Cricket & Football Tournament',
    teamName: 'CSE Strikers XI',
    studentName: 'Sarthak Dhanokar',
    rollNo: '22CS044',
    batch: 'B',
    roleInTeam: 'All-Rounder',
    registrationDate: 'Sep 29, 2026',
    contact: 'sarthakdhanokar44@gmail.com',
  },
];

export const INITIAL_BATCHES: Record<'A' | 'B' | 'C', BatchInfo> = {
  A: {
    batch: 'A',
    crName: 'Aarav Sharma (Roll 22CS012)',
    crContact: '+91 98231 44521',
    mentor: 'Dr. Radhika Iyer (Associate Professor)',
    labSlot: 'Monday & Wednesday 10:00 AM - 12:00 PM',
    labVenue: 'Turing Computer Lab 1',
    currentExperiment: 'Experiment 4: Lexical Analyzer using LEX Tool',
    vivaSlot: 'Monday 11:30 AM',
    studentsCount: 24,
    announcements: [
      {
        id: 'ba-1',
        text: 'Batch A students: Please submit Exp 3 observations sheet today before 5 PM to Aarav.',
        date: 'Today',
        author: 'Aarav Sharma (CR)',
      },
      {
        id: 'ba-2',
        text: 'Project team mentor allocation for Batch A is finalized. Check notice board list.',
        date: '2 days ago',
        author: 'Dr. Radhika Iyer',
      },
    ],
  },
  B: {
    batch: 'B',
    crName: 'Sarthak Dhanokar (Acting Lead / Roll 22CS044)',
    crContact: '+91 97654 32180',
    mentor: 'Prof. K. Venkatesh (HOD)',
    labSlot: 'Tuesday & Thursday 02:00 PM - 04:00 PM',
    labVenue: 'Turing Computer Lab 2 (Hardware Lab 2 this week)',
    currentExperiment: 'Experiment 4: Lexical Analyzer using LEX Tool',
    vivaSlot: 'Thursday 03:00 PM',
    studentsCount: 24,
    announcements: [
      {
        id: 'bb-1',
        text: 'Lab room swapped to Hardware Lab-2 for Thursday slot due to OS installation in Lab 2.',
        date: 'Yesterday',
        author: 'Prof. K. Venkatesh',
      },
      {
        id: 'bb-2',
        text: 'Batch B DBMS project presentations scheduled for next Wednesday during tutorial hour.',
        date: '3 days ago',
        author: 'Dr. Neha Sen',
      },
    ],
  },
  C: {
    batch: 'C',
    crName: 'Priya Patel (Roll 22CS089)',
    crContact: '+91 94220 88912',
    mentor: 'Dr. Neha Sen (Assistant Professor)',
    labSlot: 'Wednesday & Friday 08:00 AM - 10:00 AM',
    labVenue: 'Turing Computer Lab 3',
    currentExperiment: 'Experiment 4: Lexical Analyzer using LEX Tool',
    vivaSlot: 'Friday 09:15 AM',
    studentsCount: 24,
    announcements: [
      {
        id: 'bc-1',
        text: 'Friday 8 AM lab begins strictly on time. Anyone arriving past 8:15 AM will not be marked present.',
        date: 'Yesterday',
        author: 'Priya Patel (CR)',
      },
      {
        id: 'bc-2',
        text: 'Batch C study circle for Operating Systems CIA-2 meets today at 4:30 PM in Library Discussion Room 2.',
        date: 'Today',
        author: 'Priya Patel (CR)',
      },
    ],
  },
};

export const INITIAL_CR_TRACK: CRSubmissionTrack[] = [
  {
    id: 'cr-1',
    rollNo: '22CS001',
    studentName: 'Aaditya Deshmukh',
    batch: 'A',
    assignmentId: 'asg-1',
    assignmentTitle: 'Assignment 2: CPU Scheduling Simulator',
    status: 'Verified',
    submittedAt: 'Oct 01, 09:30 PM',
    verifiedByCR: true,
    score: 19,
  },
  {
    id: 'cr-2',
    rollNo: '22CS012',
    studentName: 'Aarav Sharma',
    batch: 'A',
    assignmentId: 'asg-1',
    assignmentTitle: 'Assignment 2: CPU Scheduling Simulator',
    status: 'Verified',
    submittedAt: 'Sep 30, 06:15 PM',
    verifiedByCR: true,
    score: 20,
  },
  {
    id: 'cr-3',
    rollNo: '22CS019',
    studentName: 'Kunal Joshi',
    batch: 'A',
    assignmentId: 'asg-1',
    assignmentTitle: 'Assignment 2: CPU Scheduling Simulator',
    status: 'Submitted',
    submittedAt: 'Oct 02, 11:20 AM',
    verifiedByCR: false,
  },
  {
    id: 'cr-4',
    rollNo: '22CS034',
    studentName: 'Rohan Mehra',
    batch: 'B',
    assignmentId: 'asg-1',
    assignmentTitle: 'Assignment 2: CPU Scheduling Simulator',
    status: 'Verified',
    submittedAt: 'Sep 29, 04:00 PM',
    verifiedByCR: true,
    score: 18,
  },
  {
    id: 'cr-5',
    rollNo: '22CS044',
    studentName: 'Sarthak Dhanokar',
    batch: 'B',
    assignmentId: 'asg-1',
    assignmentTitle: 'Assignment 2: CPU Scheduling Simulator',
    status: 'Verified',
    submittedAt: 'Sep 28, 10:45 PM',
    verifiedByCR: true,
    score: 20,
  },
  {
    id: 'cr-6',
    rollNo: '22CS045',
    studentName: 'Varun Kulkarni',
    batch: 'B',
    assignmentId: 'asg-1',
    assignmentTitle: 'Assignment 2: CPU Scheduling Simulator',
    status: 'Pending',
    verifiedByCR: false,
  },
  {
    id: 'cr-7',
    rollNo: '22CS052',
    studentName: 'Sneha Rao',
    batch: 'B',
    assignmentId: 'asg-1',
    assignmentTitle: 'Assignment 2: CPU Scheduling Simulator',
    status: 'Pending',
    verifiedByCR: false,
  },
  {
    id: 'cr-8',
    rollNo: '22CS089',
    studentName: 'Priya Patel',
    batch: 'C',
    assignmentId: 'asg-1',
    assignmentTitle: 'Assignment 2: CPU Scheduling Simulator',
    status: 'Verified',
    submittedAt: 'Sep 29, 02:10 PM',
    verifiedByCR: true,
    score: 20,
  },
  {
    id: 'cr-9',
    rollNo: '22CS095',
    studentName: 'Vikram Singh',
    batch: 'C',
    assignmentId: 'asg-1',
    assignmentTitle: 'Assignment 2: CPU Scheduling Simulator',
    status: 'Late',
    submittedAt: 'Oct 02, 01:15 AM',
    verifiedByCR: false,
  },
];

export const INITIAL_COPY_ANSWERS: CopyAnswerItem[] = [
  {
    id: 'copy-1',
    subject: 'Operating Systems',
    testName: 'CIA-2 & Model Exams',
    examYear: '2025-2026',
    questionNo: 'Q1 (a)',
    questionText:
      'Explain Banker\'s algorithm for Deadlock Avoidance. State the safety criteria with necessary data structures and step-by-step pseudo-algorithm.',
    marks: 10,
    answerText: `Banker's Algorithm is a deadlock avoidance algorithm for systems with multiple instances of resources.

1. DATA STRUCTURES:
- Available[m]: 1D array where Available[j] = k means k instances of resource Rj are free.
- Max[n][m]: 2D array defining maximum demand of each process.
- Allocation[n][m]: Currently allocated resources to process Pi.
- Need[n][m]: Remaining resource need: Need[i][j] = Max[i][j] - Allocation[i][j].

2. SAFETY ALGORITHM:
Step 1: Let Work = Available (vector of length m) and Finish[i] = false for all i in [0..n-1].
Step 2: Find an index i such that:
        Finish[i] == false AND Need[i] <= Work.
        If no such i exists, go to Step 4.
Step 3: Work = Work + Allocation[i]
        Finish[i] = true
        Go to Step 2.
Step 4: If Finish[i] == true for all i, the system is in a SAFE state; otherwise, UNSAFE state.

3. RESOURCE-REQUEST ALGORITHM:
When Request[i] arrives for process Pi:
1. If Request[i] <= Need[i], go to step 2; else error (exceeded max claim).
2. If Request[i] <= Available, go to step 3; else Pi must wait.
3. Pretend to allocate:
   Available = Available - Request[i]
   Allocation[i] = Allocation[i] + Request[i]
   Need[i] = Need[i] - Request[i]
4. Run Safety algorithm. If Safe -> grant; If Unsafe -> rollback & Pi waits.`,
    keyPoints: [
      'Define 4 matrices: Available, Max, Allocation, Need',
      'Need equation: Need[i][j] = Max[i][j] - Allocation[i][j]',
      'Safety check loop with Work vector',
      'Resource-request roll-back mechanism',
    ],
    verifiedByCR: true,
    upvotes: 89,
  },
  {
    id: 'copy-2',
    subject: 'Operating Systems',
    testName: 'CIA-2 & Model Exams',
    examYear: '2025-2026',
    questionNo: 'Q2 (b)',
    questionText:
      'Compare FIFO, LRU and Optimal Page Replacement algorithms for reference string: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3 with 3 frames. Find the number of page faults.',
    marks: 8,
    answerText: `Given Reference String: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3
Number of Frames = 3

1. OPTIMAL (Replaces page that will not be used for longest period in future):
String: 7  0  1  2  0  3  0  4  2  3
F1:     7  7  7  2  2  2  2  2  2  2
F2:     -  0  0  0  0  0  0  4  4  4
F3:     -  -  1  1  1  3  3  3  3  3
Hit/M:  M  M  M  M  H  M  H  M  H  H
Page Faults = 6 faults.

2. LRU (Replaces page that has not been used for longest time in past):
String: 7  0  1  2  0  3  0  4  2  3
F1:     7  7  7  2  2  2  2  4  4  4
F2:     -  0  0  0  0  0  0  0  0  3
F3:     -  -  1  1  1  3  3  3  2  2
Hit/M:  M  M  M  M  H  M  H  M  M  M
Page Faults = 7 faults.

3. FIFO (Replaces oldest loaded page):
Page Faults = 8 faults.

Conclusion: Optimal gives lowest faults (6), followed by LRU (7), while FIFO yields 8 faults.`,
    keyPoints: [
      'Show frame step table column by column',
      'Identify Hits (H) vs Misses/Faults (M)',
      'Optimal = 6 faults, LRU = 7 faults, FIFO = 8 faults',
      'Mention Optimal is theoretical baseline',
    ],
    verifiedByCR: true,
    upvotes: 114,
  },
  {
    id: 'copy-3',
    subject: 'DBMS',
    testName: 'CIA-2',
    examYear: '2025-2026',
    questionNo: 'Q3 (a)',
    questionText:
      'State and prove the conditions for Lossless-Join Decomposition and Dependency Preservation in relational database design.',
    marks: 8,
    answerText: `Let relation R be decomposed into R1 and R2 with functional dependency set F.

1. LOSSLESS JOIN DECOMPOSITION:
A decomposition of R into (R1, R2) is lossless if and only if the natural join of R1 and R2 produces the exact original relation R without spurious tuples:
Condition: At least ONE of the following must hold:
a) (R1 ∩ R2) -> R1 (i.e. Common attribute is a superkey of R1)
OR
b) (R1 ∩ R2) -> R2 (i.e. Common attribute is a superkey of R2)

2. DEPENDENCY PRESERVATION:
A decomposition is dependency preserving if:
(F1 ∪ F2)+ = F+
where F1 = projection of F on R1, and F2 = projection of F on R2.
If all dependencies in F can be enforced by checking R1 and R2 independently without computing a JOIN, then the decomposition preserves dependencies.

3. COMPARISON TABLE:
- 3NF guarantees BOTH Lossless Join AND Dependency Preservation.
- BCNF guarantees Lossless Join, but may NOT preserve all functional dependencies.`,
    keyPoints: [
      'Lossless join formula: (R1 ∩ R2) -> R1 or (R1 ∩ R2) -> R2',
      'Dependency preservation formula: (F1 ∪ F2)+ = F+',
      '3NF preserves both; BCNF may sacrifice dependency preservation',
    ],
    verifiedByCR: true,
    upvotes: 76,
  },
  {
    id: 'copy-4',
    subject: 'Computer Networks',
    testName: 'CIA-1',
    examYear: '2025-2026',
    questionNo: 'Q4',
    questionText:
      'Derive the formula for Maximum Throughput and Efficiency of Stop-and-Wait and Sliding Window Go-Back-N protocols with propagation delay Tp and transmission time Tt.',
    marks: 6,
    answerText: `Let:
Tt = Transmission time = Packet Size (L) / Bandwidth (B)
Tp = Propagation delay = Distance (d) / Propagation Speed (v)
Round Trip Time (RTT) = 2 * Tp
Let a = Tp / Tt

1. STOP-AND-WAIT EFFICIENCY:
Useful Time = Tt
Total Cycle Time = Tt + 2*Tp
Efficiency (η) = Tt / (Tt + 2*Tp) = 1 / (1 + 2a)
Throughput = η * Bandwidth = [1 / (1 + 2a)] * B

2. GO-BACK-N SLIDING WINDOW EFFICIENCY:
Window Size = N
If N >= 1 + 2a:
   Sender can continuously transmit without waiting for ACK.
   Efficiency (η) = 100% (or 1)
If N < 1 + 2a:
   Efficiency (η) = N / (1 + 2a)
Maximum Throughput = [N / (1 + 2a)] * Bandwidth`,
    keyPoints: [
      'Define variable a = Tp / Tt',
      'Stop-and-Wait efficiency η = 1 / (1 + 2a)',
      'GBN efficiency η = min(1, N / (1 + 2a))',
      'Optimal window size N = 1 + 2a',
    ],
    verifiedByCR: true,
    upvotes: 62,
  },
];

export const INITIAL_LIVE_TEST: LiveTestState = {
  isActive: true,
  subject: 'Operating Systems & Concurrency',
  testType: 'CIA-2 Internal Exam (Live Hall 304)',
  hall: 'Hall 304 / 305',
  totalTimeMinutes: 90,
  startTime: Date.now() - 1000 * 60 * 32, // 32 minutes in
  questions: [
    {
      qNo: 'Q1',
      marks: 8,
      text: 'Apply Banker\'s Algorithm: System has 5 processes (P0-P4) and 3 resource types (A:10, B:5, C:7). Allocation: P0(0,1,0), P1(2,0,0), P2(3,0,2), P3(2,1,1), P4(0,0,2). Max: P0(7,5,3), P1(3,2,2), P2(9,0,2), P3(2,2,2), P4(4,3,3). Determine if system is safe and find sequence.',
      optionsOrHints: 'Calculate Need Matrix first: Need = Max - Allocation.',
    },
    {
      qNo: 'Q2',
      marks: 6,
      text: 'Calculate Page Faults for LRU with 3 frames for string: [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2]. Show page frame states at each step.',
      optionsOrHints: 'Look back at recent references when replacing.',
    },
    {
      qNo: 'Q3',
      marks: 10,
      text: 'Write the complete synchronization solution for Producer-Consumer problem using Semaphores (mutex, empty, full) in C. Explain why race conditions are prevented.',
      optionsOrHints: 'Initialize empty = N, full = 0, mutex = 1.',
    },
    {
      qNo: 'Q4',
      marks: 6,
      text: 'Short Note: Distinguish between Internal Fragmentation and External Fragmentation. How does Paging eliminate external fragmentation?',
      optionsOrHints: 'Paging divides memory into fixed size page frames.',
    },
  ],
  answers: [
    {
      id: 'ans-1',
      qNo: 'Q1',
      studentAlias: 'Anonymous Roll 24',
      batch: 'B',
      answerText: `NEED MATRIX calculation:
P0: 7-0=7, 5-1=4, 3-0=3 -> (7, 4, 3)
P1: 3-2=1, 2-0=2, 2-0=2 -> (1, 2, 2)
P2: 9-3=6, 0-0=0, 2-2=0 -> (6, 0, 0)
P3: 2-2=0, 2-1=1, 2-1=1 -> (0, 1, 1)
P4: 4-0=4, 3-0=3, 3-2=1 -> (4, 3, 1)

Total Allocated = (7, 2, 5)
Available = Total - Allocated = (10-7, 5-2, 7-5) = (3, 3, 2)

Step 1: Check P1 -> Need (1,2,2) <= Available (3,3,2) -> CAN RUN!
New Work = (3,3,2) + (2,0,0) = (5,3,2)
Step 2: Check P3 -> Need (0,1,1) <= Work (5,3,2) -> CAN RUN!
New Work = (5,3,2) + (2,1,1) = (7,4,3)
Step 3: Check P0 -> Need (7,4,3) <= Work (7,4,3) -> CAN RUN!
New Work = (7,4,3) + (0,1,0) = (7,5,3)
Step 4: Check P2 -> Need (6,0,0) <= Work (7,5,3) -> CAN RUN!
New Work = (7,5,3) + (3,0,2) = (10,5,5)
Step 5: Check P4 -> Need (4,3,1) <= Work (10,5,5) -> CAN RUN!

SYSTEM IS IN SAFE STATE!
SAFE SEQUENCE: < P1, P3, P0, P2, P4 > (or < P1, P3, P4, P0, P2 >)`,
      votes: 34,
      timestamp: '12m ago',
      isVerified: true,
    },
    {
      id: 'ans-2',
      qNo: 'Q2',
      studentAlias: 'CS-Ninja',
      batch: 'A',
      answerText: `LRU Page Fault Calculation:
Frames: 3
References: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2

1. [7] -> Miss (1)
2. [7, 0] -> Miss (2)
3. [7, 0, 1] -> Miss (3)
4. [2, 0, 1] -> Miss (4) (7 replaced, least recently used)
5. [2, 0, 1] -> HIT! (0 is used, order becomes 1, 2, 0)
6. [2, 0, 3] -> Miss (5) (1 replaced)
7. [2, 0, 3] -> HIT! (0 is used)
8. [4, 0, 3] -> Miss (6) (2 replaced)
9. [4, 0, 2] -> Miss (7) (3 replaced)
10. [4, 3, 2] -> Miss (8) (0 replaced)
11. [0, 3, 2] -> Miss (9) (4 replaced)
12. [0, 3, 2] -> HIT!
13. [0, 3, 2] -> HIT!

Total Page Faults = 9 faults.
Total Hits = 4 hits.
Hit Ratio = 4 / 13 = 30.76%`,
      votes: 21,
      timestamp: '8m ago',
      isVerified: true,
    },
    {
      id: 'ans-3',
      qNo: 'Q3',
      studentAlias: 'Anonymous Roll 89',
      batch: 'C',
      answerText: `// Producer Consumer Solution using POSIX semaphores
sem_t mutex;  // init to 1
sem_t empty;  // init to BUFFER_SIZE
sem_t full;   // init to 0

void* producer(void* arg) {
    while(1) {
        int item = produce_item();
        sem_wait(&empty); // decrement empty count
        sem_wait(&mutex); // acquire lock
        buffer[in] = item;
        in = (in + 1) % BUFFER_SIZE;
        sem_post(&mutex); // release lock
        sem_post(&full);  // increment full count
    }
}

void* consumer(void* arg) {
    while(1) {
        sem_wait(&full);  // wait until at least 1 item
        sem_wait(&mutex); // acquire lock
        int item = buffer[out];
        out = (out + 1) % BUFFER_SIZE;
        sem_post(&mutex); // release lock
        sem_post(&empty); // increment empty count
        consume_item(item);
    }
}

Why race condition is prevented:
1. Mutual exclusion: Only one thread can modify buffer array due to mutex semaphore.
2. Underflow prevention: Consumer blocks on full semaphore if buffer is empty.
3. Overflow prevention: Producer blocks on empty semaphore if buffer is full.`,
      votes: 18,
      timestamp: '5m ago',
      isVerified: true,
    },
  ],
};
