import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Feedback() {

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

const darkMode =
  localStorage.getItem("darkMode") === "true";

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const sendFeedback = async () => {

  if (!subject || !message) {
    alert("Please select a category and enter your feedback.");
    return;
  }

  try {

    await addDoc(collection(db, "feedback"), {
      subject,
      message,
      date: new Date().toLocaleString(),
      read: false
    });

    alert("Feedback sent successfully!");

    setSubject("");
    setMessage("");

  } catch (error) {

    console.error(error);

    alert("Failed to send feedback.");

  }

};

  return (
    <div
  style={{
    padding: "20px",
    background: darkMode ? "#111827" : "#f3f4f6",
    color: darkMode ? "#f9fafb" : "#111827",
    minHeight: "100vh",
    paddingBottom: "100px"
  }}
>

      <h1
  style={{
    color: darkMode ? "#f9fafb" : "#111827",
    marginBottom: "10px"
  }}
>
 Feedback
</h1>

<p
  style={{
    color: darkMode ? "#d1d5db" : "#6b7280",
    marginBottom: "15px"
  }}
>
  We value your feedback. Help us improve NESA Hub by reporting issues, sharing suggestions, or sending your comments.
</p>

      <select
  value={subject}
  onChange={(e) => setSubject(e.target.value)}
  style={{
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: darkMode
    ? "1px solid #374151"
    : "1px solid #d1d5db",
  background: darkMode ? "#1f2937" : "#ffffff",
  color: darkMode ? "#f9fafb" : "#111827",
  fontSize: "16px"
}}
>
  <option value="">Choose Category</option>
  <option value="Suggestion">💡 Suggestion</option>
  <option value="Report a Bug">🐞 Report a Bug</option>
  <option value="Academic Issue">📚 Academic Issue</option>
  <option value="App Issue">📱 App Issue</option>
  <option value="Complaint">⚠️ Complaint</option>
  <option value="Appreciation">❤️ Appreciation</option>
  <option value="Other">📝 Other</option>
</select>

      <textarea
        placeholder="Describe your issue, suggestion, or feedback in detail..."
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        style={{
  width: "100%",
  height: "150px",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: darkMode
    ? "1px solid #374151"
    : "1px solid #d1d5db",
  background: darkMode ? "#1f2937" : "#ffffff",
  color: darkMode ? "#f9fafb" : "#111827",
  fontSize: "16px",
  resize: "vertical"
}}
      />

      <button
        onClick={sendFeedback}
        style={{
  background: "#4f46e5",
  color: "white",
  padding: "12px 20px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 4px 10px rgba(79,70,229,0.35)"
}}
      >
        Send Feedback
      </button>

    </div>
  );
}

export default Feedback;