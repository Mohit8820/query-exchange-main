import React, { useState, useContext, useRef } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

import getNow from "../../../assets/getNow";
import { useHttpClient } from "../../../hooks/http-hook";
import { AuthContext } from "../../../contexts/auth-context";
import ErrorModal from "../../UIElements/ErrorModal";
import LoadingSpinner from "../../UIElements/LoadingSpinner";
import { useNavigate } from "react-router-dom";

export const Editor = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [ans, setAns] = useState("");

  function handleChange(value) {
    setAns(value);
  }

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

  const handleClick = async (event) => {
    event.preventDefault();
    if (auth.isLoggedIn) {
      try {
        await sendRequest(
          `${process.env.REACT_APP_API_URL}/questions/${props.qid}`,
          "PATCH",
          JSON.stringify({
            answerBody: ans,
            answeredOn: getNow(),
            answerImage: [...images],
            answerImageTitles: [...titles],
            userId: auth.userId,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        props.add();
        props.gotAnswer();
      } catch (err) {}

      setAns("");
    } else navigate("/Auth");
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div>
        <div className="text-editor">
          {isLoading && <LoadingSpinner asOverlay />}
          <EditorToolbar />
          <ReactQuill
            theme="snow"
            value={ans}
            onChange={handleChange}
            placeholder={"Write something awesome..."}
            modules={modules}
            formats={formats}
          />
        </div>
        <div>
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
          <button
            onClick={() => inputRef.current.click()}
            className="filled-btn"
            disabled={images.length === 5 ? true : false}
          >
            {images.length > 0 ? "Add more" : "Add image"}
          </button>
        </div>
        <button
          type="submit"
          onClick={handleClick}
          className="filled-btn addButton"
          disabled={ans.replaceAll("<p><br></p>", "") === "" ? true : false}
        >
          Submit
        </button>
      </div>
    </React.Fragment>
  );
};

export default Editor;
