
import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Star, Zap } from 'lucide-react';

const motivationalQuotes = [
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts! 💪✨",
    author: "Winston Churchill",
    icon: Sparkles,
    color: "text-blue-600"
  },
  {
    text: "The only way to do great work is to love what you do! 🚀❤️",
    author: "Steve Jobs",
    icon: Heart,
    color: "text-red-600"
  },
  {
    text: "Innovation distinguishes between a leader and a follower! 🌟💡",
    author: "Steve Jobs",
    icon: Star,
    color: "text-yellow-600"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams! 🦋🌈",
    author: "Eleanor Roosevelt",
    icon: Zap,
    color: "text-purple-600"
  },
  {
    text: "Every great journey begins with a single step! 🎯🌟",
    author: "Lao Tzu",
    icon: Sparkles,
    color: "text-green-600"
  },
  {
    text: "Your potential is endless, your journey is unique! 🌸✨",
    author: "Unknown",
    icon: Heart,
    color: "text-pink-600"
  },
  {
    text: "Believe in yourself and all that you are! 🔥💫",
    author: "Christian D. Larson",
    icon: Star,
    color: "text-orange-600"
  },
  {
    text: "Dream big, work hard, stay focused, and surround yourself with good people! 🌟🎉",
    author: "Unknown",
    icon: Zap,
    color: "text-indigo-600"
  }
];

const MotivationalQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    // Change quote on component mount
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setCurrentQuote(randomIndex);
  }, []);

  const quote = motivationalQuotes[currentQuote];
  const IconComponent = quote.icon;

  return (
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800 animate-pulse">
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg ${quote.color}`}>
          <IconComponent className="h-6 w-6 animate-bounce" />
        </div>
        <div className="flex-1">
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 leading-relaxed">
            {quote.text}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            — {quote.author} 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default MotivationalQuote;
