export const generateMessageId = () => Math.random().toString(36).substring(7);

export const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

export const shouldTransferToAgent = (message: string): boolean => {
  const complexKeywords = [
    'supervisor',
    'manager',
    'complaint',
    'refund',
    'damaged',
    'broken',
    'defective',
    'urgent',
    'emergency',
    'escalate',
    'frustrated',
    'angry',
    'dissatisfied',
    'compensation'
  ];
  return complexKeywords.some(keyword => 
    message.toLowerCase().includes(keyword)
  );
};