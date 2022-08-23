import React, { useState, useEffect } from "react";

import "../../App.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";

const Home = (props) => {
  const [questionsList, setQuestionList] = useState([]);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("http://localhost:4000/api/questions/")
      .then((response) => response.json())
      .then((data) => setQuestionList(data.questions));
    console.log(questionsList);
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  const [filter, setFilter] = useState("all");

  const user = props.user;
  function getFilter(fil) {
    setFilter(fil);
  }
  return (
    <div className="home-container-1">
      <LeftSidebar onGet={getFilter} />
      <div className="home-container-2">
        <HomeMainbar questions={questionsList} filter={filter} user={user} />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
