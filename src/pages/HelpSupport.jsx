import { useEffect } from "react";

function HelpSupport() {
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
          🛠 Help & Support
        </h1>

        <p
          style={{
            lineHeight: "1.8",
            color: darkMode ? "#d1d5db" : "#374151",
            textAlign: "center",
            marginBottom: "30px"
          }}
        >
          Need assistance with NESA Hub? We are here to help.
        </p>

        <div style={{ marginBottom: "25px" }}>
          <h3>📞 WhatsApp Support</h3>
          <p style={{ color: darkMode ? "#d1d5db" : "#374151" }}>
            +234 9079983442
          </p>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h3>📧 Email Support</h3>
          <p style={{ color: darkMode ? "#d1d5db" : "#374151" }}>
            abdullahbinadam943@gmail.com
          </p>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h3>❓ Frequently Asked Questions</h3>

          <p style={{ color: darkMode ? "#d1d5db" : "#374151" }}>
            • How do I save materials?
          </p>

          <p style={{ color: darkMode ? "#d1d5db" : "#374151" }}>
            • How do I change my profile photo?
          </p>

          <p style={{ color: darkMode ? "#d1d5db" : "#374151" }}>
            • Why is a material not opening?
          </p>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h3>🐞 Report an Issue</h3>

          <p style={{ color: darkMode ? "#d1d5db" : "#374151" }}>
            Use the Feedback section to report technical problems,
            errors, or missing materials.
          </p>
        </div>

        <div>
          <h3>💡 Suggest a Feature</h3>

          <p style={{ color: darkMode ? "#d1d5db" : "#374151" }}>
            We welcome ideas that can improve NESA Hub for all
            Economics students.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HelpSupport;