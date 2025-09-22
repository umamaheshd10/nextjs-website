"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: "🤝",
      title: "Smart Matching",
      description: "AI-powered algorithm finds your perfect skill swap partners based on expertise and learning goals."
    },
    {
      icon: "🎯",
      title: "Skill Assessment",
      description: "Comprehensive skill evaluation system to match you with the right level of expertise."
    },
    {
      icon: "📈",
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and milestone achievements."
    },
    {
      icon: "🌐",
      title: "Global Community",
      description: "Connect with professionals worldwide and access diverse skill sets and perspectives."
    },
    {
      icon: "🏆",
      title: "Verified Experts",
      description: "Learn from certified professionals with proven track records in their fields."
    },
    {
      icon: "💬",
      title: "Real-time Chat",
      description: "Seamless communication tools for scheduling and conducting skill exchange sessions."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full-Stack Developer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      quote: "SkillSwap transformed my career! I learned React from an expert developer while teaching my design skills. The AI matching was spot-on.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Digital Marketer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      quote: "Amazing platform! I've completed 12 skill swaps and each one has been incredibly valuable. The community is supportive and professional.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Data Scientist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      quote: "The quality of connections on SkillSwap is unmatched. I've learned machine learning while sharing my statistics expertise.",
      rating: 5
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "25,000+", label: "Skills Exchanged" },
    { number: "500+", label: "Expert Instructors" },
    { number: "95%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                SkillSwap
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">How it Works</a>
              <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Reviews</a>
              <a href="/dashboard" className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-violet-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105">Get Started</a>
            </div>
            
            <button className="md:hidden p-2">
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Learn, Teach,
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Grow Together
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join the world's most innovative skill-sharing platform where professionals 
                <span className="text-violet-600 dark:text-violet-400 font-semibold"> exchange expertise</span> and 
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">accelerate growth</span> through meaningful connections.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <a 
                  href="/post-skill" 
                  className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-violet-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
                >
                  Start Skill Swapping
                </a>
                <a 
                  href="/skills" 
                  className="border-2 border-violet-500 text-violet-600 dark:text-violet-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all duration-200 transform hover:scale-105"
                >
                  Browse Skills
                </a>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to succeed in your skill-sharing journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              How SkillSwap Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Share your skills and what you want to learn. Our AI analyzes your expertise to find perfect matches.",
                icon: "👤"
              },
              {
                step: "02",
                title: "Get Matched",
                description: "Receive personalized recommendations for skill swap partners based on compatibility and goals.",
                icon: "🎯"
              },
              {
                step: "03",
                title: "Start Learning",
                description: "Connect with your matches, schedule sessions, and begin your skill exchange journey!",
                icon: "🚀"
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-violet-300 to-cyan-300 transform translate-x-1/2"></div>
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
                    {item.step}
                  </div>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm mx-auto">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-r from-violet-50 to-cyan-50 dark:from-gray-800 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of professionals who've transformed their careers
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12">
              <div className="text-center">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-violet-200 dark:border-violet-800"
                />
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-violet-600 dark:text-violet-400">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>
            
            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial 
                      ? 'bg-violet-500' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-violet-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-violet-500 to-cyan-500 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join SkillSwap today and unlock unlimited learning opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/post-skill" 
                className="bg-white text-violet-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
              >
                Share Your Skills
              </a>
              <a 
                href="/recommendations" 
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-violet-600 transition-all duration-200 transform hover:scale-105"
              >
                Find Learning Partners
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Demo Links */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Platform Features
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Try out different features of our skill-sharing platform
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Skills Pages */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Skills Discovery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <a
                  className="group p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 text-center"
                  href="/skills"
                >
                  <div className="text-2xl mb-2">👥</div>
                  <div className="font-medium text-gray-900 dark:text-white">Browse Skills</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Discover available skills</div>
                </a>
                <a
                  className="group p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 text-center"
                  href="/skills-ssr"
                >
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="font-medium text-gray-900 dark:text-white">Fast Loading</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Server-side rendering</div>
                </a>
                <a
                  className="group p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 text-center"
                  href="/skills-client"
                >
                  <div className="text-2xl mb-2">🎮</div>
                  <div className="font-medium text-gray-900 dark:text-white">Interactive</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Advanced filtering</div>
                </a>
              </div>
            </div>
            
            {/* Skill Posting */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Share Your Expertise</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <a
                  className="group p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 text-center"
                  href="/post-skill"
                >
                  <div className="text-2xl mb-2">📝</div>
                  <div className="font-medium text-gray-900 dark:text-white">Quick Post</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">AI-powered descriptions</div>
                </a>
                <a
                  className="group p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 text-center"
                  href="/post-skill-advanced"
                >
                  <div className="text-2xl mb-2">🚀</div>
                  <div className="font-medium text-gray-900 dark:text-white">Advanced Post</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Full customization</div>
                </a>
              </div>
            </div>
            
            {/* AI & Dashboard */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">AI-Powered Platform</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <a
                  className="group p-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-1 text-center"
                  href="/dashboard"
                >
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-medium">Your Dashboard</div>
                  <div className="text-sm opacity-90">Manage your profile</div>
                </a>
                <a
                  className="group p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-1 text-center"
                  href="/recommendations"
                >
                  <div className="text-2xl mb-2">🤖</div>
                  <div className="font-medium">AI Matching</div>
                  <div className="text-sm opacity-90">Smart recommendations</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-2xl font-bold">SkillSwap</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                The world's premier skill-sharing platform connecting professionals for mutual learning and growth.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'linkedin', 'github', 'discord'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-6 h-6 bg-gray-600 rounded hover:bg-violet-500 transition-colors"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/skills" className="hover:text-white transition-colors">Browse Skills</a></li>
                <li><a href="/post-skill" className="hover:text-white transition-colors">Share Skills</a></li>
                <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="/recommendations" className="hover:text-white transition-colors">AI Matching</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2024 SkillSwap. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
