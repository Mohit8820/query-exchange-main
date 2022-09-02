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

  const authSubmitHandler = async () => {
    console.log("validEmail");
    console.log(validEmail);
    console.log("validPassword");
    console.log(validPassword);
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

    try {
      const responseData = await sendRequest(
        "http://localhost:4000/api/users/" + method,
        "POST",
        JSON.stringify(body),
        { "Content-Type": "application/json" }
      );

      auth.login(responseData.userId, responseData.token);
      navigate("/home");
    } catch (err) {
      console.log(err);

      setUser({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  useEffect(() => {
    if (location.state === "false") setIsSignup(false);
    else setIsSignup(true);
    console.log(isSignup);
  }, [location.state]);

  const [validEmail, setValidEmail] = useState(null);
  const [validPassword, setValidPassword] = useState(null);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const checkValidation = (event) => {
    event.preventDefault();
    const re = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
    );
    const isOk = re.test(user.password);
    if (!isOk) {
      setValidPassword("Password is invalid");
    } else {
      setValidPassword(null);
    }
    console.log("pass");
    console.log(validPassword);
    if (!isValidEmail(user.email)) {
      setValidEmail("Email is invalid");
    } else {
      setValidEmail(null);
    }

    if (isOk && isValidEmail(user.email)) {
      authSubmitHandler();
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <div className="auth-container">
        {isLoading && <LoadingSpinner asOverlay />}
        {!isSignup && (
          <img src={icon} alt="stack overflow" className="login-logo" />
        )}
        <form onSubmit={checkValidation}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={user.name}
                maxLength="6"
                required
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
              onClick={() => setValidEmail(null)}
              //onBlur={validateEmail}
              required
            />
            {validEmail && <span>{validEmail}</span>}
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
              onClick={() => setValidPassword(null)}
              //onBlur={validatePassword}
              required
            />
            {validPassword && <span>{validPassword}</span>}
            {isSignup && (
              <p style={{ color: "#666767", fontSize: "13px" }}>
                Passwords must contain at least six characters, including at
                least 1 letter and 1 number.
              </p>
            )}
          </label>

          <button type="submit" className="filled-btn">
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button type="button" className="text-btn" onClick={handleSwitch}>
            {isSignup ? "Log in" : "sign up"}
          </button>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Auth;
