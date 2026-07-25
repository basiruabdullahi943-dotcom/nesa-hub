import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "400px",
        margin: "50px auto",
        textAlign: "center",
        fontFamily: "Arial"
      }}
    >
      <h1 style={{ marginBottom: "15px" }}>
        📧 Verify Your Email
      </h1>

      <p
        style={{
          color: "#6b7280",
          lineHeight: "1.7",
          marginBottom: "25px"
        }}
      >
        A verification link has been sent to your email address.
        Please check your inbox or spam folder and click the link
        before logging in.
      </p>

      <button
        onClick={() => navigate("/login")}
        style={{
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: "10px",
          background: "#4f46e5",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Go to Login
      </button>
    </div>
  );
}

export default VerifyEmail;