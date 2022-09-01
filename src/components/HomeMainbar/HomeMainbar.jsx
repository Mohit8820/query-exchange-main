import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";

import "./HomeMainbar.css";
import QuestionList from "./QuestionList";

const HomeMainbar = (props) => {
  const [searchedQues, setSearchedQues] = useState(props.questions);

  const getSearchedQues = (ques) => {
    setSearchedQues(ques);
  };

  useEffect(() => {
    setSearchedQues(props.questions);
  }, [props.questions]);

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {/* {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : ( */}
        <h1 className="heading">{props.filter} questions</h1>
        <SearchBar
          placeholder="Enter question title/description/user name/program..."
          data={props.questions}
          sendSearchedQues={getSearchedQues}
        />
        {/* )} */}
      </div>
      <div className="shadow-below">
        <>
          {searchedQues.length === 0 ? (
            <h1>No Questions Found</h1>
          ) : (
            <>
              <QuestionList
                questionsList={searchedQues}
                filterval={props.filter}
              />
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default HomeMainbar;
