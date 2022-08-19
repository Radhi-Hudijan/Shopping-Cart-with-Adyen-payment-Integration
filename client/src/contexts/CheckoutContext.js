import React, { createContext } from "react";
import AdyenCheckout from "@adyen/adyen-web";
import { useNavigate } from "react-router-dom";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const navigate = useNavigate();

  // call server endpoint function
  const callServer = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      body: data ? JSON.stringify({ data }) : "",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.json();
  };

  // to create AdyenCheckout instance
  const createAdyenCheckout = async (sessionId, sessionData) => {
    const configuration = {
      clientKey: process.env.REACT_APP_ADYEN_CLIENT_KEY,
      locale: "en_US",
      environment: "test", // change to live for production
      showPayButton: true,
      session: { id: sessionId, sessionData: sessionData ? sessionData : "" },
      onPaymentCompleted: (result, component) => {
        navigate(`/status/${result.resultCode}`, { replace: true });
      },
      onError: (error, component) => {
        navigate(`/status/error?reason=${error.message}`, { replace: true });
      },
      paymentMethodsConfiguration: {
        ideal: {
          showImage: true,
        },
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          billingAddressRequired: true,
          enableStoreDetails: true,
        },
      },
    };

    return await AdyenCheckout(configuration);
  };

  return (
    <CheckoutContext.Provider value={{ callServer, createAdyenCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
};
