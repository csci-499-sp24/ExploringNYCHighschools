import React, { useState } from "react";
import { useAuth } from "../firebase/authContext";
import { useRouter } from "next/router";

const Registration = () => {
  const { signup, error } = useAuth();
  const [errors, setError] = useState("");
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const userhandler = (event) => {
    const { name, value } = event.target;
    console.log(name + ":::::::::::" + value);
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const RegistrationHandler = async (e) => {
    e.preventDefault();
    setError(null);
    const { fullName, email, password, confirmPassword } = user;
    if (password !== confirmPassword) {
      setError("Password does not match");
      return;
    }
    try {
      await signup(email, password, fullName);
      localStorage.setItem("tempUserEmail", email);
      localStorage.setItem("tempUserName", fullName);
      router.push("/additionalInfo");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // height: "70vh",
      }}
    >
      <br />
      <form
        onSubmit={RegistrationHandler}
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
        <h1>Create Account</h1>
        {errors && <p style={{ color: "red" }}>{errors}</p>}
        <input
          type="text"
          placeholder="Enter your full name"
          name="fullName"
          value={user.fullName}
          onChange={userhandler}
          style={{
            margin: "10px 0",
            padding: "10px",
            width: "100%",
            boxSizing: "border-box",
          }}
        ></input>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={user.email}
          onChange={userhandler}
          style={{
            margin: "10px 0",
            padding: "10px",
            width: "100%",
            boxSizing: "border-box",
          }}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={user.password}
          onChange={userhandler}
          style={{
            margin: "10px 0",
            padding: "10px",
            width: "100%",
            boxSizing: "border-box",
          }}
        ></input>
        <input
          type="password"
          placeholder="Confirm your password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={userhandler}
          style={{
            margin: "10px 0",
            padding: "10px",
            width: "100%",
            boxSizing: "border-box",
          }}
        ></input>
        <button
          type="submit"
          style={{
            margin: "10px 0",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </form>
      <br />
    </div>
  );
};

export default Registration;