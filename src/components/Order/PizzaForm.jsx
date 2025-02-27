import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

function PizzaForm({ order, updateOrder, handleToppingsChange, errorMessage }) {
  const toppings = [
    "Pepperoni",
    "Sosis",
    "Jambon",
    "Tavuk",
    "Soğan",
    "Domates",
    "Mısır",
    "Sucuk",
    "Jalapeno",
    "Sarımsak",
    "Biber",
    "Ananas",
    "Kabak",
  ];
  
  return (
    <Form data-cy="pizza-form">
      <div className="form-description" data-cy="form-description">
        <p data-cy="form-description-text">
          En az 4, en fazla 10 malzeme seçebilirsiniz. Her malzeme 5₺'dir.
          Siparişinizi tamamlamak için isminizi girmeyi unutmayın.
        </p>
      </div>
      <FormGroup className="pizza-sizes" data-cy="pizza-sizes">
        <div className="dough-size" data-cy="dough-size">
          <Label className="dough-header" data-cy="dough-header">Boyut Seç</Label>
          {["kucuk", "orta", "buyuk"].map((size) => (
            <div className="dough-option" key={size} data-cy="dough-option">
              <input
                type="radio"
                name="boyut"
                value={size}
                id={size}
                checked={order.selectedSize === size}
                onChange={(e) => updateOrder("selectedSize", e.target.value)}
                data-cy={`size-${size}`}
              />
              <Label htmlFor={size} data-cy={`size-label-${size}`}>
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </Label>
            </div>
          ))}
        </div>
        <div className="dough-thickness" data-cy="dough-thickness">
          <Label data-cy="dough-thickness-label">Hamur Seç</Label>
          <select
            name="hamur"
            value={order.selectedDough}
            onChange={(e) => updateOrder("selectedDough", e.target.value)}
            data-cy="dough-select"
          >
            <option value="ince" data-cy="dough-option-ince">İnce</option>
            <option value="normal" data-cy="dough-option-normal">Normal</option>
            <option value="kalin" data-cy="dough-option-kalin">Kalın</option>
          </select>
        </div>
      </FormGroup>
      <FormGroup className="extras" data-cy="extras">
        <Label className="extras-header" data-cy="extras-header">Ek Malzemeler</Label>
        <p data-cy="extras-info">(En az 4 malzeme seçmelisiniz)</p>
        {errorMessage && (
          <p className="error-message" style={{ color: "#e91212" }} data-cy="error-message">
            *{errorMessage}
          </p>
        )}
        <div className="extra-elements" data-cy="extra-elements">
          {toppings.map((topping) => (
            <Label
              key={topping}
              className="extra-item"
              data-cy={`extra-item-${topping}`}
            >
              <input
                type="checkbox"
                value={topping}
                checked={order.selectedToppings.includes(topping)}
                onChange={handleToppingsChange}
                className="extra-checkbox"
                data-cy={`extra-checkbox-${topping}`}
              />
              {topping.charAt(0).toUpperCase() + topping.slice(1)}
            </Label>
          ))}
        </div>
      </FormGroup>
      <FormGroup className="customer-note" data-cy="customer-note">
        <Label data-cy="username-label">İsminiz</Label>
        <Input
          type="text"
          placeholder="Adınız... (Zorunlu)"
          value={order.username}
          onChange={(e) =>
            updateOrder("username", e.target.value.toUpperCase())
          }
          style={{ width: "50%" }}
          data-cy="username-input"
        />
        <Label data-cy="order-note-label">Sipariş Notu</Label>
        <Input
          type="text"
          placeholder="Siparişine eklemek istediğin bir not var mı?"
          value={order.orderNote}
          onChange={(e) => updateOrder("orderNote", e.target.value)}
          data-cy="order-note-input"
        />
      </FormGroup>
    </Form>
  );
}

export default PizzaForm;
