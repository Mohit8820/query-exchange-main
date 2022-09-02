import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import getNow from "../../assets/getNow";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../contexts/auth-context";
import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import "./AskQuestion.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function AskQuestion(props) {
  /*const location = useLocation();
  const user = location.state;
  console.log(user);*/

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

  const navigate = useNavigate();

  /* const postRequest = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      questionTitle: ques.questionTitle,
      questionBody: ques.questionBody,
      questionTags: ques.questionTags,
      askedOn: ques.askedOn,
      userId: ques.userId,
      userPosted: "manu",
    }),
  };
*/
  const submitQues = async (event) => {
    event.preventDefault();
    console.group(auth.userId);
    try {
      await sendRequest(
        "http://localhost:4000/api/questions/",
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
      navigate("/home" /*, { state: { flag: 1, name: user } }*/); //add error handler
    } catch (err) {
      //redirect to diff page
    }

    /*fetch("http://localhost:4000/api/questions/", postRequest)
      .then((response) => response.json())
      .then((text) => {
        console.log(text);
      })
      .catch((error) => console.error(error));
    console.log("a");*/
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={submitQues}>
          <div className="ask-form-container">
            {isLoading && <LoadingSpinner asOverlay />}
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you’re asking a question to another
                person
              </p>
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
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                name="questionBody"
                onChange={handleChange}
                value={ques.questionBody}
                cols="30"
                rows="7"
                required
              ></textarea>
            </label>

            <h4>Program</h4>
            <Box sx={{ minWidth: 200 }}>
              <FormControl sx={{ minWidth: 200, backgroundColor: "white" }}>
                <InputLabel id="demo-simple-select-label">Program</InputLabel>
                <Select
                  name="questionTags"
                  labelId="questionTags-label"
                  id="questionTags"
                  value={ques.questionTags}
                  label="program"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="b.tech">B.Tech</MenuItem>
                  <MenuItem value="m.tech">M.Tech</MenuItem>
                  <MenuItem value="mca">MCA</MenuItem>
                  <MenuItem value="bca">BCA</MenuItem>
                  <MenuItem value="diploma">Diploma</MenuItem>
                  <MenuItem value="b.com">B.Com</MenuItem>
                  <MenuItem value="m.com">M.Com</MenuItem>
                  <MenuItem value="bba">BBA</MenuItem>
                </Select>
              </FormControl>
            </Box>
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
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default AskQuestion;
