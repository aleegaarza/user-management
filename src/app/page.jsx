"use client";
import { auth, firestore } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import app from "../firebase/firebase";
import LoginPage from "./auth/login/page";
import ProfilePage from "./profile/page";

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
      
    </div>
  );
}

export default HomePage;
