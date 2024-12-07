import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Message } from './types/chat';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ChatHeader } from './components/ChatHeader';
import { QuickReplies } from './components/QuickReplies';
import { generateMessageId, shouldTransferToAgent } from './utils/chatHelpers';
import { generateAIResponse } from './services/aiService';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateMessageId(),
      content: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnectedToAgent, setIsConnectedToAgent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateResponse = useCallback((userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      if (shouldTransferToAgent(userMessage)) {
        setMessages(prev => [...prev, {
          id: generateMessageId(),
          content: "I notice this might need special attention. I'll connect you with a customer service agent who can better assist you with this matter. Please hold.",
          sender: 'bot',
          timestamp: new Date(),
        }]);
        
        setTimeout(() => {
          setIsConnectedToAgent(true);
          setMessages(prev => [...prev, {
            id: generateMessageId(),
            content: "Hi, I'm Alex, your customer service representative. I've reviewed your query and I'm here to help. Could you please provide more details about your concern?",
            sender: 'agent',
            timestamp: new Date(),
          }]);
        }, 2000);
      } else {
        const aiResponse = generateAIResponse(userMessage);
        
        setMessages(prev => [...prev, {
          id: generateMessageId(),
          content: aiResponse,
          sender: 'bot',
          timestamp: new Date(),
        }]);
      }
      setIsTyping(false);
    }, 1000);
  }, []);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: generateMessageId(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    simulateResponse(content);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        <ChatHeader isConnectedToAgent={isConnectedToAgent} />
        
        <div className="h-[500px] overflow-y-auto p-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {!isConnectedToAgent && <QuickReplies onSelect={handleSendMessage} />}
        <ChatInput 
          onSendMessage={handleSendMessage}
          disabled={isTyping} 
        />
      </div>
    </div>
  );
}

export default App;