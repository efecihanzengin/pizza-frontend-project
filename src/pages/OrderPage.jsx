import React, { useState, useEffect } from "react";
import axios from "axios";

import PizzaForm from "../components/Order/PizzaForm";
import OrderSummary from "../components/Order/OrderSummary";
import PizzaInfo from "../components/Order/PizzaInfo";

import "./OrderPage.css";
import Header from "../components/Order/Header.jsx";

function OrderPage({ onBack, onSuccess, selectedProduct }) {
  const [order, setOrder] = useState({
    username: "",
    pizzaCount: 1,
    selectedSize: "kucuk",
    selectedDough: "normal",
    selectedToppings: [],
    orderNote: "",
    pizzaName: selectedProduct ? selectedProduct.name : "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const pizzaPrice = selectedProduct ? selectedProduct.price : 0;

  const updateOrder = (key, value) => {
    setOrder((prevOrder) => ({ ...prevOrder, [key]: value }));
    setErrorMessage(""); // Her değişiklikte hata mesajını temizle
  };

  const handleToppingsChange = (e) => {
    const value = e.target.value;

    setOrder((prevOrder) => {
      const isSelected = prevOrder.selectedToppings.includes(value);
      
      // Eğer malzeme çıkarılıyorsa ve 4'ten az malzeme kalacaksa
      if (isSelected && prevOrder.selectedToppings.length <= 4) {
        setErrorMessage("En az 4 malzeme seçmelisiniz");
        return prevOrder;
      }

      if (!isSelected && prevOrder.selectedToppings.length >= 10) {
        setErrorMessage("En fazla 10 malzeme seçebilirsiniz");
        return prevOrder;
      }

      const selectedToppings = isSelected
        ? prevOrder.selectedToppings.filter((topping) => topping !== value)
        : [...prevOrder.selectedToppings, value];

      setErrorMessage(""); // Hata yoksa mesajı temizle
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
    if (order.selectedToppings.length < 4) {
      setErrorMessage("En az 4 malzeme seçmelisiniz");
      return;
    }

    if (!order.username || order.username.length < 3) {
      setErrorMessage("Lütfen geçerli bir isim giriniz");
      return;
    }

    try {
      const response = await axios.post("https://reqres.in/api/users", {
        ...order,
        totalPrice,
      });
      console.log("Order submitted:", response.data);
      onSuccess();
    } catch (error) {
      console.error("Error submitting order:", error);
      setErrorMessage("Sipariş gönderilirken bir hata oluştu");
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
          errorMessage={errorMessage}
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
