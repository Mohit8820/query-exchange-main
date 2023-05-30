import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "../../App.css";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";

const Home = () => {
  const [questionsList, setQuestionList] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const location = useLocation();
  useEffect(() => {
    let url;
    if (location.state) {
      url = `${process.env.REACT_APP_API_URL}/questions/user/${location.state}`;
    } else {
      url = process.env.REACT_APP_API_URL + "/questions/";
    }

    const getQuestions = async () => {
      try {
        const responseData = await sendRequest(url);

        setQuestionList(responseData.questions);
      } catch (err) {}
    };
    getQuestions();
  }, [sendRequest, location.state]);

  // const [filter, setFilter] = useState("all");

  // /* const user = props.user;*/
  // function getFilter(fil) {
  //   setFilter(fil);
  // }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}

      <HomeMainbar
        questions={questionsList}
        /* filter={filter} */
      />
    </React.Fragment>
  );
};

export default Home;
