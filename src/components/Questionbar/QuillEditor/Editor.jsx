import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

import { useHttpClient } from "../../../hooks/http-hook";
import { AuthContext } from "../../../contexts/auth-context";
import ErrorModal from "../../UIElements/ErrorModal";
import LoadingSpinner from "../../UIElements/LoadingSpinner";

export const Editor = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [ans, setAns] = useState({
    //try to remove it and send asked on to backend
    answerBody: "",
    //     //     //   answeredOn: "jan 2",
    userId: auth.userId,
  });
  const [state, setState] = useState({ value: null });

  function handleChange(value) {
    setState({ value });

    setAns((prevAns) => {
      return {
        ...prevAns,
        answerBody: value,
      };
    });
  }

  /*const postAnswer = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ans),
  };*/

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:4000/api/questions/${props.qid}`,
        "PATCH",
        JSON.stringify(ans),
        { "Content-Type": "application/json" }
      );
      props.add();
    } catch (err) {}

    /* fetch(
      ,
      postAnswer
    )
      .then((response) => response.json())
      .then((text) => {
        console.log(text);
        props.add();
      })
      .catch((error) => console.error(error));*/

    setState({ value: null });
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
            value={state.value}
            onChange={handleChange}
            placeholder={"Write something awesome..."}
            modules={modules}
            formats={formats}
          />
        </div>
        <button type="submit" onClick={handleClick} className="addButton">
          Submit
        </button>
      </div>
    </React.Fragment>
  );
};

export default Editor;
