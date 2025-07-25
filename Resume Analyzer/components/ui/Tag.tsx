
import React from 'react';

interface TagProps {
  text: string;
  color?: 'green' | 'blue' | 'purple' | 'yellow';
}

export const Tag: React.FC<TagProps> = ({ text, color = 'green' }) => {
  const colorClasses = {
    green: 'bg-green-800/60 text-green-200 border-green-700/50',
    blue: 'bg-blue-800/60 text-blue-200 border-blue-700/50',
    purple: 'bg-purple-800/60 text-purple-200 border-purple-700/50',
    yellow: 'bg-yellow-800/60 text-yellow-200 border-yellow-700/50',
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${colorClasses[color]}`}>
      {text}
    </span>
  );
};
