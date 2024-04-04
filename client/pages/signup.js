import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/router";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const signUp = async (e) => {
    e.preventDefault();
    setError(null);

    // Password strength criteria
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      // TODO: Store the full name in the database associated with the user's account
      router.replace("/authorizedHomePage");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("The email address is already in use. Please use a different email.");
      } else {
        setError("An error occurred. Please try again.");
        console.log(error);
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
      }}
    >
      <form
        onSubmit={signUp}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '300px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <h1>Create Account</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{
            margin: '10px 0',
            padding: '10px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        ></input>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            margin: '10px 0',
            padding: '10px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            margin: '10px 0',
            padding: '10px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        ></input>
        <button
          type="submit"
          style={{
            margin: '10px 0',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;