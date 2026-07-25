import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Sample data (you can later replace with Firebase data)
  const data = [
    { title: "ECO3302 Lecture Note", type: "Material", route: "/materials" },
    { title: "Microeconomics PDF", type: "Material", route: "/materials" },
    { title: "NESA Orientation News", type: "News", route: "/news" },
    { title: "Departmental Announcement", type: "News", route: "/news" },
    { title: "President - Aiman", type: "Executive", route: "/executives" },
    { title: "Financial Secretary", type: "Executive", route: "/executives" },
    { title: "ECO2201 Past Questions", type: "Past Question", route: "/past-questions" },
    { title: "ECO4401 Past Questions", type: "Past Question", route: "/past-questions" }
  ];

  // Filter results
  const results = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        background: "#f3f4f6"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
        🔍 Search
      </h1>

      <input
        type="text"
        placeholder="Search materials, news, executives..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "12px",
          border: "1px solid #ddd",
          fontSize: "16px",
          outline: "none",
          marginBottom: "20px"
        }}
      />

      {search === "" ? (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            color: "#6b7280"
          }}
        >
          Start typing to search...
        </div>
      ) : results.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            color: "#ef4444"
          }}
        >
          No results found
        </div>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {results.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.route)}
              style={{
                background: "white",
                padding: "16px",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: "#111827"
                  }}
                >
                  {item.title}
                </h3>

                <span
                  style={{
                    background: "#4f46e5",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;