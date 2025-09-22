"use client";

import React, { useState } from 'react';
import { generateSkillDescription, categorizeSkill, suggestSkillLevel } from '@/utils/aiDescriptionGenerator';

export default function PostSkillAdvancedPage() {
  const [skillName, setSkillName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [category, setCategory] = useState<string>('');
  const [includeTools, setIncludeTools] = useState<boolean>(true);
  const [includeCertifications, setIncludeCertifications] = useState<boolean>(false);
  const [customContext, setCustomContext] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerateDescription = async () => {
    if (!skillName.trim()) {
      setError('Please enter a skill name first');
      return;
    }

    setIsGenerating(true);
    setError('');
    setHasGenerated(false);

    try {
      const generatedDescription = await generateSkillDescription(skillName, {
        experienceLevel,
        includeTools,
        includeCertifications,
        customContext: customContext.trim()
      });
      
      setDescription(generatedDescription);
      setHasGenerated(true);
      
      // Auto-categorize the skill
      if (!category) {
        const suggestedCategory = categorizeSkill(skillName);
        setCategory(suggestedCategory);
      }
    } catch (err) {
      setError('Failed to generate description. Please try again.');
      console.error('Error generating description:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSkillNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillName(e.target.value);
    setError('');
    
    // Auto-suggest category when skill name changes
    if (e.target.value.trim()) {
      const suggestedCategory = categorizeSkill(e.target.value);
      setCategory(suggestedCategory);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    
    // Auto-suggest experience level based on description
    if (e.target.value.trim() && !hasGenerated) {
      const suggestedLevel = suggestSkillLevel(e.target.value);
      setExperienceLevel(suggestedLevel);
    }
  };

  const handleSubmitSkill = async () => {
    if (!skillName.trim() || !description.trim()) {
      setError('Please provide both skill name and description');
      return;
    }

    // Simulate posting skill to backend
    const skillData = {
      name: skillName,
      description,
      category,
      experienceLevel,
      includeTools,
      includeCertifications,
      customContext: customContext.trim()
    };

    console.log('Skill data to be posted:', skillData);
    alert(`🎉 Skill "${skillName}" has been posted successfully!\n\nCategory: ${category}\nLevel: ${experienceLevel}\nDescription: ${description.substring(0, 100)}...`);
  };

  const handleClearForm = () => {
    setSkillName('');
    setDescription('');
    setExperienceLevel('intermediate');
    setCategory('');
    setIncludeTools(true);
    setIncludeCertifications(false);
    setCustomContext('');
    setError('');
    setHasGenerated(false);
  };

  const categories = ['Frontend', 'Backend', 'Mobile', 'Design', 'Data Science', 'DevOps', 'Marketing', 'Other'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-6">
            <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:text-5xl">
            Advanced Skill Posting
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Create detailed skill profiles with AI assistance and advanced customization options.
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Skill Name Input */}
              <div>
                <label htmlFor="skillName" className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Skill Name *
                </label>
                <input
                  type="text"
                  id="skillName"
                  value={skillName}
                  onChange={handleSkillNameChange}
                  placeholder="e.g., React Development, Python, UI/UX Design"
                  className="w-full px-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  disabled={isGenerating}
                />
              </div>

              {/* Category and Experience Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Experience Level
                  </label>
                  <select
                    id="experienceLevel"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Custom Context */}
              <div>
                <label htmlFor="customContext" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Context (Optional)
                </label>
                <input
                  type="text"
                  id="customContext"
                  value={customContext}
                  onChange={(e) => setCustomContext(e.target.value)}
                  placeholder="e.g., 5 years experience, certified professional, startup background"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Description Textarea */}
              <div>
                <label htmlFor="description" className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Skill Description *
                  {hasGenerated && (
                    <span className="ml-2 text-sm font-normal text-green-600 dark:text-green-400">
                      ✨ AI Generated
                    </span>
                  )}
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Describe your skill expertise, experience level, and what you can teach others..."
                  rows={10}
                  className="w-full px-4 py-4 text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 resize-none"
                  disabled={isGenerating}
                />
                <div className="mt-2 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>You can edit the AI-generated description to match your experience</span>
                  <span>{description.length} characters</span>
                </div>
              </div>
            </div>

            {/* Right Column - AI Options & Actions */}
            <div className="space-y-6">
              {/* AI Generation Options */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-300 mb-4">
                  🤖 AI Generation Options
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeTools"
                      checked={includeTools}
                      onChange={(e) => setIncludeTools(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="includeTools" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Include tools & technologies
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeCertifications"
                      checked={includeCertifications}
                      onChange={(e) => setIncludeCertifications(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="includeCertifications" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Mention certifications
                    </label>
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerateDescription}
                  disabled={isGenerating || !skillName.trim()}
                  className="w-full mt-6 inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 rounded-lg shadow-lg hover:shadow-xl disabled:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Generate AI Description
                    </>
                  )}
                </button>
              </div>

              {/* Quick Stats */}
              {skillName && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    📊 Skill Overview
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Name:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{skillName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Category:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Level:</span>
                      <span className={`font-medium ${
                        experienceLevel === 'advanced' ? 'text-green-600 dark:text-green-400' :
                        experienceLevel === 'intermediate' ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-blue-600 dark:text-blue-400'
                      }`}>
                        {experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Description:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {description.length} chars
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleSubmitSkill}
                  disabled={!skillName.trim() || !description.trim()}
                  className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-500 transition-all duration-200 disabled:cursor-not-allowed"
                >
                  Post Skill
                </button>
                
                <button
                  onClick={handleClearForm}
                  className="w-full px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors duration-200"
                >
                  Clear Form
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-8 mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-700 dark:text-red-400 font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Preview Section */}
          {skillName && description && (
            <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">📋 Preview</h3>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{skillName}</h4>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                      {category}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      experienceLevel === 'advanced' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : experienceLevel === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {experienceLevel}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}