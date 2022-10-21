import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import { AuthContext } from "../../contexts/auth-context";
// import { useHttpClient } from "../../hooks/http-hook";
// import ErrorModal from "../../components/UIElements/ErrorModal";
// import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import Avatar from "avataaars";
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
  //       `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}`
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

  const [userDetail, setDetail] = useState({
    name: "",
    avatar: {},
  });

  useEffect(() => {
    if (auth.uavatar !== null)
      setDetail((prev) => {
        return { ...prev, avatar: { ...auth.uavatar } };
      });
    if (auth.uname !== null)
      setDetail((prev) => {
        return { ...prev, name: auth.uname };
      });
  }, [auth.uavatar, auth.uname]);

  return (
    // <React.Fragment>
    //   <ErrorModal error={error} onClear={clearError} />

    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <LeftSidebar />
      </SideDrawer>
      <nav>
        <div className="navbar">
          <button
            className="main-navigation__menu-btn mobile-view"
            onClick={openDrawerHandler}
          >
            <svg
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#5d81cb"
            >
              <path
                d="m13 16.745c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm9-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm-4-5c0-.414-.336-.75-.75-.75h-14.5c-.414 0-.75.336-.75.75s.336.75.75.75h14.5c.414 0 .75-.336.75-.75z"
                fillRule="nonzero"
              />
            </svg>
          </button>
          <Link to="/" className="nav-item nav-logo pc-view ">
            {/* <img src={logo} alt="logo" className="logo" />
             */}
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
              <button className="user-logout filled-btn">
                {/* {isLoading && <LoadingSpinner asOverlay />} */}
                <Avatar
                  className="avatar-small"
                  avatarStyle="Circle"
                  {...userDetail.avatar}
                />

                {userDetail.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1rem"
                  height="12"
                  viewBox="0 0 23 14"
                  fill="none"
                >
                  <path
                    d="M20.7622 2.35168L12.8805 11.1467C11.9497 12.1854 10.4265 12.1854 9.4957 11.1467L1.61401 2.35168"
                    stroke="white"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="dropdown-user">
                  <div
                    onClick={() => {
                      navigate("/home", { state: auth.userId });
                    }}
                  >
                    My questions
                  </div>
                  <div
                    onClick={() => {
                      navigate("/home");
                      auth.logout();
                    }}
                  >
                    logout
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
