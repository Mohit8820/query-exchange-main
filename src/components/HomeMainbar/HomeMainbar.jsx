import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";

import "./HomeMainbar.css";
import QuestionList from "./QuestionList";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const HomeMainbar = (props) => {
  const [searchedQues, setSearchedQues] = useState(props.questions);
  const [filter, setFilter] = useState(props.filter);

  const getSearchedQues = (ques) => {
    setSearchedQues(ques);
  };

  useEffect(() => {
    setSearchedQues(props.questions);
  }, [props.questions]);
  useEffect(() => {
    setFilter(props.filter);
  }, [props.filter]);

  function handleChange(event) {
    setFilter(event.target.value);
  }

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {/* {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : ( */}
        <h1 className="heading">{filter} questions</h1>
        <div className="filter-flex">
          <SearchBar
            placeholder="Enter question title/description/user name/program..."
            data={props.questions}
            sendSearchedQues={getSearchedQues}
          />
          <div className="mobile-view" style={{ alignSelf: "flex-end" }}>
            <Box>
              <FormControl
                sx={{
                  width: "7rem",
                  height: "3.1rem",
                  backgroundColor: "white",
                }}
              >
                <InputLabel id="demo-simple-select-label">Program</InputLabel>
                <Select
                  name="questionTags"
                  labelId="questionTags-label"
                  id="questionTags"
                  label="program"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="all">All</MenuItem>
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
          </div>
        </div>
        {/* )} */}
      </div>
      <div className="shadow-below">
        <>
          {searchedQues.length === 0 ? (
            <h1>No Questions Found</h1>
          ) : (
            <>
              <QuestionList questionsList={searchedQues} filterval={filter} />
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default HomeMainbar;
