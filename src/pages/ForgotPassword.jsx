import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);

      alert(
        "Password reset email sent successfully"
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <h1>Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          borderRadius: "10px",
          border: "1px solid #ccc"
        }}
      />

      <button
        onClick={handleReset}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          background: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        Send Reset Email
      </button>
    </div>
  );
}

export default ForgotPassword;