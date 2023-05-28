import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "./ErrorModal";
import LoadingSpinner from "./LoadingSpinner";

const otpButStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
};

const otpInp = {
  border: "none",
  boxShadow: "none",
  borderBottom: "0.1rem solid var(--blue-border)",
  letterSpacing: "2.5rem",
  fontSize: "3.5rem",
  width: "20rem",
  textAlign: "center",
  fontWeight: "bold",
};

const OtpModal = ({ mailTo, matchOtp, open, onClose }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const sendOtpMail = async () => {
    setUserOtp("");
    var digits = "0123456789";
    let OTPpin = "";
    for (let i = 0; i < 4; i++) {
      OTPpin += digits[Math.floor(Math.random() * 10)];
    }
    setOtp(OTPpin);
    try {
      // console.log(OTPpin);
      await sendRequest(
        process.env.REACT_APP_API_URL + "/users/otp",
        "POST",
        JSON.stringify({
          otp: OTPpin,
          mailId: mailTo,
          secret: "lemo040520@gmail.com",
        }),
        { "Content-Type": "application/json" }
      );
    } catch (err) {
      console.log(err);
    }
    setMinutes(1);
    setSeconds(30);
  };
  const handleSubmit = () => {
    if (userOtp === otp) {
      matchOtp(true);
    } else matchOtp(false);
  };

  useEffect(() => {
    if (open) sendOtpMail();
  }, [open]);

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Modal
        onCancel={() => onClose(false)}
        show={open}
        header="Verify OTP"
        footerClass="display-none"
      >
        <p>Please enter the 4 digit OTP sent to your mail id</p>
        <br />
        <input
          type="text"
          maxLength={4}
          value={userOtp}
          onChange={(e) => {
            setUserOtp(e.target.value);
          }}
          className="otp-input"
          style={otpInp}
        />
        <br />
        <br />
        <div className="otp-buttons" style={otpButStyle}>
          {seconds > 0 || minutes > 0 ? (
            <span>
              Resend OTP after:
              <br /> {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
          ) : (
            <button
              disabled={seconds > 0 || minutes > 0}
              className="text-btn"
              onClick={sendOtpMail}
            >
              Resend OTP
            </button>
          )}
          <button
            className="filled-btn"
            disabled={userOtp.length !== 4 ? true : false}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default OtpModal;
