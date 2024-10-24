import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownDisplay: React.FC<{
  content: string | undefined;
  shouldDisplay?: boolean;
}> = ({ content, shouldDisplay = true }) => {
  if (!content || !content.trim() || !shouldDisplay) {
    return null;
  }
  return (
    <div className="flex-1 overflow-auto mt-2">
      <div className="space-y-4">
        <div
          className="p-4 rounded-lg m-auto max-w-[80%]"
          style={{ background: "lightblue" }}
        >
          <div className="whitespace-pre-wrap prose prose-sm max-w-none">
            <div className="prose max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownDisplay;
