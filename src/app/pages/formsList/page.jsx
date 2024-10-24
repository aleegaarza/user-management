"use client";
import { fireStore } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const FormsList = () => {
  const [form, setForm] = useState(null);
  const formId = "FCWXHcgkDZRQGkbZa9D0";
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const formDoc = await getDoc(doc(fireStore, "forms", formId));
        if (formDoc.exists()) {
          setForm(formDoc.data());
        } else {
          console.log("Form does not exist");
        }
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };
    fetchForm();
  }, []);

  if (!form) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{form.title}</h1>
      {form.questions.map((question, index) => (
        <div key={index}>
          <label>{question.question}</label>
          <input type={question.type} />
        </div>
      ))}
    </div>
  );
};

export default FormsList;
