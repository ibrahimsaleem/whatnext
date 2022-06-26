import React from "react";
import "../styles/AboutMe.css";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

function AboutMe() {
  return (
    <>
      <center>
        <h1 className="title about_title">About Creator</h1>
        <br />
      </center>
      <div className="aboutme_container">
        <div className="aboutme_card">
          <img
            className="aboutme_card__image"
            src={`${process.env.PUBLIC_URL}/assets/ibrahimsaleem.png`}
            alt="Mohd IBRAHIM SALEEM"
          />
          <div className="aboutme_card__content">
            <h1 className="about_name">Mohd Ibrahim Saleem</h1>
            <div
              className="stroke"
              style={{
                backgroundColor: "white",
                height: "1px",
                width: "100%",
                marginTop: "4px",
              }}
            ></div>
            <br />
            <p>
            Hi Everyone, I am Mohd Ibrahim Saleem from Bhopal, India.
I am pursuing BTech in Computer Science and Engineering with my major in Cyber Security and Machine Learning.
Also work as web developer/designer and a versatile tech professional with a plethora of experience and knowledge in the fields of web apps using different web development Platforms and Websites. Implemented website maintenance, content management, updated the latest trends accordingly. And do digital marketing to increase customer engagement through social media and other online options.
            </p>
            <div className="aboutme_card__sociallinks">
              <div>
                <a
                  href="https://linkedin.com/in/ibrahimsaleem91"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon className="icon social_icon_linkedin" />
                </a>
                <a
                  href="https://github.com/ibrahimsaleem"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon className="social_icon_github " />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutMe;
