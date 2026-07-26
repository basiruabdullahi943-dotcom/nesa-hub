import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  setDoc,
  onSnapshot
} from "firebase/firestore";

function PastQuestions() {
  const [pastQuestions, setPastQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
const [semester, setSemester] = useState("");
const [session, setSession] = useState("");

const [pastQuestionSessions, setPastQuestionSessions] = useState([]);

useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "pastQuestionSessions"),
    (snapshot) => {
      const sessions = snapshot.docs
        .map((doc) => doc.data().session)
        .sort((a, b) => b.localeCompare(a));

      setPastQuestionSessions(sessions);
    }
  );

  return () => unsubscribe();
}, []);

const [savedItems, setSavedItems] = useState([]);

const darkMode =
  localStorage.getItem("darkMode") === "true";

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

useEffect(() => {
  loadPastQuestions();
  loadSavedItems();
}, []);

const loadPastQuestions = async () => {
  try {
    const snapshot = await getDocs(collection(db, "pastQuestions"));

    const questions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setPastQuestions(questions);

  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  loadPastQuestionSessions();
}, []);

const loadPastQuestionSessions = async () => {
  try {
    const snapshot = await getDocs(
      collection(db, "pastQuestionSessions")
    );

    const sessions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setPastQuestionSessions(sessions);

  } catch (error) {
    console.error(error);
  }
};

const loadSavedItems = async () => {
  try {
    const user = auth.currentUser;

    if (!user) return;

    const snapshot = await getDocs(
      collection(
        db,
        "savedItems",
        user.uid,
        "materials"
      )
    );

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setSavedItems(data);

  } catch (error) {
    console.error(error);
  }
};
  
const readyToShow =
  session !== "" &&
  level !== "" &&
  semester !== "";

 const filtered = readyToShow
  ? pastQuestions.filter((item) => {
  

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.courseCode.toLowerCase().includes(search.toLowerCase());

const matchesLevel =
  level !== "" &&
  item.level.toString() === level.replace("L", "");

const matchesSemester =
  semester !== "" && item.semester === semester;

const matchesSession =
  session !== "" && item.session === session;

console.log({
  itemSession: item.session,
  selectedSession: session,
  itemLevel: item.level,
  selectedLevel: level,
  itemSemester: item.semester,
  selectedSemester: semester
});

    return (
  matchesSearch &&
  matchesLevel &&
  matchesSemester &&
  matchesSession
);
})
: [];

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
  Past Questions
</h1>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: darkMode
    ? "1px solid #374151"
    : "1px solid #d1d5db",
  background: darkMode ? "#1f2937" : "#ffffff",
  color: darkMode ? "#f9fafb" : "#111827"
}}
      />

      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        style={{
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: darkMode
    ? "1px solid #374151"
    : "1px solid #d1d5db",
  background: darkMode ? "#1f2937" : "#ffffff",
  color: darkMode ? "#f9fafb" : "#111827"
}}

      >
        <option value="">Select Level</option>
<option value="100L">100L</option>
<option value="200L">200L</option>
<option value="300L">300L</option>
<option value="400L">400L</option>
      </select>

      <select
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        style={{
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: darkMode
    ? "1px solid #374151"
    : "1px solid #d1d5db",
  background: darkMode ? "#1f2937" : "#ffffff",
  color: darkMode ? "#f9fafb" : "#111827"
}}
      >
      <option value="">Select Semester</option>
<option value="First">First</option>
<option value="Second">Second</option>
      </select>

      <select
  value={session}
  onChange={(e) => setSession(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: darkMode
      ? "1px solid #374151"
      : "1px solid #d1d5db",
    background: darkMode ? "#1f2937" : "#ffffff",
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
  <option value="">Select Session</option>

{pastQuestionSessions.map((item) => (
  <option
    key={item.id}
    value={item.session}
  >
    {item.session}
  </option>
))}
</select>

  {!readyToShow ? (
  <p style={{ textAlign: "center" }}>
    Please select Session, Level and Semester.
  </p>
) : filtered.length === 0 ? (
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
    No past questions available
  </h3>

  <p
    style={{
      color: darkMode ? "#d1d5db" : "#6b7280"
    }}
  >
    No matching past questions were found.
  </p>
</div>
      ) : (
        filtered.map((item) => (
          <div
            key={item.id}
            style={{
  background: darkMode ? "#1f2937" : "#ffffff",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "12px",
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
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
  {item.title}
</h3>

            <p
  style={{
    color: darkMode ? "#93c5fd" : "#2563eb",
    fontWeight: "600"
  }}
>
  {item.courseCode}
</p>

<p
  style={{
    color: darkMode ? "#d1d5db" : "#6b7280"
  }}
>
  {item.level} Level • {item.semester} Semester • {item.session || "2025/2026"}
</p>

            <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "15px",
    flexWrap: "wrap"
  }}
>

  {item.type === "pdf" ? (
    <>
      <a
        href={item.file}
        target="_blank"
        rel="noreferrer"
        style={buttonStyle}
      >
       Open PDF
      </a>

      <a
        href={item.file}
        download={`${item.title}.pdf`}
        style={buttonStyle}
      >
         Download
      </a>
    </>
  ) : (
    <>
  <a
    href={item.link}
    target="_blank"
    rel="noreferrer"
    style={buttonStyle}
  >
    🔗 Open Drive
  </a>
</>
  )}

<button
  onClick={async () => {
    try {

      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      const alreadySaved = savedItems.find(
        (saved) => saved.id === item.id
      );

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

        alert("❌ Removed from Saved.");

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

        alert("✅ Saved successfully!");
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }}

  style={{
    ...buttonStyle,
    background:
      savedItems.find(
        (saved) => saved.id === item.id
      )
        ? "red"
        : "#f59e0b"
  }}
>
  {savedItems.find(
    (saved) => saved.id === item.id
  )
    ? "❤️ Saved"
    : "⭐ Save"}
</button>

</div>

          </div>
        ))
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
  border: "none",
  cursor: "pointer",
  fontWeight: "bold"
};

export default PastQuestions;