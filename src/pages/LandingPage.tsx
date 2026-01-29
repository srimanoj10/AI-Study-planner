import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Calendar, 
  Target, 
  Timer, 
  TrendingUp, 
  Users, 
  Flame, 
  Sparkles,
  BookOpen,
  BarChart3,
  ArrowRight,
  Check
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Planning',
    description: 'Smart algorithms analyze your weak areas and create personalized study schedules that adapt to your progress.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Timer,
    title: 'Pomodoro Focus Mode',
    description: 'Stay focused with built-in Pomodoro timers, focus sounds, and session tracking for maximum productivity.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Calendar,
    title: 'Spaced Repetition',
    description: 'Never forget what you learn. Our AI schedules revisions at optimal intervals for long-term retention.',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    icon: Flame,
    title: 'Streaks & Rewards',
    description: 'Build study habits with daily streaks, XP points, and achievement badges that keep you motivated.',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    icon: BarChart3,
    title: 'Progress Analytics',
    description: 'Track your study hours, subject progress, and consistency with beautiful, insightful charts.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Users,
    title: 'Group Study',
    description: 'Study together with friends using shared Pomodoro timers and live status updates.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
];

const stats = [
  { value: '10K+', label: 'Active Students' },
  { value: '2M+', label: 'Study Hours' },
  { value: '95%', label: 'Pass Rate' },
  { value: '4.9', label: 'App Rating' },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">StudyAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <Link to="/dashboard">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/setup">
              <Button variant="hero">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Study Planning
            </Badge>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Study Smarter,
              <br />
              <span className="text-gradient-primary">Not Harder</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Let AI create your perfect study plan. Track your progress, build habits, 
              and ace your exams with personalized schedules that adapt to you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/setup">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Create Study Plan
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  View Demo
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} variant="glass" className="p-4">
                  <div className="font-display text-3xl font-bold text-gradient-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="font-display text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed by educators and backed by science to help you achieve your academic goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                variant="feature" 
                className="p-6 opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">How it Works</Badge>
            <h2 className="font-display text-4xl font-bold mb-4">Three Steps to Success</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Set Your Goals', description: 'Tell us about your exam, target score, and available study time.' },
              { step: '02', title: 'Get Your Plan', description: 'AI generates a personalized schedule based on your weak areas and deadlines.' },
              { step: '03', title: 'Track & Improve', description: 'Follow your plan, track progress, and watch your confidence grow.' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full gradient-primary text-primary-foreground font-display text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-glow">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Card variant="gradient" className="p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 gradient-hero opacity-10" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-6 shadow-glow-accent">
                <Target className="w-8 h-8 text-accent-foreground" />
              </div>
              <h2 className="font-display text-4xl font-bold mb-4">Ready to Ace Your Exams?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of students who improved their grades with AI-powered study planning.
              </p>
              <Link to="/setup">
                <Button variant="hero" size="xl">
                  Start Free Today
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold">StudyAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 StudyAI. Built with ❤️ for students everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
