import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { useRouter } from "next/router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const signIn = async (e) => {
    e.preventDefault();
    setError(null);
    console.log(email, password);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      router.replace("/authorizedHomePage");
    } catch (error) {
      console.log("Error Code:", error.code);
      if (error.code === "auth/user-not-found") {
        setError("No user found with the provided email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (error.code === "auth/invalid-credential") {
        setError("Invalid credentials. Please check your email and password.");
      } else {
        setError("An error occurred. Please try again.");
        console.log(error);
      }
    }
  };

  const redirectToSignUp = () => {
    router.push("/signup");
  };

  const redirectToResetPassword = () => {
    router.push("/resetpassword");
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
          onSubmit={signIn}
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
          <h1>Sign In</h1>
          {error && <p style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>{error}</p>}
          <div style={{ marginBottom: "20px", width: "100%" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>Email</label>
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
          <div style={{ marginBottom: "20px", width: "100%" }}>
            <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
              required
            />
            <div style={{ textAlign: "right", marginTop: "5px" }}>
              <button type="button" onClick={redirectToResetPassword} style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer" }}>
                Forgot password?
              </button>
            </div>
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
            Sign In
          </button>
          <button
            type="button"
            onClick={redirectToSignUp}
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
