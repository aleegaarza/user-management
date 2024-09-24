import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBbtx8tizDy10zcjv5B6Eu3vqgEBaVKutQ",
  authDomain: "user-management-af2c4.firebaseapp.com",
  projectId: "user-management-af2c4",
  storageBucket: "user-management-af2c4.appspot.com",
  messagingSenderId: "529067353756",
  appId: "1:529067353756:web:bb90f33592658facec2f59",
  measurementId: "G-Y11ZZGPXEQ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const getFirestore = firebase.firestore();
export const auth = firebase.auth();
