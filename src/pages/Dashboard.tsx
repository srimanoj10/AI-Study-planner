import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Target,
  Flame,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  Play,
  CheckCircle2,
  SkipForward,
  Timer,
  BarChart3,
  Settings,
  User
} from 'lucide-react';
import { 
  mockUserProfile, 
  mockTodaySessions, 
  mockStudyStreak, 
  mockTopics,
  mockSubjects,
  getDaysRemaining,
  getTopicById,
  getSubjectById
} from '@/data/mockData';

const Dashboard = () => {
  const [sessions, setSessions] = useState(mockTodaySessions);
  const daysRemaining = getDaysRemaining(mockUserProfile.examDate);
  
  const completedSessions = sessions.filter(s => s.status === 'completed').length;
  const totalSessions = sessions.length;
  const completionPercentage = (completedSessions / totalSessions) * 100;

  // Get priority topics (low confidence or high mistake rate)
  const priorityTopics = mockTopics
    .filter(t => t.confidenceLevel <= 2 || t.priority === 'high')
    .slice(0, 4);

  // Get weak subjects alert
  const weakSubjects = mockTopics.filter(t => t.confidenceLevel <= 2);

  const markSessionComplete = (sessionId: string) => {
    setSessions(sessions.map(s => 
      s.id === sessionId ? { ...s, status: 'completed' as const } : s
    ));
  };

  const skipSession = (sessionId: string) => {
    setSessions(sessions.map(s => 
      s.id === sessionId ? { ...s, status: 'skipped' as const } : s
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-xl z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-display text-xl font-bold">StudyAI</span>
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium text-primary">Dashboard</Link>
              <Link to="/schedule" className="text-sm font-medium text-muted-foreground hover:text-foreground">Schedule</Link>
              <Link to="/topics" className="text-sm font-medium text-muted-foreground hover:text-foreground">Topics</Link>
              <Link to="/progress" className="text-sm font-medium text-muted-foreground hover:text-foreground">Progress</Link>
              <Link to="/pomodoro" className="text-sm font-medium text-muted-foreground hover:text-foreground">Focus</Link>
            </nav>

            <div className="flex items-center gap-3">
              {/* Streak Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                <Flame className="w-4 h-4 text-accent" />
                <span className="font-display font-bold text-accent">{mockStudyStreak.currentStreak}</span>
              </div>
              
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome & Quick Stats */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Good morning! 👋</h1>
          <p className="text-muted-foreground">
            You're preparing for <span className="font-semibold text-foreground">{mockUserProfile.examName}</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Days Remaining */}
          <Card variant="stats" className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Days Remaining</p>
                <p className="font-display text-4xl font-bold text-primary mt-1">{daysRemaining}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>

          {/* Today's Progress */}
          <Card variant="stats" className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Progress</p>
                <p className="font-display text-4xl font-bold text-success mt-1">{completedSessions}/{totalSessions}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-success" />
              </div>
            </div>
            <Progress value={completionPercentage} className="mt-3" size="sm" indicatorColor="success" />
          </Card>

          {/* Current Streak */}
          <Card variant="stats" className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="font-display text-4xl font-bold text-accent mt-1">{mockStudyStreak.currentStreak}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Flame className="w-5 h-5 text-accent" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Best: {mockStudyStreak.longestStreak} days</p>
          </Card>

          {/* XP Points */}
          <Card variant="stats" className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Level {mockStudyStreak.level}</p>
                <p className="font-display text-4xl font-bold text-warning mt-1">{mockStudyStreak.xpPoints}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-warning" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">XP Points</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Today's Schedule */}
          <div className="lg:col-span-2 space-y-6">
            {/* Alerts */}
            {weakSubjects.length > 0 && (
              <Card className="border-warning/30 bg-warning/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium text-warning">Attention Needed</p>
                    <p className="text-sm text-muted-foreground">
                      {weakSubjects.length} topic(s) need more focus. AI has prioritized these in your schedule.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Today's Plan */}
            <Card variant="elevated">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Today's Study Plan</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <Link to="/schedule">
                  <Button variant="ghost" size="sm">
                    View Full Schedule
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {sessions.map((session, index) => {
                  const topic = getTopicById(session.topicId);
                  const subject = topic ? getSubjectById(topic.subjectId) : null;
                  
                  return (
                    <div 
                      key={session.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        session.status === 'completed' 
                          ? 'bg-success/5 border-success/20' 
                          : session.status === 'skipped'
                          ? 'bg-muted/50 border-muted opacity-60'
                          : 'bg-card hover:shadow-md'
                      }`}
                    >
                      {/* Time */}
                      <div className="text-center min-w-[60px]">
                        <p className="font-display font-semibold">{session.startTime}</p>
                        <p className="text-xs text-muted-foreground">{session.duration}m</p>
                      </div>

                      {/* Divider */}
                      <div className={`w-1 h-12 rounded-full ${
                        session.status === 'completed' ? 'bg-success' : 'bg-border'
                      }`} />

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{subject?.icon}</span>
                          <span className="font-medium">{topic?.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={topic?.priority === 'high' ? 'high' : topic?.priority === 'medium' ? 'medium' : 'low'}>
                            {topic?.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {session.pomodoroCount} pomodoros
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {session.status === 'pending' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => skipSession(session.id)}
                            >
                              <SkipForward className="w-4 h-4" />
                            </Button>
                            <Link to="/pomodoro">
                              <Button variant="hero" size="sm">
                                <Play className="w-4 h-4 mr-1" />
                                Start
                              </Button>
                            </Link>
                          </>
                        )}
                        {session.status === 'completed' && (
                          <CheckCircle2 className="w-6 h-6 text-success" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Priority & Stats */}
          <div className="space-y-6">
            {/* Priority Topics */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Priority Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {priorityTopics.map((topic) => {
                  const subject = getSubjectById(topic.subjectId);
                  return (
                    <div key={topic.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <span className="text-xl">{subject?.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{topic.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress 
                            value={topic.confidenceLevel * 20} 
                            className="flex-1 h-1.5" 
                            indicatorColor={topic.confidenceLevel <= 2 ? 'destructive' : 'warning'}
                          />
                          <span className="text-xs text-muted-foreground">{topic.confidenceLevel}/5</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <Link to="/topics">
                  <Button variant="ghost" className="w-full mt-2">
                    View All Topics
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Badges */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🏆 Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {mockStudyStreak.badges.slice(0, 4).map((badge) => (
                    <div 
                      key={badge.id}
                      className="aspect-square rounded-xl bg-secondary flex items-center justify-center text-2xl hover:scale-110 transition-transform cursor-pointer"
                      title={badge.name}
                    >
                      {badge.icon}
                    </div>
                  ))}
                </div>
                <Link to="/streaks">
                  <Button variant="ghost" className="w-full mt-4">
                    View All Badges
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card variant="gradient">
              <CardContent className="p-5">
                <h3 className="font-display font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link to="/pomodoro">
                    <Button variant="hero" className="w-full justify-start">
                      <Timer className="w-4 h-4 mr-2" />
                      Start Focus Session
                    </Button>
                  </Link>
                  <Link to="/progress">
                    <Button variant="secondary" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
