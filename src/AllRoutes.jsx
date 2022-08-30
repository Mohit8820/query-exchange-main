import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Questions from "./pages/Questions/Questions";
import AskQuestion from "./pages/AskQuestion/AskQuestion";

const AllRoutes = () => {
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
      <Route path="/Questions" element={<Questions />} />
      <Route path="/AskQuestion" element={<AskQuestion />} />
    </Routes>
  );
};

export default AllRoutes;
