import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth, firestore } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const AdditionalInfo = () => {
  const [additionalInfo, setAdditionalInfo] = useState({
    address: "",
    city: "",
    zipcode: "",
    state: "",
    // Add other fields as needed
  });
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdditionalInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const email = currentUser.email;
      const fullName = localStorage.getItem("tempUserName");
      console.log("User ID:", userId);
      console.log("Email:", email);
      console.log("Full Name:", fullName);
      try {
        const userRef = doc(firestore, "users", userId);
        await setDoc(userRef, {
          fullName,
          email,
          ...additionalInfo,
        });
        console.log("User data stored successfully");
        localStorage.removeItem("tempUserName");
        router.push("/authorizedHomePage");
      } catch (error) {
        console.error("Error storing user data:", error);
      }
    } else {
      console.log("User not authenticated");
      // Handle the case when the user is not authenticated
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40vh",
      }}
    >
      <div style={{ width: "300px" }}>
        <h1>Additional Information</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your address"
            name="address"
            value={additionalInfo.address}
            onChange={handleChange}
            style={{ marginBottom: "10px", width: "100%" }}
          />
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="City"
              name="city"
              value={additionalInfo.city}
              onChange={handleChange}
              style={{ marginRight: "10px", width: "calc(50% - 5px)" }}
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              value={additionalInfo.state}
              onChange={handleChange}
              style={{ marginRight: "10px", width: "calc(25% - 5px)" }}
            />
            <input
              type="text"
              placeholder="Zipcode"
              name="zipcode"
              value={additionalInfo.zipcode}
              onChange={handleChange}
              style={{ width: "calc(25% - 5px)" }}
            />
          </div>
          {/* Add other input fields for additional information */}
          <button type="submit" style={{ width: "100%" }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdditionalInfo;