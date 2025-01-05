import React, { useState, useEffect } from "react";
import axios from "axios";

import PizzaForm from "../components/Order/PizzaForm";
import OrderSummary from "../components/Order/OrderSummary";
import PizzaInfo from "../components/Order/PizzaInfo";

import "./OrderPage.css";
import Header from "../components/Order/Header.jsx";

function OrderPage({ onBack, onSuccess, selectedProduct }) {
  const defaultPizza = {
    name: "Position Absolute Acı Pizza",
    price: 85.50,
    rating: 4.9,
    reviewCount: 200,
    description: "Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir."
  };

  const activePizza = selectedProduct || defaultPizza;
  
  const [order, setOrder] = useState({
    username: "",
    pizzaCount: 1,
    selectedSize: "kucuk",
    selectedDough: "normal",
    selectedToppings: [],
    orderNote: "",
    pizzaName: activePizza.name,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
  const totalToppingPrice = order.selectedToppings.length * toppingPrice * order.pizzaCount;
  const totalPizzaPrice = activePizza.price * order.pizzaCount;
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
      // Başarılı sipariş mesajı
      setSuccessMessage("Siparişiniz başarıyla alındı!");
    } catch (error) {
      console.error("Error submitting order:", error);
      setErrorMessage("Sipariş gönderilirken bir hata oluştu");
    }
  };

  return (
    <div>
      <Header onBack={onBack} />
      <section>
        <PizzaInfo pizza={activePizza} />
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
          pizzaPrice={activePizza.price}
          successMessage={successMessage}
        />
      </section>
    </div>
  );
}

export default OrderPage;
