import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [matric, setMatric] = useState("");
  const [phone, setPhone] = useState("");
const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (
  !fullName ||
  !email ||
  !matric||
  !phone ||
  !level ||
  !password
 
) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 8 || password.length > 15) {
    alert("Password must be 8–15 characters long");
    return;
  }

    // ECO validation
    const cleanMatric = matric.trim().toUpperCase();

if (!cleanMatric.includes("ECO")) {
  alert("Only Economics students are allowed.");
  return;
}

  try {
  setLoading(true);

  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user = userCredential.user;
await setDoc(doc(db, "users", user.uid), {
  uid: userCredential.user.uid,
  fullName,
  email,
  phone,
  level,
  matric: cleanMatric,
  department: "Economics",
  verified: user.emailVerified,
  createdAt: new Date().toISOString()
});


      // Send email verification (OTP LINK)
      await sendEmailVerification(user);

      alert("Account created! Check your email for verification.");

      navigate("/verify-email");

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h1>🎓 Student Signup</h1>

      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />

<input
  placeholder="Phone Number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  style={inputStyle}
/>

<select
  value={level}
  onChange={(e) => setLevel(e.target.value)}
  style={inputStyle}
>
  <option value="">Select Level</option>
  <option value="100L">100L</option>
  <option value="200L">200L</option>
  <option value="300L">300L</option>
  <option value="400L">400L</option>
</select>

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

      <input
        placeholder="Matric Number"
        value={matric}
        onChange={(e) => setMatric(e.target.value)}
        style={inputStyle}
      />
      
      {error && (
  <p style={{ color: "red", marginTop: "10px" }}>
    {error}
  </p>
)}

      <button onClick={handleSignup} style={buttonStyle} disabled={loading}>
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

<p
  style={{
    marginTop: "15px",
    textAlign: "center",
    color: "#6b7280"
  }}
>
  Already have an account?{" "}
  <span
    onClick={() => navigate("/login")}
    style={{
      color: "#4f46e5",
      fontWeight: "bold",
      cursor: "pointer"
    }}
  >
    Login
  </span>
</p>

    </div>
  );
}

const containerStyle = {
  padding: "20px",
  fontFamily: "Arial",
  maxWidth: "400px",
  margin: "auto"
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer"
};

export default Signup;