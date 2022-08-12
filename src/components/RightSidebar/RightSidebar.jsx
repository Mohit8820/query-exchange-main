import React from "react";
import "./RightSidebar.css";
var rf = require("random-facts"); // Require the package

const RightSidebar = () => {
  const [fact, setfact] = React.useState(rf.randomFact());
  // console.log(rf.randomFact());
  return (
    <aside className="right-sidebar">
      <h2>Fact for you-</h2>
      <div className="fact">{fact}</div>
    </aside>
  );
};

export default RightSidebar;
