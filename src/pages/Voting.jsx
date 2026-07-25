import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase";

function Voting() {
  const navigate = useNavigate();

  const darkMode =
    localStorage.getItem("darkMode") === "true";

    useEffect(() => {
  window.scrollTo(0, 0);
}, []);

    const [showVerify, setShowVerify] = useState(false);
const [matric, setMatric] = useState("");

const [electionOpen, setElectionOpen] = useState(false);

const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);

const [verifiedVoters, setVerifiedVoters] = useState(0);
const [votesCast, setVotesCast] = useState(0);

const [electionResults, setElectionResults] = useState({});

const [candidates, setCandidates] = useState([]);

useEffect(() => {
  loadElectionStatus();
  loadEligibleVoters();
  loadElectionResults();
  loadVotesCast();
  loadVerifiedVoters();
   loadCandidates();
}, []);

const loadElectionStatus = async () => {
  try {

    const snapshot = await getDoc(
      doc(db, "settings", "election")
    );

    if (snapshot.exists()) {

      setElectionOpen(snapshot.data().open);

    }

  } catch (error) {

    console.error(error);

  }
};

const loadEligibleVoters = async () => {
  try {

    const snapshot = await getDoc(
      doc(db, "settings", "eligibleVoters")
    );

    if (snapshot.exists()) {

      const voters =
        snapshot.data().voters || [];

      setVerifiedVoters(voters.length);

    }

  } catch (error) {

    console.error(error);

  }
};

const loadElectionResults = async () => {
  try {
    const snapshot = await getDocs(collection(db, "electionResults"));

    const results = {};

    snapshot.forEach((doc) => {
      const data = doc.data();

      if (!results[data.position]) {
        results[data.position] = {};
      }

      results[data.position][data.candidateId] = data.votes || 0;
    });

    setElectionResults(results);

  } catch (error) {
    console.error("Error loading election results:", error);
  }
};

const loadVotesCast = async () => {
  try {

    const snapshot = await getDocs(
      collection(db, "votedStudents")
    );

    setVotesCast(snapshot.size);

  } catch (error) {

    console.error("Error loading votes cast:", error);

  }
};

const loadVerifiedVoters = async () => {
  try {

    const snapshot = await getDocs(
      collection(db, "verifiedVoters")
    );

    setVerifiedVoters(snapshot.size);

  } catch (error) {

    console.error("Error loading verified voters:", error);

  }
};

const loadCandidates = async () => {
  try {
    const snapshot = await getDocs(collection(db, "candidates"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setCandidates(data);

  } catch (error) {
    console.error(error);
  }
};

const handleVerify = async () => {
  const cleanMatric = matric.trim().toUpperCase();
  
  const users =
  JSON.parse(localStorage.getItem("registeredUsers")) || [];

const user = users.find(
  (u) =>
    (u.matric || "").toUpperCase() === cleanMatric
);

if (!user) {
  alert("This matric number is not registered.");
  return;
}

if (password !== user.password) {
  alert("Incorrect password.");
  return;
}

if (!password.trim()) {
  alert("Please enter your app password.");
  return;
}

let eligible = [];

try {

  const snapshot = await getDoc(
    doc(db, "settings", "eligibleVoters")
  );

  if (snapshot.exists()) {
    eligible = snapshot.data().voters || [];
  }

} catch (error) {

  console.error(error);

  alert("Unable to load eligible voters.");
  return;

}

if (!eligible.includes(cleanMatric)) {
  alert("You are not eligible to participate in this election.");
  return;
}

  if (!cleanMatric.includes("ECO")) {
    alert("Only Economics students can vote.");
    return;
  }

const votedSnapshot = await getDoc(
  doc(db, "votedStudents", cleanMatric)
);

if (votedSnapshot.exists()) {
  alert("This matric number has already voted.");
  return;
}

const verifiedRef = doc(
  db,
  "verifiedVoters",
  cleanMatric
);

const verifiedSnapshot = await getDoc(verifiedRef);

if (!verifiedSnapshot.exists()) {

  await setDoc(verifiedRef, {
    matric: cleanMatric,
    verifiedAt: serverTimestamp()
  });

}

  alert("Verification successful!");

  setShowVerify(false);

  // Later we will open the ballot page here
  navigate("/vote-ballot", {
    state: { matric: cleanMatric }
  });
};

  return (
    <div
      style={{
        padding: "20px",
        paddingBottom: "160px",
        background: darkMode ? "#111827" : "#f3f4f6",
        color: darkMode ? "#f9fafb" : "#111827",
        minHeight: "100vh"
      }}
    >
      <h1
  style={{
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
  🗳️ NESA E-Voting
</h1>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginBottom: "25px"
        }}
      >
        <div
          style={{
            background: darkMode ? "#1f2937" : "#ffffff",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "center",
            border: darkMode
              ? "1px solid #374151"
              : "1px solid #e5e7eb"
          }}
        >
          <h2 style={{ color: darkMode ? "#f9fafb" : "#111827" }}>
  {verifiedVoters}
</h2>
          <p style={{ color: darkMode ? "#f9fafb" : "#111827" }}>
  Verified Voters
</p>
        </div>

        <div
          style={{
            background: darkMode ? "#1f2937" : "#ffffff",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "center",
            border: darkMode
              ? "1px solid #374151"
              : "1px solid #e5e7eb"
          }}
        >
          <h2 style={{ color: darkMode ? "#f9fafb" : "#111827" }}>
  {votesCast}
</h2>
          <p style={{ color: darkMode ? "#f9fafb" : "#111827" }}>
  Votes Cast
</p>
        </div>
      </div>

      <h2
  style={{
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
  Live Election Results
</h2>

      {candidates.map((candidate) => (
        <div
          key={candidate.id}
          style={{
            background: darkMode ? "#1f2937" : "#ffffff",
            borderRadius: "15px",
            padding: "15px",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            border: darkMode
              ? "1px solid #374151"
              : "1px solid #e5e7eb",
            boxShadow: darkMode
              ? "0 8px 18px rgba(0,0,0,0.35)"
              : "0 8px 18px rgba(0,0,0,0.08)"
          }}
        >
        <img
  src={
    candidate.image ||
    "https://via.placeholder.com/100"
  }
  alt={candidate.name}
  style={{
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover"
  }}
/>

          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0 }}>
              {candidate.name}
            </h3>

            <p
              style={{
                color: darkMode ? "#d1d5db" : "#6b7280",
                margin: "5px 0"
              }}
            >
              {candidate.position}
            </p>
          </div>

          <div
            style={{
              background: "#4f46e5",
              color: "white",
              padding: "10px 15px",
              borderRadius: "12px",
              textAlign: "center",
              minWidth: "70px"
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
  {electionResults[candidate.position]?.[candidate.id] || 0}
</div>

            <div style={{ fontSize: "12px" }}>
              Votes
            </div>
          </div>
        </div>
      ))}

      {/* Start Voting */}
      <button
  disabled={!electionOpen}
  onClick={() => setShowVerify(true)}
  style={{
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "15px",
    background: electionOpen ? "#16a34a" : "#9ca3af",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: electionOpen ? "pointer" : "not-allowed",
    marginTop: "20px"
  }}
>
  {electionOpen
    ? "▶️ Start Voting"
    : "🔒 Election Closed"}
</button>

{showVerify && (
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
        background: darkMode ? "#1f2937" : "#ffffff",
        padding: "25px",
        borderRadius: "20px",
        width: "90%",
        maxWidth: "400px",
        border: darkMode
          ? "1px solid #374151"
          : "1px solid #e5e7eb"
      }}
    >
      <h2
        style={{
          marginBottom: "15px",
          color: darkMode ? "#f9fafb" : "#111827"
        }}
      >
        🆔 Verify Matric Number
      </h2>

      <p
        style={{
          color: darkMode ? "#d1d5db" : "#6b7280",
          marginBottom: "15px"
        }}
      >
        Only verified Economics students can vote.
      </p>

      <input
        type="text"
        placeholder="Enter your matric number"
        value={matric}
        onChange={(e) => setMatric(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: darkMode
            ? "1px solid #374151"
            : "1px solid #d1d5db",
          background: darkMode ? "#111827" : "#ffffff",
          color: darkMode ? "#f9fafb" : "#111827",
          marginBottom: "15px"
        }}
      />

      <div
  style={{
    position: "relative",
    marginBottom: "15px"
  }}
>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter your app password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{
      width: "100%",
      padding: "12px",
      paddingRight: "45px",
      borderRadius: "10px",
      border: darkMode
        ? "1px solid #374151"
        : "1px solid #d1d5db",
      background: darkMode ? "#111827" : "#ffffff",
      color: darkMode ? "#f9fafb" : "#111827"
    }}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: darkMode ? "#d1d5db" : "#6b7280"
    }}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleVerify}
          style={{
            flex: 1,
            padding: "12px",
            border: "none",
            borderRadius: "10px",
            background: "#16a34a",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Verify & Continue
        </button>

        <button
          onClick={() => setShowVerify(false)}
          style={{
            flex: 1,
            padding: "12px",
            border: "none",
            borderRadius: "10px",
            background: "#ef4444",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Voting;