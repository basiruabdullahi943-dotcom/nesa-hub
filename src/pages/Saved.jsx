import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";

import { auth, db } from "../firebase";

function Saved() {
  const [savedItems, setSavedItems] =
    useState([]);

    const darkMode =
  localStorage.getItem("darkMode") === "true";

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

useEffect(() => {

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

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setSavedItems(data);

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
    fontFamily: "Arial",
    background: darkMode ? "#111827" : "#f3f4f6",
    color: darkMode ? "#f9fafb" : "#111827",
    minHeight: "100vh",
    paddingBottom: "100px"
  }}
>
      <h1
  style={{
    color: darkMode ? "#f9fafb" : "#111827",
    marginBottom: "20px"
  }}
>
  ⭐ Saved Materials
</h1>

      {savedItems.length === 0 ? (
        <div
  style={{
    background: darkMode ? "#1f2937" : "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    textAlign: "center",
    border: darkMode
  ? "1px solid #374151"
  : "1px solid #e5e7eb",

boxShadow: darkMode
  ? "0 8px 18px rgba(0,0,0,0.35)"
  : "0 8px 18px rgba(0,0,0,0.08)",
  }}
>
  <h3
  style={{
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
  ⭐ No saved materials yet
</h3>

  <p
  style={{
    color: darkMode ? "#d1d5db" : "#6b7280"
  }}
>
  Materials you save will appear here.
</p>
</div>
      ) : (
        savedItems.map((item) => (
          <div
            key={item.id}
            style={{
              background: darkMode ? "#1f2937" : "#ffffff",
              padding: "15px",
              marginTop: "15px",
              borderRadius: "12px",
              border: darkMode
  ? "1px solid #374151"
  : "1px solid #e5e7eb",

boxShadow: darkMode
  ? "0 8px 18px rgba(0,0,0,0.35)"
  : "0 8px 18px rgba(0,0,0,0.08)",
            }}
          >
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

<h2
  style={{
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
  {item.title}
</h2>

      <p
  style={{
    color: darkMode ? "#d1d5db" : "#6b7280"
  }}
>
  {item.level} Level •{" "}
  {item.semester} Semester
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

    }}

    style={{
      background: "#4f46e5",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer"
    }}
  >
    Open Material
  </button>

  <button
   onClick={async () => {

  try {

    const user = auth.currentUser;

    if (!user) return;

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
        saved => saved.id !== item.id
      )
    );

  } catch (error) {

    console.error(error);

    alert("Failed to remove item.");

  }

}}

    style={{
      background: "red",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer"
    }}
  >
    Remove
  </button>
</div>
          </div>
        ))
      )}
    </div>
  );
}

export default Saved;