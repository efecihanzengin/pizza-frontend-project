import React from "react";
import "../../pages/Homepage.css";

function HomeButton({ onClick }) {
  return (
    <button className="homebutton" onClick={onClick}>
      ACIKTIM
    </button>
  );
}

export default HomeButton;
