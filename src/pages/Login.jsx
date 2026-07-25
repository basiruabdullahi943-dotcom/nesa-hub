import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
  const unsubscribe =
    onAuthStateChanged(auth, async (user) => {

      if (!user) return;

      await user.reload();

      if (user.emailVerified) {
        navigate("/");
      }

    });

  return () => unsubscribe();
}, []);

const handleForgotPassword = async () => {

  if (!email) {
    setError("Enter your email first");
    return;
  }

  try {

    await sendPasswordResetEmail(auth, email);

    alert("Password reset email sent");

  } catch (err) {

    setError("Failed to send reset email");

  }
};
  const handleLogin = async () => {
    setError("");

    // validation
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const userCredential =
  await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

const user = userCredential.user;

// Refresh user information
await user.reload();

if (!user.emailVerified) {
  setError(
    "Your account has not been verified. Please check your email and click the verification link."
  );
  return;
}

// Fetch the user's profile from Firestore
const userDoc = await getDoc(
  doc(db, "users", user.uid)
);

if (!userDoc.exists()) {
  setError("User profile not found.");
  return;
}

const userData = userDoc.data();

console.log(userData);
localStorage.setItem(
  "userProfile",
  JSON.stringify(userData)
);

alert("Login successful");

navigate("/"); // change if your route is different
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Student Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />

      <div style={{ position: "relative", marginBottom: "10px" }}>

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={inputStyle}
  />

  <span
    onClick={() =>
      setShowPassword(!showPassword)
    }
    style={{
      position: "absolute",
      right: "15px",
      top: "35%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      fontSize: "18px"
    }}
  >
    {showPassword ? "🙈" : "👁"}
  </span>

</div>

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

  <button onClick={handleLogin} style={btnStyle}>
  Login
</button>

<p
  onClick={() => navigate("/forgot-password")}
  style={{
    color: "#4f46e5",
    marginTop: "15px",
    cursor: "pointer",
    fontWeight: "bold",
    textAlign: "center"
  }}
>
  Forgot Password?
</p>

<p
  style={{
    marginTop: "12px",
    color: "#6b7280",
    textAlign: "center"
  }}
>
  Don’t have an account?{" "}
  <span
    onClick={() => navigate("/signup")}
    style={{
      color: "#4f46e5",
      fontWeight: "bold",
      cursor: "pointer"
    }}
  >
    Sign Up
  </span>
</p>

    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: "1px solid #ccc"
};

const btnStyle = {
  padding: "12px 20px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer"
};

export default Login;