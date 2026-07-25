import { useEffect } from "react";

function AboutNESA() {
  const darkMode =
    localStorage.getItem("darkMode") === "true";

useEffect(() => {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, 0);
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
          📘 About NESA Hub
        </h1>

        <p
          style={{
            lineHeight: "1.8",
            color: darkMode ? "#d1d5db" : "#374151"
          }}
        >
          NESA Hub is the official student support platform developed
          for members of the Nigerian Economics Students Association
          (NESA), Bayero University Kano Chapter.
        </p>

        <p
          style={{
            lineHeight: "1.8",
            color: darkMode ? "#d1d5db" : "#374151"
          }}
        >
          The app provides easy access to lecture materials, past
          questions, departmental news, executive information,
          timetables, feedback, and student support services.
        </p>

        <p
          style={{
            lineHeight: "1.8",
            color: darkMode ? "#d1d5db" : "#374151"
          }}
        >
          Our mission is to improve communication, academic access,
          and student engagement within the Economics Department.
        </p>

        <div
  style={{
    marginTop: "30px",
    padding: "20px",
    borderRadius: "12px",
    background: darkMode ? "#111827" : "#f9fafb",
    border: darkMode
      ? "1px solid #374151"
      : "1px solid #e5e7eb"
  }}
>
  <h3
    style={{
      color: darkMode ? "#f9fafb" : "#111827",
      marginBottom: "10px"
    }}
  >
    👨‍💻 Development & Project Initiative
  </h3>

  <p
    style={{
      color: darkMode ? "#d1d5db" : "#374151",
      marginBottom: "8px"
    }}
  >
    <strong>Project Initiative:</strong> Khadijat Taiye Amore (Vice President)
  </p>

  <p
    style={{
      color: darkMode ? "#d1d5db" : "#374151",
      marginBottom: "8px"
    }}
  >
    <strong>Application Design & Development:</strong> Abdullah Adam (Project Manager)
  </p>

  <p
    style={{
      color: darkMode ? "#d1d5db" : "#374151",
      marginBottom: "8px",
      lineHeight: "1.7"
    }}
  >
    NESA Hub was developed as a collaborative initiative under the
    Nigerian Economics Students Association (NESA), Bayero University
    Kano Chapter, with the vision and project idea contributed by
    Khadijat Taiye Amore and the technical design and implementation
    carried out by Abdullah Adam.
  </p>

  <p
    style={{
      color: darkMode ? "#9ca3af" : "#6b7280",
      fontSize: "14px",
      marginTop: "12px"
    }}
  >
    © {new Date().getFullYear()} NESA Hub. All rights reserved.
  </p>
</div>
      </div>
    </div>
  );
}

export default AboutNESA;