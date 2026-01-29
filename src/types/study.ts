// Types for the Study Planner application

export interface UserProfile {
  id: string;
  examName: string;
  examDate: Date;
  targetScore: number;
  dailyStudyTime: {
    weekday: number; // minutes
    weekend: number; // minutes
  };
  preferredSessionLength: number; // minutes
  createdAt: Date;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  name: string;
  confidenceLevel: 1 | 2 | 3 | 4 | 5;
  lastStudied: Date | null;
  mistakeFrequency: number;
  priority: 'low' | 'medium' | 'high';
  totalStudyTime: number; // minutes
  revisionsDone: number;
}

export interface StudySession {
  id: string;
  topicId: string;
  scheduledDate: Date;
  startTime: string; // HH:mm format
  duration: number; // minutes
  status: 'pending' | 'completed' | 'skipped' | 'rescheduled';
  actualDuration?: number;
  notes?: string;
  pomodoroCount: number;
}

export interface DailyPlan {
  date: Date;
  sessions: StudySession[];
  totalPlannedMinutes: number;
  completedMinutes: number;
  isCompleted: boolean;
}

export interface WeeklyProgress {
  weekStartDate: Date;
  plannedHours: number;
  actualHours: number;
  subjectBreakdown: {
    subjectId: string;
    hours: number;
    percentage: number;
  }[];
  consistencyScore: number; // 0-100
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: Date | null;
  totalStudyDays: number;
  xpPoints: number;
  level: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  type: 'streak' | 'milestone' | 'achievement';
}

export interface PomodoroSettings {
  workDuration: number; // minutes
  shortBreakDuration: number; // minutes
  longBreakDuration: number; // minutes
  sessionsBeforeLongBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
}

export interface RevisionSchedule {
  topicId: string;
  revisionDates: Date[];
  intervals: number[]; // days: [1, 7, 21, etc.]
  completedRevisions: number;
}
