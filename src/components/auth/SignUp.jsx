import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database"; // Import Firebase Realtime Database functions
import React, { useState } from "react";
import { auth, database } from "../../firebase"; // Make sure to import the `database` object

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;

        // Initialize the user's data node in the Realtime Database
        const userNode = ref(database, `users/${userId}`);

        // Create an initial data structure for the user (e.g., products)
        const initialUserData = {
          products: {},
          // Add other user-related data if needed
        };

        // Set the user's data in the Realtime Database
        set(userNode, initialUserData)
          .then(() => {
            console.log("User data node created successfully!");
          })
          .catch((error) => {
            console.error("Error creating user data node: ", error);
          });
      })
      .catch((error) => {
        console.error("Error creating user: ", error);
      });
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signUp}>
        <h1>Create Account</h1>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
