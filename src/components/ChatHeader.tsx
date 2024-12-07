import React from 'react';
import { Bot, HeadsetIcon } from 'lucide-react';

interface ChatHeaderProps {
  isConnectedToAgent: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ isConnectedToAgent }) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center space-x-2">
        {isConnectedToAgent ? (
          <HeadsetIcon className="w-6 h-6 text-green-600" />
        ) : (
          <Bot className="w-6 h-6 text-blue-600" />
        )}
        <div>
          <h2 className="text-lg font-semibold">
            {isConnectedToAgent ? 'Customer Service Agent' : 'AI Assistant'}
          </h2>
          <p className="text-sm text-gray-500">
            {isConnectedToAgent 
              ? 'Connected to a human agent'
              : 'Here to help with your questions'}
          </p>
        </div>
      </div>
    </div>
  );
};