import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./HomeMainbar.css";
import QuestionList from "./QuestionList";

const HomeMainbar = (props) => {
  /*const checkAuth = () => {
    if (!auth.isLoggedIn) {
      alert("login or signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion" );
    }
  };
  */

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {/* {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : ( */}
        <h1 className="heading">{props.filter} questions</h1>
        {/* )} */}
      </div>
      <div className="display-questions">
        {props.questions.length === 0 ? (
          <h1>No Questions Found</h1>
        ) : (
          <>
            <QuestionList
              questionsList={props.questions}
              filterval={props.filter}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
