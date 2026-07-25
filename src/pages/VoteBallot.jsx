import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function VoteBallot() {
  const location = useLocation();
  const navigate = useNavigate();

  const darkMode =
    localStorage.getItem("darkMode") === "true";

    useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const matric = location.state?.matric || "";

  // Candidate data
const savedCandidates =
  JSON.parse(localStorage.getItem("candidates")) || [];

const candidates = savedCandidates.reduce((acc, candidate) => {
  if (!acc[candidate.position]) {
    acc[candidate.position] = [];
  }

  acc[candidate.position].push(candidate);

  return acc;
}, {});

  const [votes, setVotes] = useState({});

  const selectCandidate = (position, candidateId) => {
  const isSenator = position.includes("Senator");

  if (!isSenator) {
    setVotes({
      ...votes,
      [position]: candidateId
    });

    return;
  }

  const current = votes[position] || [];

  if (current.includes(candidateId)) {
    setVotes({
      ...votes,
      [position]: current.filter(id => id !== candidateId)
    });

    return;
  }

  if (current.length >= 2) {
    alert("You can only select two senators.");
    return;
  }

  setVotes({
    ...votes,
    [position]: [...current, candidateId]
  });
};

  const submitVotes = () => {
  const positions = Object.keys(candidates);

  // Validation
  for (const position of positions) {

    // Skip unopposed positions
    if (candidates[position].length === 1) {
      continue;
    }

    const isSenator = position.includes("Senator");

    if (
      (!isSenator && !votes[position]) ||
      (isSenator &&
        (!votes[position] || votes[position].length === 0))
    ) {
      alert(`Please vote for ${position}`);
      return;
    }
  }

  // Load existing results
  const electionResults =
    JSON.parse(localStorage.getItem("electionResults")) || {};

  // Count votes
  positions.forEach((position) => {

    // Skip unopposed positions
    if (candidates[position].length === 1) {
      return;
    }

    if (!electionResults[position]) {
      electionResults[position] = {};
    }

    const isSenator = position.includes("Senator");

    if (!isSenator) {

      const selectedId = votes[position];

      electionResults[position][selectedId] =
        (electionResults[position][selectedId] || 0) + 1;

    } else {

      votes[position].forEach((id) => {
        electionResults[position][id] =
          (electionResults[position][id] || 0) + 1;
      });

    }

  });

  // Save results
  localStorage.setItem(
    "electionResults",
    JSON.stringify(electionResults)
  );

  // Mark student as voted
  const votedStudents =
    JSON.parse(localStorage.getItem("votedStudents")) || [];

  if (!votedStudents.includes(matric)) {

    votedStudents.push(matric);

    localStorage.setItem(
      "votedStudents",
      JSON.stringify(votedStudents)
    );

  }

  alert("🎉 Vote submitted successfully!");

  navigate("/voting");
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
  🗳️ Cast Your Vote
</h1>

      <p
        style={{
          color: darkMode ? "#d1d5db" : "#6b7280",
          marginBottom: "25px"
        }}
      >
        Matric: <strong>{matric}</strong>
      </p>

      {Object.entries(candidates).map(([position, list]) => (
        <div
          key={position}
          style={{
            background: darkMode ? "#1f2937" : "#ffffff",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "20px",
            border: darkMode
              ? "1px solid #374151"
              : "1px solid #e5e7eb"
          }}
        >
          <h2
  style={{
    color: darkMode ? "#f9fafb" : "#111827",
    marginBottom: "15px"
  }}
>
  {position}
</h2>

          {list.length === 1 ? (
  <div
    style={{
      background: darkMode ? "#13251b" : "#ecfdf5",
      border: darkMode
        ? "1px solid #166534"
        : "1px solid #bbf7d0",
      color: darkMode ? "#bbf7d0" : "#166534",
      padding: "14px",
      borderRadius: "12px",
      marginTop: "12px"
    }}
  >
    <strong>{list[0].name}</strong>
    <div>🎉 Unopposed — Declared Winner</div>
  </div>
) : (
  list.map((candidate) => {
  const isSenator = position.includes("Senator");

  const selected = isSenator
    ? (votes[position] || []).includes(candidate.id)
    : votes[position] === candidate.id;

  return (
    <label
      key={candidate.id}
      style={{
        display: "block",
        padding: "18px 20px",
        marginBottom: "12px",
        borderRadius: "14px",
        cursor: "pointer",
        border: selected
          ? "2px solid #16a34a"
          : darkMode
          ? "1px solid #374151"
          : "1px solid #d1d5db",
        background: selected
          ? darkMode
            ? "#13251b"
            : "#ecfdf5"
          : darkMode
          ? "#1f2937"
          : "#ffffff",
        transition: "all 0.2s ease"
      }}
    >
      <input
        type={isSenator ? "checkbox" : "radio"}
        name={position}
        checked={selected}
        onChange={() =>
          selectCandidate(position, candidate.id)
        }
        style={{ display: "none" }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div>
  <div
    style={{
      fontSize: "18px",
      fontWeight: "bold",
      color: darkMode ? "#f9fafb" : "#111827"
    }}
  >
    {candidate.name}
  </div>

  <div
    style={{
      fontSize: "14px",
      marginTop: "3px",
      color: darkMode ? "#d1d5db" : "#6b7280"
    }}
  >
    {candidate.position} Candidate
  </div>
</div>

        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "bold",
            background: selected ? "#16a34a" : "transparent",
            color: "white",
            border: selected
              ? "none"
              : darkMode
              ? "2px solid #6b7280"
              : "2px solid #9ca3af"
          }}
        >
          {selected ? "✓" : ""}
        </div>
      </div>
    </label>
  );
})
)}

        </div>
      ))}

      <button
        onClick={submitVotes}
        style={{
          width: "100%",
          padding: "15px",
          border: "none",
          borderRadius: "15px",
          background: "#16a34a",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        ✅ Submit Vote
      </button>
    </div>
  );
}

export default VoteBallot;