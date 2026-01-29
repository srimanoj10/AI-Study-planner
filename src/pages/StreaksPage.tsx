import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Flame,
  Trophy,
  Star,
  Zap,
  Target,
  Calendar,
  Gift,
  Crown,
  Medal,
  Award,
  Sparkles
} from 'lucide-react';
import { mockStudyStreak } from '@/data/mockData';

const levelRequirements = [
  { level: 1, xpRequired: 0, title: 'Beginner' },
  { level: 2, xpRequired: 100, title: 'Student' },
  { level: 3, xpRequired: 300, title: 'Learner' },
  { level: 4, xpRequired: 600, title: 'Scholar' },
  { level: 5, xpRequired: 1000, title: 'Achiever' },
  { level: 6, xpRequired: 1500, title: 'Expert' },
  { level: 7, xpRequired: 2200, title: 'Master' },
  { level: 8, xpRequired: 3000, title: 'Champion' },
  { level: 9, xpRequired: 4000, title: 'Legend' },
  { level: 10, xpRequired: 5500, title: 'Genius' },
];

const upcomingRewards = [
  { streakDays: 14, reward: '🎯 Focus Master Badge', progress: 12 },
  { streakDays: 21, reward: '🌟 3-Week Warrior', progress: 12 },
  { streakDays: 30, reward: '👑 Monthly Champion', progress: 12 },
];

const StreaksPage = () => {
  const currentLevel = levelRequirements.find(l => l.level === mockStudyStreak.level) || levelRequirements[0];
  const nextLevel = levelRequirements.find(l => l.level === mockStudyStreak.level + 1);
  
  const xpInCurrentLevel = mockStudyStreak.xpPoints - currentLevel.xpRequired;
  const xpForNextLevel = nextLevel ? nextLevel.xpRequired - currentLevel.xpRequired : 0;
  const levelProgress = nextLevel ? (xpInCurrentLevel / xpForNextLevel) * 100 : 100;

  // Generate streak calendar (last 30 days)
  const streakCalendar = Array.from({ length: 35 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (34 - i));
    const isStudied = Math.random() > 0.3; // Mock data
    const isToday = i === 34;
    return { date, isStudied, isToday };
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-xl z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">StudyAI</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">Dashboard</Link>
              <Link to="/schedule" className="text-sm font-medium text-muted-foreground hover:text-foreground">Schedule</Link>
              <Link to="/topics" className="text-sm font-medium text-muted-foreground hover:text-foreground">Topics</Link>
              <Link to="/progress" className="text-sm font-medium text-muted-foreground hover:text-foreground">Progress</Link>
              <Link to="/streaks" className="text-sm font-medium text-primary">Streaks</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-accent mb-6 shadow-glow-accent animate-pulse-glow">
            <Flame className="w-12 h-12 text-accent-foreground" />
          </div>
          <h1 className="font-display text-5xl font-bold mb-2">
            {mockStudyStreak.currentStreak} Day Streak! 🔥
          </h1>
          <p className="text-muted-foreground text-lg">
            Keep going! You're building amazing habits.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Streak Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card variant="stats" className="p-5 text-center">
                <Flame className="w-8 h-8 mx-auto text-accent mb-2" />
                <p className="font-display text-3xl font-bold">{mockStudyStreak.currentStreak}</p>
                <p className="text-sm text-muted-foreground">Current Streak</p>
              </Card>
              <Card variant="stats" className="p-5 text-center">
                <Trophy className="w-8 h-8 mx-auto text-warning mb-2" />
                <p className="font-display text-3xl font-bold">{mockStudyStreak.longestStreak}</p>
                <p className="text-sm text-muted-foreground">Longest Streak</p>
              </Card>
              <Card variant="stats" className="p-5 text-center">
                <Calendar className="w-8 h-8 mx-auto text-success mb-2" />
                <p className="font-display text-3xl font-bold">{mockStudyStreak.totalStudyDays}</p>
                <p className="text-sm text-muted-foreground">Total Days</p>
              </Card>
            </div>

            {/* Activity Calendar */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Activity Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-xs text-muted-foreground font-medium py-2">
                      {day}
                    </div>
                  ))}
                  {streakCalendar.map((day, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all hover:scale-110 ${
                        day.isToday
                          ? 'gradient-accent text-accent-foreground ring-2 ring-accent ring-offset-2'
                          : day.isStudied
                          ? 'bg-success/20 text-success'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                      title={day.date.toLocaleDateString()}
                    >
                      {day.date.getDate()}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-success/20" />
                    <span className="text-sm text-muted-foreground">Studied</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-secondary" />
                    <span className="text-sm text-muted-foreground">Missed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded gradient-accent" />
                    <span className="text-sm text-muted-foreground">Today</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-warning" />
                  Your Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                  {mockStudyStreak.badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="group relative aspect-square rounded-xl bg-secondary flex items-center justify-center text-3xl hover:scale-110 transition-all cursor-pointer shadow-md hover:shadow-lg"
                      title={badge.name}
                    >
                      {badge.icon}
                      <div className="absolute inset-0 rounded-xl bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                        <span className="text-xs font-medium text-primary-foreground">{badge.name}</span>
                      </div>
                    </div>
                  ))}
                  {/* Locked badges */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={`locked-${i}`}
                      className="aspect-square rounded-xl bg-secondary/50 border-2 border-dashed border-muted flex items-center justify-center text-2xl opacity-50"
                    >
                      🔒
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Level Progress */}
            <Card variant="gradient" className="overflow-hidden">
              <div className="gradient-hero h-2" />
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                    <Crown className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Level {mockStudyStreak.level}</p>
                    <p className="font-display text-2xl font-bold">{currentLevel.title}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{mockStudyStreak.xpPoints} XP</span>
                    <span className="text-muted-foreground">{nextLevel?.xpRequired || '∞'} XP</span>
                  </div>
                  <Progress value={levelProgress} indicatorColor="primary" />
                  {nextLevel && (
                    <p className="text-xs text-muted-foreground text-center">
                      {nextLevel.xpRequired - mockStudyStreak.xpPoints} XP to {nextLevel.title}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* XP Breakdown */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-warning" />
                  Earn XP
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { action: 'Complete a Pomodoro', xp: 25, icon: '⏱️' },
                  { action: 'Finish daily plan', xp: 100, icon: '✅' },
                  { action: 'Maintain streak', xp: 50, icon: '🔥' },
                  { action: 'Master a topic', xp: 200, icon: '🎯' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <span className="text-xl">{item.icon}</span>
                    <span className="flex-1 text-sm">{item.action}</span>
                    <Badge variant="warning">+{item.xp} XP</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Rewards */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-accent" />
                  Upcoming Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingRewards.map((reward, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{reward.reward}</span>
                      <span className="text-xs text-muted-foreground">
                        {reward.progress}/{reward.streakDays} days
                      </span>
                    </div>
                    <Progress 
                      value={(reward.progress / reward.streakDays) * 100} 
                      size="sm"
                      indicatorColor="accent"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Motivational Card */}
            <Card className="gradient-primary text-primary-foreground p-6 text-center">
              <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <p className="font-display text-lg font-semibold mb-2">
                You're on fire! 🔥
              </p>
              <p className="text-sm opacity-80">
                Just 2 more days to beat your longest streak!
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StreaksPage;
