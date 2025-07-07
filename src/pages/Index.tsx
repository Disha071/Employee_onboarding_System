
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Users, Bot, FileCheck, TrendingUp, ArrowRight, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import MotivationalQuote from '@/components/MotivationalQuote';

const Index = () => {
  const { user, logout, loading } = useAuth();
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

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-blue-100 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                OnboardAI ✨
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 px-3 py-2 rounded-full">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Welcome, {user.name}! 👋</span>
                  </div>
                  <Button
                    onClick={() => navigate(user.role === 'admin' ? '/admin-dashboard' : '/employee-dashboard')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  >
                    Go to Dashboard 🚀
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      Login 🔑
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                      Get Started 🎉
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
          <div className="animate-bounce mb-6">
            <span className="text-6xl">🚀</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Smart Employee
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Onboarding ✨
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Streamline your hiring process with AI-powered onboarding 🤖. Reduce manual effort, 
            improve employee experience, and track progress in real-time! 📈
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={handleEmployeePortalClick}
            >
              Employee Portal 👨‍💼
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={handleAdminDashboardClick}
            >
              Admin Dashboard 👩‍💻
            </Button>
          </div>

          {/* Motivational Quote Section */}
          <div className="max-w-2xl mx-auto mb-16">
            <MotivationalQuote />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need for efficient onboarding 🌟
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Transform your workplace with our magical onboarding experience! ✨
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-2xl transition-all duration-300 border-blue-100 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transform hover:scale-105">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-3">
                <Users className="h-10 w-10 text-blue-600" />
                <span className="text-2xl">👥</span>
              </div>
              <CardTitle className="text-gray-900 dark:text-white">Employee Portal</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Complete profile setup, document upload, and training modules with progress tracking 📊
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 border-green-100 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transform hover:scale-105">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-3">
                <Bot className="h-10 w-10 text-green-600" />
                <span className="text-2xl">🤖</span>
              </div>
              <CardTitle className="text-gray-900 dark:text-white">AI Assistant</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Smart chatbot trained on company FAQs to provide instant onboarding support 💬
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 border-purple-100 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transform hover:scale-105">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-3">
                <FileCheck className="h-10 w-10 text-purple-600" />
                <span className="text-2xl">📄</span>
              </div>
              <CardTitle className="text-gray-900 dark:text-white">Document Management</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Secure upload and verification of ID, certificates, and other required documents 🔒
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 border-orange-100 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transform hover:scale-105">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-3">
                <TrendingUp className="h-10 w-10 text-orange-600" />
                <span className="text-2xl">📈</span>
              </div>
              <CardTitle className="text-gray-900 dark:text-white">Admin Analytics</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Real-time dashboard with new hire analytics and progress monitoring 📋
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 border-red-100 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transform hover:scale-105">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-3">
                <Building2 className="h-10 w-10 text-red-600" />
                <span className="text-2xl">🎓</span>
              </div>
              <CardTitle className="text-gray-900 dark:text-white">Training Modules</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Interactive training content with progress bars and completion certificates 🏆
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 border-indigo-100 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transform hover:scale-105">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-3">
                <FileCheck className="h-10 w-10 text-indigo-600" />
                <span className="text-2xl">📊</span>
              </div>
              <CardTitle className="text-gray-900 dark:text-white">PDF Reports</CardTitle>
              <CardDescription className="dark:text-gray-300">
                AI-generated onboarding summaries and downloadable completion reports 📋
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-bounce mb-4">
            <span className="text-4xl">🎯</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to transform your onboarding process? ✨
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join companies already using OnboardAI to create seamless employee experiences 🚀
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl transform hover:scale-105 transition-all duration-300">
              Start Your Journey 🌟
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold">OnboardAI ✨</span>
          </div>
          <p className="text-gray-400">
            © 2024 OnboardAI. Streamlining employee onboarding with artificial intelligence 🤖💫
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
