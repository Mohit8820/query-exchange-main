import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Questions from "./pages/Questions/Questions";
import AskQuestion from "./pages/AskQuestion/AskQuestion";

const AllRoutes = () => {
  // const [question,setQuestion]=useState({});

  // function addQues(ques) {
  //   setQuestionList((prevQuestions) => [...prevQuestions, ques]);
  // }

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

  /*const [user, setUser] = useState("");
  const updateUser = (user) => {
    setUser(user);
  };
  console.log("user" + user);*/
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home /*user={user} */ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/Auth" element={<Auth /*getUser={updateUser}*/ />} />
      <Route
        path="/Questions"
        element={<Questions /*sendAnswers={updateAnswers}*/ />}
      />
      <Route
        path="/AskQuestion"
        element={<AskQuestion /*onAdd={addQues}*/ />}
      />
    </Routes>
  );
};

export default AllRoutes;
