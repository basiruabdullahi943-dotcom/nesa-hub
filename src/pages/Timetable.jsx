import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Timetable() {

  const [timetables, setTimetables] =
    useState([]);

    const [selectedPDF, setSelectedPDF] = useState(null);

    const darkMode =
  localStorage.getItem("darkMode") === "true";

  useEffect(() => {
    window.scrollTo(0,0);
}, []);

useEffect(() => {

  const loadTimetables = async () => {

    try {

      const snapshot = await getDocs(
        collection(db, "timetables")
      );

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setTimetables(data);

    } catch (error) {

      console.error(error);

    }

  };

  loadTimetables();

}, []);

  return (
   <div
  style={{
    padding: "20px",
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
  📅 Timetables
</h1>

      {timetables.length === 0 ? (

        <div
  style={{
    background: darkMode ? "#1f2937" : "#ffffff",
    padding: "40px 20px",
    borderRadius: "12px",
    textAlign: "center",
    border: darkMode
      ? "1px solid #374151"
      : "1px solid #e5e7eb",
    boxShadow: darkMode
      ? "0 8px 18px rgba(0,0,0,0.35)"
      : "0 8px 18px rgba(0,0,0,0.08)"
  }}
>
  <h3
    style={{
      color: darkMode ? "#f9fafb" : "#111827",
      marginBottom: "10px"
    }}
  >
    No timetable uploaded yet
  </h3>

  <p
    style={{
      color: darkMode ? "#d1d5db" : "#6b7280"
    }}
  >
    No timetable has been uploaded by the admin.
  </p>
</div>

      ) : (

        timetables.map((item) => (

          <div
            key={item.id}
            style={{
              background: darkMode ? "#1f2937" : "#ffffff",
              boxShadow: darkMode
  ? "0 8px 18px rgba(0,0,0,0.35)"
  : "0 4px 10px rgba(0,0,0,0.1)",
border: darkMode
  ? "1px solid #374151"
  : "1px solid #e5e7eb",
              padding: "15px",
              marginTop: "15px",
              borderRadius: "10px"
            }}
          >

<div
  style={{
    fontSize: "45px",
    textAlign: "center",
    marginBottom: "10px"
  }}
>
  📄
</div>

            <h3
  style={{
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
  {item.title}
</h3>

            <p
  style={{
    color: darkMode ? "#d1d5db" : "#6b7280",
    fontSize: "13px",
    marginTop: "5px"
  }}
>
  📅 Uploaded: {item.uploadedAt || "Unknown"}
</p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
                flexWrap: "wrap"
              }}
            >

              <button
  onClick={() => setSelectedPDF(item.file)}
  style={{
    ...buttonStyle,
    border: "none",
    cursor: "pointer"
  }}
>
  👁 Preview
</button>

              <a
                href={item.file}
                download={`${item.title}.pdf`}
                style={buttonStyle}
              >
              ⬇ Download
              </a>

            </div>

          </div>

        ))

      )}

{selectedPDF && (
  <div
    style={{
      marginTop: "30px",
      background: darkMode ? "#1f2937" : "#ffffff",
      borderRadius: "15px",
      padding: "15px",
      boxShadow: darkMode
  ? "0 8px 18px rgba(0,0,0,0.35)"
  : "0 4px 10px rgba(0,0,0,0.1)",
  border: darkMode
  ? "1px solid #374151"
  : "1px solid #e5e7eb",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px"
      }}
    >
      <h3
  style={{
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
  📄 Timetable Preview
</h3>

      <button
        onClick={() => setSelectedPDF(null)}
        style={{
          background: "red",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        ✖ Close
      </button>
    </div>

    <iframe
      src={selectedPDF}
      title="Timetable Preview"
      width="100%"
      height="600px"
      style={{
        border: "none",
        borderRadius: "10px"
      }}
    />
  </div>
)}

    </div>
  );

}

const buttonStyle = {
  background: "#4f46e5",
  color: "white",
  padding: "10px 15px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold"
};

export default Timetable;