import { useEffect } from "react";

function TermsConditions() {
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
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
  <span style={{ fontSize: "40px" }}>📜</span>
  <span>Terms & Conditions</span>
</h1>

        <p
  style={{
    lineHeight: "1.8",
    marginBottom: "18px",
    color: darkMode ? "#d1d5db" : "#374151"
  }}
>
  By using NESA Hub, you agree to use the platform responsibly and
  for educational purposes only.
</p>

<p
  style={{
    lineHeight: "1.8",
    marginBottom: "18px",
    color: darkMode ? "#d1d5db" : "#374151"
  }}
>
  Lecture materials, past questions, and other resources provided
  through the app are intended to support academic activities within
  the Economics Department.
</p>

<p
  style={{
    lineHeight: "1.8",
    marginBottom: "18px",
    color: darkMode ? "#d1d5db" : "#374151"
  }}
>
  Users should not misuse, modify, or redistribute materials in a
  way that violates applicable academic or copyright regulations.
</p>

<p
  style={{
    lineHeight: "1.8",
    marginBottom: "18px",
    color: darkMode ? "#d1d5db" : "#374151"
  }}
>
  NESA Hub reserves the right to update features, policies, and
  content when necessary to improve the platform.
</p>

<p
  style={{
    lineHeight: "1.8",
    marginBottom: "18px",
    color: darkMode ? "#d1d5db" : "#374151"
  }}
>
  Users are responsible for ensuring that the information they
  provide is accurate and up to date.
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
    Effective date: {new Date().toLocaleDateString()}
  </p>
</div>

        
      </div>
    </div>
  );
}

export default TermsConditions;