
export enum MessageRole {
  USER = 'user',
  AI = 'ai',
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}
