import React from "react";
import { useLocation } from "react-router-dom";

import "../../App.css";
import Questionbar from "../../components/Questionbar/Questionbar";

const Questions = (props) => {
  const location = useLocation();
  // console.log(location.state);
  return <Questionbar question={location.state} />;
};

export default Questions;
