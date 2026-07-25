import { useEffect } from "react";

function Contribution() {
  const darkMode =
    localStorage.getItem("darkMode") === "true";

    useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <div
      style={{
        padding: "20px",
        background: darkMode ? "#111827" : "#f3f4f6",
        color: darkMode ? "#f9fafb" : "#111827",
        minHeight: "100vh",
        fontFamily: "Arial",
        paddingBottom: "100px"
      }}
    >
      <div
        style={{
          background: darkMode ? "#1f2937" : "#ffffff",
          borderRadius: "18px",
          padding: "30px",
          textAlign: "center",
          border: darkMode
            ? "1px solid #374151"
            : "1px solid #e5e7eb",
          boxShadow: darkMode
            ? "0 10px 25px rgba(0,0,0,0.35)"
            : "0 10px 25px rgba(0,0,0,0.08)"
        }}
      >
        <div style={{ fontSize: "60px", marginBottom: "15px" }}>
          💰
        </div>

        <h1
  style={{
    color: darkMode ? "#f9fafb" : "#111827",
    marginBottom: "20px",
    fontSize: "32px",
    fontWeight: "700"
  }}
>
  Support NESA
</h1>

        <p
          style={{
            color: darkMode ? "#d1d5db" : "#6b7280",
            lineHeight: "1.7",
            marginBottom: "25px"
          }}
        >
          Your support helps NESA continue organizing academic
          programs, seminars, student activities, and initiatives
          that benefit all Economics students.
        </p>

        <div
          style={{
            background: darkMode ? "#111827" : "#f9fafb",
            borderRadius: "15px",
            padding: "20px",
            marginBottom: "20px",
            border: darkMode
              ? "1px solid #374151"
              : "1px solid #e5e7eb"
          }}
        >
          <p
            style={{
              color: darkMode ? "#9ca3af" : "#6b7280",
              marginBottom: "5px",
              fontSize: "14px"
            }}
          >
            ACCOUNT NAME
          </p>

          <h2
            style={{
              color: darkMode ? "#f9fafb" : "#111827",
              marginBottom: "15px"
            }}
          >
            NESA Support Account
          </h2>

          <p
            style={{
              color: darkMode ? "#9ca3af" : "#6b7280",
              marginBottom: "5px",
              fontSize: "14px"
            }}
          >
            ACCOUNT NUMBER
          </p>

          <h1
            style={{
              color: "#2563eb",
              letterSpacing: "2px",
              marginBottom: "15px"
            }}
          >
            1234567890
          </h1>

          <button
  onClick={() => {
    navigator.clipboard.writeText("1234567890");
    alert("Account number copied!");
  }}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px"
  }}
>
  📋 Copy Account Number
</button>

          <p
            style={{
              color: darkMode ? "#9ca3af" : "#6b7280",
              marginBottom: "5px",
              fontSize: "14px"
            }}
          >
            BANK
          </p>

          <h3
            style={{
              color: darkMode ? "#f9fafb" : "#111827"
            }}
          >
            Example Bank
          </h3>
        </div>

        <p
          style={{
            color: darkMode ? "#d1d5db" : "#6b7280",
            fontSize: "14px",
            lineHeight: "1.6"
          }}
        >
          Thank you for supporting NESA and contributing to the
          growth of our student community.
        </p>
      </div>
    </div>
  );
}

export default Contribution;