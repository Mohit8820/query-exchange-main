import React, { useState, useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import SearchBar from "../SearchBar/SearchBar";

import "./HomeMainbar.css";
import QuestionList from "./QuestionList";

const HomeMainbar = (props) => {
  const [searchedQues, setSearchedQues] = useState(props.questions);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("latest");

  const getSearchedQues = (ques) => {
    setSearchedQues(ques);
  };

  useEffect(() => {
    setSearchedQues(props.questions);
  }, [props.questions]);

  const sortMethods = {
    // none: { method: (a, b) => null },

    latest: { method: (a, b) => new Date(b.askedOn) - new Date(a.askedOn) },
    oldest: { method: (a, b) => new Date(a.askedOn) - new Date(b.askedOn) },

    upvotes: {
      method: (a, b) => (a.likes.length > b.likes.length ? -1 : 1),
    },
    downvotes: {
      method: (a, b) => (a.dislikes.length > b.dislikes.length ? -1 : 1),
    },
    unanswered: {
      method: (a, b) => (a.answersLength > b.answersLength ? 1 : -1),
    },
  };

  return (
    <React.Fragment>
      {/* {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : ( */}
      <h1 className="heading">Questions</h1>
      <div className="filter-flex">
        <SearchBar
          placeholder="Enter question title/description/user name/program..."
          data={props.questions}
          sendSearchedQues={getSearchedQues}
        />
        <div className="sort-n-filter">
          <Dropdown
            selected={sort}
            setSelected={setSort}
            options={["latest", "oldest", "upvotes", "downvotes", "unanswered"]}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="1.2rem"
                viewBox="0 0 20 12"
                fill="none"
              >
                <path
                  d="M1 1H19M4 6H16M8 11H12"
                  stroke="black"
                  strokeOpacity="0.5"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            }
          />
          <Dropdown
            selected={filter}
            setSelected={setFilter}
            options={[
              "all",
              "b.tech",
              "m.tech",
              "mca",
              "bca",
              "diploma",
              "b.com",
              "m.com",
              "bba",
            ]}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.4rem"
                height="2.4rem"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M14.32 19.07C14.32 19.68 13.92 20.48 13.41 20.79L12 21.7C10.69 22.51 8.87 21.6 8.87 19.98V14.63C8.87 13.92 8.47 13.01 8.06 12.51L4.22 8.46999C3.71 7.95999 3.31 7.05999 3.31 6.44999V4.12999C3.31 2.91999 4.22 2.00999 5.33 2.00999H18.67C19.78 2.00999 20.69 2.91999 20.69 4.02999V6.24999C20.69 7.05999 20.18 8.06999 19.68 8.56999"
                  stroke="black"
                  strokeOpacity="0.5"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.87 17.12L18.87 16.12M16.07 16.52C16.9187 16.52 17.7326 16.1829 18.3327 15.5827C18.9329 14.9826 19.27 14.1687 19.27 13.32C19.27 12.4713 18.9329 11.6574 18.3327 11.0573C17.7326 10.4571 16.9187 10.12 16.07 10.12C15.2213 10.12 14.4074 10.4571 13.8073 11.0573C13.2071 11.6574 12.87 12.4713 12.87 13.32C12.87 14.1687 13.2071 14.9826 13.8073 15.5827C14.4074 16.1829 15.2213 16.52 16.07 16.52Z"
                  stroke="black"
                  stroke-opacity="0.5"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
          />
        </div>
      </div>
      {/* )} */}

      <div className="shadow-below">
        <>
          {searchedQues.length === 0 ? (
            <h1>No Questions Found</h1>
          ) : (
            <>
              <QuestionList
                questionsList={searchedQues.sort(sortMethods[sort].method)}
                filterval={filter}
                sortVal={sort}
              />
            </>
          )}
        </>
      </div>
    </React.Fragment>
  );
};

export default HomeMainbar;
