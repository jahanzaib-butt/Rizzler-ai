import { useState } from 'react';

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-zinc-800">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-full focus:outline-none focus:border-pink-500 text-white"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-transparent text-pink-500 border border-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition-colors"
        >
          Send
        </button>
      </div>
    </form>
  );
}