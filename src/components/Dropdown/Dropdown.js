import React, { useState } from "react";
import "./Dropdown.css";

function Dropdown({ selected, setSelected, options, icon }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
        <div className="type">{icon}</div>
        <p>{selected}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.2rem"
          height="1.2rem"
          viewBox="0 0 23 14"
          fill="none"
          className={`down ${isActive ? "down-active" : ""}`}
        >
          <path
            d="M20.7622 2.35168L12.8805 11.1467C11.9497 12.1854 10.4265 12.1854 9.4957 11.1467L1.61401 2.35168"
            stroke="black"
            strokeOpacity="0.5"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {/* {isActive && ( */}
      <div className={`dropdown-content ${isActive ? "dropped" : ""}`}>
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <div
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
              className={`dropdown-item ${
                option === selected ? "dropdown-item-active" : ""
              }`}
            >
              {option}
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* )} */}
    </div>
  );
}

export default Dropdown;
