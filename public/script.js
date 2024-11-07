let chatHistory = [{
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
}];

function addMessage(content, isUser) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    messageDiv.appendChild(messageContent);
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    addMessage(message, true);
    input.value = '';
    
    chatHistory.push({ role: "user", content: message });
    
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages: chatHistory }),
        });
        
        const data = await response.json();
        
        if (data.error) {
            addMessage('Error: ' + data.error, false);
        } else {
            const botResponse = data.response;
            addMessage(botResponse, false);
            chatHistory.push({ role: "assistant", content: botResponse });
        }
    } catch (error) {
        addMessage('Error: Could not connect to the server', false);
    }
}

document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
