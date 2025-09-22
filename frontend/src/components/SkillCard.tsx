import React from 'react';

interface SkillCardProps {
  title: string;
  description: string;
  onRequestSwap?: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ 
  title, 
  description, 
  onRequestSwap 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-500">
      {/* Card Header */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {title}
        </h3>
      </div>

      {/* Card Body */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Card Footer */}
      <div className="flex justify-end">
        <button
          onClick={onRequestSwap}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 shadow-md hover:shadow-lg"
        >
          Request Swap
        </button>
      </div>
    </div>
  );
};

export default SkillCard;