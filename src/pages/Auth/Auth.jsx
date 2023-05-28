import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../../contexts/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import "./Auth.css";
import icon from "../../assets/icon.jpg";
import Modal from "../../components/UIElements/Modal";
import OtpModal from "../../components/UIElements/OtpModal";
import AvatarGenrator from "../../components/Avatar/AvatarGenrator";
import Avatar from "avataaars";

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
    var method = isSignup ? "signup" : "login";
    var body = isSignup
      ? {
          name: user.name,
          email: user.email,
          password: user.password,
          avatar: avatar,
        }
      : {
          email: user.email,
          password: user.password,
        };

    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_API_URL + "/users/" + method,
        "POST",
        JSON.stringify(body),
        { "Content-Type": "application/json" }
      );
      auth.login(
        responseData.userId,
        responseData.uname,
        responseData.uavatar,
        responseData.token
      );
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
  const [otpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState(null);
  const [userOtp, setUserOtp] = useState(null);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const verifyMail = async () => {
    if (!isValidEmail(user.email)) setValidEmail("Email is invalid");
    else {
      var digits = "0123456789";
      let OTPpin = "";
      for (let i = 0; i < 4; i++) {
        OTPpin += digits[Math.floor(Math.random() * 10)];
      }
      setOtp(OTPpin);
      try {
        await sendRequest(
          process.env.REACT_APP_API_URL + "/users/otp",
          "POST",
          JSON.stringify({
            otp: OTPpin,
            mailId: user.email,
            secret: "lemo040520@gmail.com",
          }),
          { "Content-Type": "application/json" }
        );
        setOtpModal(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const verifyOtp = () => {
    if (userOtp === otp) {
      {
        setValidEmail("Verified");
      }
    } else setValidEmail("OTP didn't match");
    setOtpModal(false);
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
    if (validEmail !== "Verified" && isSignup) {
      setValidEmail("Please verify your email");
    }

    if (
      isOk &&
      isValidEmail(user.email) &&
      (validEmail === "Verified" || !isSignup)
    ) {
      setValidEmail(null);
      authSubmitHandler();
    }
  };

  const [avatarModal, setAvatarModal] = useState(false);
  const [avatar, setAvatar] = useState({
    topType: "ShortHairShortCurly",
    accessoriesType: "Blank",
    hairColor: "Black",
    facialHairType: "Blank",
    facialHairColor: "Black",
    clotheType: "",
    clotheColor: "",
    graphicType: "",
    eyeType: "Default",
    eyebrowType: "Default",
    mouthType: "Default",
    skinColor: "",
  });

  return (
    <React.Fragment>
      <Modal
        onCancel={() => setOtpModal(false)}
        show={true}
        header="Verify OTP"
        footerClass="display-none"
      >
        <p>Please enter the 4 digit OTP sent to your mail id</p>
        <input
          type="text"
          maxLength={4}
          value={userOtp}
          onChange={(e) => {
            setUserOtp(e.target.value);
          }}
        />
        <button className="filled-btn" onClick={verifyOtp}>
          Submit
        </button>
      </Modal>
      <Modal
        onCancel={() => setAvatarModal(false)}
        show={avatarModal}
        header="Set Your Avatar"
        footerClass="display-none"
      >
        <AvatarGenrator
          avatar={avatar}
          getAvatar={(a) => {
            setAvatarModal(false);
            setAvatar(a);
          }}
        />
      </Modal>

      <ErrorModal error={error} onClear={clearError} />

      <div className="auth-container">
        {isLoading && <LoadingSpinner asOverlay />}

        {!isSignup && (
          <img src={icon} alt="stack overflow" className="login-logo" />
        )}
        <div className="auth-sec">
          {isSignup && (
            <div className="avatar-sec" onClick={() => setAvatarModal(true)}>
              <Avatar
                style={{
                  width: "20rem",
                  height: "20rem",
                }}
                avatarStyle="Circle"
                {...avatar}
              />
              <button className="text-btn">Create Avatar</button>
            </div>
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
              <div className="email-top">
                <h4>Email</h4>
                {isSignup && (
                  <button
                    className="text-btn"
                    type="button"
                    onClick={verifyMail}
                    disabled={validEmail === "Verified" ? true : false}
                  >
                    {validEmail === "Verified" ? "Verified" : "Verify"}
                  </button>
                )}
              </div>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={user.email}
                onClick={() => setValidEmail(null)}
                //onBlur={validateEmail}
                disabled={validEmail === "Verified" && isSignup ? true : false}
                required
              />
              {validEmail && validEmail !== "Verified" && (
                <span>{validEmail}</span>
              )}
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
                <p style={{ color: "#666767", fontSize: "1.2rem" }}>
                  Passwords must contain at least six characters, including at
                  least 1 uppercase and lowercase alphabet , 1 number and 1
                  symbol.
                </p>
              )}
            </label>

            <button type="submit" className="filled-btn">
              {isSignup ? "Sign up" : "Log in"}
            </button>
          </form>
        </div>
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
