import React from "react";

const PizzaInfo = ({ pizza }) => {
  if (!pizza) {
    return <div className="pizza-info">Lütfen bir pizza seçin</div>;
  }

  return (
    <div className="pizza-info">
      <h4 data-cy="pizza-name">{pizza.name}</h4>
      <div className="pizza-details">
        <p data-cy="pizza-price">{pizza.price}₺</p>
        <div className="rateNreview" data-cy="pizza-rate-review">
          <p>{pizza.rating}</p>
          <p>({pizza.reviewCount})</p>
        </div>
      </div>
      <p data-cy="pizza-description">{pizza.description}</p>
    </div>
  );
};

export default PizzaInfo;
