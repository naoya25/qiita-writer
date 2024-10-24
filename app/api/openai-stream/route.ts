import { SYSTEM_PROMPT } from "@/constants/prompt";
import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
};

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      stream: true,
    }),
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "OpenAI API error" }), {
      status: response.status,
    });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
