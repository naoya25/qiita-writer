import { NextResponse } from "next/server";

export const GET = (req: Request, res: NextResponse) => {
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
        {
          role: "system",
          content: `あなたは、Qiitaの記事を書くライターです。
            くライターです。
            記事の内容をtitle, body, tagsに分けてjson形式で出力してください。
            bodyはマークダウン形式で記述し、tagsは['tagA', 'tagB', 'tagC']のようにしてください。
            tagsは基本的にプログラミング言語（例: python, ruby）やIT技術に関する短い単語にしてください。`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
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
