import React from "react";

function OrderSummary({
  order,
  totalPrice,
  totalToppingPrice,
  updateOrder,
  handleSubmit,
  pizzaPrice,
}) {
  const basePizzaPrice = pizzaPrice * order.pizzaCount;

  return (
    <div className="order-summary" data-cy="order-summary">
      <h2 data-cy="summary-title">Sipariş Toplamı</h2>

      <div className="quantity-control" data-cy="quantity-control">
        <button
          onClick={() =>
            updateOrder("pizzaCount", Math.max(1, order.pizzaCount - 1))
          }
          disabled={order.pizzaCount <= 1}
          data-cy="decrease-pizza-count"
        >
          -
        </button>
        <span data-cy="pizza-count">{order.pizzaCount}</span>
        <button
          onClick={() => updateOrder("pizzaCount", order.pizzaCount + 1)}
          data-cy="increase-pizza-count"
        >
          +
        </button>
      </div>

      <div className="summary-row" data-cy="pizza-price-row">
        <span>Pizza Fiyatı</span>
        <span data-cy="pizza-base-price">{basePizzaPrice.toFixed(2)}₺</span>
      </div>

      <div className="summary-row" data-cy="toppings-price-row">
        <span>Ek Malzemeler</span>
        <span data-cy="topping-price">{totalToppingPrice.toFixed(2)}₺</span>
      </div>

      <div className="summary-row total" data-cy="total-price-row">
        <span>Toplam</span>
        <span data-cy="total-price">{totalPrice.toFixed(2)}₺</span>
      </div>

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={!order.username || order.selectedToppings.length < 4}
        data-cy="submit-order"
      >
        SİPARİŞ VER
      </button>
    </div>
  );
}

export default OrderSummary;
