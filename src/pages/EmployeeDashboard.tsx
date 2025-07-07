
import { useState, useEffect } from 'react';
import { User, FileText, BookOpen, MessageCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import DocumentUpload from '@/components/DocumentUpload';
import TrainingModules from '@/components/TrainingModules';
import ChatBot from '@/components/ChatBot';
import EmployeeHeader from '@/components/EmployeeHeader';
import ProgressOverview from '@/components/ProgressOverview';
import StatsGrid from '@/components/StatsGrid';
import ProfileTab from '@/components/ProfileTab';

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
            title: "Success ✅",
            description: "Profile picture updated successfully! 🎉",
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
EMPLOYEE ONBOARDING SUMMARY 📋
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
      title: "Success ✅",
      description: "Onboarding summary downloaded successfully! 📄",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EmployeeHeader 
        userName={user?.name} 
        onDownloadSummary={handleDownloadSummary}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressOverview overallProgress={overallProgress} />

        <StatsGrid 
          profileComplete={profileComplete}
          documentsUploaded={documentsUploaded}
          trainingComplete={trainingComplete}
          overallProgress={overallProgress}
          user={user}
        />

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
            <ProfileTab 
              user={user} 
              onProfilePictureUpload={handleProfilePictureUpload}
            />
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
