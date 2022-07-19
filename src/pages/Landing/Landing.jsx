import { Link } from "react-router-dom";

function LandingPageButton() {
  return (
    <Link to="/home" className="nav-link">
      <button
        style={{
          fontSize: "2rem",
          backgroundColor: "#1976d2",
          textDecoration: "none",
          borderRadius: "0.5rem",
          padding: "1rem",
          border: "none",
          color: "whitesmoke",
          boxShadow: "0 10px 25px rgb(0 0 0 / 25%)",
        }}
      >
        Begin:)
      </button>
    </Link>
  );
}
function LandingFrameMessage() {
  const style = {
    margin: "auto",
    padding: "10% 35% 0% 15%",
    color: "Black",
  };
  return (
    <div style={style}>
      <div style={{ "font-size": "96px" }}>Hey!! Doubts?</div>

      <div style={{ "font-size": "36px" }}>
        Click on get started...ask your queries and your fellow mates and
        teachers will answer them.
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
  return (
    <div>
      <LandingFrameMessage />
    </div>
  );
}
function Landing() {
  return (
    <div>
      <LandingFrame />
    </div>
  );
}
export default Landing;
