import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/router"; // Import useRouter from next/router

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Use useRouter() hook

  const signIn = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      // Replace the current route without triggering a full page reload
      router.replace("/homepage");
    } catch (error) {
      console.log(error);
    }
  };

  const redirectToSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Log In to your Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Log In</button>
      </form>
      <button onClick={redirectToSignUp}>Sign Up</button>
    </div>
  );
};

export default SignIn;
