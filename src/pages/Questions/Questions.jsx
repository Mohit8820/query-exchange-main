import React from "react";
import { useLocation } from "react-router-dom";

import "../../App.css";
import Questionbar from "../../components/Questionbar/Questionbar";

const Questions = (props) => {
  function getAnswers(answers, id) {
    props.sendAnswers(answers, id);
  }
  const location = useLocation();
  console.log(location.state);
  return <Questionbar question={location.state} addAnswers={getAnswers} />;
};

export default Questions;
