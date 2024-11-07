require('dotenv').config();
const Groq = require('groq-sdk');
const readline = require('readline');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const chatHistory = [];

async function chat() {
  try {
    const userInput = await new Promise((resolve) => {
      rl.question('\nYou: ', resolve);
    });

    if (userInput.toLowerCase() === 'exit') {
      console.log('\nGoodbye! 👋');
      rl.close();
      return;
    }

    chatHistory.push({ role: "user", content: userInput });

    const chatCompletion = await groq.chat.completions.create({
      messages: chatHistory,
      model: "llama-3.2-11b-text-preview",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
    });

    process.stdout.write('\nBot: ');
    let responseContent = '';

    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || '';
      process.stdout.write(content);
      responseContent += content;
    }

    chatHistory.push({ role: "assistant", content: responseContent });
    console.log('\n');
    chat();
  } catch (error) {
    console.error('\nError:', error.message);
    chat();
  }
}

console.log('Welcome to the Groq Chatbot! Type "exit" to end the conversation.\n');
chat();