import React, { useState, useContext } from "react";
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

  const handleClick = async (event) => {
    event.preventDefault();
    if (auth.isLoggedIn) {
      try {
        await sendRequest(
          `http://localhost:4000/api/questions/${props.qid}`,
          "PATCH",
          JSON.stringify({
            answerBody: ans,
            answeredOn: getNow(),
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
        <h3>Your Answer</h3>

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
        <button
          type="submit"
          onClick={handleClick}
          className="filled-btn addButton"
          disabled={ans === "" || ans === "<p><br></p>" ? true : false}
        >
          Submit
        </button>
      </div>
    </React.Fragment>
  );
};

export default Editor;
