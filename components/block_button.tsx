import React from "react";

interface BlockButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

const BlockButton: React.FC<BlockButtonProps> = ({
  onClick,
  disabled,
  children,
}) => {
  return (
    <div className="max-w-[80%] m-auto">
      <button
        type="submit"
        disabled={disabled}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 w-full h-full"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default BlockButton;
