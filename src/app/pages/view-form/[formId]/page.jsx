"use client";
import { fireStore } from "@/firebase/firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const ViewFormPage = ({ params }) => {
  const { formId } = params;
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const formRef = doc(fireStore, "forms", formId);
        const formSnap = await getDoc(formRef);

        if (formSnap.exists()) {
          setForm(formSnap.data());
          setResponses(formSnap.data().questions.map(() => ""));
          console.log("data", formSnap.data());
        } else {
          toast.error("Form not found!");
        }
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };

    if (formId) {
      fetchForm();
    }
  }, [formId]);

  const handleResponseChange = (index, event) => {
    const newResponses = [...responses];
    newResponses[index] = event.target.value;
    setResponses(newResponses);
  };

  const submitResponses = async () => {
    try {
      await addDoc(collection(fireStore, "responses"), {
        formId: formId,
        responses: responses,
      });
      toast.success("Responses submitted!");
    } catch (error) {
      toast.error("Error submitting responses:", error);
    }
  };
  if (!form) return <p>Loading...</p>;
  return (
    <>
    
    <button className="absolute top-10 right-5 font-bold" onClick={() => {router.push("/profile")}}>Go back</button>
    <div className="flex items-center flex-col w-100">
      {form ? (
        <>
          <h1 className="text-4xl m-20">{form.title}</h1>
          {/* <h2>{form.}</h2> */}
          {form.questions.map((question, i) => (
            <div className="border-2 flex " key={i}>
              <label>{question.question}</label>
              {question.type === "text" && (
                <input
                  type="text"
                  value={responses[i]}
                  onChange={(e) => handleResponseChange(i, e)}
                />
              )}
              {question.type === "checkbox" && (
                <input
                  type="checkbox"
                  checked={responses[i]}
                  onChange={(e) => handleResponseChange(i, e)}
                />
              )}
              {question.type === "radio" && (
                <input
                  type="radio"
                  value={responses[i]}
                  onChange={(e) => handleResponseChange(i, e)}
                />
              )}
            </div>
          ))}
          <button
            className="w-40 bg-sky-500 hover:bg-sky-400 mt-10"
            onClick={submitResponses}
          >
            Submit Responses
          </button>
        </>
      ) : (
        <p>Form not found</p>
      )}
    </div>
    <ToastContainer/>
    </>
  );
};

export default ViewFormPage;
