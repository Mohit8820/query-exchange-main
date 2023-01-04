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
          <button
            className="close cursor delete-btn"
            onClick={() => props.close()}
          >
            &times;
          </button>
          <div className="lightbox-content">
            <div className="lightbox-head">
              <div className="numbertext">
                {slideNo + 1} of {imgUrl.length}
              </div>
              <div className="caption-container">
                <p id="caption">{titles[slideNo]}</p>
              </div>
            </div>
            <div className="mySlides">
              <img src={imgUrl[slideNo]} />
            </div>

            <div className="demo-sec">
              <button
                className="prev"
                onClick={() => {
                  if (slideNo === 0) {
                    setSlideNo(imgUrl.length - 1);
                  } else setSlideNo(slideNo - 1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.8rem"
                  height="2.6rem"
                  viewBox="0 0 28 26"
                  fill="none"
                >
                  <path
                    d="M14.0001 25H8.66009C2.04009 25 -0.679909 20.3 2.64009 14.56L5.32009 9.94002L8.00009 5.32001C11.3201 -0.419985 16.7401 -0.419985 20.0601 5.32001L22.7401 9.94002L25.4201 14.56C28.7401 20.3 26.0201 25 19.4001 25H14.0001Z"
                    fill="white"
                    stroke="url(#paint0_linear_443_408)"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_443_408"
                      x1="26.8368"
                      y1="25"
                      x2="-2.5145"
                      y2="18.8477"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#5D81CB" />
                      <stop
                        offset="1"
                        stop-color="#5D81CB"
                        stop-opacity="0.6"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </button>
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

              <button
                className="next"
                onClick={() => {
                  if (slideNo === imgUrl.length - 1) {
                    setSlideNo(0);
                  } else setSlideNo(slideNo + 1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.8rem"
                  height="2.6rem"
                  viewBox="0 0 28 26"
                  fill="none"
                >
                  <path
                    d="M14.0001 25H8.66009C2.04009 25 -0.679909 20.3 2.64009 14.56L5.32009 9.94002L8.00009 5.32001C11.3201 -0.419985 16.7401 -0.419985 20.0601 5.32001L22.7401 9.94002L25.4201 14.56C28.7401 20.3 26.0201 25 19.4001 25H14.0001Z"
                    fill="white"
                    stroke="url(#paint0_linear_443_408)"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_443_408"
                      x1="26.8368"
                      y1="25"
                      x2="-2.5145"
                      y2="18.8477"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#5D81CB" />
                      <stop
                        offset="1"
                        stop-color="#5D81CB"
                        stop-opacity="0.6"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>
    </React.Fragment>,
    document.getElementById("lightbox-hook")
  );
};

export default Lightbox;
