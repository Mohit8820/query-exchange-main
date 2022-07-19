import React from "react";
import "./LeftSidebar.css";
import { NavLink } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const LeftSidebar = (props) => {
  const [view, setView] = React.useState("all");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  function eventHandler(event) {
    console.log(event.target.value);
    var val = event.target.value;
    props.onGet(val);
  }
  return (
    <div className="left-side">
      <h2>Select program</h2>

      <ToggleButtonGroup
        color="primary"
        orientation="vertical"
        value={view}
        exclusive
        onChange={handleChange}
        className="toggle-buttons"
      >
        <ToggleButton value="all" onClick={eventHandler}>
          All
        </ToggleButton>
        <ToggleButton value="b.tech" onClick={eventHandler}>
          B.Tech
        </ToggleButton>
        <ToggleButton value="m.tech" onClick={eventHandler}>
          M.Tech
        </ToggleButton>
        <ToggleButton value="mca" onClick={eventHandler}>
          MCA
        </ToggleButton>
        <ToggleButton value="bca" onClick={eventHandler}>
          BCA
        </ToggleButton>
        <ToggleButton value="diploma" onClick={eventHandler}>
          Diploma
        </ToggleButton>
        <ToggleButton value="b.com" onClick={eventHandler}>
          B.Com
        </ToggleButton>
        <ToggleButton value="m.com" onClick={eventHandler}>
          M.Com
        </ToggleButton>
        <ToggleButton value="bba" onClick={eventHandler}>
          BBA
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default LeftSidebar;
