"use client";
import { auth, firestore } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";
import LoginPage from "./auth/login/page";
import ProfilePage from "./profile/page";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";

function HomePage() {
  const [user, setUser] = useState()
  useEffect(() =>{
    auth.onAuthStateChanged(user=>{
      setUser(user)
    })
  })
  return (
    <div>
      <h2>Welcome</h2>
      {user ? <ProfilePage/> : <LoginPage/>}
      <ToastContainer/>
    </div>
  );
}

export default HomePage;
