import React, { useContext, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/UIElements/LoadingSpinner";

import { AuthContext } from "./contexts/auth-context";

import Home from "./pages/Home/Home";
//import Contact from "./pages/Contact/Contact";
import Landing from "./pages/Landing/Landing";
//import Auth from "./pages/Auth/Auth";
//import Questions from "./pages/Questions/Questions";
//import AskQuestion from "./pages/AskQuestion/AskQuestion";
//import Users from "./pages/Users/Users";

const Users = React.lazy(() => import("./pages/Users/Users"));
const AskQuestion = React.lazy(() => import("./pages/AskQuestion/AskQuestion"));
const Questions = React.lazy(() => import("./pages/Questions/Questions"));
const Auth = React.lazy(() => import("./pages/Auth/Auth"));
const Contact = React.lazy(() => import("./pages/Contact/Contact"));

const AllRoutes = () => {
  const auth = useContext(AuthContext);

  let routes;
  if (auth.isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/AskQuestion" element={<AskQuestion />} />
        <Route path="/Questions" element={<Questions />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Questions" element={<Questions />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  }

  return (
    <React.Fragment>
      <Suspense
        fallback={
          <div className="center">
            <LoadingSpinner />
          </div>
        }
      >
        {routes}
      </Suspense>
    </React.Fragment>
  );
};

export default AllRoutes;
