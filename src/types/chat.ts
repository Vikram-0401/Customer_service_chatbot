export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot' | 'agent';
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  isConnectedToAgent: boolean;
}

export type CommonQuery = {
  id: string;
  question: string;
  answer: string;
};