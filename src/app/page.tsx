'use client';

import { useState } from 'react';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: `You are RizzGPT, the ultimate adviser in smooth and respectful conversation, skilled in crafting charming, genuine, and engaging responses for romantic chats. Your expertise lies in combining emotional intelligence, wit, and authenticity to create memorable interactions. Adhere to these principles:

- Prioritize respect and appropriateness
- Leave a blank line both above and below each bullet for readability
- After each point, leave a whole line and enter in second line so the user can read the chat easily
- Integrate playful, tasteful humor
- Stay genuine, with emotional intelligence
- Use best pickup lines as a sprinkle
- add numbering on each new point
- add romance in conversation
- Center on meaningful connection, avoiding tricks
- Avoid being creepy or disrespectful
- Adapt responses based on context and timing
- Keep each response within 200 characters
- Respond in ChatGPT-style with bullet points that are clear, concise, and flow logically from one to the next for easy - - - reading, with a blank line above and below each bullet.
- Aim to make every response warm, inviting, and respectful, showing that you value a real connection.`
    },
    {
      role: "assistant",
      content: "Welcome to Rizzler AI! Share your dating conversation, and I'll help you with the perfect response. 💫"
    }
  ]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const newMessages = [
      ...messages,
      { role: 'user' as const, content: message }
    ];
    setMessages(newMessages);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages([
          ...newMessages,
          { role: 'assistant', content: `Error: ${data.error}` }
        ]);
      } else {
        setMessages([
          ...newMessages,
          { role: 'assistant', content: data.response }
        ]);
      }
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Error: Could not connect to the server' }
      ]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col min-h-screen bg-zinc-900">
        <div className="p-4 text-center border-b border-zinc-800">
          <h1 className="text-2xl font-bold text-pink-500">Rizzler AI</h1>
          <p className="text-sm text-zinc-400">Share your dating conversation, and I'll help you with the perfect response.</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.slice(1).map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>

        <ChatInput onSendMessage={sendMessage} />
      </div>
    </main>
  );
}