"use client";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex justify-center mt-3">
      <form className="shadow-lg p-6">
        <h3 className="text-3xl font-bold mb-3 flex justify-center">Sign in</h3>
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
          <button
            className="rounded-full bg-sky-500 hover:bg-sky-400"
            type="submit"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
