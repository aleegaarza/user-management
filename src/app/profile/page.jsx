"use client";
import React, { useEffect, useState } from "react";
import { auth, fireStore } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import FormsListPage from "../pages/viewForms/page";
import Profile from "../icons/profile";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css'

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
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
  const createForm = () => {
    router.push(`/pages/formCreator`);
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
        <>
          <header className="flex justify-content-space-between m-5 text-2xl">
            <div>
              <span className="font-bold text-4xl">Hello:</span>
              <p>{userDetails.firstname}</p>
              <p>{userDetails.lastname}</p>
              <p>{userDetails.email}</p>
            </div>

            <div className="absolute top-10 right-5">
              <button onClick={() => setOpen((open) => !open)}>
                <Profile />
              </button>
            </div>
            {open && (
              <button
                className="bg-sky-500 hover:bg-sky-400 text-lg w-20 h-8 absolute top-20 right-5"
                onClick={handleLogOut}
              >
                Log out
              </button>
            )}
          </header>
          <div className="flex justify-center">
            <button className="bg-sky-200 hover:bg-sky-100 text-2xl" onClick={createForm}> Click me to create your own form!</button>
          </div>
          <div>
            <FormsListPage />
          </div>
          <footer className="flex justify-between m-5 mt-40 text-sm">
            <p>Alejandra Garza</p>
            <p>Octubre 2024</p>
          </footer>
        </>
      ) : (
        "...Loading"
      )}
    </>
  );
};

export default ProfilePage;
