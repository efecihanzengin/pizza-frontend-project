import React from "react";
import FooterAboutUs from "./FooterAboutUs";
import FooterSuggestions from "./FooterSuggestions";
import FooterInstagram from "./FooterInstagram";
import pizzaData, {
  burgerData,
  fastFoodData,
  frenchFriesData,
  ramenData,
} from "../../fakeData";
import "./footer.css";

function Footer() {
  const allFoodData = [
    ...pizzaData,
    ...ramenData,
    ...burgerData,
    ...frenchFriesData,
    ...fastFoodData,
  ];
  const getRandomFoods = (count) => {
    const shuffled = [...allFoodData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  const randomFoods = getRandomFoods(6);
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <FooterAboutUs />
        </div>
        <div className="footer-section">
          <FooterSuggestions randomFoods={randomFoods} />
        </div>
        <div className="footer-section">
          <h5>Instagram</h5>
          <FooterInstagram />
        </div>
      </div>
    </footer>
  );
}
export default Footer;
