
import React, { useState } from 'react';
import { Brain, BookOpen, Code, Image, Lightbulb, Target, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [userInput, setUserInput] = useState('');
  const [userLevel, setUserLevel] = useState('');

  const features = [
    {
      icon: Brain,
      title: "Adaptive Learning",
      description: "I adjust my teaching style based on how you learn best",
      color: "text-purple-500"
    },
    {
      icon: BookOpen,
      title: "Step-by-Step Teaching",
      description: "Complex topics broken down into simple, digestible pieces",
      color: "text-blue-500"
    },
    {
      icon: Code,
      title: "Interactive Coding",
      description: "Learn programming with hands-on examples and debugging help",
      color: "text-green-500"
    },
    {
      icon: Image,
      title: "Visual Learning",
      description: "Diagrams, flowcharts, and images to make concepts crystal clear",
      color: "text-orange-500"
    },
    {
      icon: Lightbulb,
      title: "Creative Problem Solving",
      description: "Encourage innovative thinking and deep understanding",
      color: "text-yellow-500"
    },
    {
      icon: Target,
      title: "Personalized Goals",
      description: "Custom learning paths tailored to your objectives",
      color: "text-red-500"
    }
  ];

  const subjects = [
    "JavaScript & Web Development",
    "Python Programming", 
    "Mathematics & Statistics",
    "Science & Physics",
    "Art & Design",
    "Business & Economics",
    "Languages & Literature",
    "Music & Audio"
  ];

  const learningStyles = [
    { name: "Beginner", desc: "New to this topic" },
    { name: "Intermediate", desc: "Some experience" },
    { name: "Advanced", desc: "Looking for challenges" },
    { name: "Expert", desc: "Want deep discussions" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  MentorAI
                </h1>
                <p className="text-sm text-slate-600">Your Adaptive Learning Companion</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700">
              AI-Powered Education
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Learn Anything,
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}Your Way
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            I'm not just another AI - I'm your personal learning mentor who adapts to your style, 
            challenges your thinking, and helps you build deep understanding through interactive teaching.
          </p>
          
          {/* Quick Start Learning */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6">What would you like to learn today?</h3>
            
            <div className="space-y-4">
              <Textarea 
                placeholder="Ask me anything! For example: 'Teach me React with visual examples' or 'Help me understand calculus step-by-step'"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="min-h-[100px] border-slate-300 focus:border-purple-500 focus:ring-purple-500"
              />
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your level:</label>
                  <select 
                    className="w-full p-3 border border-slate-300 rounded-lg focus:border-purple-500 focus:ring-purple-500"
                    value={userLevel}
                    onChange={(e) => setUserLevel(e.target.value)}
                  >
                    <option value="">Select your level</option>
                    {learningStyles.map((style) => (
                      <option key={style.name} value={style.name}>
                        {style.name} - {style.desc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Learning!
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
          How I Help You Learn Better
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-white/60 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className={`${feature.color} mb-4`}>
                    <Icon className="h-10 w-10" />
                  </div>
                  <CardTitle className="text-slate-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Subject Areas */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
          Popular Learning Areas
        </h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjects.map((subject, index) => (
            <div 
              key={index}
              className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <p className="font-semibold text-slate-800">{subject}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Example Interactions */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
          Example Learning Sessions
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-800">Interactive Coding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="bg-white/60 p-3 rounded-lg">
                  <strong>You:</strong> "Teach me JavaScript with mini-quizzes"
                </div>
                <div className="bg-purple-100/60 p-3 rounded-lg">
                  <strong>MentorAI:</strong> "Let's start with variables! Here's a visual diagram... Now try this quiz: What happens when you add '5' + 3 in JavaScript?"
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Visual Science</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="bg-white/60 p-3 rounded-lg">
                  <strong>You:</strong> "Explain photosynthesis with diagrams"
                </div>
                <div className="bg-green-100/60 p-3 rounded-lg">
                  <strong>MentorAI:</strong> "Perfect! Let me create a flowchart showing how plants convert sunlight to energy... [generates visual diagram]"
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Transform Your Learning?</h3>
          <p className="text-xl mb-8 text-purple-100">
            Start a conversation and experience personalized, adaptive education
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-purple-600 hover:bg-slate-100 font-semibold py-3 px-8 rounded-xl transition-all duration-300"
          >
            <Users className="mr-2 h-5 w-5" />
            Begin Learning Journey
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-bold">MentorAI</h4>
            </div>
            <p className="text-slate-400">
              Empowering learners worldwide with adaptive, interactive AI education
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
