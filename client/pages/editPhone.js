import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth, firestore } from "../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const EditPhone = () => {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = doc(firestore, "users", userId);

      try {
        await updateDoc(userRef, { phone });
        console.log("Phone number updated successfully");
        router.push("/accountInformation");
      } catch (error) {
        console.error("Error updating phone number:", error);
      }
    } else {
      console.log("User not authenticated");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh" }}>
      <div style={{ width: "300px" }}>
        <h1>Edit Phone Number</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={handleChange}
            style={{ marginBottom: "10px", width: "100%" }}
          />
          <button type="submit" style={{ width: "100%" }}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPhone;