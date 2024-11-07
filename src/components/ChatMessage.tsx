type MessageProps = {
  message: {
    role: 'user' | 'assistant';
    content: string;
  };
};

export default function ChatMessage({ message }: MessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} message-appear`}>
      <div
        className={`max-w-[85%] p-3 rounded-2xl ${
          isUser
            ? 'bg-pink-500 text-white'
            : 'bg-zinc-800 text-white'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}