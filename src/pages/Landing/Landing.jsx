import { Link } from "react-router-dom";
import doubts from "../../assets/doubts.png";

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
    justifyContent: "center",
    height: "100%",
    marginBottom: "15rem",
  };

  const imstyle = {
    position: "absolute",
    zIndex: -1,
    width: "35rem",
    right: "2rem",
    bottom: "0",
  };
  return (
    <div style={style}>
      <img style={imstyle} src={doubts} alt="doubtimg" />
      <div style={{ fontSize: "7rem" }}>Hey!! Doubts?</div>

      <div style={{ fontSize: "2rem" }}>
        Click on begin...ask your queries and your friends and teachers will
        answer them.
      </div>
      <br />
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
