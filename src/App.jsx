import "./App.css";
import React, { useState } from "react";
import HomePage from "./pages/Homepage";
import OrderPage from "./pages/OrderPage";
import SuccessPage from "./pages/SuccessPage";

function App() {
  const [showOrderPage, setShowOrderPage] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  return (
    <div>
      {!showOrderPage && !showSuccessPage && (
        <HomePage onButtonClick={() => setShowOrderPage(true)} />
      )}
      {showOrderPage && !showSuccessPage && (
        <OrderPage
          onBack={() => setShowOrderPage(false)}
          onSuccess={() => {
            setShowOrderPage(false);
            setShowSuccessPage(true);
          }}
        />
      )}
      {showSuccessPage && (
        <SuccessPage
          onBack={() => {
            setShowOrderPage(false);
            setShowSuccessPage(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
