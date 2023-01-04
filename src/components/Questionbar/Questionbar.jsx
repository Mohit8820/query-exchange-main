import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../../contexts/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import Modal from "../UIElements/Modal";
import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import Editor from "./QuillEditor/Editor";
import "./Questionbar.css";
import Answers from "./Answers";
import Dropdown from "../Dropdown/Dropdown";
import Lightbox from "../UIElements/Lightbox";

const Questionsbar = (props) => {
  var question = props.question;
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [answers, setAnswers] = useState(question.answers);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getAnswer = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/questions/${question.id}`
      );

      setAnswers(responseData.question.answers);
    } catch (err) {}
  };
  const [ansBtn, setAnsBtn] = useState(false);
  const [deleteQues, setDeleteQues] = useState(false);

  const deleteQuestion = async () => {
    setDeleteQues(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/questions/${question.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/home");
    } catch (err) {}
  };

  const [like, setLike] = useState(question.likes.length);
  const [dislike, setDislike] = useState(question.dislikes.length);
  const [likeactive, setlikeactive] = useState(
    question.likes.includes(auth.userId)
  );
  const [dislikeactive, setdislikeactive] = useState(
    question.dislikes.includes(auth.userId)
  );

  const votePatch = async (method) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/questions/${method}/${question.id}`,
        "PATCH",
        JSON.stringify({
          userId: auth.userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
  };

  function likef() {
    if (likeactive) {
      votePatch("unlike");
      setlikeactive(false);
      setLike(like - 1);
    } else {
      votePatch("like");
      setlikeactive(true);
      setLike(like + 1);
      if (dislikeactive) {
        votePatch("undoDislike");
        setdislikeactive(false);
        setLike(like + 1);
        setDislike(dislike - 1);
      }
    }
  }
  function dislikef() {
    if (dislikeactive) {
      votePatch("undoDislike");
      setdislikeactive(false);
      setDislike(dislike - 1);
    } else {
      votePatch("dislike");
      setdislikeactive(true);
      setDislike(dislike + 1);
      if (likeactive) {
        votePatch("unlike");
        setlikeactive(false);
        setDislike(dislike + 1);
        setLike(like - 1);
      }
    }
  }

  const [sort, setSort] = useState("upvotes");

  const sortMethods = {
    // none: { method: (a, b) => null },

    latest: {
      method: (a, b) => new Date(b.answeredOn) - new Date(a.answeredOn),
    },
    oldest: {
      method: (a, b) => new Date(a.answeredOn) - new Date(b.answeredOn),
    },

    upvotes: {
      method: (a, b) => (a.upvotes.length > b.upvotes.length ? -1 : 1),
    },
    downvotes: {
      method: (a, b) => (a.downvotes.length > b.downvotes.length ? -1 : 1),
    },
  };

  var url = [];
  question.questionImage.forEach((image) => url.push(image.url));

  const [slideNo, setSlideNo] = useState(0);
  const [lightBox, setLightBox] = useState(false);

  function closeLightbox() {
    setLightBox(false);
  }

  return (
    <React.Fragment>
      <Modal
        onCancel={() => setDeleteQues(false)}
        show={deleteQues}
        header="Delete Question"
        footer={
          <div>
            <button onClick={() => setDeleteQues(false)} className="text-btn">
              Cancel
            </button>
            <button onClick={deleteQuestion} className="filled-btn">
              Okay
            </button>
          </div>
        }
      >
        Do you want to delete the question
      </Modal>

      <Modal
        onCancel={() => setAnsBtn(false)}
        show={ansBtn}
        header="Your answer"
        footerClass="display-none"
      >
        <Editor
          add={getAnswer}
          qid={question._id}
          gotAnswer={() => setAnsBtn(false)}
        />
      </Modal>
      <Lightbox
        url={url}
        titles={question.questionImageTitles}
        show={lightBox}
        slideNo={slideNo}
        close={closeLightbox}
      />
      <ErrorModal error={error} onClear={clearError} />

      <div className="question-bar">
        <div className="ques-n-ans-container">
          <div className="ques-bar-head">
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="vote-btns">
              <button onClick={likef} disabled={!auth.isLoggedIn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.7rem"
                  height="2.5rem"
                  viewBox="0 0 27 25"
                  fill="none"
                  className={`rotate ${likeactive ? "vote-btn" : ""}`}
                >
                  <path
                    d="M13.5123 0.857178H18.7315C25.2018 0.857178 27.8602 5.39094 24.6153 10.9279L21.996 15.3845L19.3766 19.8411C16.1317 25.3781 10.8343 25.3781 7.58937 19.8411L4.96998 15.3845L2.3506 10.9279C-0.83566 5.39094 1.80327 0.857178 8.29308 0.857178H13.5123Z"
                    stroke="black"
                    stroke-opacity="0.5"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span> {like}</span>
              </button>
              <button onClick={dislikef} disabled={!auth.isLoggedIn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.7rem"
                  height="2.5rem"
                  viewBox="0 0 27 25"
                  fill="none"
                  className={` ${dislikeactive ? "vote-btn" : ""}`}
                >
                  <path
                    d="M13.5123 0.857178H18.7315C25.2018 0.857178 27.8602 5.39094 24.6153 10.9279L21.996 15.3845L19.3766 19.8411C16.1317 25.3781 10.8343 25.3781 7.58937 19.8411L4.96998 15.3845L2.3506 10.9279C-0.83566 5.39094 1.80327 0.857178 8.29308 0.857178H13.5123Z"
                    stroke="black"
                    stroke-opacity="0.5"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span className="de-vote">{dislike}</span>
              </button>
            </div>
            <h3>{question.questionTitle}</h3>
          </div>
          <div className="scrollable">
            <div className="display-ques-details">
              <div
                className="ques-body"
                dangerouslySetInnerHTML={{ __html: question.questionBody }}
              />
              <div className="ques-images">
                {question.questionImage &&
                  question.questionImage.map((slide, index) => {
                    return (
                      <React.Fragment key={index}>
                        <img
                          className="cursor"
                          src={slide.url}
                          onClick={() => {
                            setSlideNo(index);
                            setLightBox(true);
                          }}
                        />
                      </React.Fragment>
                    );
                  })}
              </div>

              <div className="display-tags-time">
                <p>{question.questionTags}</p>
                {/* <p>{question.answers.length} answers</p> */}
                <div>
                  <p>-{question.userPosted}</p>
                  <p className="display-time">
                    asked {moment(question.askedOn).fromNow()}
                  </p>

                  {(auth.userId === question.userId ||
                    auth.userId === "630f42be2f1ad3455ab123cc") && (
                    <div>
                      {" "}
                      <button
                        className="delete-btn"
                        onClick={() => setDeleteQues(true)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2rem"
                          height="2.1rem"
                          viewBox="0 0 20 21"
                          fill="none"
                        >
                          <path
                            d="M19 4.64042C15.67 4.337 12.32 4.1807 8.98 4.1807C7 4.1807 5.02 4.27264 3.04 4.45653L1 4.64042M6.5 3.71179L6.72 2.50734C6.88 1.63388 7 0.981079 8.69 0.981079H11.31C13 0.981079 13.13 1.67065 13.28 2.51653L13.5 3.71179M16.85 7.54582L16.2 16.8045C16.09 18.248 16 19.3697 13.21 19.3697H6.79C4 19.3697 3.91 18.248 3.8 16.8045L3.15 7.54582M8.33 14.3128H11.66M7.5 10.6351H12.5"
                            stroke="black"
                            stroke-opacity="0.5"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="answers-section">
              <div className="filter-flex">
                <span>{answers.length} answers</span>
                {answers.length > "1" && (
                  <Dropdown
                    selected={sort}
                    setSelected={setSort}
                    options={["latest", "oldest", "upvotes", "downvotes"]}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2rem"
                        height="1.2rem"
                        viewBox="0 0 20 12"
                        fill="none"
                      >
                        <path
                          d="M1 1H19M4 6H16M8 11H12"
                          stroke="black"
                          strokeOpacity="0.5"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    }
                  />
                )}
              </div>
              {answers.sort(sortMethods[sort].method).map((answer, index) => {
                return (
                  <Answers
                    answer={answer}
                    key={index}
                    question={question}
                    getAnswer={() => getAnswer()}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <button className="filled-btn ans-btn" onClick={() => setAnsBtn(true)}>
          Answer
        </button>
      </div>
    </React.Fragment>
  );
};

export default Questionsbar;
