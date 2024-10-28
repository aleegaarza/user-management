"use client";
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
    <div className="flex items-center flex-col">
      <h1 className="text-4xl mt-10">Create Forms</h1>
      <input
        type="text"
        className="m-4"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {questions.map((question, index) => (
        <div key={index}>
          <input
            name="question"
            type="text"
            className="mb-2"
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
      <div className="mt-4">
        <button
          className="bg-sky-500 hover:bg-sky-400 mx-6 w-40"
          onClick={addQuestion}
        >
          Add Question
        </button>
        <button
          className="bg-sky-500 hover:bg-sky-400 mx-6 w-40"
          onClick={saveForm}
        >
          Save Form
        </button>
      </div>
    </div>
  );
};

export default CreateFormsPage;
