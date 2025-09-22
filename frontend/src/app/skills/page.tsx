"use client";

import React from 'react';
import SkillCard from '@/components/SkillCard';

const SkillsPage: React.FC = () => {
  const handleRequestSwap = (skillTitle: string) => {
    alert(`Requesting swap for: ${skillTitle}`);
  };

  const skills = [
    {
      title: "React Development",
      description: "Experienced in building modern web applications using React, hooks, and component-based architecture. Proficient in state management and performance optimization."
    },
    {
      title: "Node.js Backend",
      description: "Strong expertise in server-side development with Node.js, Express.js, and RESTful API design. Experience with database integration and authentication systems."
    },
    {
      title: "UI/UX Design",
      description: "Creative design skills with proficiency in Figma, Adobe Creative Suite, and modern design principles. Experience in creating user-centered digital experiences."
    },
    {
      title: "Python Data Science",
      description: "Skilled in data analysis, machine learning, and statistical modeling using Python libraries like pandas, scikit-learn, and TensorFlow."
    },
    {
      title: "Mobile App Development",
      description: "Experience in developing cross-platform mobile applications using React Native and Flutter, with knowledge of native iOS and Android development."
    },
    {
      title: "DevOps & Cloud",
      description: "Proficient in cloud platforms (AWS, Azure), containerization with Docker, CI/CD pipelines, and infrastructure as code using Terraform."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skill Exchange Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover amazing skills from our community and request skill swaps to learn something new
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              title={skill.title}
              description={skill.description}
              onRequestSwap={() => handleRequestSwap(skill.title)}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              How Skill Swapping Works
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Browse through available skills, find something that interests you, and click "Request Swap" 
              to connect with skill owners. Share your own expertise and learn from others in our 
              collaborative community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;