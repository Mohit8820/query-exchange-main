import React, { useState, useContext, useRef } from "react";
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
import Modal from "../../components/UIElements/Modal";
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
  }

  const [imgModal, setImgModal] = useState(false);
  const inputRef = useRef(null);

  const [images, setImages] = useState([]);

  //handle and convert IMG in base 64
  const handleImage = (e) => {
    var i = 0;
    while (i < e.target.files.length) {
      const file = e.target.files[i];
      setFileToBase(file);
      console.log(i);
      i++;
    }
  };
  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImages((prev) => {
        return [...prev, reader.result];
      });
    };
  };

  const navigate = useNavigate();

  const submitQues = async (event) => {
    event.preventDefault();
    console.log(images);
    try {
      await sendRequest(
        process.env.REACT_APP_API_URL + "/questions/",
        "POST",
        JSON.stringify({
          questionTitle: ques.questionTitle,
          questionBody: ques.questionBody,
          questionTags: ques.questionTags,
          questionImage: [...images],
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
      <Modal
        onCancel={() => setImgModal(false)}
        show={imgModal}
        header="Add Image"
        footer={
          <div>
            <button onClick={() => setImgModal(false)} className="text-btn">
              Done
            </button>
            <button
              onClick={() => inputRef.current.click()}
              className="filled-btn"
              disabled={images.length === 5 ? true : false}
            >
              Add more
            </button>
          </div>
        }
      >
        {images.length === 0 && <h4>No image</h4>}
        <div className="img">
          <input
            type="file"
            name="myImage"
            onChange={handleImage}
            accept="image/*"
            ref={inputRef}
            multiple
            style={{ display: "none" }}
          />
        </div>
        {images.map((image, index) => {
          return (
            <div>
              <img alt="no IMG" width={"15rem"} src={image} />
              <button
                onClick={() => {
                  images.splice(index, 1);
                  setImages([...images]);
                }}
              >
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#434343"
                >
                  <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m3-19h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z" />
                </svg>
              </button>
              <br />
              {/* <button onClick={() => setSelectedImage(null)}>Remove</button> */}
            </div>
          );
        })}
      </Modal>
      <h1 className="heading">Ask a Question</h1>
      <div className="ask-ques-container">
        <form onSubmit={submitQues}>
          <div className="ask-form-container">
            {isLoading && <LoadingSpinner asOverlay />}
            <label htmlFor="ask-ques-title">
              <h4>
                Title <span>(required)</span>
              </h4>
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
              <h4>
                Body <span>(required)</span>
              </h4>
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

            <h4>
              Program <span>(required)</span>
            </h4>
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

            <h4>
              Images <span>(optional)</span>
            </h4>
            <div>
              <span>{images.length}</span>
              <button
                className="text-btn"
                onClick={() => setImgModal(true)}
                type="button"
              >
                add
              </button>
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
