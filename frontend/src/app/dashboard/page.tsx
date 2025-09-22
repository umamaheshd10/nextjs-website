"use client";

import React, { useState, useEffect } from 'react';

// Types for dashboard data
interface PostedSkill {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  views: number;
  requests: number;
}

interface ActiveSwap {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  mySkill: string;
  partnerSkill: string;
  status: 'pending' | 'active' | 'completed';
  startDate: string;
  progress: number;
  nextSession?: string;
}

interface Notification {
  id: string;
  type: 'swap_request' | 'swap_accepted' | 'session_reminder' | 'skill_viewed' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
}

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<'skills' | 'swaps' | 'notifications'>('skills');
  const [postedSkills, setPostedSkills] = useState<PostedSkill[]>([]);
  const [activeSwaps, setActiveSwaps] = useState<ActiveSwap[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data loading
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock posted skills data
      setPostedSkills([
        {
          id: '1',
          title: 'React Development',
          description: 'Expert React developer with deep knowledge of hooks, context, and modern patterns.',
          category: 'Frontend',
          level: 'advanced',
          createdAt: '2024-01-15',
          views: 234,
          requests: 12
        },
        {
          id: '2',
          title: 'Python Data Analysis',
          description: 'Experienced in pandas, NumPy, and machine learning libraries for data insights.',
          category: 'Data Science',
          level: 'intermediate',
          createdAt: '2024-01-10',
          views: 156,
          requests: 8
        },
        {
          id: '3',
          title: 'UI/UX Design',
          description: 'Creative designer specializing in user-centered design and modern interfaces.',
          category: 'Design',
          level: 'advanced',
          createdAt: '2024-01-05',
          views: 189,
          requests: 15
        }
      ]);

      // Mock active swaps data
      setActiveSwaps([
        {
          id: '1',
          partnerId: '101',
          partnerName: 'Sarah Chen',
          partnerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
          mySkill: 'React Development',
          partnerSkill: 'Node.js Backend',
          status: 'active',
          startDate: '2024-01-20',
          progress: 75,
          nextSession: '2024-01-25T14:00:00Z'
        },
        {
          id: '2',
          partnerId: '102',
          partnerName: 'Michael Rodriguez',
          partnerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          mySkill: 'UI/UX Design',
          partnerSkill: 'Digital Marketing',
          status: 'pending',
          startDate: '2024-01-22',
          progress: 0
        },
        {
          id: '3',
          partnerId: '103',
          partnerName: 'Emily Johnson',
          partnerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
          mySkill: 'Python Data Analysis',
          partnerSkill: 'Machine Learning',
          status: 'completed',
          startDate: '2024-01-01',
          progress: 100
        }
      ]);

      // Mock notifications data
      setNotifications([
        {
          id: '1',
          type: 'swap_request',
          title: 'New Swap Request',
          message: 'Alex Thompson wants to swap "DevOps" for your "React Development"',
          timestamp: '2024-01-23T10:30:00Z',
          read: false,
          actionRequired: true
        },
        {
          id: '2',
          type: 'session_reminder',
          title: 'Session Reminder',
          message: 'Your session with Sarah Chen starts in 2 hours',
          timestamp: '2024-01-23T08:15:00Z',
          read: false,
          actionRequired: true
        },
        {
          id: '3',
          type: 'swap_accepted',
          title: 'Swap Accepted!',
          message: 'Michael Rodriguez accepted your swap request for Digital Marketing',
          timestamp: '2024-01-22T16:45:00Z',
          read: true
        },
        {
          id: '4',
          type: 'skill_viewed',
          title: 'Skill Interest',
          message: '5 people viewed your "Python Data Analysis" skill today',
          timestamp: '2024-01-22T14:20:00Z',
          read: true
        },
        {
          id: '5',
          type: 'system',
          title: 'Profile Completion',
          message: 'Complete your profile to get better skill matches',
          timestamp: '2024-01-21T09:00:00Z',
          read: false
        }
      ]);

      setLoading(false);
    };

    loadDashboardData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Welcome back! Here's your skill swap activity.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Premium Member</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-2l2 2-2 2M5 13l-2-2 2-2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{postedSkills.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Posted Skills</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{activeSwaps.filter(s => s.status === 'active').length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Swaps</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{postedSkills.reduce((acc, skill) => acc + skill.views, 0)}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{postedSkills.reduce((acc, skill) => acc + skill.requests, 0)}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Swap Requests</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('skills')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'skills'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Posted Skills ({postedSkills.length})
            </button>
            <button
              onClick={() => setActiveTab('swaps')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'swaps'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Active Swaps ({activeSwaps.length})
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-3 px-1 border-b-2 font-medium text-sm relative ${
                activeTab === 'notifications'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Notifications ({notifications.length})
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Posted Skills Tab */}
          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {postedSkills.map((skill) => (
                <div key={skill.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{skill.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                          {skill.category}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          skill.level === 'advanced' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : skill.level === 'intermediate'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}>
                          {skill.level}
                        </span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{skill.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Posted {formatDate(skill.createdAt)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center text-gray-500 dark:text-gray-400">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {skill.views}
                      </span>
                      <span className="flex items-center text-gray-500 dark:text-gray-400">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {skill.requests}
                      </span>
                    </div>
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Add Skill Card */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 flex flex-col items-center justify-center text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Post New Skill</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Share your expertise with the community</p>
              </div>
            </div>
          )}

          {/* Active Swaps Tab */}
          {activeTab === 'swaps' && (
            <div className="space-y-4">
              {activeSwaps.map((swap) => (
                <div key={swap.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={swap.partnerAvatar}
                        alt={swap.partnerName}
                        className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-600"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{swap.partnerName}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-medium text-blue-600 dark:text-blue-400">{swap.mySkill}</span>
                          <span className="mx-2">↔</span>
                          <span className="font-medium text-green-600 dark:text-green-400">{swap.partnerSkill}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        swap.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : swap.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
                      </div>
                      
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {swap.status === 'active' && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <span>Progress</span>
                        <span>{swap.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${swap.progress}%` }}
                        ></div>
                      </div>
                      {swap.nextSession && (
                        <div className="mt-3 flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Next session: {new Date(swap.nextSession).toLocaleDateString()} at {new Date(swap.nextSession).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Started {formatDate(swap.startDate)}
                    </span>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        View Details
                      </button>
                      {swap.status === 'pending' && (
                        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                          Accept
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border ${
                    notification.read 
                      ? 'border-gray-200 dark:border-gray-700' 
                      : 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/10'
                  } p-4 hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${
                      notification.type === 'swap_request' ? 'bg-purple-100 dark:bg-purple-900' :
                      notification.type === 'swap_accepted' ? 'bg-green-100 dark:bg-green-900' :
                      notification.type === 'session_reminder' ? 'bg-orange-100 dark:bg-orange-900' :
                      notification.type === 'skill_viewed' ? 'bg-blue-100 dark:bg-blue-900' :
                      'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      {notification.type === 'swap_request' && (
                        <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-2l2 2-2 2M5 13l-2-2 2-2" />
                        </svg>
                      )}
                      {notification.type === 'swap_accepted' && (
                        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {notification.type === 'session_reminder' && (
                        <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {notification.type === 'skill_viewed' && (
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                      {notification.type === 'system' && (
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{notification.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">{formatTimeAgo(notification.timestamp)}</span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                      
                      {notification.actionRequired && (
                        <div className="flex space-x-2 mt-3">
                          <button className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg transition-colors">
                            {notification.type === 'swap_request' ? 'Review Request' : 'View Details'}
                          </button>
                          {notification.type === 'swap_request' && (
                            <button className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                              Dismiss
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}