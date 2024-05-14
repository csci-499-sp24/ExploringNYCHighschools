import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { useRouter } from "next/router";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (error) {
      setError("Failed to send reset password email. Please try again.");
      console.log(error);
    }
  };

  const redirectToSignIn = () => {
    router.push("/signin");
  };

  return (
    <div className="background-color" style={{ minHeight: "70vh", color: "#333" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
        }}
      >
        <form
          onSubmit={handleResetPassword}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "300px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Reset Password</h1>
          {error && <p style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>{error}</p>}
          {success && <p style={{ color: "green", textAlign: "center", marginBottom: "20px" }}>Reset password email sent. Please check your inbox.</p>}
          <div style={{ marginBottom: "20px", width: "100%" }}>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reset Password
          </button>
          <button
            type="button"
            onClick={redirectToSignIn}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "12px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Back to Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
