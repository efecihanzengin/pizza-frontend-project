import "./App.css";
import React, { useState } from "react";
import HomePage from "./pages/Homepage";
import OrderPage from "./pages/OrderPage";

function App() {
  const [showOrderPage, setShowOrderPage] = useState(false);

  return (
    <div>
      {showOrderPage ? (
        <OrderPage onBack={() => setShowOrderPage(false)} />
      ) : (
        <HomePage onButtonClick={() => setShowOrderPage(true)} />
      )}
    </div>
  );
}

export default App;
