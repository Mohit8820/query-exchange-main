import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Questions from "./pages/Questions/Questions";
import AskQuestion from "./pages/AskQuestion/AskQuestion";

const AllRoutes = () => {
  // const [question,setQuestion]=useState({});
  const [questionsList, setQuestionList] = useState([
    {
      _id: 1,
      upVotes: 8,
      downVotes: 2,
      noOfAnswers: 2,
      questionTitle:
        "What is the difference between the function malloc() and calloc()?",
      questionBody:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      questionTags: "bca",
      userPosted: "mano",
      userId: 1,
      askedOn: " 2022-07-14 11:45:26.123",
      answer: [
        {
          answerBody: "<span>a</span>",
          userAnswered: "kumar",
          //   answeredOn: "jan 2",
          userId: 2,
        },
      ],
    },
    {
      _id: 2,
      upVotes: 8,
      downVotes: 2,
      noOfAnswers: 2,
      questionTitle:
        "What are the key skills a candidate requires to excel in the field of business administration?",
      questionBody: "It meant to be",
      questionTags: "bba",
      userPosted: "mano",
      userId: 1,
      askedOn: "2022-07-14 10:45:26.123",
      answer: [
        {
          answerBody: "<span>a</span>",
          userAnswered: "kumar",
          //   answeredOn: "jan 2",
          userId: 2,
        },
        {
          answerBody: "<h2>Answer 2</h2>",
          userAnswered: "kumar 333",
          //   answeredOn: "jan 2",
          userId: 22,
        },
      ],
    },
    {
      _id: 3,
      upVotes: 8,
      downVotes: 2,
      noOfAnswers: 2,
      questionTitle: "What are embedded structure?",
      questionBody: "It meant to be",
      questionTags: "b.tech",
      userPosted: "mano",
      userId: 1,
      askedOn: "jan 20",
      answer: [
        {
          answerBody: "<span>a</span>",
          userAnswered: "kumar",
          //   answeredOn: "jan 2",
          userId: 2,
        },
        {
          answerBody: "<h2>Answer 2</h2>",
          userAnswered: "kumar 333",
          //   answeredOn: "jan 2",
          userId: 22,
        },
      ],
    },
    {
      _id: 4,
      upVotes: 8,
      downVotes: 2,
      noOfAnswers: 2,
      questionTitle:
        "Without using library function compute the length of the string.",
      questionBody:
        "I'm coding a function to find the string length without using the standard headers. I completed the code with start to end but when I'm returning the count at the end, it is not returning the correct answer.",
      questionTags: "b.tech",
      userPosted: "mano",
      userId: 1,
      askedOn: "jan 1",
      answer: [],
    },
  ]);
  function addQues(ques) {
    setQuestionList((prevQuestions) => [...prevQuestions, ques]);
  }

  const updateAnswers = (answers, id) => {
    // const newState = data.map((obj) => {
    //   // 👇️ if id equals 2, update country property
    //   if (obj.id === 2) {
    //     return { ...obj, country: "Denmark" };
    //   }
    //   // 👇️ otherwise return object as is
    //   return obj;
    // });
    // setData(newState);
    console.log(answers, id);
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home questions={questionsList} />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/Auth" element={<Auth />} />
      <Route
        path="/Questions"
        element={<Questions sendAnswers={updateAnswers} />}
      />
      <Route path="/AskQuestion" element={<AskQuestion onAdd={addQues} />} />
    </Routes>
  );
};

export default AllRoutes;
