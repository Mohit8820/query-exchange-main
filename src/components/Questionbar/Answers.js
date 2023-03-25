import React, { useState, useContext, useEffect } from "react";
import moment from "moment";

import { AuthContext } from "../../contexts/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import Modal from "../UIElements/Modal";
import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import Lightbox from "../UIElements/Lightbox";

import "./Questionbar.css";

const Answers = ({ answer, question, getAnswer }) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [answerInfo, setAnswerInfo] = useState({
    answer_id: "",
    answeredBy: "",
  });
  const [deleteAns, setDeleteAns] = useState(false);

  const deleteAnswer = async () => {
    setDeleteAns(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/questions/delete?question_id=${question.id}&answer_id=${answerInfo.answer_id}&answeredBy=${answerInfo.answeredBy}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      getAnswer();
    } catch (err) {}
  };

  const [upvote, setUpvote] = useState(answer.upvotes.length);
  const [downvote, setDownvote] = useState(answer.downvotes.length);
  const [upactive, setUpactive] = useState(
    answer.upvotes.includes(auth.userId)
  );
  const [downactive, setDownactive] = useState(
    answer.downvotes.includes(auth.userId)
  );

  useEffect(() => {
    setUpvote(answer.upvotes.length);
    setDownvote(answer.downvotes.length);
    setUpactive(answer.upvotes.includes(auth.userId));
    setDownactive(answer.downvotes.includes(auth.userId));
  }, [answer]);

  const ansVotePatch = async (method) => {
    try {
      const res = await sendRequest(
        `${process.env.REACT_APP_API_URL}/questions/${method}/${answer.id}`,
        "PATCH",
        JSON.stringify({
          userId: auth.userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      console.log(res);
      getAnswer();
    } catch (err) {}
  };

  function upvotef() {
    if (upactive) {
      ansVotePatch("undoUpvote");
      //setUpactive(false);
      //setUpvote(upvote - 1);
    } else {
      ansVotePatch("upvote");
      //setUpactive(true);
      //setUpvote(upvote + 1);
      if (downactive) {
        ansVotePatch("undoDownvote");
        //setDownactive(false);
        //setUpvote(upvote + 1);
        //setDownvote(downvote - 1);
      }
    }
    // getAnswer();
  }
  function downvotef() {
    if (downactive) {
      ansVotePatch("undoDownvote");
      //setDownactive(false);
      //setDownvote(downvote - 1);
    } else {
      ansVotePatch("downvote");
      //setDownactive(true);
      //setDownvote(downvote + 1);
      if (upactive) {
        ansVotePatch("undoUpvote");
        //setUpactive(false);
        // setDownvote(downvote + 1);
        //setUpvote(upvote - 1);
      }
    }
    // getAnswer();
  }

  var ansUrl = [];
  answer.answerImage.forEach((image) => ansUrl.push(image.url));

  const [slideNo, setSlideNo] = useState(0);
  const [lightBox, setLightBox] = useState(false);

  function closeLightbox() {
    setLightBox(false);
  }

  return (
    <React.Fragment>
      <Modal
        onCancel={() => setDeleteAns(false)}
        show={deleteAns}
        header="Delete Answer"
        footer={
          <div>
            <button onClick={() => setDeleteAns(false)} className="text-btn">
              Cancel
            </button>
            <button onClick={deleteAnswer} className="filled-btn">
              Okay
            </button>
          </div>
        }
      >
        Do you want to delete the answer
      </Modal>

      <Lightbox
        url={ansUrl}
        titles={answer.answerImageTitles}
        show={lightBox}
        slideNo={slideNo}
        close={closeLightbox}
      />

      <ErrorModal error={error} onClear={clearError} />

      <div className="ans-item-container">
        <div className="ans-item">
          <div className="ans-body">
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="vote-btns">
              <button onClick={upvotef} disabled={!auth.isLoggedIn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.7rem"
                  height="2.5rem"
                  viewBox="0 0 27 25"
                  fill="none"
                  className={`rotate ${upactive ? "vote-btn" : ""}`}
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
                <span> {upvote}</span>
              </button>
              <button onClick={downvotef} disabled={!auth.isLoggedIn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.7rem"
                  height="2.5rem"
                  viewBox="0 0 27 25"
                  fill="none"
                  className={` ${downactive ? "vote-btn" : ""}`}
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
                <span className="de-vote">{downvote}</span>
              </button>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: answer.answerBody,
              }}
            />
          </div>
          <div className="ques-images">
            {answer.answerImage &&
              answer.answerImage.map((slide, index) => {
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
            <div style={{ marginLeft: "auto" }}>
              <p>-{answer.userAnswered}</p>
              <p className="display-time">
                answered {moment(answer.answeredOn).fromNow()}
              </p>
              {(auth.userId === answer.userId ||
                auth.userId === question.userId ||
                auth.userId === `${process.env.REACT_APP_ADMIN_ID}`) && (
                <button
                  className="delete-btn"
                  onClick={() => {
                    setAnswerInfo({
                      answer_id: answer.id,
                      answeredBy: answer.userId,
                    });
                    setDeleteAns(true);
                  }}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Answers;
