import React from "react";
import bluepart from "../../assets/bluepart.jpg";
import greenpart from "../../assets/greenpart.jpg";
import quesDrop from "../../assets/quesDrop.jpg";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
      {/* <div className="lds-dual-ring"></div> */}
      <div className="loader">
        <img src={greenpart} alt="greenpart" className="greenpart" />
        <img src={bluepart} alt="bluepart" className="bluepart" />
        <img src={quesDrop} alt="quesDrop" className="quesDrop" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
