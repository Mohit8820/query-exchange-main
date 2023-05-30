import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";

import "../../App.css";
import Questionbar from "../../components/Questionbar/Questionbar";

const Questions = () => {
  const { qId } = useParams();
  console.log(qId);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [question, setQuestion] = useState({});
  const getQuesData = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/questions/${qId}`
      );

      setQuestion(responseData.question);
      console.log("getQuestion:", question);
    } catch (err) {}
  };
  useEffect(() => {
    getQuesData();
  }, []);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {question.answers ? (
        <Questionbar question={question} refreshAnswers={getQuesData} />
      ) : (
        <h1 style={{ textAlign: "center", marginTop: "20%" }}>
          Finding answers...
        </h1>
      )}
    </React.Fragment>
  );
};

export default Questions;
