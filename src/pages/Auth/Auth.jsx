import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../../contexts/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import "./Auth.css";
import icon from "../../assets/icon.jpg";

const Auth = (props) => {
  const auth = useContext(AuthContext);

  const location = useLocation();

  const [isSignup, setIsSignup] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    var { name, value } = event.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };
  const navigate = useNavigate();

  /* const addUserRequest = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password,
    }),
  };
  const logUserRequest = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  };*/

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(isSignup);
    var method = isSignup ? "signup" : "login";
    var body = isSignup
      ? {
          name: user.name,
          email: user.email,
          password: user.password,
        }
      : {
          email: user.email,
          password: user.password,
        };
    //var request = isSignup ? addUserRequest : logUserRequest;
    //console.log(method + request);

    try {
      const responseData = await sendRequest(
        "http://localhost:4000/api/users/" + method,
        "POST",
        JSON.stringify(body),
        { "Content-Type": "application/json" }
      );

      auth.login(responseData.user.id);
      navigate("/home");
    } catch (err) {
      console.log(err);

      setUser({
        name: "",
        email: "",
        password: "",
      });
    }

    /* .then((response) => response.json())
      .then((text) => {
        console.log(text);
        alert(text.message);
        if (text.message === "Logged in!" || text.message === "signed in") {
          // props.getUser(text.user.name);

          auth.login();
          navigate("/home");
        } else {
          setUser({
            name: "",
            email: "",
            password: "",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });*/
  };

  useEffect(() => {
    if (location.state == "false") setIsSignup(false);
    else setIsSignup(true);
    console.log(isSignup);
  }, [location.state]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <section className="auth-section">
        <div className="auth-container-2">
          {isLoading && <LoadingSpinner asOverlay />}
          {!isSignup && (
            <img src={icon} alt="stack overflow" className="login-logo" />
          )}
          <form>
            {isSignup && (
              <label htmlFor="name">
                <h4>Display Name</h4>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={user.name}
                />
              </label>
            )}

            <label htmlFor="email">
              <h4>Email</h4>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={user.email}
              />
            </label>

            <label htmlFor="password">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>Password</h4>
                {/* {!isSignup && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  forgot password?
                </p>
              )} */}
              </div>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={user.password}
              />
              {isSignup && (
                <p style={{ color: "#666767", fontSize: "13px" }}>
                  Passwords must contain at least eight
                  <br />
                  characters, including at least 1 letter and 1<br /> number.
                </p>
              )}
            </label>

            <button
              type="submit"
              className="auth-btn"
              onClick={authSubmitHandler}
            >
              {isSignup ? "Sign up" : "Log in"}
            </button>
          </form>
          <p>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              className="handle-switch-btn"
              onClick={handleSwitch}
            >
              {isSignup ? "Log in" : "sign up"}
            </button>
          </p>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Auth;
