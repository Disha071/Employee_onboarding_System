
import { useState } from 'react';
import { BookOpen, CheckCircle, Play, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const TrainingModules = () => {
  const [modules, setModules] = useState([
    { id: 1, title: 'Company Overview', duration: '30 min', status: 'completed', progress: 100 },
    { id: 2, title: 'Code of Conduct', duration: '45 min', status: 'completed', progress: 100 },
    { id: 3, title: 'Safety Guidelines', duration: '25 min', status: 'completed', progress: 100 },
    { id: 4, title: 'IT Security Training', duration: '60 min', status: 'in-progress', progress: 60 },
    { id: 5, title: 'Benefits Overview', duration: '20 min', status: 'not-started', progress: 0 },
    { id: 6, title: 'Performance Management', duration: '40 min', status: 'not-started', progress: 0 },
    { id: 7, title: 'Communication Tools', duration: '35 min', status: 'not-started', progress: 0 },
    { id: 8, title: 'Team Introduction', duration: '15 min', status: 'not-started', progress: 0 },
  ]);

  const completedCount = modules.filter(module => module.status === 'completed').length;
  const overallProgress = (completedCount / modules.length) * 100;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Play className="h-5 w-5 text-blue-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const handleStartModule = (moduleId: number) => {
    setModules(prev => 
      prev.map(module => 
        module.id === moduleId 
          ? { ...module, status: 'in-progress', progress: 20 }
          : module
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Training Modules</CardTitle>
        <CardDescription>
          Complete your training modules to finish onboarding
        </CardDescription>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{completedCount}/{modules.length} completed</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
            <div className="flex items-center space-x-4">
              {getStatusIcon(module.status)}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium">{module.title}</h3>
                  {getStatusBadge(module.status)}
                </div>
                <p className="text-sm text-gray-500">{module.duration}</p>
                {module.status === 'in-progress' && (
                  <div className="mt-2">
                    <Progress value={module.progress} className="h-1" />
                  </div>
                )}
              </div>
            </div>
            <div>
              {module.status === 'not-started' && (
                <Button 
                  size="sm" 
                  onClick={() => handleStartModule(module.id)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Play className="h-4 w-4 mr-1" />
                  Start
                </Button>
              )}
              {module.status === 'in-progress' && (
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Continue
                </Button>
              )}
              {module.status === 'completed' && (
                <Button size="sm" variant="outline">
                  Review
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TrainingModules;
