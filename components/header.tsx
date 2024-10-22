import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const HEADER_HEIGHT = 60;
  return (
    <>
      <header
        style={{
          textAlign: "center",
          padding: "3px",
          position: "fixed",
          top: 0,
          left: 0,
          height: `${HEADER_HEIGHT}px`,
          width: "100%",
          background: "linear-gradient(to right, #6b46c1, #4299e1)",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "2em", color: "white" }}>
          <Link href="/">Qiita Writer</Link>
        </h1>
      </header>
      <div style={{ height: `${HEADER_HEIGHT}px` }} />
    </>
  );
};

export default Header;
