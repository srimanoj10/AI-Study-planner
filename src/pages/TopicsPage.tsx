import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  BookOpen, 
  Search,
  Filter,
  AlertTriangle,
  Clock,
  TrendingUp,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockTopics, mockSubjects, getSubjectById } from '@/data/mockData';
import { Topic } from '@/types/study';

const TopicsPage = () => {
  const [topics, setTopics] = useState<Topic[]>(mockTopics);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !selectedSubject || topic.subjectId === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const updateConfidence = (topicId: string, confidence: number) => {
    setTopics(topics.map(t => 
      t.id === topicId ? { 
        ...t, 
        confidenceLevel: confidence as 1 | 2 | 3 | 4 | 5,
        priority: confidence <= 2 ? 'high' : confidence === 3 ? 'medium' : 'low'
      } : t
    ));
  };

  const getConfidenceLabel = (level: number) => {
    const labels = ['Very Weak', 'Weak', 'Average', 'Good', 'Excellent'];
    return labels[level - 1];
  };

  const formatLastStudied = (date: Date | null) => {
    if (!date) return 'Never studied';
    const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return `${Math.floor(days / 7)} weeks ago`;
  };

  // Group topics by subject
  const topicsBySubject = mockSubjects.map(subject => ({
    subject,
    topics: filteredTopics.filter(t => t.subjectId === subject.id),
    avgConfidence: filteredTopics
      .filter(t => t.subjectId === subject.id)
      .reduce((sum, t) => sum + t.confidenceLevel, 0) / 
      filteredTopics.filter(t => t.subjectId === subject.id).length || 0,
  }));

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
              <Link to="/topics" className="text-sm font-medium text-primary">Topics</Link>
              <Link to="/progress" className="text-sm font-medium text-muted-foreground hover:text-foreground">Progress</Link>
              <Link to="/pomodoro" className="text-sm font-medium text-muted-foreground hover:text-foreground">Focus</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Topic Confidence</h1>
          <p className="text-muted-foreground">
            Track and update your confidence levels for each topic
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={!selectedSubject ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setSelectedSubject(null)}
            >
              All
            </Button>
            {mockSubjects.map(subject => (
              <Button
                key={subject.id}
                variant={selectedSubject === subject.id ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setSelectedSubject(subject.id)}
              >
                <span className="mr-1">{subject.icon}</span>
                {subject.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card variant="stats" className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold">{topics.filter(t => t.confidenceLevel <= 2).length}</p>
                <p className="text-xs text-muted-foreground">Weak Topics</p>
              </div>
            </div>
          </Card>
          <Card variant="stats" className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold">{topics.filter(t => !t.lastStudied || (Date.now() - t.lastStudied.getTime()) > 7 * 24 * 60 * 60 * 1000).length}</p>
                <p className="text-xs text-muted-foreground">Need Revision</p>
              </div>
            </div>
          </Card>
          <Card variant="stats" className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold">{topics.filter(t => t.confidenceLevel >= 4).length}</p>
                <p className="text-xs text-muted-foreground">Strong Topics</p>
              </div>
            </div>
          </Card>
          <Card variant="stats" className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold">{topics.length}</p>
                <p className="text-xs text-muted-foreground">Total Topics</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Topics by Subject */}
        <div className="space-y-6">
          {topicsBySubject.filter(g => g.topics.length > 0).map(({ subject, topics: subjectTopics, avgConfidence }) => (
            <Card key={subject.id} variant="elevated">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{subject.icon}</span>
                  <div>
                    <CardTitle>{subject.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {subjectTopics.length} topics · Avg confidence: {avgConfidence.toFixed(1)}/5
                    </p>
                  </div>
                </div>
                <Progress 
                  value={avgConfidence * 20} 
                  className="w-24" 
                  size="sm"
                  indicatorColor={avgConfidence <= 2 ? 'destructive' : avgConfidence <= 3 ? 'warning' : 'success'}
                />
              </CardHeader>
              <CardContent className="space-y-3">
                {subjectTopics.map(topic => (
                  <div 
                    key={topic.id}
                    className="border rounded-xl overflow-hidden"
                  >
                    <button
                      className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors text-left"
                      onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                    >
                      {/* Priority indicator */}
                      <div className={`w-1.5 h-12 rounded-full ${
                        topic.priority === 'high' ? 'bg-destructive' :
                        topic.priority === 'medium' ? 'bg-warning' : 'bg-success'
                      }`} />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{topic.name}</span>
                          <Badge variant={topic.priority as 'low' | 'medium' | 'high'}>
                            {topic.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Confidence: {getConfidenceLabel(topic.confidenceLevel)}</span>
                          <span>·</span>
                          <span>{formatLastStudied(topic.lastStudied)}</span>
                          <span>·</span>
                          <span>{topic.mistakeFrequency} mistakes</span>
                        </div>
                      </div>

                      <Progress 
                        value={topic.confidenceLevel * 20} 
                        className="w-20"
                        size="sm"
                        indicatorColor={topic.confidenceLevel <= 2 ? 'destructive' : topic.confidenceLevel <= 3 ? 'warning' : 'success'}
                      />
                      
                      <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${
                        expandedTopic === topic.id ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* Expanded content */}
                    {expandedTopic === topic.id && (
                      <div className="px-4 pb-4 pt-2 border-t bg-secondary/20">
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Update Confidence</span>
                              <Badge variant={topic.confidenceLevel <= 2 ? 'high' : topic.confidenceLevel === 3 ? 'medium' : 'low'}>
                                {getConfidenceLabel(topic.confidenceLevel)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-muted-foreground">Weak</span>
                              <Slider
                                value={[topic.confidenceLevel]}
                                onValueChange={(value) => updateConfidence(topic.id, value[0])}
                                min={1}
                                max={5}
                                step={1}
                                className="flex-1"
                              />
                              <span className="text-xs text-muted-foreground">Strong</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="p-3 rounded-lg bg-card">
                              <p className="font-display text-xl font-bold">{topic.totalStudyTime}m</p>
                              <p className="text-xs text-muted-foreground">Total Time</p>
                            </div>
                            <div className="p-3 rounded-lg bg-card">
                              <p className="font-display text-xl font-bold">{topic.revisionsDone}</p>
                              <p className="text-xs text-muted-foreground">Revisions</p>
                            </div>
                            <div className="p-3 rounded-lg bg-card">
                              <p className="font-display text-xl font-bold">{topic.mistakeFrequency}</p>
                              <p className="text-xs text-muted-foreground">Mistakes</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Link to="/pomodoro" className="flex-1">
                              <Button variant="hero" className="w-full">
                                Start Studying
                              </Button>
                            </Link>
                            <Button variant="secondary">
                              Schedule Revision
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TopicsPage;
