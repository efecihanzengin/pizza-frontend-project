import React from "react";

function ExpressCard({ item, onClick }) {
  const { name, price, rating, reviewCount, image } = item;
  return (
    <div className="express-card" onClick={onClick}>
      {image && <img src={image} alt={name} />}
      <div className="express-card-title">
        <h6>{name}</h6>
      </div>
      <div className="express-card-details">
        <div className="rating-group">
          <span className="rating">{rating}★</span>
          <span className="review-count">({reviewCount})</span>
        </div>
        <span className="price">{price}₺</span>
      </div>
    </div>
  );
}

export default ExpressCard;
