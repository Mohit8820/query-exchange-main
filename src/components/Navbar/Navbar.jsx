import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import { AuthContext } from "../../contexts/auth-context";
// import { useHttpClient } from "../../hooks/http-hook";
// import ErrorModal from "../../components/UIElements/ErrorModal";
// import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import logo from "../../assets/icon.jpg";
// import Avatar from "../Avatar/Avatar";
import "./Navbar.css";

const Navbar = () => {
  const auth = useContext(AuthContext);
  // const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const tologin = () => {
    navigate("/Auth", { state: "false" });
  };
  const tosignin = () => {
    navigate("/Auth", { state: "true" });
  };

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  // const [uname, setUname] = useState("");
  // const getUser = useCallback(async () => {
  //   try {
  //     const responseData = await sendRequest(
  //       `http://localhost:4000/api/users/${auth.userId}`
  //     );

  //     setUname(responseData.user.name);
  //   } catch (err) {}
  // }, []);

  // useEffect(() => {
  //   if (auth.isLoggedIn) {
  //     getUser();
  //   }
  //   return;
  // }, [auth.isLoggedIn]);

  // console.log(uname);

  return (
    // <React.Fragment>
    //   <ErrorModal error={error} onClear={clearError} />

    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav>
          <div className="navbar">
            <button
              className="main-navigation__menu-btn"
              onClick={openDrawerHandler}
            >
              <svg
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="#1976d2"
              >
                <path
                  d="m13 16.745c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm9-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm-4-5c0-.414-.336-.75-.75-.75h-14.5c-.414 0-.75.336-.75.75s.336.75.75.75h14.5c.414 0 .75-.336.75-.75z"
                  fillRule="nonzero"
                />
              </svg>
            </button>
            <Link to="/" className="nav-item nav-logo">
              <img src={logo} alt="logo" className="logo" />
            </Link>
            {/* <form>
          <input type="text" placeholder="Search..." />
          <img src={search} alt="search" width="18" className="search-icon" />
        </form> */}
            <div className="auth-buttons">
              {!auth.isLoggedIn ? (
                <>
                  <button
                    className="text-btn"
                    variant="text"
                    onClick={() => {
                      tologin();
                    }}
                  >
                    Log in
                  </button>
                  <button
                    className="filled-btn"
                    variant="contained"
                    onClick={() => {
                      tosignin();
                    }}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <div className="user-logout">
                  {/* {isLoading && <LoadingSpinner asOverlay />} */}
                  {/* <Avatar
                  backgroundColor="#1976d2"
                  px="0.8rem"
                  py="0.1rem"
                  borderRadius="50%"
                  color="#fff"
                  fontSize="1.8rem"
                >
                  {uname.slice(0, 1)}
                </Avatar> */}
                  <button
                    className="filled-btn"
                    onClick={() => {
                      navigate("/home");
                      auth.logout();
                    }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
        <LeftSidebar />
      </SideDrawer>
      <nav>
        <div className="navbar">
          <button
            className="main-navigation__menu-btn"
            onClick={openDrawerHandler}
          >
            <svg
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#1976d2"
            >
              <path
                d="m13 16.745c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm9-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm-4-5c0-.414-.336-.75-.75-.75h-14.5c-.414 0-.75.336-.75.75s.336.75.75.75h14.5c.414 0 .75-.336.75-.75z"
                fillRule="nonzero"
              />
            </svg>
          </button>
          <Link to="/" className="nav-item nav-logo">
            <img src={logo} alt="logo" className="logo" />
          </Link>
          {/* <form>
          <input type="text" placeholder="Search..." />
          <img src={search} alt="search" width="18" className="search-icon" />
        </form> */}
          <div className="auth-buttons">
            {!auth.isLoggedIn ? (
              <>
                <button
                  className="text-btn"
                  variant="text"
                  onClick={() => {
                    tologin();
                  }}
                >
                  Log in
                </button>
                <button
                  className="filled-btn"
                  variant="contained"
                  onClick={() => {
                    tosignin();
                  }}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="user-logout">
                {/* {isLoading && <LoadingSpinner asOverlay />} */}
                {/* <Avatar
                  backgroundColor="#1976d2"
                  px="0.8rem"
                  py="0.1rem"
                  borderRadius="50%"
                  color="#fff"
                  fontSize="1.8rem"
                >
                  {uname.slice(0, 1)}
                </Avatar> */}
                <button
                  className="filled-btn"
                  onClick={() => {
                    navigate("/home");
                    auth.logout();
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
