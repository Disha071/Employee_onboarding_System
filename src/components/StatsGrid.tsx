
import { User, FileText, BookOpen, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatItem {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

interface StatsGridProps {
  profileComplete: boolean;
  documentsUploaded: number;
  trainingComplete: number;
  overallProgress: number;
  user?: { name?: string; email?: string; profilePicture?: string };
}

const StatsGrid = ({ 
  profileComplete, 
  documentsUploaded, 
  trainingComplete, 
  overallProgress, 
  user 
}: StatsGridProps) => {
  const stats: StatItem[] = [
    {
      title: 'Profile Setup 👤',
      value: profileComplete ? '100%' : (user?.name && user?.email ? (user?.profilePicture ? '100%' : '80%') : '40%'),
      icon: User,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Documents 📄',
      value: `${documentsUploaded}/5`,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Training 📚',
      value: `${trainingComplete}/8`,
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Overall Progress 🎯',
      value: `${overallProgress}%`,
      icon: CheckCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor} mr-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
