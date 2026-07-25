import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Profile() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
const [matric, setMatric] = useState("");
const [level, setLevel] = useState("");
const [department, setDepartment] = useState("Economics");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [profileImage, setProfileImage] = useState("");

  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("darkMode") === "true"
);

  const [notifications, setNotifications] =
  useState(
    localStorage.getItem("notifications") !== "false"
  );

    const [showPhotoMenu, setShowPhotoMenu] =
  useState(false);

  useEffect(() => {
  const loadProfile = async () => {
    const user = auth.currentUser;

    if (!user) return;

    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setName(data.fullName || "");
        setMatric(data.matric || "");
        setLevel(data.level || "");
        setDepartment(data.department || "Economics");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setProfileImage(data.profileImage || "");
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  loadProfile();
}, []);

  const handleSave = async () => {
  const user = auth.currentUser;

  if (!user) return;

  try {
    await updateDoc(doc(db, "users", user.uid), {
      fullName: name,
      matric,
      level,
      department,
      email,
      phone,
      profileImage
    });

    alert("Profile updated successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to update profile");
  }
};

  const handleLogout = async () => {

    try {

      await signOut(auth);

      alert("Logged out successfully");

      navigate("/login");

    } catch (error) {

      alert("Logout failed");

    }
  };

  return (
    <div
      style={{
        padding: "20px",
        paddingBottom: "160px",
        fontFamily: "Arial",
        background: darkMode ? "#111827" : "#f3f4f6",
        color: darkMode ? "#f9fafb" : "#111827",
        minHeight: "100vh"
      }}
    >

<h1
  style={{
    fontSize: "56px",
    fontWeight: "700",
    textAlign: "center",
    margin: 0,
    lineHeight: "1.1",
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
  Settings
</h1>

<p
  style={{
    color: darkMode ? "#d1d5db" : "gray",
    textAlign: "center",
    marginTop: "8px",
    marginBottom: "25px",
    fontSize: "18px"
  }}
>
  Customize your experience
</p>

      {/* PROFILE CARD */}

      <div style={card(darkMode)}>

        <div
  style={{
  textAlign: "center",
  marginBottom: "25px",
  padding: "25px",
  borderRadius: "20px",
  background: "linear-gradient(135deg, #4f46e5, #6366f1)",
  color: "white",
  boxShadow: "0 10px 25px rgba(79,70,229,0.35)"
}}
>
  <div
  onClick={() => setShowPhotoMenu(true)}
  style={{
    position: "relative",
    display: "inline-block",
    cursor: "pointer"
  }}
>
  {profileImage ? (
    <img
      src={profileImage}
      alt="Profile"
      style={{
        width: "160px",
        height: "160px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "5px solid white",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
      }}
    />
  ) : (
    <div
      style={{
        width: "160px",
        height: "160px",
        borderRadius: "50%",
        background: "white",
        color: "#4f46e5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "60px",
        fontWeight: "bold",
        border: "5px solid white",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
      }}
    >
      {(name || "S").charAt(0).toUpperCase()}
    </div>
  )}

  <div
    style={{
      position: "absolute",
      bottom: "8px",
      right: "8px",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "#4f46e5",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "3px solid white",
      boxShadow: "0 4px 10px rgba(0,0,0,0.25)"
    }}
  >
    <FaCamera />
  </div>
</div>

  <h2
  style={{
    marginTop: "20px",
    marginBottom: "8px",
    fontSize: "30px",
    fontWeight: "bold",
    letterSpacing: "1px",
    color: "white"
  }}
>
  {(name || "Student Name").toUpperCase()}
</h2>

  <p
  style={{
    fontSize: "18px",
    color: "#e0e7ff",
    marginBottom: "8px"
  }}
>
  🎓 {department || "Economics Department"}
</p>

<div
  style={{
    display: "inline-block",
    background: "white",
    color: "#4f46e5",
    padding: "6px 18px",
    borderRadius: "30px",
    fontWeight: "bold",
    marginBottom: "15px"
  }}
>
  📚 {level || "Level"}
</div>

<div style={{ marginTop: "10px" }}>
  <p
    style={{
      fontSize: "13px",
      color: "#dbeafe",
      marginBottom: "3px"
    }}
  >
    MATRIC NUMBER
  </p>

  <h3
    style={{
      color: "white",
      margin: 0
    }}
  >
    {matric || "Not Added"}
  </h3>
</div>

<div
  style={{
    marginTop: "20px",
    width: "100%",
    maxWidth: "320px",
    marginInline: "auto",
    background: "rgba(255,255,255,0.12)",
    borderRadius: "15px",
    padding: "15px",
    backdropFilter: "blur(8px)"
  }}
>
  <div style={{ marginBottom: "15px" }}>
    <small style={{ color: "#dbeafe" }}>📧 EMAIL</small>
    <div style={{ fontWeight: "bold", color: "white" }}>
      {email || "Not Added"}
    </div>
  </div>

  <div style={{ marginBottom: "15px" }}>
    <small style={{ color: "#dbeafe" }}>📱 PHONE</small>
    <div style={{ fontWeight: "bold", color: "white" }}>
      {phone || "Not Added"}
    </div>
  </div>

  <div>
    <small style={{ color: "#dbeafe" }}>🏛 DEPARTMENT</small>
    <div style={{ fontWeight: "bold", color: "white" }}>
      {department || "Economics"}
    </div>
  </div>
</div>

</div>

        <h2 style={{ color: darkMode ? "#f9fafb" : "#111827" }}>
  👤 Student Profile
</h2>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={input(darkMode)}
        />

        <input
          placeholder="Matric Number"
          value={matric}
          onChange={(e) =>
            setMatric(e.target.value)
          }
          style={input(darkMode)}
        />

        <select
          value={level}
          onChange={(e) =>
            setLevel(e.target.value)
          }
          style={input(darkMode)}
        >
          <option value="">
            Select Level
          </option>

          <option value="100L">
            100L
          </option>

          <option value="200L">
            200L
          </option>

          <option value="300L">
            300L
          </option>

          <option value="400L">
            400L
          </option>
        </select>

        <input
  placeholder="Department"
  value={department}
  onChange={(e) =>
    setDepartment(e.target.value)
  }
  style={input(darkMode)}
/>

<input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
  style={input(darkMode)}
/>

<input
  placeholder="Phone Number"
  value={phone}
  onChange={(e) =>
    setPhone(e.target.value)
  }
  style={input(darkMode)}
/>

        <button
          onClick={handleSave}
          style={saveBtn}
        >
          Save Profile
        </button>

      </div>

      {/* SETTINGS */}

      <div style={card(darkMode)}>

        <h2 style={{ color: darkMode ? "#f9fafb" : "#111827" }}>
  ⚙️ Preferences
</h2>

        <div style={settingRow(darkMode)}>
          <span>🌙 Dark Mode</span>

          <div
  onClick={() => {
    const newValue = !darkMode;

    setDarkMode(newValue);

    localStorage.setItem(
      "darkMode",
      newValue
    );
  }}
  style={{
    width: "55px",
    height: "30px",
    borderRadius: "30px",
    background: darkMode ? "#2563eb" : "#d1d5db",
    position: "relative",
    cursor: "pointer",
    transition: "all 0.3s ease"
  }}
>
  <div
    style={{
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      background: "white",
      position: "absolute",
      top: "3px",
      left: darkMode ? "28px" : "3px",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
    }}
  />
</div>
        </div>

        <div style={settingRow(darkMode)}>
          <span>🔔 Notifications</span>

          <div
  onClick={() => {
  const newValue = !notifications;

  setNotifications(newValue);

  localStorage.setItem(
    "notifications",
    newValue
  );
}}
  style={{
    width: "55px",
    height: "30px",
    borderRadius: "30px",
    background: notifications
      ? "#2563eb"
      : "#d1d5db",
    position: "relative",
    cursor: "pointer",
    transition: "all 0.3s ease"
  }}
>
  <div
    style={{
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      background: "white",
      position: "absolute",
      top: "3px",
      left: notifications
        ? "28px"
        : "3px",
      transition: "all 0.3s ease",
      boxShadow:
        "0 2px 6px rgba(0,0,0,0.2)"
    }}
  />
</div>
        </div>

      </div>

      {/* ABOUT */}

      <div style={card(darkMode)}>

        <h2 style={{ color: darkMode ? "#f9fafb" : "#111827" }}>
  📘 About
</h2>

<div
  style={settingRow(darkMode)}
  onClick={() => navigate("/about")}
>
  <span>About NESA Hub</span>
  <span>›</span>
</div>

<div
  style={settingRow(darkMode)}
  onClick={() => navigate("/privacy")}
>
  <span>Privacy Policy</span>
  <span>›</span>
</div>

<div
  style={settingRow(darkMode)}
  onClick={() => navigate("/terms")}
>
  <span>Terms & Conditions</span>
  <span>›</span>
</div>

<div
  style={settingRow(darkMode)}
  onClick={() => navigate("/help")}
>
  <span>Help & Support</span>
  <span>›</span>
</div>

      </div>

      {/* LOGOUT */}

      <button
        onClick={handleLogout}
        style={logoutBtn}
      >
        Logout
      </button>

{showPhotoMenu && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}
  >
    <div
      style={{
        background: darkMode ? "#1f2937" : "white",
        color: darkMode ? "#f9fafb" : "#111827",
        border: darkMode
  ? "1px solid #374151"
  : "1px solid #e5e7eb",
        padding: "25px",
        borderRadius: "20px",
        width: "320px",
        textAlign: "center"
      }}
    >
      <img
        src={
          profileImage ||
          "https://via.placeholder.com/250?text=Photo"
        }
        alt="Profile"
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "20px"
        }}
      />

      <label
  style={{
    display: "block",
    width: "100%",
    padding: "12px",
    background: "#4f46e5",
    color: "white",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "15px"
  }}
>
  {profileImage ? "📷 Change Photo" : "📷 Upload Photo"}

  <input
    type="file"
    accept="image/*"
    style={{ display: "none" }}
    onChange={(e) => {
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = async () => {
  const image = reader.result;

  setProfileImage(image);

  const user = auth.currentUser;

  if (user) {
    await updateDoc(doc(db, "users", user.uid), {
      profileImage: image
    });
  }

  setShowPhotoMenu(false);
};

        reader.readAsDataURL(file);
      }
    }}
  />
</label>

{profileImage && (
  <button
    onClick={async () => {

    const user = auth.currentUser;

if (user) {
  await updateDoc(doc(db, "users", user.uid), {
    profileImage: ""
  });
}
setProfileImage("");
setShowPhotoMenu(false);

      setShowPhotoMenu(false);
    }}
    style={{
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "10px",
      background: "#dc2626",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      marginBottom: "10px"
    }}
  >
    🗑 Remove Photo
  </button>
)}

      <button
        onClick={() => setShowPhotoMenu(false)}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: "10px",
          background: "#ef4444",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}

const card = (darkMode) => ({
  background: darkMode ? "#1f2937" : "#ffffff",
  padding: "20px",
  borderRadius: "15px",
  marginTop: "20px",
  border: darkMode
    ? "1px solid #374151"
    : "1px solid #e5e7eb",
  boxShadow: darkMode
    ? "0 8px 18px rgba(0,0,0,0.35)"
    : "0 8px 18px rgba(0,0,0,0.08)"
});

const input = (darkMode) => ({
  display: "block",
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "10px",
  border: darkMode
    ? "1px solid #374151"
    : "1px solid #ccc",
  background: darkMode ? "#111827" : "#ffffff",
  color: darkMode ? "#f9fafb" : "#111827"
});

const saveBtn = {
  marginTop: "15px",
  padding: "12px",
  width: "100%",
  border: "none",
  borderRadius: "10px",
  background: "#4f46e5",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

const logoutBtn = {
  marginTop: "30px",
  width: "100%",
  padding: "15px",
  border: "none",
  borderRadius: "12px",
  background: "red",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

const settingRow = (darkMode) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "15px",
  padding: "12px 0",
  borderBottom: darkMode
    ? "1px solid #374151"
    : "1px solid #e5e7eb"
});

export default Profile;