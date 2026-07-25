import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

import { db } from "../firebase";

function AdminLogin() {

  const [password, setPassword] =
    useState("");

    const [showChange, setShowChange] = useState(false);
const [showForgot, setShowForgot] = useState(false);

const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [showLoginPassword, setShowLoginPassword] = useState(false);
const [showCurrentPassword, setShowCurrentPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [showForgotNewPassword, setShowForgotNewPassword] = useState(false);

const [recoveryCode, setRecoveryCode] = useState("");
const [forgotNewPassword, setForgotNewPassword] = useState("");

  const navigate = useNavigate();

const handleLogin = async () => {

  const docRef = doc(db, "admin", "settings");
  const snap = await getDoc(docRef);

  let savedPassword = "admin123";

  if (snap.exists()) {
    savedPassword = snap.data().password;
  } else {
    await setDoc(docRef, {
      password: "admin123"
    });
  }

  if (password === savedPassword) {

    localStorage.setItem("adminLoggedIn", "true");
    navigate("/admin");

  } else {

    alert("Incorrect password");

  }

};

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          width: "350px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.1)"
        }}
      >

      <h1
  style={{
    textAlign: "center",
    marginBottom: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap"
  }}
>
  <span style={{ fontSize: "42px" }}>🔐</span>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      lineHeight: "1"
    }}
  >
    <span
      style={{
        fontSize: "32px",
        fontWeight: "bold"
      }}
    >
      Admin
    </span>

    <span
      style={{
        fontSize: "32px",
        fontWeight: "bold"
      }}
    >
      Login
    </span>
  </div>
</h1>

        <div style={{ position: "relative", marginBottom: "20px" }}>
  <input
    type={showLoginPassword ? "text" : "password"}
    placeholder="Enter admin password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{
      width: "100%",
      padding: "15px",
      paddingRight: "45px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      fontSize: "16px"
    }}
  />

  <div
    onClick={() => setShowLoginPassword(!showLoginPassword)}
    style={{
      position: "absolute",
      right: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#6b7280"
    }}
  >
    {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
  </div>
</div>

        <button
          onClick={handleLogin}

          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "10px",
            background: "#4f46e5",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Login
        </button>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px"
  }}
>
  <button
    onClick={() => {
      setShowChange(true);
      setShowForgot(false);
    }}
    style={{
      background: "none",
      border: "none",
      color: "#2563eb",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    ✏️ Change Password
  </button>

  <button
    onClick={() => {
      setShowForgot(true);
      setShowChange(false);
    }}
    style={{
      background: "none",
      border: "none",
      color: "#2563eb",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    ❓ Forgot Password
  </button>
</div>

{/* CHANGE PASSWORD */}
{showChange && (
  <div style={{ marginTop: "20px" }}>
    <h3>🔐 Change Password</h3>

    <div style={{ position: "relative", marginBottom: "10px" }}>
  <input
    type={showCurrentPassword ? "text" : "password"}
    placeholder="Current Password"
    value={currentPassword}
    onChange={(e) => setCurrentPassword(e.target.value)}
    style={{
      width: "100%",
      padding: "12px",
      paddingRight: "45px",
      borderRadius: "10px",
      border: "1px solid #ccc"
    }}
  />

  <div
    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
    style={{
      position: "absolute",
      right: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#6b7280"
    }}
  >
    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
  </div>
</div>

    <div style={{ position: "relative", marginBottom: "10px" }}>
  <input
    type={showNewPassword ? "text" : "password"}
    placeholder="New Password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    style={{
      width: "100%",
      padding: "12px",
      paddingRight: "45px",
      borderRadius: "10px",
      border: "1px solid #ccc"
    }}
  />

  <div
    onClick={() => setShowNewPassword(!showNewPassword)}
    style={{
      position: "absolute",
      right: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#6b7280"
    }}
  >
    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
  </div>
</div>

    <div style={{ position: "relative", marginBottom: "10px" }}>
  <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm New Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    style={{
      width: "100%",
      padding: "12px",
      paddingRight: "45px",
      borderRadius: "10px",
      border: "1px solid #ccc"
    }}
  />

  <div
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    style={{
      position: "absolute",
      right: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#6b7280"
    }}
  >
    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
  </div>
</div>

    <button
      onClick={() => {
        const savedPassword = getAdminPassword();

        if (currentPassword !== savedPassword) {
          alert("Current password is incorrect");
          return;
        }

        if (newPassword !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        if (newPassword.length < 6) {
          alert("Password must be at least 6 characters");
          return;
        }

        localStorage.setItem("adminPassword", newPassword);

        alert("Password changed successfully");

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowChange(false);
      }}
      style={{
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "10px",
        background: "#2563eb",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      Update Password
    </button>
  </div>
)}

{/* FORGOT PASSWORD */}
{showForgot && (
  <div style={{ marginTop: "20px" }}>
    <h3>❓ Forgot Password</h3>

    <p
      style={{
        fontSize: "14px",
        color: "#6b7280",
        marginBottom: "10px"
      }}
    >
      Enter the recovery code to reset the admin password.
    </p>

    <input
      placeholder="Recovery Code"
      value={recoveryCode}
      onChange={(e) => setRecoveryCode(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        marginBottom: "10px"
      }}
    />

    <div style={{ position: "relative", marginBottom: "10px" }}>
  <input
    type={showForgotNewPassword ? "text" : "password"}
    placeholder="New Password"
    value={forgotNewPassword}
    onChange={(e) => setForgotNewPassword(e.target.value)}
    style={{
      width: "100%",
      padding: "12px",
      paddingRight: "45px",
      borderRadius: "10px",
      border: "1px solid #ccc"
    }}
  />

  <div
    onClick={() =>
      setShowForgotNewPassword(!showForgotNewPassword)
    }
    style={{
      position: "absolute",
      right: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#6b7280"
    }}
  >
    {showForgotNewPassword ? <FaEyeSlash /> : <FaEye />}
  </div>
</div>

    <button
      onClick={() => {
        if (recoveryCode !== "NESA-BUK-2026") {
          alert("Invalid recovery code");
          return;
        }

        if (forgotNewPassword.length < 6) {
          alert("Password must be at least 6 characters");
          return;
        }

    localStorage.setItem(
  "adminPassword",
  forgotNewPassword
);

alert("Password reset successfully");

        setRecoveryCode("");
        setForgotNewPassword("");
        setShowForgot(false);
      }}
      style={{
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "10px",
        background: "#059669",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      Reset Password
    </button>
  </div>
)}

      </div>

    </div>

  );
}

export default AdminLogin;