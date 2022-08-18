import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "@adyen/adyen-web/dist/adyen.css";
import { CheckoutContext } from "../../contexts/CheckoutContext";

const Redirect = () => {
  const location = useLocation();
  const { createAdyenCheckout } = useContext(CheckoutContext);

  useEffect(() => {
    //Extract the values od sessionID &redirect result from the query string parameters
    const sessionId = new URLSearchParams(location.search).get("sessionId");
    const redirectResult = new URLSearchParams(location.search).get(
      "redirectResult"
    );

    //create an instance of AdyenCheckout to handle the redirect
    const createCheckout = async () => {
      const checkout = await createAdyenCheckout(sessionId, null);
      checkout.submitDetails({ details: { redirectResult } });
    };
    createCheckout();
  }, [createAdyenCheckout, location.search]);

  return <div id="redirect-page"></div>;
};

export default Redirect;
