import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Avatar from "avataaars";

const Questions = (props) => {
  const question = props.question;
  const navigate = useNavigate();

  const toQuestions = () => {
    navigate("/Questions", { state: question });
    console.log(question);
  };

  const [open, setOpen] = useState(false);

  function handleCollapsible() {
    setOpen(!open);
  }

  return (
    <div className="each-step">
      <div className="display-question-container">
        <Avatar
          className="avatar-medium"
          avatarStyle="Circle"
          {...question.userPostedAvatar}
        />

        <div className="display-question-details">
          <p className="question-title-link" onClick={toQuestions}>
            {question.questionTitle}
          </p>

          {!open ? (
            <div className="display-tags-time">
              <div className="ques-votes">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.4rem"
                    height="1.4rem"
                    viewBox="0 0 27 25"
                    fill="none"
                  >
                    <path
                      d="M13.5123 0.857178H18.7315C25.2018 0.857178 27.8602 5.39094 24.6153 10.9279L21.996 15.3845L19.3766 19.8411C16.1317 25.3781 10.8343 25.3781 7.58937 19.8411L4.96998 15.3845L2.3506 10.9279C-0.83566 5.39094 1.80327 0.857178 8.29308 0.857178H13.5123Z"
                      stroke="black"
                      strokeOpacity="0.5"
                      strokeWidth="3"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {question.likes.length}
                </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.4rem"
                    height="1.4rem"
                    viewBox="0 0 27 25"
                    fill="none"
                    className="rotate"
                  >
                    <path
                      d="M13.5123 0.857178H18.7315C25.2018 0.857178 27.8602 5.39094 24.6153 10.9279L21.996 15.3845L19.3766 19.8411C16.1317 25.3781 10.8343 25.3781 7.58937 19.8411L4.96998 15.3845L2.3506 10.9279C-0.83566 5.39094 1.80327 0.857178 8.29308 0.857178H13.5123Z"
                      stroke="black"
                      strokeOpacity="0.5"
                      strokeWidth="3"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {question.dislikes.length}
                </span>
              </div>
              <p className="display-time">
                asked {moment(question.askedOn).fromNow()}
              </p>
            </div>
          ) : (
            <div
              className="ques-body-limit"
              dangerouslySetInnerHTML={{ __html: question.questionBody }}
            />
          )}
        </div>
        <button
          onClick={handleCollapsible}
          className={`${open ? "rotate" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.6rem"
            height="1.2rem"
            viewBox="0 0 23 14"
            fill="none"
          >
            <path
              d="M20.7622 2.35168L12.8805 11.1467C11.9497 12.1854 10.4265 12.1854 9.4957 11.1467L1.61401 2.35168"
              stroke="black"
              strokeOpacity="0.4"
              strokeWidth="3"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className={`content ${open ? "expand" : ""}`}>
        <div>
          <p>Program : {question.questionTags}</p>
          <p>Asked on: {moment(question.askedOn).fromNow()}</p>
          <p>Asked By : {question.userPosted}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p>{question.answers.length} answers</p>
          <p>{question.likes.length} upvotes</p>
          <p>{question.dislikes.length} downvotes</p>
        </div>
      </div>
    </div>
  );
};

export default Questions;
