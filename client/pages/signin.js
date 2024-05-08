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
    console.log(email, password)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      router.replace("/authorizedHomePage");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("No user found with the provided email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
        console.log(error);
      }
    }
  };

  const redirectToSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="background-color">
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
        onSubmit={signIn}
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
        <h1>Log In to your Account</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
            padding: '10px 25px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Log In
        </button>
        <button
          type="button"
          onClick={redirectToSignUp}
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
    </div>
  );
};

export default SignIn;