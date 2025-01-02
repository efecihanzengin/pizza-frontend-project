import React from "react";
import "../css/Homepage.css";
import HomeButton from "../components/HomeButton";
import "../../images/iteration-1-images/logo.svg";

const HomePage = ({ onButtonClick }) => {
  return (
    <div className="homepage">
      <div className="homepage-text">
        <img src="../../images/iteration-1-images/logo.svg" alt="logo" />
        <h2>KOD ACIKTIRIR, PIZZA DOYURUR</h2>
        {/* Add a button here */}
        <HomeButton onClick={onButtonClick} />
      </div>
    </div>
  );
};

export default HomePage;
