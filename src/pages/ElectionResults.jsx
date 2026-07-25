import { useMemo } from "react";
import { useEffect } from "react";

function ElectionResults() {
  const darkMode =
    localStorage.getItem("darkMode") === "true";

    useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const savedCandidates =
    JSON.parse(localStorage.getItem("candidates")) || [];

  const electionResults =
    JSON.parse(localStorage.getItem("electionResults")) || {};

    const electionOpen =
  localStorage.getItem("electionOpen") === "true";
  

  if (electionOpen) {
  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        background: darkMode ? "#111827" : "#f3f4f6",
        color: darkMode ? "#f9fafb" : "#111827"
      }}
    >
      <h1
  style={{
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
  🏆 Election Results
</h1>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          borderRadius: "15px",
          background: darkMode ? "#1f2937" : "#ffffff",
          border: darkMode
            ? "1px solid #374151"
            : "1px solid #e5e7eb",
          textAlign: "center"
        }}
      >
        <h2
  style={{
    color: darkMode ? "#f9fafb" : "#111827"
  }}
>
  🔒 Results Not Available Yet
</h2>

        <p
          style={{
            color: darkMode ? "#d1d5db" : "#6b7280"
          }}
        >
          The election is still ongoing. Results will be published after the election is closed by the administrator.
        </p>
      </div>
    </div>
  );
}

  const groupedResults = useMemo(() => {
    const groups = {};

    savedCandidates.forEach((candidate) => {
      const position = candidate.position;

      if (!groups[position]) {
        groups[position] = [];
      }

      const votes =
        electionResults[position]?.[candidate.id] || 0;

      groups[position].push({
        ...candidate,
        votes
      });
    });

    Object.keys(groups).forEach((position) => {
      groups[position].sort((a, b) => b.votes - a.votes);
    });

    return groups;
  }, [savedCandidates, electionResults]);

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
      <h1>🏆 Election Results</h1>

      {Object.entries(groupedResults).map(
        ([position, candidates]) => {
          const totalVotes = candidates.reduce(
            (sum, c) => sum + c.votes,
            0
          );

          const isSenator =
            position.includes("Senator");

          const winners = isSenator
            ? candidates.slice(0, 2)
            : candidates.slice(0, 1);

          return (
            <div
              key={position}
              style={{
                background: darkMode
                  ? "#1f2937"
                  : "#ffffff",
                padding: "20px",
                borderRadius: "15px",
                marginBottom: "20px",
                border: darkMode
                  ? "1px solid #374151"
                  : "1px solid #e5e7eb"
              }}
            >
              <h2>{position}</h2>

              {candidates.length === 1 ? (
                <div
                  style={{
                    background: darkMode
                      ? "#13251b"
                      : "#ecfdf5",
                    border: darkMode
                      ? "1px solid #166534"
                      : "1px solid #bbf7d0",
                    color: darkMode
                      ? "#bbf7d0"
                      : "#166534",
                    padding: "14px",
                    borderRadius: "12px",
                    marginTop: "12px"
                  }}
                >
                  🎉 <strong>{candidates[0].name}</strong> — Unopposed
                </div>
              ) : (
                <>
                  {candidates.map((candidate, index) => {
                    const percentage =
                      totalVotes > 0
                        ? (
                            (candidate.votes /
                              totalVotes) *
                            100
                          ).toFixed(1)
                        : "0.0";

                    return (
                      <div
                        key={candidate.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 0",
                          borderBottom:
                            index !== candidates.length - 1
                              ? darkMode
                                ? "1px solid #374151"
                                : "1px solid #e5e7eb"
                              : "none"
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                          }}
                        >
                          <span
                            style={{
                              fontSize: "22px"
                            }}
                          >
                            {index === 0
                              ? "🥇"
                              : index === 1
                              ? "🥈"
                              : index === 2
                              ? "🥉"
                              : "•"}
                          </span>

                          <div>
                            <div
                              style={{
                                fontWeight: "bold"
                              }}
                            >
                              {candidate.name}
                            </div>

                            <div
                              style={{
                                fontSize: "13px",
                                color: darkMode
                                  ? "#d1d5db"
                                  : "#6b7280"
                              }}
                            >
                              {candidate.level}
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            textAlign: "right"
                          }}
                        >
                          <div
                            style={{
                              fontWeight: "bold",
                              fontSize: "18px"
                            }}
                          >
                            {candidate.votes}
                          </div>

                          <div
                            style={{
                              fontSize: "13px",
                              color: darkMode
                                ? "#d1d5db"
                                : "#6b7280"
                            }}
                          >
                            {percentage}%
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div
                    style={{
                      marginTop: "15px",
                      padding: "12px",
                      borderRadius: "10px",
                      background: darkMode
                        ? "#13251b"
                        : "#ecfdf5",
                      border: darkMode
                        ? "1px solid #166534"
                        : "1px solid #bbf7d0",
                      color: darkMode
                        ? "#bbf7d0"
                        : "#166534",
                      fontWeight: "bold"
                    }}
                  >
                    {isSenator ? (
                      <>
                        🏆 Winners:{" "}
                        {winners
                          .map((w) => w.name)
                          .join(" & ")}
                      </>
                    ) : (
                      <>
                        🏆 Winner: {winners[0].name}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}

export default ElectionResults;