import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function ExecutiveDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const darkMode =
  localStorage.getItem("darkMode") === "true";

  const [exec, setExec] = useState(null);
const [loading, setLoading] = useState(true);

  useEffect(() => {

  window.scrollTo(0, 0);

  const loadExecutive = async () => {

    try {

      const snap = await getDoc(
        doc(db, "executives", id)
      );

      if (snap.exists()) {

        setExec({
          id: snap.id,
          ...snap.data()
        });

      }

    } catch (error) {

      console.error(error);

    }

    setLoading(false);

  };

  loadExecutive();

}, [id]);

if (loading) {
  return (
    <div
      style={{
        padding: "30px",
        textAlign: "center"
      }}
    >
      Loading...
    </div>
  );
}

  if (!exec) {
    return (
      <div
  style={{
    padding: "20px",
    paddingBottom: "100px",
    fontFamily: "Arial",
    background: darkMode ? "#111827" : "#f5f7fb",
    color: darkMode ? "#f9fafb" : "#111827",
    minHeight: "100vh"
  }}
>
        <h2>Executive not found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Arial",
        color: darkMode ? "#f9fafb" : "#111827",
        background: darkMode ? "#111827" : "#f5f7fb",
        minHeight: "100vh",
        padding: "20px",
        paddingBottom: "110px"
      }}
    >
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "10px 15px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
          background: darkMode ? "#1f2937" : "#e5e7eb",
color: darkMode ? "#f9fafb" : "#111827",
        }}
      >
        ← Back
      </button>

      {/* PROFILE CARD */}
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          background: darkMode ? "#1f2937" : "white",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: darkMode
  ? "0 10px 30px rgba(0,0,0,0.35)"
  : "0 10px 30px rgba(0,0,0,0.1)",
  border: darkMode
  ? "1px solid #374151"
  : "1px solid #e5e7eb",
        }}
      >
        {/* IMAGE HEADER */}
        <img
          src={exec.image}
          alt={exec.name}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            objectPosition: "top"
          }}
        />

        {/* CONTENT */}
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1
  style={{
    marginBottom: "8px",
    fontSize: "32px",
    fontWeight: "700",
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
  {exec.name}
</h1>

          <p
  style={{
    color: "#4f46e5",
    fontWeight: "600",
    fontSize: "18px",
    marginTop: "0",
    marginBottom: "25px",
    letterSpacing: "0.5px"
  }}
>
  {exec.position}
</p>

          {/* BIO */}
          <div style={{ textAlign: "left" }}>
            <h3
  style={{
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
  Biography
</h3>
            <p
  style={{
    lineHeight: "1.8",
    color: darkMode ? "#d1d5db" : "#374151"
  }}
>
              {exec.bio || "No biography available for this executive yet."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExecutiveDetails;