import { useEffect, useState } from "react";

function LoadingScreen({ onFinish }) {
  const images = [
  "/loading/group1.jpg",
  "/loading/group2.jpg",
  "/loading/group3.jpg",
  "/loading/group4.jpg",
];

  const [index, setIndex] = useState(0);

  const [fade, setFade] = useState(true);

  useEffect(() => {
  let current = 0;

const imageInterval = setInterval(() => {

  setFade(false);

  setTimeout(() => {

    current++;

    if (current < images.length) {
      setIndex(current);
    }

    setFade(true);

  }, 600);

}, 3000);

  const finishTimer = setTimeout(() => {
    clearInterval(imageInterval);
    onFinish();
  }, 12000);

  return () => {
    clearInterval(imageInterval);
    clearTimeout(finishTimer);
  };
}, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0f172a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
        overflow: "hidden"
      }}
    >
      <img
  src={images[index]}
  alt="NESA Loading"
  style={{
    width: "100%",
    height: "100vh",
    objectFit: "contain",
backgroundColor: "#0f172a",
    position: "absolute",
    inset: 0,
    opacity: fade ? 1 : 0,
    transition: "opacity 1.5s ease-in-out, transform 6s ease-in-out",
    animation: fade
  ? "zoomImage 6s ease-in-out forwards"
  : "none",
    filter: "brightness(1.2) contrast(1.05) saturate(1.15)"
  }}
/>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
  "linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(15,23,42,0.45))"
        }}
      />

    <div
  style={{
    position: "absolute",
    bottom: "18px",
    left: "29%",
    transform: "translateX(-50%)",
    width: "72%",
    maxWidth: "280px",
    textAlign: "center",
    color: "white",
    background:
  "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "24px",
    boxShadow: "0 12px 35px rgba(0,0,0,0.35)",
animation: "glassFloat 5s ease-in-out infinite",
    padding: "14px"
  }}
>
    <div
  style={{
    width: "55px",
    height: "55px",
    borderRadius: "18px",
    background: "rgba(124,58,237,0.70)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "-32px auto 10px",
    fontSize: "26px",
    fontWeight: "800",
    color: "#fff",
    animation:
  "floatLogo 3s ease-in-out infinite, pulseGlow 2.5s ease-in-out infinite",
    boxShadow:
  "0 0 25px rgba(124,58,237,0.75), 0 0 50px rgba(168,85,247,0.45), 0 15px 35px rgba(124,58,237,0.35)",
  }}
>
  N
</div>

        <h1
  style={{
    margin: 0,
    fontSize: "20px",
    fontWeight: "800",
    letterSpacing: "1px",
    color: "#ffffff",
    textShadow: "0 2px 6px rgba(0,0,0,0.35)"
  }}
>
  NESA HUB
</h1>

    <p
  style={{
    marginTop: "8px",
    color: "rgba(255,255,255,0.88)",
    fontSize: "12px",
    fontWeight: "500",
    letterSpacing: "0.5px",
    textShadow: "0 1px 4px rgba(0,0,0,0.35)"
  }}
>
  Empowering Economics Students
</p>

        <div
          style={{
            marginTop: "14px",
            width: "100%",
            height: "7px",
            background: "rgba(255,255,255,0.18)",
            borderRadius: "999px",
            overflow: "hidden"
          }}
        >
          <div
  style={{
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg,#7c3aed,#a855f7,#4f46e5,#7c3aed)",
    backgroundSize: "200% 100%",
    animation:
      "loadProgress 12s linear forwards, glowBar 2s linear infinite",
    boxShadow:
      "0 0 18px rgba(168,85,247,.9)"
  }}
/>
        </div>

        <p
          style={{
            marginTop: "14px",
            color: "#e5e7eb",
            fontSize: "12px"
          }}
        >
          Preparing your experience...
        </p>
      </div>

    <style>{`
@keyframes loadProgress {
  0% { width: 0%; }
  10% { width: 8%; }
  25% { width: 22%; }
  40% { width: 38%; }
  55% { width: 55%; }
  70% { width: 72%; }
  85% { width: 90%; }
  100% { width: 100%; }
}

@keyframes zoomImage {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.08);
  }
}

@keyframes floatLogo {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-8px);
  }

  100% {
    transform: translateY(0px);
  }    
}

@keyframes glowBar {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 200% 50%;
  }
}

@keyframes glassFloat {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-4px);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes pulseGlow {
  0% {
    filter: drop-shadow(0 0 0px rgba(168,85,247,.4));
  }

  50% {
    filter: drop-shadow(0 0 16px rgba(168,85,247,.9));
  }

  100% {
    filter: drop-shadow(0 0 0px rgba(168,85,247,.4));
  }
}

`}</style>
    </div>
  );
}

export default LoadingScreen;