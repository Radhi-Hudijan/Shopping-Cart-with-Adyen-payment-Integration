import React, { useContext, useEffect, useRef } from "react";
import "@adyen/adyen-web/dist/adyen.css";
import "../../App.css";

import { CheckoutContext } from "../../contexts/CheckoutContext";
import { DataContext } from "../../contexts/DataContext";

const Payment = () => {
  const { callServer, createAdyenCheckout } = useContext(CheckoutContext);
  const { total } = useContext(DataContext);
  const paymentContainer = useRef(null);

  useEffect(() => {
    const mountDropin = async () => {
      // Init Sessions
      const checkoutSessionResponse = await callServer("/api/sessions", total);

      if (!checkoutSessionResponse || !paymentContainer.current) {
        // initiateCheckout is not finished yet.
        return;
      }

      // get the session ID and data
      const { id, sessionData } = checkoutSessionResponse;

      // Create AdyenCheckout instance using Sessions response
      const checkout = await createAdyenCheckout(id, sessionData);

      // create instance of Drop-in and mount it to the container
      checkout.create("dropin").mount(paymentContainer.current);
    };

    mountDropin();
  });

  return (
    <div id="payment-page">
      <div ref={paymentContainer} className="dropin-container"></div>
    </div>
  );
};

export default Payment;
