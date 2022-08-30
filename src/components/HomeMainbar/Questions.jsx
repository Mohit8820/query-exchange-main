import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Questions = (props) => {
  const question = props.question;
  const navigate = useNavigate();

  const toQuestions = () => {
    navigate("/Questions", { state: question });
    console.log(question);
  };

  return (
    <div className="display-question-container">
      {/* <div className="display-votes-ans">
        <p>{question.upVotes - question.downVotes}</p>
        <p>votes</p>
      </div>
      <div className="display-votes-ans">
        <p>{question.noOfAnswers}</p>
        <p>answers</p>
      </div> */}
      <div className="display-question-details">
        <p className="question-title-link" onClick={toQuestions}>
          {question.questionTitle}
        </p>
        {/* <Link to={`/Questions/${question._id}`} className="question-title-link">
          {question.questionTitle}
        </Link> */}
        <div className="display-tags-time">
          <div className="display-tags">
            <p>{question.questionTags}</p>
          </div>
          <p className="display-time">
            asked {moment(question.askedOn).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Questions;
