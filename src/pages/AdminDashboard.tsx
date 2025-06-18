
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileCheck, TrendingUp, Clock, UserPlus, Upload, Download, Search, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

const AdminDashboard = () => {
  const [newHires] = useState([
    { id: 1, name: 'John Doe', department: 'Engineering', startDate: '2024-01-15', progress: 65 },
    { id: 2, name: 'Jane Smith', department: 'Marketing', startDate: '2024-01-20', progress: 80 },
    { id: 3, name: 'Mike Johnson', department: 'Sales', startDate: '2024-01-25', progress: 45 },
  ]);

  const [pendingDocuments] = useState([
    { id: 1, employee: 'John Doe', document: 'Educational Certificate', submitted: '2024-01-20' },
    { id: 2, employee: 'Jane Smith', document: 'Previous Employment', submitted: '2024-01-21' },
  ]);

  const stats = [
    {
      title: 'Total New Hires',
      value: '24',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Pending Verifications',
      value: '8',
      icon: FileCheck,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Completed This Month',
      value: '16',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Avg. Completion Time',
      value: '5.2 days',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Manage employee onboarding</p>
            </div>
            <div className="flex space-x-3">
              <Link to="/">
                <Button variant="outline">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link to="/add-employee">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New Employee
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
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

        {/* Tabs */}
        <Tabs defaultValue="new-hires" className="space-y-4">
          <TabsList className="flex">
            <TabsTrigger value="new-hires" className="data-[state=active]:bg-gray-100 data-[state=active]:text-blue-600">
              New Hires
            </TabsTrigger>
            <TabsTrigger value="pending-docs" className="data-[state=active]:bg-gray-100 data-[state=active]:text-orange-600">
              Pending Documents
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-gray-100 data-[state=active]:text-green-600">
              Reports
            </TabsTrigger>
          </TabsList>

          {/* New Hires Tab */}
          <TabsContent value="new-hires" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">New Hires</h2>
              <div className="flex items-center space-x-2">
                <Input type="text" placeholder="Search employees..." className="sm:w-48 md:w-64" />
                <Button size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {newHires.map((hire) => (
                    <tr key={hire.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{hire.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{hire.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{hire.startDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Progress value={hire.progress} className="h-2 rounded-full" />
                        <div className="text-sm text-gray-500 mt-1">{hire.progress}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Pending Documents Tab */}
          <TabsContent value="pending-docs" className="space-y-4">
            <h2 className="text-xl font-semibold text-orange-600">Pending Document Verifications</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingDocuments.map((doc) => (
                    <tr key={doc.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{doc.employee}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{doc.document}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{doc.submitted}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Button size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Verify
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <h2 className="text-xl font-semibold text-green-600">Onboarding Reports</h2>
            <Card>
              <CardHeader>
                <CardTitle>Completion Report</CardTitle>
                <CardDescription>Download a summary of completed onboarding tasks.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
