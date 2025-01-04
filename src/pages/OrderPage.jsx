import React, { useState, useEffect } from "react";

import PizzaForm from "../components/Order/PizzaForm";
import OrderSummary from "../components/Order/OrderSummary";
import PizzaInfo from "../components/Order/PizzaInfo";

import "./OrderPage.css";
import Header from "../components/Order/Header.jsx";
import { set } from "lodash";

function OrderPage({ onBack, onSuccess, selectedProduct }) {
  const [order, setOrder] = useState({
    userName: "",
    pizzaCount: 1,
    selectedSize: "kucuk",
    selectedDough: "normal",
    selectedToppings: [],
    orderNote: "",
    pizzaName: selectedProduct ? selectedProduct.name : "",
  });

  const pizzaPrice = selectedProduct ? selectedProduct.price : 0;

  const updateOrder = (key, value) => {
    setOrder((prevOrder) => ({ ...prevOrder, [key]: value }));
  };

  const handleToppingsChange = (e) => {
    const value = e.target.value;

    setOrder((prevOrder) => {
      const isSelected = prevOrder.selectedToppings.includes(value);
      if (!isSelected && prevOrder.selectedToppings.length >= 10) {
        return prevOrder;
      }

      const selectedToppings = isSelected
        ? prevOrder.selectedToppings.filter((topping) => topping !== value)
        : [...prevOrder.selectedToppings, value];

      return {
        ...prevOrder,
        selectedToppings,
      };
    });
  };

  const toppingPrice = 5;
  const totalToppingPrice = order.selectedToppings.length * toppingPrice;
  const totalPizzaPrice = pizzaPrice * order.pizzaCount;
  const totalPrice = totalPizzaPrice + totalToppingPrice;

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://reqres.in/api/users", {
        ...order,
        totalPrice,
      });
      console.log("Order submitted:", response.data);
      onSuccess();
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div>
      <Header onBack={onBack} />

      <section>
        <PizzaInfo pizza={selectedProduct} />
        <PizzaForm
          order={order}
          updateOrder={updateOrder}
          handleToppingsChange={handleToppingsChange}
        />
        <OrderSummary
          order={order}
          totalPrice={totalPrice}
          totalToppingPrice={totalToppingPrice}
          updateOrder={updateOrder}
          handleSubmit={handleSubmit}
        />
      </section>
    </div>
  );
}

export default OrderPage;
