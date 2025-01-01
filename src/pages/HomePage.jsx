import React from "react";
import "../css/Homepage.css";
import HomeButton from "../components/HomeButton";

const HomePage = () => {
  return (
    <>
      <div className="homepage">
        <div className="homepage-text">
          <h1>Teknolojik Yemekler</h1>
          <h2>KOD ACIKTIRIR, PIZZA DOYURUR</h2>
          {/* Add a button here */}
          <HomeButton />
        </div>
      </div>
    </>
  );
};

export default HomePage;
