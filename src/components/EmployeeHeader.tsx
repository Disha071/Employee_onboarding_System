
import { Link } from 'react-router-dom';
import { Home, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmployeeHeaderProps {
  userName?: string;
  onDownloadSummary: () => void;
}

const EmployeeHeader = ({ userName, onDownloadSummary }: EmployeeHeaderProps) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard 📊</h1>
            <p className="text-sm text-gray-600">Welcome back, {userName || 'John'}! 🎉</p>
          </div>
          <div className="flex space-x-3">
            <Link to="/">
              <Button variant="outline">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Button onClick={onDownloadSummary} className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Download Summary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHeader;
