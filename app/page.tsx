import OpenAIStreamDisplay from "@/components/openai-stream-display";
import Link from "next/link";
import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <div className="p-8">Hello World!</div>
      <OpenAIStreamDisplay />
    </div>
  );
};

export default Home;
