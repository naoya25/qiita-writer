import React, { useState } from "react";

const ArticleFormField: React.FC<{
  onSubmit: (input: string) => void;
  isLoading: boolean;
}> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(input);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 max-w-[80%] m-auto mt-5"
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
  );
};

export default ArticleFormField;
