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
  const [titles, setTitles] = useState([]);

  //handle and convert IMG in base 64
  const handleImage = (e) => {
    var i = 0;
    console.log(e.target.files);
    var capacity = 5 - images.length;
    capacity = Math.min(capacity, e.target.files.length);
    while (i < capacity) {
      const file = e.target.files[i];
      setFileToBase(file);
      const name = e.target.files[i].name;
      setTitles((prev) => {
        return [...prev, name];
      });
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
    try {
      await sendRequest(
        process.env.REACT_APP_API_URL + "/questions/",
        "POST",
        JSON.stringify({
          questionTitle: ques.questionTitle,
          questionBody: ques.questionBody,
          questionTags: ques.questionTags,
          questionImage: [...images],
          questionImageTitles: [...titles],
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
              {images.length > 0 ? "Add more" : "Add image"}
            </button>
          </div>
        }
      >
        <p className="note">Maximum 5 images allowed</p>
        {images.length === 0 && <p>No image</p>}
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
            <div className="selected-image">
              <img alt="img" src={image} />
              <input
                type="text"
                placeholder="no title"
                className="title-input"
                value={titles[index]}
                onChange={(e) => {
                  var newTitles = [...titles];
                  newTitles[index] = e.target.value;
                  setTitles(newTitles);
                }}
              />
              <button
                onClick={() => {
                  images.splice(index, 1);
                  setImages([...images]);
                  titles.splice(index, 1);
                  setTitles([...titles]);
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
                Title
                {/* <span>(required)</span> */}
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
                Body
                {/* <span>(required)</span> */}
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

            <div className="selector-flex">
              <div>
                <h4>
                  Program
                  {/* <span>(required)</span> */}
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
              </div>
              <div className="img-selector">
                <h4>
                  Images <span>(optional)</span>
                </h4>
                <div>
                  <button
                    className="filled-btn add-img-btn"
                    onClick={() => setImgModal(true)}
                    type="button"
                  >
                    +
                  </button>
                  <span className="">{images.length} selected</span>
                </div>
              </div>
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
              className="filled-btn submit-btn"
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
