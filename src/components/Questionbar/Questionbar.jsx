import React, { useState } from "react";
import moment from "moment";
import Editor from "./QuillEditor/Editor";
import "./Questionbar.css";
const Questionsbar = (props) => {
  var question = props.question;

  // question = {
  //   _id: 1,
  //   upVotes: 8,
  //   downVotes: 2,
  //   noOfAnswers: 2,
  //   questionTitle: "What is a function?",
  //   questionBody: "It meant to be",
  //   questionTags: "management",
  //   userPosted: "mano",
  //   userId: 1,
  //   //askedOn: "jan 1",
  //   answer: [
  //     {
  //       answerBody: <h2>hdagsk</h2>,
  //       userAnswered: "kumar",
  //       //   answeredOn: "jan 2",
  //       userId: 2,
  //     },
  //   ],
  // };

  var flag = false;
  const [answers, setAnswers] = useState(question.answer);

  function addAns(value) {
    setAnswers((prevAnswers) => {
      return [...prevAnswers, value];
    });
    flag = true;
  }

  if (flag === true) {
    console.log(answers);
    props.addAnswers(answers, question._id);
  }
  //
  return (
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
        {answers.map((answer, key) => {
          return (
            <div>
              <div dangerouslySetInnerHTML={{ __html: answer.answerBody }} />
              <hr></hr>
            </div>
          );
        })}
      </div>

      <Editor add={addAns} />
    </div>
  );
};

export default Questionsbar;
