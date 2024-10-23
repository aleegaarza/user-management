"use client"
import React, { useEffect, useState } from "react";
import { auth, fireStore } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const fetchData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const docRef = doc(fireStore, "Users", user.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setUserDetails(snap.data());
        console.log(snap.data());
      } else {
        console.log("user is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
        {userDetails ? 
        <header>
        <h1>Hello {userDetails.firstname}</h1>
        <p>{userDetails.firstname}</p>
        <p>{userDetails.lastname}</p>
        <p>{userDetails.email}</p>
        </header>
        : "...Loading"}
      
    </>
  );
};

export default ProfilePage;
