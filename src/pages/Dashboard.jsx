import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import LoadingScreen from "../components/LoadingScreen";
import { auth, db } from "../firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy
} from "firebase/firestore";

function Dashboard() {
  const navigate = useNavigate();

  const { showToast } = useToast();

  const darkMode =
  localStorage.getItem("darkMode") === "true";

  const [userName, setUserName] =
  useState("Student");

const hour = new Date().getHours();

const greeting =
  hour < 12
    ? "Good Morning"
    : hour < 17
    ? "Good Afternoon"
    : "Good Evening";
  const [pressedCard, setPressedCard] = useState("");

  const [loading, setLoading] = useState(
  sessionStorage.getItem("splashShown") !== "true"
);

const cardStyle = {
  background: darkMode ? "#1f2937" : "#ffffff",
  padding: "28px 20px",
  borderRadius: "18px",
  textAlign: "center",
  cursor: "pointer",
  boxShadow: darkMode
    ? "0 8px 18px rgba(0,0,0,0.4)"
    : "0 8px 18px rgba(0,0,0,0.08)",
  border: darkMode
    ? "1px solid #374151"
    : "1px solid #e5e7eb",
  transition: "all .25s ease"
};
  
  const [displayAnnouncements, setDisplayAnnouncements] = useState([
  {
    id: "welcome",
    title: "Welcome",
    text: "No announcements yet."
  }
]);

const [index, setIndex] = useState(0);

const currentAnnouncement =
  displayAnnouncements[index] || displayAnnouncements[0];

useEffect(() => {
  if (displayAnnouncements.length <= 1) return;

  const interval = setInterval(() => {
    setIndex((prev) => {
      if (prev >= displayAnnouncements.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  }, 5000);

  return () => clearInterval(interval);
}, [displayAnnouncements]);

useEffect(() => {
  const user = auth.currentUser;

  if (!user) return;

  const unsubscribe = onSnapshot(
    doc(db, "users", user.uid),
    (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();

        setUserName(data.fullName || "Student");
      }
    },
    (error) => {
      console.error(error);
    }
  );

  return () => unsubscribe();
}, []);

useEffect(() => {
  const q = query(
    collection(db, "news"),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const news = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    const pinned = news.filter((item) => item.pinned);

    if (pinned.length > 0) {
      setDisplayAnnouncements(pinned);
    } else if (news.length > 0) {
      setDisplayAnnouncements(news);
    } else {
      setDisplayAnnouncements([
        {
          id: "welcome",
          title: "Welcome",
          text: "No announcements yet."
        }
      ]);
    }
  });

  return () => unsubscribe();
}, []);

useEffect(() => {
  setIndex(0);
}, [displayAnnouncements]);

  useEffect(() => {
  const handler = (event) => {
    showToast(
      event.detail.title,
      event.detail.message
    );

    setNotifications(getNotifications());
  };

  window.addEventListener("showToast", handler);

  return () => {
    window.removeEventListener("showToast", handler);
  };
}, [showToast]);

if (loading) {
  return (
    <LoadingScreen
      onFinish={() => {
        sessionStorage.setItem("splashShown", "true");
        setLoading(false);
      }}
    />
  );
}

return (
  <div
    style={{
      padding: "20px",
      paddingBottom: "160px",
      fontFamily: "Arial",
      background: darkMode ? "#111827" : "#f3f4f6",
      color: darkMode ? "white" : "#111827",
      minHeight: "100vh"
    }}
  >
      
      <div
  style={{
    background: "linear-gradient(135deg, #4f46e5, #2563eb)",
    color: "white",
    padding: "45px 30px",
    borderRadius: "22px",
    textAlign: "center",
    marginBottom: "35px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.18)"
  }}
>
  
  <h1
    style={{
      margin: 0,
      fontSize: "36px",
      fontWeight: "700",
      lineHeight: "1.3"
    }}
  >
    {greeting}, {userName || "Student"} 👋
  </h1>

  <p
    style={{
      marginTop: "14px",
      fontSize: "18px",
      opacity: 0.95
    }}
  >
    Welcome back to NESA Hub
  </p>

  <p
    style={{
      marginTop: "10px",
      fontSize: "15px",
      opacity: 0.8,
      letterSpacing: "1px"
    }}
  >
    Learn • Connect • Excel
  </p>
</div>

      {/* 🔥 LIVE ANNOUNCEMENT SLIDER */}
      <div
  onClick={() => navigate(`/news/${currentAnnouncement.id}`)}
  style={{
  background: darkMode ? "#1f2937" : "#ffffff",
  color: darkMode ? "#f9fafb" : "#111827",
  padding: "25px",
  borderRadius: "18px",
  marginTop: "25px",
  minHeight: "420px",
  cursor: "pointer",
  textAlign: "center",
  border: darkMode
    ? "1px solid #374151"
    : "1px solid #e5e7eb",
  boxShadow: darkMode
    ? "0 10px 25px rgba(0,0,0,0.35)"
    : "0 10px 25px rgba(0,0,0,0.08)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease"
}}
>
  {currentAnnouncement ? (
  <>
  {/* Always show this first */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "20px"
    }}
  >
    <span style={{ fontSize: "30px" }}>📢</span>

    <h2
      style={{
        margin: 0,
        fontSize: "24px",
        fontWeight: "700",
        color: darkMode ? "#ffffff" : "#111827"
      }}
    >
      Latest Announcement
    </h2>
  </div>

  {/* Image comes AFTER the heading */}
  {currentAnnouncement.image && (
    <img
      src={currentAnnouncement.image}
      alt={currentAnnouncement.title}
      style={{
        width: "100%",
        maxHeight: "240px",
        objectFit: "cover",
        borderRadius: "14px",
        marginBottom: "18px",
        display: "block"
      }}
    />
  )}

  <h3
    style={{
      color: darkMode ? "#ffffff" : "#111827",
      fontSize: "22px",
      marginBottom: "12px",
      fontWeight: "700"
    }}
  >
    {currentAnnouncement.title}
  </h3>

  <p
    style={{
      color: darkMode ? "#d1d5db" : "#4b5563",
      lineHeight: "1.8",
      fontSize: "16px"
    }}
  >
    {currentAnnouncement.text.length > 120
      ? currentAnnouncement.text.substring(0, 120) + "..."
      : currentAnnouncement.text}
  </p>
</>
) : (
  <p>No announcements available</p>
)}
</div>

<div style={{ marginTop: "10px", textAlign: "center" }}>
  {displayAnnouncements.map((_, i) => (
    <span
      key={i}
      onClick={() => setIndex(i)}
      style={{
        height: "10px",
        width: "10px",
        margin: "0 5px",
        display: "inline-block",
        borderRadius: "50%",
        cursor: "pointer",
        background: i === index ? "#4f46e5" : "#d1d5db",
        transition: "0.3s"
      }}
    />
  ))}
</div>

      <h2
  style={{
    marginTop: "20px",
    color: darkMode ? "#ffffff" : "#111827"
  }}
>
  Quick Access
</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "10px",
        marginTop: "10px"
      }}>
        
        <div
  style={{
    ...cardStyle,
    transform:
      pressedCard === "materials"
        ? "scale(0.96)"
        : "scale(1)"
  }}
  onClick={() => {
    setPressedCard("materials");

    setTimeout(() => {
      setPressedCard("");
      navigate("/materials");
    }, 120);
  }}
>
  <div
  style={{
    fontSize: "34px",
    marginBottom: "12px"
  }}
>
  📚
</div>

<div>
  Lecture Materials
</div>
</div>

  <div
  style={{
    ...cardStyle,
    transform:
      pressedCard === "pastquestions"
        ? "scale(0.96)"
        : "scale(1)"
  }}
  onClick={() => {
    setPressedCard("pastquestions");

    setTimeout(() => {
      setPressedCard("");
      navigate("/past-questions");
    }, 120);
  }}
>
  <div
  style={{
    fontSize: "34px",
    marginBottom: "12px"
  }}
>
  📝
</div>

<div>
  Past Questions
</div>
</div>

<div
  style={{
    ...cardStyle,
    transform:
      pressedCard === "notifications"
        ? "scale(0.96)"
        : "scale(1)"
  }}
  onClick={() => {
    setPressedCard("notifications");

    setTimeout(() => {
      setPressedCard("");
      navigate("/notifications");
    }, 120);
  }}
>
  <div
  style={{
    fontSize: "34px",
    marginBottom: "12px"
  }}
>
  🔔
</div>

<div>
  Notifications
</div>
</div>

  <div
  style={{
    ...cardStyle,
    transform:
      pressedCard === "timetable"
        ? "scale(0.96)"
        : "scale(1)"
  }}
  onClick={() => {
    setPressedCard("timetable");

    setTimeout(() => {
      setPressedCard("");
      navigate("/timetable");
    }, 120);
  }}
>
  <div
  style={{
    fontSize: "34px",
    marginBottom: "12px"
  }}
>
  📅
</div>

<div>
  Timetable
</div>
</div>

 <div
  style={{
    ...cardStyle,
    transform:
      pressedCard === "executives"
        ? "scale(0.96)"
        : "scale(1)"
  }}
  onClick={() => {
    setPressedCard("executives");

    setTimeout(() => {
      setPressedCard("");
      navigate("/executives");
    }, 120);
  }}
>
  <div
  style={{
    fontSize: "34px",
    marginBottom: "12px"
  }}
>
  👨‍🎓
</div>

<div>
  NESA Executives
</div>
</div>

  <div
  style={{
    ...cardStyle,
    transform:
      pressedCard === "saved"
        ? "scale(0.96)"
        : "scale(1)"
  }}
  onClick={() => {
    setPressedCard("saved");

    setTimeout(() => {
      setPressedCard("");
      navigate("/saved");
    }, 120);
  }}
>
  <div
  style={{
    fontSize: "34px",
    marginBottom: "12px"
  }}
>
  ⭐
</div>

<div>
  Saved Items
</div>
</div>

 <div
  style={{
    ...cardStyle,
    transform:
      pressedCard === "donation"
        ? "scale(0.96)"
        : "scale(1)"
  }}
  onClick={() => {
  setPressedCard("donation");

  setTimeout(() => {
    setPressedCard("");
    navigate("/contribution");
  }, 120);
}}
  onClick={() => {
  setPressedCard("donation");

  setTimeout(() => {
    setPressedCard("");
    navigate("/contribution");
  }, 120);
}}
>
 <div
  style={{
    fontSize: "34px",
    marginBottom: "12px"
  }}
>
  💰
</div>

<div>
  Contribution
</div>
</div>

<div
  style={{
    ...cardStyle,
    transform:
      pressedCard === "feedback"
        ? "scale(0.96)"
        : "scale(1)"
  }}
  onClick={() => {
    setPressedCard("feedback");

    setTimeout(() => {
      setPressedCard("");
      navigate("/feedback");
    }, 120);
  }}
>
  <div
  style={{
    fontSize: "34px",
    marginBottom: "12px"
  }}
>
  💬
</div>

<div>
  Feedback
</div>
</div>

<div
  style={{
    ...cardStyle,
    transform:
      pressedCard === "voting"
        ? "scale(0.96)"
        : "scale(1)"
  }}
  onClick={() => {
    setPressedCard("voting");

    setTimeout(() => {
      setPressedCard("");
      navigate("/voting");
    }, 120);
  }}
>
  <div
    style={{
      fontSize: "34px",
      marginBottom: "12px"
    }}
  >
    🗳️
  </div>

  <div>Voting</div>
</div>

      </div>
    </div>
  );
}

export default Dashboard;