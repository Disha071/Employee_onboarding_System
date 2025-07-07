
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressOverviewProps {
  overallProgress: number;
}

const ProgressOverview = ({ overallProgress }: ProgressOverviewProps) => {
  return (
    <div className="mb-8">
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">🚀 Onboarding Progress</CardTitle>
          <CardDescription className="text-blue-100">
            You're making great progress! Keep going to complete your onboarding. ✨
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Overall Completion</span>
              <span>{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3 bg-blue-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressOverview;
