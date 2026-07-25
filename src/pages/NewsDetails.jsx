import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function NewsDetails() {
  const { id } = useParams();

  const darkMode =
  localStorage.getItem("darkMode") === "true";

  const [news, setNews] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {

  window.scrollTo(0, 0);

  const loadNews = async () => {

    try {

      const snap = await getDoc(
        doc(db, "news", id)
      );

      if (snap.exists()) {

        setNews({
          id: snap.id,
          ...snap.data()
        });

      }

    } catch (error) {

      console.error(error);

    }

    setLoading(false);

  };

  loadNews();

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

  if (!news) {
    return (
      <div
  style={{
    padding: "20px",
    background: darkMode ? "#111827" : "#ffffff",
    color: darkMode ? "#f9fafb" : "#111827",
    minHeight: "100vh"
  }}
>
        <h2>News not found</h2>
      </div>
    );
  }

  return (
  <div
    style={{
      padding: "20px",
      background: darkMode ? "#111827" : "#ffffff",
      color: darkMode ? "#f9fafb" : "#111827",
      minHeight: "100vh"
    }}
  >
    <h1
      style={{
        color: darkMode ? "#f9fafb" : "#111827"
      }}
    >
      {news.title}
    </h1>

    {news.image && (
      <div
        style={{
          background: darkMode ? "#1f2937" : "#ffffff",
          border: darkMode
            ? "1px solid #374151"
            : "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "10px",
          marginTop: "20px",
          boxShadow: darkMode
            ? "0 10px 25px rgba(0,0,0,0.35)"
            : "0 10px 25px rgba(0,0,0,0.08)"
        }}
      >
        <img
          src={news.image}
          alt={news.title}
          style={{
            width: "100%",
            height: "250px",
            objectFit: "contain",
            borderRadius: "12px",
            background: darkMode ? "#111827" : "#f3f4f6"
          }}
        />
      </div>
    )}

    <p
      style={{
        marginTop: "20px",
        fontSize: "18px",
        lineHeight: "1.8",
        color: darkMode ? "#d1d5db" : "#374151"
      }}
    >
      {news.text}
    </p>
  </div>
);
}

export default NewsDetails;