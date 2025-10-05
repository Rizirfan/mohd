
import React, { useState, useRef, useEffect } from 'react';
import type { Chat, GenerateContentResponse } from '@google/genai';
import { createChatSession } from './services/geminiService';
import { ChatMessage, MessageRole } from './types';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import { AiIcon } from './components/Icons';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    chatRef.current = createChatSession();
    setMessages([
        {
            id: 'initial-ai-message',
            role: MessageRole.AI,
            content: "Hello! I'm your personal AI assistant. How can I help you today?"
        }
    ]);
  }, []);

  const handleSendMessage = async (userMessage: string) => {
    if (!chatRef.current) return;
    
    setIsLoading(true);

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      content: userMessage,
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const stream = await chatRef.current.sendMessageStream({ message: userMessage });
      
      let aiResponseText = '';
      const aiMessageId = (Date.now() + 1).toString();

      // Add a placeholder for the AI response
      setMessages(prev => [...prev, { id: aiMessageId, role: MessageRole.AI, content: '' }]);
      
      for await (const chunk of stream) {
        const chunkText = (chunk as GenerateContentResponse).text;
        aiResponseText += chunkText;
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId ? { ...msg, content: aiResponseText } : msg
        ));
      }

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.AI,
        content: "Sorry, I encountered an error. Please try again."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
        <header className="flex items-center justify-center p-4 bg-gray-800 border-b border-gray-700 shadow-md">
            <AiIcon className="w-8 h-8 mr-3 text-teal-400"/>
            <h1 className="text-2xl font-bold tracking-wider text-gray-200">Personal AI Assistant</h1>
        </header>
        <ChatHistory messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
