import React, { useState } from "react";
import "./Auth.css";
import icon from "../../assets/icon.jpg";

import { useNavigate, useLocation } from "react-router-dom";

const Auth = () => {
  const location = useLocation();

  const [isSignup, setIsSignup] = useState(location.state);

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };
  const [user, setUser] = useState("");

  const handleChange = (event) => {
    var name = event.target.value;
    setUser(name);
  };
  const navigate = useNavigate();

  const toQuestionshome = () => {
    navigate("/home", { state: { flag: 1, name: user } });
  };

  return (
    <section class="auth-section">
      <div class="auth-container-2">
        {!isSignup && (
          <img src={icon} alt="stack overflow" className="login-logo" />
        )}
        <form>
          <label htmlFor="name">
            <h4>Display Name</h4>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={user}
            />
          </label>

          {isSignup && (
            <label htmlFor="email">
              <h4>Email</h4>
              <input type="email" name="email" id="email" />
            </label>
          )}
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {/* {!isSignup && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  forgot password?
                </p>
              )} */}
            </div>
            <input type="password" name="password" id="password" />
            {isSignup && (
              <p style={{ color: "#666767", fontSize: "13px" }}>
                Passwords must contain at least eight
                <br />
                characters, including at least 1 letter and 1<br /> number.
              </p>
            )}
          </label>

          <button type="submit" className="auth-btn" onClick={toQuestionshome}>
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
  );
};

export default Auth;
