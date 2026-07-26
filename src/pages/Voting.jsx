import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  query,
  where
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

const [email, setEmail] = useState("");
const [showPassword, setShowPassword] = useState(false);

const [verifiedVoters, setVerifiedVoters] = useState(0);
const [votesCast, setVotesCast] = useState(0);

const [electionResults, setElectionResults] = useState({});

const [candidates, setCandidates] = useState([]);
const [groupedResults, setGroupedResults] = useState({});

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

useEffect(() => {
  if (!candidates.length) return;

  const grouped = {};

  candidates.forEach((candidate) => {
    const position = candidate.position;

    if (!grouped[position]) {
      grouped[position] = [];
    }

    grouped[position].push({
      ...candidate,
      votes:
        electionResults[position]?.[candidate.id] || 0
    });
  });

  Object.keys(grouped).forEach((position) => {
    grouped[position].sort(
      (a, b) => b.votes - a.votes
    );
  });

  setGroupedResults(grouped);

}, [candidates, electionResults]);

const handleVerify = async () => {
  const cleanMatric = matric.trim().toUpperCase();
  
const usersRef = collection(db, "users");

const q = query(
  usersRef,
  where("matric", "==", cleanMatric)
);

const snapshot = await getDocs(q);

if (snapshot.empty) {
  alert("This matric number is not registered.");
  return;
}


if (!email.trim()) {
  alert("Please enter your registered email.");
  return;
}

const user = snapshot.docs[0].data();

console.log("Firestore user:", user);
console.log("Firestore email:", user.email);
console.log("Entered email:", email);

if (
  (user.email || "").trim().toLowerCase() !==
  email.trim().toLowerCase()
) {
  alert("Email does not match this matric number.");
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

const safeMatric = cleanMatric.replaceAll("/", "_");

const votedSnapshot = await getDoc(
  doc(db, "votedStudents", safeMatric)
);

if (votedSnapshot.exists()) {
  alert("This matric number has already voted.");
  return;
}

const verifiedRef = doc(
  db,
  "verifiedVoters",
  safeMatric
);

const verifiedSnapshot = await getDoc(verifiedRef);

if (!verifiedSnapshot.exists()) {

  await setDoc(verifiedRef, {
  matric: cleanMatric,
  verifiedAt: serverTimestamp()
});

}

  alert("Verification successful!");

  setEmail("");
setMatric("");

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
      {electionOpen ? (
  <button
    onClick={() => setShowVerify(true)}
    style={{
      width: "100%",
      padding: "15px",
      border: "none",
      borderRadius: "15px",
      background: "#16a34a",
      color: "white",
      fontSize: "18px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "20px"
    }}
  >
    ▶️ Start Voting
  </button>
) : (
  <>
    <div
      style={{
        marginTop: "20px",
        background: darkMode ? "#1f2937" : "#ffffff",
        borderRadius: "15px",
        padding: "20px",
        border: darkMode
          ? "1px solid #374151"
          : "1px solid #e5e7eb"
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: darkMode ? "#f9fafb" : "#111827"
        }}
      >
        🏆 Final Election Results
      </h2>

      {Object.entries(groupedResults).map(([position, list]) => {
        const totalVotes = list.reduce(
          (sum, c) => sum + c.votes,
          0
        );

        const isSenator =
          position.includes("Senator");

        const winners = isSenator
          ? list.slice(0, 2)
          : list.slice(0, 1);

        return (
          <div
            key={position}
            style={{
              marginBottom: "25px"
            }}
          >
            <h3>{position}</h3>

            {list.map((candidate, index) => {
              const percentage =
                totalVotes
                  ? (
                      (candidate.votes / totalVotes) *
                      100
                    ).toFixed(1)
                  : "0.0";

              return (
                <div
                  key={candidate.id}
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    padding: "10px 0",
                    borderBottom:
                      index !== list.length - 1
                        ? "1px solid #374151"
                        : "none"
                  }}
                >
                  <div>
                    {index === 0
                      ? "🥇 "
                      : index === 1
                      ? "🥈 "
                      : index === 2
                      ? "🥉 "
                      : "• "}
                    {candidate.name}
                  </div>

                  <div>
                    {candidate.votes} Votes ({percentage}%)
                  </div>
                </div>
              );
            })}

            <div
              style={{
                marginTop: "10px",
                padding: "10px",
                borderRadius: "10px",
                background: "#16a34a",
                color: "white",
                fontWeight: "bold"
              }}
            >
              {isSenator
                ? `🏆 Winners: ${winners
                    .map((w) => w.name)
                    .join(" & ")}`
                : `🏆 Winner: ${winners[0]?.name || "None"}`}
            </div>
          </div>
        );
      })}
    </div>
  </>
)}

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

<input
  type="email"
  placeholder="Enter your registered email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
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