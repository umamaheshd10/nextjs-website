"use client";

import React, { useState, useEffect } from 'react';
import { recommendSkillSwap } from '@/utils/warpAI';

// Types for recommendation system
interface User {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  bio?: string;
  rating?: number;
  completedSwaps?: number;
}

interface SkillRecommendation {
  userId: string;
  userName: string;
  matchScore: number;
  matchingSkills: string[];
  complementarySkills: string[];
}

export default function RecommendationsPage() {
  const [userSkills, setUserSkills] = useState<string[]>(['React Development', 'JavaScript', 'UI/UX Design']);
  const [newSkill, setNewSkill] = useState<string>('');
  const [recommendations, setRecommendations] = useState<SkillRecommendation[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Mock users data
  const mockUsers: User[] = [
    {
      id: '101',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      skills: ['Node.js', 'Python', 'DevOps', 'AWS'],
      bio: 'Full-stack developer with 5+ years experience',
      rating: 4.9,
      completedSwaps: 23
    },
    {
      id: '102',
      name: 'Michael Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
      bio: 'Marketing specialist helping businesses grow',
      rating: 4.7,
      completedSwaps: 18
    },
    {
      id: '103',
      name: 'Emily Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      skills: ['Machine Learning', 'Data Science', 'Python', 'TensorFlow'],
      bio: 'AI researcher and data science consultant',
      rating: 4.8,
      completedSwaps: 31
    },
    {
      id: '104',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      skills: ['Mobile Development', 'React Native', 'iOS', 'Flutter'],
      bio: 'Mobile app developer and startup founder',
      rating: 4.6,
      completedSwaps: 15
    },
    {
      id: '105',
      name: 'Lisa Wang',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      skills: ['Graphic Design', 'Brand Identity', 'Adobe Creative Suite', 'Web Design'],
      bio: 'Creative designer with passion for visual storytelling',
      rating: 4.9,
      completedSwaps: 27
    },
    {
      id: '106',
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      skills: ['DevOps', 'Kubernetes', 'Docker', 'Cloud Architecture'],
      bio: 'DevOps engineer specializing in cloud infrastructure',
      rating: 4.5,
      completedSwaps: 22
    },
    {
      id: '107',
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face',
      skills: ['Product Management', 'Agile', 'User Research', 'Strategy'],
      bio: 'Product manager with experience in tech startups',
      rating: 4.8,
      completedSwaps: 19
    },
    {
      id: '108',
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
      skills: ['Cybersecurity', 'Network Security', 'Ethical Hacking', 'Risk Assessment'],
      bio: 'Cybersecurity expert and consultant',
      rating: 4.7,
      completedSwaps: 14
    }
  ];

  useEffect(() => {
    setAllUsers(mockUsers);
  }, []);

  const handleAddSkill = () => {
    if (newSkill.trim() && !userSkills.includes(newSkill.trim())) {
      setUserSkills([...userSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setUserSkills(userSkills.filter(skill => skill !== skillToRemove));
  };

  const handleGetRecommendations = async () => {
    if (userSkills.length === 0) {
      setError('Please add at least one skill to get recommendations');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const allUsersSkills = allUsers.map(user => ({
        id: user.id,
        name: user.name,
        skills: user.skills
      }));

      const recommendations = await recommendSkillSwap(userSkills, allUsersSkills);
      setRecommendations(recommendations);
    } catch (err) {
      setError('Failed to generate recommendations. Please try again.');
      console.error('Recommendation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getUserById = (userId: string): User | undefined => {
    return allUsers.find(user => user.id === userId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900 rounded-full mb-6">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:text-5xl">
            AI-Powered Skill Recommendations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the perfect skill swap partners using advanced AI matching algorithms. 
            Get personalized recommendations based on your skills and learning goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Skills */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Your Skills</h2>
              
              {/* Add Skill Input */}
              <div className="mb-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    placeholder="Add a skill..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <button
                    onClick={handleAddSkill}
                    disabled={!newSkill.trim()}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-2 mb-6">
                {userSkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg">
                    <span className="text-green-800 dark:text-green-200 font-medium">{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-green-600 dark:text-green-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Get Recommendations Button */}
              <button
                onClick={handleGetRecommendations}
                disabled={loading || userSkills.length === 0}
                className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 rounded-lg shadow-lg hover:shadow-xl disabled:shadow-md focus:outline-none focus:ring-4 focus:ring-green-500 transition-all duration-200 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Skills...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Get AI Recommendations
                  </>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Recommendations */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recommended Partners ({recommendations.length})
                </h2>
                {recommendations.length > 0 && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Sorted by compatibility score
                  </div>
                )}
              </div>

              {recommendations.length === 0 && !loading ? (
                <div className="text-center py-12">
                  <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No recommendations yet</p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">
                    Add your skills and click "Get AI Recommendations" to find the perfect swap partners
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recommendations.map((rec, index) => {
                    const user = getUserById(rec.userId);
                    if (!user) return null;

                    return (
                      <div key={rec.userId} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-600"
                              />
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                {index + 1}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">{user.bio}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                  </svg>
                                  {user.rating}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {user.completedSwaps} swaps
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                              {rec.matchScore}/10
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Match Score</div>
                          </div>
                        </div>

                        {/* Skills Analysis */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {rec.matchingSkills.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Common Interests</h4>
                              <div className="flex flex-wrap gap-1">
                                {rec.matchingSkills.map((skill, idx) => (
                                  <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {rec.complementarySkills.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">You Can Learn</h4>
                              <div className="flex flex-wrap gap-1">
                                {rec.complementarySkills.map((skill, idx) => (
                                  <span key={idx} className="px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm">
                            Request Swap
                          </button>
                          <button className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium rounded-lg transition-colors text-sm">
                            View Profile
                          </button>
                          <button className="px-4 py-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">How AI Recommendations Work</h2>
            <p className="text-green-100 max-w-2xl mx-auto">
              Our advanced AI analyzes skill compatibility, learning potential, and user preferences to find your ideal swap partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-white/20 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Skill Analysis</h3>
              <p className="text-sm text-green-100">AI analyzes your skills and identifies learning opportunities</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-white/20 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Smart Matching</h3>
              <p className="text-sm text-green-100">Finds users with complementary skills for mutual learning</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-white/20 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Ranked Results</h3>
              <p className="text-sm text-green-100">Provides compatibility scores and actionable insights</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}