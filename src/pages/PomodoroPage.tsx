import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Volume2,
  VolumeX,
  Settings,
  Coffee,
  Target,
  Clock,
  CheckCircle2,
  X
} from 'lucide-react';
import { mockTopics, mockSubjects, getSubjectById } from '@/data/mockData';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroState {
  mode: TimerMode;
  timeRemaining: number; // seconds
  isRunning: boolean;
  completedPomodoros: number;
  currentTopicId: string | null;
}

const TIMER_PRESETS = {
  work: { label: 'Focus', duration: 25 * 60, color: 'primary' },
  shortBreak: { label: 'Short Break', duration: 5 * 60, color: 'success' },
  longBreak: { label: 'Long Break', duration: 15 * 60, color: 'accent' },
};

const PomodoroPage = () => {
  const [state, setState] = useState<PomodoroState>({
    mode: 'work',
    timeRemaining: TIMER_PRESETS.work.duration,
    isRunning: false,
    completedPomodoros: 0,
    currentTopicId: mockTopics[0].id,
  });
  
  const [isMuted, setIsMuted] = useState(false);
  const [showTopicSelector, setShowTopicSelector] = useState(false);

  const currentTopic = mockTopics.find(t => t.id === state.currentTopicId);
  const currentSubject = currentTopic ? getSubjectById(currentTopic.subjectId) : null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    const totalTime = TIMER_PRESETS[state.mode].duration;
    return ((totalTime - state.timeRemaining) / totalTime) * 100;
  };

  const toggleTimer = () => {
    setState(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetTimer = () => {
    setState(prev => ({
      ...prev,
      timeRemaining: TIMER_PRESETS[prev.mode].duration,
      isRunning: false,
    }));
  };

  const switchMode = (mode: TimerMode) => {
    setState(prev => ({
      ...prev,
      mode,
      timeRemaining: TIMER_PRESETS[mode].duration,
      isRunning: false,
    }));
  };

  const skipToNext = useCallback(() => {
    if (state.mode === 'work') {
      const newCompleted = state.completedPomodoros + 1;
      const nextMode = newCompleted % 4 === 0 ? 'longBreak' : 'shortBreak';
      setState(prev => ({
        ...prev,
        mode: nextMode,
        timeRemaining: TIMER_PRESETS[nextMode].duration,
        completedPomodoros: newCompleted,
        isRunning: false,
      }));
    } else {
      setState(prev => ({
        ...prev,
        mode: 'work',
        timeRemaining: TIMER_PRESETS.work.duration,
        isRunning: false,
      }));
    }
  }, [state.mode, state.completedPomodoros]);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (state.isRunning && state.timeRemaining > 0) {
      interval = setInterval(() => {
        setState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);
    } else if (state.timeRemaining === 0) {
      skipToNext();
    }

    return () => clearInterval(interval);
  }, [state.isRunning, state.timeRemaining, skipToNext]);

  // Update document title with timer
  useEffect(() => {
    document.title = `${formatTime(state.timeRemaining)} - ${TIMER_PRESETS[state.mode].label} | StudyAI`;
    return () => { document.title = 'StudyAI'; };
  }, [state.timeRemaining, state.mode]);

  const getModeBackground = () => {
    switch (state.mode) {
      case 'work': return 'from-primary/5 to-primary/10';
      case 'shortBreak': return 'from-success/5 to-success/10';
      case 'longBreak': return 'from-accent/5 to-accent/10';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getModeBackground()} transition-all duration-500`}>
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">StudyAI</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Mode Selector */}
          <div className="flex justify-center gap-2 mb-8">
            {(Object.keys(TIMER_PRESETS) as TimerMode[]).map((mode) => (
              <Button
                key={mode}
                variant={state.mode === mode ? 'default' : 'ghost'}
                onClick={() => switchMode(mode)}
                className={state.mode === mode ? 'shadow-md' : ''}
              >
                {mode === 'shortBreak' || mode === 'longBreak' ? (
                  <Coffee className="w-4 h-4 mr-2" />
                ) : (
                  <Target className="w-4 h-4 mr-2" />
                )}
                {TIMER_PRESETS[mode].label}
              </Button>
            ))}
          </div>

          {/* Timer Card */}
          <Card variant="elevated" className="mb-8">
            <CardContent className="p-8">
              {/* Current Topic */}
              {state.mode === 'work' && currentTopic && (
                <div 
                  className="flex items-center justify-center gap-3 mb-8 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setShowTopicSelector(!showTopicSelector)}
                >
                  <span className="text-2xl">{currentSubject?.icon}</span>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Studying</p>
                    <p className="font-display font-semibold">{currentTopic.name}</p>
                  </div>
                </div>
              )}

              {state.mode !== 'work' && (
                <div className="text-center mb-8">
                  <Coffee className="w-12 h-12 mx-auto text-success mb-2" />
                  <p className="text-muted-foreground">Take a break, you've earned it!</p>
                </div>
              )}

              {/* Topic Selector Dropdown */}
              {showTopicSelector && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-80 bg-card rounded-xl shadow-xl border p-2 z-50">
                  <div className="flex items-center justify-between p-2 border-b mb-2">
                    <span className="font-medium">Select Topic</span>
                    <Button variant="ghost" size="icon" onClick={() => setShowTopicSelector(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1">
                    {mockTopics.map((topic) => {
                      const subject = getSubjectById(topic.subjectId);
                      return (
                        <button
                          key={topic.id}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left ${
                            topic.id === state.currentTopicId ? 'bg-primary/10' : ''
                          }`}
                          onClick={() => {
                            setState(prev => ({ ...prev, currentTopicId: topic.id }));
                            setShowTopicSelector(false);
                          }}
                        >
                          <span className="text-lg">{subject?.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{topic.name}</p>
                            <p className="text-xs text-muted-foreground">{subject?.name}</p>
                          </div>
                          {topic.id === state.currentTopicId && (
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Timer Display */}
              <div className="relative">
                {/* Circular Progress */}
                <div className="w-72 h-72 mx-auto relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="144"
                      cy="144"
                      r="136"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-secondary"
                    />
                    <circle
                      cx="144"
                      cy="144"
                      r="136"
                      fill="none"
                      stroke="url(#timerGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 136}`}
                      strokeDashoffset={`${2 * Math.PI * 136 * (1 - calculateProgress() / 100)}`}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(235, 65%, 52%)" />
                        <stop offset="100%" stopColor="hsl(265, 65%, 55%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Time Display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-6xl font-bold tracking-tight">
                      {formatTime(state.timeRemaining)}
                    </span>
                    <span className="text-muted-foreground mt-2">
                      {TIMER_PRESETS[state.mode].label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button variant="ghost" size="icon" onClick={resetTimer}>
                  <RotateCcw className="w-5 h-5" />
                </Button>
                
                <Button 
                  variant="hero" 
                  size="xl"
                  onClick={toggleTimer}
                  className="w-20 h-20 rounded-full"
                >
                  {state.isRunning ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </Button>

                <Button variant="ghost" size="icon" onClick={skipToNext}>
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Session Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card variant="stats" className="p-4 text-center">
              <Clock className="w-5 h-5 mx-auto text-primary mb-2" />
              <p className="font-display text-2xl font-bold">{state.completedPomodoros}</p>
              <p className="text-xs text-muted-foreground">Pomodoros</p>
            </Card>
            <Card variant="stats" className="p-4 text-center">
              <Target className="w-5 h-5 mx-auto text-success mb-2" />
              <p className="font-display text-2xl font-bold">{state.completedPomodoros * 25}</p>
              <p className="text-xs text-muted-foreground">Minutes</p>
            </Card>
            <Card variant="stats" className="p-4 text-center">
              <CheckCircle2 className="w-5 h-5 mx-auto text-accent mb-2" />
              <p className="font-display text-2xl font-bold">4</p>
              <p className="text-xs text-muted-foreground">Goal</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PomodoroPage;
