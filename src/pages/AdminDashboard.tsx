
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileCheck, TrendingUp, Clock, UserPlus, Upload, Download, Search, Home, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { employeeService, Employee, DocumentSubmission } from '@/services/employeeService';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [pendingDocuments, setPendingDocuments] = useState<DocumentSubmission[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Load data on component mount
  useEffect(() => {
    const loadData = () => {
      setEmployees(employeeService.getEmployees());
      setPendingDocuments(employeeService.getPendingDocuments());
    };

    loadData();
    
    // Refresh data every 5 seconds to catch updates
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const stats = [
    {
      title: 'Total New Hires',
      value: employees.length.toString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Pending Verifications',
      value: pendingDocuments.length.toString(),
      icon: FileCheck,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Completed This Month',
      value: employees.filter(emp => emp.progress >= 100).length.toString(),
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

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleVerifyDocument = (docId: number) => {
    employeeService.verifyDocument(docId);
    setPendingDocuments(employeeService.getPendingDocuments());
    toast({
      title: "Document Verified",
      description: "Document has been successfully verified.",
    });
  };

  const handleDownloadReport = () => {
    try {
      const report = employeeService.generateCompletionReport();
      
      const reportContent = `
ONBOARDING COMPLETION REPORT
Generated: ${new Date(report.generatedAt).toLocaleString()}

SUMMARY:
- Total Employees: ${report.totalEmployees}
- Completed Onboarding: ${report.completedOnboarding}
- Completion Rate: ${report.completionRate}%

COMPLETED EMPLOYEES:
${report.employees.map(emp => 
  `- ${emp.name} (${emp.department}) - Started: ${emp.startDate}`
).join('\n')}

PENDING EMPLOYEES:
${report.pendingEmployees.map(emp => 
  `- ${emp.name} (${emp.department}) - Progress: ${emp.progress}%`
).join('\n')}
      `.trim();

      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `onboarding-report-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Report Downloaded",
        description: "Onboarding completion report has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
    }
  };

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
                <Input 
                  type="text" 
                  placeholder="Search employees..." 
                  className="sm:w-48 md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
            
            {filteredEmployees.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No employees found. Add new employees using the "Add New Employee" button.</p>
                </CardContent>
              </Card>
            ) : (
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
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{employee.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{employee.startDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Progress value={employee.progress} className="h-2 rounded-full" />
                          <div className="text-sm text-gray-500 mt-1">{employee.progress}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => handleViewDetails(employee)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Employee Details</DialogTitle>
                                <DialogDescription>
                                  Complete information for {selectedEmployee?.name}
                                </DialogDescription>
                              </DialogHeader>
                              {selectedEmployee && (
                                <div className="grid grid-cols-2 gap-4 py-4">
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                                    <p className="text-sm text-gray-900">{selectedEmployee.name}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Email</label>
                                    <p className="text-sm text-gray-900">{selectedEmployee.email}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Phone</label>
                                    <p className="text-sm text-gray-900">{selectedEmployee.phone}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Department</label>
                                    <p className="text-sm text-gray-900">{selectedEmployee.department}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Position</label>
                                    <p className="text-sm text-gray-900">{selectedEmployee.position}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Manager</label>
                                    <p className="text-sm text-gray-900">{selectedEmployee.manager || 'Not assigned'}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Work Location</label>
                                    <p className="text-sm text-gray-900">{selectedEmployee.workLocation || 'Not specified'}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Start Date</label>
                                    <p className="text-sm text-gray-900">{selectedEmployee.startDate}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <label className="text-sm font-medium text-gray-500">Onboarding Progress</label>
                                    <div className="mt-2">
                                      <Progress value={selectedEmployee.progress} className="h-3" />
                                      <p className="text-sm text-gray-500 mt-1">{selectedEmployee.progress}% completed</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          {/* Pending Documents Tab */}
          <TabsContent value="pending-docs" className="space-y-4">
            <h2 className="text-xl font-semibold text-orange-600">Pending Document Verifications</h2>
            
            {pendingDocuments.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No pending document verifications.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File Name
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
                          <div className="text-sm font-medium text-gray-900">{doc.employeeName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{doc.documentType}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{doc.fileName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(doc.submittedAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Button 
                            size="sm"
                            onClick={() => handleVerifyDocument(doc.id)}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Verify
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <h2 className="text-xl font-semibold text-green-600">Onboarding Reports</h2>
            <Card>
              <CardHeader>
                <CardTitle>Completion Report</CardTitle>
                <CardDescription>Download a summary of completed onboarding tasks and employee progress.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleDownloadReport}>
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
