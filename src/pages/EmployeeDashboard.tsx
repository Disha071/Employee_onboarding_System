
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, FileText, BookOpen, MessageCircle, Download, Upload, CheckCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import DocumentUpload from '@/components/DocumentUpload';
import TrainingModules from '@/components/TrainingModules';
import ChatBot from '@/components/ChatBot';

const EmployeeDashboard = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  
  // Dynamic state management
  const [documentsUploaded, setDocumentsUploaded] = useState(2);
  const [trainingComplete, setTrainingComplete] = useState(3);
  const [profileComplete, setProfileComplete] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);

  // Calculate profile completion based on user data
  useEffect(() => {
    if (user) {
      const hasName = !!user.name;
      const hasEmail = !!user.email;
      const hasProfilePicture = !!user.profilePicture;
      
      const completedFields = [hasName, hasEmail, hasProfilePicture].filter(Boolean).length;
      const totalFields = 3;
      const profileProgress = (completedFields / totalFields) * 100;
      
      setProfileComplete(profileProgress === 100);
    }
  }, [user]);

  // Calculate overall progress
  useEffect(() => {
    const profileProgress = profileComplete ? 100 : (user?.name && user?.email ? 60 : 20);
    const documentProgress = (documentsUploaded / 5) * 100;
    const trainingProgress = (trainingComplete / 8) * 100;
    
    const overall = Math.round((profileProgress + documentProgress + trainingProgress) / 3);
    setOverallProgress(overall);
  }, [profileComplete, documentsUploaded, trainingComplete, user]);

  const stats = [
    {
      title: 'Profile Setup',
      value: profileComplete ? '100%' : (user?.name && user?.email ? (user?.profilePicture ? '100%' : '80%') : '40%'),
      icon: User,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Documents',
      value: `${documentsUploaded}/5`,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Training',
      value: `${trainingComplete}/8`,
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Overall Progress',
      value: `${overallProgress}%`,
      icon: CheckCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const handleProfilePictureUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          updateProfile({ profilePicture: imageUrl });
          toast({
            title: "Success",
            description: "Profile picture updated successfully!",
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Handler to update document count from child component
  const handleDocumentUpdate = (count: number) => {
    setDocumentsUploaded(count);
  };

  // Handler to update training count from child component
  const handleTrainingUpdate = (count: number) => {
    setTrainingComplete(count);
  };

  const handleDownloadSummary = () => {
    const profileProgress = profileComplete ? 100 : (user?.name && user?.email ? (user?.profilePicture ? 100 : 80) : 40);
    
    const summaryContent = `
EMPLOYEE ONBOARDING SUMMARY
============================

Employee Information:
- Name: ${user?.name || 'John Doe'}
- Email: ${user?.email || 'john.doe@company.com'}
- Employee ID: EMP-2024-001
- Department: Engineering
- Start Date: January 15, 2024

Progress Overview:
- Overall Progress: ${overallProgress}%
- Profile Setup: ${profileProgress}%
- Documents Uploaded: ${documentsUploaded}/5
- Training Modules Completed: ${trainingComplete}/8

Document Status:
- Resume: ${documentsUploaded >= 1 ? '✓ Uploaded' : '⏳ Pending'}
- ID Verification: ${documentsUploaded >= 2 ? '✓ Uploaded' : '⏳ Pending'}
- Educational Certificate: ${documentsUploaded >= 3 ? '✓ Uploaded' : '⏳ Pending'}
- Previous Employment: ${documentsUploaded >= 4 ? '✓ Uploaded' : '⏳ Pending'}
- Emergency Contact: ${documentsUploaded >= 5 ? '✓ Uploaded' : '⏳ Pending'}

Training Progress:
- Company Overview: ${trainingComplete >= 1 ? '✓ Completed' : '⏳ Not Started'}
- Code of Conduct: ${trainingComplete >= 2 ? '✓ Completed' : '⏳ Not Started'}
- Safety Guidelines: ${trainingComplete >= 3 ? '✓ Completed' : '⏳ Not Started'}
- IT Security Training: ${trainingComplete >= 4 ? '✓ Completed' : '🔄 In Progress'}
- Benefits Overview: ${trainingComplete >= 5 ? '✓ Completed' : '⏳ Not Started'}
- Performance Management: ${trainingComplete >= 6 ? '✓ Completed' : '⏳ Not Started'}
- Communication Tools: ${trainingComplete >= 7 ? '✓ Completed' : '⏳ Not Started'}
- Team Introduction: ${trainingComplete >= 8 ? '✓ Completed' : '⏳ Not Started'}

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([summaryContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `onboarding-summary-${user?.name?.replace(/\s+/g, '-').toLowerCase() || 'employee'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Onboarding summary downloaded successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name || 'John'}!</p>
            </div>
            <div className="flex space-x-3">
              <Link to="/">
                <Button variant="outline">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Button onClick={handleDownloadSummary} className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Download Summary
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Onboarding Progress</CardTitle>
              <CardDescription className="text-blue-100">
                You're making great progress! Keep going to complete your onboarding.
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

        {/* Stats Grid */}
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Training</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Support</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Complete your profile to help us customize your onboarding experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                  {user?.profilePicture && (
                    <img 
                      src={user.profilePicture} 
                      alt="Profile" 
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Profile Picture</p>
                    <Button onClick={handleProfilePictureUpload} className="bg-blue-600 hover:bg-blue-700 mt-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Update Profile Picture
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <p className="text-lg text-gray-900">{user?.name || 'John Doe'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Employee ID</label>
                    <p className="text-lg text-gray-900">EMP-2024-001</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Department</label>
                    <p className="text-lg text-gray-900">Engineering</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Start Date</label>
                    <p className="text-lg text-gray-900">January 15, 2024</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-lg text-gray-900">{user?.email || 'john.doe@company.com'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Role</label>
                    <p className="text-lg text-gray-900 capitalize">{user?.role || 'Employee'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <DocumentUpload onDocumentCountChange={handleDocumentUpdate} />
          </TabsContent>

          <TabsContent value="training">
            <TrainingModules onTrainingCountChange={handleTrainingUpdate} />
          </TabsContent>

          <TabsContent value="support">
            <ChatBot />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
