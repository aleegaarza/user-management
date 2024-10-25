"use client"
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

const FormsListPage = () => {
  const [forms, setForms] = useState([]);
  const router = useRouter();

  // Fetch all forms from Firestore
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const formsCollection = await getDocs(collection(fireStore, "forms"));
        const formsList = formsCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setForms(formsList);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };
    fetchForms();
  }, []);

  // Redirect to view form page
  const viewForm = (formId) => {
    router.push(`/view-form/${formId}`); // Redirecting to the form view page
  };

  return (
    <div>
      <h1>Available Forms</h1>
      <ul>
        {forms.map((form) => (
          <li key={form.id}>
            {form.title}{" "}
            <button onClick={() => viewForm(form.id)}>View Form</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormsListPage;
