
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Users, Bot, FileCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleEmployeePortalClick = () => {
    if (user) {
      navigate('/employee-dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleAdminDashboardClick = () => {
    if (user) {
      navigate('/admin-dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">OnboardAI</span>
            </div>
            <div className="flex space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Welcome, {user.name}!</span>
                  <Button
                    onClick={() => navigate(user.role === 'admin' ? '/admin-dashboard' : '/employee-dashboard')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Smart Employee
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              {" "}Onboarding
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your hiring process with AI-powered onboarding. Reduce manual effort, 
            improve employee experience, and track progress in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleEmployeePortalClick}
            >
              Employee Portal
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={handleAdminDashboardClick}
            >
              Admin Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything you need for efficient onboarding
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-blue-100">
            <CardHeader>
              <Users className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle className="text-gray-900">Employee Portal</CardTitle>
              <CardDescription>
                Complete profile setup, document upload, and training modules with progress tracking
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-green-100">
            <CardHeader>
              <Bot className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle className="text-gray-900">AI Assistant</CardTitle>
              <CardDescription>
                Smart chatbot trained on company FAQs to provide instant onboarding support
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-purple-100">
            <CardHeader>
              <FileCheck className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle className="text-gray-900">Document Management</CardTitle>
              <CardDescription>
                Secure upload and verification of ID, certificates, and other required documents
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-orange-100">
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-orange-600 mb-2" />
              <CardTitle className="text-gray-900">Admin Analytics</CardTitle>
              <CardDescription>
                Real-time dashboard with new hire analytics and progress monitoring
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-red-100">
            <CardHeader>
              <Building2 className="h-10 w-10 text-red-600 mb-2" />
              <CardTitle className="text-gray-900">Training Modules</CardTitle>
              <CardDescription>
                Interactive training content with progress bars and completion certificates
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-indigo-100">
            <CardHeader>
              <FileCheck className="h-10 w-10 text-indigo-600 mb-2" />
              <CardTitle className="text-gray-900">PDF Reports</CardTitle>
              <CardDescription>
                AI-generated onboarding summaries and downloadable completion reports
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to transform your onboarding process?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join companies already using OnboardAI to create seamless employee experiences
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-6 w-6" />
            <span className="text-lg font-semibold">OnboardAI</span>
          </div>
          <p className="text-gray-400">
            © 2024 OnboardAI. Streamlining employee onboarding with artificial intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
