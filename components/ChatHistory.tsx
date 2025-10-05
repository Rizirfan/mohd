
import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import ChatMessageComponent from './ChatMessage';

interface ChatHistoryProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto">
      {messages.map((msg) => (
        <ChatMessageComponent key={msg.id} message={msg} />
      ))}
      {isLoading && messages[messages.length-1]?.role === 'user' && (
         <div className="flex justify-start gap-3 my-4">
            <div className="w-8 h-8 text-teal-400 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.5,12.5c0,4.41-3.59,8-8,8s-8-3.59-8-8s3.59-8,8-8c2.13,0,4.09,0.84,5.55,2.22l-1.41,1.41C14.63,7.13,13.11,6.5,11.5,6.5c-3.31,0-6,2.69-6,6s2.69,6,6,6s6-2.69,6-6H19.5z" />
                    <path d="M13.5 10.5c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2zM10.5 14.5c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2zM16.5 14.5c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2z" />
                </svg>
            </div>
            <div className="max-w-xl p-4 bg-gray-700 rounded-r-2xl rounded-tl-2xl">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
