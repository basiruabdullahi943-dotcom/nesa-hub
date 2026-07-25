import { auth } from "../firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (auth.currentUser) {
  navigate("/dashboard");
} else {
  navigate("/login");
}
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg,#4f46e5,#2563eb)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          fontSize: "80px",
          marginBottom: "20px"
        }}
      >
        🎓
      </div>

      <h1
        style={{
          fontSize: "42px",
          marginBottom: "10px"
        }}
      >
        NESA HUB
      </h1>

      <p
        style={{
          fontSize: "18px",
          opacity: 0.9
        }}
      >
        Learn • Connect • Excel
      </p>

      <div
        style={{
          marginTop: "60px",
          fontSize: "18px"
        }}
      >
        Loading...
      </div>
    </div>
  );
}

export default Splash;