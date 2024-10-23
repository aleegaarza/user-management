"use client";
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
  const handleLogOut = async () => {
    try {
      await auth.signOut();
      window.location.href = "/";
      console.log("user logged out");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {userDetails ? (
        <header>
          <h1>Hello {userDetails.firstname}</h1>
          <p>{userDetails.firstname}</p>
          <p>{userDetails.lastname}</p>
          <p>{userDetails.email}</p>
          <button
            className="rounded-full bg-sky-500 hover:bg-sky-400"
            onClick={handleLogOut}
          >
            Log out
          </button>
        </header>
      ) : (
        "...Loading"
      )}
    </>
  );
};

export default ProfilePage;
