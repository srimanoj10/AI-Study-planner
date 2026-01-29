import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  Clock, 
  Target,
  Sparkles,
  Check
} from 'lucide-react';

interface SetupData {
  examName: string;
  examDate: string;
  targetScore: string;
  subjects: { name: string; confidence: number }[];
  weekdayTime: number;
  weekendTime: number;
  sessionLength: number;
}

const defaultSubjects = [
  { name: 'Mathematics', confidence: 3 },
  { name: 'Physics', confidence: 3 },
  { name: 'Chemistry', confidence: 3 },
  { name: 'Biology', confidence: 3 },
  { name: 'English', confidence: 3 },
];

const ExamSetupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  
  const [data, setData] = useState<SetupData>({
    examName: '',
    examDate: '',
    targetScore: '',
    subjects: defaultSubjects,
    weekdayTime: 180,
    weekendTime: 300,
    sessionLength: 45,
  });

  const updateSubjectConfidence = (index: number, confidence: number) => {
    const newSubjects = [...data.subjects];
    newSubjects[index].confidence = confidence;
    setData({ ...data, subjects: newSubjects });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save data and navigate to dashboard
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  };

  const getConfidenceLabel = (level: number) => {
    const labels = ['Very Weak', 'Weak', 'Average', 'Good', 'Excellent'];
    return labels[level - 1];
  };

  const getConfidenceColor = (level: number) => {
    const colors = ['text-destructive', 'text-warning', 'text-muted-foreground', 'text-primary', 'text-success'];
    return colors[level - 1];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">StudyAI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
            <Progress value={(step / totalSteps) * 100} className="w-32" indicatorColor="primary" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Exam Details */}
          {step === 1 && (
            <Card variant="elevated" className="animate-scale-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">What are you preparing for?</CardTitle>
                <CardDescription>Tell us about your upcoming exam</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="examName">Exam Name</Label>
                  <Input
                    id="examName"
                    placeholder="e.g., JEE Advanced, SAT, NEET"
                    value={data.examName}
                    onChange={(e) => setData({ ...data, examName: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="examDate">Exam Date</Label>
                  <Input
                    id="examDate"
                    type="date"
                    value={data.examDate}
                    onChange={(e) => setData({ ...data, examDate: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetScore">Target Score (optional)</Label>
                  <Input
                    id="targetScore"
                    placeholder="e.g., 250/360"
                    value={data.targetScore}
                    onChange={(e) => setData({ ...data, targetScore: e.target.value })}
                    className="h-12"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Subject Confidence */}
          {step === 2 && (
            <Card variant="elevated" className="animate-scale-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-2xl">Rate Your Confidence</CardTitle>
                <CardDescription>How confident are you in each subject? Be honest - this helps us prioritize!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {data.subjects.map((subject, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium">{subject.name}</Label>
                      <Badge 
                        variant={subject.confidence <= 2 ? 'high' : subject.confidence === 3 ? 'medium' : 'low'}
                      >
                        {getConfidenceLabel(subject.confidence)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground w-8">Weak</span>
                      <Slider
                        value={[subject.confidence]}
                        onValueChange={(value) => updateSubjectConfidence(index, value[0])}
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-xs text-muted-foreground w-12 text-right">Strong</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Study Time */}
          {step === 3 && (
            <Card variant="elevated" className="animate-scale-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-success flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-success-foreground" />
                </div>
                <CardTitle className="text-2xl">How much time can you study?</CardTitle>
                <CardDescription>Set realistic daily study goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Weekday Study Time</Label>
                    <span className="font-display text-2xl font-bold text-primary">
                      {Math.floor(data.weekdayTime / 60)}h {data.weekdayTime % 60}m
                    </span>
                  </div>
                  <Slider
                    value={[data.weekdayTime]}
                    onValueChange={(value) => setData({ ...data, weekdayTime: value[0] })}
                    min={30}
                    max={480}
                    step={15}
                  />
                  <p className="text-sm text-muted-foreground">Time available on Monday - Friday</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Weekend Study Time</Label>
                    <span className="font-display text-2xl font-bold text-primary">
                      {Math.floor(data.weekendTime / 60)}h {data.weekendTime % 60}m
                    </span>
                  </div>
                  <Slider
                    value={[data.weekendTime]}
                    onValueChange={(value) => setData({ ...data, weekendTime: value[0] })}
                    min={30}
                    max={600}
                    step={15}
                  />
                  <p className="text-sm text-muted-foreground">Time available on Saturday - Sunday</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Preferred Session Length</Label>
                    <span className="font-display text-2xl font-bold text-accent">
                      {data.sessionLength}m
                    </span>
                  </div>
                  <Slider
                    value={[data.sessionLength]}
                    onValueChange={(value) => setData({ ...data, sessionLength: value[0] })}
                    min={25}
                    max={90}
                    step={5}
                  />
                  <p className="text-sm text-muted-foreground">How long each focused study block should be</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <Card variant="elevated" className="animate-scale-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Check className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Ready to Create Your Plan!</CardTitle>
                <CardDescription>Review your settings and let's get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card variant="stats" className="p-4">
                    <div className="text-sm text-muted-foreground">Exam</div>
                    <div className="font-display font-semibold">{data.examName || 'Not set'}</div>
                  </Card>
                  <Card variant="stats" className="p-4">
                    <div className="text-sm text-muted-foreground">Date</div>
                    <div className="font-display font-semibold">
                      {data.examDate ? new Date(data.examDate).toLocaleDateString() : 'Not set'}
                    </div>
                  </Card>
                  <Card variant="stats" className="p-4">
                    <div className="text-sm text-muted-foreground">Weekly Study</div>
                    <div className="font-display font-semibold">
                      {Math.floor((data.weekdayTime * 5 + data.weekendTime * 2) / 60)}h
                    </div>
                  </Card>
                  <Card variant="stats" className="p-4">
                    <div className="text-sm text-muted-foreground">Session Length</div>
                    <div className="font-display font-semibold">{data.sessionLength}m</div>
                  </Card>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground mb-3 block">Weak Subjects (Priority)</Label>
                  <div className="flex flex-wrap gap-2">
                    {data.subjects
                      .filter(s => s.confidence <= 2)
                      .map((subject, index) => (
                        <Badge key={index} variant="high">{subject.name}</Badge>
                      ))}
                    {data.subjects.filter(s => s.confidence <= 2).length === 0 && (
                      <span className="text-sm text-muted-foreground">No weak subjects - great!</span>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                  <p className="text-sm text-success font-medium">
                    ✨ AI will now generate your personalized study plan based on your goals and schedule.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {step === 1 ? 'Back to Home' : 'Previous'}
            </Button>
            <Button variant="hero" onClick={handleNext}>
              {step === totalSteps ? 'Create My Plan' : 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamSetupPage;
