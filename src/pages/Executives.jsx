import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Executives() {
  const [selectedSession, setSelectedSession] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

const [executiveSessions, setExecutiveSessions] = useState(
  JSON.parse(localStorage.getItem("executiveSessions")) || [
    "2024/2025",
    "2025/2026",
    "2026/2027"
  ]
);

const [executives, setExecutives] = useState([]);

  const navigate = useNavigate();
  const darkMode =
  localStorage.getItem("darkMode") === "true";

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

useEffect(() => {

  const loadExecutives = async () => {

    try {

      const snapshot = await getDocs(
        collection(db, "executives")
      );

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setExecutives(data);

    } catch (error) {

      console.error(error);

    }

  };

  loadExecutives();

}, []);

const filteredExecutives = executives.filter((exec) => {

  const matchesSearch =
    searchTerm === "" ||
    exec.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    exec.position
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  if (selectedSession === "") {
  // Don't show anything until a session is selected
  // or the user starts searching.
  if (searchTerm.trim() === "") {
    return false;
  }

  return matchesSearch;
}

  return (
    exec.session === selectedSession &&
    matchesSearch
  );

});
  return (
    <div
  style={{
    padding: "20px",
    paddingBottom: "100px",
    fontFamily: "Arial",
    background: darkMode ? "#111827" : "#f3f4f6",
    color: darkMode ? "#f9fafb" : "#111827",
    minHeight: "100vh"
  }}
>
      <h1
  style={{
    color: darkMode ? "#f9fafb" : "#111827",
    marginBottom: "20px"
  }}
>
  👨‍🎓 NESA Executives
</h1>

      <div style={{ marginTop: "20px" }}>
  <select
    value={selectedSession}
    onChange={(e) => setSelectedSession(e.target.value)}
    style={{
      color: darkMode ? "#f9fafb" : "#111827",
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: darkMode
  ? "1px solid #374151"
  : "1px solid #d1d5db",
      fontSize: "16px",
      background: darkMode ? "#1f2937" : "#ffffff"
    }}
  >
    <option value="">📅 Select a session</option>
    {executiveSessions.map((s) => (
  <option key={s} value={s}>
    {s}
  </option>
))}
  </select>
</div>

<input
  type="text"
  placeholder="🔍 Search by name or position..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{
  width: "100%",
  padding: "12px",
  marginTop: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: darkMode
    ? "1px solid #374151"
    : "1px solid #d1d5db",
  background: darkMode ? "#1f2937" : "#ffffff",
  color: darkMode ? "#f9fafb" : "#111827",
  fontSize: "16px"
}}
/>

{(selectedSession !== "" || searchTerm !== "") && (
  <button
    onClick={() => {
      setSelectedSession("");
      setSearchTerm("");
    }}
    style={{
      marginTop: "10px",
      marginBottom: "20px",
      padding: "10px 16px",
      background: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    🧹 Clear Filters
  </button>
)}

      {/* EXECUTIVES LIST */}

    {searchTerm.trim() !== "" && (
  <p
  style={{
    marginTop: "15px",
    color: darkMode ? "#d1d5db" : "#6b7280",
    fontWeight: "bold"
  }}
>
  Showing {filteredExecutives.length} result
  {filteredExecutives.length !== 1 ? "s" : ""}
  {selectedSession !== "" && (
    <> in {selectedSession}</>
  )}
</p>
)}
      {filteredExecutives.length === 0 ? (
        <div
  style={{
    textAlign: "center",
    marginTop: "40px",
    color: "#6b7280"
  }}
>
  {selectedSession === "" && searchTerm === "" ? (

    <>
      <h3>📅 Select a session</h3>

      <p>
        Or search by name or position across all sessions.
      </p>
    </>

  ) : selectedSession === "" ? (

    <div
  style={{
    textAlign: "center",
    padding: "30px 20px"
  }}
>
  <div
    style={{
      fontSize: "60px",
      marginBottom: "15px"
    }}
  >
    👤
  </div>

  <h3
    style={{
      color: darkMode ? "#f9fafb" : "#374151",
      marginBottom: "10px"
    }}
  >
    No Executives Found
  </h3>

  <p
    style={{
      color: darkMode ? "#d1d5db" : "#6b7280",
      fontSize: "15px"
    }}
  >
    Try selecting another session or searching with a different name.
  </p>
</div>

  ) : (

    <div
  style={{
    textAlign: "center",
    padding: "30px 20px"
  }}
>
  <div
    style={{
      fontSize: "60px",
      marginBottom: "15px"
    }}
  >
    👤
  </div>

  <h3
    style={{
      color: darkMode ? "#f9fafb" : "#374151",
      marginBottom: "10px"
    }}
  >
    No Executives Found
  </h3>

  <p
    style={{
      color: darkMode ? "#d1d5db" : "#6b7280",
      fontSize: "15px"
    }}
  >
    Try selecting another session or searching with a different name.
  </p>
</div>

  )}
</div>
      ) : (
        <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "15px",
    marginTop: "20px"
  }}
>
    {filteredExecutives.map((exec) => (
      <div
        key={exec.id}
        onClick={() =>
  navigate(`/executive/${exec.id}`, {
    state: {
      session: exec.session
    }
  })
}
        style={{
          background: darkMode ? "#1f2937" : "#ffffff",
          borderRadius: "15px",
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: darkMode
  ? "0 8px 18px rgba(0,0,0,0.35)"
  : "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
          border: darkMode
  ? "1px solid #374151"
  : "1px solid #e5e7eb",
          paddingBottom: "10px"
        }}
      >
        <img
          src={exec.image}
          alt={exec.name}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover"
          }}
        />

        <h3
  style={{
    marginTop: "10px",
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
  {exec.name}
</h3>

<p
  style={{
    color: darkMode ? "#d1d5db" : "#6b7280",
    fontSize: "14px"
  }}
>
  {exec.position}
</p>

        <p
  style={{
    display: "inline-block",
    background: darkMode ? "#312e81" : "#eef2ff",
color: darkMode ? "#c7d2fe" : "#4f46e5",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    marginTop: "6px"
  }}
>
  📅 {exec.session}
</p>
      </div>
    ))}
</div>
      )}
    </div>
  );
}

export default Executives;