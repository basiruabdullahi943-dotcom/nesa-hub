import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  addDoc,
  where,
  getDoc
} from "firebase/firestore";

import { auth, db } from "../firebase";

import { useNavigate } from "react-router-dom";

function Materials() {

  const navigate = useNavigate();
  useEffect(() => {
  const profile =
    JSON.parse(localStorage.getItem("userProfile"));

  if (!profile) {
    navigate("/login");
  }
}, []);
  const [selectedSession, setSelectedSession] = useState("");
const [selectedLevel, setSelectedLevel] = useState("100L");
const [selectedSemester, setSelectedSemester] = useState("1st Semester");
  const [saved1, setSaved1] = useState(false);
  const [saved2, setSaved2] = useState(false);
  const [saved3, setSaved3] = useState(false);
  const [search, setSearch] = useState("");
  const darkMode =
  localStorage.getItem("darkMode") === "true";

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const materialCard = {
  background: darkMode ? "#1f2937" : "#ffffff",
  padding: "20px",
  borderRadius: "16px",
  marginTop: "20px",
  border: darkMode
    ? "1px solid #374151"
    : "1px solid #e5e7eb",
  boxShadow: darkMode
    ? "0 8px 20px rgba(0,0,0,0.35)"
    : "0 8px 20px rgba(0,0,0,0.08)"
};

  const [materials, setMaterials] =
  useState([]);

const [materialSessions, setMaterialSessions] = useState([]);

const [savedItems, setSavedItems] = useState([]);

useEffect(() => {

  const loadMaterials = async () => {

    try {

      const snapshot = await getDocs(
        collection(db, "materials")
      );

      const materialsData =
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

      setMaterials(materialsData);

    } catch (error) {

      console.error(error);

    }

  };

  loadMaterials();

}, []);

useEffect(() => {

  const loadMaterialSessions = async () => {

    try {

      const snapshot = await getDocs(
        collection(db, "materialSessions")
      );

      const sessions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setMaterialSessions(sessions);

    } catch (error) {

      console.error(error);

    }

  };

  loadMaterialSessions();

}, []);

useEffect(() => {

  const loadSavedItems = async () => {

    const user = auth.currentUser;

    if (!user) return;

    try {

      const snapshot = await getDocs(
        collection(db, "savedItems", user.uid, "materials")
      );

      const saved = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setSavedItems(saved);

    } catch (error) {

      console.error(error);

    }

  };

  loadSavedItems();

}, []);

  return (
  <div
    style={{
      padding: "20px",
      paddingBottom: "160px",
      fontFamily: "Arial",
      background: darkMode ? "#111827" : "#f3f4f6",
      color: darkMode ? "#f9fafb" : "#111827",
      minHeight: "100vh"
    }}
  >

      <h1
  style={{
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
  📚 Lecture Materials
</h1>

      <p>Select your session, level and semester</p>

<h3>Session</h3>

<select
  value={selectedSession}
  onChange={(e) => setSelectedSession(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: darkMode
      ? "1px solid #374151"
      : "1px solid #ccc",
    background: darkMode ? "#1f2937" : "#ffffff",
    color: darkMode ? "#f9fafb" : "#111827",
    marginBottom: "20px"
  }}
>
  <option value="">Select Session</option>
  {materialSessions.map((item) => (
  <option
    key={item.id}
    value={item.session}
  >
    {item.session}
  </option>
))}
</select>

      {/* LEVELS */}

      <h3>Level</h3>

      <div style={buttonContainer}>

        <button
          style={selectedLevel === "100L" ? activeButton : buttonStyle}
          onClick={() => setSelectedLevel("100L")}
        >
          100L
        </button>

        <button
          style={selectedLevel === "200L" ? activeButton : buttonStyle}
          onClick={() => setSelectedLevel("200L")}
        >
          200L
        </button>

        <button
          style={selectedLevel === "300L" ? activeButton : buttonStyle}
          onClick={() => setSelectedLevel("300L")}
        >
          300L
        </button>

        <button
          style={selectedLevel === "400L" ? activeButton : buttonStyle}
          onClick={() => setSelectedLevel("400L")}
        >
          400L
        </button>

      </div>

      {/* SEMESTER */}

      <h3 style={{ marginTop: "20px" }}>Semester</h3>

      <div style={buttonContainer}>

        <button
          style={selectedSemester === "1st Semester" ? activeButton : buttonStyle}
          onClick={() => setSelectedSemester("1st Semester")}
        >
          1st Semester
        </button>

        <button
          style={selectedSemester === "2nd Semester" ? activeButton : buttonStyle}
          onClick={() => setSelectedSemester("2nd Semester")}
        >
          2nd Semester
        </button>

      </div>

      {/* SEARCH BAR */}

<input
  type="text"
  placeholder="Search materials..."
  value={search}
  onChange={(e) =>
setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "15px",
    marginTop: "25px",
    borderRadius: "10px",
    border: darkMode
  ? "1px solid #374151"
  : "1px solid #ccc",
    fontSize: "16px",
    background: darkMode ? "#1f2937" : "#ffffff",
color: darkMode ? "#f9fafb" : "#111827",
  }}
/>
      {/* DISPLAY */}

      {/* MATERIAL LIST */}

<div style={{ marginTop: "30px" }}>

<div style={{ marginTop: "30px" }}>

<p
  style={{
    fontWeight: "bold",
    color: darkMode ? "#93c5fd" : "#4f46e5",
    marginBottom: "15px"
  }}
>
  {
    materials.filter(
  (item) =>
    item.session === selectedSession &&
    item.level ===
      selectedLevel.replace("L", "") &&
    item.semester ===
      (
        selectedSemester ===
        "1st Semester"
          ? "First"
          : "Second"
      )
).length
  } Materials Available
</p>

{
  materials.filter(
  (item) =>
    item.session === selectedSession &&
    item.level ===
      selectedLevel.replace("L", "") &&
    item.semester ===
      (
        selectedSemester ===
        "1st Semester"
          ? "First"
          : "Second"
      )
).length === 0 && (

    <div
  style={{
    background: darkMode ? "#1f2937" : "white",
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
    marginTop: "15px"
  }}
>
 No materials found
</h3>

      <p
  style={{
    color: darkMode ? "#d1d5db" : "#6b7280",
    lineHeight: "1.6"
  }}
>
  Materials for this level and semester
        have not been uploaded.
</p>
    </div>

  )
}

  {materials
  .filter(
    (item) =>
      item.session === selectedSession &&
      item.level ===
        selectedLevel.replace("L", "") &&
      item.semester ===
        (
          selectedSemester ===
          "1st Semester"
            ? "First"
            : "Second"
        )
  )

  .filter((item) =>
    item.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )
    .map((item) => (

      <div key={item.id} style={materialCard}>

        <div
  style={{
    display: "inline-block",
    background: "#4f46e5",
    color: "white",
    padding: "5px 10px",
    borderRadius: "8px",
    fontWeight: "bold",
    marginBottom: "10px"
  }}
>
  {item.courseCode}
</div>

<p
  style={{
    fontWeight: "bold",
    marginTop: "5px",
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
  {item.title}
</p>

<p
  style={{
    color: darkMode ? "#d1d5db" : "#6b7280"
  }}
>
   {item.session} {selectedLevel} | {selectedSemester}
</p>

<p
  style={{
    color: darkMode ? "#d1d5db" : "#6b7280"
  }}
>
  {item.type === "pdf"
    ? "📄 PDF"
    : "🔗 Google Drive"}
</p>

        <div style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
          flexWrap: "wrap"
        }}>

   <button
  onClick={() => {

    if (
      item.type === "pdf" &&
      item.file
    ) {

      window.open(
        item.file,
        "_blank"
      );

    }

    else if (
      item.type === "link" &&
      item.link
    ) {

      window.open(
        item.link,
        "_blank"
      );

    }

    else {

      alert(
        "Material not available"
      );

    }

  }}

  style={actionButton}
>
  Open Material
</button>

      <button
  onClick={() => {

    if (
      item.type === "pdf"
    ) {

      const link =
        document.createElement(
          "a"
        );

      link.href =
        item.file;

      link.download =
        item.title +
        ".pdf";

      link.click();

    }

    else {

      window.open(
        item.link,
        "_blank"
      );

    }

  }}

  style={actionButton}
>
  Download
</button>

<button
  onClick={async () => {

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      return;
    }

    const alreadySaved = savedItems.find(
      (saved) => saved.id === item.id
    );

    try {

      if (alreadySaved) {

        await deleteDoc(
          doc(
            db,
            "savedItems",
            user.uid,
            "materials",
            item.id
          )
        );

        setSavedItems(
          savedItems.filter(
            (saved) => saved.id !== item.id
          )
        );

      } else {

        await setDoc(
          doc(
            db,
            "savedItems",
            user.uid,
            "materials",
            item.id
          ),
          item
        );

        setSavedItems([
          ...savedItems,
          item
        ]);

      }

    } catch (error) {

      console.error(error);

      alert("Failed to save material.");

    }

  }}

  style={{
    ...saveButton,

    background:
      savedItems.find(
        (saved) => saved.id === item.id
      )
        ? "red"
        : "#f59e0b"
  }}
>
  ⭐ Save
</button>

        </div>

      </div>

    ))}

</div>

</div>

    </div>

  );
}

const buttonContainer = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const buttonStyle = {
  padding: "12px 20px",
  border: "none",
  borderRadius: "10px",
  background: "#e5e7eb",
  cursor: "pointer",
  fontWeight: "bold"
};

const activeButton = {
  ...buttonStyle,
  background: "#4f46e5",
  color: "white"
};


const actionButton = {
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
  background: "#4f46e5",
  color: "white",
  cursor: "pointer"
};

const saveButton = {
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
  background: "#f59e0b",
  color: "white",
  cursor: "pointer"
};

export default Materials;