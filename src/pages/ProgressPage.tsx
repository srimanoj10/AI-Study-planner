import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { mockSubjects, mockTopics } from '@/data/mockData';

const ProgressPage = () => {
  // Mock weekly data
  const weeklyData = [
    { day: 'Mon', planned: 180, actual: 165 },
    { day: 'Tue', planned: 180, actual: 200 },
    { day: 'Wed', planned: 180, actual: 180 },
    { day: 'Thu', planned: 180, actual: 120 },
    { day: 'Fri', planned: 180, actual: 195 },
    { day: 'Sat', planned: 300, actual: 280 },
    { day: 'Sun', planned: 300, actual: 310 },
  ];

  const totalPlanned = weeklyData.reduce((sum, d) => sum + d.planned, 0);
  const totalActual = weeklyData.reduce((sum, d) => sum + d.actual, 0);
  const consistencyScore = Math.round((totalActual / totalPlanned) * 100);

  // Subject breakdown
  const subjectProgress = mockSubjects.map(subject => {
    const topics = mockTopics.filter(t => t.subjectId === subject.id);
    const avgConfidence = topics.reduce((sum, t) => sum + t.confidenceLevel, 0) / topics.length;
    const totalTime = topics.reduce((sum, t) => sum + t.totalStudyTime, 0);
    return {
      ...subject,
      avgConfidence,
      totalTime,
      percentage: (totalTime / 1000) * 100, // Mock percentage
    };
  });

  // AI Insights
  const insights = [
    { type: 'positive', message: 'Great job! You studied 15% more than planned this week.' },
    { type: 'warning', message: 'Organic Chemistry needs attention - confidence dropped to 1/5.' },
    { type: 'tip', message: 'Try studying Physics in the morning when focus is highest.' },
    { type: 'positive', message: 'Your streak is at 12 days! Keep it going!' },
  ];

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
              <Link to="/progress" className="text-sm font-medium text-primary">Progress</Link>
              <Link to="/pomodoro" className="text-sm font-medium text-muted-foreground hover:text-foreground">Focus</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Weekly Progress</h1>
          <p className="text-muted-foreground">
            Track your study hours, subject progress, and get AI-powered insights
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card variant="stats" className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="font-display text-3xl font-bold text-primary mt-1">
                  {Math.round(totalActual / 60)}h
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUp className="w-3 h-3 text-success" />
                  <span className="text-xs text-success">+15%</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>

          <Card variant="stats" className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Consistency</p>
                <p className="font-display text-3xl font-bold text-success mt-1">
                  {consistencyScore}%
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Minus className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Same as last week</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-success" />
              </div>
            </div>
          </Card>

          <Card variant="stats" className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Topics Covered</p>
                <p className="font-display text-3xl font-bold text-accent mt-1">12</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUp className="w-3 h-3 text-success" />
                  <span className="text-xs text-success">+3</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
            </div>
          </Card>

          <Card variant="stats" className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Confidence</p>
                <p className="font-display text-3xl font-bold text-warning mt-1">3.2</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUp className="w-3 h-3 text-success" />
                  <span className="text-xs text-success">+0.4</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-warning" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Chart */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Planned vs Actual Study Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyData.map((day) => {
                    const maxMinutes = 360;
                    const plannedWidth = (day.planned / maxMinutes) * 100;
                    const actualWidth = (day.actual / maxMinutes) * 100;
                    const isOverAchieved = day.actual >= day.planned;
                    
                    return (
                      <div key={day.day} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium w-12">{day.day}</span>
                          <div className="flex-1 mx-4 relative h-8">
                            {/* Planned bar (background) */}
                            <div 
                              className="absolute inset-y-0 left-0 bg-secondary rounded-full"
                              style={{ width: `${plannedWidth}%` }}
                            />
                            {/* Actual bar (foreground) */}
                            <div 
                              className={`absolute inset-y-0 left-0 rounded-full transition-all ${
                                isOverAchieved ? 'gradient-success' : 'gradient-primary'
                              }`}
                              style={{ width: `${actualWidth}%` }}
                            />
                          </div>
                          <div className="text-sm text-right w-24">
                            <span className={isOverAchieved ? 'text-success font-medium' : ''}>
                              {Math.round(day.actual / 60)}h
                            </span>
                            <span className="text-muted-foreground"> / {Math.round(day.planned / 60)}h</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full gradient-primary" />
                    <span className="text-sm text-muted-foreground">Actual (under goal)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full gradient-success" />
                    <span className="text-sm text-muted-foreground">Actual (goal met)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-secondary" />
                    <span className="text-sm text-muted-foreground">Planned</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subject Progress */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Subject Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectProgress.map((subject) => (
                    <div key={subject.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{subject.icon}</span>
                          <span className="font-medium">{subject.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={
                            subject.avgConfidence <= 2 ? 'high' : 
                            subject.avgConfidence <= 3 ? 'medium' : 'low'
                          }>
                            {subject.avgConfidence.toFixed(1)}/5
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {Math.round(subject.totalTime / 60)}h
                          </span>
                        </div>
                      </div>
                      <Progress 
                        value={subject.percentage} 
                        size="sm"
                        indicatorColor={
                          subject.avgConfidence <= 2 ? 'destructive' : 
                          subject.avgConfidence <= 3 ? 'warning' : 'success'
                        }
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Insights */}
          <div className="space-y-6">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ✨ AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {insights.map((insight, i) => (
                  <div 
                    key={i}
                    className={`p-4 rounded-xl ${
                      insight.type === 'positive' ? 'bg-success/10 border border-success/20' :
                      insight.type === 'warning' ? 'bg-warning/10 border border-warning/20' :
                      'bg-primary/10 border border-primary/20'
                    }`}
                  >
                    <p className={`text-sm ${
                      insight.type === 'positive' ? 'text-success' :
                      insight.type === 'warning' ? 'text-warning' :
                      'text-primary'
                    }`}>
                      {insight.type === 'positive' && '✅ '}
                      {insight.type === 'warning' && '⚠️ '}
                      {insight.type === 'tip' && '💡 '}
                      {insight.message}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Weekly Goal */}
            <Card variant="gradient">
              <CardContent className="p-6">
                <div className="text-center">
                  <Calendar className="w-10 h-10 mx-auto text-primary mb-3" />
                  <h3 className="font-display text-lg font-semibold mb-2">Weekly Goal</h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="font-display text-4xl font-bold text-primary">
                      {Math.round(totalActual / 60)}
                    </span>
                    <span className="text-muted-foreground">/ {Math.round(totalPlanned / 60)}h</span>
                  </div>
                  <Progress 
                    value={consistencyScore > 100 ? 100 : consistencyScore} 
                    indicatorColor={consistencyScore >= 100 ? 'success' : 'primary'}
                  />
                  <p className="text-sm text-muted-foreground mt-3">
                    {consistencyScore >= 100 
                      ? "🎉 You've hit your goal!" 
                      : `${Math.round(totalPlanned / 60 - totalActual / 60)}h remaining`}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Improvement Tips */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { tip: 'Study weakest topics in the morning', icon: '🌅' },
                  { tip: 'Take breaks every 45-50 minutes', icon: '⏱️' },
                  { tip: 'Review notes before sleeping', icon: '🌙' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm">{item.tip}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressPage;
