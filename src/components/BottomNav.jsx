import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaBullhorn,
  FaBookmark,
  FaUser
} from "react-icons/fa";

function BottomNav() {
  const navigate = useNavigate();
  const darkMode =
  localStorage.getItem("darkMode") === "true";
  const location = useLocation();

  return (
    <div style={container(darkMode)}>

      <button
  style={{
    ...btn,
    color:
      location.pathname === "/dashboard"
        ? "#60a5fa"
        : darkMode
  ? "#d1d5db"
  : "#6b7280"
  }}
  onClick={() => navigate("/dashboard")}
>
  <>
    <FaHome size={20} />
    <div style={{ marginTop: "4px" }}>Home</div>
  </>
</button>

  <button
  style={{
    ...btn,
    color:
      location.pathname === "/materials"
        ? "#60a5fa"
       : darkMode
  ? "#d1d5db"
  : "#6b7280"
  }}
  onClick={() => navigate("/materials")}
>
  <>
    <FaBook size={20} />
    <div style={{ marginTop: "4px" }}>Materials</div>
  </>
</button>

      <button
  style={{
    ...btn,
    color:
      location.pathname === "/news"
        ? "#60a5fa"
        : darkMode
  ? "#d1d5db"
  : "#6b7280"
  }}
  onClick={() => navigate("/news")}
>
  <>
    <FaBullhorn size={20} />
    <div style={{ marginTop: "4px" }}>News</div>
  </>
</button>

      <button
  style={{
    ...btn,
    color:
      location.pathname === "/saved"
        ? "#60a5fa"
        : darkMode
  ? "#d1d5db"
  : "#6b7280"
  }}
  onClick={() => navigate("/saved")}
>
  <>
    <FaBookmark size={20} />
    <div style={{ marginTop: "4px" }}>Saved</div>
  </>
</button>

      <button
  style={{
    ...btn,
    color:
      location.pathname === "/profile"
        ? "#60a5fa"
        : darkMode
  ? "#d1d5db"
  : "#6b7280"
  }}
  onClick={() => navigate("/profile")}
>
  <>
    <FaUser size={20} />
    <div style={{ marginTop: "4px" }}>Me</div>
  </>
</button>

    </div>
  );
}

const container = (darkMode) => ({
  position: "fixed",
  bottom: "15px",
  left: "15px",
  right: "15px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  background: darkMode ? "#111827" : "#ffffff",
  padding: "12px 8px",
  borderRadius: "20px",
  border: darkMode
    ? "1px solid #374151"
    : "1px solid #e5e7eb",
  boxShadow: darkMode
    ? "0 10px 30px rgba(0,0,0,0.35)"
    : "0 10px 30px rgba(0,0,0,0.12)",
  zIndex: 1000
});

const btn = {
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  gap: "4px",
  flex: 1
};

export default BottomNav;