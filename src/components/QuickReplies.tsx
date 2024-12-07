import React from 'react';
import { commonQueries } from '../data/commonQueries';

interface QuickRepliesProps {
  onSelect: (query: string) => void;
}

export const QuickReplies: React.FC<QuickRepliesProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 p-4 border-t border-gray-200">
      {commonQueries.map((query) => (
        <button
          key={query.id}
          onClick={() => onSelect(query.question)}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
        >
          {query.question}
        </button>
      ))}
    </div>
  );
};