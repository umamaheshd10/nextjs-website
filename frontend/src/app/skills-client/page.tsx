"use client";

import React, { useState, useEffect } from 'react';
import SkillCard from '@/components/SkillCard';

// Define the skill type
interface Skill {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  userId: number;
}

// Client Component with interactive features
export default function SkillsClientPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate fetching data on client side
  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const skillsData: Skill[] = [
        {
          id: 1,
          title: "React Development",
          description: "Experienced in building modern web applications using React, hooks, and component-based architecture. Proficient in state management with Redux and Context API, and performance optimization techniques.",
          category: "Frontend",
          level: "Advanced",
          userId: 101
        },
        {
          id: 2,
          title: "Node.js Backend",
          description: "Strong expertise in server-side development with Node.js, Express.js, and RESTful API design. Experience with database integration, authentication systems, and microservices architecture.",
          category: "Backend",
          level: "Intermediate",
          userId: 102
        },
        {
          id: 3,
          title: "UI/UX Design",
          description: "Creative design skills with proficiency in Figma, Adobe Creative Suite, and modern design principles. Experience in creating user-centered digital experiences and design systems.",
          category: "Design",
          level: "Advanced",
          userId: 103
        },
        {
          id: 4,
          title: "Python Data Science",
          description: "Skilled in data analysis, machine learning, and statistical modeling using Python libraries like pandas, scikit-learn, and TensorFlow. Experience with data visualization and predictive modeling.",
          category: "Data Science",
          level: "Intermediate",
          userId: 104
        },
        {
          id: 5,
          title: "Mobile App Development",
          description: "Experience in developing cross-platform mobile applications using React Native and Flutter, with knowledge of native iOS and Android development patterns and best practices.",
          category: "Mobile",
          level: "Intermediate",
          userId: 105
        },
        {
          id: 6,
          title: "DevOps & Cloud",
          description: "Proficient in cloud platforms (AWS, Azure), containerization with Docker, CI/CD pipelines, and infrastructure as code using Terraform. Experience with monitoring and deployment automation.",
          category: "DevOps",
          level: "Advanced",
          userId: 106
        },
        {
          id: 7,
          title: "Graphic Design",
          description: "Creative expertise in visual design, branding, and digital marketing materials. Proficient in Adobe Creative Suite, brand identity development, and print/digital design workflows.",
          category: "Design",
          level: "Advanced",
          userId: 107
        },
        {
          id: 8,
          title: "Digital Marketing",
          description: "Comprehensive knowledge of SEO, social media marketing, content strategy, and analytics. Experience with Google Ads, Facebook Marketing, and conversion optimization techniques.",
          category: "Marketing",
          level: "Intermediate",
          userId: 108
        },
        {
          id: 9,
          title: "Cybersecurity",
          description: "Strong understanding of information security principles, penetration testing, and security audits. Experience with security frameworks, risk assessment, and incident response procedures.",
          category: "Security",
          level: "Advanced",
          userId: 109
        }
      ];
      
      setSkills(skillsData);
      setFilteredSkills(skillsData);
      setLoading(false);
    };

    fetchSkills();
  }, []);

  // Filter skills by category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredSkills(skills);
    } else {
      setFilteredSkills(skills.filter(skill => skill.category === selectedCategory));
    }
  }, [selectedCategory, skills]);

  const handleRequestSwap = (skillId: number, skillTitle: string) => {
    alert(`🎉 Swap request sent for: ${skillTitle}!\n\nSkill ID: ${skillId}\n\nYou'll receive a confirmation email shortly.`);
  };

  const categories = ['All', 'Frontend', 'Backend', 'Design', 'Data Science', 'Mobile', 'DevOps', 'Marketing', 'Security'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading amazing skills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-2l2 2-2 2M5 13l-2-2 2-2" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:text-5xl">
            Skills Exchange (Interactive)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover amazing skills from our community with interactive filtering and enhanced user experience.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{filteredSkills.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {selectedCategory === 'All' ? 'Available Skills' : `${selectedCategory} Skills`}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">50+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">100+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Successful Swaps</div>
            </div>
          </div>
        </div>

        {/* Interactive Filter Tags */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 border rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {category}
                {category !== 'All' && (
                  <span className="ml-1 text-xs opacity-75">
                    ({skills.filter(skill => skill.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid - Responsive: 1 column mobile, 2 medium, 3 large */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {filteredSkills.map((skill, index) => (
            <div 
              key={skill.id} 
              className="group animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <SkillCard
                title={skill.title}
                description={skill.description}
                onRequestSwap={() => handleRequestSwap(skill.id, skill.title)}
              />
              {/* Additional skill metadata */}
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-2">
                <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {skill.category}
                </span>
                <span className={`px-2 py-1 rounded-full ${
                  skill.level === 'Advanced' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {skill.level}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredSkills.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No skills found in the {selectedCategory} category.
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              View all skills →
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-semibold mb-4">
              Ready to Share Your Skills?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join our community of learners and teachers. Share your expertise and discover new skills from talented individuals around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Add Your Skill
              </button>
              <button className="border border-white text-white font-medium px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                Browse All Skills
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}