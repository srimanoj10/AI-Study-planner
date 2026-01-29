import { Subject, Topic, UserProfile, StudySession, StudyStreak, Badge } from '@/types/study';

// Mock subjects
export const mockSubjects: Subject[] = [
  { id: '1', name: 'Mathematics', color: 'hsl(235, 65%, 52%)', icon: '📐' },
  { id: '2', name: 'Physics', color: 'hsl(15, 85%, 60%)', icon: '⚡' },
  { id: '3', name: 'Chemistry', color: 'hsl(158, 60%, 45%)', icon: '🧪' },
  { id: '4', name: 'Biology', color: 'hsl(38, 92%, 55%)', icon: '🧬' },
  { id: '5', name: 'English', color: 'hsl(265, 65%, 55%)', icon: '📚' },
];

// Mock topics
export const mockTopics: Topic[] = [
  { id: 't1', subjectId: '1', name: 'Calculus - Derivatives', confidenceLevel: 3, lastStudied: new Date('2024-01-25'), mistakeFrequency: 5, priority: 'medium', totalStudyTime: 180, revisionsDone: 2 },
  { id: 't2', subjectId: '1', name: 'Linear Algebra', confidenceLevel: 2, lastStudied: new Date('2024-01-20'), mistakeFrequency: 8, priority: 'high', totalStudyTime: 120, revisionsDone: 1 },
  { id: 't3', subjectId: '1', name: 'Probability', confidenceLevel: 4, lastStudied: new Date('2024-01-27'), mistakeFrequency: 2, priority: 'low', totalStudyTime: 240, revisionsDone: 3 },
  { id: 't4', subjectId: '2', name: 'Mechanics', confidenceLevel: 2, lastStudied: new Date('2024-01-22'), mistakeFrequency: 7, priority: 'high', totalStudyTime: 150, revisionsDone: 1 },
  { id: 't5', subjectId: '2', name: 'Thermodynamics', confidenceLevel: 3, lastStudied: null, mistakeFrequency: 4, priority: 'medium', totalStudyTime: 90, revisionsDone: 0 },
  { id: 't6', subjectId: '3', name: 'Organic Chemistry', confidenceLevel: 1, lastStudied: new Date('2024-01-15'), mistakeFrequency: 12, priority: 'high', totalStudyTime: 60, revisionsDone: 0 },
  { id: 't7', subjectId: '3', name: 'Inorganic Chemistry', confidenceLevel: 4, lastStudied: new Date('2024-01-26'), mistakeFrequency: 1, priority: 'low', totalStudyTime: 200, revisionsDone: 4 },
  { id: 't8', subjectId: '4', name: 'Cell Biology', confidenceLevel: 5, lastStudied: new Date('2024-01-28'), mistakeFrequency: 0, priority: 'low', totalStudyTime: 300, revisionsDone: 5 },
  { id: 't9', subjectId: '5', name: 'Essay Writing', confidenceLevel: 3, lastStudied: new Date('2024-01-24'), mistakeFrequency: 3, priority: 'medium', totalStudyTime: 120, revisionsDone: 2 },
];

// Mock user profile
export const mockUserProfile: UserProfile = {
  id: 'user1',
  examName: 'JEE Advanced 2024',
  examDate: new Date('2024-05-26'),
  targetScore: 250,
  dailyStudyTime: {
    weekday: 180, // 3 hours
    weekend: 300, // 5 hours
  },
  preferredSessionLength: 45,
  createdAt: new Date('2024-01-01'),
};

// Mock study sessions for today
export const mockTodaySessions: StudySession[] = [
  { id: 's1', topicId: 't2', scheduledDate: new Date(), startTime: '09:00', duration: 45, status: 'completed', pomodoroCount: 2, actualDuration: 50 },
  { id: 's2', topicId: 't6', scheduledDate: new Date(), startTime: '10:00', duration: 45, status: 'pending', pomodoroCount: 2 },
  { id: 's3', topicId: 't4', scheduledDate: new Date(), startTime: '11:00', duration: 45, status: 'pending', pomodoroCount: 2 },
  { id: 's4', topicId: 't1', scheduledDate: new Date(), startTime: '14:00', duration: 45, status: 'pending', pomodoroCount: 2 },
  { id: 's5', topicId: 't5', scheduledDate: new Date(), startTime: '15:00', duration: 45, status: 'pending', pomodoroCount: 2 },
];

// Mock badges
const mockBadges: Badge[] = [
  { id: 'b1', name: 'First Steps', description: 'Complete your first study session', icon: '🎯', earnedAt: new Date('2024-01-02'), type: 'milestone' },
  { id: 'b2', name: 'Week Warrior', description: '7-day study streak', icon: '🔥', earnedAt: new Date('2024-01-08'), type: 'streak' },
  { id: 'b3', name: 'Night Owl', description: 'Study after 10 PM', icon: '🦉', earnedAt: new Date('2024-01-10'), type: 'achievement' },
  { id: 'b4', name: 'Early Bird', description: 'Study before 7 AM', icon: '🌅', earnedAt: new Date('2024-01-15'), type: 'achievement' },
];

// Mock study streak
export const mockStudyStreak: StudyStreak = {
  currentStreak: 12,
  longestStreak: 21,
  lastStudyDate: new Date(),
  totalStudyDays: 45,
  xpPoints: 2450,
  level: 8,
  badges: mockBadges,
};

// Calculate days remaining until exam
export const getDaysRemaining = (examDate: Date): number => {
  const today = new Date();
  const diffTime = examDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Get topic by ID
export const getTopicById = (topicId: string): Topic | undefined => {
  return mockTopics.find(t => t.id === topicId);
};

// Get subject by ID
export const getSubjectById = (subjectId: string): Subject | undefined => {
  return mockSubjects.find(s => s.id === subjectId);
};
