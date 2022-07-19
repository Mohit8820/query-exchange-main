import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/icon.jpg";
import search from "../../assets/search-solid.svg";
import Avatar from "../Avatar/Avatar";
import "./Navbar.css";
import Button from "@mui/material/Button";

const Navbar = () => {
  var User = null;

  const navigate = useNavigate();

  const tologin = () => {
    navigate("/Auth", { state: false });
  };
  const tosignin = () => {
    navigate("/Auth", { state: true });
  };

  return (
    <nav>
      <div className="navbar">
        <Link to="/" className="nav-item nav-logo">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <Link to="/home" className="nav-item nav-btn">
          Questions
        </Link>
        <Link to="/contact" className="nav-item nav-btn">
          Contact
        </Link>
        <form>
          <input type="text" placeholder="Search..." />
          <img src={search} alt="search" width="18" className="search-icon" />
        </form>
        {User == null ? (
          <>
            <Button
              variant="text"
              onClick={() => {
                tologin();
              }}
            >
              Log in
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                tosignin();
              }}
            >
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Avatar
              backgroundColor="#009dff"
              px="10px"
              py="7px"
              borderRadius="50%"
              color="white"
            >
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                R
              </Link>
            </Avatar>
            <button className="nav-item nav-links">Log Out</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
