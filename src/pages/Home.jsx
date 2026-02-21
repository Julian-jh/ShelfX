import React from "react";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        width: "100vw",
        background: "linear-gradient(135deg, #1677FF 0%, #52C41A 100%)",
      }}
    >
      <h1
        style={{
          fontSize: "3.5rem",
          fontWeight: "bold",
          color: "#fff",
          textShadow: "0 4px 24px rgba(22,119,255,0.25)",
          letterSpacing: "2px",
          marginBottom: "24px",
          animation: "fadeIn 1.2s ease",
        }}
      >
        Welcome to{" "}
        <span style={{ color: "#FFD700", textShadow: "0 2px 8px #52C41A" }}>
          ShelfX
        </span>{" "}
        Online Bookstore!
      </h1>
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
