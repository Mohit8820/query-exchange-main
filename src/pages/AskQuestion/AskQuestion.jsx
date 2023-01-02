import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, {
  modules,
  formats,
} from "../../components/Questionbar/QuillEditor/EditorToolbar";
import "../../components/Questionbar/QuillEditor/styles.css";

import getNow from "../../assets/getNow";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../contexts/auth-context";
import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import "./AskQuestion.css";
import Dropdown from "../../components/Dropdown/Dropdown";

function AskQuestion(props) {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [ques, setques] = useState({
    upVotes: 0,
    downVotes: 0,
    noOfAnswers: 0,
    questionTitle: "",
    questionBody: "",
    questionTags: "",
    userPosted: "",
    //askedOn: getNow,
    userId: auth.userId,
    answer: [
      {
        answerBody: "",
        userAnswered: "",
        //     //     //   answeredOn: "jan 2",
        userId: "",
      },
    ],
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setques((prevQues) => {
      return {
        ...prevQues,
        [name]: value,
      };
    });
  }
  function handleTagChange(value) {
    setques((prevQues) => {
      return {
        ...prevQues,
        questionTags: value,
      };
    });
  }
  function handleChangeinBody(value) {
    setques((prevQues) => {
      return {
        ...prevQues,
        questionBody: value,
      };
    });
    console.log(ques);
  }

  const navigate = useNavigate();

  const submitQues = async (event) => {
    event.preventDefault();
    console.group(auth.userId);
    try {
      await sendRequest(
        process.env.REACT_APP_API_URL + "/questions/",
        "POST",
        JSON.stringify({
          questionTitle: ques.questionTitle,
          questionBody: ques.questionBody,
          questionTags: ques.questionTags,
          askedOn: getNow(),
          userId: auth.userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/home");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <h1 className="heading">Ask a Question</h1>
      <div className="ask-ques-container">
        <form onSubmit={submitQues}>
          <div className="ask-form-container">
            {isLoading && <LoadingSpinner asOverlay />}
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <input
                name="questionTitle"
                onChange={handleChange}
                value={ques.questionTitle}
                type="text"
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                required
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <div className="ques-body-editor">
                <EditorToolbar />
                <ReactQuill
                  theme="snow"
                  name="questionBody"
                  onChange={handleChangeinBody}
                  value={ques.questionBody}
                  placeholder="Include all the information someone would need to answer your
                question"
                  modules={modules}
                  formats={formats}
                  required={true}
                />
              </div>
              {/* <textarea
                name="questionBody"
                onChange={handleChange}
                value={ques.questionBody}
                cols="30"
                rows="7"
                required
              ></textarea> */}
            </label>

            <h4>Program</h4>
            <div className="program-dropdown">
              <Dropdown
                selected={ques.questionTags}
                setSelected={handleTagChange}
                options={[
                  "b.tech",
                  "m.tech",
                  "mca",
                  "bca",
                  "diploma",
                  "b.com",
                  "m.com",
                  "bba",
                ]}
                icon={""}
              />
            </div>
            {/* <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                name="questionTags"
                onChange={handleChange}
                value={ques.questionTags}
                placeholder="e.g. (xml typescript wordpress)"
              />
            </label> */}
            <button
              type="submit"
              className="filled-btn"
              disabled={
                ques.questionBody.replaceAll("<p><br></p>", "") === "" ||
                ques.questionTags === ""
                  ? true
                  : false
              }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default AskQuestion;
