import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/auth-context";
import "./HomeMainbar.css";
import QuestionList from "./QuestionList";
import Button from "@mui/material/Button";

const HomeMainbar = (props) => {
  /*const user = props.user;*/
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const checkAuth = () => {
    if (!auth.isLoggedIn) {
      alert("login or signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion" /*, { state: user }*/);
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {/* {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : ( */}
        <h1 className="heading">{props.filter} questions</h1>
        {/* )} */}
        <Button variant="contained" onClick={checkAuth} className="ask-btn">
          Ask Question
        </Button>
      </div>
      <div className="display-questions">
        {props.questions === null ? (
          <h1>Loading...</h1>
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
