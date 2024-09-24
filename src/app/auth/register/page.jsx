"use client"
import React, { useState } from 'react'; 
import { createUserWithEmailAndPassword, getAuth, auth } from 'firebase/auth';


const RegisterPage = () => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password

  // Handle form submission
  const handleRegister = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('User registered:', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error registering:', errorCode, errorMessage);
      });
  };

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={handleRegister}>
        <input 
          type='text' 
          placeholder='Name'
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type='email' 
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type='password' 
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)} 
        />
        <input 
          type='password' // Use correct input type
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default RegisterPage;
