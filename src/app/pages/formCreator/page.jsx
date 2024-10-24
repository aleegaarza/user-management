"use client"
import React, { useState } from "react";
import { auth, fireStore } from "@/firebase/firebase";
import { addDoc, collection, documentId, getDoc } from "firebase/firestore";

const CreateFormsPage = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ question: "", type: "text" }]);

  const addQuestion = () => {
    setQuestions([...questions, { question: "", type: "text" }]);
  };

  const handleInputChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index][event.target.name] = event.target.value;
    setQuestions(newQuestions);
  };
  const saveForm = async () => {
    try {
      await addDoc(collection(fireStore, "forms"), {
        title,
        questions,
      });
      alert("Form saved!");
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };
  return (
    <div>
      <h1>Create Forms</h1>
      <input
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {questions.map((question, index) => (
        <div key={index}>
          <input
            name="question"
            type="text"
            placeholder="Question"
            value={question.question}
            onChange={(e) => handleInputChange(index, e)}
          />
          <select
            name="type"
            value={question.type}
            onChange={(e) => handleInputChange(index, e)}
          >
            <option value="text">Text</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Multiple Choice</option>
          </select>
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={saveForm}>Save Form</button>
    </div>
  );
};

export default CreateFormsPage;
