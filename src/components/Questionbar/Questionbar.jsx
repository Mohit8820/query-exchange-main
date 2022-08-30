import React, { useState } from "react";
import moment from "moment";

import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import Editor from "./QuillEditor/Editor";
import "./Questionbar.css";
const Questionsbar = (props) => {
  var question = props.question;

  const [answers, setAnswers] = useState(question.answers);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getAnswer = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:4000/api/questions/${question.id}`
      );

      setAnswers(responseData.question.answers);
      console.log(answers);
    } catch (err) {}
  };

  /* function addAns(value) {
    setAnswers((prevAnswers) => {
      return [...prevAnswers, value];
    });
  }*/
  //
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="question-bar">
        <div className="display-ques">
          <h3>{question.questionTitle}</h3>
          <p>{question.questionBody}</p>
          <div className="display-tags-time">
            <div className="display-tags">
              <p>{question.questionTags}</p>
            </div>
            <p className="display-time">
              asked {moment(question.askedOn).fromNow()}
            </p>
          </div>
        </div>

        {/* <div>
        <p>{question.upVotes - question.downVotes}</p>
        <p>votes</p>
      </div>
      <div className="display-votes-ans">
        <p>{question.noOfAnswers}</p>
        <p>answers</p> 
      </div>*/}

        <div className="answers">
          <h3>Answers</h3>
          <hr></hr>
          {answers.map((answer, index) => {
            return (
              <React.Fragment key={index}>
                <span>{answer.id}</span>
                <span>{answer.userAnswered}</span>
                <div dangerouslySetInnerHTML={{ __html: answer.answerBody }} />
                <hr></hr>
              </React.Fragment>
            );
          })}
        </div>

        <Editor add={getAnswer} qid={question._id} />
      </div>
    </React.Fragment>
  );
};

export default Questionsbar;
