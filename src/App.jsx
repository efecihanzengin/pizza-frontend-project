import "./App.css";
import React, { useState } from "react";
import HomePage from "./pages/Homepage";
import OrderPage from "./pages/OrderPage";

function App() {
  const [showOrderPage, setShowOrderPage] = useState(false);

  return (
    <div>
      {/*<HomePage />*/}
      {/*<OrderPage />*/}
      <OrderPage />
    </div>
  );
}

export default App;
