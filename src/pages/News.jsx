import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function News() {
  const navigate = useNavigate();

  const darkMode =
  localStorage.getItem("darkMode") === "true";

  const [storedNews, setStoredNews] = useState([]);

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

useEffect(() => {

  const loadNews = async () => {

    try {

      const snapshot = await getDocs(
        collection(db, "news")
      );

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setStoredNews(data);

    } catch (error) {

      console.error(error);

    }

  };

  loadNews();

}, []);


  const sortedNews = [...storedNews].sort((a, b) => {
  if (a.pinned === b.pinned) return 0;
  return a.pinned ? -1 : 1;
});

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
  📢 NESA News
</h1>

      {storedNews.length === 0 ? (
        <p>No news yet</p>
      ) : (
        sortedNews.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/news/${item.id}`)}
            style={{
  background: darkMode ? "#1f2937" : "#f3f4f6",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "10px",
  cursor: "pointer",
  border: darkMode
  ? "1px solid #374151"
  : "1px solid #e5e7eb",
  borderLeft: item.pinned
    ? "6px solid #f59e0b"
    : "6px solid transparent"
}}
          >
{item.image && (
  <img
  src={item.image}
  alt={item.title}
  style={{
    width: "calc(100% + 30px)",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px 10px 0 0",
    marginBottom: "10px",
    marginLeft: "-15px",
    marginTop: "-15px"
  }}
/>
)}

{item.pinned && (
  <div
    style={{
      background: "#f59e0b",
color: "white",
      display: "inline-block",
      padding: "5px 10px",
      borderRadius: "8px",
      fontWeight: "bold",
      marginBottom: "10px"
    }}
  >
    📌 IMPORTANT
  </div>
)}

            <h3
  style={{
    color: darkMode ? "#f9fafb" : "#111827",
    fontSize: "28px",
    lineHeight: "1.2",
    marginBottom: "12px",
    wordBreak: "break-word"
  }}
>
  {item.title}
</h3>
            <p
  style={{
    color: darkMode ? "#d1d5db" : "#4b5563",
    lineHeight: "1.7",
    fontSize: "16px",
    wordBreak: "break-word"
  }}
>
  {item.text.length > 120
    ? item.text.substring(0, 120) + "..."
    : item.text}
</p>
          </div>
        ))
      )}
    </div>
  );
}

export default News;