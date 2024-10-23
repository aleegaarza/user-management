"use client";
import { firestore } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import app from "../firebase/firebase";
import LoginPage from "./auth/login/page";

function HomePage() {
  return (
    <div>
      <h2>Welcome</h2>
      <LoginPage/>
    </div>
  );
}

export default HomePage;
