"use client";
import { postQiita } from "@/features/qiita";

export default function Home() {
  const handlePostQiita = async () => {
    await postQiita();
  };

  return (
    <div>
      <button onClick={handlePostQiita}>Post to Qiita</button>
      <div className="p-8">Hello World!</div>
    </div>
  );
}
