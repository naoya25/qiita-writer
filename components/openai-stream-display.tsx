"use client";

import { useState, useEffect } from "react";

const OpenAIStreamDisplay: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [article, setArticle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setArticle("");

    try {
      const response = await fetch("/api/openai-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setInput("");

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0].delta.content;
              if (content) {
                setArticle((prevArticle) => prevArticle + content);
              }
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setArticle("エラーが発生しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 max-w-[80%] m-auto"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="書きたい記事はなんですか？"
          className="w-full p-2 border rounded-lg resize-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? "送信中..." : "送信"}
        </button>
      </form>

      {article != "" && (
        <div className="flex-1 overflow-auto">
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-100 m-auto max-w-[80%]">
              <p className="whitespace-pre-wrap">{article}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OpenAIStreamDisplay;
