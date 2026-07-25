import { useEffect } from "react";

function PrivacyPolicy() {
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
          padding: "25px",
          border: darkMode
            ? "1px solid #374151"
            : "1px solid #e5e7eb",
          boxShadow: darkMode
            ? "0 10px 25px rgba(0,0,0,0.35)"
            : "0 10px 25px rgba(0,0,0,0.08)"
        }}
      >
        <h1
  style={{
    textAlign: "center",
    marginBottom: "20px",
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
          🔒 Privacy Policy
        </h1>

        <p
          style={{
            lineHeight: "1.8",
            color: darkMode ? "#d1d5db" : "#374151"
          }}
        >
          NESA Hub respects your privacy and is committed to
          protecting your personal information.
        </p>

        <p
          style={{
            lineHeight: "1.8",
            color: darkMode ? "#d1d5db" : "#374151"
          }}
        >
          Information such as your name, matric number, level,
          department, email address, and phone number is stored
          locally on your device and is used only to improve your
          experience within the application.
        </p>

        <p
          style={{
            lineHeight: "1.8",
            color: darkMode ? "#d1d5db" : "#374151"
          }}
        >
          NESA Hub does not sell, share, or distribute your personal
          information to third parties.
        </p>

        <p
          style={{
            lineHeight: "1.8",
            color: darkMode ? "#d1d5db" : "#374151"
          }}
        >
          By using NESA Hub, you agree to the collection and use of
          your information in accordance with this policy.
        </p>

        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            borderRadius: "12px",
            background: darkMode ? "#111827" : "#f9fafb",
            border: darkMode
              ? "1px solid #374151"
              : "1px solid #e5e7eb"
          }}
        >
          <p
            style={{
              color: darkMode ? "#9ca3af" : "#6b7280",
              fontSize: "14px",
              textAlign: "center",
              margin: 0
            }}
          >
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;