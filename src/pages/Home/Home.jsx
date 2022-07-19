import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../App.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";

const Home = (props) => {
  const location = useLocation();
  const [filter, setFilter] = useState("all");
  function getFilter(fil) {
    setFilter(fil);
  }
  return (
    <div className="home-container-1">
      <LeftSidebar onGet={getFilter} />
      <div className="home-container-2">
        <HomeMainbar questions={props.questions} filter={filter} />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
