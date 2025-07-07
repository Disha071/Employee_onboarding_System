
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileTabProps {
  user?: {
    name?: string;
    email?: string;
    role?: string;
    profilePicture?: string;
  };
  onProfilePictureUpload: () => void;
}

const ProfileTab = ({ user, onProfilePictureUpload }: ProfileTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information 👤</CardTitle>
        <CardDescription>
          Complete your profile to help us customize your onboarding experience ✨
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
            <p className="text-sm text-gray-600">Profile Picture 📸</p>
            <Button onClick={onProfilePictureUpload} className="bg-blue-600 hover:bg-blue-700 mt-2">
              <Upload className="h-4 w-4 mr-2" />
              Update Profile Picture
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name 📝</label>
            <p className="text-lg text-gray-900">{user?.name || 'John Doe'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Employee ID 🆔</label>
            <p className="text-lg text-gray-900">EMP-2024-001</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Department 🏢</label>
            <p className="text-lg text-gray-900">Engineering</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Start Date 📅</label>
            <p className="text-lg text-gray-900">January 15, 2024</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email 📧</label>
            <p className="text-lg text-gray-900">{user?.email || 'john.doe@company.com'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Role 👔</label>
            <p className="text-lg text-gray-900 capitalize">{user?.role || 'Employee'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileTab;
