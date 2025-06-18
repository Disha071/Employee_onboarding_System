
import { useState } from 'react';
import { MessageCircle, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m your onboarding assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const commonQuestions = [
    'Where can I upload my documents?',
    'How long does onboarding take?',
    'Who is my manager?',
    'What are my benefits?',
    'Where is the office located?',
  ];

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      message: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Generate bot response (simplified AI simulation)
    const botResponse = generateBotResponse(message);
    const botMessage = {
      id: messages.length + 2,
      type: 'bot' as const,
      message: botResponse,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInputMessage('');
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('document') || lowerMessage.includes('upload')) {
      return 'You can upload your documents in the Documents tab. Required documents include Government ID, Address Proof, Educational Certificates, and Medical Certificate.';
    }
    if (lowerMessage.includes('long') || lowerMessage.includes('time')) {
      return 'The onboarding process typically takes 3-5 business days to complete, depending on how quickly you submit your documents and complete training modules.';
    }
    if (lowerMessage.includes('manager') || lowerMessage.includes('supervisor')) {
      return 'Your manager details will be available in your profile section once HR assigns you to a team. You can also check with HR for immediate assistance.';
    }
    if (lowerMessage.includes('benefit')) {
      return 'You can find detailed information about benefits in the Benefits Overview training module. This includes health insurance, retirement plans, and other perks.';
    }
    if (lowerMessage.includes('office') || lowerMessage.includes('location')) {
      return 'Office location and directions will be shared via email. You can also find this information in your welcome packet or contact HR.';
    }
    
    return 'I understand your question. For specific queries, please contact HR at hr@company.com or call (555) 123-4567. I can help with general onboarding questions!';
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <span>Onboarding Assistant</span>
        </CardTitle>
        <CardDescription>
          Ask me anything about your onboarding process
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 space-y-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {msg.type === 'bot' && <Bot className="h-4 w-4 mt-1 text-blue-600" />}
                  {msg.type === 'user' && <User className="h-4 w-4 mt-1" />}
                  <div>
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Questions */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Quick Questions:</p>
          <div className="flex flex-wrap gap-2">
            {commonQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickQuestion(question)}
                className="text-xs"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your question..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(inputMessage);
              }
            }}
          />
          <Button 
            onClick={() => handleSendMessage(inputMessage)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;
