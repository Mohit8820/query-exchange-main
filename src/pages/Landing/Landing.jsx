import { Link } from "react-router-dom";
import ask from "../../assets/ask.webp";
import doubts from "../../assets/doubts.webp";
import resolved from "../../assets/resolved.webp";

function LandingPageButton() {
  return (
    <Link to="/home" className="nav-link">
      <button
        style={{
          fontSize: "2rem",
        }}
        className="filled-btn"
      >
        Begin:)
      </button>
    </Link>
  );
}
function LandingFrameMessage() {
  const style = {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "100%",
    width: "100%",
    textAlign: "center",
  };

  return (
    <div style={style}>
      <div style={{ fontSize: "7rem", lineHeight: "8rem" }}>
        Hi!! <br />
      </div>

      <div style={{ fontSize: "1.7rem" }} className="working">
        <div>
          <img src={doubts} alt="doubts" />
          <p>Doubts?</p>
        </div>
        <span className="direction">{">"}</span>
        <div>
          <img src={ask} alt="ask" />
          <p>Ask here</p>
        </div>
        <span className="direction">{">"}</span>
        <div>
          <img src={resolved} alt="resolved" />
          <p>Get answered</p>
        </div>
      </div>
      <LandingPageButton />
    </div>
  );
}
function LandingFrame() {
  // const style = {
  //   "background-image": `url("images/—Pngtree—watercolor blue mint gradient_1295311.jpg")`,
  //   "background-repeat": "no-repeat",
  //   backgroundSize: "cover",
  //   position: "absolute",
  //   height: "100%",
  //   width: "100%",
  // };
  return <LandingFrameMessage />;
}
function Landing() {
  return <LandingFrame />;
}
export default Landing;
