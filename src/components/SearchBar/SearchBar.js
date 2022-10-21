import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = props.data.filter(
      (value) =>
        value.questionTitle.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.questionBody.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.questionTags.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.userPosted.toLowerCase().includes(searchWord.toLowerCase())
    );

    props.sendSearchedQues(newFilter);

    if (searchWord === "") {
      clearInput();
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    props.sendSearchedQues(props.data);
    setWordEntered("");
  };

  return (
    <div className="search tooltip">
      <span className="tooltiptext">
        Enter question title/description/user name/program
      </span>
      <div className="searchInputs">
        <input
          type="text"
          placeholder={props.placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />

        <div className="searchIcon">
          {filteredData.length === 0 && wordEntered === "" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2.3rem"
              height="2.2rem"
              viewBox="0 0 23 22"
              fill="none"
            >
              <path
                d="M21.5432 21L19.5432 19M11.0432 20C12.2908 20 13.5261 19.7543 14.6787 19.2769C15.8313 18.7994 16.8786 18.0997 17.7607 17.2175C18.6429 16.3354 19.3426 15.2881 19.8201 14.1355C20.2975 12.9829 20.5432 11.7476 20.5432 10.5C20.5432 9.25244 20.2975 8.0171 19.8201 6.86451C19.3426 5.71191 18.6429 4.66464 17.7607 3.78249C16.8786 2.90033 15.8313 2.20056 14.6787 1.72314C13.5261 1.24572 12.2908 1 11.0432 1C8.52366 1 6.10729 2.00089 4.3257 3.78249C2.5441 5.56408 1.54321 7.98044 1.54321 10.5C1.54321 13.0196 2.5441 15.4359 4.3257 17.2175C6.10729 18.9991 8.52366 20 11.0432 20V20Z"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              id="clearBtn"
              onClick={clearInput}
              xmlns="http://www.w3.org/2000/svg"
              width="2.4rem"
              height="2.4rem"
              viewBox="0 0 24 24"
              fill="#757575"
            >
              <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
            </svg>
          )}
        </div>
      </div>
      {/* {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a
                className="dataItem"
                href={value.link} target="_blank"
                key={key}
              >
                <p>{value.questionTitle} </p>
              </a>
            );
          })}
        </div>
      )} */}
    </div>
  );
}

export default SearchBar;
