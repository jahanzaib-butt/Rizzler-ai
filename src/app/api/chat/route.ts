import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama3-70b-8192",
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      stream: false,
      stop: null,
    });

    return NextResponse.json({ 
      response: chatCompletion.choices[0].message.content 
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}