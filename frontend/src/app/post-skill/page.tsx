"use client";

import React, { useState } from 'react';

// Simulate AI description generation function
async function generateSkillDescription(skillName: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock AI-generated descriptions based on skill name
  const descriptions: { [key: string]: string } = {
    'react': `Expert-level React development skills encompassing modern hooks, component lifecycle management, and state management patterns. Proficient in building scalable single-page applications with optimal performance through code splitting and lazy loading. Experience with React ecosystem including React Router, Redux Toolkit, and testing libraries like React Testing Library.`,
    
    'nodejs': `Comprehensive Node.js backend development expertise including RESTful API design, database integration with MongoDB and PostgreSQL, and authentication systems. Skilled in Express.js framework, middleware development, and implementing robust error handling. Experience with microservices architecture and containerization using Docker.`,
    
    'python': `Advanced Python programming skills covering web development with Django/Flask, data analysis with pandas and NumPy, and machine learning implementations. Proficient in object-oriented programming, async programming with asyncio, and API development. Experience with data visualization libraries and scientific computing.`,
    
    'design': `Professional UI/UX design capabilities using industry-standard tools like Figma, Adobe Creative Suite, and Sketch. Expertise in user-centered design principles, wireframing, prototyping, and design systems. Strong understanding of accessibility standards, responsive design, and modern design trends.`,
    
    'marketing': `Strategic digital marketing expertise covering SEO optimization, social media strategy, content marketing, and performance analytics. Skilled in Google Analytics, Google Ads, Facebook Advertising, and marketing automation tools. Experience with conversion rate optimization and customer journey mapping.`,
    
    'javascript': `Advanced JavaScript proficiency including ES6+ features, asynchronous programming, and modern framework integration. Expert in DOM manipulation, event handling, and browser APIs. Experience with TypeScript, testing frameworks like Jest, and build tools including Webpack and Vite.`,
    
    'data science': `Comprehensive data science skills encompassing statistical analysis, machine learning model development, and data visualization. Proficient in Python libraries (scikit-learn, TensorFlow, PyTorch), R programming, and SQL for data manipulation. Experience with big data tools and cloud platforms for data processing.`,
    
    'mobile development': `Cross-platform mobile app development using React Native, Flutter, and native iOS/Android technologies. Skilled in mobile UI/UX patterns, performance optimization, and app store deployment processes. Experience with mobile-specific features like push notifications, geolocation, and device APIs.`,
    
    'devops': `Professional DevOps engineering skills including CI/CD pipeline development, cloud infrastructure management, and containerization strategies. Expertise in AWS/Azure services, Kubernetes orchestration, Infrastructure as Code with Terraform, and monitoring solutions. Experience with automated testing and deployment strategies.`
  };
  
  // Generate description based on skill name (case-insensitive matching)
  const normalizedSkill = skillName.toLowerCase().trim();
  
  // Try to find exact or partial matches
  for (const [key, description] of Object.entries(descriptions)) {
    if (normalizedSkill.includes(key) || key.includes(normalizedSkill)) {
      return description;
    }
  }
  
  // Generic AI-generated description for unknown skills
  return `Professional ${skillName} expertise with hands-on experience in industry best practices and modern methodologies. Demonstrated ability to deliver high-quality results through systematic approach and continuous learning. Strong problem-solving skills with attention to detail and commitment to staying current with emerging trends and technologies in the ${skillName} domain. Experience collaborating with cross-functional teams and mentoring others in this skill area.`;
}

export default function PostSkillPage() {
  const [skillName, setSkillName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
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
      const generatedDescription = await generateSkillDescription(skillName);
      setDescription(generatedDescription);
      setHasGenerated(true);
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
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmitSkill = async () => {
    if (!skillName.trim() || !description.trim()) {
      setError('Please provide both skill name and description');
      return;
    }

    // Simulate posting skill to backend
    alert(`🎉 Skill "${skillName}" has been posted successfully!\n\nDescription: ${description.substring(0, 100)}...`);
  };

  const handleClearForm = () => {
    setSkillName('');
    setDescription('');
    setError('');
    setHasGenerated(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900 rounded-full mb-6">
            <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:text-5xl">
            Post New Skill
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Share your expertise with the community. Let AI help you craft the perfect skill description.
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-8">
            {/* Skill Name Input */}
            <div className="mb-8">
              <label htmlFor="skillName" className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Skill Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="skillName"
                  value={skillName}
                  onChange={handleSkillNameChange}
                  placeholder="e.g., React Development, Python, UI/UX Design"
                  className="w-full px-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  disabled={isGenerating}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Generate Description Button */}
            <div className="mb-8">
              <button
                onClick={handleGenerateDescription}
                disabled={isGenerating || !skillName.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 rounded-xl shadow-lg hover:shadow-xl disabled:shadow-md focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating AI Description...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Generate AI Description
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-700 dark:text-red-400 font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Description Textarea */}
            <div className="mb-8">
              <label htmlFor="description" className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Skill Description
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
                rows={8}
                className="w-full px-4 py-4 text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 resize-none"
                disabled={isGenerating}
              />
              <div className="mt-2 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>You can edit the AI-generated description to match your experience</span>
                <span>{description.length} characters</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={handleClearForm}
                className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors duration-200"
              >
                Clear Form
              </button>
              <button
                onClick={handleSubmitSkill}
                disabled={!skillName.trim() || !description.trim()}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-500 transition-all duration-200 disabled:cursor-not-allowed"
              >
                Post Skill
              </button>
            </div>
          </div>

          {/* Success Preview */}
          {skillName && description && (
            <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{skillName}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">💡 Tips for Great Skill Descriptions</h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Be specific about your experience level and years of practice</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Mention specific tools, frameworks, or methodologies you're familiar with</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Highlight what makes your approach or expertise unique</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Include any certifications, projects, or achievements related to this skill</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}