import React from "react";
import "./App.css";
import Header from "./components/Header";
import Products from "./components/section/Products";
import Details from "./components/section/Details";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/section/Cart";
import About from "./components/section/About";
import Payment from "./paymentComponents/Payment/Payment";
import Redirect from "./paymentComponents/Redirect/Redirect";
import StatusPage from "./pages/StatusPage/StatusPage";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import { DataProvider } from "./contexts/DataContext";

//app
function App() {
  return (
    <div className="app">
      <CheckoutProvider>
        <DataProvider>
          <Header />
          <section>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/product" element={<Products />} />
              <Route path="/product/:id" element={<Details />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/checkout" element={<Payment />} />
              <Route path="/redirect" element={<Redirect />} />
              <Route path="/status/:resultCode" element={<StatusPage />} />
            </Routes>
          </section>
        </DataProvider>
      </CheckoutProvider>
    </div>
  );
}

export default App;
