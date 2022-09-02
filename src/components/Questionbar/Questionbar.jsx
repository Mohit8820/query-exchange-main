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

const Questionsbar = (props) => {
  var question = props.question;
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [answers, setAnswers] = useState(question.answers);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getAnswer = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:4000/api/questions/${question.id}`
      );

      setAnswers(responseData.question.answers);
    } catch (err) {}
  };

  const [deleteQues, setDeleteQues] = useState(false);

  const deleteQuestion = async () => {
    setDeleteQues(false);
    try {
      await sendRequest(
        `http://localhost:4000/api/questions/${question.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/home");
    } catch (err) {}
  };
  const [answerInfo, setAnswerInfo] = useState({
    answer_id: "",
    answeredBy: "",
  });
  const [deleteAns, setDeleteAns] = useState(false);
  const [ansBtn, setAnsBtn] = useState(false);

  const deleteAnswer = async () => {
    setDeleteAns(false);
    try {
      await sendRequest(
        `http://localhost:4000/api/questions/delete?question_id=${question.id}&answer_id=${answerInfo.answer_id}&answeredBy=${answerInfo.answeredBy}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      getAnswer();
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <Modal
        onCancel={() => setDeleteQues(false)}
        show={deleteQues}
        header="delete request"
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
        onCancel={() => setDeleteAns(false)}
        show={deleteAns}
        header="delete request"
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

      <ErrorModal error={error} onClear={clearError} />

      <div className="question-bar">
        <div className="scrollable">
          <div className="display-ques">
            <div>
              <h3>{question.questionTitle}</h3>
              {(auth.userId === question.userId ||
                auth.userId === "630f42be2f1ad3455ab123cc") && (
                <button
                  className="delete-btn"
                  onClick={() => setDeleteQues(true)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m3-19h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z" />
                  </svg>
                </button>
              )}
            </div>
            <p className="ques-body">{question.questionBody}</p>
            <div className="display-tags-time">
              <div className="user-tags">
                <div className="display-tags">
                  <p>{question.questionTags}</p>
                </div>
              </div>
              <div className="user-tags">
                <div className="display-tags">
                  <p>{question.userPosted}</p>
                </div>
                <p className="display-time">
                  asked {moment(question.askedOn).fromNow()}
                </p>
              </div>
            </div>
          </div>

          <div className="answers">
            {isLoading && <LoadingSpinner asOverlay />}
            <h3>Answers</h3>
            <hr></hr>
            {answers
              .slice(0)
              .reverse()
              .map((answer, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="ans-item">
                      <div
                        dangerouslySetInnerHTML={{ __html: answer.answerBody }}
                      />
                      <div className="ans-flex">
                        <div className="display-tags">
                          <p>{answer.userAnswered}</p>
                        </div>
                        <p className="display-time">
                          answered {moment(answer.answeredOn).fromNow()}
                        </p>
                        {(auth.userId === answer.userId ||
                          auth.userId === question.userId ||
                          auth.userId === "630f42be2f1ad3455ab123cc") && (
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
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2zm-7-10.414l3.293-3.293 1.414 1.414-3.293 3.293 3.293 3.293-1.414 1.414-3.293-3.293-3.293 3.293-1.414-1.414 3.293-3.293-3.293-3.293 1.414-1.414 3.293 3.293zm10-8.586h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-8-3h-4v1h4v-1z" />{" "}
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                    <hr></hr>
                  </React.Fragment>
                );
              })}
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
