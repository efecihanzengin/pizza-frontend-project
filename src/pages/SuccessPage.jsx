import React from "react";
import "../css/SuccessPage.css";
import "../../images/iteration-1-images/logo.svg";

const SuccessPage = ({ onBack }) => {
  return (
    <div className="success-page">
      <div className="logo">
        <img src="../../images/iteration-1-images/logo.svg" />
      </div>
      <div className="success-message">
        <p>TEBRIKLER!</p>
        <p>SIPARISINIZ ALINDI!</p>
      </div>
      <div className="success-button">
        <button onClick={onBack}>Anasayfaya Don</button>
      </div>
    </div>
  );
};

export default SuccessPage;
