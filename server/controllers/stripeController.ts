import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import isDev from "../utils/isDev";
import AppError from "../utils/AppError";
import stripe from "../utils/stripeAPI";
import { sendPaymentEmailSuccess } from "./emailController";
import { IReqBodyRaw } from "../types/types";

import { updateSubcriptionActive } from "../services/acountServices";

exports.CreateIntent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userDetails = req.body.userDetails;
  const { id, username, email } = req.body.user;

  if (!userDetails) throw new AppError("Make sure you have submitted all details", 500);
  if (!id || !username || !email) throw new AppError("Please check you are logged in", 500);

  // For now I only have 1 product so I have hard coded it.
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1500,
    currency: "usd",
    description: "Upgrade to yearly pro account.",
    payment_method_types: ["card"],
    receipt_email: email,
    shipping: {
      address: {
        country: userDetails.country,
        line1: userDetails.line1,
        line2: userDetails.line2,
        city: userDetails.city,
        postal_code: userDetails.postcode,
        state: userDetails.state,
      },
      name: userDetails.fullname,
    },
    metadata: {
      userID: id,
      username,
      email,
    },
  });

  if (!paymentIntent.client_secret) throw new AppError("Error processing payment intent.", 500);

  res.json({
    status: "success",
    data: paymentIntent.client_secret,
  });
});

exports.webhook = catchAsync(async (req: IReqBodyRaw, res: Response, next: NextFunction) => {
  const webhookSecret = isDev() ? process.env.STRIPE_WEBHOOK_SECRET_DEV : process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers["stripe-signature"];
  const event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);

  if (!event) throw new AppError("Webhook event not recognized.", 500);

  if (event.type === "charge.succeeded") {
    const eventMetaData = event.data.object.metadata;

    // Update user to new payed account
    const upgradedUser = await updateSubcriptionActive(eventMetaData.userID);

    // Send email to the user --- Check for error and send email.
    const sendMail = sendPaymentEmailSuccess(eventMetaData.userID, eventMetaData.email);
  }

  res.json({
    status: "success",
    data: {
      type: event.type,
    },
  });
});
