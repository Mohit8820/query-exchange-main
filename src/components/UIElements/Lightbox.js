import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { CSSTransition } from "react-transition-group";

import "./Lightbox.css";

const Lightbox = (props) => {
  const [slideNo, setSlideNo] = useState(props.slideNo);
  useEffect(() => {
    setSlideNo(props.slideNo);
  }, [props.slideNo]);

  const imgUrl = props.url;
  const titles = props.titles;

  return ReactDOM.createPortal(
    <React.Fragment>
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <div className="lightbox">
          <span className="close cursor" onClick={() => props.close()}>
            &times;
          </span>
          <div className="lightbox-content">
            <div className="mySlides">
              <div className="numbertext">
                {slideNo + 1} / {imgUrl.length}
              </div>
              <img src={imgUrl[slideNo]} />
            </div>

            <a
              className="prev"
              onClick={() => {
                if (slideNo === 0) {
                  setSlideNo(imgUrl.length - 1);
                } else setSlideNo(slideNo - 1);
              }}
            >
              &#10094;
            </a>
            <a
              className="next"
              onClick={() => {
                if (slideNo === imgUrl.length - 1) {
                  setSlideNo(0);
                } else setSlideNo(slideNo + 1);
              }}
            >
              &#10095;
            </a>

            <div className="caption-container">
              <p id="caption">{titles[slideNo]}</p>
            </div>

            <div className="demo-sec">
              {imgUrl.map((url, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="column">
                      <img
                        className={`demo cursor ${
                          slideNo === index ? "active" : ""
                        }`}
                        src={url}
                        style={{ width: "100%" }}
                        onClick={() => setSlideNo(index)}
                        alt="Nature and sunrise"
                      />
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </CSSTransition>
    </React.Fragment>,
    document.getElementById("lightbox-hook")
  );
};

export default Lightbox;
