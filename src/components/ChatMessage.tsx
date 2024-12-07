import React from 'react';
import { formatTimestamp } from '../utils/chatHelpers';
import { Message } from '../types/chat';
import { Bot, User, HeadsetIcon } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const isAgent = message.sender === 'agent';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
          ${isUser ? 'bg-blue-100 ml-2' : isAgent ? 'bg-green-100 mr-2' : 'bg-gray-100 mr-2'}`}>
          {isUser ? (
            <User className="w-5 h-5 text-blue-600" />
          ) : isAgent ? (
            <HeadsetIcon className="w-5 h-5 text-green-600" />
          ) : (
            <Bot className="w-5 h-5 text-gray-600" />
          )}
        </div>
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-lg px-4 py-2 ${
            isUser ? 'bg-blue-600 text-white' : 
            isAgent ? 'bg-green-600 text-white' : 
            'bg-gray-100 text-gray-800'
          }`}>
            <p className="text-sm">{message.content}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};