import React, { useState, useEffect } from "react";

import "../../App.css";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";

const Home = (props) => {
  const [questionsList, setQuestionList] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/api/questions/"
        );

        setQuestionList(responseData.questions);
      } catch (err) {}
    };
    getQuestions();

    /* .then((response) => response.json())
      .then((data) => setQuestionList(data.questions));
    console.log(questionsList);*/
  }, [sendRequest]);

  const [filter, setFilter] = useState("all");

  /* const user = props.user;*/
  function getFilter(fil) {
    setFilter(fil);
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="home-container-1">
        <LeftSidebar onGet={getFilter} />
        <div className="home-container-2">
          {!isLoading && questionsList.length !== 0 && (
            <HomeMainbar
              questions={questionsList}
              filter={filter} /*user={user}*/
            />
          )}
          <RightSidebar />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
