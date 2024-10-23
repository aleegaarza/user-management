"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireStore } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from "react-toastify";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(fireStore, "Users", user.uid), {
          email: user.email,
          firstname: name,
          lastname: lastname,
        });
      }
      console.log("user registered successfully");
      toast.success("user registered successfully!")
      window.location.href="/"
    } catch (error) {
      console.log(error.message);
      toast.error("password should be at least 6 characters")
    }
  };

  return (
    <div className="flex justify-center mt-3">
      <form className="shadow-lg p-6" onSubmit={handleRegister}>
        <h3 className="text-3xl font-bold mb-3 flex justify-center">Sign up</h3>
        <div className="mb-3 flex flex-col">
          <label className="form-label">First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label className="form-label">Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 flex flex-col">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="">Confirm password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mb-3 flex flex-col">
          <button
            className="rounded-full bg-sky-500 hover:bg-sky-400"
            type="submit"
          >
            Sign up
          </button>
        </div>
        <p><a className="text-sky-400" href="/">Sign in here</a></p>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default RegisterPage;
