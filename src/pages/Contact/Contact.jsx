import React from "react";
import Paper from "@mui/material/Paper";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailIcon from "@mui/icons-material/Mail";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./Contact.css";
import icon from "../../assets/icon.jpg";

function Contact() {
  return (
    <div id="contact">
      <h1>Contact</h1>
      <Paper elevation={8} className="cont" sx={{ m: 0, p: "2vw" }}>
        <img className="mIcon" src={icon} alt="logo" />
        <div>
          <div className="icons">
            <a href="https://www.facebook.com/mohit.sah.8820/">
              <FacebookIcon
                color="primary"
                fontSize="large"
                sx={{
                  width: "7vw",
                  minWidth: 40,
                  maxWidth: 70,
                  height: "auto",
                  "&:hover": {
                    color: "#1976d290",
                  },
                }}
              />
            </a>
            <a href="https://github.com/Mohit8820">
              <GitHubIcon
                color="action"
                fontSize="large"
                sx={{
                  width: "6.5vw",
                  minWidth: 40,
                  maxWidth: 65,
                  height: "auto",
                  "&:hover": {
                    color: "#1976d290",
                  },
                }}
              />
            </a>
            <a href="https://www.linkedin.com/in/mohit-sah-a02130213/">
              <LinkedInIcon
                color="primary"
                fontSize="large"
                sx={{
                  width: "7vw",
                  minWidth: 40,
                  maxWidth: 70,
                  height: "auto",
                  "&:hover": {
                    color: "#1976d290",
                  },
                }}
              />
            </a>
          </div>
          <br />
          <p>
            <LocationOnIcon
              color="warning"
              fontSize="large"
              sx={{
                width: 40,
                height: 40,
              }}
            />
            <span>Ranchi-834010, Jharkhand, India</span>
          </p>
          <p>
            <MailIcon
              color="secondary"
              fontSize="large"
              sx={{
                width: 40,
                height: 40,
              }}
            />
            <span>mohitsah8820@gmail.com aditi28singh01@gmail.com</span>
          </p>
          <p>
            <CallIcon
              color="primary"
              fontSize="large"
              sx={{
                width: 40,
                height: 40,
              }}
            />
            <span>+91 7301176797</span>
          </p>
          <p>
            <WhatsAppIcon
              color="success"
              fontSize="large"
              sx={{
                width: 40,
                height: 40,
              }}
            />
            <span>7301176797</span>
          </p>
        </div>
      </Paper>
      <footer>&copy; MOHIT PRASAD SAH || ADITI KUMARI</footer>
    </div>
  );
}
export default Contact;
