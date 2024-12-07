import { CommonQuery } from '../types/chat';

const productQueries: CommonQuery[] = [
  {
    id: 'product-1',
    question: 'price',
    answer: 'Our prices vary by product. Could you specify which item you\'re interested in? I can then provide you with accurate pricing information.'
  },
  {
    id: 'product-2',
    question: 'warranty',
    answer: 'We offer a standard 1-year warranty on all electronics and 6 months on other products. Extended warranty options are also available.'
  },
  {
    id: 'product-3',
    question: 'discount',
    answer: 'We regularly offer discounts to our loyal customers. Sign up for our newsletter to receive updates about our latest promotions and sales.'
  }
];

const accountQueries: CommonQuery[] = [
  {
    id: 'account-1',
    question: 'login',
    answer: 'To log in to your account, visit our website and click the "Sign In" button in the top right corner. Enter your email and password to access your account.'
  },
  {
    id: 'account-2',
    question: 'password',
    answer: 'You can reset your password by clicking "Forgot Password" on the login page. We\'ll send you an email with instructions to create a new password.'
  }
];

const supportQueries: CommonQuery[] = [
  {
    id: 'support-1',
    question: 'contact',
    answer: 'You can reach our support team via email at support@example.com or call us at 1-800-EXAMPLE during business hours (9 AM - 6 PM EST).'
  },
  {
    id: 'support-2',
    question: 'hours',
    answer: 'Our customer service team is available Monday through Friday, 9 AM to 6 PM EST. For urgent matters, you can leave a message, and we\'ll get back to you the next business day.'
  }
];

export const generateAIResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  // Check all query categories
  const allQueries = [...productQueries, ...accountQueries, ...supportQueries];
  
  // Find the most relevant query
  const relevantQuery = allQueries.find(query => 
    message.includes(query.question.toLowerCase())
  );
  
  if (relevantQuery) {
    return relevantQuery.answer;
  }

  // Handle greetings
  if (message.match(/\b(hi|hello|hey|greetings)\b/i)) {
    return "Hello! How can I assist you today?";
  }

  // Handle thank you messages
  if (message.match(/\b(thanks|thank you|thx)\b/i)) {
    return "You're welcome! Is there anything else I can help you with?";
  }

  // Handle goodbyes
  if (message.match(/\b(bye|goodbye|see you|farewell)\b/i)) {
    return "Goodbye! Have a great day! Feel free to come back if you need any further assistance.";
  }

  // Handle general product inquiries
  if (message.includes('product') || message.includes('item')) {
    return "I'd be happy to help you with product information. Could you please specify which product you're interested in?";
  }

  // Handle shipping inquiries
  if (message.includes('ship') || message.includes('delivery')) {
    return "We offer various shipping options including Standard (5-7 days), Express (2-3 days), and Next Day delivery. Would you like to know more about a specific shipping method?";
  }

  // Handle payment inquiries
  if (message.includes('pay') || message.includes('payment') || message.includes('card')) {
    return "We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely. Would you like more details about a specific payment method?";
  }

  // Default response with follow-up questions
  return "I'd like to help you better. Could you please provide more details about your question? For example, are you asking about:\n" +
         "- Product information\n" +
         "- Shipping and delivery\n" +
         "- Account management\n" +
         "- Payment methods\n" +
         "- Returns and refunds";
};