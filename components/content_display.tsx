import React from "react";

type CSSColor =
  | "white"
  | "lightgray"
  | "lightblue"
  | "lightyellow"
  | "lightgreen";

const ContentDisplay: React.FC<{
  content: React.ReactNode;
  backgroundColor: CSSColor;
  shouldDisplay?: boolean;
}> = ({ content, backgroundColor, shouldDisplay = true }) => {
  if (!shouldDisplay) {
    return null;
  }

  return (
    <div className="flex-1 overflow-auto mt-2">
      <div
        className="px-4 rounded-lg m-auto max-w-[80%]"
        style={{ background: backgroundColor }}
      >
        <div className="whitespace-pre-wrap prose prose-sm max-w-none">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ContentDisplay;
