import React from "react";
import Success from "../../paymentComponents/Success/Success";
import Failed from "../../paymentComponents/Failed/Failed";

import { useParams, useLocation } from "react-router-dom";

const StatusPage = () => {
  const { resultCode } = useParams();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const error = query ? query.get("reason") : "";

  const message = {
    successful: "Your payment has been successfully Received",
    pending: "Your order has been received! Payment completion pending",
    refuse:
      "The payment was refused. Please try a different payment method or card",
    error: error
      ? `Error : ${error}`
      : "Internal error Occurred , Please try again Later",
  };

  return (
    <div>
      {resultCode === "Authorised" && <Success message={message.successful} />}
      {resultCode === "Pending" && <Success message={message.pending} />}
      {resultCode === "Received" && <Success message={message.pending} />}
      {resultCode === "Refused" && <Failed message={message.refuse} />}
      {resultCode === "error" && <Failed message={message.error} />}
    </div>
  );
};

export default StatusPage;
