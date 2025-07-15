
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Brain, User, Settings, BarChart3, BookOpen } from 'lucide-react';
import { useUser, UserPreferences } from '@/hooks/useUser';
import { useToast } from '@/hooks/use-toast';

const Account = () => {
  const { user, createUser, saveUserData, clearUser } = useUser();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    learningLevel: user?.preferences.learningLevel || 'beginner',
    favoriteSubjects: user?.preferences.favoriteSubjects || [],
    learningStyle: user?.preferences.learningStyle || 'visual',
  });

  const subjects = [
    'JavaScript & Web Development',
    'Python Programming', 
    'Mathematics & Statistics',
    'Science & Physics',
    'Art & Design',
    'Business & Economics',
    'Languages & Literature',
    'Music & Audio'
  ];

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      favoriteSubjects: prev.favoriteSubjects.includes(subject)
        ? prev.favoriteSubjects.filter(s => s !== subject)
        : [...prev.favoriteSubjects, subject]
    }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const preferences: UserPreferences = {
      learningLevel: formData.learningLevel as 'beginner' | 'intermediate' | 'advanced' | 'expert',
      favoriteSubjects: formData.favoriteSubjects,
      learningStyle: formData.learningStyle as 'visual' | 'auditory' | 'kinesthetic' | 'reading',
    };

    let result;
    if (user) {
      result = await saveUserData({
        ...user,
        name: formData.name,
        email: formData.email,
        preferences,
      });
    } else {
      result = await createUser(formData.name, formData.email, preferences);
    }

    if (result) {
      toast({
        title: "Success",
        description: "Your profile has been saved!",
      });
      setIsEditing(false);
    } else {
      toast({
        title: "Error",
        description: "Failed to save profile",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    clearUser();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

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
                  Your Account
                </h1>
                <p className="text-sm text-slate-600">Manage your learning profile</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-8">
          {/* Profile Card */}
          <Card className="bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="h-8 w-8 text-purple-600" />
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Your personal learning profile</CardDescription>
                  </div>
                </div>
                {user && (
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {!user && !isEditing ? (
                <div className="text-center py-8">
                  <p className="text-slate-600 mb-4">Create your learning profile to get personalized AI responses!</p>
                  <Button onClick={() => setIsEditing(true)} className="bg-gradient-to-r from-purple-600 to-blue-600">
                    Create Profile
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-slate-50' : ''}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-slate-50' : ''}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="level">Learning Level</Label>
                      <select
                        id="level"
                        value={formData.learningLevel}
                        onChange={(e) => setFormData(prev => ({ ...prev, learningLevel: e.target.value as 'beginner' | 'intermediate' | 'advanced' | 'expert' }))}
                        disabled={!isEditing}
                        className={`w-full p-2 border border-slate-300 rounded-md ${!isEditing ? 'bg-slate-50' : ''}`}
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="style">Learning Style</Label>
                      <select
                        id="style"
                        value={formData.learningStyle}
                        onChange={(e) => setFormData(prev => ({ ...prev, learningStyle: e.target.value as 'visual' | 'auditory' | 'kinesthetic' | 'reading' }))}
                        disabled={!isEditing}
                        className={`w-full p-2 border border-slate-300 rounded-md ${!isEditing ? 'bg-slate-50' : ''}`}
                      >
                        <option value="visual">Visual</option>
                        <option value="auditory">Auditory</option>
                        <option value="kinesthetic">Hands-on</option>
                        <option value="reading">Reading/Writing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label>Favorite Subjects</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                      {subjects.map((subject) => (
                        <Badge
                          key={subject}
                          variant={formData.favoriteSubjects.includes(subject) ? "default" : "outline"}
                          className={`cursor-pointer text-center justify-center ${
                            isEditing ? 'hover:bg-purple-100' : 'cursor-default'
                          }`}
                          onClick={() => isEditing && handleSubjectToggle(subject)}
                        >
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3">
                      <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-blue-600">
                        Save Profile
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Card */}
          {user && (
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                  <div>
                    <CardTitle>Learning Stats</CardTitle>
                    <CardDescription>Your learning journey so far</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{user.totalMessages}</div>
                    <p className="text-slate-600">Messages Sent</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {Math.floor((new Date().getTime() - user.joinDate.getTime()) / (1000 * 60 * 60 * 24))}
                    </div>
                    <p className="text-slate-600">Days Learning</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{user.preferences.favoriteSubjects.length}</div>
                    <p className="text-slate-600">Favorite Subjects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          {user && (
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-3">
                <Button 
                  onClick={() => window.location.href = '/chat'} 
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Start Learning
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
