"use client";
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
    <div className="flex items-center flex-col">
      <h1 className="text-4xl m-10 mt-20">Available Forms</h1>
      <ul className="inline-grid grid-cols-3 gap-10 items-end">
        {forms.map((form) => (
          <li className="flex items-center flex-col text-xl" key={form.id}>
            {form.title}{" "}
            <button
              className="w-40 bg-sky-500 hover:bg-sky-400 mt-10"
              onClick={() => viewForm(form.id)}
            >
              View Form
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormsListPage;
