import React from "react";
import OrderButton from "./OrderButton";

function SuggestionCard({ item }) {
  const { name, image } = item;

  const formatName = (name) => {
    if (name === "coooook hizli npm gibi kurye") {
      return (
        <h4>
          <span className="highlight">coooook</span>{" "}
          <span className="normal">hizli npm gibi kurye</span>
        </h4>
      );
    }
    return <h4>{name}</h4>;
  };

  return (
    <div
      className="suggestion-card"
      style={{ backgroundImage: `url(${image})` }}
    >
      {formatName(name)}
      <OrderButton />
    </div>
  );
}

export default SuggestionCard;
