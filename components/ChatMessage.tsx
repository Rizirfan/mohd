
import React from 'react';
import { ChatMessage, MessageRole } from '../types';
import { UserIcon, AiIcon } from './Icons';

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;

  const wrapperClasses = isUser ? 'flex justify-end' : 'flex justify-start';
  const bubbleClasses = isUser
    ? 'bg-blue-600 text-white rounded-l-2xl rounded-tr-2xl'
    : 'bg-gray-700 text-gray-200 rounded-r-2xl rounded-tl-2xl';
  const icon = isUser ? <UserIcon className="w-8 h-8 text-blue-400" /> : <AiIcon className="w-8 h-8 text-teal-400" />;

  return (
    <div className={`w-full flex items-start gap-3 my-4 ${wrapperClasses}`}>
      {!isUser && <div className="flex-shrink-0">{icon}</div>}
      <div className={`max-w-xl p-4 shadow-md ${bubbleClasses}`}>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      {isUser && <div className="flex-shrink-0">{icon}</div>}
    </div>
  );
};

export default ChatMessageComponent;
