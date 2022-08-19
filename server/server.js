const express = require("express");
const dotenv = require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { Client, CheckoutAPI, hmacValidator } = require("@adyen/api-library");

//init app
app = express();

// parse json body
app.use(express.json());

//parse url-encoded bodies
app.use(express.urlencoded({ extended: true }));

//Adyen node js configuration
const client = new Client({
  apiKey: process.env.REACT_APP_ADYEN_API_KEY,
  environment: "TEST",
});
const checkout = new CheckoutAPI(client);
const validator = new hmacValidator();

/* ################# API ENDPOINTS ###################### */
app.post("/api/sessions", async (req, res) => {
  try {
    console.log("Api sessions");

    const paidAmount = req.body.data * 100;

    //generate unique reference for the transaction
    const orderRef = uuidv4();

    // is https or http
    const protocol = req.socket.encrypted ? "https" : "http";

    const response = await checkout.sessions({
      amount: { currency: "EUR", value: paidAmount }, // value is 10€ in minor units
      countryCode: "NL",
      merchantAccount: process.env.REACT_APP_ADYEN_MERCHANT_ACCOUNT, // required
      reference: "Radhi_checkoutChallenge",
      returnUrl: `${protocol}://localhost:3000/redirect?orderRef=${orderRef}`, // to handle the redirect
    });

    res.json(response);
  } catch (error) {
    console.error(`Error is:${error.message}, error code: ${error.errorCode}`);
  }
});

// I left the webhook notification  out of scope because the HMAC key is not provided

// Receive webhook notifications
app.post("/notification", async (req, res) => {
  try {
    // get the notification request from POST body
    const notificationRequestItems = req.body.notificationItems;

    notificationRequestItems.forEach((item) => {
      if (
        validator.validateHMAC(
          item.NotificationRequestItem,
          process.env.REACT_APP_ADYEN_HMAC_KEY
        )
      ) {
        const eventCode = item.NotificationRequestItem.eventCode;

        if (eventCode === "AUTHORISATION") {
          if (item.NotificationRequestItem.success === "true") {
            //I left this part out of scope because
            //payment was successful
          } else {
            //payment was refused
          }
        } else {
          console.log("Non-valid Notification");
        }
      }
    });
    res.status(200).send("[accepted]");
  } catch (error) {
    console.log(error);
  }
});

/* ################# END OF API ENDPOINTS ####################### */

//start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
