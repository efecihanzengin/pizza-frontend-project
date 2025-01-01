import React from "react";
import { useState } from "react";
import pizzaData from "../fakeData";
import axios from "axios";
import { Form, Label, FormGroup, Button, Input, Container } from "reactstrap";
import "../css/OrderPage.css";
import "../../images/iteration-1-images/logo.svg";

function OrderPage({ onBack }) {
  const [order, setOrder] = useState({
    pizzaCount: 1,
    selectedSize: "kucuk",
    selectedDough: "normal",
    selectedToppings: [],
    orderNote: "",
    pizzaName: pizzaData[1].name,
  });

  const pizzaPrice = pizzaData[1].price;

  const updateOrder = (key, value) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [key]: value,
    }));
  };

  const handleToppingsChange = (e) => {
    const value = e.target.value;
    setOrder((prevOrder) => {
      const isSelected = prevOrder.selectedToppings.includes(value);
      if (!isSelected && prevOrder.selectedToppings.length >= 10) {
        alert("En fazla 10 malzeme secilebilir");
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
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div>
      <header>
        <img src="../../images/iteration-1-images/logo.svg" alt="logo" />
        <div className="order-header-buttons">
          <button onClick={onBack}>Anasayfa</button>
          <p>-</p>
          <button>Secenekler</button>
          <p>-</p>
          <button>Siparis Olustur</button>
        </div>
      </header>

      <section>
        <div className="pizza-info">
          <h2>{pizzaData[1].name}</h2>
          <div className="pizza-details">
            <p>{pizzaPrice} TL</p>
            <div className="rateNreview">
              <p>{pizzaData[1].rating}</p>
              <p>{pizzaData[1].reviewCount}</p>
            </div>
          </div>
          <p>{pizzaData[1].description}</p>
        </div>
        <Form>
          <FormGroup className="pizza-sizes">
            <div className="dough-size">
              <Label className="dough-header">Boyut Sec</Label>
              <div className="dough-option">
                <input
                  type="radio"
                  name="boyut"
                  value="kucuk"
                  id="kucuk"
                  checked={order.selectedSize === "kucuk"}
                  onChange={(e) => updateOrder("selectedSize", e.target.value)}
                />
                <Label for="kucuk">Kucuk</Label>
              </div>
              <div className="dough-option">
                <input
                  type="radio"
                  name="boyut"
                  value="orta"
                  id="orta"
                  checked={order.selectedSize === "orta"}
                  onChange={(e) => updateOrder("selectedSize", e.target.value)}
                />
                <Label for="kucuk">Orta</Label>
              </div>
              <div className="dough-option">
                <input
                  type="radio"
                  name="boyut"
                  value="buyuk"
                  id="buyuk"
                  checked={order.selectedSize === "buyuk"}
                  onChange={(e) => updateOrder("selectedSize", e.target.value)}
                />
                <Label for="kucuk">Buyuk</Label>
              </div>
            </div>
            <div className="dough-thickness">
              <Label>Hamur Sec</Label>
              <select
                name="hamur"
                value={order.selectedDough}
                onChange={(e) => updateOrder("selectedDough", e.target.value)}
              >
                <option value="normal">Normal</option>
                <option value="ince">Ince</option>
                <option value="kalın">Kalın</option>
              </select>
            </div>
          </FormGroup>

          <FormGroup className="extras">
            <h6>Ek Malzemeler</h6>
            <p>En fazla 10 malzeme seciniz. 5 TL</p>
            <div className="extra-elements">
              {[
                "Mantar",
                "Zeytin",
                "Sucuk",
                "Salam",
                "Sosis",
                "Biber",
                "Domates",
                "Mısır",
                "Pepperoni",
                "Jambon",
                "Sarimsak",
                "Kabak",
                "Ananas",
              ].map((topping) => (
                <Label key={topping} className="extra-item">
                  <Input
                    type="checkbox"
                    name={topping}
                    value={topping}
                    onChange={handleToppingsChange}
                    className="extra-checkbox"
                    checked={order.selectedToppings.includes(topping)}
                  />
                  {topping.charAt(0).toUpperCase() + topping.slice(1)}
                </Label>
              ))}
            </div>
          </FormGroup>

          <FormGroup className="customer-note">
            <Label>Notunuz</Label>
            <Input
              type="text"
              name="not"
              value={order.orderNote}
              onChange={(e) => updateOrder("orderNote", e.target.value)}
            />
          </FormGroup>
          <hr />
          <div className="order-control">
            <FormGroup>
              <div className="pizza-count">
                <Button
                  color="warning"
                  onClick={() =>
                    updateOrder("pizzaCount", Math.max(1, order.pizzaCount - 1))
                  }
                >
                  -
                </Button>
                <p>{order.pizzaCount}</p>
                <Button
                  color="warning"
                  onClick={() =>
                    updateOrder("pizzaCount", order.pizzaCount + 1)
                  }
                >
                  +
                </Button>
              </div>
            </FormGroup>
            <FormGroup className="order-price">
              <div className="order-details">
                <h4>Siparis Toplami</h4>
                <div className="extra-price">
                  <p>Secimler</p>
                  <p>{totalToppingPrice}</p>
                </div>
                <div className="total-price">
                  <p>Toplam:</p>
                  <p>{totalPrice}</p>
                </div>
              </div>
              <Button color="primary" onClick={handleSubmit}>
                Siparisi Tamamla
              </Button>
            </FormGroup>
          </div>
        </Form>
      </section>
    </div>
  );
}

export default OrderPage;
