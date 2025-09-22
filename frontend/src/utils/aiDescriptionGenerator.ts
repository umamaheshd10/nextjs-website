// Utility function for generating AI skill descriptions
// This could be replaced with actual AI API calls (OpenAI, etc.)

interface SkillDescriptionOptions {
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  includeTools?: boolean;
  includeCertifications?: boolean;
  customContext?: string;
}

export async function generateSkillDescription(
  skillName: string, 
  options: SkillDescriptionOptions = {}
): Promise<string> {
  // Simulate API delay for realistic UX
  const delay = Math.random() * 2000 + 1000; // 1-3 seconds
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Enhanced skill descriptions database
  const skillTemplates: { [key: string]: { [level: string]: string } } = {
    'react': {
      beginner: `Solid foundation in React development with understanding of components, props, and basic hooks. Comfortable building simple user interfaces and familiar with JSX syntax. Currently learning about state management and component lifecycle. Eager to expand knowledge in React ecosystem and modern development practices.`,
      
      intermediate: `Competent React developer with experience building interactive web applications using hooks, context API, and component composition. Skilled in managing application state, handling forms, and implementing routing with React Router. Familiar with popular libraries and comfortable with debugging React applications.`,
      
      advanced: `Expert-level React development skills encompassing modern hooks, component lifecycle management, and advanced state management patterns. Proficient in building scalable single-page applications with optimal performance through code splitting, lazy loading, and memoization. Deep experience with React ecosystem including Redux Toolkit, React Query, and comprehensive testing with React Testing Library.`
    },

    'nodejs': {
      beginner: `Basic Node.js knowledge with understanding of JavaScript runtime environment and npm package management. Familiar with creating simple servers using Express.js and working with file systems. Learning about asynchronous programming and callback patterns. Ready to build foundational backend skills.`,
      
      intermediate: `Solid Node.js backend development skills including RESTful API creation, middleware implementation, and database integration with MongoDB or PostgreSQL. Comfortable with Express.js framework, authentication systems, and error handling. Experience with npm ecosystem and basic deployment practices.`,
      
      advanced: `Comprehensive Node.js backend development expertise including scalable API design, microservices architecture, and advanced database optimization. Expert in Express.js, middleware development, authentication/authorization systems, and performance optimization. Proficient with containerization, testing frameworks, and production deployment strategies.`
    },

    'python': {
      beginner: `Foundational Python programming skills with understanding of syntax, data types, control structures, and basic object-oriented programming. Familiar with popular libraries like requests and pandas for simple data manipulation. Comfortable with Python development environment and package management using pip.`,
      
      intermediate: `Competent Python developer with experience in web development using Django or Flask, data analysis with pandas and NumPy, and automation scripting. Skilled in object-oriented programming, exception handling, and working with APIs. Familiar with virtual environments and testing frameworks.`,
      
      advanced: `Advanced Python expertise spanning web development with Django/Flask, data science with pandas/NumPy/scikit-learn, and automation solutions. Expert in object-oriented and functional programming paradigms, async programming with asyncio, and performance optimization. Extensive experience with testing, debugging, and deploying Python applications at scale.`
    },

    'javascript': {
      beginner: `Basic JavaScript knowledge including variables, functions, loops, and DOM manipulation. Understanding of ES6 fundamentals like arrow functions and template literals. Comfortable with browser developer tools and debugging simple JavaScript applications. Building foundation in modern JavaScript development.`,
      
      intermediate: `Solid JavaScript proficiency including ES6+ features, asynchronous programming with promises and async/await, and modern browser APIs. Experience with popular frameworks and libraries, comfortable with module systems and bundling tools. Skilled in debugging and optimizing JavaScript applications.`,
      
      advanced: `Expert JavaScript developer with deep understanding of language fundamentals, advanced ES6+ features, and performance optimization techniques. Proficient in multiple frameworks, testing methodologies, and build tools. Extensive experience with TypeScript, advanced async patterns, and modern JavaScript ecosystem.`
    },

    'design': {
      beginner: `Basic UI/UX design skills with understanding of design principles, color theory, and typography. Familiar with design tools like Figma or Adobe XD for creating simple wireframes and mockups. Learning about user experience fundamentals and responsive design concepts.`,
      
      intermediate: `Competent UI/UX designer with experience creating user-centered designs, wireframes, and prototypes. Skilled in design systems, accessibility principles, and user research methodologies. Proficient with industry-standard tools and comfortable collaborating with development teams.`,
      
      advanced: `Professional UI/UX design expertise with comprehensive skills in user research, information architecture, and interaction design. Master of design tools including Figma, Adobe Creative Suite, and prototyping platforms. Expert in design systems, accessibility standards, and cross-platform design strategies.`
    }
  };

  // Normalize skill name for matching
  const normalizedSkill = skillName.toLowerCase().trim();
  const experienceLevel = options.experienceLevel || 'intermediate';
  
  // Try to find skill-specific templates
  for (const [skillKey, templates] of Object.entries(skillTemplates)) {
    if (normalizedSkill.includes(skillKey) || skillKey.includes(normalizedSkill)) {
      let description = templates[experienceLevel];
      
      // Add custom context if provided
      if (options.customContext) {
        description += ` ${options.customContext}`;
      }
      
      return description;
    }
  }
  
  // Generate dynamic description for unknown skills
  const experiencePhrases = {
    beginner: 'Building foundational skills',
    intermediate: 'Developing competency',
    advanced: 'Expert-level proficiency'
  };
  
  const toolsPhrase = options.includeTools ? 
    ' Familiar with industry-standard tools and best practices.' : '';
  
  const certificationPhrase = options.includeCertifications ? 
    ' Holds relevant certifications and continues professional development.' : '';
  
  return `${experiencePhrases[experienceLevel]} in ${skillName} with hands-on experience applying modern methodologies and industry best practices. Demonstrated ability to deliver high-quality results through systematic approach and continuous learning.${toolsPhrase}${certificationPhrase} Strong problem-solving capabilities with attention to detail and commitment to staying current with emerging trends in the ${skillName} domain. Experience collaborating effectively with cross-functional teams and sharing knowledge with others.`;
}

// Helper function to extract skill category from name
export function categorizeSkill(skillName: string): string {
  const normalizedSkill = skillName.toLowerCase().trim();
  
  const categories: { [key: string]: string[] } = {
    'Frontend': ['react', 'vue', 'angular', 'javascript', 'typescript', 'html', 'css', 'tailwind'],
    'Backend': ['nodejs', 'node.js', 'python', 'java', 'php', 'ruby', 'go', 'rust', 'c#'],
    'Mobile': ['react native', 'flutter', 'ios', 'android', 'swift', 'kotlin'],
    'Design': ['ui', 'ux', 'design', 'figma', 'photoshop', 'illustrator'],
    'Data Science': ['data science', 'machine learning', 'ai', 'tensorflow', 'pytorch', 'pandas'],
    'DevOps': ['devops', 'docker', 'kubernetes', 'aws', 'azure', 'terraform'],
    'Marketing': ['marketing', 'seo', 'social media', 'content', 'advertising']
  };
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => normalizedSkill.includes(keyword))) {
      return category;
    }
  }
  
  return 'Other';
}

// Helper function to suggest skill level based on description length and complexity
export function suggestSkillLevel(description: string): 'beginner' | 'intermediate' | 'advanced' {
  const wordCount = description.split(' ').length;
  const complexityKeywords = ['expert', 'advanced', 'proficient', 'extensive', 'comprehensive', 'scalable'];
  const beginnerKeywords = ['learning', 'basic', 'foundational', 'beginning', 'getting started'];
  
  const hasComplexityKeywords = complexityKeywords.some(keyword => 
    description.toLowerCase().includes(keyword)
  );
  const hasBeginnerKeywords = beginnerKeywords.some(keyword => 
    description.toLowerCase().includes(keyword)
  );
  
  if (hasBeginnerKeywords || wordCount < 30) {
    return 'beginner';
  } else if (hasComplexityKeywords || wordCount > 80) {
    return 'advanced';
  } else {
    return 'intermediate';
  }
}